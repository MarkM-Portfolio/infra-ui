/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.web.resources.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.core.web.cache.WebCacheUtil;

/**
 * Simple servlet that returns the current system time
 */
public class SystemTimeServlet extends HttpServlet {
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest reques, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json");
		WebCacheUtil.disableCachingOverridableIESafe(response);
		PrintWriter out = response.getWriter();
		out.println("{\"time\": " + System.currentTimeMillis() + "}");
	}

}
