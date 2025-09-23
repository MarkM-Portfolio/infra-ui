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
import java.net.URL;
import java.util.regex.Pattern;

import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.util.Util;


public class DojoTemplate extends TextResource {
	
	// ADDED
	protected static URL getTemplateOverrideUrl(String path) {
		return ResourceOverride.getService().getSimpleResourceUrl(path);
	}
	
	public static final Type<DojoTemplate> TYPE = Type.create("HTMLTemplate");
	volatile CharSequence content;
	
	public DojoTemplate(URL url, String id) {
		super(TYPE, url, id);
	}
	
	// ADDED
	public DojoTemplate(URL[] urls, String id) {
		super(TYPE, urls, id);
	}
	
	@Override
	void load(StringBuilder input) {
		StringBuilder temp = new StringBuilder();
		temp.append("\n;dojo.cache(\"");
		int index = getId().indexOf('/');
		temp.append(getId().substring(0, index));
		temp.append("\", \"");
		temp.append(getId().substring(index + 1));
		temp.append("\", \"");
		
		//ADDED: whitespace collapse, comment removal
		Pattern comments = Pattern.compile("<!--.*?-->", Pattern.MULTILINE | Pattern.DOTALL);
		String html = comments.matcher(input).replaceAll("");
		boolean whitespace = false;
		for (int i = 0; i < html.length(); i++) {
			char c = html.charAt(i);
			switch (c) {
				case '\n':
				case '\r':
					break;
				case '\t':
					c = ' ';
				case ' ':
					if (whitespace)
						break;
					whitespace = true;
					temp.append(c);
					break;
				case '"':
					temp.append('\\');
				default:
					temp.append(c);
					whitespace = false;
			}
		}
		temp.append("\");\n");
		content = temp.toString();
	}
	
	public void write(Appendable output, RenderContext context) throws IOException {
		output.append(content);
	}
	
	// CHANGED: made public
	public static Dependency newDependency(String module, String path) {
		return new DojoTemplateDependency(module, path);
	}
	
	static class DojoTemplateDependency extends Dependency {
		final String module;
		final String path;
		// ADDED
		final String overridePath;

		private DojoTemplateDependency(String module, String path) {
			super(TYPE, module + '/' + path);
			this.module = module;
			// ADDED
			this.path = '/' + path;
			this.overridePath = module.replace('.', '/') + '/' + path;
		}
		
		// CHANGED: set to public
		public boolean isDerived() {
			return true;
		}
		
		// CHANGED: multiple URLs
		public <T extends Resource> T resolve() {
			if (resource == null)
				synchronized (WRITELOCK) {
					Resource r = Resource.resolve(TYPE, getId());
					if (r == null) {
						WebBundle bundle = Resource.resolve(WebBundle.TYPE, module);
						if (bundle == null)
							return null;
						URL[] urls = Util.getURLs(getTemplateOverrideUrl(overridePath), bundle.getEntry(path));
						if (urls == null)
							return null;
						r = new DojoTemplate(urls, getId());
						r.addDependency(bundle.bootstrapDependency);
						r.register();
					}
					resource = r;
				}
			
			return (T) resource;
		}
	}

}
