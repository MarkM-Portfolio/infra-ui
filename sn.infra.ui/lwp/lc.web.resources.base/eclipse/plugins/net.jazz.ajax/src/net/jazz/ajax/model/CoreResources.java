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

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax.model;

import java.net.URL;

import org.eclipse.core.runtime.Platform;
import org.osgi.framework.Bundle;

import net.jazz.ajax.internal.AjaxFramework;

public class CoreResources extends ResourceProvider {

	static final String AMD_LOADER = "net.jazz.ajax.core.internal.amd";
	
	private static final String[][] BUNDLE_PREFIXES = new String[][] {
		{"dijit", "org.dojotoolkit.dijit"},
		{"dojox", "org.dojotoolkit.dojox"},
		{"dojo", "org.dojotoolkit.dojo"},
		{"doh", "org.dojotoolkit.doh"}
	};
	
	public Resource provide(String id) {
		if (AMD_LOADER.equals(id)) {
			URL amdURL = AjaxFramework.bundle().getResource("resources/core/internal/amd.js");
			return new JavaScriptResource(amdURL, AMD_LOADER);
		}
		for (String[] i : BUNDLE_PREFIXES) {
			if (id.startsWith(i[0])) {
				Bundle bundle = Platform.getBundle(i[1]);
				String path = "overrides" + id.substring(i[0].length()).replace('.', '/') + ".js";
				return new JavaScriptModule(bundle.getResource(path), id);
			}
		}
		return null;
	}

}
