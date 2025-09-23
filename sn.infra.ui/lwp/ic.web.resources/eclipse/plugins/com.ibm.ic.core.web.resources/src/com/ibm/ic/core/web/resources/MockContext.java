/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.core.web.resources;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Enumeration;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

/**
 * Mock servlet context used to enable resource customization in development mode
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
public class MockContext implements ServletContext
{
  /*
   * This is the only method we're interested into - all we need is that it returns a non-null path. Returning a temporary directory just in
   * case the caller wants to use it.
   */
  public String getRealPath(String arg0)
  {
    return System.getProperty("java.io.tmpdir"); //$NON-NLS-1$
  }

  /*
   * Other methods are only provided to fulfil the ServletContext interface implementation
   */
  public Object getAttribute(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Enumeration getAttributeNames()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public ServletContext getContext(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getContextPath()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getInitParameter(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Enumeration getInitParameterNames()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public int getMajorVersion()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public String getMimeType(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public int getMinorVersion()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public RequestDispatcher getNamedDispatcher(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public RequestDispatcher getRequestDispatcher(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public URL getResource(String arg0) throws MalformedURLException
  {
    // TODO Auto-generated method stub
    return null;
  }

  public InputStream getResourceAsStream(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Set getResourcePaths(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getServerInfo()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Servlet getServlet(String arg0) throws ServletException
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getServletContextName()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Enumeration getServletNames()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Enumeration getServlets()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public void log(String arg0)
  {
    // TODO Auto-generated method stub

  }

  public void log(Exception arg0, String arg1)
  {
    // TODO Auto-generated method stub

  }

  public void log(String arg0, Throwable arg1)
  {
    // TODO Auto-generated method stub

  }

  public void removeAttribute(String arg0)
  {
    // TODO Auto-generated method stub

  }

  public void setAttribute(String arg0, Object arg1)
  {
    // TODO Auto-generated method stub

  }

}
