/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


package com.ibm.lconn.bookmarklet.servlet;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.connections.highway.client.api.HighwayAdminClient;
import com.ibm.connections.highway.client.api.HighwaySetup;
import com.ibm.connections.highway.common.api.HighwayConstants;
import com.ibm.connections.highway.common.api.HighwayException;
import com.ibm.connections.highway.common.api.HighwaySettingNames;
import com.ibm.connections.highway.common.api.HighwayUserSessionInfo;
import com.ibm.lconn.bookmarklet.mode.Mode;
import com.ibm.lconn.bookmarklet.mode.PageRenderMode;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.config.ConnectionsConfiguration;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;

public class DiscussThisPopupServlet extends HttpServlet {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;

	private static final Log LOG = LogFactory.getLog(MultipleBookmarkServlet.class);

	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper.getLogResourceHelper();
	
	public void init(final ServletConfig config) throws ServletException {
		super.init(config);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {
		try {
			Mode mode = new PageRenderMode(request, response);
			mode.setPageContext(JspFactory.getDefaultFactory().getPageContext(this, request, response, "", true, 8192, true));
			mode.perform();
		} catch (Exception e) {
			LOG.trace(_logresources.getString("error.connctions.4in1servlet"), e);
		}
		
		
		ConnectionsConfiguration cfg = null;
		try {
			cfg = new ConnectionsConfiguration();
		}catch(VenturaConfigException vce) {
			LOG.error(_logresources.getString("error.connections.init"), vce);
			return;
		}
		request.setAttribute("userName", request.getRemoteUser());
		request.setAttribute("lotusLiveEnable", cfg.isLotusLiveEnable());
		HighwayUserSessionInfo info = HighwaySetup.createUserInfoFromRequest(request);
		HighwayAdminClient hc = HighwaySetup.getHighwayAdminClient(HighwayConstants.FORUMS);
		String supported;
        try {
            supported = (String)hc.getSetting(info, "forums.standalone.supported");
            if (supported != null && supported.equals("false")){
                request.setAttribute("userExternal", "true");
            }
        } catch (HighwayException e) {
            if (info.getRoles().contains(HighwaySettingNames.EXTERNALUSER_ROLE)){
                request.setAttribute("userExternal", "true");
            }
        }
		getServletContext().getRequestDispatcher("/jsp/discussThis_popup.jsp").forward(request, response);
	}

}
