/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
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
import java.net.URL;
import java.util.Arrays;
import java.util.Collection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.core.runtime.Assert;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.internal.util.TraceSupport;

public class JavaScriptModule extends JavaScriptResource {

	static final TraceSupport LOG = TraceSupport.create(JavaScriptModule.class.getName());
	static final Pattern DEFINE = Pattern.compile("define\\s*\\(((?:\"([^\"]+)\",\\s*)?)(?:\\[([^\\]]*)\\])?", Pattern.MULTILINE | Pattern.DOTALL);
	static final Pattern DEFINE_DEPENDENCIES = Pattern.compile("[\"\']([^\"\']+)[\"\']", Pattern.MULTILINE);
	static final Pattern REQUIRE_TO_URL = Pattern.compile("(?<=require\\.toUrl\\(\")[^\"]+\\.(?:gif|png|jpg)(?=\"\\))");
	static final Pattern MODULE_SEGMENTS = Pattern.compile("[^!?:]+");
	static final Collection<String> IGNORED = Arrays.asList("exports", "module", "require");
	static final TraceSupport LOGGER = TraceSupport.create(JavaScriptModule.class.getName());
	
	static final int INIT = 1, SLASH = 2, SINGLE = 3, MULTI = 4, MULTI_STAR = 5;
	
	static Matcher defineMatcher(CharSequence content) {
		int start = skipFluff(content);
		if (start == -1)
			return null;
		if(content!=null){
			Matcher m = DEFINE.matcher(content);
			m.region(start, content.length());
		if (!m.find())
			return null;
		return m;
		}
		return null;
	}
	
	static int skipFluff(CharSequence content) {
		int result = 0, index = 0;
		int state = INIT;
		
		if(content!=null){
			while (index < content.length()) {
				char c = content.charAt(index);
				switch (state) {
					case INIT:
						if (c == '/')
							state = SLASH;
						else if (!Character.isWhitespace(c))
							return index;
						break;
					case SLASH:
						if (c == '/')
							state = SINGLE;
						else if (c == '*')
							state = MULTI;
						else
							return index - 1;
						break;
					case SINGLE:
						if (c == '\r' || c == '\n')
							state = INIT;
						break;
					case MULTI:
						if (c == '*')
							state = MULTI_STAR;
						break;
					case MULTI_STAR:
						if (c == '/')
							state = INIT;
						else if (c != '*')
							state = MULTI;
						break;
				}
				if (state == INIT)
					result = index;
				index ++;
			}
		}
		return result;
	}
	
	volatile String depends;
	
	public JavaScriptModule(URL url, String moduleId) {
		super(url, moduleId);
	}
	
	// ADDED
	public JavaScriptModule(URL[] urls, String id) {
		super(urls, id);
	}

	@Override
	String fixRawContent(StringBuilder content) {
		Matcher m = defineMatcher(content);
		if (m != null) {
			if (m.group(1).length() > 0) {
				Assert.isTrue(getAMDModuleId().equals(m.group(2)));
			} else {
				content.insert(m.start(1), '"' + getAMDModuleId() + "\",");
			}
		} else {
			LOGGER.warn("Unexpected condition in " + getId());
		}
			
		{
			//We don't expect to find these dojo relics.
			m = DojoModule.DOJO_LOCALIZATION.matcher(content);
			Assert.isTrue(!m.find());
			
			m = DojoModule.DIJIT_TEMPLATE_PATH.matcher(content);
			Assert.isTrue(!m.find());
			
//			m = DojoModule.DOJO_MODULE_URL.matcher(content);
//			if (m.find())
//				System.out.println("Found dojo.moduleUrl() in " + getId());
		}
		
		StringBuffer buffer = new StringBuffer(content.length() + 200);

		m = REQUIRE_TO_URL.matcher(content);
		while (m.find())
			m.appendReplacement(buffer,
					addEtag(m.group()));
		return m.appendTail(buffer).toString();
	}
	
	private String getAMDModuleId() {
		String result = getFullPath();
		int index = result.indexOf('/');
		result = result.substring(0, index + 1) + result.substring(index + 1).replace('.', '/');
		return result;
	}
	
	@Override
	void load(StringBuilder content) {
		minified = JavaScriptUtil.minify(
				fixRawContent(content));
		Matcher m = DEFINE.matcher(minified);
		Assert.isTrue(m.find());
		depends = m.group(3);
		if (depends != null) {
			m = DEFINE_DEPENDENCIES.matcher(depends);
			while (m.find()) {
				String dependency = resolveDependency(m.group(1));
				if (IGNORED.contains(dependency))
					continue;
				if (WebBundle.forAlias(dependency) != null)
					dependency += "/main";
				processDependency(dependency);
			}
		}
	}
	
	private void processDependency(String dependency) {
		if (!dependency.contains("!")) {
			addDependency(
					new WebBundleDependency(JavaScriptResource.TYPE, dependency.replace('/', '.'), true));
		} else {
			String tokens[] = dependency.split("[!?:]");
			String plugin = tokens[0];
			if ("dojo/text".equals(plugin)) {
				addDependency(DojoText.newDependency(tokens[1]));
			} else if ("dojo/i18n".equals(plugin)) {
				addDependency(DojoI18n.newDependency(tokens[1]));
			} else if ("dojo/has".equals(plugin)) {
				if ("dojo-sync-loader".equals(tokens[1]))
					return;
				if (tokens[2].length() == 0)
					tokens[2] = tokens[3];
				addDependency(
						new WebBundleDependency(JavaScriptResource.TYPE, tokens[2].replace('/', '.'), true));
			} else if ("dojo/domReady".equals(plugin)) {
			} else if ("jazz/inverted".equals(plugin)) {
				addDependency(new WebBundleDependency.Inverted(tokens[1].replace('/', '.')));
			} else 
				LOGGER.warn("Found ", dependency, " in ", getId());
		}
	}
	
	private String resolveDependency(String dependency) {
		StringBuffer result = new StringBuffer(dependency.length());
		Matcher m = MODULE_SEGMENTS.matcher(dependency);
		URI base = URI.create(getAMDModuleId());
		while (m.find())
			m.appendReplacement(result,
					resolveSegment(base, m.group()));
		return m.appendTail(result).toString();
	}
	
	private String resolveSegment(URI base, String segment) {
		if (!segment.startsWith("."))
			return segment;
		return base.resolve(segment).toString().replaceFirst("\\/$" /*trailing slash*/, "");
	}
	
	private String addEtag(String path) {
		if (path.startsWith("."))
			path = URI.create(getAMDModuleId()).resolve(path).toString();
		WebBundle bundle = WebBundle.bundleMatching(path);
		if (bundle == null)
			return path;
		URL url = bundle.getEntry(path.substring(bundle.getId().length()));
		if (url == null && AjaxFramework.DEV_MODE)
			LOG.warn("Unable to resolve URL: " + path + " in " + getId());
		else
			try {
				path += "?etag=" + hashString(url.openConnection().getLastModified());
			} catch (IOException e) {
				AjaxFramework.log(e);
			}
		return path;
	}
}
