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
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.IExtensionPoint;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.ServletService;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.servlets.NamespaceServlet;
import net.jazz.ajax.servlets.WebBundleServlet;

public abstract class WebBundle extends Resource {
	
	static final TraceSupport LOG = TraceSupport.create(WebBundle.class.getName());

	static class BootstrapResource extends Resource {
		final String text;

		private BootstrapResource(Type<?> type, String id, String bundleId) {
			super(type, id);
			text = String.format("if(typeof define!==\"undefined\"&&typeof define._packages!==\"undefined\")define._packages[\"%1$s\"]=true;\n", bundleId);
		}

		@Override boolean internalIsDynamic() {
			return false;
		}

		public void write(Appendable output, RenderContext context) throws IOException {
			output.append(text);
		}
	}

	public static final String BOOTSTRAP = ".$BOOTSTRAP$";
	static Map<String, WebBundle> ID_MAP = Collections.synchronizedMap(new HashMap());
	public static final Type<WebBundle> TYPE = Type.create("webbundle");
	
	final WebBundleDependency bootstrapDependency;
	final Resource bundleBootstrap;
	
	// CHANGED: made public
	public WebBundle(final String bundleId) {
		super(TYPE, bundleId);
		bundleBootstrap = new BootstrapResource(JavaScriptResource.TYPE, bundleId + BOOTSTRAP, bundleId);
		bootstrapDependency = new WebBundleDependency(bundleBootstrap);
	}
	
	public abstract <T extends Resource> Resource bundleResource(Type<T> type, String id);
	
	// ADDED
	public abstract <T extends Resource> Resource createMessageBundleResource(Type<T> type, String id);
	
	public abstract URL getEntry(String relPath);

	public abstract URL getEntry(String id, String extension);

	void internalContributeExtensionPoints(Map<IExtensionPoint, Object> extensionPoints, Locale locale) {}
	
	// CHANGED: return this
	public Resource register() {
		super.register();
		bundleBootstrap.register();
		// CHANGED
		ServletService.registerServlet(
				"/web/" + getId(),
				new WebBundleServlet(this), null, true);
		int index = getId().indexOf('.');
		if (index >= 0) {
			ServletService.registerServlet(
					"/web/" + getId().replace('.', '/'),
					new WebBundleServlet(this));
			// ADDED: If the bundle has multiple segments, register a root servlet that will forward requests
			// to the closest matching bundle (to handle Dojo default namespace behavior).
			String firstSegment = getId().substring(0, index);
			ServletService.registerServlet("/web/" + firstSegment,
					new NamespaceServlet(firstSegment), null, false);
		}
		return this;
	}
	
	public void unregister() {
		ServletService.unregisterServlet("/web/" + getId());
		bundleBootstrap.unregister();
		super.unregister();
	}
	
	public static WebBundle bundleMatching(String id) {
		int index = id.indexOf('/');
		WebBundle bundle;
		if (index > 0) {
			id = id.substring(0, index);
			bundle = Resource.resolve(TYPE, id);
			if (bundle == null) {
				bundle = forBundleId(id);
				if (bundle != null)
					LOG.warn("The web bundle \"" + bundle.getId()
							+ "\" was referenced incorrectly using \"" + id + "\"");
			}
			return bundle;
		}
		index = id.length() - 1;
		// CHANGED: do/while instead of while; must accept bundle ids without dots
		do {
			index = id.lastIndexOf('.', index);
			if (index != -1) {
				bundle = Resource.resolve(TYPE, id.substring(0, index--));
				if (bundle != null)
					return bundle;
			}
		} while (index > -1);
		return null;
	}
	
	public static WebBundle forAlias(String alias) {
		return Resource.resolve(TYPE, alias);
	}

	// ADDED: Feature change, returns the first web bundle registered for a
	// given OSGI bundle
	public static WebBundle forBundleId(String bundleId) {
		return ID_MAP.get(bundleId);
	}
	
	/**
	 * Returns the absolute path to a service providing a web bundle resource.
	 * For example, to create an image that points at Dojo's included blank.gif
	 * graphic, you would set the image's src attribute using:
	 * <blockquote>
	 * {@code resourceUrl("dojo/resources/gif");}</blockquote>
	 * <p>If your application were deployed at "foo", the result will start with "/foo/".
	 * @param path the path to a static file from a web bundle
	 * @return the absolute path on the server
	 */
	public static String resourceUrl(String path) {
		WebBundle bundle = bundleMatching(path);
		Assert.isNotNull(bundle);
		URL url = bundle.getEntry(path.substring(bundle.getId().length()));
		Assert.isNotNull(bundle);
		try {
			return AjaxFramework.getContextPath() + AjaxFramework.WEB_ROOT + path + "?etag=" + hashString(url.openConnection().getLastModified());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

}
