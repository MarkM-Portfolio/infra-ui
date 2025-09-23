/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax.internal.util;

import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;

public class CacheWindow {
	
	final long lastModified;
	volatile long timestamp;
	final int storeOnClient, freshFor;
	final boolean isPublic = true;
	final String etag;
	
	public CacheWindow(long lastModified, Integer storeOnClient, int freshFor) {
		this(lastModified, storeOnClient, freshFor, null);
	}
	
	public CacheWindow(long lastModified, Integer storeOnClient, int freshFor, String etag) {
		this.lastModified = lastModified - lastModified % 1000;
		if (storeOnClient == null)
			storeOnClient = 0;
		this.storeOnClient = storeOnClient;
		this.freshFor = freshFor;
		this.timestamp = System.currentTimeMillis();
		this.etag = etag;
	}
	
	// CHANGED
	public void applyTo(HttpServletResponse response) {
		if (lastModified > 0)
			response.setDateHeader("Last-Modified", lastModified);
		if (storeOnClient >= 0) {
			response.setDateHeader("Expires", timestamp + storeOnClient * 1000L);
			String headerStr = "";
			if(isPublic)
				headerStr = "public, max-age=" + storeOnClient + ", s-maxage=" + storeOnClient;
			else
				headerStr = "max-age=" + storeOnClient;
			response.addHeader("Cache-Control", headerStr);
		}
		// MOVED
		else if (isPublic)
			response.addHeader("Cache-Control", "public");
			
		if (etag != null)
			// ADDED: ETag header must be enclosed in quotes 
			response.setHeader("ETag", "\"" + etag + "\"");
	}
	
	public void applyTo(HttpServletResponse response, int status) {
		response.setStatus(status);
		applyTo(response);
	}
	
	public String getETag() {
		return etag;
	}
	
	public long getLastModified() {
		return lastModified;
	}
	
	// ADDED
	public long getTimestamp() {
		return timestamp;
	}
	
	// CHANGED: uncommented
	public int getMaxAge() {
		return storeOnClient;
	}
	
	// CHANGED: uncommented
	public boolean isPublic() {
		return isPublic;
	}
	
	// CHANGED: made public
	public void renew() {
		this.timestamp = System.currentTimeMillis();
	}
	
	// CHANGED: made public
	public void renew(CacheWindow newer) {
		this.timestamp = newer.timestamp;
	}
	
	public String toString() {
		String result = "CacheWindow:\n\tTimestamp: " + new Date(timestamp);
		result += "\n\tValid for: " + freshFor + "s";
		result += "\n\tModified: " + new Date(lastModified);
		return result;
	}
	
	public static CacheWindow forResponse(HttpResponse response, int freshFor) {
		CacheDirectives directives = CacheDirectives.create(response);
		return new CacheWindow(
				CacheDirectives.lastModified(response),
				directives.maxAge,
				freshFor);
	}

}
