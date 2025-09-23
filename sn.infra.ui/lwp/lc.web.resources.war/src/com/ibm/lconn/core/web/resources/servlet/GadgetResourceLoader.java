/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.core.web.resources.servlet;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.core.web.gatekeeper.LCUXFeatures;
import com.ibm.lconn.core.localeUtil.Locales;
import com.ibm.lconn.core.url.ThreadHttpRequest;
import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;

/**
 * @author Michael Ahern (michael.ahern@ie.ibm.com)
 *
 */
public class GadgetResourceLoader extends HttpServlet {
   private static final String LOG_CLASS = GadgetResourceLoader.class.getName();
   private static final Logger LOG = Logger.getLogger(GadgetResourceLoader.LOG_CLASS);
   
	private static final long serialVersionUID = 2826345242589850030L;
	
	private static final String WEBRESOURCES = "webresources";
	
	private static final String JSP_INCL_PATH = "/WEB-INF/jsps/ic/config";
	private static final String JSP_RES_JS = "/WEB-INF/jsps/ic/templates/resourceJs.jsp";
	private static final String JSP_RES_CSS = "/WEB-INF/jsps/ic/templates/resourceCss.jsp";
	private static final String JSP_RES_ROOT = "/WEB-INF/jsps/ic/templates/resourceRoot.jsp";	
	private static final String JSP_RES_TEMPLATE = "/WEB-INF/jsps/ic/templates/resourceTemplate.jsp";	
	
	private RequestDispatcher resourceRoot = null;
	private RequestDispatcher resourceTemplate = null;
	private RequestDispatcher resourceJs = null;
	private RequestDispatcher resourceCss = null;
	
	public void init() {
		this.resourceTemplate = getServletContext().getRequestDispatcher(JSP_RES_TEMPLATE);
		this.resourceRoot = getServletContext().getRequestDispatcher(JSP_RES_ROOT);
		this.resourceJs = getServletContext().getRequestDispatcher(JSP_RES_JS);
		this.resourceCss = getServletContext().getRequestDispatcher(JSP_RES_CSS);
	}
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
		throws IOException, ServletException
	{
		// for pattern url builder
		ThreadHttpRequest.set(req);
		final String pathInfo = req.getPathInfo();
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.log(Level.FINEST, "pathInfo = " + pathInfo);
      }
		
