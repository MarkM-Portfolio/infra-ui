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

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionPoint;
import org.osgi.framework.Bundle;

import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.registry.Registry;
import net.jazz.ajax.internal.util.Util;

public class OSGiWebBundle extends WebBundle {

	static final Collection<String> EXCLUDES = Arrays.asList(new String[]{
			"net.jazz.ajax.webBundles",
			"net.jazz.ajax.cssBindingSets",
			"net.jazz.ajax.ajaxModules",
	});
	
	// ADDED
	protected static URL getDojoOverrideUrl(String id) {
		return ResourceOverride.getService().getDojoModuleUrl(id);
	}

	// ADDED
	protected static URL getStyleSheetOverrideUrl(String id) {
		return ResourceOverride.getService().getStyleSheetUrl(id);
	}

	// CHANGED: Set to protected
	protected final String alias;
	protected final String base;
	protected final Bundle bundle;
	
	// CHANGED: Set to public
	public OSGiWebBundle(Bundle bundle, String alias, String base) {
		super(alias);
		if (base == null)
			base = "/resources";
		this.alias = alias;
		this.base = base;
		this.bundle = bundle;
	}
	
	// CHANGED
	public <T extends Resource> T bundleResource(Type<T> type, String id) {
		synchronized (WRITELOCK) {
			Resource resource = Resource.resolve(type, id);
			if (resource != null)
				return (T) resource;
			Assert.isTrue(id.startsWith(getAlias())
					|| id.startsWith(bundle.getSymbolicName()));
	
			if (type == JavaScriptResource.TYPE)
				return (T) createJavaScriptModule(id);
			// CHANGED: do not stub message bundles
//			if (type == DojoMessageBundle.TYPE)
//				return (T) createMessageBundle(id);
			if (type == StyleSheet.TYPE)
				return (T) createStyleSheet(id);
			return null;
		}
	}
	
	// ADDED:
	public <T extends Resource> T createMessageBundleResource(Type<T> type, String id) {
		if (type == DojoMessageBundle.TYPE)
			return (T) createMessageBundle(id);
		return null;
	}
	
	// CHANGED: Set to protected; allow multiple URLs per resource
	protected Resource createJavaScriptModule(String id) {
		URL[] urls = Util.getURLs(getDojoOverrideUrl(id), getEntry(id, ".js"));
		if (urls == null)
			return null;
		Resource resource;
		if (JavaScriptModule.defineMatcher(Util.stringBuilder(urls)) != null)
			resource = new JavaScriptModule(urls, id);
		else
			resource = new DojoModule(urls, id);
		resource.register();
		resource.addDependency(bootstrapDependency);
		return resource;
	}
	
	// CHANGED: Set to protected
	protected DojoMessageBundle createMessageBundle(String id) {
		DojoMessageBundle result = new DojoMessageBundle(this, id);
		result.register();
		return result;
	}

	// CHANGED: Set to protected; allow multiple URLs per resource
	protected Resource createStyleSheet(String id) {
		URL[] urls = Util.getURLs(getStyleSheetOverrideUrl(id), getEntry(id, ".css"));
		if (urls == null)
			return null;
		Resource resource = new StyleSheet(id, urls);
		resource.register();
		return resource;
	}
	
	public String getAlias() {
		return alias;
	}
	
	// CHANGED
	public URL getEntry(String relPath) {
		return getResource(relPath);
	}
	
	// ADDED:
	protected URL getResource(String relPath) {
		URL result = bundle.getResource(base + relPath);
		try {
			if (result != null)
				result = new URL("portablebundleresource", bundle.getSymbolicName(), -1, base + relPath, new BundleResourceStreamHandler());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	// CHANGED:
	public URL getEntry(String id, String extension) {
		String path = extractPath(id, extension);
		return getResource(path + extension);
	}
	
	// ADDED:
	protected String extractPath(String id, String extension) {
		String path;
		if (id.startsWith(getAlias()))
			path = id.substring(getAlias().length());
		else if (id.startsWith(bundle.getSymbolicName()))
			path = id.substring(bundle.getSymbolicName().length());
		else
			throw new IllegalArgumentException("Invalid resource ID");
		//Remove the extension if it is part of the ID already
		if (path.endsWith(extension))
			path = path.substring(0, path.length() - extension.length());
		//If the ID isn't a path, convert PERIODs to SLASHes
		if (path.startsWith("."))
			path = path.replace('.', '/');
		return path;
	}
	
	@Override
	void internalContributeExtensionPoints(Map<IExtensionPoint, Object> extensionPoints, Locale locale) {
		for (IExtensionPoint point : Registry.instance().getExtensionPoints(bundle.getSymbolicName())) {
			if (EXCLUDES.contains(point.getUniqueIdentifier()))
				continue;
			if (extensionPoints.containsKey(point))
				continue; //Kept from legacy code. Does this happen? (2 web bundles in one plug-in)
			Map entry = new HashMap();
			extensionPoints.put(point, entry);
			entry.put("namespaceIdentifier", point.getNamespaceIdentifier());
			entry.put("uniqueIdentifier", point.getUniqueIdentifier());
			List extensions = new ArrayList();
			entry.put("extensions", extensions);
			for (IExtension extension : point.getExtensions())
				extensions.add(contributeExtension(extension, locale));
		}
	}
	
	// CHANGED: return this
	public Resource register() {
		String bundleId = bundle.getSymbolicName();
		//Assert.isTrue(!ID_MAP.containsKey(bundleId), "A WebBundle with the ID " + bundleId + " already exists.");
		super.register();
		// ADDED: allow multiple web bundles per plugin, only the first bundle
		// is registered to ID_MAP
		if (!ID_MAP.containsKey(bundleId))
			ID_MAP.put(bundleId, this);
		BundleScanner.queue(this);
		return this;
	}
	
	// CHANGED
	public void unregister() {
		String bundleId = bundle.getSymbolicName();
		// Assert.isTrue(ID_MAP.get(bundleId) == this, "This WebBundle was not previously registered with ID " + bundleId);
		super.unregister();
		// ADDED: Only unregistering the first registered bundle will remove the
		// item from ID_MAP
		if (ID_MAP.get(bundleId) == this) {
			ID_MAP.remove(bundleId);
		}
	}
	
	private static Map contributeAttributes(IConfigurationElement element, Locale locale) {
		if (element.getAttributeNames().length == 0)
			return Collections.EMPTY_MAP;
		Map result = new HashMap();
		for (String key : element.getAttributeNames())
			result.put(key, Registry.translate(element, element.getAttribute(key), locale));
		return result;
	}
	
	private static List contributeElements(IConfigurationElement[] configurationElements, Locale locale) {
		if (configurationElements.length == 0)
			return Collections.EMPTY_LIST;
		List result = new ArrayList();
		for (IConfigurationElement element : configurationElements) {
			Map map = new HashMap();
			map.put("name", element.getName());
			map.put("value", Registry.translate(element, element.getValue(), locale));
			map.put("children", contributeElements(element.getChildren(), locale));
			map.put("attributes", contributeAttributes(element, locale));
			result.add(map);
		}
		return result;
	}
	
	private static Map contributeExtension(IExtension extension, Locale locale) {
		Map result = new HashMap();
		result.put("uniqueIdentifier", extension.getUniqueIdentifier());
		result.put("namespaceIdentifier", extension.getNamespaceIdentifier());
		result.put("configurationElements", contributeElements(extension.getConfigurationElements(), locale));
		return result;
	}

}
