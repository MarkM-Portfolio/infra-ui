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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.core.web.exception.LConnException;
import com.ibm.lconn.core.web.secutil.CSRFHelper;

public class DangerousUrlHelper
{	
	
	
    /*
     * For Anti-CSRF, verify if "X-Update-Nonce" in header.
     * All ajax request need "headers: {'X-Update-Nonce': 'true'}".
     * This method will throw an AuthorizationException if the request have no that header.
     */
    public static void verifyRequest( HttpServletRequest request,HttpServletResponse response) throws LConnException
    {
		CSRFHelper.isSafe(request, response);
    }
    
    
	/*
	 * Will use ajax submit, No longer use DANGEROUS_NONCE to anti-csrf. Remove the following code.
    public static final String DANGEROUS_NONCE = "dangerousurlnonce";
    
    
    public static String getNonce( PageContext pageContext)
    {
    	String nonce = null;
        if(pageContext.getSession() == null){
        	nonce = getNonceFromRequest(pageContext);
        }else{
        	nonce = getNonceFromSession(pageContext);
        }
        return nonce;
    }
    
    public static String getNonceFromSession(PageContext pageContext){
        String nonce = null;
        if( pageContext.getSession( ).getAttribute( DANGEROUS_NONCE) == null) {
            nonce = GuidGenerator.next( );
            pageContext.getSession( ).setAttribute( DANGEROUS_NONCE, nonce);
        }
        else {
            nonce = (String) pageContext.getSession( ).getAttribute( DANGEROUS_NONCE);
        }

        return nonce;
        
    }
    
    public static String getNonceFromSession(HttpSession session){
        String nonce = (String) session.getAttribute( DANGEROUS_NONCE);
        if( nonce == null) {
            nonce = GuidGenerator.next( );
            session.setAttribute( DANGEROUS_NONCE, nonce);
        }

        return nonce;
    }
    
    public static String getNonceFromRequest(PageContext pageContext){
    	String nonce = null;
        if( ((HttpServletRequest)pageContext.getRequest()).getSession().getAttribute( DANGEROUS_NONCE) == null) {
            nonce = GuidGenerator.next( );
            ((HttpServletRequest)pageContext.getRequest()).getSession().setAttribute( DANGEROUS_NONCE, nonce);
        }
        else {
            nonce = (String) ((HttpServletRequest)pageContext.getRequest()).getSession().getAttribute( DANGEROUS_NONCE);
        }

        return nonce;
    	
    }
    
    public static void verifyRequest( HttpServletRequest request) throws LConnException
    {
        String nonce = (String) request.getSession( ).getAttribute( DANGEROUS_NONCE);
        String dUrlNonce = request.getParameter( DANGEROUS_NONCE);

        if( dUrlNonce == null || nonce == null || !nonce.equals( dUrlNonce)) {
            throw new AuthorizationException( );
        }

    }
    */

}

