/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.servlet;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.bookmarklet.util.SecurityUtil;
import com.ibm.lconn.config.ConnectionsConfiguration;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.lconn.core.web.cache.WebCacheUtil;
import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;

public class TagsLikeProxyServlet extends BookmarkletServlet{
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private static final Log LOG = LogFactory.getLog(TagsLikeProxyServlet.class);
	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
	.getLogResourceHelper();
	
	private static final String dogearTagsLikeUrl = "/tagslike";
	private static final String communitiesTagsLikeUrl = "/service/html/community/autoCompleteTags.do";
	private static final String blogsTagsLikeUrl = "/roller-services/json/typeahead";
	private static final String activitiesTagsLikeUrl = "/service/json/tags";
	
	public void init(final ServletConfig config) throws ServletException {
		super.init(config);
	}
	
	protected void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String service = request.getParameter("service");
		String url = "";
		try {
			if (cfg == null) cfg = new ConnectionsConfiguration();
		}catch(VenturaConfigException vce) {
			LOG.error(_logresources.getString("error.connections.init"), vce);
			return;
		}
		String prefix = request.getParameter("prefix");
		String format = request.getParameter("format");
		String limit = request.getParameter("limit");
		if (ServiceReferenceUtil.Service.BOOKMARKS.equals(service)) {
			if (cfg.isDogearEnabled()) {
				try{
					url = cfg.getDogearServiceUrl() + dogearTagsLikeUrl;
					url = url + "?lang=en&prefix=" + URLEncoder.encode(prefix, "utf-8") + "&format=" + format + "&limit=" + limit + "&access=any";
				}catch(Exception ex){
					return;
				}
			}
		}else if (ServiceReferenceUtil.Service.BLOGS.equals(service)) {
			if (cfg.isBlogsEnabled()) {
				if (prefix == null) return;
				url = cfg.getBlogsServiceUrl() + blogsTagsLikeUrl + "?lang=en&limit=" + limit + "&tag=" + prefix;
			}
		}else if (ServiceReferenceUtil.Service.ACTIVITIES.equals(service)){
			if (cfg.isActivitiesEnabled()){
				url = cfg.getActivitiesServiceUrl() + activitiesTagsLikeUrl + "?lang=en&tag=" + prefix;
			}
		}else if (ServiceReferenceUtil.Service.COMMUNITIES.equals(service)){
			if (cfg.isCommunitiesEnabled()){
				url = cfg.getCommunitiesServiceUrl() + communitiesTagsLikeUrl + "?lang=en&format=" + format + "&tag=" + prefix;
			}
		}else if ("tagrecs".equals(service)){
			try{
				url = cfg.getDogearServiceUrl() + "/tagrecs?lang=en&access=any&url=" + URLEncoder.encode(request.getParameter("url"), "utf-8");
			}catch(Exception ex){
				return;
			}
		}else {
			return;
		}
		// fix url for SmartCloud
		url = SecurityUtil.processS2SUrl(url);
		
		setHttpResponseHeaders(request, response);
		HttpClient client = new HttpClient();
		GetMethod method = new GetMethod(url);
		method = (GetMethod)handleAuthentication(method, request);
		method.getParams().setCookiePolicy("compatibility");
		client.executeMethod(method);
		if (LOG.isDebugEnabled()){
			LOG.debug("get method status code: " + method.getStatusCode());
		}
		if (method.getStatusCode() == HttpStatus.SC_OK) {
			response.setCharacterEncoding("utf-8");
			if (method.getResponseHeader("Content-Type") != null){
				response.setContentType(method.getResponseHeader("Content-Type").getValue());
			}
			InputStream ris = method.getResponseBodyAsStream();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int count = -1;
			while((count = ris.read(buf)) != -1) {
				baos.write(buf, 0, count);
			}
			ris.close();
			baos.close();
			String data = new String(baos.toByteArray(), "UTF-8");
			response.getWriter().print(data);
		}
		method.releaseConnection();
	}
	
	private void setHttpResponseHeaders(HttpServletRequest request, HttpServletResponse response) {
		// 1 minute
		WebCacheUtil.setupCacheHeaders(response, false, false, 60);
	}

}
