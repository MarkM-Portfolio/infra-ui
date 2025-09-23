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

import org.apache.commons.httpclient.URI;
import org.apache.commons.httpclient.URIException;

import com.ibm.lconn.atom.util.URLUtil;

/**
 * 
 * 
 * 
 * @author Alan Cui (cuicai@cn.ibm.com)
 *
 */
public class QueryStringConstraint implements Constraint {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private String parameter;

	private String value;

	/**
	 * @param param
	 * @param value
	 */
	QueryStringConstraint(String param, String value) {
		this.parameter = param;
		this.value = value;
	}

	/**
	 * @param param
	 * @param value
	 * @return
	 */
	public static QueryStringConstraint constrain(String param, String value) {
		return new QueryStringConstraint(param, value);
	}

	/* (non-Javadoc)
	 * @see com.ibm.lconn.atom.constrain.Constraint#formatURL(java.lang.String)
	 */
	public String formatURL(String url) throws URIException, NullPointerException {
		return URLUtil.addQueryParameter(url, parameter, value);
	}

}
