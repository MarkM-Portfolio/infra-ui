/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2012, 2016                                   *
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */

package com.ibm.lconn.bookmarklet.servlet;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.namespace.QName;

import com.ibm.lconn.core.ssl.EasySSLProtocolSocketFactory;
import org.apache.commons.httpclient.protocol.Protocol;
import org.apache.abdera.Abdera;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.abdera.protocol.Response;
import org.apache.abdera.protocol.client.AbderaClient;
import org.apache.abdera.protocol.client.ClientResponse;
import org.apache.abdera.protocol.client.RequestOptions;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.exception.APPServiceException;
import com.ibm.lconn.atom.exception.DuplicateBookmarkException;
import com.ibm.lconn.atom.exception.FeatureDisableException;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.bookmarklet.util.SecurityUtil;
import com.ibm.lconn.bookmarklet.util.TextUtilities;

public class RelatedCommunityServlet extends HttpServlet {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;

	private static final Log LOG = LogFactory.getLog(RelatedCommunityServlet.class);
	private static final ResourceBundleHelper _logResources = BookmarkletUIResourceHelper.getLogResourceHelper();

	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper.getLogResourceHelper();
	private static Abdera _abdera;
	
	public void init(final ServletConfig config) throws ServletException {
		super.init(config);
		Protocol.registerProtocol("https", new Protocol("https",
				new EasySSLProtocolSocketFactory(), 443));
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		this.normalizeParameters(request);
	    this.getServletContext().getRequestDispatcher("/jsp/relatedCommunity_popup.jsp").forward(request, response);
	}	
	
	private void normalizeParameters(HttpServletRequest request) {
		boolean hasCommunity = true;
		String uuid = request.getParameter("uuid");
		String baseUrl = request.getParameter("baseUrl");
		String name = request.getParameter("name");
		String type = request.getParameter("type");
		String description = request.getParameter("description");
		String version = request.getParameter("ver");
		
		if (version != null && !"".equals(version.trim())) {
			version = version.trim();
			request.setAttribute("version", version);
		}
		
		if (uuid != null && !"".equals(uuid.trim())) {
			uuid = uuid.trim();
			if (uuid.length() == 36) {
			    request.setAttribute("uuid", uuid);
			} else {
				hasCommunity = false;
			}
		} else {
			hasCommunity = false;
		}
		
		if (name != null && !"".equals(name.trim())) {
			request.setAttribute("name", name.trim());
		} else {
			hasCommunity = false;
		}		
		
		if (baseUrl != null && !"".equals(baseUrl.trim())) {
			baseUrl = baseUrl.trim();
			if (baseUrl.endsWith("/")) {
				baseUrl = baseUrl.substring(0, baseUrl.length() - 1);
			}
			request.setAttribute("baseUrl", baseUrl);
		} else {
			hasCommunity = false;
		}
		
		request.setAttribute("hasCommunity", hasCommunity);
		
		if (hasCommunity) {
			String communityUrl = baseUrl + "/service/html/communityview?communityUuid=" + uuid;
			request.setAttribute("communityUrl", communityUrl);
			if (type != null && type.equalsIgnoreCase("private")) {
				request.setAttribute("isPrivate", true);
			} else {
				request.setAttribute("isPrivate", false);
			}
			
			if (description == null || "".equals(description.trim())) {
				description = "";
			}
			request.setAttribute("description", description);
		}
	}
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {		
		Exception exception = null;
		ArrayList<String> disabledCommunities = new ArrayList<String>();
		ArrayList<String> errorCommunities = new ArrayList<String>();		
		
		Boolean hasError = false;
		try {
			String[] selectedCommunities = request.getParameterValues("communityUuid");	
			if (selectedCommunities!=null && selectedCommunities.length >0) {
				Exception otherEx = null;
			    for (int i = 0; i < selectedCommunities.length; i++) {
			    	String v = selectedCommunities[i].trim();
			    	int flag = v.indexOf("=");
			    	String communityId = v.substring(0, flag);
			    	String communityName = v.substring(flag+1);
			    	try {
				        abderaPost(request, communityId);		
			    	} catch (DuplicateBookmarkException ex) {
			    		LOG.trace(_logresources.getString("error.connctions.4in1servlet"), ex);
			    	} catch (FeatureDisableException ex) {
			    		hasError = true;
			    		disabledCommunities.add(communityName);			    		
			    		LOG.trace(_logresources.getString("error.connctions.4in1servlet"), ex);
			    	} catch(Exception ex) {
			    		errorCommunities.add(communityName);
			    		LOG.trace(_logresources.getString("error.connctions.4in1servlet"), ex);
			    		otherEx = ex;
			    	}
			    }
			    if (otherEx!=null) {
			    	throw otherEx ;
			    }
			}
		} catch (Exception e) {
			exception  = e;
			hasError = true;
		}
		
		if (!hasError) {
			getServletContext().getRequestDispatcher("/jsp/closeme.jsp").forward(request, response);
		} else {
			request.setAttribute("exception", exception);
			request.setAttribute("disabledCommunities", disabledCommunities);
			request.setAttribute("errorCommunities", errorCommunities);
			request.setAttribute("servletPath", request.getServletPath());
			getServletContext().getRequestDispatcher("/jsp/relatedCommunity_popup_error.jsp").forward(request,
					response);
		}
	}
	
