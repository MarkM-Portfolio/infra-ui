/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2016                                    */
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
import java.io.Writer;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.NLSMessages;
import net.jazz.ajax.internal.util.ParameterizedTemplate;
import net.jazz.ajax.internal.util.ServletService;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.servlets.AjaxPageServlet;
import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.servlets.ResourceGraphOperation;

public abstract class AjaxPage extends Resource {
	static final Map<String, AjaxPage> ALIAS_MAP = new HashMap();
	final Dependency widgetClass;
	final String alias, iconPath;
	volatile int priority;

	@Deprecated
	public AjaxPage(Type<?> type, String id, String alias, String widgetClass) {
		this(type, id, alias, widgetClass, null);
	}
	
	protected AjaxPage(Type<?> type, String id, String alias, String widgetClass, String icon) {
		super(type, id);
		if (icon == null)
			icon = "net.jazz.ajax/jazz.ico";
		this.iconPath = icon;
		this.alias = alias;
		this.widgetClass = new WebBundleDependency(JavaScriptResource.TYPE, widgetClass);
		addDependency(this.widgetClass);
	}
	
	public boolean checkStatus(HttpServletRequest request, HttpServletResponse response) {
		return false;
	}

	public String getWidgetClass() {
		return widgetClass.resolve().getId();
	}
	
	abstract ParameterizedTemplate newTemplate();
	
	@Override boolean internalIsDynamic() {
		return AjaxFramework.DEV_MODE;
	}
	
	void internalSetPriority(int priority) {
		this.priority = priority;
	}

	// CHANGED: return this
	public Resource register() {
		synchronized (WRITELOCK) {
			AjaxPage existing = ALIAS_MAP.get(alias);
			if (existing != null && existing.priority < priority)
				ServletService.unregisterServlet(alias);
			else if (existing != null && existing.priority == priority)
				throw new RuntimeException("The alias \"" + alias + "\" is already in use by: " + existing);
			
			if (existing == null || existing.priority < priority) {
				ServletService.registerServlet(alias, new AjaxPageServlet(this));
				ALIAS_MAP.put(alias, this);
			}
			super.register();
		}
		return this;
	}
	
	public void unregister() {
		synchronized (WRITELOCK) {
			super.unregister();
			if (ALIAS_MAP.get(alias) == this) {
				ALIAS_MAP.remove(alias);
				ServletService.unregisterServlet(alias);
			}
		}
	}
	
	public void write(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (checkStatus(request, response))
			return;
		RenderContext context = RenderContext.forRequest(request);
		ResourceGraph graph = new ResourceGraphOperation(context, this).execute();
		if (!graph.getProblems().isEmpty()) {
			response.sendError(500, graph.getProblems().toString());
			return;
		}
		ParameterizedTemplate template = newTemplate();
		response.setContentType("text/html");
		write(template, graph, context);
		Writer writer = ServletUtil.negotiateWriter(request, response);
		writer.append(template.getResult());
		writer.close();
	}
	
	void write(ParameterizedTemplate template, ResourceGraph graph, RenderContext context) throws IOException {
		template.getParameter("noScriptMsg").append(
				NLSMessages.getMessage("message.noscript", context.locale));
		
		template.getParameter("isDebugEnabled").append(context.mode.djConfig());
		template.getParameter("baseUrl").append(context.base + AjaxFramework.WEB_ROOT + "dojo/");
		writeDojoLocale(template.getParameter("locale"), context.locale);
		template.getParameter("contextRoot").append(context.base);
		template.getParameter("iconPath").append(iconPath);

		String language = context.locale.getLanguage();
		if(language.equals("ar") || language.equals("iw)")){
			template.getParameter("bidiAttr").append(String.format("dir=\"rtl\" lang=\"%s\"",language));
		}else{
			template.getParameter("bidiAttr").append("");
		}
		
		graph.writeJavascriptTags(template.getParameter("javascript"));
		StringBuilder style = template.getParameter("style");
		style.append(graph.getStyleSheetURIs().iterator().next());
	}

	private static void writeDojoLocale(StringBuilder result, Locale locale) {
		String language = locale.getLanguage();
		if ("iw".equals(language))
			language = "he";
		else if ("in".equals(language))
			language = "id";
		else if ("sr_latn".equals(language))
			language = "sr";
		
		result.append(language);
		String country = locale.getCountry();
		if (!country.isEmpty()) {
			result.append('-');
			result.append(country.toLowerCase());
		}
	}
}
