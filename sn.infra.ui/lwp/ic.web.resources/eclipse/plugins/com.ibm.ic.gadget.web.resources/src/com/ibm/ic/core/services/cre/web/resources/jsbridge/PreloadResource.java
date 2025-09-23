/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.core.services.cre.web.resources.jsbridge;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import net.jazz.ajax.model.GeneratedJavaScriptResource;
import net.jazz.ajax.model.RenderContext;

import com.ibm.lconn.core.services.cre.core.jsbridge.AbstractJSBridge;
import com.ibm.lconn.core.services.cre.core.jsbridge.BridgeContainer;
import com.ibm.lconn.core.services.cre.core.jsbridge.ThreadJSHttpRequest;
import com.ibm.lconn.core.util.EnvironmentType;

public class PreloadResource extends GeneratedJavaScriptResource{
	
	private String identifier = null;

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}
	
	public PreloadResource(String id) {
		super(id);
	}

	@Override
	protected CharSequence content(RenderContext context) throws IOException {
		StringBuffer sb = new StringBuffer();
		sb.append("/* Generated at " + DateFormat.getInstance().format(new Date(getLastModified())) + " by ").append(this.getClass().getName()).append(" */\n");
		if (EnvironmentType.getType() != EnvironmentType.OTHER ) {
			// In WAS or Tomcat Environment, use JSBridge to get the content from CRE/Shindig
			HttpServletRequest request = ThreadJSHttpRequest.get();
			if (request != null) {
				AbstractJSBridge bridge = BridgeContainer.getInstance().getPreloadBridge();
				if(bridge != null){
					String content = bridge.doGetJSContent(request,identifier);
					sb.append(content);
				}
			}
		} 
		return sb;
	}

}
