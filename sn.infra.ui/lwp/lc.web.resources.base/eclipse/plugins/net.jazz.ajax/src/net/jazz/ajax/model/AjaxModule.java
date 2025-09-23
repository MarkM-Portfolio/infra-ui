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

import org.eclipse.core.runtime.Assert;

import net.jazz.ajax.internal.util.MasterTemplate;
import net.jazz.ajax.internal.util.ParameterizedTemplate;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.servlets.ResourceGraph;

public class AjaxModule extends AjaxPage {

	public static final Type<AjaxModule> TYPE = Type.create("ajaxModule");
	
	static final MasterTemplate MASTER = new MasterTemplate(AjaxModule.class.getResourceAsStream("AjaxModule.html"));
	static final Dependency COMMON_CSS_BINDING;
	
	static {
		COMMON_CSS_BINDING = StyleSheet.newDependency("jazz.ui/templates/JazzCommonStyles", false);
		Resource.createBinding(
				new Key(StyleSheet.TYPE, "jazz.ui/templates/JazzCommonStyles"),
				new WebBundleDependency(JavaScriptResource.TYPE, "dijit" + WebBundle.BOOTSTRAP));
	}
	
	public AjaxModule(String id, String alias, String widgetClass) {
		this(id, alias, widgetClass, null);
	}
	
	public AjaxModule(String id, String alias, String widgetClass, String icon) {
		super(TYPE, id, alias, widgetClass, icon);
		dependencies.add(0, COMMON_CSS_BINDING);
	}
	
	ParameterizedTemplate newTemplate() {
		return MASTER.newInstance();
	}
	
	void write(ParameterizedTemplate template, ResourceGraph graph, RenderContext context) throws IOException {
		super.write(template, graph, context);
		template.getParameter("ajaxModuleClass").append(getWidgetClass());
		template.getParameter("ajaxModuleId").append(getId());
		StringBuilder baseTag = template.getParameter("baseTag");
		if (context.request.getParameter("_proxyURL") == null) {
			String rootUrl = ServletUtil.externalDomain(context.request);
			String baseUrl = rootUrl + context.request.getRequestURI();
			Assert.isTrue(!baseUrl.contains("<"));
			baseTag.append("<base href=\"" + baseUrl + "\"/>");
			StringBuilder style = template.getParameter("style");
			style.insert(0, rootUrl);
		}
	}
	
}
