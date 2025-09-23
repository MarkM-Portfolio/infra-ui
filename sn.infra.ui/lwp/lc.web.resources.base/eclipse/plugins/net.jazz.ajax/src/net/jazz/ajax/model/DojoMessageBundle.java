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

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringWriter;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.mozilla.javascript.EvaluatorException;
import org.mozilla.javascript.NativeObject;

import com.ibm.sistdase.json.JSONSerializeException;
import com.ibm.sistdase.json.JSONSerializer;

import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.internal.util.Util;

public class DojoMessageBundle extends Resource {
	
	// ADDED
	static final TraceSupport LOGGER = TraceSupport.create(DojoMessageBundle.class.getName());

	public static final Type<DojoMessageBundle> TYPE = Type.create("messageBundle");
	

	final WebBundle webBundle;
	final Map<Locale, LocalizedContent> cache = Collections.synchronizedMap(new HashMap());
	
	public DojoMessageBundle(WebBundle webBundle, String id) {
		super(TYPE, id);
		this.webBundle = webBundle;
	}
	
	public String getFullPath() {
		String result = webBundle.getId() + '/';
		result += getId().substring(result.length());
		return result;
	}

	// CHANGED:
	LocalizedContent getLocalizedContent(RenderContext context) {
		Locale locale = context.locale;
		LocalizedContent content = cache.get(locale);
		if (content == null)
			cache.put(locale, content = new LocalizedContent(locale));
		return content;
	}
	@Override
	public void getState(RenderContext context, State state) {
		getLocalizedContent(context).getState(state);
	}
	@Override
	public boolean internalRefresh(RenderContext context) {
		LocalizedContent content = getLocalizedContent(context);
		return content.internalRefresh();
	}
	@Override
	boolean internalIsDynamic() {
		return AjaxFramework.DEV_MODE;
	}
	@Override
	public void write(Appendable output, RenderContext context) throws IOException {
		getLocalizedContent(context).write(output, context);
	}
	
	class LocalizedContent {
		final String[] messageFiles;
		final String localeModule;
		final long[] timestamps;
		volatile String content;
		
		// CHANGED
		LocalizedContent(Locale locale) {
			List<String> messages = new ArrayList<String>(3);
			messages.add(getId());
			String base = getId().substring(0, getId().lastIndexOf('.'));
			String file = getId().substring(base.length());
			String language = locale.getLanguage();
			String country = locale.getCountry().toLowerCase(Locale.ENGLISH);
			String variant = locale.getVariant().toLowerCase(Locale.ENGLISH);

			if ("iw".equals(language))
				language = "he";
			else if ("in".equals(language))
				language = "id";
			else if ("sr_latn".equals(language))
				language = "sr";
			
			messages.add(base + '.' + language + file);
			if (country.length() > 0) {
				messages.add(base + '.' + language + '-' + country + file);
				if (variant.length() > 0) {
					messages.add(base + '.' + language + '-' + country + '-' + variant + file);
					localeModule = getId() + '.' + language + '_' + country + '_' + variant;
				} else
					localeModule = getId() + '.' + language + '_' + country;
			} else
				localeModule = getId() + '.' + language;
			this.messageFiles = messages.toArray(new String[messages.size()]);
			timestamps = new long[messages.size()];
			internalRefresh();
		}

		// ADDED
		protected void loadResource(URL url, Map<String, Object> map) throws IOException {
			if (url == null)
				return;

			try {
				StringBuffer buffer = Util.stringBuffer(url.openStream());
				NativeObject result = JavaScriptUtil.eval(buffer.toString());
				map.putAll(JavaScriptUtil.convert(result));
				// ADDED: Log the URL of the resource
			} catch (FileNotFoundException e) {
				LOGGER.trace("No message bundle '" + url + "'");
			} catch (EvaluatorException e) {
				LOGGER.trace("Unable to load " + url + " as a message bundle for resource '" + getFullPath()
						+ "', script error at [line " + e.lineNumber() + ", column " + e.columnNumber()
						+ "]: " + e.getMessage());
			} catch (ClassCastException e) {
				LOGGER.trace("Unable to parse Javascript for message bundle '" + url + "'");
			} catch (IOException e) {
				LOGGER.trace(e, "Unable to parse Javascript for message bundle '" + url + "'");
			}
		}

		// CHANGED
		public String getContent() throws IOException {
			if (content != null)
				return content;
			Map<String, Object> map = new HashMap();
			for (String message : messageFiles) {
				URL url = webBundle.getEntry(message, ".js");
				loadResource(url, map);
			}

			ResourceOverrideService overrideService = ResourceOverride.getService();
			for (String message : messageFiles) {
				URL url = overrideService.getMessageBundleUrl(message + ".js");
				if (url == null)
					url = overrideService.getDojoModuleUrl(message);
				loadResource(url, map);
			}

			StringWriter writer = new StringWriter();
			writer.write("dojo.provide(\"" + getId() + "\")._built=true;\n");
			writer.write("dojo.provide(\"" + localeModule + "\");\n");
			writer.write(localeModule + "=");
			
			// Do not bomb when localization contain undefined and other garbage
			try {
				StringWriter buf = new StringWriter();
				JSONSerializer.serialize(buf, map);
				writer.append(buf.toString());
			} catch (JSONSerializeException e) {
				// Return an empty bundle instead
				writer.write("{}");
				System.out.println(e);
			}
			writer.write(";\n");
			return content = writer.toString();
		}
		
		// CHANGED: resource override
		boolean internalRefresh() {
			boolean result = false;
			ResourceOverrideService overrideService = ResourceOverride.getService();
			for (int i = 0; i < messageFiles.length; i++) {
				URL url = webBundle.getEntry(messageFiles[i], ".js");
				long time = Math.max(0, Util.getLastModified(url));
				url = overrideService.getMessageBundleUrl(messageFiles[i] + ".js");
				if (url == null)
					url = overrideService.getDojoModuleUrl(messageFiles[i]);
				if (url != null)
					time = Math.max(time, Util.getLastModified(url));
				if (timestamps[i] != time) {
					content = null;
					result = true;
					timestamps[i] = time;
				}
			}
			return result;
		}
		
		void getState(State state) {
			for (int i = 0; i < timestamps.length; i++)
				state.merge(timestamps[i]);
		}
		
		void write(Appendable output, RenderContext context) throws IOException {
			output.append(getContent());
		}
	}

}
