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

/**
 * 
 */
package com.ibm.lconn.feedlet.servlet;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;

/**
 * This servlet builds the JSON string that helps the feedlet popup UI determine
 * the targets for feed subscription.
 * 
 * For the first time round this will just return options to add to Communities
 * and subscribe via the browser. However the intention is that this will be 
 * an extensible mechanism that, via a configuration file, will allow additional
 * feed subscription mechanisms to be plugged in. This could include the Home
 * Page subscription capability and other enterprise feed services such as 
 * Newsgator.
 * 
 * @author aspender
 *
 */
public class FeedletActionsServlet extends HttpServlet {

	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;

	private static final Log LOG = LogFactory.getLog(FeedletActionsServlet.class);

	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper.getLogResourceHelper();

	public void init(final ServletConfig config) throws ServletException {
		super.init(config);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		// TODO - work to read config and dynamically create feed actions
		getServletContext().getRequestDispatcher("/jsp/feedletActions.jsp").forward(request,
				response);
	}

}
