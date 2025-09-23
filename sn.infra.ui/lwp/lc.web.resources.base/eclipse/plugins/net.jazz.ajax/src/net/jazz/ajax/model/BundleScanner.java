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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Stack;

import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.core.runtime.jobs.Job;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.TraceSupport;

import org.apache.commons.io.IOUtils;

class BundleScanner extends Job {
	static final int DELAY = 3000;
	// ADDED: better name for logger
	static final TraceSupport LOGGER = TraceSupport.create(BundleScanner.class.getName());

	static volatile boolean enabled;
	static volatile BundleScanner instance;

	final Stack<OSGiWebBundle> stack = new Stack();
	final Set<Resource> scanned = new HashSet();
	final List<String> problems = new ArrayList();
	volatile boolean canceled;
	
	BundleScanner() {
		super("WebBundle Scanner");
		setPriority(BUILD);
	}
	
	protected void canceling() {
		canceled = true;
	}
	
	protected IStatus run(IProgressMonitor monitor) {
		if (!enabled)
			return Status.OK_STATUS;
		OSGiWebBundle webBundle;
		Object token = LOGGER.startBenchmark("Starting scan of " + stack.size() + " Web Bundles");
		while (!stack.isEmpty() && (webBundle = stack.pop()) != null) {
			try {
				scanBundle(webBundle);
			} catch (Exception e) {
				LOGGER.warn(e, "An exception was encountered while scanning webBundle: " + webBundle);
			}
		}
		LOGGER.endBenchmark(token);
		for (String message : problems)
			LOGGER.warn(message);
		return Status.OK_STATUS;
	}

	void scan(Resource resource, Stack<Resource> seen) {
		seen.push(resource);
		for (Dependency dependency : resource.getDependencies()) {
			//ADDED: inverted dependencies skip scanner
			if (dependency.isInverted())
				continue;
			Resource resolved = dependency.resolve();
			if (resolved == null)
				problems.add(resource + " has an unresolved dependency on " + dependency);
			else if (scanned.contains(resolved) || dependency.isInverted())
				continue;
			else if (seen.contains(resolved)) {
				StringBuilder message = new StringBuilder(resolved.toString());
				int i = seen.size() - 1;
				Resource r;
				do {
					r = seen.get(i--);
					message.insert(0, " --> ");
					message.insert(0, r.toString());
				} while (r != resolved);
				message.insert(0, "Cyclic Dependency: ");
				problems.add(message.toString());
			} else
				scan(resolved, seen);
		}
		scanned.add(resource);
		seen.pop();
	}

	// CHANGED: Use Commons IOUtils
	void scanBundle(final OSGiWebBundle webBundle) {
		class Filter {
			List<String> filters = Collections.EMPTY_LIST;
			Filter() {
				URL url = webBundle.bundle.getEntry("META-INF/jsignore.lst");
				if (url == null)
					return;
				filters = new ArrayList();
				BufferedReader r = null;
				try {
					r = new BufferedReader(new InputStreamReader(url.openStream()));
					String line;
					while((line = r.readLine()) != null)
						filters.add(line);
					r.close();
				} catch (IOException e) {
					LOGGER.error(e);
				} finally { // ADDED: use Commons IOUtils 
					IOUtils.closeQuietly(r);
				}
			}
			boolean ignore(String path) {
				for (String filter : filters)
					if (path.matches(filter))
						return true;
				return false;
			}
			boolean ignoreAll() {
				return filters.contains(".*");
			}
		}
		Filter filter = new Filter();
		if (filter.ignoreAll())
			return;
		Enumeration<URL> entries = webBundle.bundle.findEntries(webBundle.base, "*.js", true);
		if (entries == null)
			return;
		while (entries.hasMoreElements()) {
			if (canceled)
				return;
			URL url = entries.nextElement();
			try {
				String path = url.getPath();
				if (path.contains("/nls/"))
					continue;
				if (filter.ignore(path))
					continue;
				path = path.substring(webBundle.base.length());
				path = path.substring(0, path.length() - 3);
				String id = webBundle.alias + path.replace('/', '.');
				JavaScriptResource resource = new WebBundleDependency(JavaScriptResource.TYPE, id).resolve();
				if (resource == null || scanned.contains(resource))
					continue;
				scan(resource, new Stack());
			} catch (Exception e) {
				LOGGER.warn(e, "Unable to scan file at: " + url + " due to an Exception");
			}
		}
	}

	static void enable() {
		enabled = true;
		if (instance != null)
			scheduleJob();
	}

	static void queue(OSGiWebBundle webBundle) {
		if (!AjaxFramework.DEV_MODE)
			return;
		if (instance == null)
			instance = new BundleScanner();
		instance.stack.push(webBundle);
		scheduleJob();
	}

	static void scheduleJob() {
		if (enabled)
			instance.schedule(DELAY);
	}
	


}