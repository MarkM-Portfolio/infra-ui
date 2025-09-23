/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Rights Reserved.
 * 
 * Note to U.S. Government Users Restricted Rights: Use, duplication or
*/
package net.jazz.ajax.servlets;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.CacheWindow;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;

public class CrossDomainPartialLoaderServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {

		String inc = request.getParameter("include");
		String exc = request.getParameter("exclude");
		Boolean asHtml = Boolean.valueOf(request.getParameter("html"));
		List<Resource> includes = Resource.resolveAll(inc.split(ResourceGraph.DELIMETER));
		List<Resource> excludes = Collections.emptyList();
		if (exc != null)
			excludes = Resource.resolveAll(exc.split(ResourceGraph.DELIMETER));
		RenderContext context = RenderContext.forRequest(request);
		
		List<String> includedIds = new ArrayList<String>(6);
		List<ResourceGraph> graphs = LayeredResources.calculateLayers(context, includes, excludes, includedIds);

		if (asHtml) {
			response.setContentType("text/html");
			new CacheWindow(System.currentTimeMillis(), 0, 3).applyTo(response);

			Writer output = ServletUtil.negotiateWriter(request, response);

			LayeredResources.writeScriptTags(context, graphs, includedIds, output);

			output.flush();
		} else {
			response.setContentType("text/javascript");
			new CacheWindow(System.currentTimeMillis(), 0, 3).applyTo(response);

			Writer output = ServletUtil.negotiateWriter(request, response);

			LayeredResources.writeScriptCallback(context, graphs, includedIds, output);

			output.close();
		}
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
			IOException {
		this.doGet(req, resp);
	}

	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
			IOException {
		this.doGet(req, resp);
	}

	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
			IOException {
		this.doGet(req, resp);
	}
}
