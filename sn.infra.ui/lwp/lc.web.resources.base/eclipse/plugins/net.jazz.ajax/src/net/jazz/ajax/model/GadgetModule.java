/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.BootstrapProperties;
import net.jazz.ajax.internal.util.MasterTemplate;
import net.jazz.ajax.internal.util.ParameterizedTemplate;
import net.jazz.ajax.servlets.ResourceGraph;

public class GadgetModule extends AjaxPage {

	public static final Type<AjaxModule> TYPE = Type.create("gadgetModule");
	
	static final MasterTemplate MASTER = new MasterTemplate(GadgetModule.class.getResourceAsStream("GadgetModule.html"));
	static final Dependency COMMON_CSS_BINDING;
	
	private String viewletDef = null;
	private String frontsideUrl = null;
	
	static {
		COMMON_CSS_BINDING = StyleSheet.newDependency("jazz.ui/templates/JazzCommonStyles", false);
		Resource.createBinding(
				new Key(StyleSheet.TYPE, "jazz.ui/templates/JazzCommonStyles"),
				new WebBundleDependency(JavaScriptResource.TYPE, "dijit" + WebBundle.BOOTSTRAP));
	}
	
	public GadgetModule(String id, String alias, String widgetClass) {
		this(id, alias, widgetClass, null, null);
	}
	
	public GadgetModule(String id, String alias, String widgetClass, String icon, String def) {
		super(TYPE, id, alias, widgetClass, icon);
		viewletDef = def;
		dependencies.add(0, COMMON_CSS_BINDING);
	}
	
	ParameterizedTemplate newTemplate() {
		return MASTER.newInstance();
	}
	
	public void write(HttpServletRequest request, HttpServletResponse response) throws IOException {
		this.frontsideUrl = BootstrapProperties.getFrontsideUrl();
		super.write(request, response);
	}
	
	void write(ParameterizedTemplate template, ResourceGraph graph, RenderContext context) throws IOException {
		super.write(template, graph, context);
		template.getParameter("ajaxModuleClass").append("com.ibm.team.dashboard.web.adapter.internal.OpenSocialViewletAdapter");
		template.getParameter("ajaxModuleId").append(getId());
		template.getParameter("ajaxModuleWidget").append(getWidgetClass());
		template.getParameter("viewletDefinition").append(viewletDef);

		/* WORKAROUND ALERT: don't use a <base> tag to reference resources. All links to resources 
		 * must be absolute. This is to work around a bug in JIRA - see https://jira.atlassian.com/browse/JRA-26130.
		 * If/when that is fixed, we can start using the <base> tag again. */
//		StringBuilder baseTag = template.getParameter("baseTag");
//		baseTag.append(this.rootUrl);
		
		StringBuilder output = template.getParameter("requiredProperties");
		output.append("dojo.setObject(\"net.jazz.ajax.dataServerRoot.gadget\", function() { return \"" + this.frontsideUrl + "\";}); dojo.provide(\"net.jazz.ajax.dataServerRoot.gadget\");");
		output.append("dojo.setObject(\"net.jazz.ajax.contextRoot.gadget\", function() { return \"" + this.frontsideUrl + "\";}); dojo.provide(\"net.jazz.ajax.contextRoot.gadget\");");

		// Set the variable to notify the loader that we're in the gadget adapter
		output = template.getParameter("isGadgetAdapter");
		output.append("true");
	}

}
