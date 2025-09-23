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
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import org.apache.http.protocol.HTTP;
import org.eclipse.core.runtime.Assert;

import com.ibm.lconn.core.config.Properties;
import com.ibm.lconn.core.config.GenericProperties;
import com.ibm.lconn.core.config.VersionStamp;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.LocaleUtil;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.internal.util.Util;
import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.DojoMessageBundle;
import net.jazz.ajax.model.DojoTemplate;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.RenderContext.Mode;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.State;
import net.jazz.ajax.model.Resource.Type;
import net.jazz.ajax.model.StyleSheet;

public class ResourceGraph {
	static final TraceSupport ERROR_LOG = TraceSupport.create(ResourceGraph.class.getName());
	static final TraceSupport LOG_CACHING = TraceSupport.create("net.jazz.ajax/ResourceGraph/caching");

	static final String DELIMETER = "~";
	static final long ONE_HOUR_MS = 1000L * 3600;
	
	final RenderContext context;
	final List<Resource> resources = new ArrayList();
	final Collection<Resource> known = new HashSet();
	
	final String etagString;
	final long etag;
	final long lastModified;
	final List<CharSequence> problems = Collections.synchronizedList(new ArrayList());
	
	final State state, dynamicState;
	volatile List<Resource> javascript;
	volatile List<Resource> css;
	volatile boolean initialized;
	final Collection<Resource> includes;
	final Collection<Resource> dynamicResources = new ArrayList();
	final ResourceGraph excludes;
	
	final int MAX_PROBLEMS_TO_RECORD = Integer.valueOf(Properties.get("net.jazz.ajax.config.max_problems_to_record", "10"), 10);
	private static boolean includeXDloader_fromconfig;
	private static boolean includeXDloader_fromurl;
	public static final String XDLOADER_CONFIG_PROPERTY = "com.ibm.lconn.core.web.xdloader.include";
	
	public ResourceGraph(RenderContext context, Collection<Resource> includes, ResourceGraph excludes) {
		this.context = context;
		this.includes = includes;
		this.excludes = excludes;
		state = initialState();
		dynamicState = new State();
		includeXDloader_fromconfig = Boolean.parseBoolean(GenericProperties.getProperty(XDLOADER_CONFIG_PROPERTY));
		includeXDloader_fromurl = context.includeXDloader;
		
		if (excludes == null) {
			Resource amdLoader = Resource.resolve("net.jazz.ajax.core.internal.amd");
			add(amdLoader);
			Resource dojo = Resource.resolve("dojo.main");
			add(dojo);			
			// Donot load XDloader in the main layer
			if(!isXDloaderInclude()){
				Resource loader = Resource.resolve("net.jazz.ajax.xdloader");
				add(loader);
			}
		}
		for (Resource included : includes)
			add(included);
		for (Resource resource: resources)
			trackState(resource);
		lastModified = state.lastModified;
		etag = state.etag;
		// CHANGED: do not append locale
		etagString = state.getETag(); // + '_' + context.locale.toString();
		initialized = true;
	}
	
	public ResourceGraph(RenderContext context, Collection<Resource> includes, Collection<Resource> excludes) {
		this(context, includes, new ResourceGraph(context, excludes, (ResourceGraph)null));
	}
	
	public boolean isXDloaderInclude(){		
		return includeXDloader_fromconfig || includeXDloader_fromurl;
	}
	void add(Resource resource) {
		if (excludes != null && excludes.contains(resource))
			return;
		if (known.contains(resource))
			return;
		process(resource);
	}

	// CHANGED: made public
	public boolean contains(Resource resource) {
		return known.contains(resource);
	}
	
	Collection<Resource> getCSSResources() {
		if (css == null) {
			ArrayList result = new ArrayList();
			for (Resource resource : getResources())
				if (resource.getType() == StyleSheet.TYPE)
					result.add(resource);
			css = result;
		}
		return css;
	}
	
