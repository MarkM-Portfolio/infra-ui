/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.mocks;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletInputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class TestRequest implements HttpServletRequest
{
  private String servletPath;

  private Map<String, List<String>> headers = new HashMap<String, List<String>>();

  private Locale locale;

  private Map<String, List<String>> parameters = new HashMap<String, List<String>>();

  private boolean secure = false;

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

  public String getCharacterEncoding()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public int getContentLength()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public String getContentType()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public ServletInputStream getInputStream() throws IOException
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getLocalAddr()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getLocalName()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public int getLocalPort()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public Locale getLocale()
  {
    return locale;
  }

  public Enumeration getLocales()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getParameter(String name)
  {
    if (parameters.get(name) != null && parameters.get(name).size() > 0)
      return parameters.get(name).get(0);
    return null;
  }

  public Map getParameterMap()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Enumeration getParameterNames()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String[] getParameterValues(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getProtocol()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public BufferedReader getReader() throws IOException
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getRealPath(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getRemoteAddr()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getRemoteHost()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public int getRemotePort()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public RequestDispatcher getRequestDispatcher(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getScheme()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getServerName()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public int getServerPort()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public boolean isSecure()
  {
    return secure;
  }

  public void removeAttribute(String arg0)
  {
    // TODO Auto-generated method stub

  }

  public void setAttribute(String arg0, Object arg1)
  {
    // TODO Auto-generated method stub

  }

  public void setCharacterEncoding(String arg0) throws UnsupportedEncodingException
  {
    // TODO Auto-generated method stub

  }

  public String getAuthType()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getContextPath()
  {
    // FIXME: should be different
    return servletPath;
  }

  public Cookie[] getCookies()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public long getDateHeader(String name)
  {
    String h = getHeader(name);
    if (h != null)
      try
      {
        SimpleDateFormat df = new SimpleDateFormat("EEE MMM dd kk:mm:ss z yyyy");
        df.setTimeZone(TimeZone.getTimeZone("GMT"));
        Date d = df.parse(h);
        return d.getTime();
      }
      catch (ParseException t)
      {
        throw new IllegalArgumentException();
      }
    return -1;
  }

  public String getHeader(String name)
  {
    Enumeration l = getHeaders(name);
    if (l.hasMoreElements())
      return (String) l.nextElement();
    return null;
  }

  public Enumeration getHeaderNames()
  {
    // TODO Auto-generated method stub
    return null;
  }

  private List findHeaders(String name)
  {
    List ret = headers.get(name);
    if (ret != null)
      return ret;
    return null;
  }

  public void setHeaders(String name, String value)
  {
    List l = findHeaders(name);
    if (l != null)
      ((ArrayList<String>) l).add(value);
    else
      headers.put(name, Collections.singletonList(value));
  }

  public Enumeration getHeaders(String name)
  {
    List l = findHeaders(name);
    if (l != null)
      return Collections.enumeration(l);
    return Collections.enumeration(Collections.emptyList());
  }

  public int getIntHeader(String arg0)
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public String getMethod()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getPathInfo()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getPathTranslated()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getQueryString()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getRemoteUser()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getRequestURI()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public StringBuffer getRequestURL()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getRequestedSessionId()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public void setServletPath(String path)
  {
    servletPath = path;
  }

  public String getServletPath()
  {
    return servletPath;
  }

  public HttpSession getSession()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public HttpSession getSession(boolean arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Principal getUserPrincipal()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public boolean isRequestedSessionIdFromCookie()
  {
    // TODO Auto-generated method stub
    return false;
  }

  public boolean isRequestedSessionIdFromURL()
  {
    // TODO Auto-generated method stub
    return false;
  }

  public boolean isRequestedSessionIdFromUrl()
  {
    // TODO Auto-generated method stub
    return false;
  }

  public boolean isRequestedSessionIdValid()
  {
    // TODO Auto-generated method stub
    return false;
  }

  public boolean isUserInRole(String arg0)
  {
    // TODO Auto-generated method stub
    return false;
  }

  public void setLocale(Locale locale)
  {
    this.locale = locale;
  }

  public void setParameter(String name, String value)
  {
    if (parameters.get(name) == null)
      parameters.put(name, new ArrayList<String>());
    parameters.get(name).add(value);

  }

  public void setSecure(boolean b)
  {
    secure = b;

  }
}