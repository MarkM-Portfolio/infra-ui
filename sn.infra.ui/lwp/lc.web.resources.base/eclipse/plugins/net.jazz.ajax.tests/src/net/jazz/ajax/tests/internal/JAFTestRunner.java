/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/
package net.jazz.ajax.tests.internal;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class JAFTestRunner implements Runnable {
	
	private static final String SEPARATOR = "::";
	
	private BlockingQueue<String> queue = new ArrayBlockingQueue<String>(1);
	private Map<String, BlockingQueue<String>> testInProgress = new HashMap<String, BlockingQueue<String>>();
	private Map<String, List<String>> testHosts = Collections.synchronizedMap(new HashMap<String, List<String>>());
	private Map<String, Boolean> suitesExecutedMap = new HashMap<String, Boolean>();
	
	private static JAFTestRunner instance;
	private static Thread instanceThread;
	
	private JAFTestRunner() {
		super();
		try {
			fetchTestHosts();
			for (String curKey : getHostBrowserKeys()) {
				testInProgress.put(curKey, new ArrayBlockingQueue<String>(1));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static JAFTestRunner instance() {
		if (instance == null) {
			instance = new JAFTestRunner();
			instanceThread = new Thread(instance);
			instanceThread.start();
		}
		return instance;
	}
	
	public void run() {
		while (true) {
			try {
				String testModule = queue.take();
				String testUrlBase = Constants.getServerURLPrefix() + "_test?testModule=" + testModule;
				for (String hostKey : testHosts.keySet()) {
					for (String browser : testHosts.get(hostKey)) {
						String testUrl = testUrlBase + "&key=" + hostKey + SEPARATOR + browser;
						testUrl += "&numTesters=" + getBrowserCount();
						testInProgress.get(hostKey + SEPARATOR + browser).put(testUrl);
						URL launchTest = new URL(hostKey + "/launch?browser=" + browser + "&url=" + URLEncoder.encode(testUrl, "UTF-8"));
						launchTest.openStream();
					}
				}
			} catch (MalformedURLException e) {
			} catch (IOException e) {				
			} catch (InterruptedException e) {
				break;
			}
		}
	}
	
	public void runTest(String testModule) throws InterruptedException {
		// Since we must run DOH tests on a per-suite basis rather than a per-test basis,
		// we should make sure we don't run the same suite of tests twice.
		if (suitesExecutedMap.get(testModule) == null) {
			suitesExecutedMap.put(testModule, true);
			queue.put(testModule);
		}
	}
	
	public void testComplete(String browserKey) throws InterruptedException {
		String url = testInProgress.get(browserKey).poll();
		// The browser may have been closed by a previous test from this suite...  Don't do anything
		// if url is undefined.
		if (url != null) {
			String[] hostBrowser = browserKey.split(SEPARATOR);
			closeBrowser(hostBrowser[0], hostBrowser[1], url);
		}
	}
	
	private void fetchTestHosts() throws IOException {
		// Get the test host location
		// 1.) Use the net.jazz.ajax.tests.testHosts value
		// 2.) Derive the value from the server.uri value
		// 3.) Use a default value of http://localhost:9080/jafTestClient
		String serverUri = System.getProperty("server.uri", "http://localhost:9080/");
		String defaultValue = serverUri.substring(0, serverUri.lastIndexOf('/')) + "/jafTestClient";
		String testHostProp = System.getProperty("net.jazz.ajax.tests.testHosts", defaultValue);
		for (String curHost : testHostProp.split(",")) {
			URL infoUrl = new URL(curHost + "/list");
			try {
				DocumentBuilder docBuilder;
				DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
				docBuilder = docBuilderFactory.newDocumentBuilder();
				Document xmlDoc = docBuilder.parse(infoUrl.openStream());
				List<String> browserList = new ArrayList<String>();
				NodeList browserNodes = xmlDoc.getElementsByTagName("browser");
				for (int i=0; i < browserNodes.getLength(); i++) {
					Element curElem = (Element)browserNodes.item(i);
					browserList.add(curElem.getAttribute("id"));
				}
				testHosts.put(curHost, browserList);
			} catch (ParserConfigurationException e) {
				throw new IOException("Unable to parse browser list for " + curHost);
			} catch (SAXException e) {
				throw new IOException("Unable to parse browser list for " + curHost);
			}
		}
	}
	
	private int getBrowserCount() {
		int browserCount = 0;
		for (String key : testHosts.keySet()) {
			browserCount += testHosts.get(key).size();
		}
		return browserCount;
	}

	public List<String> getHostBrowserKeys() {
		List<String> list = new ArrayList<String>();
		for (String host : testHosts.keySet()) {
			for (String browser : testHosts.get(host)) {
				list.add(host + SEPARATOR + browser);
			}
		}
		return list;
	}
	
	public void closeBrowser(String host, String browser, String url) {
		try {
			URL closeBrowser = new URL(host + "/close?browser=" + browser + "&url=" + URLEncoder.encode(url, "UTF-8"));
			closeBrowser.openStream();
		} catch (MalformedURLException e) {
		} catch (IOException e) {
		}
	}
}
