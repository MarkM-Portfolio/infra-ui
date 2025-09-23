/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.installer;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.Copyright;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class IEButtonInstallerUpdater implements ServletContextListener {
	private final static String COPYRIGHT = Copyright.SHORT;

	private static final Log LOG = LogFactory
			.getLog(IEButtonInstallerUpdater.class);

	private static final ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
			.getLogResourceHelper();

	private String BOOKMARKLETSERVICEID = "";
	
	private String FORUMSSERVICEID = "";
	
	private static final String INSTALLERFOLDER = "/tools/bookmarkletinstaller/";

	private static final String OUTPUTFOLDER = "/tools/";

	private static final String HEADER = "installer.header";

	private static final String[] SETUP_FILES = {
			"DogearIePluginInstaller.exe", "GRes401.dll", "GRes404.dll",
			"GRes405.dll", "GRes406.dll", "GRes408.dll", "GRes409.dll",
			"GRes40b.dll", "GRes40d.dll", "GRes40e.dll", "GRes410.dll",
			"GRes411.dll", "GRes412.dll", "GRes414.dll", "GRes415.dll",
			"GRes416.dll", "GRes419.dll", "GRes41f.dll", "GRes804.dll",
			"GRes80c.dll", "GRes813.dll", "GRes816.dll", "GRes81d.dll",
			"GRes403.dll", "GRes41e.dll", "GRes43f.dll", 
			"GResc07.dll", "GResc0a.dll", "GRes424.dll", "setup.ini" };

	private static final String SETUPCONFIG = "setup.ini";

	private static final String URLKEY = "DogearServer";
	
	private static final String MODEKEY = "Mode";

	private static final String TMPZIP = "temp.zip";

	private static final String SETUPCOMMENT_POPUP = "Setup=DogearIePluginInstaller.exe\r\nTempMode\r\nSilent=1\r\nOverwrite=1\r\nTitle=IE button Installer";

	private static final String INSTALLERFILENAME = "IEButtonInstaller.exe";

	// private String [] setupPathsPopup = new String[SETUPS_POPUP.length];
	// private String [] setupPathsInframe = new String[SETUPS_INFRAME.length];
	// private String confPath = null;
	private String headerPath = null;

	// private String tmpZipPath = null;
	// private String popupInstallerPath = null;
	// private String inframeInstallerPath = null;
	private VenturaConfigurationProvider vcp = null;

	private URL serviceUrl = null;
	private URL serviceUrl_ssl = null;
	private String mode = null;
	private Boolean bookmarkletEnabled = false;
	private Boolean discussThisEnabled = false;

	private ServletContextEvent event = null;

	public void contextDestroyed(ServletContextEvent arg0) {
	}

	public void contextInitialized(ServletContextEvent event) {
		try {
			this.event = event;
			headerPath = event.getServletContext().getRealPath(
					OUTPUTFOLDER + HEADER);

			BOOKMARKLETSERVICEID = "bookmarklet";
			vcp = VenturaConfigurationProvider.Factory.getInstance();
			
			// check whether the SSL is enabled for this service
			bookmarkletEnabled = vcp.isServiceEnabled(BOOKMARKLETSERVICEID);
			if (!bookmarkletEnabled) {
				// Service is not enabled, throw this exception
				throw new RuntimeException(_logresources.getString(
						"error.iebtninstallerupdater.serviceerror", BOOKMARKLETSERVICEID));
			}

			serviceUrl = vcp.getServiceURL(BOOKMARKLETSERVICEID);
			serviceUrl_ssl = vcp.getSecureServiceURL(BOOKMARKLETSERVICEID);
			
			if (VenturaConfigurationHelper.Factory.getInstance().getForceConfidentialCommunications()){
				serviceUrl = vcp.getSecureServiceURL(BOOKMARKLETSERVICEID);
			}
			
			if (serviceUrl == null) {
				throw new RuntimeException(_logresources.getString(
						"error.iebtninstallerupdater.serviceerror", BOOKMARKLETSERVICEID));
			}

			if (LOG.isDebugEnabled()) {
				LOG.debug("Service Url: " + serviceUrl.toString());
				LOG.debug("Service SSL Url: " + serviceUrl_ssl);
			}
			
			FORUMSSERVICEID = "forums";
			// check whether the discussThis is enabled
			boolean forumsEnabled = vcp.isServiceEnabled(FORUMSSERVICEID);
			if(forumsEnabled){
				//TODO: need forum team add the switch in configuration file for discussThis , always true now
				discussThisEnabled = true;
			}
			// AHERN: this code is obsolete commenting out
			//else{
				//TODO: throw the exception about the discussThis is enabled or not, now just check forum
				// Service is not enabled, throw this exception
			//	throw new RuntimeException(_logresources.getString(
			//			"error.iebtninstallerupdater.serviceerror", FORUMSSERVICEID));
			//}
			
			if (LOG.isDebugEnabled()) {
				LOG.debug("isDiscussThisEnabled: " + discussThisEnabled);
			}
			// Get the mode value
			if(bookmarkletEnabled&&discussThisEnabled){
				mode = "both";
			}else if(bookmarkletEnabled){
				mode = "bookmarklet";
			}else if(discussThisEnabled){
				mode = "discussThis";
			}

			updateInstaller();

		} catch (VenturaConfigException e) {
			LOG.error(_logresources
					.getString("error.iebtninstallerupdater.config"), e);
		} catch (IOException e) {
			LOG.error(_logresources
					.getString("error.iebtninstallerupdater.update"), e);
		}
	}

	private void updateInstaller() throws IOException {
		String configFolderName = event.getServletContext().getRealPath(
				INSTALLERFOLDER);
		String configFileName = configFolderName + SETUPCONFIG;
		File configFolder = new File(configFolderName);
		
		if(configFolder.exists()){
			if (needUpdate(configFileName)) {
				String[] setupFilePaths = new String[SETUP_FILES.length];
				String tmpZipPath = event.getServletContext().getRealPath(
						INSTALLERFOLDER + TMPZIP);
				for (int i = 0; i < SETUP_FILES.length; i++) {
					setupFilePaths[i] = event.getServletContext().getRealPath(
							INSTALLERFOLDER + SETUP_FILES[i]);
				}
	
				byte[] newZip = createZip(setupFilePaths, SETUP_FILES,
						SETUPCOMMENT_POPUP, tmpZipPath);
				String targetFileName = event.getServletContext().getRealPath(
						OUTPUTFOLDER + INSTALLERFILENAME);
				this.updateInstaller(newZip, targetFileName);
				if (LOG.isDebugEnabled()){
					LOG.debug(_logresources.getString("info.iebtninstallerupdater.success"));
				}
				
			}
	   }
		else{
			LOG.debug("Installer does not exist. Config folder missing at " + configFolderName);			
		}
	}

	/**
	 * Check the configure file to see if the url is changed. If changed, return
	 * true.
	 * 
	 * @param configFileName
	 *            absolute path to configure file
	 * @return
	 */
	private boolean needUpdate(String configFileName) {
		BufferedWriter setupIniOutput = null;
		BufferedReader reader = null;
		File setupFile = new File(configFileName);
		
		boolean update = false;
		boolean found = false;
		// open configure file
		try {
			if (!setupFile.exists())
				setupFile.createNewFile();
			reader = new BufferedReader(new FileReader(setupFile));
			String config = null;
			while ((config = reader.readLine()) != null) {
				if (config.startsWith(URLKEY)) {
					found = true;
					String urlString = config.split("=")[1].trim();
					if (!serviceUrl.toString().equalsIgnoreCase(urlString))
						update = true;
					break;
				}
				if (config.startsWith(MODEKEY)) {
					found = true;
					String modeString = config.split("=")[1].trim();
					if (!mode.equalsIgnoreCase(modeString))
						update = true;
					break;
				}
			}
			if (!found)
				update = true;
			reader.close();
			reader = null;
			if (update) {
				setupIniOutput = new BufferedWriter(new FileWriter(setupFile));
				setupIniOutput.write("[config]");
				setupIniOutput.newLine();
				setupIniOutput.write(URLKEY + "=" + serviceUrl.toString());
				if(serviceUrl_ssl != null){
					setupIniOutput.newLine();
					setupIniOutput.write("DogearServerSSL=" + serviceUrl_ssl.toExternalForm());
				}
				// Write the mode value 
				setupIniOutput.newLine();
				setupIniOutput.write(MODEKEY + "=" + mode);
				setupIniOutput.close();
				setupIniOutput = null;
			}

		} catch (FileNotFoundException e) {
			LOG.error(_logresources
					.getString("error.iebtninstallerupdater.setupini"), e);
		} catch (IOException e) {
			LOG.error(_logresources
					.getString("error.iebtninstallerupdater.setupiniload"), e);
		} catch (Exception e) {
			LOG.error(_logresources
					.getString("error.iebtninstallerupdater.needupdate"), e);
		} finally {
			try {
				if (reader != null)
					reader.close();
				if (setupIniOutput != null)
					setupIniOutput.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return update;

	}

	private byte[] createZip(String[] setupFilePaths, String[] setupFileNames,
			String comments, String tmpZipPath) throws IOException {

		FileOutputStream fileout = new FileOutputStream(tmpZipPath);

		ZipOutputStream out = new ZipOutputStream(fileout);

		byte[] buf = new byte[1024];

		for (int i = 0; i < setupFileNames.length; i++) {
			FileInputStream in = new FileInputStream(setupFilePaths[i]);
			out.putNextEntry(new ZipEntry(setupFileNames[i]));

			int len = 0;
			while ((len = in.read(buf)) > 0) {
				out.write(buf, 0, len);
			}

			out.closeEntry();
			in.close();
		}
		out.setComment(comments);
		out.flush();
		out.close();
		fileout.close();

		FileInputStream filein = new FileInputStream(tmpZipPath);

		ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
		int len = 0;
		while ((len = filein.read(buf)) > 0) {
			byteOut.write(buf, 0, len);
		}

		byte[] zip = byteOut.toByteArray();

		byteOut.close();
		filein.close();

		return zip;

	}

	private void updateInstaller(byte[] newZip, String targetFileName)
			throws IOException {

		// load header into a byte array
		FileInputStream input = new FileInputStream(headerPath);
		ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
		int count = 0;
		byte[] buf = new byte[1024];
		while ((count = input.read(buf)) > 0) {
			byteOut.write(buf, 0, count);
		}

		byte[] header = byteOut.toByteArray();
		input.close();
		byteOut.close();

		FileOutputStream newInst = new FileOutputStream(targetFileName);
		newInst.write(header);

		// byte[] newZip = createZip();
		newInst.write(newZip);

		newInst.flush();
		newInst.close();
	}
}
