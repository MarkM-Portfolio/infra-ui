/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2016                                    */
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

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.io.IOUtils;
import org.mozilla.javascript.NativeObject;

import com.ibm.sistdase.json.JSONSerializer;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.internal.util.Util;

public class DojoI18n extends Resource {
    private static final Logger LOGGER = Logger.getLogger(DojoI18n.class.getName());

	final WebBundle webBundle;
	final Map<Locale, LocalizedContent> cache = Collections.synchronizedMap(new HashMap());
	
	public DojoI18n(WebBundle webBundle, String id) {
		super(JavaScriptResource.TYPE, id);
		this.webBundle = webBundle;
	}
	
	public String getFullPath() {
		String result = webBundle.getId() + '/';
		result += getId().substring(result.length());
		return result;
	}

	// CHANGED: validate URLs in cache
	LocalizedContent getLocalizedContent(Locale locale) {
		LocalizedContent content = cache.get(locale);
		URL url = urlFor(locale);
		if (content == null || !content.url.equals(url)) {
			if (url == null)
				cache.put(locale, content = getLocalizedContent(baseFor(locale)));
			else
				cache.put(locale, content = new LocalizedContent(url, locale));
		}
		return content;
	}
	
	static Locale baseFor(Locale locale) {
		if (locale.getCountry().isEmpty())
			return null;
		return new Locale(locale.getLanguage());
	}
	
	// CHANGED: resource override
	URL urlFor(Locale locale) {
		String id = getId();
		id = id.substring(id.indexOf("!") + 1);
		if (locale == null)
			return getEntry(id, ".js");
		String language = locale.getLanguage();
		if ("iw".equals(language))
			language = "he";
		else if ("in".equals(language))
			language = "id";
		else if ("sr_latn".equals(language))
			language = "sr";
		
		int split = id.lastIndexOf('/');
		String base = id.substring(0, split + 1) + language;
		String file = id.substring(split);
		if (!locale.getCountry().isEmpty())
			base += '-' + locale.getCountry().toLowerCase();
		return getEntry(base + file, ".js");
	}
	
	// ADDED:
	URL getEntry(String path, String extension) {
		URL override = ResourceOverride.getService().getDojoModuleUrl(path);
		if (override != null) {
			InputStream is = null;
			try {
				URLConnection conn = override.openConnection();
				is = conn.getInputStream();
				return override;
			} catch (FileNotFoundException e) {
				// Ignore
			} catch (IOException e) {
				throw new ResourceUnavailableException(e);
			} finally {
				IOUtils.closeQuietly(is);
			}
		}
		return webBundle.getEntry(path, extension);
	}

	@Override
	public void getState(RenderContext context, State state) {
		LocalizedContent content = getLocalizedContent(context.locale);
		if (content != null)
			content.getState(state);
	}
	@Override
	public boolean internalRefresh(RenderContext context) {
		LocalizedContent content = getLocalizedContent(context.locale);
		if (content != null)
			return content.internalRefresh();
		return false;
	}
	@Override
	boolean internalIsDynamic() {
		return AjaxFramework.DEV_MODE;
	}
	@Override
	public void write(Appendable output, RenderContext context) throws IOException {
		LocalizedContent content = getLocalizedContent(context.locale);
		if (content != null)
			content.write(output, context);
	}
	
	class LocalizedContent {
		final URL url;
		final LocalizedContent base;
		volatile String content;
		volatile State state;
		
		LocalizedContent(URL url, Locale locale) {
			this.url = url;
			if (locale == null)
				base = null;
			else
				base = DojoI18n.this.getLocalizedContent(baseFor(locale));
			internalRefresh();
		}
		
		public String getContent() throws IOException {
			if (content == null) {
				Map<String, Object> messages = new HashMap();
				getMessages(messages);
				StringWriter writer = new StringWriter();
				writer.write("\n;define(\"" + getId() + "\", ");
				try {
					JSONSerializer.serialize(writer, messages);
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
				writer.write(");\n");
				content = writer.toString();
			}
			return content;
		}
		
		boolean internalRefresh() {
			try {
				State newState = new State();
				newState.merge(url.openConnection().getLastModified());
				if (base != null) {
					base.internalRefresh();
					base.getState(newState);
				}
				if (newState.equals(state))
					return false;
				state = newState;
				content = null;
				return true;
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		
		void getMessages(Map<String, Object> result) {
			StringBuilder buffer = Util.stringBuilder(url);
			if (base == null)
				buffer.insert(0, "function define(nls){return nls.root;}\n");
			else {
				base.getMessages(result);
				buffer.insert(0, "function define(nls){return nls;}\n");
			}
			try { // 198003: limit the impact of invalid message files
				NativeObject messages = JavaScriptUtil.eval(buffer.toString());
				result.putAll(JavaScriptUtil.convert(messages));
			} catch (Throwable t) {
			    LOGGER.severe("Failed getting messages for " + url + "; error: " + t.getMessage());
			}
			NativeObject messages = JavaScriptUtil.eval(buffer.toString());
			result.putAll(JavaScriptUtil.convert(messages));
		}
		
		void getState(State result) {
			result.merge(state);
		}
		
		void write(Appendable output, RenderContext context) throws IOException {
			output.append(getContent());
		}
	}
	
	// CHANGED: made public
	public static Dependency newDependency(String id) {
		return new DojoI18nDependency("dojo/i18n!" + id);
	}
	
	static class DojoI18nDependency extends Dependency {
		DojoI18nDependency(String id) {
			super(JavaScriptResource.TYPE, id);
		}
		
		// CHANGED: set to public
		public boolean isDerived() {
			return true;
		}
		
		public <T extends Resource> T resolve() {
			if (resource == null)
				synchronized (WRITELOCK) {
					Resource r = Resource.resolve(JavaScriptResource.TYPE, id);
					if (r == null) {
						WebBundle bundle = WebBundle.bundleMatching(id.substring(id.indexOf('!') + 1));
						if (bundle == null)
							return null;
						r = new DojoI18n(bundle, id);
						r.register();
					}
					resource = r;
				}
			
			return (T) resource;
		}
	}

}
