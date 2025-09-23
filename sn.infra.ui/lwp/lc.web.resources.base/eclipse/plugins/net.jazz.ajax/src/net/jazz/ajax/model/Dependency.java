/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
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

import net.jazz.ajax.model.Resource.Type;

public abstract class Dependency {

	final String id;
	final Type<?> type;
	volatile Resource resource;

	// CHANGED: set to public
	public Dependency(Type<?> type, String id) {
		this.type = type;
		this.id = id;
	}
	
	// CHANGED: set to public
	public String getId() {
		return id;
	}
	
	/**
	 * Returns true if this dependency can be derived from the resource's own content.  Derived dependencies
	 * are recalculated if the resources contents change.
	 * @return <code>true</code> if the dependency is derived
	 */
	// CHANGED: set to public
	public boolean isDerived() {
		return false;
	}
	
	public boolean isInverted() {
		return false;
	}
	
	public abstract <T extends Resource> T resolve();

	public String toString() {
		return id + '.' + type.name;
	}
	
	// ADDED:
	@Override
	public boolean equals(Object other)
	{
		if (other == null)
			return false;
		return this.toString().equals(other.toString()); 
	}

}
