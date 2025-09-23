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

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * @author Michael Ahern (michael.ahern@ie.ibm.com)
 *
 */
public class ModHttpServletRequest extends HttpServletRequestWrapper {

	private boolean secure = false;
	private Locale locale = Locale.ENGLISH;

	/**
	 * @param request
	 */
	public ModHttpServletRequest(HttpServletRequest request) {
		super(request);
	}

	/**
	 * @return the secure
	 */
	@Override
	public final boolean isSecure() {
		return secure;
	}

	/**
	 * @param secure the secure to set
	 */
	public final void setSecure(boolean secure) {
		this.secure = secure;
	}

	/**
	 * @return the locale
	 */
	public final Locale getLocale() {
		return locale;
	}

	/**
	 * @param locale the locale to set
	 */
	public final void setLocale(Locale locale) {
		this.locale = locale;
	}

}
