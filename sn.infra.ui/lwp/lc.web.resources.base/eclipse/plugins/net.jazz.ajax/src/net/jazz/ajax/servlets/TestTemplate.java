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

package net.jazz.ajax.servlets;

import java.awt.ComponentOrientation;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Writer;
import java.net.URL;
import java.net.URLConnection;
import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.internal.util.Util;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceUnavailableException;

import org.apache.commons.io.IOUtils;

public class TestTemplate {

	private static ResourceBundle templateStrings = ResourceBundle
			.getBundle("net.jazz.ajax.servlets.templates");

	// Added: for supporting widget test harness
	public static void doMakeHTML(Resource r, HttpServletRequest request,
			HttpServletResponse response, ServletContext servletContext,
			URL resource, String id) throws IOException {
		String contextpath = request.getContextPath();

		String lang = request.getParameter("lang");
		if (lang == null)
			lang = "en";
		else if (lang.equals("no") || lang.equals("nb-no"))
			lang = "nb";
		else if (lang.equals("iw"))
			lang = "he";
		else if (lang.equals("in"))
			lang = "id";

		String debugStr = (String) request.getParameter("debug");
		if (debugStr == null)
			debugStr = "true";

		String jspath = contextpath + AjaxFramework.JS_ROOT;
		String stylepath = contextpath + AjaxFramework.STYLE_ROOT;
		String dojopath = contextpath + AjaxFramework.WEB_ROOT + "dojo/";
		String ajaxProxypath = contextpath + "/ajaxProxy";

		String excludes = "";

		String dir = "rtl";
		String cssDir = "RTL";
		boolean isRTL = true;
		if (ComponentOrientation.getOrientation(new Locale(lang))
				.isLeftToRight()) {
			dir = "ltr";
			cssDir = "";
			isRTL = false;
		}

		String templatePrefix = null;
		String oneuiVersion = request.getParameter("oneui");
		if ("21".equals(oneuiVersion) || "2".equals(oneuiVersion)) {
			oneuiVersion = "";
			templatePrefix = "oneui2.";
		} else {
			oneuiVersion = "30";
			templatePrefix = "oneui3.";
		}

		Writer out = ServletUtil.negotiateWriter(request, response);

		InputStream in = null;
		try {
			if (id != null) {
				id = Util.toPath(id);
				try {
					URL override = ResourceOverride.getService()
							.getSimpleResourceUrl(id);
					if (override != null) {
						URLConnection conn = override.openConnection();
						in = conn.getInputStream();
						resource = override;
					}
				} catch (FileNotFoundException e) {
					// Ignore
					IOUtils.closeQuietly(in);
				} catch (IOException e) {
					throw new ResourceUnavailableException(e);
				}
			}
			if (in == null)
				in = resource.openStream();

			String mime = servletContext.getMimeType(resource.getPath());
			if (mime != null)
				response.setContentType(mime);

			Pattern p = Pattern
					.compile("\\$\\{(head|endhead|end|pagecontrols|contextRoot|oneui|cssRTL|left|right|_blankGif|style:(.*?)|script:(.*?))\\}");

			BufferedReader reader = new BufferedReader(
					new InputStreamReader(in));
			String line;
			while ((line = reader.readLine()) != null) {
				// Transform line and output
				Matcher m = p.matcher(line);
				StringBuffer lineBuffer = new StringBuffer(line.length());
				while (m.find()) {
					// Calculate replacement token for match
					String token = m.group(1);
					String replacedToken = "";
					if (token.equals("_blankGif")) {
						replacedToken = blankGifURI(templatePrefix, request);
					} else if (token.equals("contextRoot")) {
						replacedToken = request.getContextPath();
					} else if (token.equals("cssRTL")) {
						replacedToken = cssDir;
					} else if (token.equals("left")) {
						replacedToken = isRTL ? "right" : "left";
					} else if (token.equals("right")) {
						replacedToken = isRTL ? "left" : "right";
					} else if (token.equals("oneui")) {
						replacedToken = oneuiVersion;
					} else if (token.equals("head")) {
						excludes += "dojo.main~";
						replacedToken = MessageFormat.format(
								templateStrings.getString(templatePrefix
										+ "head"),
								new Object[]{
										dir, // {0}
										lang, // {1}
										stylepath, // {2}
										cssDir, // {3}
										ajaxProxypath, // {4}
										dojopath, // {5}
										jspath, // {6}
										debugStr, // {7}
										contextpath, // {8}
										"dojo".equals(debugStr)
												|| "true".equals(debugStr), // {9}
										oneuiVersion, // {10}
										isRTL, // {11}
										blankGifURI(templatePrefix, request) // {12}
								});
					} else if (token.equals("pagecontrols")) {
						replacedToken = templateStrings
								.getString(templatePrefix + "pagecontrols");
					} else if (token.equals("endhead")) {
						replacedToken = templateStrings
								.getString(templatePrefix + "endhead");
					} else if (token.equals("end")) {
						replacedToken = templateStrings
								.getString(templatePrefix + "end");
					} else if (token.startsWith("script:")) {
						token = token.substring(7);
						String includesParam = "";
						String excludesParam = (excludes.length() > 0)
								? ("&exclude=" + excludes)
								: "";
						for (String script : token.split("~")) {
							if (script.length() == 0)
								continue;
							if (script.endsWith(".js"))
								script = script.substring(0,
										script.indexOf(".js"));
							includesParam += script + "~";
							excludes += script + "~";
						}
						replacedToken = MessageFormat.format(
								templateStrings.getString(templatePrefix
										+ "script"), new Object[]{jspath, // {0}
										includesParam, // {1}
										debugStr, // {2}
										lang, // {3}
										excludesParam // {4}
								});
					} else if (token.startsWith("style:")) {
						token = token.substring(6);
						replacedToken = MessageFormat.format(
								templateStrings.getString(templatePrefix
										+ "style"), new Object[]{stylepath, // {0}
										token + cssDir // {1}
								});
					}
					m.appendReplacement(lineBuffer, replacedToken);
				}
				m.appendTail(lineBuffer);

				out.write(lineBuffer.toString());
				out.write("\n");
			}
		} catch (Exception e) {
			AjaxFramework.log("Unable to generate template '" + resource + "'",
					e);
		} finally {
			IOUtils.closeQuietly(in);
			IOUtils.closeQuietly(out);
		}
	}

	private static String blankGifURI(String templatePrefix, HttpServletRequest request) {
		return MessageFormat.format(
				templateStrings.getString(templatePrefix
						+ "blank.gif"),
				new Object[]{request.getContextPath()
						+ AjaxFramework.WEB_ROOT});
	}

}
