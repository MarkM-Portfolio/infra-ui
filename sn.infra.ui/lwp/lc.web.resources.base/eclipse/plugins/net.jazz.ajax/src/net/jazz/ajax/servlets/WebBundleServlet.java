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

package net.jazz.ajax.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Writer;
import java.net.URL;
import java.net.URLConnection;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.util.CacheCondition;
import net.jazz.ajax.internal.util.CacheWindow;
import net.jazz.ajax.internal.util.CacheableResult;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.model.DojoMessageBundle;
import net.jazz.ajax.model.DojoTemplate;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.State;
import net.jazz.ajax.model.WebBundle;

public class WebBundleServlet extends LoggingHttpServlet {

	static final long serialVersionUID = 1L;
	// CHANGED: better name for logger
	static final TraceSupport LOGGER = TraceSupport.create(WebBundleServlet.class.getName());
	private static final String CLASS = WebBundleServlet.class.getName();
	private static final Logger log = Logger.getLogger(CLASS);
	
	final WebBundle webBundle;
	
	public WebBundleServlet(WebBundle webBundle) {
		this.webBundle = webBundle;
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String path = request.getPathInfo();
		URL url = null;
		if (path.endsWith(".js")) {
			String id = webBundle.getId() + path.substring(0, path.length() - 3).replace('/', '.');
			Resource r = Resource.resolve(JavaScriptResource.TYPE, id);
			if (r == null && "messageBundle".equals(request.getParameter("render")))
				r = Resource.resolve(DojoMessageBundle.TYPE, id);
			if (r != null) {
				doGetJavascript(r, request, response);
				return;
			}
			url = webBundle.getEntry(path.substring(0, path.length() - 3).replace('.', '/') + ".js");
		} // ADDED
		else if (path.endsWith(".css")) {
			url = webBundle.getEntry(path);
			URLConnection connection = null;
			URL overrideUrl = ResourceOverride.getService().getStyleSheetUrl(webBundle.getId() + path);
			if (overrideUrl != null) {
				try {
					connection = overrideUrl.openConnection();
					connection.getInputStream();
					url = overrideUrl;
				} catch (IOException e) {
					connection = null;
				}
			}
		} // ADDED
		else if (path.endsWith(".html")) {
			String id = webBundle.getId() + path;
			Resource r = null;
			if (r == null && "template".equals(request.getParameter("render")))
				r = Resource.resolve(DojoTemplate.TYPE, id);
			// Added: for supporting widget test harness
			else if ("test".equals(request.getParameter("render"))) {
				TestTemplate.doMakeHTML(r, request, response, getServletContext(), webBundle.getEntry(path), id);
				return;
			}
                        else if ("html-template".equals(request.getParameter("render"))) {
                                HTMLTemplate.doMakeHTML(r, request, response, getServletContext(), webBundle.getEntry(path), id);
                                return;
                        }
			if (r != null) {
				doGetJavascript(r, request, response);
				return;
			}
		}
		if (url == null)
			url = webBundle.getEntry(path);
		
		// ADDED: custom resources
		URLConnection connection = null;
		URL overrideUrl = ResourceOverride.getService().getSimpleResourceUrl('/' + webBundle.getId().replace('.', '/') + path);
		if (overrideUrl != null) {
			try {
				connection = overrideUrl.openConnection();
				connection.getInputStream();
				url = overrideUrl;
			} catch (IOException e) {
				connection = null;
			}
		}
		
		if (url == null)
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
		else
			doGetSimple(url, request, response);
	}
	
	void doGetJavascript(Resource r, HttpServletRequest request, HttpServletResponse response) throws IOException {
		RenderContext context = RenderContext.internal(request);
		//TODO this isn't thread-safe, but is only called in debug mode
		r.internalRefresh(context);
		int expires = 0;
		if (request.getParameter("etag") != null)
			expires = ResourceGraphOperation.ONE_MONTH;
		State state = r.getState(context);
		CacheWindow window = new CacheWindow(state.lastModified, expires, expires, state.getETag());
		if (CacheCondition.create(request).acceptsConditionally(window)) {
			new CacheableResult(window, null).applyTo(response);
			return;
		}
		new CacheableResult(window, "bogus").applyTo(response);
		response.setContentType("text/javascript");
		Writer output = ServletUtil.negotiateWriter(request, response);
		r.write(output, context);
		output.close();
	}
	
	void doGetSimple(URL url, HttpServletRequest request, HttpServletResponse response) throws IOException {
		URLConnection connection = url.openConnection();
		
		String mime = getServletContext().getMimeType(url.getPath());
		if (mime != null)
			response.setContentType(mime);
		int expires;
		if (request.getParameter("etag") != null)
			expires = ResourceGraphOperation.ONE_MONTH;
		else if (AjaxFramework.DEV_MODE)
			expires = 30; //1 minute in development
		else
			expires = 600; //10 minutes in production
		CacheWindow window = new CacheWindow(connection.getLastModified(), expires, expires);
		if (CacheCondition.create(request).acceptsConditionally(window)) {
			window.applyTo(response, HttpServletResponse.SC_NOT_MODIFIED);
			return;
		}
		window.applyTo(response);
		OutputStream output = ServletUtil.negotiateOutputStream(request, response);
		InputStream input = connection.getInputStream();
		try {
			byte[] buffer = new byte[8192];
			int len;
			while((len = input.read(buffer)) != -1)
				output.write(buffer, 0, len);
			output.close();
		} finally {
			input.close();
		}
	}

}
