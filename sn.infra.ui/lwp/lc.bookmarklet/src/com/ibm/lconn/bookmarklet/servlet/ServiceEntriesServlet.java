/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


package com.ibm.lconn.bookmarklet.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.exception.AtomServiceException;
import com.ibm.lconn.bookmarklet.mode.Mode;
import com.ibm.lconn.bookmarklet.mode.ModeFactory;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;

public class ServiceEntriesServlet extends BookmarkletServlet{
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private static final Log LOG = LogFactory.getLog(ServiceEntriesServlet.class);
	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper.getLogResourceHelper();
	
	
	public void init(final ServletConfig config) throws ServletException {
		super.init(config);
	}
	
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		if (cfg == null) return;
		Mode mode = ModeFactory.getMode(request, response);
		try{
			List entries = (List)mode.perform();
			request.setAttribute("service", request.getParameter("service"));
			request.setAttribute("service_entries", entries);
			
		}catch(Exception e){
			LOG.error(_logresources.getString("error.service.proxy.entries", request.getParameter("service")), e);
		}
		response.setContentType("application/json");
		getServletContext().getRequestDispatcher("/jsp/service_entries.jsp").forward(request, response);
	}
}