	private void abderaPost(HttpServletRequest request, String toCommunity) throws Exception {
		String publishUrl = ServiceConfiguration.getString("relatedCommunitiesFeed.publish.url") + toCommunity;
		String communityName = request.getParameter("name");
		String communityUrl = request.getParameter("communityUrl");
		String description = request.getParameter("description");		
		
		if (_abdera == null) {
			this.initAbdera();
		}
		
		Entry entry = _abdera.newEntry();
		communityName = TextUtilities.stripNonPrintableCharacters(communityName);
		entry.setTitle(communityName);
		
		entry.setContent(description);
		Element content = entry.getFirstChild(new QName("content"));
		if (content!=null) {
			content.setAttributeValue("type", "html");
		}
		entry.addCategory("http://www.ibm.com/xmlns/prod/sn/type", "term", "relatedCommunity"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		entry.addLink(communityUrl, "http://www.ibm.com/xmlns/prod/sn/related-community");
		
		AbderaClient client = new AbderaClient(_abdera);
		client.getHttpClientParams().setCookiePolicy("compatibility");		
		
		RequestOptions ro = client.getDefaultRequestOptions();
		ro.setHeader("Cookie", request.getHeader("Cookie"));
		
		//AbderaClient.registerTrustManager();
		entry.getDocument().setContentType("application/atom+xml");
		ro.setHeader("Content-Type", "application/atom+xml");

		String entryXml = entry.toString().replaceAll("xmlns=\"\"", "");
		if (LOG.isDebugEnabled()){
			LOG.debug("entry: \n" + entryXml);
		}
		
		publishUrl = SecurityUtil.processS2SUrl(publishUrl);
		if (LOG.isDebugEnabled()) {
			LOG.debug("publish url: " + publishUrl);
		}
		Response response = client.post(publishUrl,	new ByteArrayInputStream(entryXml.getBytes("utf-8")), ro);
		if (response.getStatus() == 302 || response.getStatus() == 301) {
			String url = response.getLocation().toString();
			if (LOG.isDebugEnabled()) {
				LOG.debug("publish url(redirected): " + url);
			}
			url = SecurityUtil.processS2SUrl(url);
			response = client.post(url, new ByteArrayInputStream(entryXml.getBytes("utf-8")), ro);
		}
		if (response.getStatus() == 201) {
			if (LOG.isDebugEnabled()) {
				LOG.debug("invoke: Invoked successfully");
			}
		} else if (response.getStatus() == 409) {
			final String msg0 = _logResources.getString("error.relatedCommunity.addDuplicate");
			LOG.error(msg0);
			throw new DuplicateBookmarkException(msg0);
		} else if (response.getStatus() == 419) {
			final String msg0 = _logResources.getString("error.relatedCommunity.featureDisabled");
			LOG.error(msg0);
			throw new FeatureDisableException(msg0);
		} else {
			ClientResponse cResponse = (ClientResponse) response;
			BufferedReader bf=new BufferedReader(new InputStreamReader(cResponse.getInputStream(),"UTF-8"));  
		    StringBuffer buffer=new StringBuffer();  
		    String line="";  
		    while((line=bf.readLine())!=null){  
		        buffer.append(line);  
		    }  
			final String msg = _logResources.getString("error.invoke.remote.relatedCommunityApi", publishUrl, String.valueOf(response.getStatus()), buffer.toString());
			LOG.error(msg);
			throw new APPServiceException(msg);
		}		
	}
	
	private synchronized void initAbdera() {
		if (_abdera == null) {
			if (LOG.isDebugEnabled()){
				LOG.debug("Abdera is null, need to initialize it");
			}
			_abdera = new Abdera();
		}
	}
}