	// CHANGED
	public List<String> getJavaScriptURIs() {
		List<String> result = new ArrayList();
		if (context.mode == Mode.DEBUG) {
			long recently = System.currentTimeMillis() - ONE_HOUR_MS;
			for (Resource r : getJavascriptResources()) {
				if (r.getType() == DojoTemplate.TYPE)
					continue;
				StringBuilder url = getResourceURLDebug(context, r);
				Resource.State state = r.getState(context);
				//Don't use etags for resources recently modified - firebug loses breakpoints when URL changes
				if (state.lastModified < recently)
					url.append("&etag=" + state.getETag());
				if (context.gadgetAdaptedViewlet){
					url.append("&context=gadgetAdapter");
				} else {
					try {
						url.append("&_proxyURL=" + URLEncoder.encode(context.base, HTTP.UTF_8));
					} catch (UnsupportedEncodingException e) {
						throw new RuntimeException(e);
					}
				}
				result.add(url.toString());
			}
		} else {
			StringBuilder url = new StringBuilder(context.base);
			url.append(AjaxFramework.JS_ROOT);
			addURLQueryParams(url);
			//url.append("&locale=");
			//LocaleUtil.toDojoString(url, context.locale);
			LocaleUtil.toURLParameters(url, context.locale);
			if (context.mode == Mode.NO_MINIFY)
				url.append("&debug=dojo");
			result.add(url.toString());
		}
		return result;
	}
	
	// ADDED: allow unit testing
	public static StringBuilder getResourceURLDebug(RenderContext context, Resource r) {
		Assert.isTrue(context.mode == Mode.DEBUG);
		if (r.getType() == DojoTemplate.TYPE)
			return null;
		StringBuilder url = new StringBuilder(context.base);
		url.append(AjaxFramework.DEBUG_ROOT + "/");
		url.append(r.getType().name + "/");
//		url.append(AjaxFramework.WEB_ROOT);
		url.append(r.getId());
//		url.append("?debug=true");
		url.append(".js?debug=true");
		return url;
	}

	public List<String> getStyleSheetURIs() {
		StringBuilder url = new StringBuilder(context.base);
		url.append(AjaxFramework.STYLE_ROOT);
		addURLQueryParams(url);
		return Collections.singletonList(url.toString());
	}
	
	void addURLQueryParams(StringBuilder url) {
		url.append("/?include=");
		for (Resource r : includes)
			url.append(r.getTinyId() + DELIMETER);
		url.append("&etag=" + getETag());
		if (excludes != null) {
			url.append("&exclude=");
			for (Resource r : excludes.includes)
				url.append(r.getTinyId() + DELIMETER);
		}
		if (context.gadgetAdaptedViewlet) {
			url.append("&context=gadgetAdapter");
		} else {
			try {
				url.append("&_proxyURL=" + URLEncoder.encode(context.base, HTTP.UTF_8));
			} catch (UnsupportedEncodingException e) {
				throw new RuntimeException(e);
			}
		}
		url.append("&ss=");
		url.append(Resource.internalGetStartupETag());
	}

	public String getETag() {
		return etagString;
	}
	
	public Collection<Resource> getIncludes() {
		return includes;
	}
	
	public Collection<Resource> getJavascriptResources() {
		if (javascript == null) {
			ResourceGraphOperation.LOGGER.trace("Calculating javascript resources");
			ArrayList result = new ArrayList();
			for (Resource resource : getResources()) {
				Type type = resource.getType();
				if (type == JavaScriptResource.TYPE
						|| type == DojoMessageBundle.TYPE
						|| type == DojoTemplate.TYPE) {
					result.add(resource);
				}
			}
			javascript = result;
		}
		return javascript;
	}
	
	public long getLastModified() {
		return lastModified;
	}
	
	List<Resource> getResources() {
		if (initialized)
			return resources;
		return null;
	}
	
	public Collection<CharSequence> getProblems() {
		return problems;
	}
	
