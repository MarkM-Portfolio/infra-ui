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
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax.servlets;

import java.io.IOException;
import java.io.Writer;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.Cache;
import net.jazz.ajax.internal.util.CacheCondition;
import net.jazz.ajax.internal.util.CacheConfiguration;
import net.jazz.ajax.internal.util.CacheWindow;
import net.jazz.ajax.internal.util.CacheableResult;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;

@SuppressWarnings("serial")
public abstract class AbstractResourceServlet extends LoggingHttpServlet {
	
	static final Integer ONE_MONTH = 3600 * 24 * 30;
    private static final Logger LOGGER = Logger.getLogger(AbstractResourceServlet.class.getName());

    // CHANGED: no NPE in includes is empty
	final ResourceGraphOperation createOperation(HttpServletRequest request, HttpServletResponse response) {
		String inc = request.getParameter("include");
		String exc = request.getParameter("exclude");
		List<Resource> includes = (List<Resource>) request.getAttribute("resources.include");
		List<Resource> excludes = (List<Resource>) request.getAttribute("resources.exclude");
		if (includes == null)
			if (inc != null)
				includes = Resource.resolveAll(inc.split(ResourceGraph.DELIMETER));
			else
				includes = Collections.emptyList();
		if (excludes == null)
			if (exc != null)
				excludes = Resource.resolveAll(exc.split(ResourceGraph.DELIMETER));
			else
				excludes = Collections.emptyList();
		return new ResourceGraphOperation(RenderContext.forRequest(request), includes, excludes);
	}

	// CHANGED: respond with a 500 status when the resource graph has problems 
	// CHANGED: tolerate server startup mismatch, return results with private cache headers
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String serverStartup 	= ServletUtil.queryParam(request, "ss");
		String url_etag 		= ServletUtil.queryParam(request, "etag");
		String LCC_etag			= Resource.internalGetStartupETag();

		boolean ssMismatch 		= false;
		
		if(serverStartup != null && (!serverStartup.equals(LCC_etag) || !url_etag.equals(LCC_etag)))
		{
		    StringBuffer warnMsg 	= new StringBuffer(700);
		    ssMismatch 				= true;
		    
		    warnMsg.append("ServerStartup parameter: ").append(serverStartup).append(" - or URL eTag: ").append(url_etag).append(" is not equal to LCC VersionStamp ").append(Resource.internalGetStartupETag());
		    warnMsg.append(", response will be private and not cachable for ").append(request.getRequestURL()).append("?").append(request.getQueryString());
		    
		    LOGGER.warning(warnMsg.toString());
			
		    response.addHeader("Cache-Control", "private, no-cache");
			response.setContentType(getContentType());
		}
		
		Object token = ResourceGraphOperation.LOGGER.startBenchmark(getClass().getSimpleName() + request.getPathInfo());
		try {
			ResourceGraphOperation operation = createOperation(request, response);
			CacheCondition condition = CacheCondition.create(request);
			CacheableResult<ResourceGraph> result = Cache.execute(operation, condition);
			
			if (request.getParameter("etag") != null) {
				CacheWindow window = result.getCacheability();
				// CHANGED
				result = new CacheableResult<ResourceGraph>(new CacheWindow(window.getLastModified(),
						CacheConfiguration.getAggregateResourceWithETagClientCache(),
						CacheConfiguration.getAggregateResourceWithETagFreshness(), window.getETag()),
						result.getResult());
			}
			
			// CHANGED:
			if (!ssMismatch) {
				result.applyTo(response);
				if (result.notModified())
					return;
			}
			response.setContentType(getContentType());
			ResourceGraph graph = result.getResult();
			// CHANGED:
			if (isFatalError(graph)) {
				response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
				response.setHeader("Cache-Control", "private, no-cache");
			}
			Writer output = ServletUtil.negotiateWriter(request, response);
			write(output, graph, operation.context);
			output.close();
		} catch (Throwable t) {
		   // CHANGED:
			if (t instanceof IllegalArgumentException) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);  // Resource request was hacked
				response.setHeader("Cache-Control", "private, no-cache");
				response.sendError(HttpServletResponse.SC_BAD_REQUEST); 
				LOGGER.log(Level.FINEST, "Internal resource request corrupt or hacked");
			}
			
			LOGGER.log(Level.FINEST, "AbstractResourceServlet throws RuntimeException on error, no one catches");

			throw new RuntimeException(t);
		} finally {
			ResourceGraphOperation.LOGGER.endBenchmark(token);
		}
	}

	// ADDED
	protected boolean isFatalError(ResourceGraph graph) {
		return !graph.getProblems().isEmpty();
	}

	abstract String getContentType();

	void serverRestarted(HttpServletRequest request, HttpServletResponse response) {
	}
	
	abstract void write(Writer output, ResourceGraph graph, RenderContext context) throws IOException;
}
