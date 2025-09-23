/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.internal;

import java.net.URL;

import net.jazz.ajax.internal.util.OSGiServices;
import net.jazz.ajax.internal.util.OSGiServices.Runner;
import net.jazz.ajax.model.ResourceOverrideService;

public class ResourceOverride {

	private static ResourceOverrideService customImplementation;
	private static final ResourceOverrideService noop = new ResourceOverrideService() {
		public URL getSimpleResourceUrl(String path) {
			return null;
		}

		public URL getStyleSheetUrl(String path) {
			return null;
		}

		public URL getMessageBundleUrl(String bundleName) {
			return null;
		}

		public URL getDojoModuleUrl(String id) {
			return null;
		}
	};

	static {
		OSGiServices.runWithService(ResourceOverrideService.class, new Runner<ResourceOverrideService>() {
			public void run(ResourceOverrideService service) {
				synchronized (ResourceOverride.class) {
					customImplementation = service;
				}
			}
			// ADDED:
			public void shutdown() {
				synchronized (ResourceOverride.class) {
					customImplementation = null;
				}
			}
		});
	}

	/**
	 * @return an implementation of ResourceOverrideService
	 */
	public static ResourceOverrideService getService() {
		synchronized (ResourceOverride.class) {
			if (customImplementation != null)
				return customImplementation;
			return noop;
		}
	}
}
