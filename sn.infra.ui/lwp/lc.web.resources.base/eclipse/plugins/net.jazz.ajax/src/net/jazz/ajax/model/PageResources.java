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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.servlets.ResourceGraphOperation;

/**
 * An object containing locations to javascript and CSS resources required by a web page.
 */
public final class PageResources {
	final ResourceGraph graph;
	
	PageResources(ResourceGraph graph) {
		this.graph = graph;
	}
	
	/**
	 * Returns an object providing the javascript and CSS resource locations for the given dojo module 
	 * IDs.  Locations are Strings representing URIs with an absolute path and query components.
	 * @param request an incoming request
	 * @param moduleIds One or more module IDs
	 * @return a page resources object
	 */
	public static PageResources forDojoModules(HttpServletRequest request, String[] moduleIds) {
		RenderContext context = RenderContext.forRequest(request);
		List<Resource> resources = new ArrayList();
		for (String id : moduleIds) {
			Resource r = new WebBundleDependency(JavaScriptResource.TYPE, id).resolve();
			resources.add(r);
		}
		ResourceGraph graph = new ResourceGraphOperation(context,
				resources, Collections.EMPTY_LIST).execute();
		return new PageResources(graph);
	}
	
	/**
	 * Returns a List of one or more Strings representing javascript URIs.
	 * @return a list of locations
	 */
	public List<String> getJavaScriptURIs() {
		return graph.getJavaScriptURIs();
	}
	
	/**
	 * Returns a List of zero or more Strings representing StyleSheet URIs.
	 * @return a list of locations
	 */
	public List<String> getStyleSheetURIs() {
		return graph.getStyleSheetURIs();
	}
}
