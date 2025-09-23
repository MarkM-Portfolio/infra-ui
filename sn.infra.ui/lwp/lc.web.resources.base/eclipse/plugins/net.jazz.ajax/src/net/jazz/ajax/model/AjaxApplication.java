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

package net.jazz.ajax.model;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.MasterTemplate;
import net.jazz.ajax.internal.util.MultiValueMap;
import net.jazz.ajax.internal.util.NLSMessages;
import net.jazz.ajax.internal.util.ParameterizedTemplate;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.resource.IResourceLoaderStatusHandler;
import net.jazz.ajax.servlets.ResourceGraph;

public class AjaxApplication extends AjaxPage {

	public static final Type<AjaxApplication> TYPE = Type.create("ajaxApplication");

	static final TraceSupport LOGGER = TraceSupport.create(AjaxApplication.class.getName());
	static final MasterTemplate MASTER = new MasterTemplate(
			AjaxApplication.class.getResourceAsStream("AjaxApplication.html"));
	static final MultiValueMap<String, String, Collection<String>> PAGE_BINDINGS = MultiValueMap.using(new HashMap(), ArrayList.class);
	static final Dependency platformUIDependency = new WebBundleDependency(JavaScriptResource.TYPE, "net.jazz.ajax.ui.PlatformUI");
	
	final Provider<IResourceLoaderStatusHandler> handler;
	final Collection<String> pageBindings = new CopyOnWriteArrayList();
	volatile List<AjaxApplicationPage> pages;
	
	public AjaxApplication(String id, String alias, String widgetClass, String iconPath, Provider<IResourceLoaderStatusHandler> handler) {
		super(TYPE, id, alias, widgetClass, iconPath);
		this.handler = handler;
		addDependency(platformUIDependency);
	}
	
	void addPageBinding(String pageId) {
		synchronized (WRITELOCK) {
			pageBindings.add(pageId);
		}
		pages = null;
	}
	
	public boolean checkStatus(HttpServletRequest request, HttpServletResponse response) {
		return handler != null && handler.get().checkStatus(request, response);
	}
	
	ParameterizedTemplate newTemplate() {
		return MASTER.newInstance();
	}
	
	public List<AjaxApplicationPage> getPages() {
		if (pages == null) {
			List result = new ArrayList();
			for (String pageId : pageBindings)
				result.add(Resource.resolve(AjaxApplicationPage.TYPE, pageId));
			pages = result;
		}
		return pages;
	}
	
	// CHANGED: return this
	public Resource register() {
		synchronized (WRITELOCK) {
			super.register();
			Collection<String> bindings = PAGE_BINDINGS.get(getId());
			if (bindings != null)
				pageBindings.addAll(bindings);
		}
		return this;
	}
	
	void write(ParameterizedTemplate template, ResourceGraph graph, RenderContext context) throws IOException {
		super.write(template, graph, context);
		template.getParameter("loadingMsg").append(
				NLSMessages.getMessage("message.loading", context.locale));
		template.getParameter("AjaxApplicationClass").append(getWidgetClass());
		template.getParameter("workbenchId").append(getId());

		// Check for custom request attribute before using standard requestUri (necessary if consumers 
		// want to do content negotiation).
		String appPath = (String)context.request.getAttribute("net.jazz.ajax.applicationPath");
		if (appPath == null || appPath.isEmpty())
			appPath = context.request.getRequestURI();
		URI.create(appPath); //to catch bogus inbound requests.
		template.getParameter("appPath").append(appPath);
	}

	static void createPageBinding(String applicationId, String pageId) {
		synchronized (WRITELOCK) {
			AjaxApplication application = Resource.resolve(TYPE, applicationId);
			if (application != null)
				application.addPageBinding(pageId);
			else
				PAGE_BINDINGS.addValue(applicationId, pageId);
		}
	}
}