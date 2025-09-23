/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2019                                    */
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
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.CacheWindow;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;

import com.ibm.sistdase.json.JSONSerializer;

public class CrossDomainLoaderServlet extends HttpServlet {
	private static final String CLASSNAME = CrossDomainLoaderServlet.class.getName();
	private static final Logger LOG = Logger.getLogger(CLASSNAME);

	static final String SCRIPT_TAG = "<script type=\"text/javascript\" src=\"%1$s\"></script>\n";

	private static final String GLOBAL_LOADER_MODULE_NAME = "net.jazz.ajax.xdloader";

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		final boolean FINEST_P = LOG.isLoggable(Level.FINEST);
		String inc = request.getParameter("include");
		String exc = request.getParameter("exclude");
		List<Resource> includes = Resource.resolveAll(inc
				.split(ResourceGraph.DELIMETER));
		List<Resource> excludes = Collections.emptyList();
		if (exc != null && exc.trim().length() > 0)
			excludes = Resource.resolveAll(exc.split(ResourceGraph.DELIMETER));

		String loaderString = request.getParameter("loader");
		Boolean needLoader = loaderString != null ? Boolean
				.valueOf(loaderString) : null;
		Boolean asHtml = Boolean.valueOf(request.getParameter("html"));
		Resource loaderResource = Resource.resolve(JavaScriptResource.TYPE,
				GLOBAL_LOADER_MODULE_NAME);

		RenderContext context = RenderContext.forRequest(request);
		ResourceGraph graph = new ResourceGraphOperation(context, includes,
				excludes).execute();

		List<String> incs = new ArrayList<String>();
		if (FINEST_P) {
			LOG.finest("graph.includes=" + graph.includes);
		}

		for (Resource resource : graph.includes)
			incs.add(resource.getTinyId());

		if (asHtml) {
			response.setContentType("text/html");

			Writer output = ServletUtil.negotiateWriter(request, response);

			for (String uri : graph.getJavaScriptURIs())
				output.write(String.format(SCRIPT_TAG, uri));

			output.flush();
		} else {
			response.setContentType("text/javascript");
			new CacheWindow(graph.getLastModified(), 20, 20).applyTo(response);

			Writer output = ServletUtil.negotiateWriter(request, response);

			output.write(";net.jazz.ajax.xdloader.loaded(");
			JSONSerializer.serialize(output, incs);
			output.write(",");
			JSONSerializer.serialize(output, graph.getStyleSheetURIs());
			output.write(",");
			JSONSerializer.serialize(output, graph.getJavaScriptURIs());
			output.write(");");

			output.close();
		}
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doGet(req, resp);
	}

	protected void doPut(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doGet(req, resp);
	}

	protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doGet(req, resp);
	}
}
