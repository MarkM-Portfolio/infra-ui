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

package net.jazz.ajax.servlets;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.core.runtime.Assert;

import com.ibm.sistdase.json.JSONSerializer;

import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;

public class LoaderServlet extends LoggingHttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Assert.isTrue(request.getPathInfo() == null);
		response.setContentType("text/json");
		String including[] = request.getParameter("include").split(ResourceGraph.DELIMETER);
		String excluding[] = request.getParameter("exclude").split(ResourceGraph.DELIMETER);
		
		RenderContext context = RenderContext.forRequest(request);
		Map result = new HashMap();
		try {
			ResourceGraph graph = new ResourceGraphOperation(context,
					Resource.resolveAll(including),
					Resource.resolveAll(excluding)).execute();
			
			result.put("css", graph.getStyleSheetURIs());
			result.put("script", graph.getJavaScriptURIs());
			List<String> incs = new ArrayList();
			for (Resource resource : graph.includes)
				incs.add(resource.getTinyId());
			result.put("loaded", incs);
			if (!graph.getProblems().isEmpty())
				result.put("error", graph.getProblems().toString());
		} catch (IllegalArgumentException exc) {
			result.put("error", exc.getMessage());
		}
		if (result.containsKey("error"))
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		Writer output = ServletUtil.negotiateWriter(request, response);
		JSONSerializer.serialize(output, result);
		output.close();
	}
}
