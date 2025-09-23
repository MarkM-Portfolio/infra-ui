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

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.Header;
import org.apache.http.HttpResponse;

public class CacheDirectives {
	
	public Integer maxAge;
	public boolean isPublic;
	public boolean isPrivate;
	public boolean noCache;
	public boolean noStore;
	
	CacheDirectives(Iterable<String> headers) {
		for(String header : headers) {
			//Split header value at commas, excluding commas in quotes
			for(String directive : header.split(",(?=([^\"]*\"[^\"]*\")*(?![^\"]*\"))")) { //$NON-NLS-1$
				String[] parts = directive.split("=", 2); //$NON-NLS-1$
				String key = parts[0].trim();
				String value = null;
				if (parts.length == 2)
					value = parts[1].trim();
				if (key.equals("max-age"))
					maxAge = Integer.valueOf(value);
				else if (key.equals("public"))
					isPublic = true;
				else if (key.equals("private"))
					isPrivate = true;
				else if (key.equals("no-cache"))
					noCache = true;
				else if (key.equals("no-store"))
					noStore = true;
			}
		}
	}
	
	public static CacheDirectives create(HttpResponse response) {
		List<String> list = new ArrayList();
		for (Header header : response.getHeaders("Cache-Control"))
			list.add(header.getValue());
		return new CacheDirectives(list);
	}
	
	public static CacheDirectives create(HttpServletRequest request) {
		Enumeration<String> headers = request.getHeaders("Cache-Control");
		List<String> list = new ArrayList();
		while (headers.hasMoreElements())
			list.add(headers.nextElement());
		return new CacheDirectives(list);
	}

	/**
	 * Returns the last-modified local time indicated by the response, if one can be determined.
	 * Otherwise, -1 is returned.
	 */
	public static long lastModified(HttpResponse response) {
		long lastModified = -1;
		Header lastModifiedHeader = response.getFirstHeader("Last-Modified");
		if (lastModifiedHeader == null)
			return lastModified;
		String hdrLastModified = lastModifiedHeader.getValue();
		//String hdrDate = response.getFirstHeader("Date").getValue();
		//TODO adjust according to the actual time on the responding server
		if (hdrLastModified != null)
			lastModified = Util.parseTimeRFC2616(hdrLastModified);
		return lastModified;
	}
	
}
