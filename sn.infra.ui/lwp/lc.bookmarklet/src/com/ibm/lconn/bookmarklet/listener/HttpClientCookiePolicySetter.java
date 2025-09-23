/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2012                                 */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.Copyright;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;

/**
 * Fix PMR 
 * Lotus Connections L3 Retain - L3 PMR Queue\By L3 Owner
<NDL>
<REPLICA 852574AD:0071F940>
<VIEW OF4CFF7552:DE36738C-ON85257513:005613F2>
<NOTE OF91ADD130:BA6F9BED-ON8525772B:0009BC0D>
<HINT>CN=CAMDB07/OU=CAM/OU=A/O=Lotus</HINT>
<REM>Lotus Connections L3 Retain</REM>
</NDL>

 * @author wanghek
 *
 */
public class HttpClientCookiePolicySetter implements ServletContextListener{
	private final static String COPYRIGHT = Copyright.SHORT;

	private static final Log LOG = LogFactory.getLog(HttpClientCookiePolicySetter.class);

	private static final ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
			.getLogResourceHelper();
	
	public void contextDestroyed(ServletContextEvent event) {
		if (LOG.isTraceEnabled()){
			LOG.trace("HttpClientCookiePolicySetter destroyed");
		}
	}

	public void contextInitialized(ServletContextEvent arg0) {
		if (System.getProperty("apache.commons.httpclient.cookiespec") == null){
			System.setProperty("apache.commons.httpclient.cookiespec", "COMPATIBILITY");
		}
	}
	
}
