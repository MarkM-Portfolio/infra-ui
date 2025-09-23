/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2008, 2015                                    
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */

package com.ibm.lconn.bookmarklet.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.ibm.lconn.core.ssl.EasySSLProtocolSocketFactory;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.protocol.Protocol;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.mode.Mode.Constants;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.lconn.config.ConnectionsConfiguration;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;

public abstract class BookmarkletServlet extends HttpServlet {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;

	protected static ConnectionsConfiguration cfg = null;

	private static final Log LOG = LogFactory.getLog(BookmarkletServlet.class);

	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
			.getLogResourceHelper();

	protected HttpMethodBase handleAuthentication(HttpMethodBase method,
			HttpServletRequest request) {
		String cookieString = request.getHeader("Cookie");
		if (!"".equals(cookieString)) {
			Header header = new Header("Cookie", cookieString);
			method.setRequestHeader(header);
		}
		return method;
	}

	public void init(final ServletConfig config) throws ServletException {
		super.init(config);
		try {
			if (cfg == null)
				cfg = new ConnectionsConfiguration();
			Protocol.registerProtocol("https", new Protocol("https",
				new EasySSLProtocolSocketFactory(), 443));
		} catch (VenturaConfigException vce) {
			LOG.error(_logresources.getString("error.connections.init"), vce);
		}
	}
}
