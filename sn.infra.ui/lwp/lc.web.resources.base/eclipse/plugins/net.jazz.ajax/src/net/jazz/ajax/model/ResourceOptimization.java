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

package net.jazz.ajax.model;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import net.jazz.ajax.internal.AjaxFramework;

import org.eclipse.core.runtime.Assert;

// ADDED
public class ResourceOptimization {

	static final Map<Resource.Key, Dependency> suggestedLayers = new HashMap<Resource.Key, Dependency>();

	static final Map<Resource.Key, String> suggestedIds = new HashMap<Resource.Key, String>();

	public static List<Resource> suggestLayers(List<Resource> resources) {
		boolean hasLayers = false;
		List<Resource> layers = Collections.emptyList();
		for (Resource resource : resources) {
			if (!hasLayers) {
				Dependency dependency = suggestedLayers.get(resource.key());
				while (dependency != null) {
					Resource res = dependency.resolve();
					if (res == null)
						break;
					resources.remove(res);
					if (layers.isEmpty())
						layers = new LinkedList<Resource>();
					layers.add(0, res);
					dependency = suggestedLayers.get(res.key());
					hasLayers = true;
				}
			}
		}
		return layers;
	}

	public static void addSuggestedLayers(Map<String, String> layers) {
		for (String key : layers.keySet()) {
			Dependency layer = new WebBundleDependency(JavaScriptResource.TYPE,
					layers.get(key));
			suggestedLayers.put(new Resource.Key(JavaScriptResource.TYPE, key),
					layer);
		}
	}

	public static void suggestIdentifiers(Map<Resource.Key, Integer> identifiers) {
		// FIXME: concurrency
		// synchronized (Resource.TINY)
		// {
		// if (Resource.nextId != 0)
		// throw new
		// IllegalStateException("Cannot suggest identifiers more than once");
		// for (Map.Entry<Resource.Key, Integer> entry : identifiers.entrySet())
		// {
		// String tinyID = Resource.hashString(entry.getValue());
		// if (!Resource.TINY.containsKey(tinyID))
		// Assert.isTrue(suggestedIds.put(entry.getKey(), tinyID) == null);
		// if (entry.getValue() >= Resource.nextId)
		// Resource.nextId = entry.getValue() + 1;
		// }
		// }
	}

	public static Map<String, Integer> getIdentifiers() {
		Map<String, Integer> identifiers = new HashMap<String, Integer>();
		// FIXME: concurrency
		// synchronized (Resource.TINY)
		// {
		// for (Map.Entry<String, Resource> entry : Resource.TINY.entrySet())
		// identifiers.put(entry.getValue().key().type.name + ":" +
		// entry.getValue().key().id, fromHashString(entry.getKey()));
		// }
		return identifiers;
	}

	static final int[] REVERSE_CHARS;
	static {
		int size = 0;
		for (int i = 0; i < Resource.CHARS.length; i++)
			size = Math.max(Resource.CHARS[i], size);

		REVERSE_CHARS = new int[size + 1];
		for (int i = 0; i < Resource.CHARS.length; i++)
			REVERSE_CHARS[Resource.CHARS[i]] = i;
	}

	static int fromHashString(String value) {
		Assert.isNotNull(value);
		int hash = 0;
		int factor = 1;
		for (int i = value.length() - 1; i >= 0; i--) {
			hash += REVERSE_CHARS[value.charAt(i)] * factor;
			factor = factor * Resource.RADIX;
		}
		return hash;
	}

	// ADDED
	public static void resetLayers() {
		if (!AjaxFramework.DEV_MODE) return;
		suggestedLayers.clear();
	}

}
