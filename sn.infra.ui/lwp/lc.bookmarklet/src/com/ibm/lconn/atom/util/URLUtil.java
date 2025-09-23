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
package com.ibm.lconn.atom.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.commons.httpclient.URIException;
import org.apache.commons.httpclient.util.URIUtil;


public class URLUtil {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	public static String addQueryParameter(String url, String param, String value) throws URIException {
		StringBuffer rtn = new StringBuffer(url);
		if(rtn.indexOf("?") < 0 ) { // hasn't have any query string
			rtn.append('?');
		} else {
			rtn.append('&');
		}
		
		try {
			rtn.append(param).append('=').append(URLEncoder.encode(value, "utf-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rtn.toString();
	}

}
