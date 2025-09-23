/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.taglib;

import javax.servlet.jsp.JspException;

import com.ibm.lconn.bookmarklet.Copyright;

public class JSStringEscapeTag extends AbstractBodyTransformer {

	private final static String COPYRIGHT = Copyright.SHORT;

	@Override
	protected String transform(String s) throws JspException {
		return escapeJavascriptString(s);
	}

	public static String escapeJavascriptString(String s) throws JspException {
		if (s == null)
			return null;
		String out = s.replaceAll("\\\\", "\\\\\\\\")
				.replaceAll("\"", "\\\\\"").replaceAll("<", "&lt;").replaceAll(
						">", "&gt;").replace("\n", "").replace("\r", "");

		return out;
	}
}
