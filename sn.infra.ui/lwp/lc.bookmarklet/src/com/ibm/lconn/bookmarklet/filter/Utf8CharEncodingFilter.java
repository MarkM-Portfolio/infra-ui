/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2001, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.bookmarklet.filter;

import java.io.IOException;

import javax.servlet.*;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class Utf8CharEncodingFilter implements Filter
{
    private static final Log LOGGER = LogFactory.getLog( Utf8CharEncodingFilter.class);

    public void init( FilterConfig config) throws ServletException
    {
    	if (LOGGER.isDebugEnabled()){
    		LOGGER.debug(config.getFilterName());
    	}
    }

    public void doFilter( ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
    {
        if( request.getCharacterEncoding( ) == null) {
            request.setCharacterEncoding( "UTF-8");
        }

        chain.doFilter( request, response);
    }

    public void destroy( )
    {
    }
}
