/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.CacheCondition;
import net.jazz.ajax.internal.util.CacheWindow;
import net.jazz.ajax.internal.util.CacheableResult;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.State;
import net.jazz.ajax.model.Resource.Type;

public class DebugServlet extends HttpServlet {
	static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getPathInfo().substring(1);
		int i = id.indexOf('/');
		Type type = Type.forName(id.substring(0, i));
		id = id.substring(i + 1, id.length() - 3);
		Resource r = Resource.resolve(type, id);
		if (r == null) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		RenderContext context = RenderContext.internal(request);
		//TODO this isn't thread-safe, but is only called in debug mode
		r.internalRefresh(context);
		int expires = 0;
		if (request.getParameter("etag") != null)
			expires = ResourceGraphOperation.ONE_MONTH;
		State state = r.getState(context);
		CacheWindow window = new CacheWindow(state.lastModified, expires, expires, state.getETag());
		if (CacheCondition.create(request).acceptsConditionally(window)) {
			new CacheableResult(window, null).applyTo(response);
			return;
		}
		new CacheableResult(window, "bogus").applyTo(response);
		response.setContentType("text/javascript");
		Writer output = ServletUtil.negotiateWriter(request, response);
		r.write(output, context);
		output.close();
	}

}
