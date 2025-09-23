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

package net.jazz.ajax.internal;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;

import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.Platform;
import org.eclipse.osgi.service.localization.BundleLocalization;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;

import com.ibm.team.jfs.app.distributed.IDistributedDataService;

import net.jazz.ajax.internal.util.AjaxFrameworkListener;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.ExtensionRegistryResource;
import net.jazz.ajax.model.RegistryProcessor;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Key;
import net.jazz.ajax.model.WebBundleDependency;
import net.jazz.ajax.servlets.CountDependenciesServlet;
import net.jazz.ajax.servlets.CrossDomainLoaderServlet;
import net.jazz.ajax.servlets.CrossDomainPartialLoaderServlet;
import net.jazz.ajax.servlets.OptimizationServlet;
import net.jazz.ajax.servlets.DebugServlet;
import net.jazz.ajax.servlets.JavascriptServlet;
import net.jazz.ajax.servlets.LoaderServlet;
import net.jazz.ajax.servlets.SpriteServlet;
import net.jazz.ajax.servlets.StyleSheetServlet;

public class AjaxFramework {
	public static final String WEB_ROOT = "/web/";
	public static final String SPRITE_ROOT = "/sprite/";
	public static final String STYLE_ROOT = WEB_ROOT + "_style";
	public static final String JS_ROOT = WEB_ROOT + "_js";
	public static final String DEBUG_ROOT = WEB_ROOT + "_debug";
	public static final boolean DEV_MODE;
	static volatile String contextPath;
	// ADDED: listeners
	static List<AjaxFrameworkListener> listeners = new ArrayList<AjaxFrameworkListener>();
	
	// ADDED: better name for logger
	static final TraceSupport LOG = TraceSupport.create(AjaxFramework.class.getName());
	
	static volatile BundleLocalization bundleLocalization;
	static volatile HttpService httpService;
	static volatile IDistributedDataService dataService;
	static volatile boolean hasBeenActivated;
	
	static {
		if ("true".equalsIgnoreCase(Platform.getDebugOption("net.jazz.ajax/ForceRuntimeMode"))) {
			if(LOG.isTracing())
				LOG.trace("Runtime Mode Forced; DEV_MODE will not be enabled through any other paths.");
			DEV_MODE = false;
		} else if (Platform.getBundle("com.ibm.team.server.embedded.jetty") != null) {
			if (LOG.isTracing())
				LOG.trace("Jetty server detected; DEV_MODE will be enabled.");
			DEV_MODE = true;
		} else if ("true".equalsIgnoreCase(System.getProperty("net.jazz.ajax.internal.AjaxFramework.DEV_MODE"))) {
			if (LOG.isTracing())
				LOG.trace("System property \"net.jazz.ajax.internal.AjaxFramework.DEV_MODE\" set to true; DEV_MODE enabled.");
			DEV_MODE = true;
		} else
			DEV_MODE = false;
	}
	
