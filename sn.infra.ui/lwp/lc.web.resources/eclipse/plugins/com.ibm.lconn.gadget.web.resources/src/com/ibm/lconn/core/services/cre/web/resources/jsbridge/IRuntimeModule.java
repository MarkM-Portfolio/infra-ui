/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.services.cre.web.resources.jsbridge;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.lconn.core.services.cre.core.jsbridge.AbstractJSBridge;

/**
 * @author Erik (bizheng@cn.ibm.com)
 */
public class IRuntimeModule extends ResourceProvider {

	@Override
	public Resource provide(String id) {		
		CREJavaScriptResource creResource = new CREJavaScriptResource(id);
		creResource.setIdentifier(AbstractJSBridge.JSBundle.IRUNTIME);
		return creResource;
	}

}
