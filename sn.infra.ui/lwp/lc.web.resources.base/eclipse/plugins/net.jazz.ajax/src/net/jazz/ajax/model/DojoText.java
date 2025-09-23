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
import java.net.URL;

import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.util.Util;

public class DojoText extends JavaScriptResource {
	
	// ADDED
	public DojoText(URL[] urls, String id) {
		super(urls, id);
	}
	
	// CHANGED: made public
	public DojoText(URL url, String id) {
		super(url, id);
	}
	
	@Override
	void load(StringBuilder input) {
		StringBuilder temp = new StringBuilder();
		temp.append("\n;define(\"");
		temp.append(getId());
		temp.append("\", '");
		for (int i = 0; i < input.length(); i++) {
			char c = input.charAt(i);
			switch (c) {
				case '\n':
					temp.append("\\n");
					break;
				case '\r':
					temp.append("\\r");
					break;
				case '\'':
					temp.append('\\');
				default:
					temp.append(c);
			}
		}
		temp.append("\');\n");
		minified = temp.toString();
	}
	
	public void write(Appendable output, RenderContext context) throws IOException {
		output.append(minified);
	}
	
	// CHANGED: made public
	public static Dependency newDependency(String id) {
		return new DojoTextDependency("dojo/text!" + id);
	}
	
	static class DojoTextDependency extends Dependency {
		DojoTextDependency(String id) {
			super(TYPE, id);
		}
		
		// CHANGED: set to public
		public boolean isDerived() {
			return true;
		}
		
		// CHANGED: resource override
		public <T extends Resource> T resolve() {
			if (resource == null)
				synchronized (WRITELOCK) {
					Resource r = Resource.resolve(TYPE, id);
					if (r == null) {
						String textId = id.substring(10); //length of "dojo/text!"
						WebBundle bundle = WebBundle.bundleMatching(textId);
						if (bundle == null)
							return null;
						String path = textId.substring(bundle.getId().length());
						URL[] urls = Util.getURLs(ResourceOverride.getService().getSimpleResourceUrl(textId), bundle.getEntry(path));;
						if (urls == null)
							return null;
						r = new DojoText(urls, id);
						r.addDependency(bundle.bootstrapDependency);
						r.register();
					}
					resource = r;
				}
			
			return (T) resource;
		}
	}

}
