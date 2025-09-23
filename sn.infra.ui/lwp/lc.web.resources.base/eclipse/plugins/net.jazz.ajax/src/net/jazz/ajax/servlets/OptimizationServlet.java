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
 * Rights Reserved.
 * 
 * Note to U.S. Government Users Restricted Rights: Use, duplication or
*/
package net.jazz.ajax.servlets;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceOptimization;
import net.jazz.ajax.servlets.OptimizationGraph.Node;

public class OptimizationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String[] optimize = request.getParameterValues("optimize");
		if (optimize != null && optimize.length > 0) {
			List<Resource> include = Resource.resolveAll(optimize);
			List<Resource> exclude = Resource.resolveAll(request.getParameterValues("excludes"));
			
			RenderContext context = RenderContext.forRequest(request);
			OptimizationGraph graph = new OptimizationGraph(context, include, exclude);
			NumberFormat format = NumberFormat.getInstance();
			
			
			int minimumReached = include.size();
			String min = request.getParameter("min"); 
			if (min != null)
				minimumReached = Integer.parseInt(min);
			
			List<Node> nodes = graph.getCommonEdge(minimumReached);
			Collections.sort(nodes, new Comparator<Node>() {
				public int compare(Node o1, Node o2) {
					return o1.resource.getId().compareTo(o2.resource.getId());
				}
			});
			
			response.setContentType("text/plain");
			Writer output = ServletUtil.negotiateWriter(request, response);
			int size = 0;
			
			output.append("# Dependencies shared by at least ").append(min).append(" of:\n");
			for (Resource resource : include)
				output.append("#   ").append(resource.toString()).append("\n");
			output.append("# Excluding:\n");
			for (Resource resource : exclude)
				output.append("#   ").append(resource.toString()).append("\n");
			output.append("\n");
			
			for (Node node : nodes)
				if (JavaScriptResource.TYPE.equals(node.resource.getType())) {
					output.append("dojo.require(\"").append(node.resource.getId()).append("\"); ").append("#").append(format.format(node.size)).append("\n");
					size += node.size;
				}
			output.append("\n");
			
			List<Resource> specificMatches = new ArrayList<Resource>();
			for (Node node : nodes)
				specificMatches.add(node.resource);
			
		    ResourceGraph outcomeGraph = new ResourceGraphOperation(context, specificMatches, exclude).execute();
		    StringWriter w = new StringWriter();
		    outcomeGraph.writeJavascript(w, context);
		    int l = w.getBuffer().length();
		    output.append("# direct dependencies:   ").append(format.format(size)).append("\n");
		    output.append("# indirect dependencies: ").append(format.format(l-size)).append("\n");
		    output.append("# total size:            ").append(format.format(l)).append("\n");
			
			output.close();			
		}
		else {
			response.setContentType("text/plain");
	
			Writer output = ServletUtil.negotiateWriter(request, response);
	
			Map<String, Integer> optimized = ResourceOptimization.getIdentifiers();
			for (Map.Entry<String, Integer> entry : optimized.entrySet()) {
				output.write(String.valueOf(entry.getValue()));
				output.write("=");
				output.write(entry.getKey());
				output.write("\n");
			}
			
			output.close();
		}
	}
}
