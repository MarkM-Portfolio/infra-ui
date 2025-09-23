/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.osgi.servletbridge;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.osgi.framework.Bundle;

import com.ibm.lconn.osgi.servletbridge.Activator;

public class InstalledBundlesServlet extends HttpServlet
{
  static final String BUNDLE_VALUE = "%1$-4d %2$-50s %3$-30s %4$-10s %5$s\n"; //$NON-NLS-1$

  private static final long serialVersionUID = 1L;

  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
  {
    Bundle[] bundles = Activator.getContext().getBundles();

    resp.setHeader("Cache-Control", "private,no-cache=\"set-cookie,set-cookie2\",no-store,s-maxage=0,must-revalidate,max-age=0"); //$NON-NLS-1$//$NON-NLS-2$
    resp.setContentType("text/plain;charset=UTF-8"); //$NON-NLS-1$
    PrintWriter w = resp.getWriter();

    for (Bundle b : bundles)
    {
      String state = null;
      switch (b.getState())
        {
          case Bundle.INSTALLED :
            state = "INSTALLED"; //$NON-NLS-1$
            break;
          case Bundle.ACTIVE :
            state = "ACTIVE"; //$NON-NLS-1$
            break;
          case Bundle.RESOLVED :
            state = "RESOLVED"; //$NON-NLS-1$
            break;
          case Bundle.STOPPING :
            state = "STOPPING"; //$NON-NLS-1$
            break;
          case Bundle.STARTING :
            state = "STARTING"; //$NON-NLS-1$
            break;
          case Bundle.UNINSTALLED :
            state = "UNINSTALLED"; //$NON-NLS-1$
            break;
        }
      w.print(String.format(BUNDLE_VALUE, b.getBundleId(), b.getSymbolicName(), b.getVersion(), state, b.getLocation()));
    }
  }
}
