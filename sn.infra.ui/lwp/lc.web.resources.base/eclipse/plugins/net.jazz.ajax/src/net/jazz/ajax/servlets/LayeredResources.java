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

package net.jazz.ajax.servlets;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceOptimization;

import com.ibm.sistdase.json.JSONSerializer;

// ADDED
public class LayeredResources {
	static final String SCRIPT_TAG = "<script type=\"text/javascript\" src=\"%1$s\"></script>\n";

	public static List<ResourceGraph> calculateLayers(RenderContext context, List<Resource> includes,
			List<Resource> excludes, List<String> incs) {

		List<ResourceGraph> graphs = new ArrayList<ResourceGraph>(6);
		if (excludes.isEmpty()) {
			excludes = new ArrayList<Resource>(6);
			List<Resource> layers = ResourceOptimization.suggestLayers(includes);
			for (Resource layer : layers) {
				graphs.add(new ResourceGraphOperation(context, Collections.singletonList(layer),
						new ArrayList<Resource>(excludes)).execute());
				excludes.add(layer);
			}
		}

		graphs.add(new ResourceGraphOperation(context, includes, excludes).execute());

		for (ResourceGraph graph : graphs)
			for (Resource resource : graph.getIncludes())
				incs.add(resource.getTinyId());

		return graphs;
	}

	public static void writeScriptCallback(RenderContext context, List<ResourceGraph> graphs,
			List<String> incs, Writer output) throws IOException {
		output.write(";net.jazz.ajax.xdloader.loaded(");
		JSONSerializer.serialize(output, incs);
		output.write(",");

		List<String> urls = new ArrayList<String>(graphs.size() * 3);
		for (ResourceGraph graph : graphs)
			urls.addAll(graph.getStyleSheetURIs());
		JSONSerializer.serialize(output, urls);

		output.write(",");
		urls.clear();
		for (ResourceGraph graph : graphs)
			urls.addAll(graph.getJavaScriptURIs());
		JSONSerializer.serialize(output, urls);
		output.write(");");
	}

	public static void writeScriptTags(RenderContext context, List<ResourceGraph> graphs, List<String> incs,
			Writer output) throws IOException {
		for (ResourceGraph graph : graphs) {
			for (String uri : graph.getJavaScriptURIs())
				output.write(String.format(SCRIPT_TAG, uri));
		}
		if (RenderContext.Mode.DEBUG.equals(context.mode)) {
			output.write("<script type=\"text/javascript\">window['_js_modules']=(window['_js_modules']||[]).concat(");
			JSONSerializer.serialize(output, incs);
			output.write(");</script>\n");
		}
	}

}
