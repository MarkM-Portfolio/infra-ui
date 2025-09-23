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
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang.StringEscapeUtils;

import com.ibm.lconn.core.web.cache.WebCacheUtil;

public class RoleCheckServlet extends HttpServlet {

  private static final long serialVersionUID = 3206093459760846165L;
  private static final String ROLE_PREFIX = "ROLE_";
  private static final String[] UI_ROLE_COOKIES = {"ROLE_admin","ROLE_global-moderator","ROLE_metrics-report-run"};

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    if (request.getRemoteUser() == null) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    response.setStatus(HttpServletResponse.SC_OK);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    WebCacheUtil.disableCachingOverridableIESafe(response);

    PrintWriter out = response.getWriter();

    out.print("{");

    String[] roles = request.getParameterValues("role");
    if (roles != null) {
      for (int i=0; i<roles.length; i++) {
        String role = roles[i];
        Boolean authorized = request.isUserInRole(role);
        out.print("\"" + StringEscapeUtils.escapeHtml(role) + "\":\"" + authorized + "\"");
        if (i!=roles.length-1)
          out.print(",");
        addCookie(response, ROLE_PREFIX + role, authorized.toString());
      }
    }

    out.print("}");
  }

  private void addCookie(HttpServletResponse response, String name, String value) {
    Cookie cookie = new Cookie(name, value);
    cookie.setMaxAge(-1);
    cookie.setPath("/; HttpOnly;");
    cookie.setSecure(true);
    response.addCookie(cookie);
  }
}
