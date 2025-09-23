/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.core.web.resources.servlet;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * @author Michael Ahern (michael.ahern@ie.ibm.com)
 *
 */
public class BufHttpServletResponse extends HttpServletResponseWrapper {

	private StringWriter sw = new StringWriter();
	private PrintWriter writer = new PrintWriter(sw);
	
	public BufHttpServletResponse(HttpServletResponse response) {
		super(response);
	}
	
	@Override
	public void setHeader(String h, String v) { }
	
	public PrintWriter getWriter() {
		return writer;
	}
	
	/**
	 * Get & reset the buffered content
	 * @return
	 */
	public String resetString() {
		final String s = sw.toString();
		sw.getBuffer().delete(0, sw.getBuffer().length());
		return s;
	}

}
