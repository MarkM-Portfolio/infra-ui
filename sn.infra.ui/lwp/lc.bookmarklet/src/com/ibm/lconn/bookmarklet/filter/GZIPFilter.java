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
package com.ibm.lconn.bookmarklet.filter;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class GZIPFilter implements Filter {
	private static final Log LOGGER = LogFactory.getLog( GZIPFilter.class);
	private static Map<String, byte[]> cache = null; 
	FilterConfig config;
	private static final String ALREADY_COMPRESSED = "GZIPFilter.alreadyCompressed.flag";
	public void destroy() {
		cache = null;
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		if (!(request instanceof HttpServletRequest) || !(response instanceof HttpServletResponse)){
			chain.doFilter(request, response);
			return;
		}
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		if (httpRequest.getAttribute(ALREADY_COMPRESSED) != null){
			LOGGER.info("already compressed..");
			chain.doFilter(request, response);
			return;
		}
		httpRequest.setAttribute(ALREADY_COMPRESSED, "true");
		
		String ae = httpRequest.getHeader("accept-encoding");
		if (ae != null && ae.indexOf("gzip") != -1) {
			String path = httpRequest.getServletPath();
			if (LOGGER.isDebugEnabled()){
				LOGGER.debug("browser supports gzip, url is: " + path);
			}
			
//			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			GZIPResponseWrapper wrappedResponse = new GZIPResponseWrapper(httpResponse/*, baos*/);
			chain.doFilter(request, wrappedResponse);
			wrappedResponse.finishResponse();
				
			return;
		}
		chain.doFilter(request, response);
	}

	public void init(FilterConfig config) throws ServletException {
		this.config = config;
//		cache = new TreeMap<String, byte[]>();
	}

}
