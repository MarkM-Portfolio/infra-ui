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

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.io.IOUtils;

import org.eclipse.core.runtime.FileLocator;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.Util;

abstract class TextResource extends Resource {

	volatile long lastModified;
	// ADDED
	private final URL[] urls;
	// CHANGED: Only set once internalRefresh has been invoked at least once or by the single argument constructor
	volatile URL url;
	final boolean immutable;
	
	// CHANGED
	public TextResource(Type<?> type, URL url, String id) {
		this(type, new URL[] { url }, id);
	}
	
	// ADDED
	public TextResource(Type<?> type, URL[] urls, String id) {
		super(type, id);
		this.urls = urls;
		this.url = Util.getURL(urls);
		try {
			URL fileUrl = FileLocator.resolve(url); //OSGi
			immutable = !AjaxFramework.DEV_MODE
					|| (fileUrl != url && fileUrl.toString().startsWith("jar:"));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		internalRefresh(null);
	}
	
	@Override
	public void getState(RenderContext context, State state) {
		state.merge(lastModified);
	}
	
	boolean internalIsDynamic() {
		return !immutable;
	}
	
	// CHANGED: iterate over URLs
	@Override public boolean internalRefresh(RenderContext context) {
		if (immutable && lastModified != 0)
			return false;
		InputStream is = null;
		for (URL url : urls) {
			if (url == null)
				continue;
			try {
				URLConnection connection = url.openConnection();
				// sun.net.www.protocol.file.FileURLConnection opens the input
				// stream when getLastModified() is called, thus it is not
				// closed until a GC occurs
				is = connection.getInputStream();
				if (lastModified == connection.getLastModified())
					return false;
				lastModified = connection.getLastModified();
				synchronized (this) {
					for (int i = dependencies.size() - 1; i >= 0; i--)
						if (dependencies.get(i).isDerived())
							dependencies.remove(i);
					load(Util.stringBuilder(is));
				}
				this.url = url;
				return true;
			} catch (FileNotFoundException e) {
				continue;
			} catch (IOException e) {
				throw new ResourceUnavailableException(e);
			} finally {
				IOUtils.closeQuietly(is);
				is = null;
			}
		}
		throw new ResourceUnavailableException("Unable to access any resource associated with " + getId());
	}

	abstract void load(StringBuilder content);
}
