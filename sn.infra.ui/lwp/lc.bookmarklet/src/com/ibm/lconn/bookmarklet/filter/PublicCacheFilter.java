/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.core.web.cache.WebCacheUtil;

public class PublicCacheFilter implements Filter {
	private static final String MAXAGE = "max-age";
	private int maxageTime = 0;
	
	public void destroy() {

	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		WebCacheUtil.setupCacheHeaders((HttpServletResponse)response, false, false, maxageTime);
		chain.doFilter(request, response);
	}

	public void init(FilterConfig config) throws ServletException {
		try{
			maxageTime = Integer.parseInt(config.getInitParameter(MAXAGE));
		}catch(Exception e){
			maxageTime = 600;
		}
	}

}
