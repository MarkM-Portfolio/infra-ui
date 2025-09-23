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

package com.ibm.ic.core.web.resources.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.ibm.lconn.core.web.customization.CustomizationInitializer;

public class CustomizationInit extends HttpServlet
{
  /**
   * 
   */
  private static final long serialVersionUID = 8655098325236275171L;

  private ServletContext context = null;

  @Override
  public void init(ServletConfig config) throws ServletException
  {
    super.init(config);
    if (context == null)
      context = config.getServletContext(); 
    new CustomizationInitializer().contextInitialized(new ServletContextEvent(context));
  }

  public void setServletContext(ServletContext context)
  {
    this.context = context;
  }
}
