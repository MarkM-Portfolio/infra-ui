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
package com.ibm.lconn.atom.data;

import java.util.HashMap;
import java.util.Iterator;

public class ServiceData {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private String _userName = "";
	
	private String _password = "";
	
	private boolean _ownerCommunities = false;
	
	private String cookieString = "";
	
	private boolean useHTML;
	
	private String nextPageUrl = null;
	
	public String getNextPageUrl() {
		return nextPageUrl;
	}

	public void setNextPageUrl(String nextPageUrl) {
		this.nextPageUrl = nextPageUrl;
	}

	public boolean isUseHTML() {
		return useHTML;
	}

	public void setUseHTML(boolean useHTML) {
		this.useHTML = useHTML;
	}
	
	public String getUserName() {
		return _userName;
	}
	
	public String getPassword() {
		return _password;
	}
	
	public void setUserName(String name) {
		this._userName = name;
	}
	
	public void setPassword(String password) {
		this._password = password;
	}
	
//	public void addCookie(String token, String value) {
//		_cookies.put(token, value);
//	}
//	
//	public void getCookie(String token) {
//		_cookies.get(token);
//	}
	
	public void setCookieString(String cookieString) {
		this.cookieString = cookieString;
	}
	
	public String getCookieString() {
		return cookieString;
	}

	public void setOwnerCommunities(boolean _ownerCommunities) {
		this._ownerCommunities = _ownerCommunities;
	}

	public boolean isOwnerCommunities() {
		return _ownerCommunities;
	}

}
