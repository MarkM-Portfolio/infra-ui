/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.ApplicationThemeStyleSheet;
import com.ibm.lconn.core.styles.model.CompoundStyleSheet;
import com.ibm.lconn.core.styles.util.Constants;

import net.jazz.ajax.internal.util.CacheConfiguration;
import net.jazz.ajax.internal.util.CacheWindow;

public class ApplicationThemeServlet extends HttpServlet
{
  private static final CacheWindow CACHE_EMPTY_WITH_ETAG = new CacheWindow(0, CacheConfiguration.getDirectResourceWithETagClientCache(),
      CacheConfiguration.getDirectResourceWithETagFreshness());

  private static final CacheWindow CACHE_EMPTY = new CacheWindow(0, CacheConfiguration.getDirectResourceClientCache(),
      CacheConfiguration.getDirectResourceFreshness());

  private static final long serialVersionUID = 1L;

  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
  {
    String path = req.getPathInfo();
    if (path == null)
    {
      resp.sendError(HttpServletResponse.SC_NOT_FOUND);
      return;
    }
    String[] segments = path.split("/");
    if (segments.length != 3)
    {
      resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    String themeId = segments[1];
    String service = segments[2];
    if (service.endsWith(Constants.CSS_EXTENSION))
      service = service.substring(0, service.length() - Constants.CSS_EXTENSION.length());
    boolean isRTL = Boolean.parseBoolean(req.getParameter("rtl"));
    OneUIVersion version = OneUIVersion.fromString(req.getParameter("version"));

    CompoundStyleSheet styleSheet = ApplicationThemeStyleSheet.forApplicationTheme(service, themeId, version, isRTL);

    if (!styleSheet.hasResources())
    {
      (req.getParameter("etag") != null ? CACHE_EMPTY_WITH_ETAG : CACHE_EMPTY).applyTo(resp, HttpServletResponse.SC_OK);
      resp.setContentType("text/css");
      resp.setContentLength(0);
      resp.getOutputStream().close();
      return;
    }

    req.setAttribute("resources.include", styleSheet.getResources());

    RequestDispatcher rd = getServletContext().getRequestDispatcher("/web/_style");
    if (rd == null)
    {
      resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }

    rd.forward(req, resp);
  }
}
