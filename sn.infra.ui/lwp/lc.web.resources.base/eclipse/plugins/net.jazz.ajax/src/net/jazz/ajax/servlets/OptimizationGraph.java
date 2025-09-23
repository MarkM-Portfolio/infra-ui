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
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.DojoMessageBundle;
import net.jazz.ajax.model.DojoTemplate;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.RenderContext.Mode;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Type;
import net.jazz.ajax.model.StyleSheet;

import org.eclipse.core.runtime.Assert;

public class OptimizationGraph {
  static final TraceSupport LOGGER = TraceSupport.create(OptimizationGraph.class.getName());
  static final String DELIMETER = "~";
	static final long ONE_HOUR_MS = 1000L * 3600;
	
	static final long STARTUP = System.currentTimeMillis();
	final RenderContext context;
	final Map<Resource, Node> map = new HashMap();
	final List<Node> nodes = new ArrayList();
	final Set<Resource> nodesExcluded = new HashSet();
	
	final String etag;
	final long lastModified;
	final List<CharSequence> problems = Collections.synchronizedList(new ArrayList());
	
	List<Resource> javascript;
    Resource.State state = new Resource.State();
	List<Resource> css;
	boolean ordered;
	final Collection<Resource> includes;
	final Collection<Resource> excludes;
	
	public OptimizationGraph(RenderContext context, Collection<Resource> includes, Collection<Resource> excludes) {
		this.includes = includes;
		this.excludes = excludes;
		this.context = context;
		synchronized (Resource.WRITELOCK) {
			for (Resource excluded : excludes)
				addExclusion(excluded);
			for (Resource included : includes)
				add(included);
		}
		lastModified = state.lastModified;
		etag = state.getETag() + '_' + context.locale.toString();

		for (Resource included : includes) {
			reset();
			Node node = map.get(included);
			increment(node);
		}
		calculateSize();
	}
	
	void reset() {
		for (Node node : nodes)
			node.active = false;
	}
	
	void calculateSize() {
		List<Node> active = new LinkedList<Node>(nodes);
		int resolved;
		do {
			resolved = 0;
			for (Iterator<Node> iter=active.iterator(); iter.hasNext();) {
				Node node = iter.next();
				long childSize = node.size;
				for (Node child : node.outgoing) {
					if (child.childSize == -1) {
						childSize = -1;
						break;
					}
					childSize += child.childSize;
				}
				if (childSize != -1) {
					node.childSize = childSize;
					iter.remove();
					resolved++;
					continue;
				}
			}
		} while (resolved > 0);
		Assert.isTrue(active.isEmpty());
	}
	
	void increment(Node node) {
		if (node == null)
			return;
		if (node.active)
			return;
		node.active = true;
		node.reached++;
		for (Node child : node.outgoing)
			increment(child);
	}	
	
	public List<Node> getCommonEdge(int size) {
		reset();
		List<Node> nodes = new ArrayList<Node>();
		for (Resource resource : includes)
			findEdges(size, map.get(resource), nodes, true);
		return nodes;
	}
	
	void findEdges(int requiredReach, Node node, List<Node> nodes, boolean isRoot) {
		if (node == null)
			return;
		if (node.active)
			return;
		node.active = true;
		
		if (!isRoot && node.reached >= requiredReach) {
			boolean childrenContained = true;
			for (Node child : node.outgoing)
				childrenContained &= (child.reached >= requiredReach);
			if (childrenContained) {
				nodes.add(node);
				return;
			}
		}

		for (Node child : node.outgoing)
			findEdges(requiredReach, child, nodes, false);
	}
	
	Node add(Resource resource) {
		if (nodesExcluded.contains(resource))
			return null;
		Node node = map.get(resource);
		if (node != null)
			return node;
		node = new Node(resource);
		map.put(resource, node);
		process(node);
		nodes.add(node);
		return node;
	}

	void addExclusion(Resource resource) {
		if (nodesExcluded.contains(resource))
			return;
		nodesExcluded.add(resource);
		//TODO this seems unnecessary
		resource.internalRefresh(context);
		for (Dependency dependency : resource.getDependencies()) {
			Resource resolved = dependency.resolve();
			if (resolved != null)
				addExclusion(resolved);
		}
	}
	
	synchronized Collection<Resource> getCSSResources() {
		if (css == null) {
			css = new ArrayList();
			for (Node node : getOrderedNodes())
				if (node.resource.getType() == StyleSheet.TYPE)
					css.add(node.resource);
		}
		return css;
	}
	
	public List<String> getJavaScriptURIs() {
		List<String> result = new ArrayList();
		if (context.mode == Mode.DEBUG) {
			long recently = new Date().getTime() - ONE_HOUR_MS;
			for (Resource r : getJavascriptResources()) {
				// removed for cross domain loading
//				if (r.getType() == DojoTemplate.TYPE)
//					continue;
				StringBuilder url = new StringBuilder(context.base);
				url.append(AjaxFramework.WEB_ROOT);
				url.append(r.getFullPath());
				if (r.getType() == DojoMessageBundle.TYPE) {
					url.append(".js?debug=true");
					url.append("&render=messageBundle");
					if (context.locale.getLanguage().length() > 0)
						url.append("&lang="+context.locale.getLanguage().toLowerCase(Locale.ENGLISH));
					if (context.locale.getCountry().length() > 0)
						url.append("&country="+context.locale.getCountry().toLowerCase(Locale.ENGLISH));
				}
				else if (r.getType() == DojoTemplate.TYPE) {
					url.append("?debug=true");
					url.append("&render=template");
				}
				else
					url.append(".js?debug=true");

				Resource.State state = r.getState(context);
				//Don't use etags for resources recently modified - firebug loses breakpoints when URL changes
				if (state.lastModified < recently)
					url.append("&etag=" + state.getETag());
				result.add(url.toString());
			}
		} else {
			StringBuilder url = new StringBuilder(context.base);
			url.append(AjaxFramework.JS_ROOT);
			url.append("/?include=");
			for (Resource r : includes)
				url.append(r.getTinyId() + DELIMETER);
			url.append("&etag=" + getETag());
			// ADDED: propagate language to sub resources
			if (context.locale.getLanguage().length() > 0)
				url.append("&lang="+context.locale.getLanguage().toLowerCase(Locale.ENGLISH));
			if (context.locale.getCountry().length() > 0)
				url.append("&country="+context.locale.getCountry().toLowerCase(Locale.ENGLISH));
			if (context.locale.getVariant().length() > 0)
				url.append("&variant="+context.locale.getVariant().toLowerCase(Locale.ENGLISH));
			if (!excludes.isEmpty()) {
				url.append("&exclude=");
				for (Resource r : excludes)
					url.append(r.getTinyId() + DELIMETER);
			}
			if (context.mode == Mode.NO_MINIFY)
				url.append("&debug=dojo");
			result.add(url.toString());
		}
		return result;
	}
	