	// CHANGED:
	State initialState() {
		State result = new State();
		if (excludes != null) {
			result.lastModified = excludes.lastModified;
			result.etag = excludes.etag;
			//result.merge(Resource.internalGetStartup());//Since the tinyIDs are not preserved between restarts
			result.merge(VersionStamp.getInstance().getDate().getTime());
		}
		return result;
	}
	
	public boolean isStillValid(RenderContext context) {
		if (excludes != null && !excludes.isStillValid(context))
			return false;
		State newState = new State();
		for (Resource resource : dynamicResources)
			if (resource.internalRefresh(context)) {
				LOG_CACHING.trace("Change found in Resource: ", resource.toString());
				return false;
			} else
				resource.getState(context, newState);
		boolean result = newState.equals(dynamicState);
		if (!result)
			LOG_CACHING.trace("Cumulative dynamic state has changed");
		return result;
	}
	
	void process(Resource resource) {
		if (resource.isDynamic())
			resource.internalRefresh(context);
		boolean inverted = false;
		for (Dependency dependency : resource.getDependencies()) {
			Resource resolved = dependency.resolve();
			if (resolved == null) {
				if (problems.size() < MAX_PROBLEMS_TO_RECORD) {
					problems.add("Resource " + resource + " has an unresolved dependency on: " + dependency);
				}
				continue;
			}
			if (dependency.isInverted())
				inverted = true;
			else
				add(resolved);
		}
		if (!known.contains(resource)) {
			resources.add(resource);
			known.add(resource);
		}
		if (inverted) {
			for (Dependency dependency : resource.getDependencies()) {
				if (!dependency.isInverted())
					continue;
				add(dependency.resolve());
			}
		}
	}
	
	void trackState(Resource resource) {
		resource.getState(context, state);
		if (resource.isDynamic()) {
			dynamicResources.add(resource);
			resource.getState(context, dynamicState);
		}
	}

	public void writeCSS(Writer output, RenderContext context) throws IOException {
		for (Resource resource : getCSSResources())
			resource.write(output, context);
	}
	
	void writeIncludes(Appendable output) {
		List<String> ids = new ArrayList(includes.size());
		for (Resource r : includes)
			ids.add('"' + r.getTinyId() + '"');
		Util.join(output, ",", ids);
	}

	// CHANGED
	public void writeJavascript(Writer output, RenderContext context) throws IOException {
		Collection<Resource> resources = getJavascriptResources();
		Object token = ResourceGraphOperation.LOGGER.startBenchmark("Writing javascript");
		for (Resource resource : resources)
			resource.write(output, context);
		if (excludes != null) {
			// updated for defect 222039 Large number of widgets in the Community throw RequestTimeoutError: Timeout exceeded on IE
			// solution: filter duplicated data in window._js_modules
			// script: 
			// moduleIds = [].concat(["quickr.lw.iwidget.MultiModeLibraryWidgetDynamicWidgetImpl"]);
			// window['_js_modules'] = (window['_js_modules']||[]).concat(moduleIds.filter(function (item) { return (window['_js_modules']||[]).indexOf(item) < 0; }));
			
			output.append("\nmoduleIds=[].concat([");
			writeIncludes(output);
			output.append("]);\n");
			output.append("\nwindow['_js_modules']=(window['_js_modules']||[]).concat(");
			output.append("moduleIds.filter(function (item) { return (window['_js_modules']||[]).indexOf(item) < 0; })");
			output.append(");\n");
		}
		ResourceGraphOperation.LOGGER.endBenchmark(token);
	}

	public void writeJavascriptTags(Appendable output) throws IOException {
		for (String src : getJavaScriptURIs())
			output.append(String.format("<script type=\"text/javascript\" src=\"%1$s\"></script>\n", src));
		output.append("\n<script type=\"text/javascript\">\n");
		output.append("require(\"dojo/main\").getObject('jazz.core.loader', true)._serverStartup=\"");
		output.append(Resource.internalGetStartupETag());
		output.append("\";\nrequire(\"dojo/main\").getObject('jazz.core.loader',true)._loaded=[");
		writeIncludes(output);
		output.append("];\n</script>\n");
	}


}
