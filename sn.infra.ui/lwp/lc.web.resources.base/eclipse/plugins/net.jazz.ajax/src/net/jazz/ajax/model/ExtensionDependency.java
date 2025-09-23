/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.model;

import net.jazz.ajax.model.Resource.Type;

public class ExtensionDependency extends WebBundleDependency {

	public ExtensionDependency(Resource resource) {
		super(resource);
	}

	public ExtensionDependency(Type<?> type, String id, boolean derived) {
		super(type, id, derived);
	}

	public ExtensionDependency(Type<?> type, String id) {
		super(type, id);
	}

	public boolean isInverted() {
		return true;
	}
}
