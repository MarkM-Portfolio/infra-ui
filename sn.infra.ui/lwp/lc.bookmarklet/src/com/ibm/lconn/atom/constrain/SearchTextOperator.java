/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2007, 2012                                    
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */
package com.ibm.lconn.atom.constrain;

import org.apache.commons.httpclient.URIException;

import com.ibm.lconn.atom.util.URLUtil;

public enum SearchTextOperator {
	OR, AND;
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	public String formatURL(String url) throws URIException {
		return URLUtil.addQueryParameter(url, "searchOpertor", this.name());
	}
}
