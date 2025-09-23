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

import java.util.Locale;

import org.eclipse.core.runtime.IConfigurationElement;

import net.jazz.ajax.internal.registry.Registry;

public class AjaxApplicationPage extends Resource {

	public static final Type<AjaxApplicationPage> TYPE = Type.create("ajaxApplicationPage");
	
	final IConfigurationElement element;
	
	public AjaxApplicationPage(String id, IConfigurationElement element) {
		super(TYPE, id);
		this.element = element;
		String widgetClass = element.getAttribute("widget");
		addDependency(new WebBundleDependency(JavaScriptResource.TYPE, widgetClass));
	}
	
	public String getName(Locale locale) {
		return Registry.translate(element, element.getAttribute("name"), locale);
	}
	
	public String getUri() {
		return "#action=jazz.viewPage&id=" + this.getId();
	}
	
}
