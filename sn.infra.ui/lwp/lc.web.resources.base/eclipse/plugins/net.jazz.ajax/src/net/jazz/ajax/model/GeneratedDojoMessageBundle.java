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
 * Rights Reserved.
 * 
 * Note to U.S. Government Users Restricted Rights: Use, duplication or
*/
package net.jazz.ajax.model;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.internal.util.Util;

import org.apache.commons.io.IOUtils;
import org.osgi.framework.Bundle;

import com.ibm.sistdase.json.JSONSerializer;

public class GeneratedDojoMessageBundle extends
		AbstractGeneratedDojoMessageBundle {

	static final TraceSupport LOGGER = TraceSupport.create(GeneratedDojoMessageBundle.class.getName());

	final String bundleName;
	final String baseBundleName;
	final String fileBundleName;

	public GeneratedDojoMessageBundle(String webBundle, String id,
			String bundleName, Bundle osgiBundle, Level multiLevel) {
		super(webBundle, id, osgiBundle, multiLevel);
		this.bundleName = bundleName;

		this.baseBundleName = bundleName.substring(0,
				bundleName.lastIndexOf('.'));
		this.fileBundleName = bundleName.substring(baseBundleName.length());
	}

	protected AbstractLocalizedContent createContent(Locale locale) {
		return new LocalizedContent(locale);
	}

	public boolean hasContentForLocale(Locale locale) {
		String localeString = locale.toString(); 
		if (localeString.length() > 0)
			localeString = '_' + localeString;
		String messageBundle = baseBundleName + localeString + fileBundleName;
		URL url = osgiBundle.getResource(messageBundle);
		// This handles the case where we're trying to load a bundle that's not available OOTB e.g. extra language files
		if (url == null) {
			// Add the file extension when not provided
			if (!messageBundle.endsWith(".properties"))
				messageBundle = messageBundle + ".properties";
			url = ResourceOverride.getService().getMessageBundleUrl(messageBundle);
		}
		return (url != null);
	}

	void addProperties(Properties p, Map<String, Object> map) {
		switch (level) {
		case ALL:
			for (Entry<Object, Object> entry : p.entrySet()) {
				String key = (String) entry.getKey();
				if (!include(key) || exclude(key))
					continue;
				String[] segments = key.split("\\.");
				Map<String, Object> subMap = map;
				for (int i = 0; i < (segments.length - 1); i++) {
					Object obj = subMap.get(segments[i]);
					Map<String, Object> existing = null;
					if (obj instanceof String) {
						if (LOGGER.isTracing())
							LOGGER.warn("Message bundle '" + bundleName
									+ "' defines a key '" + key
									+ "' that has child keys.");
					}
					else
						existing = (Map<String, Object>) obj;
					if (existing == null) {
						existing = new HashMap<String, Object>();
						subMap.put(segments[i], existing);
					}
					subMap = existing;
				}
				subMap.put(segments[segments.length - 1], entry.getValue());
			}
			break;
		case ONE:
			for (Entry<Object, Object> entry : p.entrySet()) {
				String key = (String) entry.getKey();
				if (!include(key) || exclude(key))
					continue;
				
				int position = key.indexOf('.');
				// Use the first segment as the prefix
				if (position != -1) {
					String prefix = key.substring(0, position);
					Object obj = map.get(prefix);
					
					Map<String, Object> existing = null;
					if (obj instanceof String) {
						if (LOGGER.isTracing())
							LOGGER.warn("Message bundle '" + bundleName
									+ "' defines a key '" + key
									+ "' that has child keys.");
					}
					else
						existing = (Map<String, Object>) obj;
					
					if (existing == null) {
						existing = new HashMap<String, Object>();
						map.put(prefix, existing);
					}
					
					existing.put(key.substring(position+1), entry.getValue());
				}
				// Key has no prefix, put it at the root
				else {
					Object obj = map.get(key);

					if (obj != null && !(obj instanceof String))  {
						if (LOGGER.isTracing())
							LOGGER.warn("Message bundle '" + bundleName
									+ "' defines a key '" + key
									+ "' that has child keys.");
					}
					map.put(key, entry.getValue());
				}
			}			
			break;
		default:
			for (Entry<Object, Object> entry : p.entrySet()) {
				String key = (String) entry.getKey();
				if (!include(key) || exclude(key))
					continue;
				map.put(key, entry.getValue());
			}
				
		}
	}

	protected boolean include(String key) {
		return true;
	}

	protected boolean exclude(String key) {
		return false;
	}

	public class LocalizedContent extends AbstractLocalizedContent {
		final String[] messageFiles;
		final long[] timestamps;

		protected LocalizedContent(Locale locale) {
			super(locale);

			List<String> messages = new ArrayList<String>(3);
			messages.add(bundleName);
			String base = bundleName.substring(0, bundleName.lastIndexOf('.'));
			String file = bundleName.substring(base.length());
			if (locale != null) {
				String language = locale.getLanguage();
				if (language.length() > 0) {
					if ("nb".equals(language))
						language = "no"; // Reverse logic in RenderContext, we always want to load 'no' property files for Norwegian
					messages.add(base + '_' + language + file);
					if (locale.getCountry().length() > 0) {
						messages.add(base + '_' + language + '_'
								+ locale.getCountry().toUpperCase() + file);
					}
				}
			}
			this.messageFiles = messages.toArray(new String[messages.size()]);
			timestamps = new long[messages.size()];
			internalRefresh();
		}

		protected boolean internalRefresh() {
			boolean refresh = false;
			ResourceOverrideService overrideService = ResourceOverride.getService();
			for (int i = 0; i < messageFiles.length; i++) {
				URL url = osgiBundle.getResource(messageFiles[i]);
				long time = Math.max(0, Util.getLastModified(url));
				
				url = overrideService.getMessageBundleUrl(messageFiles[i]);
				time = Math.max(time, Util.getLastModified(url));
					
				if (timestamps[i] != time) {
					content = null;
					timestamps[i] = time;
					refresh = true;
				}
				timestamps[i] = time;
			}
			return refresh;
		}

		protected void getState(State state) {
			for (int i = 0; i < timestamps.length; i++)
				state.merge(timestamps[i]);
		}

		protected Map<String, Object> loadResource(URL url, Map<String, Object> outputMap) {
			Map<String, Object> returnMap = outputMap;

			InputStream is = null;
			try {
				is = url.openStream();

				// For Level.NONE and outputMap originally null, call
				// .load() repeatedly on a single Properties object
				if (Level.NONE.equals(level)
						&& (returnMap == null || ((Object) returnMap) instanceof Properties)) {
					Properties p = (Properties) ((Object) returnMap);
					if (p == null) {
						p = new Properties();
						returnMap = ((Map<String, Object>) (Map) p);
					}
					p.load(is);
				} else {
					if (returnMap == null)
						returnMap = new HashMap<String, Object>();
					Properties p = new Properties();
					p.load(is);
					addProperties(p, returnMap);
				}

			} catch (FileNotFoundException e) {
				LOGGER.warn("File for bundle '" + bundleName
						+ "' was deleted '" + url
						+ "' during read.");
			} catch (IOException e) {
				LOGGER.warn(e, "Contents of bundle '" + bundleName
						+ "' could not be read from '" + url
						+ "'");
			} finally {
				IOUtils.closeQuietly(is);
			}	
			return returnMap;
		}
		
		public Map<String, Object> putAll(Map<String, Object> outputMap) {
		    
			Map<String, Object> returnMap = outputMap;
		  
			for (String message : messageFiles) {
				URL url = osgiBundle.getResource(message);
				if (url == null)
					continue;
				returnMap = loadResource(url, returnMap);
			}

			ResourceOverrideService overrideService = ResourceOverride.getService();
			for (String message : messageFiles) {
				URL url = overrideService.getMessageBundleUrl(message);
				if (url == null)
					continue;
				returnMap = loadResource(url, returnMap);
			}	            	

			return returnMap;
		}

		protected void serialize(Writer writer) throws IOException {
			Map<String, Object> map = putAll(null);
			JSONSerializer.serialize(writer, map);
		}
	}
}
