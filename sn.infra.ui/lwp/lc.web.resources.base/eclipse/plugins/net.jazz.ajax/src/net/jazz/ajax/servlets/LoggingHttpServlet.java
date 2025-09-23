/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
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

package net.jazz.ajax.servlets;

import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.internal.util.Util;

@SuppressWarnings("serial")
public abstract class LoggingHttpServlet extends HttpServlet {
	
	transient TraceSupport log;
	
	public final void service(ServletRequest request, ServletResponse response) throws ServletException, IOException {
		try {
			super.service(request, response);
		} catch (UnloggedException e) {
			throw e.getCause();
		} catch (ThreadDeath td) {
			throw td;
		} catch (ServletException e) {
			log(e, request);
			throw e;
		} catch (IOException e) {
			try {
				//Rethrowing the exception writes to System.out on WAS.
				((HttpServletResponse)response).sendError(500, e.getMessage());
			} catch (IOException ignored) {
			} catch (IllegalStateException ignored) { }
		} catch (RuntimeException e) {
			log (e, request);
			throw e;
		} catch (Error e) {
			log (e, request);
			throw e;
		}
	}

	void log(Throwable t, ServletRequest request) {
		if (log == null)
			log = TraceSupport.create(getClass().getName());
		StringBuilder details = new StringBuilder();
		try {
			if (request instanceof HttpServletRequest) {
				HttpServletRequest httpRequest = (HttpServletRequest) request;
				details.append(httpRequest.getMethod() + " " + httpRequest.getRequestURL() + "\n");
				if (httpRequest.getQueryString() != null)
					details.append("?" + httpRequest.getQueryString());
				Enumeration<String> headers = httpRequest.getHeaderNames();
				while (headers.hasMoreElements()) {
					String name = headers.nextElement();
					Enumeration<String> values = httpRequest.getHeaders(name);
					while (values.hasMoreElements())
						logHeader(details, name, values.nextElement());
				}
			}
			Map<String, String[]> parameterMap = request.getParameterMap();
			for (Entry<String, String[]> entry : parameterMap.entrySet()) {
				details.append("Parameter: " + entry.getKey() + " = [");
				Util.join(details, ", ", Arrays.asList(entry.getValue()));
				details.append("]\n");
			}
		} catch (Exception e) {
		}
		log.error(t, details);
	}

	void logHeader(StringBuilder details, String name, String value) {
		if (name.equalsIgnoreCase("Authorization"))
			if (value.startsWith("Basic"))
				value = value.replaceAll("(Basic.{7}?).*", "$1...");
			else
				value = value.replaceAll("(.{2}).", "$1-");
		else if (name.equalsIgnoreCase("Cookie"))
			value = value.replaceAll("(?<=LtpaToken2?\\=|JSESSIONID(?:SSO)?\\=)([^;]{3}?)[^;]+([^;]{3}?)", "$1...$2");
		details.append("HEADER: " + name + " = " + value + "\n");
	}

}
