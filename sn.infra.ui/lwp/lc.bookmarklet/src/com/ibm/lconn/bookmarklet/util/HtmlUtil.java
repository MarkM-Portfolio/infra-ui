/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.StringCharacterIterator;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.ibm.lconn.bookmarklet.Copyright;

public class HtmlUtil
{
	private final static String COPYRIGHT = Copyright.SHORT;

	private HtmlUtil()
	{
		super();
	}

	public static String encodeHtml(String htmlFragment)
	{
		final StringBuffer result = new StringBuffer();

		final StringCharacterIterator it = new StringCharacterIterator(htmlFragment);
		for (char c = it.current(); c != StringCharacterIterator.DONE; c = it.next())
		{
			if (c == '<')
				result.append("&lt;");
			else if (c == '>')
				result.append("&gt;");
			else if (c == '\"')
				result.append("&quot;");
			else if (c == '\'')
				result.append("&#039;");
			else if (c == '\\')
				result.append("&#092;");
			else if (c == '&')
				result.append("&amp;");
			else
				result.append(c);
		}
		return result.toString();
	}

	public static String getEncodedQuery(Map<String, String> params)
	{
		return getEncodedQuery(params, true);
	}


	public static String getEncodedQuery(Map<String, String> params, boolean encodeAmp,
					String lastKey, String lastValue) {
		
		StringBuffer query = getEncodedQueryBuffer(params, encodeAmp);
		if (query.length() > 0)
			query.append(encodeAmp ? "&amp;" : "&");
		query.append(urlEncode(lastKey) + "=" + urlEncode(lastValue));
		
		if (query.length() > 0)
			return "?" + query.toString();
		return "";
	}
	
	public static String getEncodedQuery(Map<String, String> params, boolean encodeAmp)
	{
		StringBuffer query = getEncodedQueryBuffer(params, encodeAmp);
		
		if (query.length() > 0)
			return "?" + query.toString();
		return "";
	}
	
	private static StringBuffer getEncodedQueryBuffer(Map<String, String> params, boolean encodeAmp)
	{
		StringBuffer query = new StringBuffer();
		Iterator<Entry<String, String>> paramIterator = params.entrySet().iterator();
		while (paramIterator.hasNext())
		{
			Entry<String, String> param = paramIterator.next();
			if (query.length() > 0)
				query.append(encodeAmp ? "&amp;" : "&");
			query.append(urlEncode(param.getKey()) + "=" + urlEncode(param.getValue()));
		}
		return query;
	}

	public static String getFormFields(Map<String, String> params)
	{
		StringBuffer query = new StringBuffer();
		Iterator<Entry<String, String>> paramIterator = params.entrySet().iterator();
		while (paramIterator.hasNext())
		{
			Entry<String, String> param = paramIterator.next();
			StringBuffer sb = new StringBuffer(70);
			sb.append("<input type='hidden' name='").append(param.getKey());
			sb.append("' value='").append(param.getValue()).append("'/>");
			query.append(sb.toString());
		}
		return query.toString();
	}


	@SuppressWarnings("deprecation")
	public static String urlEncode(String s)
	{
		try
		{
			return URLEncoder.encode(s, "UTF-8");
		}
		catch (UnsupportedEncodingException e)
		{
			return URLEncoder.encode(s);
		}
	}
	public static String escapeUnsafeCharacters(String s)
	{
		StringBuffer result = new StringBuffer();
		final StringCharacterIterator it = new StringCharacterIterator(s);
		for (char c = it.current(); c != StringCharacterIterator.DONE; c = it.next())
		{
			if (c == ' ')
				result.append("%20");
			else if (c == '"')
				result.append("%22");
			else if (c == '<')
				result.append("%3C");
			else if (c == '>')
				result.append("%3E");
//			else if (c == '#')
//				result.append("%23");
//			else if (c == '%')
//				result.append("%25");
			else if (c == '{')
				result.append("%7B");
			else if (c == '}')
				result.append("%7D");
			else if (c == '|')
				result.append("%7C");
			else if (c == '\\')
				result.append("%5C");
//			else if (c == '^')
//				result.append("%5E");
//			else if (c == '~')
//				result.append("%7E");
			else if (c == '[')
				result.append("%5B");
			else if (c == ']')
				result.append("%5D");
//			else if (c == '`')
//				result.append("%60");
			else
				result.append(c);
		}

		return result.toString();
	}
}
