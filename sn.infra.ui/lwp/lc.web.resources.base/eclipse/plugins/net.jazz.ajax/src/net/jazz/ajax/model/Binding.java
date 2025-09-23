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

import net.jazz.ajax.model.Resource.Key;

public class Binding {
	public final Key key;
	public final Dependency dependency;

	public Binding(Key key, Dependency dependency) {
		this.key = key;
		this.dependency = dependency;
	}
	
	public void bind() {
		Resource.createBinding(key, dependency);
	}
	 
	public void unbind() {
		Resource.deleteBinding(key, dependency);
	}
}