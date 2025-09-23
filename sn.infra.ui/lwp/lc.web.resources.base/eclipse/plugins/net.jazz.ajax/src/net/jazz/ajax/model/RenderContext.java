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

package net.jazz.ajax.model;

import java.util.Locale;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.core.runtime.Assert;

import com.ibm.lconn.core.config.services.Services;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.LocaleUtil;

public class RenderContext {

	static final Pattern ILLEGAL_CHAR = Pattern.compile("[\"<&]");
	public final String base;
	public final Locale locale;
	public final Mode mode;
	public final LocaleOverride localeOverride;
	public final boolean gadgetAdaptedViewlet;
	public final boolean includeXDloader;
	
	private static final String GADGET_ADAPTER = "gadgetAdapter";
	
	public enum Mode {
		STANDARD("false"), DEBUG("true"), NO_MINIFY("\"dojo\"");
		final String config;
		Mode(String config) {
			this.config = config;
		}
		public String djConfig() {
			return config;
		}
	}
	
	public enum LocaleOverride {
		TRUE("true"), FALSE("false");
		final String override;
		LocaleOverride(String override) {
			this.override = override;
		}
	}
	
	@Deprecated
	public final HttpServletRequest request;

	// CHANGED
	private RenderContext(HttpServletRequest request, Mode m) {
		this.request = request;
		if (GADGET_ADAPTER.equals(request.getParameter("context"))) {
			base = net.jazz.ajax.internal.util.ServletUtil.externalContext(request);	
			gadgetAdaptedViewlet = true;
		} else {
			if (request.getParameter("_proxyURL") != null) {
//				base = getEchoedParameter(request, "_proxyURL");
//				Assert.isTrue(base.startsWith("/"));
				// Obtain path to common web resources from configuration
				base = Services.getServiceUrl(request.isSecure());
			} else
				base = request.getContextPath();
			gadgetAdaptedViewlet = false;
		}
		locale = getLocale(request);
		if (m == null) {
			m = Mode.STANDARD;
			if ("true".equals(request.getParameter("debug")))
				m = Mode.DEBUG;
			else if ("true".equals(request.getParameter("debugDojo"))
					|| "dojo".equals(request.getParameter("debug")))
				m = Mode.NO_MINIFY;
		}
		mode = m;
		// ADDED
		if (request.getParameter("_localeOverride") != null)
			this.localeOverride = LocaleOverride.valueOf(request.getParameter(
					"_localeOverride").toUpperCase(Locale.ENGLISH));
		else
			this.localeOverride = LocaleOverride.TRUE;
		
		if (request.getParameter("xdloader") != null)
			this.includeXDloader = Boolean.parseBoolean(request.getParameter("xdloader"));
		else
			this.includeXDloader = false;	
	}
	
	// ADDED
	private RenderContext(String base, Locale locale, Mode mode) {
		this.request = null;
		this.base = base;
		this.locale = /*initializeLocale(*/locale/*)*/;
		this.mode = mode;
		this.localeOverride = LocaleOverride.TRUE;
		this.gadgetAdaptedViewlet = false;
		this.includeXDloader = false;
	}

	// ADDED: Handle invalid argument normalization, locale values can be
	// injected into script
	private static String normalizeLanguage(String input) {
		String output = input;
		if (output != null) {
			output = output.replaceAll("[^a-zA-Z0-9]", "").trim();
			if (output.length() == 0)
				output = null;
		}
		return output;
	}
	
	public boolean equals(Object obj) {
		if (obj instanceof RenderContext) {
			RenderContext other = (RenderContext) obj;
			return mode == other.mode
					&& locale.equals(other.locale)
					&& base.equals(other.base)
					&& includeXDloader==other.includeXDloader;
		}
		return false;
	}
	
	public int hashCode() {
		return base.hashCode()
			^ locale.hashCode();
	}
	
	public static RenderContext forRequest(HttpServletRequest request) {
		return new RenderContext(request, null);
	}
	
	// CHANGED:
	private static Locale getLocale(HttpServletRequest request) {
		String lang = normalizeLanguage(getEchoedParameter(request, "lang"));
		String country = normalizeLanguage(getEchoedParameter(request, "country"));
		if (country != null)
			return new Locale(lang, country);
		if (request.getServletPath().startsWith(AjaxFramework.JS_ROOT)) {
			String locale = normalizeLanguage(getEchoedParameter(request, "locale"));
			if (locale != null)
				return LocaleUtil.fromDojoString(locale);
		}
		if ("no".equals(lang))
			lang = "nb";		
		else if (lang != null)
			return LocaleUtil.internalize(lang);
		Assert.isTrue(request.getLocale().toString().length() < 11);
		return request.getLocale();
	}

	private static String getEchoedParameter(HttpServletRequest request, String param) {
		String result = request.getParameter(param);
		if (result != null && ILLEGAL_CHAR.matcher(result).find())
			throw new RuntimeException("Illegal Parameter value: " + param + " = \"" + result + "\"");
		return result;
	}
	
	/*
	 * Used only by WebBundleServlet, which always serves javascript in debug
	 */
	public static RenderContext internal(HttpServletRequest request) {
		return new RenderContext(request, Mode.DEBUG);
	}

	// ADDED
	public static RenderContext forState(String base, Locale locale, Mode mode) {
		return new RenderContext(base, locale, mode);
	}
}
