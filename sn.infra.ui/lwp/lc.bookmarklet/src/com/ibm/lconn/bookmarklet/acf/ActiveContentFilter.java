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

package com.ibm.lconn.bookmarklet.acf;

import java.io.StringReader;
import java.io.StringWriter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.trl.acf.api.ActiveContentProcessorFactory;
import com.ibm.trl.acf.impl.html.HTMLActiveContentProcessor;

public class ActiveContentFilter {
	public static ActiveContentFilter INSTANCE = new ActiveContentFilter();
	private ActiveContentProcessorFactory acfFactory = null;
	private static final String defaultEncoding = "iso-8859-1";
	
	private static final Log LOG = LogFactory.getLog(ActiveContentFilter.class);
	private static final ResourceBundleHelper _logResources = BookmarkletUIResourceHelper.getLogResourceHelper();
	private ActiveContentFilter() {
		
	}
	
	public String filterContent(String input) {
		if (input == null) return null;
		String output = input;
		
		try {
			if (acfFactory == null) {
				acfFactory = com.ibm.trl.acf.lookup.ActiveContentProcessorFactoryHome.getActiveContentProcessorFactory();
			}

			HTMLActiveContentProcessor acp = (HTMLActiveContentProcessor)acfFactory.getActiveContentProcessor("text/html");
			StringReader reader = new StringReader(output);
			StringWriter writer = new StringWriter(output.length());
			acp.process(reader, writer, defaultEncoding);
			output = writer.toString();
		} catch (Exception e) {
			LOG.error(_logResources.getString("error.acf.filtercontent", input), e);
		} 
		return output;
	}
}
