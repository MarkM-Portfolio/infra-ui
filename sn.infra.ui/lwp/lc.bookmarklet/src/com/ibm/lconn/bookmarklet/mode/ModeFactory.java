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


package com.ibm.lconn.bookmarklet.mode;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ModeFactory {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	public static Mode getMode(HttpServletRequest request, HttpServletResponse response) {
		if (request.getParameter("service") != null){
			return new ServiceProxyMode(request, response);
		}
		else if(request.getParameter("submit") != null) {
			return new PostingMode(request, response);
		}else {
			return new PageRenderMode(request, response);
		}
	}
}
