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

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspFactory;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.exception.DuplicateBookmarkException;
import com.ibm.lconn.bookmarklet.HighwayConfig;
import com.ibm.lconn.bookmarklet.mode.Mode;
import com.ibm.lconn.bookmarklet.mode.Mode.Constants;
import com.ibm.lconn.bookmarklet.mode.ModeFactory;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.bookmarklet.util.DangerousUrlHelper;
import com.ibm.lconn.config.ConnectionsConfiguration;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.lconn.core.web.cache.WebCacheUtil;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;

public class MultipleBookmarkServlet extends HttpServlet {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;

	private static final Log LOG = LogFactory.getLog(MultipleBookmarkServlet.class);

	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper.getLogResourceHelper();

	protected static ConnectionsConfiguration cfg = null;

	public void init(final ServletConfig config) throws ServletException {
		super.init(config);
		try {
			if (cfg == null)
				cfg = new ConnectionsConfiguration();
		} catch (VenturaConfigException vce) {
			LOG.error(_logresources.getString("error.connections.init"), vce);
		}
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try{
			VenturaConfigurationProvider vcp = VenturaConfigurationProvider.Factory.getInstance();
			if (!request.isSecure()) {
				request.setAttribute("isCustomAuthenEnabled", vcp.getGlobalConfiguration().getString("customAuthentication[@enabled]"));
				Configuration authJsURLConfig = vcp.getGlobalConfiguration().subset("customAuthentication").subset("authJSUrl");
				String url = authJsURLConfig.getString("[@url]");
				request.setAttribute("customAuthenticationURL", url);
			}else {
				request.setAttribute("isCustomAuthenEnabled", vcp.getGlobalConfiguration().getString("customAuthentication[@ssl_enabled]"));
				Configuration sslAuthJsURLConfig = vcp.getGlobalConfiguration().subset("customAuthentication").subset("ssl_authJSUrl");
				String url = sslAuthJsURLConfig.getString("[@url]");
				request.setAttribute("customAuthenticationURL", url);
			}
			Configuration authJSClassNameConfig = vcp.getGlobalConfiguration().subset("customAuthentication").subset("authJSClassName");
			request.setAttribute("customAuthenticationClass", authJSClassNameConfig.getString("[@value]"));
		}catch (VenturaConfigException vce) {
			LOG.error(_logresources.getString("error.connections.init"), vce);
		}
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {
		// Check the user if login
		if(request.getRemoteUser() == null){
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}
		if(!canAccessDogear(request)){
			if("true".equalsIgnoreCase(request.getParameter(Constants.showDogearOnly))){
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
				return;
			}
			
			request.setAttribute("canAccessStandAloneBookmarks", false);
		} else {
			request.setAttribute("canAccessStandAloneBookmarks", true);
		}
		boolean hasError = false;
		boolean isDuplicateError = false;
		boolean hasSubmit = request.getParameter("submit") != null;
		Exception exception = null;
		try {
			Mode mode = ModeFactory.getMode(request, response);
			mode.setPageContext(JspFactory.getDefaultFactory().getPageContext(this, request, response, "", true, 8192, true));
			if (mode.isEditBookmark()){
				if (mode.validateURL(request.getParameter(Constants.url))){
					StringBuffer path = new StringBuffer();
					path
							.append(request.getContextPath())
							.append(request.getServletPath())
							.append("?conflictWithExistingBookmark=yes")
							.append("&url=")
							.append(URLEncoder.encode(request.getParameter(Constants.constantUrl), "utf-8"))
							.append("&")
							.append(Constants.showDogearOnly)
							.append("=")
							.append(request.getParameter(Constants.showDogearOnly));
					if (request.getParameter("inframe") != null){
						path.append("&inframe=")
						.append(request.getParameter("inframe"));
					}
					response.sendRedirect(path.toString());
					return;
				}
			}
			if (hasSubmit) {
				try{
					DangerousUrlHelper.verifyRequest(request, response);
				}catch(Exception e){
					LOG.error(_logresources.getString("error.nononce"), e);
					request.setAttribute("exception", e);
					request.setAttribute("servletPath", request.getServletPath());
					getServletContext().getRequestDispatcher("/jsp/posting_popup_error.jsp").forward(request,
							response);
					return;
				}
			}else{
//				response.setHeader("Pragma", "no-cache");
//				response.setHeader("Cache-Control", "no-store, no-cache");
//				response.setDateHeader("Expires", 0);
				WebCacheUtil.disableCaching(response);
				response.setDateHeader("Expires", 0);
			}
			mode.perform();
		} catch (DuplicateBookmarkException e) {
		    hasError = true;
			isDuplicateError = true;
		} catch (Exception e) {
			exception  = e;
			LOG.trace(_logresources.getString("error.connctions.4in1servlet"), e);
			hasError = true;
		}
		if (!hasError) {
			if (hasSubmit) {
				response.getWriter().write("success");
				//getServletContext().getRequestDispatcher("/jsp/closeme.jsp").forward(request, response);
			}else {
				getServletContext().getRequestDispatcher("/jsp/posting_popup.jsp").forward(request,
						response);
			}
		} else {
		    if(hasSubmit && isDuplicateError) {
			    response.getWriter().write("success.alreadyExist");
			} else {
				request.setAttribute("exception", exception);
				request.setAttribute("servletPath", request.getServletPath());
				getServletContext().getRequestDispatcher("/jsp/posting_popup_error.jsp").forward(request,
						response);
			}
		}
	}

	protected void doDelete(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {
		doPost(request, response);
	}

	private boolean canAccessDogear(HttpServletRequest request){
		
		if(!cfg.isVisitorModeEnabled()) return true;
		
		try {
			HighwayConfig config = new HighwayConfig(request);
			if(config.isExternalUser() && !config.allowStandAloneBookmarks()){
				return false;
			}
			
		} catch (ServletException e) {
		}
		
		return true;
		
	}
}
