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
import java.util.Collections;
import java.util.List;

import net.jazz.ajax.internal.util.CacheConfiguration;
import net.jazz.ajax.internal.util.CacheCondition;
import net.jazz.ajax.internal.util.CacheWindow;
import net.jazz.ajax.internal.util.CacheableOperation;
import net.jazz.ajax.internal.util.CacheableResult;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;

public final class ResourceGraphOperation extends CacheableOperation<ResourceGraph> {

	// CHANGED: renamed logger
	static final TraceSupport LOGGER = TraceSupport.create(ResourceGraphOperation.class.getName());
	static final Integer ONE_MONTH = 3600 * 24 * 30;

	final List<Resource> excludes;
	final List<Resource> includes;
	final RenderContext context;

	public ResourceGraphOperation(RenderContext context, Resource resource) {
		this(context, Collections.singletonList(resource), Collections.EMPTY_LIST);
	}
	
	public ResourceGraphOperation(RenderContext context, List<Resource> includes, List<Resource> excludes) {
		this.context = context;
		this.includes = includes;
		this.excludes = excludes;
	}
	
	public boolean equals(Object obj) {
		if (obj instanceof ResourceGraphOperation) {
			ResourceGraphOperation other = (ResourceGraphOperation) obj;
			return context.equals(other.context)
					&& includes.equals(other.includes)
					&& excludes.equals(other.excludes);
		}
		return false;
	}
	
	@Override public CacheableResult<ResourceGraph> getResult(CacheCondition condition) throws IOException {
		if (LOGGER.isTracing())
			LOGGER.trace("Creating ", this.toString());
		Object token = LOGGER.startBenchmark("Creating Resource Graph");
		ResourceGraph excludeGraph = null;
		if (!excludes.isEmpty())
			 excludeGraph = new ResourceGraphOperation(context, excludes, Collections.EMPTY_LIST).execute();
		ResourceGraph graph = new ResourceGraph(context, includes, excludeGraph);
		LOGGER.endBenchmark(token);
		// ADDED: configure cache freshness
		CacheWindow window = new CacheWindow(graph.getLastModified(),
				CacheConfiguration.getAggregateResourceClientCache(),
				CacheConfiguration.getAggregateResourceFreshness(),
				graph.getETag());
		return new CacheableResult(window, graph);
	}
	
	public int hashCode() {
		return context.hashCode() + includes.hashCode() + excludes.hashCode();
	}

	@Override public boolean isStillValid(CacheableResult<ResourceGraph> previous) throws IOException {
		if (LOGGER.isTracing())
			LOGGER.trace("Revalidating ", this.toString());
		Object token = LOGGER.startBenchmark("Creating Resource Graph");
		try {
			ResourceGraph graph = previous.getResult();
			return graph.isStillValid(context);
		} finally {
			LOGGER.endBenchmark(token);
		}
	}
	
	public String toString() {
		return "ResourceGraphOperation: " + includes + ", excluding: " + excludes;
	}
}
