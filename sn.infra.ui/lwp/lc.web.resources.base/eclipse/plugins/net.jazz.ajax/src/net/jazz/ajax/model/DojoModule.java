/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2014                                    */
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

import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DojoModule extends JavaScriptResource {

	static final Dependency I18N_DEPENDENCY = new WebBundleDependency(DojoModule.TYPE, "dojo.i18n", true);
	static final Pattern DOJO_REQUIRE = Pattern.compile("dojo\\.require\\(\"(.*?)\"\\)");
	static final Pattern UNNECESSARY_REQUIRES = Pattern.compile("^dojo\\.require\\(\"(.*?)\"\\);$", Pattern.MULTILINE);
	//static final Pattern DOJO_PLAT_REQUIRE = Pattern.compile("dojo\\.platformRequire\\(\"(.*?)\"\\)");
	static final Pattern DOJO_PROVIDE = Pattern.compile("dojo\\.provide\\(\"(.*?)\"\\)");
	static final Pattern DOJO_MODULE_URL = Pattern.compile("(?<=dojo\\.moduleUrl\\(\")([^\"]+)\",\"([^\"]+\\.(?:gif|png|jpg))(?=\"\\))");
	static final Pattern DOJO_LOCALIZATION = Pattern.compile("dojo\\.requireLocalization\\(\"(.*?)\",\"(.*?)\"(.*?)\\)");
	// ADDED: Remove dojo.require and add load guards
	static final Pattern EMPTY_DOJO_REQUIRE = Pattern.compile("dojo\\.require\\(\"(.*?)\"\\)(;?(\n?))");
	static final Pattern HAS_DOJO_RESOURCE_CHECK = Pattern.compile("(;?)if\\(!dojo\\._hasResource\\[");
	static final Pattern DIJIT_TEMPLATE_PATH = Pattern.compile("templatePath:dojo\\.moduleUrl\\(\"(.*?)\",\"(.*?)\"\\)");
	
	public DojoModule(URL url, String moduleId) {
		super(url, moduleId);
	}
	
	// ADDED
	public DojoModule(URL[] urls, String id) {
		super(urls, id);
	}

	@Override
	void load(StringBuilder content) {
		super.load(content);
		Matcher m;
		m = DOJO_PROVIDE.matcher(minified);
		boolean matchingProvides = false;
		while (m.find() && !matchingProvides) {
			String provideId = m.group(1);
			matchingProvides |= getId().matches(provideId);
		}
		if (!matchingProvides)
			throw new MissingDojoProvidesException();
		
		m = DOJO_REQUIRE.matcher(minified);
		while (m.find())
			addDependency(
					new WebBundleDependency(JavaScriptResource.TYPE, m.group(1), true));
		
		boolean i18n = false;
		m = DOJO_LOCALIZATION.matcher(minified);
		while (m.find()) {
			i18n = true;
			String id = m.group(1) + '.' + m.group(2);
			int index = id.lastIndexOf('.');
			id = id.substring(0, index) + ".nls" + id.substring(index);
			// Hack: choose the right type based on the requested resource bundle
			if (id.startsWith("dojo.") || id.startsWith("dijit.") || id.startsWith("dojox.") || id.startsWith("ictest."))
				addDependency(DojoI18n.newDependency(id.replace('.', '/')));
			else
				addDependency(new WebBundleDependency(DojoMessageBundle.TYPE, id, true));
		}
		if (i18n)
			addDependency(I18N_DEPENDENCY);
		
		m = DIJIT_TEMPLATE_PATH.matcher(minified);
		while (m.find())
			addDependency(DojoTemplate.newDependency(m.group(1), m.group(2)));
		
		m = UNNECESSARY_REQUIRES.matcher(minified);
		minified = m.replaceAll("\n");
		m = DOJO_MODULE_URL.matcher(minified);
		StringBuffer buffer = new StringBuffer(minified.length() + 200);
		while (m.find()) {
			String path = m.group(2);
			URL url = null;
			WebBundle webBundle = WebBundle.forAlias(m.group(1));
			if (webBundle != null)
				url = webBundle.getEntry("/" + path);
			m.appendReplacement(buffer, m.group(1) + "\",\"" + addEtag(path, url));
		}
		minified = m.appendTail(buffer).toString();
		
		// ADDED: add reload guard around built resources
		m = HAS_DOJO_RESOURCE_CHECK.matcher(minified);
		if (!m.find())
			minified = "if(!dojo._hasResource[\"" + getId() + "\"]){\ndojo._hasResource[\"" + getId() + "\"]=true;\n" + minified + "}\n";
	}
	
	@SuppressWarnings("serial")
	// CHANGED: was RuntimeException
	public static class MissingDojoProvidesException extends ResourceUnavailableException {
		public MissingDojoProvidesException() {
			super("No matching dojo.provide found");
		}
	}
}
