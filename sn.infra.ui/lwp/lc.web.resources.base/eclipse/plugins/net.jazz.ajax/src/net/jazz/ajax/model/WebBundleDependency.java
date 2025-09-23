/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2014                                    */
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

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.model.Resource.Type;

/**
 * A Dependency that looks for unresolved resources by delegating to the WebBundle
 * matching the dependency's id.
 */
public class WebBundleDependency extends Dependency {

	static final TraceSupport LOGGER = TraceSupport.create(WebBundleDependency.class.getName());
	static final Collection<String> UNRESOLVED = Collections.synchronizedSet(new HashSet());
	
	final boolean derived;

	public WebBundleDependency(Type<?> type, String id) {
		this(type, id, false);
	}
	
	public WebBundleDependency(Resource resource) {
		this (resource.getType(), resource.getId());
		this.resource = resource;
	}
	
	public WebBundleDependency(Type<?> type, String id, boolean derived) {
		super(type, id);
		this.derived = derived;
	}
	
	// CHANGED: set to public
	public boolean isDerived() {
		return derived;
	}
	
	public <T extends Resource> T resolve() {
		if (resource == null)
			resource = Resource.resolve(type, getId());
		
		if (resource == null) {
			WebBundle bundle = WebBundle.bundleMatching(getId());
			try {
				if (bundle != null) {
					resource = bundle.bundleResource(type, getId());
					// ADDED: fallback for provided messageBundles
					if (resource == null) {
						try {
							resource = bundle.bundleResource(JavaScriptResource.TYPE, getId());
						} catch (ResourceUnavailableException e1) {
						}
					}
					if (resource == null && DojoMessageBundle.TYPE.equals(type))
						resource = bundle.createMessageBundleResource(type, getId());
				}
			} catch (ResourceUnavailableException e) {
				// ADDED: log failure to load resources
				AjaxFramework.log(getId() + ": " + e.getMessage());
				// ADDED: log failure to load resources
				AjaxFramework.log("Unable to resolve resource for '" + getId() + "'", e);
			} catch (RuntimeException e) {
				if (UNRESOLVED.add(getId()))
					LOGGER.error(e, "A dependency on \"" + toString() + "\" could not be resolved");
			}
		}
		
		return (T) resource;
	}
	
	static class Inverted extends WebBundleDependency {
		Inverted(String id) {
			super(JavaScriptResource.TYPE, id, true);
		}
		
		public boolean isInverted() {
			return true;
		}
	}

}
