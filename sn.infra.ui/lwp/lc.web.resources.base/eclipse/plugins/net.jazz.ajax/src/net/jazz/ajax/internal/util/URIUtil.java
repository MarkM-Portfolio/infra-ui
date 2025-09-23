/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
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

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.Charset;

import org.apache.http.protocol.HTTP;
import org.eclipse.core.runtime.Assert;

public class URIUtil {
	/** bitmask representing the legal chars between 64 and 127 */
	static final long SEGMENT_CHAR_HI = 0x47fffffe87ffffffl;
	/** bitmask representing the legal chars between 0 and 63 */
	static final long SEGMENT_CHAR_LO = 0x2fff7fd200000000l;
	static final char HEXADECIMAL[] = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};

	/**
	 * Encodes any non-empty string for safe use as one segment in the path of a URI/URL.  For example,
	 * characters like '/' or '?' must be encoded, while '+', '=', '(', and '&amp;' are valid.
	 * The method returns the original String if no encoding is required.  All non-ASCII characters will
	 * be encoded.
	 * @param segment a non-empty String to encode
	 * @return the ASCII encoded segment
	 */
	public static String encodeSegment(String segment) {
		int length = segment.length();
		Assert.isTrue(length > 0);
		StringBuilder result = new StringBuilder(length);
		int left, right = 0;
		Charset utf8 = null;
		
		while (right < length) {
			left = right;
			char c = segment.charAt(right);
			if (isLegal(c)) {
				do {
					right++;
				} while (right < length && isLegal(segment.charAt(right)));
				if (left == 0 && right == length)
					return segment;
				result.append(segment, left, right);
			} else {
				do {
					right++;
					if (c >= 0xD800 && c <= 0xDBFF && right < length) {
						c = segment.charAt(right);
						if (c >= 0xDC00 && c <= 0xDFFF)
							right++;
					}
				} while (right < length && !isLegal(c = segment.charAt(right)));
				if (utf8 == null)
					utf8 = Charset.forName(HTTP.UTF_8);
				for (byte b : segment.substring(left, right).getBytes(utf8)) {
					result.append('%');
					result.append(HEXADECIMAL[b >> 4 & 15]);
					result.append(HEXADECIMAL[b & 15]);
				}
			}
		}
		return result.toString();
	}
	
	static boolean isLegal(char c) {
	    if (c < 64)
	    	return (1L << c & SEGMENT_CHAR_LO) != 0;
	    if (c < 128)
	    	return (1L << c - 64 & SEGMENT_CHAR_HI) != 0;
	    return false;
	}
	
	/**
	 * Returns <code>null</code> or a single decoded query parameter value.
	 * @param uri the uri
	 * @param param the parameter
	 * @return <code>null</code> or a value
	 */
	public static String queryParam(String uri, String param) {
		int index = uri.indexOf('?');
		if (index == -1)
			return null;
		uri = "&" + uri.substring(index + 1);
		index = uri.indexOf("&" + param + "=");
		if (index == -1)
			return null;
		index += param.length() + 2;
		int end = uri.indexOf('&', index);
		if (end == -1)
			end = uri.length();
		try {
			return URLDecoder.decode(uri.substring(index, end), HTTP.UTF_8);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}

}
