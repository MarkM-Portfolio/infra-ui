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

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Locale;
import java.util.SimpleTimeZone;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.jazz.ajax.internal.AjaxFramework;

import org.apache.commons.io.IOUtils;
import org.apache.http.protocol.HTTP;

public class Util {

	static final DateFormat[] RFC2616;
	private static final Pattern EXT = Pattern.compile(".+(\\.(?:js|html?))$");
	static {
		DateFormat RFC822, RFC850, ANSIC;
		TimeZone GMT = new SimpleTimeZone(0, "GMT");
		RFC822 = new SimpleDateFormat(
				"EEE, dd MMM yyyy HH:mm:ss z", Locale.ENGLISH); //$NON-NLS-1$
		RFC822.setTimeZone(GMT);
		RFC850 = new SimpleDateFormat("EEEE, dd-MMM-yy HH:mm:ss z",
				Locale.ENGLISH);
		RFC850.setTimeZone(GMT);
		ANSIC = new SimpleDateFormat("EEE MMM d HH:mm:ss yyyy", Locale.ENGLISH);
		ANSIC.setTimeZone(GMT);
		RFC2616 = new DateFormat[]{RFC822, RFC850, ANSIC};
	}

	public static void join(Appendable output, CharSequence separator,
			Collection<? extends CharSequence> strings) {
		try {
			boolean separate = false;
			for (CharSequence each : strings) {
				if (separate)
					output.append(separator);
				else
					separate = true;
				output.append(each);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static long parseTimeRFC2616(String time) {
		synchronized (RFC2616) {
			for (int i = 0; i < RFC2616.length; i++)
				try {
					return RFC2616[i].parse(time).getTime();
				} catch (ParseException e) {
				}
		}
		throw new IllegalArgumentException("Unable to parse time:" + time);
	}

	// ADDED:
	public static StringBuilder stringBuilder(URL[] urls) {
		for (URL url : urls) {
			if (url == null)
				continue;
			InputStream is = null;
			try {
				is = url.openStream();
				return stringBuilder(is);
			} catch (FileNotFoundException e) {
				continue;
			} catch (IOException e) {
				throw new RuntimeException(e);
			} finally {
				IOUtils.closeQuietly(is);
				is = null;
			}
		}
		return null;
	}

	// CHANGED:
	public static StringBuilder stringBuilder(URL url) {
		InputStream is = null;
		try {
			is = url.openStream();
			return stringBuilder(is);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			IOUtils.closeQuietly(is);
			is = null;
		}
	}

	/**
	 * CHANGED: input is closed after all data is read.
	 * 
	 * @param input
	 * @return a String buffer containing the UTF-8 decoded contents of this
	 *         stream
	 */
	public static StringBuilder stringBuilder(InputStream input) {
		try {
			Reader reader;
			try {
				reader = new InputStreamReader(input, HTTP.UTF_8);
			} catch (UnsupportedEncodingException e) {
				throw new RuntimeException(e);
			}
			StringBuilder result = new StringBuilder();
			char buffer[] = new char[4096];
			int length;
			try {
				while ((length = reader.read(buffer)) > 0)
					result.append(buffer, 0, length);
				reader.close();
				return result;
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		} finally {
			IOUtils.closeQuietly(input);
		}
	}

	/**
	 * ADDED: Safely closes a URL connection on Windows to ensure file locks are
	 * released.
	 * 
	 * @param url
	 * @return the last modification time of a URL or -1 if the time was not
	 *         available
	 */
	public static long getLastModified(URL url) {
		long time = -1;
		InputStream is = null;
		try {
			if (url != null) {
				URLConnection connection = url.openConnection();
				/*
				 * sun.net.www.protocol.file.FileURLConnection opens the input
				 * stream when getLastModified() is called, thus it is not
				 * closed until a GC occurs. Must close to release file lock on
				 * Windows.
				 */
				is = connection.getInputStream();
				time = connection.getLastModified();
			}
		} catch (FileNotFoundException e) {
			// Ignore missing files
		} catch (IOException e) {
			// Avoid eating the exception for boundary cases on read
			AjaxFramework.log(
					"Unable to check modification date '" + url + "'", e);
		} finally {
			IOUtils.closeQuietly(is);
		}
		return time;
	}

	public static StringBuffer stringBuffer(InputStream input) {
		Reader reader;
		try {
			reader = new InputStreamReader(input, HTTP.UTF_8);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
		StringBuffer result = new StringBuffer();
		char buffer[] = new char[4096];
		int length;
		try {
			while ((length = reader.read(buffer)) > 0)
				result.append(buffer, 0, length);
			reader.close();
			return result;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	// ADDED
	public static URL[] getURLs(URL... urls) {
		for (URL url : urls)
			if (url != null)
				return urls;
		return null;
	}

	// ADDED
	public static URL getURL(URL[] urls) {
		for (URL url : urls)
			if (url != null)
				return url;
		return null;
	}

	// ADDED
	public static String toPath(String id) {
		if (id == null)
			return null;
		Matcher matcher = EXT.matcher(id);
		if (matcher.matches()) {
			String ext = matcher.group(1);
			return id.substring(0, id.indexOf(ext)).replace('.', '/') + ext;
		}
		return id;
	}
}
