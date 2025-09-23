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
import java.util.Enumeration;
import java.util.Locale;
import java.util.Vector;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class I18NFilter implements Filter {
        
    private final static Locale norwegianLocale = new Locale("no");
    private final static String nb = new Locale("nb", "", "").getLanguage();
    private final static String nn = new Locale("nn", "", "").getLanguage();
        
    /*
     * (non-Javadoc)
     * 
     * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
     */
    public void init(FilterConfig arg0) throws ServletException {
    }

    /*
     * (non-Javadoc)
     * 
     * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest,
     *      javax.servlet.ServletResponse, javax.servlet.FilterChain)
     */
    public void doFilter(ServletRequest request, ServletResponse response,
			 FilterChain chain) throws IOException, ServletException {

	LCServletRequest lcRequest = new LCServletRequest((HttpServletRequest) request);

	chain.doFilter(lcRequest, response);
    }

    /*
     * (non-Javadoc)
     * 
     * @see javax.servlet.Filter#destroy()
     */
    public void destroy() {
    }

    /*
     * Added to provide a fix for 'nb-no' and 'nn-no' locales and point to 'no' resources. 
     * IE 7 appears to have a bug where Norwegian is represented by these non-standard
     * identifiers.
     */
    public class LCServletRequest extends HttpServletRequestWrapper {
	public LCServletRequest(HttpServletRequest request) {
	    super(request);
	}

	public Locale getLocale() {
	    Locale locale = super.getRequest().getLocale();
	    if (locale != null && (locale.getLanguage().equals(nb) || locale.getLanguage().equals(nn))) {
		return norwegianLocale;
	    } else {
		return locale;
	    }
	}

	public Enumeration getLocales() {
	    Enumeration locales = null;

	    // Checks first if 'nb' is present in Accept-Language header
	    HttpServletRequest httpRequest = (HttpServletRequest) super
		.getRequest();
	    String acceptLanguages = httpRequest.getHeader("Accept-Language");
	    if (acceptLanguages != null && (acceptLanguages.contains("nb") || acceptLanguages.contains("nn"))) {
                                
		// If it is present, it replaces 'nb' with 'no'
		Vector<Locale> vector = new Vector<Locale>();

		Enumeration currentLocales = super.getRequest().getLocales();

		while (currentLocales.hasMoreElements()) {
		    Locale locale = (Locale) currentLocales.nextElement();



		    if (locale != null && (locale.getLanguage().equals(nb) || locale.getLanguage().equals(nn))) {
			vector.add(norwegianLocale);
		    } else {
			vector.add(locale);
		    }
		}
		locales = vector.elements();
	    } else {
                                
		// If it is not present, just return the locale list as it is
		locales = super.getRequest().getLocales();
	    }

	    return locales;
	}
    }
}

