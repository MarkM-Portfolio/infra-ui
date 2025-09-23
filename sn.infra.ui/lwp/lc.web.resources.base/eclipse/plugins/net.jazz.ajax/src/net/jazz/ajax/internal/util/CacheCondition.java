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

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.SimpleTimeZone;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpRequest;

public class CacheCondition {
	
	private static final Object LOCK = new Object();
	private static final DateFormat rfc822;
	
	static {
		synchronized (LOCK) {
			rfc822 = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z", Locale.ENGLISH);
			rfc822.setTimeZone(new SimpleTimeZone(0, "GMT"));
		}
	}
	
	String etag;
	long lastModified = -1;
	int maxAge;
	long timestamp = System.currentTimeMillis();
	
	public CacheCondition() {
	}
	
	public boolean acceptsConditionally(CacheWindow window) {
		if (lastModified == -1 || lastModified != window.lastModified)
			return false;
		if (etag != null && !etag.equals(window.etag))
			return false;
		return true;
	}
	
	public boolean acceptsFreshness(CacheWindow window) {
		int age = Math.max(window.freshFor, maxAge);
		long left = window.timestamp + age * 1000;
		long right = timestamp;
		boolean condition = left >= right;
		return condition;
	}
	
	public void applyTo(HttpRequest request) {
		if (lastModified > 0)
			request.setHeader("If-Modified-Since", formatDate(lastModified));
	}
	
	void ifNewerThan(CacheWindow cacheability) {
		this.lastModified = cacheability.lastModified;
	}

	public String toString() {
		String result = "CacheCondition\n\tIf-Modified-Since: ";
		if (lastModified == -1)
			result += "N/A";
		else
			result += new Date(lastModified);
		result += "\n\tAge: " + maxAge +"s";
		result += "\n\tTimestamp: " + new Date(timestamp);
		return result;
	}
	
	public static CacheCondition create(HttpServletRequest request) {
		CacheDirectives control = CacheDirectives.create(request);
		CacheCondition result = new CacheCondition();
		if (control.maxAge != null)
			result.maxAge = control.maxAge;
		result.lastModified = request.getDateHeader("If-Modified-Since");
		result.etag = request.getHeader("If-None-Match");
		return result;
	}

	static String formatDate(long time) {
		synchronized (LOCK) {
			return rfc822.format(new Date(time));
		}
	}
	
	// ADDED
	public String getETag()
	{
		return etag;
	}
	
	// ADDED
	public long getLastModified()
	{
		return lastModified;
	}
}