	public List<String> getStyleSheetURIs() {
		StringBuilder url = new StringBuilder(context.base);
		url.append(AjaxFramework.STYLE_ROOT);
		url.append("/?include=");
		for (Resource r : includes)
			url.append(r.getTinyId() + DELIMETER);
		url.append("&etag=" + getETag());
		if (!excludes.isEmpty()) {
			url.append("&exclude=");
			for (Resource r : excludes)
				url.append(r.getTinyId() + DELIMETER);
		}
		return Collections.singletonList(url.toString());
	}

	public String getETag() {
		return etag;
	}
	
	public Collection<Resource> getIncludes() {
		return includes;
	}
	
	public synchronized Collection<Resource> getJavascriptResources() {
		if (javascript == null) {
			ResourceGraphOperation.LOGGER.trace("Calculating javascript resources");
			javascript = new ArrayList();
			if (excludes.isEmpty()) {
				JavaScriptResource dojo = Resource.resolve(JavaScriptResource.TYPE, "dojo.dojo");
				javascript.add(dojo);
			}
			for (Node node : getOrderedNodes()) {
				Type type = node.resource.getType();
				if (type == JavaScriptResource.TYPE
						|| type == DojoMessageBundle.TYPE
						|| type == DojoTemplate.TYPE) {
					javascript.add(node.resource);
				}
			}
		}
		return javascript;
	}
	
	public long getLastModified() {
		return lastModified;
	}
	
	synchronized List<Node> getOrderedNodes() {
		if (!ordered) {
			ordered = true;
			int left = 0;
			int right = nodes.size();
			boolean change;
			do {
				change = false;
				//Remove things on the "left" that have no outgoing edges
				for (int i = left; i < right; i++) {
					Node current = nodes.get(i);
					if (current.outgoing.size() == 0) {
						swap(nodes, i, left++);
						current.remove();
						change = true;
					}
				}
				if (!change) //Only remove from the Right if nothing was removed on Left
					for (int i = right - 1; i >= left; i--) {
						Node current = nodes.get(i);
						 if (current.incoming.size() == 0) {
							swap(nodes, i, --right);
							current.remove();
							change = true;
						}
					}
			} while (change);
		}
		return nodes;
	}
	
	public Collection<CharSequence> getProblems() {
		return problems;
	}
	
	void process(Node node) {
		Resource resource = node.resource;
		resource.internalRefresh(context);
		resource.getState(context, state);
		try {
			StringBuilder builder = new StringBuilder();
			resource.write(builder, context);
			node.size = builder.length();
		} catch (IOException e) {
		}
		
		for (Dependency dependency : resource.getDependencies()) {
			Resource resolved = dependency.resolve();
			if (resolved == null) {
				problems.add("Resource " + resource + " has an unresolved dependency on: " + dependency);
				continue;
			}
			if (dependency.isInverted())
				add(resolved).references(node);
			else
				node.references(add(resolved));
		}
	}

	public void writeCSS(Writer output, RenderContext context) throws IOException {
		for (Resource resource : getCSSResources())
			resource.write(output, context);
	}
	
	public void writeJavascript(Writer output, RenderContext context) throws IOException {
		Collection<Resource> resources = getJavascriptResources();
		Object token = ResourceGraphOperation.LOGGER.startBenchmark("Writing javascript");
		for (Resource resource : resources)
			resource.write(output, context);
		ResourceGraphOperation.LOGGER.endBenchmark(token);
	}
	
	private static void swap(List<Node> nodes, int i, int j) {
		if (i == j)
			return;
		Node temp = nodes.get(i);
		nodes.set(i, nodes.get(j));
		nodes.set(j, temp);
	}

	static class Node {
		List<Node> incoming = Collections.EMPTY_LIST;
		List<Node> outgoing = Collections.EMPTY_LIST;
		final Resource resource;
		int reached = 0;
		boolean active = false;
		long size = 0;
		long childSize = -1;
		
		Node(Resource resource) {
			this.resource = resource;
		}
		
		public void references(Node other) {
			if (other == null)
				return;
			if (outgoing == Collections.EMPTY_LIST)
				outgoing = new ArrayList();
			outgoing.add(other);
			
			if (other.incoming == Collections.EMPTY_LIST)
				other.incoming = new ArrayList();
			other.incoming.add(this);
		}

		void remove() {
			for (Node dependent : incoming)
				dependent.outgoing.remove(this);
			for (Node dependency : outgoing)
				dependency.incoming.remove(this);
		}
		
		public String toString() {
			return resource.toString();
		}
	}
}
