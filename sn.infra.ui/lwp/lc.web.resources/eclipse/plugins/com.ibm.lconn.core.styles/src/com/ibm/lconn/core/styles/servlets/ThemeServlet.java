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
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.ThemeStyleSheet;
import com.ibm.lconn.core.styles.util.Constants;

import net.jazz.ajax.model.Resource;

public class ThemeServlet extends HttpServlet
{
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
    if (segments.length != 2)
    {
      resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    String themeId = segments[1];
    if (themeId.endsWith(Constants.CSS_EXTENSION))
      themeId = themeId.substring(0, themeId.length() - Constants.CSS_EXTENSION.length());

    boolean isRTL = Boolean.parseBoolean(req.getParameter("rtl"));
    OneUIVersion version = OneUIVersion.fromString(req.getParameter("version"));

    ThemeStyleSheet themeStyleSheet = ThemeStyleSheet.forTheme(themeId, version, isRTL);
    req.setAttribute("resources.include", themeStyleSheet.getResources());

    RequestDispatcher rd = getServletContext().getRequestDispatcher("/web/_style");
    if (rd == null)
    {
      resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }

    rd.forward(req, resp);
  }
}