	public void activate() {
		LOG.trace("activate()");
		if (hasBeenActivated) {
			LOG.warn("AjaxFramework has been activated previously.  This is an ERROR if it occurs at a time other than server shutdown.");
			return;
		}
		hasBeenActivated = true;
		Object token = LOG.startBenchmark("Initializing Ajax Framework");
		try {
			httpService.registerServlet(JS_ROOT, new JavascriptServlet(), null, null);
			httpService.registerServlet(DEBUG_ROOT, new DebugServlet(), null, null);
			httpService.registerServlet(AjaxFramework.WEB_ROOT + "_loader", new LoaderServlet(), null, null);
			httpService.registerServlet(STYLE_ROOT, new StyleSheetServlet(), null, null);
			httpService.registerServlet("/sprite", new SpriteServlet(), null, null);
			httpService.registerServlet(AjaxFramework.WEB_ROOT + "_xdloader", new CrossDomainLoaderServlet(), null, null);
			httpService.registerServlet(AjaxFramework.WEB_ROOT + "_xdloader2", new CrossDomainPartialLoaderServlet(), null, null);
			// ADDED: these servlets are only available in dev mode
			if (DEV_MODE) {
				// ADDED: id optimization
				httpService.registerServlet(AjaxFramework.WEB_ROOT + "_ids", new OptimizationServlet(), null, null);
				// ADDED: count dependencies
				httpService.registerServlet(AjaxFramework.WEB_ROOT + "_dep", new CountDependenciesServlet(), null, null);
			}
		} catch (ServletException e) {
			LOG.error(e, "Unable to register required servlets");
		} catch (NamespaceException e) {
			LOG.error(e, "Unable to register required servlets");
		}
		Resource registry = ExtensionRegistryResource.internalInstance();
		registry.register();
		//Create an explicit binding between the RegistryFactory and the serialized JSON
		Resource.createBinding(
				new Key(DojoModule.TYPE, "jazz.core.RegistryFactory"),
				new WebBundleDependency(registry));
		RegistryProcessor.start();
		LOG.endBenchmark(token, 200);
		notifyFrameworkActivated();
	}
	
	// ADDED
	private void notifyFrameworkActivated() {
		for (AjaxFrameworkListener l : listeners)
			l.frameworkActivated(this);
	}

	public void deactivate() {
		LOG.trace("deactivate");
	}
	
	// ADDED:
	public static void addFrameworkListener(AjaxFrameworkListener l) {
		if (listeners.contains(l))
			throw new IllegalArgumentException("Framework listener already added: " + l);
		listeners.add(l);
	}

	public void setBundleLocalization(BundleLocalization service) {
		LOG.trace("setBundleLocalization");
		if (hasBeenActivated)
			LOG.error("This method should not be called after the AjaxFramework service component has been activated");
		bundleLocalization = service;
	}
	
	public static void setContextPath(String path) {
		if (path.endsWith("null")) //Workaround to eclipse bugzilla 390954
			path = path.substring(0, path.length() - 4);
		contextPath = path;
	}

	public void setDistributedDataService(IDistributedDataService service) {
		LOG.trace("setDistributedDataService");
		if (hasBeenActivated)
			LOG.error("This method should not be called after the AjaxFramework service component has been activated");
		dataService = service;
	}
	
	public void setHttpService(HttpService service) {
		LOG.trace("setHttpService");
		if (hasBeenActivated)
			LOG.error("This method should not be called after the AjaxFramework service component has been activated");
		httpService = service;
	}

	public void unsetDistributedDataService(IDistributedDataService service) {
		LOG.trace("unsetDistributedDataService");
		dataService = null;
	}

	public void unsetBundleLocalization(BundleLocalization service) {
		LOG.trace("unsetBundleLocalization");
		bundleLocalization = null;
	}
	
	public void unsetHttpService(HttpService service) {
		LOG.trace("unsetHttpService");
		httpService = null;
	}
	
	public static Bundle bundle() {
		return Activator.instance().getBundle();
	}
	
	public static BundleContext bundleContext() {
		return bundle().getBundleContext();
	}
	
	public static BundleLocalization bundleLocalization() {
		return bundleLocalization;
	}
	
	public static String getContextPath() {
		Assert.isNotNull(contextPath);
		return contextPath;
	}
	
	public static IDistributedDataService getDistributedDataService() {
		if (dataService == null)
			throw new IllegalStateException("The required OSGi service com.ibm.team.jfs.app.distributed.IDistributedDataService is not available");
		return dataService; 
	}
	
	public static HttpService getHttpService() {
		return httpService;
	}

	public static void log(Exception e) {
		LOG.error(e);
	}
	
	// ADDED: log messages as well as exception
	public static void log(String message) {
		LOG.error(message);
	}

	// ADDED: log messages as well as exception
	public static void log(String message, Exception e) {
		LOG.error(e, message);
	}
}