		// reject attempts to fish for JSPs & bad input
		if (pathInfo.lastIndexOf('/') == 0 && pathInfo.indexOf(".") < 0 && pathInfo.length() > 1) {
			final RequestDispatcher configRd = getServletContext().getRequestDispatcher(JSP_INCL_PATH + pathInfo + ".jsp");

	      if (LOG.isLoggable(Level.FINEST)) {
	         LOG.log(Level.FINEST, "JSP_INCL_PATH + pathInfo + \".jsp\" = " + JSP_INCL_PATH + pathInfo + ".jsp");
	      }

			resp.setContentType("text/plain;charset=UTF-8");
			resp.setHeader("Cache-Control", "public, max-age=36000");
			
			final ModHttpServletRequest modReq = new ModHttpServletRequest(req);
			final BufHttpServletResponse bufResp = new BufHttpServletResponse(resp);
						
			configRd.include(req, resp);
			
			final String gatekeeperObj = LCUXFeatures.getFeaturesAsJSON(req, false);
			final String cssData = getCssData(modReq, bufResp);
			final String scriptData = getScriptData(modReq, bufResp);			
			final String httpConf = getResp(modReq, bufResp, false);
			final String httpsConf = getResp(modReq, bufResp, true);

			req.setAttribute("scriptData", scriptData);
			req.setAttribute("cssData", cssData);
			req.setAttribute("httpConf", httpConf);
			req.setAttribute("httpsConf", httpsConf);
			req.setAttribute("gatekeeperConf", gatekeeperObj);
			
			resourceRoot.include(req, resp);
		}
	}

	private String getResp(
				final ModHttpServletRequest modReq,
				final BufHttpServletResponse bufResp,
				final boolean secure) 
		throws IOException, ServletException
	{
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.entering(LOG_CLASS, "getResp(modReq, bufResp, secure)", new Object[] { modReq, bufResp, secure});
      }

		modReq.setSecure(secure);
		modReq.setLocale(Locale.ENGLISH);
		
		// set web resources
		final String webResources = getWebResources(modReq);
		modReq.setAttribute("webresources", webResources);

      final String ret = getContent(resourceTemplate, modReq, bufResp);

      if (LOG.isLoggable(Level.FINEST)) {
         LOG.exiting(LOG_CLASS, "getResp(modReq, bufResp, secure)", ret);
      }

		return ret;
	}

	/**
	 * Enumerate css links into []
	 * @param modReq
	 * @param bufResp
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 */
	private String getCssData(ModHttpServletRequest modReq, BufHttpServletResponse bufResp) 
		throws IOException, ServletException 
	{
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.entering(LOG_CLASS, "getCssData(modReq, bufResp)", new Object[] { modReq, bufResp});
      }

		final String ret = getContent(resourceCss, modReq, bufResp);

      if (LOG.isLoggable(Level.FINEST)) {
         LOG.exiting(LOG_CLASS, "getCssData(modReq, bufResp)", ret);
      }

		return ret;
	}

	/**
	 * Enumerate out all of the locales
	 * @param modReq
	 * @param bufResp
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 */
	private String getScriptData(
				final ModHttpServletRequest modReq,
				final BufHttpServletResponse bufResp) 
		throws IOException, ServletException
	{
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.entering(LOG_CLASS, "getScriptData(modReq, bufResp)", new Object[] { modReq, bufResp});
      }

	   final StringBuilder sb = new StringBuilder();

		boolean isFirst = true;
		
		sb.append("{");		// START 'overall'
		for (final Locale locale : /*new Locale[]{Locale.ENGLISH, Locale.FRENCH}) {*/ Locales.ALL_SUPPORTED) {
			final List<String> scripts = ScriptExtractor.extractTags(getContent(resourceJs, modReq, bufResp, locale));

			// -- IS first
			if (isFirst) { 
				isFirst = false; 
				
				sb.append('"').append("bases").append('"');
				sb.append(":[");
				{					
					boolean fbase = true;
					for (final String script : scripts) {
						if (fbase) { fbase = false; } else { sb.append(","); }							
						sb.append('"');
						sb.append(script.substring(script.indexOf('?')+1, script.indexOf("&etag")));
						sb.append('"');
					}
				}
				sb.append("]");
				
				sb.append(",").append('"').append("etags").append('"');
				sb.append(":{"); // START 'etags'
			
			} else { 
				sb.append(",");
			}
			// -- IS first			
			
			printLocale(sb, locale.toString(), scripts);
			if (locale.getLanguage().equals("iw")) {
				sb.append(",");
				printLocale(sb, "he", scripts);
			} else if (locale.getLanguage().equals("pt")) {
				sb.append(",");
				printLocale(sb, "pt_pt", scripts);
			} else if (locale.getLanguage().equals("in")) {
				sb.append(",");
				printLocale(sb, "id", scripts);
			} else if (locale.getLanguage().equals("sr_latn")) {
				sb.append(",");
				printLocale(sb, "sr", scripts);
			}
		}
		sb.append("}");		// END 'etags'
		sb.append("}");		// END 'overall'

		final String ret = sb.toString();
		
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.exiting(LOG_CLASS, "getScriptData(modReq, bufResp)", ret);
      }

		return ret;
	}
	
	/**
	 * 
	 * @param sb
	 * @param locale
	 * @param scripts
	 */
	private void printLocale(final StringBuilder sb, final String locale, final List<String> scripts) {
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.entering(LOG_CLASS, "printLocale(sb, locale, scripts)", new Object[] {sb, locale, scripts});
      }

		sb.append('"').append(locale.toLowerCase(Locale.ENGLISH)).append('"');
		sb.append(":[");
		{				
			boolean fetag = true;
			for (final String script : scripts) {
				if (fetag) { fetag = false; } else { sb.append(","); }	
				sb.append('"');
				final int i = script.indexOf("&etag=")+6;
				final int j = script.indexOf("&", i);
				final String p = script.substring(i, j);
				sb.append(p);
				sb.append('"');
			}
		}
		sb.append("]");
		
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.exiting(LOG_CLASS, "printLocale(sb, locale, scripts)");
      }
	}

	/**
	 * Get the web resources link
	 * @param modReq
	 * @return
	 */
	private String getWebResources(final ModHttpServletRequest modReq) {
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.entering(LOG_CLASS, "getWebResources(modReq)", new Object[] {modReq});
      }

		final String ret = ServiceReferenceUtil.getServiceLink(WEBRESOURCES, modReq.isSecure());

		if (LOG.isLoggable(Level.FINEST)) {
         LOG.exiting(LOG_CLASS, "getWebResources(modReq)", ret);
      }

		return ret;
	}

	/**
	 * 
	 * @param resourceCss2
	 * @param modReq
	 * @param bufResp
	 * @param ltrLocale
	 * @return
	 */
	private String getContent(final RequestDispatcher rd, final ModHttpServletRequest modReq, final BufHttpServletResponse bufResp, final Locale locale) 
		throws IOException, ServletException
	{
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.entering(LOG_CLASS, "getContent(rd, modReq, bufResp, locale)", new Object[] {rd, modReq, bufResp, locale});
      }
		modReq.setLocale(locale);
		
		final String ret = getContent(rd, modReq, bufResp);

      if (LOG.isLoggable(Level.FINEST)) {
         LOG.exiting(LOG_CLASS, "getContent(rd, modReq, bufResp, locale)", ret);
      }
		return ret;
	}

	/**
	 * Get the content
	 * @param rd
	 * @param modReq
	 * @param bufResp
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 */
	private String getContent(final RequestDispatcher rd, final ModHttpServletRequest modReq, final BufHttpServletResponse bufResp) 
		throws IOException, ServletException
	{
      if (LOG.isLoggable(Level.FINEST)) {
         LOG.entering(LOG_CLASS, "getContent(rd, modReq, bufResp)", new Object[] {rd, modReq, bufResp});
      }
		bufResp.resetString();
		rd.include(modReq, bufResp);

		final String ret = bufResp.resetString();

      if (LOG.isLoggable(Level.FINEST)) {
         LOG.exiting(LOG_CLASS,  "getContent(rd, modReq, bufResp)", ret);
      }
		return ret;
	}

}
