/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2014                                    */
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

public class ShareBox extends ResourceProvider{
	
	@Override
	public Resource provide(String id) {
		PreloadResource preloadResource = new PreloadResource(id);
		preloadResource.setIdentifier(AbstractJSBridge.SHAREBOX);
		return preloadResource;
	}
}
