/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2016                                          */
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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.internal.util.Util;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceUnavailableException;

import org.apache.commons.io.IOUtils;

/**
 * Provide simple tag support for HTML page
 * 
 * Please use testHTMLTemplate.html to test any change
 * 
 * TODO add automatic testing.
 * 
 */

public class HTMLTemplate {
    private static ResourceBundle templateStrings = ResourceBundle
	    .getBundle("net.jazz.ajax.servlets.htmlTemplates");

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

    String country = request.getParameter("country");
    if (null == country)
      country = "";
    
    // To generate composite parameter &lang={lang}&country={country}
    String paramLangCountry = lang;
    if (country.length() > 0) {
      paramLangCountry = paramLangCountry + "&country=" + country;
    }

    // To generate full language tag, {lang}-{country}
    String fullDojoLangTag = lang;
    if (country.length() > 0) {
      fullDojoLangTag = fullDojoLangTag + "-" + country;
    }
    
    String debugStr = (String) request.getParameter("debug");
	boolean debugMode = false;

	if (debugStr != null) {
	    debugMode = "dojo".equalsIgnoreCase(debugStr)
		    || "true".equalsIgnoreCase(debugStr);
	    debugStr = "&debug=" + debugStr;
	}

	String theme = (String) request.getParameter("theme");
	if (theme == null)
	    theme = "hikari";

	String jspath = contextpath + AjaxFramework.JS_ROOT;
	String stylepath = contextpath + AjaxFramework.STYLE_ROOT;
	String dojopath = contextpath + AjaxFramework.WEB_ROOT + "dojo/";
	String ajaxProxypath = contextpath + "/ajaxProxy";

	String excludes = "";

	String dir = "rtl";
	String cssDir = "RTL";
	boolean isRTL = true;
	if (ComponentOrientation.getOrientation(new Locale(lang, country))
		.isLeftToRight()) {
	    dir = "ltr";
	    cssDir = "";
	    isRTL = false;
	}

	String tagSuffix = null;
	String oneuiVersion = request.getParameter("oneui");
	if ("21".equals(oneuiVersion) || "2".equals(oneuiVersion)) {
	    oneuiVersion = "";
	    tagSuffix = ".oneui2";
	} else {
	    oneuiVersion = "30";
	    tagSuffix = ".oneui3";
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
		    .compile("\\$\\{(html_begin|html_end|head_begin|head_end|body_begin|body_end|contextRoot|oneui|cssRTL|left|right|_blankGif|style:(.*?)|icBaseStyle|icSpritesStyle|icThemeStyle|icAppStyle:(.*?)|script:(.*?)|dojoMainScript|ckeditorScript)\\}");

	    BufferedReader reader = new BufferedReader(
		    new InputStreamReader(in));
	    String line;
	    while ((line = reader.readLine()) != null) {
		// Transform line and output
		Matcher m = p.matcher(line);
		StringBuffer lineBuffer = new StringBuffer(line.length());
		while (m.find()) {
		    String token = "";

		    try {
			// Calculate replacement token for match
			token = m.group(1);
			String replacedToken = "";
			if (token.equals("_blankGif")) {
			    replacedToken = blankGifURI(tagSuffix, request);
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
			} else if (token.equals("html_begin")) {
			    replacedToken = MessageFormat.format(
				    templateStrings
					    .getString(token + tagSuffix),
				    new Object[] { dir, // {0}
					    fullDojoLangTag // {1}
				    });
			} else if (token.equals("html_end")) {
			    replacedToken = templateStrings.getString(token);
			} else if (token.equals("head_begin")) {
			    replacedToken = templateStrings.getString(token);
			} else if (token.equals("head_end")) {
			    replacedToken = templateStrings.getString(token);
			} else if (token.equals("body_begin")) {
			    replacedToken = templateStrings.getString(token
				    + tagSuffix);
			} else if (token.equals("body_end")) {
			    replacedToken = templateStrings.getString(token);
			} else if (token.startsWith("script:")) {
			    token = token.substring(7);
			    token = token != null ? token.trim() : "";

			    String includesParam = "";
			    String excludesParam = (excludes.length() > 0) ? ("&exclude=" + excludes)
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
				    templateStrings.getString("script"),
				    new Object[] {
					    jspath, // {0}
					    includesParam, // {1}
					    fullDojoLangTag, // {2}
					    (debugMode ? debugStr : "")
						    + excludesParam // {3}
				    });
			} else if (token.equals("dojoMainScript")) {
			    excludes += "dojo.main~";
			    replacedToken = MessageFormat.format(
				    templateStrings
					    .getString(token + tagSuffix),
				    new Object[] { contextpath, // {0}
					    ajaxProxypath, // {1}
					    debugMode, // {2}
					    dojopath, // {3}
					    paramLangCountry, // {4}
					    blankGifURI(tagSuffix, request), // {5}
					    jspath, // {6}
					    debugMode ? debugStr : "" // {7}
				    });
			} else if (token.equals("ckeditorScript")) {
			    replacedToken = MessageFormat.format(
				    templateStrings.getString(token),
				    new Object[] { contextpath // {0}
				    });
			} else if (token.startsWith("style:")) {
			    token = token.substring(6);
			    token = token != null ? token.trim() : "";
			    replacedToken = MessageFormat.format(
				    templateStrings.getString("style"),
				    new Object[] { stylepath, // {0}
					    token + cssDir // {1}
				    });
			} else if (token.equals("icBaseStyle")) {
			    replacedToken = MessageFormat.format(
				    templateStrings
					    .getString(token + tagSuffix),
				    new Object[] { stylepath, // {0}
					    cssDir, // {1}
					    theme // {2}
				    });
			} else if (token.equals("icSpritesStyle")) {
			    replacedToken = MessageFormat.format(
				    templateStrings
					    .getString(token + tagSuffix),
				    new Object[] { stylepath, // {0}
					    cssDir // {1}
				    });
			} else if (token.equals("icThemeStyle")) {
			    replacedToken = MessageFormat.format(
				    templateStrings
					    .getString(token + tagSuffix),
				    new Object[] { contextpath, // {0}
					    isRTL, // {1}
					    theme // {2}
				    });
			} else if (token.startsWith("icAppStyle:")) {
			    token = token.substring("icAppStyle:".length());
			    token = token != null ? token.trim() : "";
			    replacedToken = MessageFormat.format(
				    templateStrings.getString("icAppStyle"
					    + tagSuffix), new Object[] {
					    contextpath, // {0}
					    token, // {1}
					    isRTL, // {2}
					    theme // {3}
				    });
			}
			m.appendReplacement(lineBuffer, replacedToken);
		    } catch (Exception e) {
			AjaxFramework.log("Unable to parse token '" + token
				+ "'", e);
		    }
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

    private static String blankGifURI(String tagSuffix,
	    HttpServletRequest request) {
	return MessageFormat.format(
		templateStrings.getString("blank.gif" + tagSuffix),
		new Object[] { request.getContextPath()
			+ AjaxFramework.WEB_ROOT });
	
    }

}
