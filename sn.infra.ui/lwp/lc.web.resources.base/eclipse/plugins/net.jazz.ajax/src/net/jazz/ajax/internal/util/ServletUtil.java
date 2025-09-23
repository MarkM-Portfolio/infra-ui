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

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.URI;
import java.net.URLDecoder;
import java.util.List;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.AjaxFramework;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.eclipse.core.runtime.Assert;

public class ServletUtil {

	static final String PREFERRED = HTTP.UTF_8;
	static final String BACKUP = HTTP.ISO_8859_1;
	
	static void checkPath(String cookiePath) {
		Assert.isTrue(cookiePath.length() == 0 || cookiePath.startsWith("/"));
	}
	
	public static void clearCookie(HttpServletResponse response, String cookieName, String path) {
		checkPath(path);
		Cookie cookie = new Cookie(cookieName, "");
		cookie.setPath(path);
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}

	static ContentEncoding contentEncoding(HttpResponse source) {
		Header header = source.getEntity().getContentEncoding();
		if (header != null && "gzip".equals(header.getValue()))
			return ContentEncoding.gzip;
		return ContentEncoding.none;
	}

	public static String decode(String string) {
		try {
			return URLDecoder.decode(string, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}
	
	public static String externalContext(HttpServletRequest request) {
		URI uri = URI.create(request.getRequestURL().toString());
		return uri.getScheme() + "://" + uri.getRawAuthority() + request.getContextPath();
	}

	public static String externalDomain(HttpServletRequest request) {
		URI uri = URI.create(request.getRequestURL().toString());
		return uri.getScheme() + "://" + uri.getRawAuthority();
	}
	
	public static String getRequestURLWithQuery(HttpServletRequest request) {
		StringBuffer result = request.getRequestURL();
		if (request.getQueryString() != null)
			result.append("?" + request.getQueryString());
		return result.toString();
	}
	
	/**
	 * Returns an uncompressed input stream.
	 * @param response the HTTP response that was received
	 * @return an uncompressed input stream
	 * @throws IOException
	 */
	public static InputStream negotiateInputStream(HttpResponse response) throws IOException {
		InputStream result = response.getEntity().getContent();
		Header header = response.getEntity().getContentEncoding();
		if (header != null && "gzip".equals(header.getValue()))
			result = new GZIPInputStream(result);
		return result;
	}
	
	// CHANGED: handle pack200-gzip encoding
	public static OutputStream negotiateOutputStream(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String acceptEncoding = request.getHeader("Accept-Encoding");
		if (acceptEncoding != null) {
			if (acceptEncoding.contains("pack200-gzip")) {
				response.setHeader("Content-Encoding", "pack200-gzip");
			} else if (acceptEncoding.contains("gzip")) {
				response.setHeader("Content-Encoding", "gzip");
				return new GZIPOutputStream(response.getOutputStream());
			}
		}
		return response.getOutputStream();
	}
	
	// CHANGED
	public static Writer negotiateWriter(HttpServletRequest request, final HttpServletResponse response) throws IOException {
		String charsets = request.getHeader("Accept-Charset");

		String charset = PREFERRED;
		if (charsets != null && !charsets.contains(PREFERRED)) {
			charsets = charsets.toUpperCase();
			if (!charsets.contains(PREFERRED) && charsets.contains(BACKUP))
				charset = BACKUP;
		}
		
		response.setCharacterEncoding(charset);
		// ADDED: catch IllegalStateException if response.getWriter() has already been called
		try {
			return new OutputStreamWriter(negotiateOutputStream(request,
					response), charset);
		} catch (IllegalStateException e) {
			return response.getWriter();
		}
	}
	
	public static MultiValueMap<String, String, List<String>> parseEncodedForm(HttpResponse response) throws IOException {
		return parseEncodedForm(
				EntityUtils.toString(response.getEntity()));
	}
	
	public static MultiValueMap<String, String, List<String>> parseEncodedForm(HttpServletRequest request) throws IOException {
		return parseEncodedForm(
				StreamUtil.toString(read(request)));
	}

	static MultiValueMap<String, String, List<String>> parseEncodedForm(String queryPart) throws UnsupportedEncodingException {
		MultiValueMap<String, String, List<String>> result = new MultiValueMap();
		if (queryPart.length() > 0) {
			String queryParams[] = queryPart.split("&");
			for (String curParam : queryParams) {
				String nameValue[] = curParam.split("=");
				String name = URLDecoder.decode(nameValue[0], HTTP.UTF_8);
				String value = null;
				if (nameValue.length > 1)
					value = URLDecoder.decode(nameValue[1], HTTP.UTF_8);
				result.addValue(name, value);
			}
		}
		return result;
	}
	
	public static void pipeResponse(HttpServletRequest request, HttpResponse source, HttpServletResponse dest) throws IOException {
		ContentEncoding sourceEncoding = contentEncoding(source);
		ContentEncoding destEncoding = preferredEncodingFor(request);
		
		HttpEntity entity = source.getEntity();
		OutputStream output = dest.getOutputStream();
		InputStream input = entity.getContent();

		try {
			destEncoding.applyTo(dest);
			if (sourceEncoding != destEncoding) {
				if (destEncoding == ContentEncoding.gzip)
					output = new GZIPOutputStream(output);
				if (sourceEncoding == ContentEncoding.gzip)
					input = new GZIPInputStream(input);
			}
			
			byte[] buffer = new byte[8192];
			int len;
			try {
				while((len = input.read(buffer)) != -1)
					output.write(buffer, 0, len);
			} finally {
				output.close();
			}
		} finally {
		    input.close();
		}
	}

	static ContentEncoding preferredEncodingFor(HttpServletRequest request) {
		String acceptEncoding = request.getHeader("Accept-Encoding");
		if (acceptEncoding != null && acceptEncoding.contains("gzip"))
			return ContentEncoding.gzip;
		return ContentEncoding.none;
	}
	
	public static String queryParam(HttpServletRequest request, String param) {
		return URIUtil.queryParam('?' + request.getQueryString(), param);
	}
	
	public static Reader read(HttpServletRequest request) throws IOException {
		String charset = request.getCharacterEncoding();
		if (charset == null)
			charset = HTTP.ISO_8859_1;
		return new InputStreamReader(request.getInputStream(), charset);
	}
	
	public static String responseCharset(HttpResponse response) throws IOException {
		String charset = response.getEntity().getContentType().getValue();
		int index = charset.indexOf("charset=");
		if (index == -1)
			return null;
		return charset.substring(index + 8).trim();
	}
	
	public static void setCookie(HttpServletResponse response, String path, String cookieName, String cookieValue) {
		checkPath(path);
		Assert.isTrue(!cookieValue.isEmpty());
		Cookie cookie = new Cookie(cookieName, cookieValue);
		cookie.setPath(path);
		response.addCookie(cookie);
	}
}
