/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.web.globalization.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ibm.connections.directory.services.DSProvider;
import com.ibm.connections.directory.services.DSProviderFactory;
import com.ibm.connections.directory.services.data.DSObject;
import com.ibm.connections.directory.services.exception.DSException;

import com.ibm.json.java.JSONObject;

import com.ibm.lconn.core.tkrproxysvc.service.LCRemoteServiceFactory;

import com.ibm.lconn.core.web.cache.WebCacheUtil;
import com.ibm.lconn.core.web.globalization.PreferencesBroker;
import com.ibm.lconn.core.web.globalization.bean.Preferences;
import com.ibm.lconn.core.web.util.ServiceNameHelper;
import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;

import com.ibm.lconn.prefs.IUserPreferenceService;
import com.ibm.lconn.prefs.util.Constants;

import com.ibm.tk.rproxysvc.service.TKRemoteServiceDescriptor;

/**
 * Servlet providing a globalization preferences service supporting the following operations:
 * 
 * <dl>
 * <dt>POST (JSON)</dt>
 * <dd>Store the calling user's globalization preferences as represented in the JSON object provided in the request.</dd>
 * <dt>DELETE</dt>
 * <dd>Delete the calling user's globalization preferences.</dd>
 * </dl>
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
public class Service extends HttpServlet
{
  private static final long serialVersionUID = 1L;

  private final static String CLASS_NAME = Service.class.getName();

  private final static Logger log = Logger.getLogger(CLASS_NAME);

  private String serviceName;

  public void init(ServletConfig servletConfig)
  {
    serviceName = ServiceNameHelper.getServiceName(servletConfig);
  }

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException", //$NON-NLS-1$
          new Object[] { request, response });
    }

    DSObject remoteUser = getRemoteUser(request);

    if (remoteUser == null)
    {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }
    WebCacheUtil.disableCachingOverridableIESafe(response);

    JSONObject object = getJSONFromRequest(request);

    Preferences preferences = Preferences.fromJSONObject(object);
    log.logp(Level.FINEST, CLASS_NAME,
        "doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException", //$NON-NLS-1$
        "preferences: {0}", //$NON-NLS-1$
        preferences);

    // Save preference
    PreferencesBroker.savePreferences(remoteUser.get_id(), serviceName, preferences);
    // Remove from session
    // TODO: maybe update cached copy?
    removeFromSession(request);

    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException"); //$NON-NLS-1$
    }
  }

  protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException", //$NON-NLS-1$
          new Object[] { request, response });
    }

    DSObject remoteUser = getRemoteUser(request);

    if (remoteUser == null)
    {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }
    WebCacheUtil.disableCachingOverridableIESafe(response);

    // Delete preference
    PreferencesBroker.deletePreferences(remoteUser.get_id(), serviceName);
    // Remove from session
    removeFromSession(request);

    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException"); //$NON-NLS-1$
    }
  }

  /**
   * Removes the session attribute that caches preferences
   * 
   * @param request
   */
  private void removeFromSession(HttpServletRequest request)
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "removeFromSession(HttpServletRequest request)", request); //$NON-NLS-1$
    }
    HttpSession session = request.getSession();
    if (session != null)
    {
      // Safe to call even if attribute is not set
      session.removeAttribute(Constants.SESSION_ATTRIBUTE_NAME);
    }
    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "removeFromSession(HttpServletRequest request)"); //$NON-NLS-1$
    }
  }

  /**
   * Obtains the remote user from the request using Waltz directory services
   * 
   * @param request
   * @return the remote user from the request
   */
  private DSObject getRemoteUser(HttpServletRequest request)
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "getRemoteUser(HttpServletRequest request)", request); //$NON-NLS-1$
    }

    DSProvider dsProvider = DSProviderFactory.INSTANCE.getProfileProvider();
    DSObject dsObject = null;
    try
    {
      dsObject = dsProvider.searchUserByExactLoginUserIdMatch(request.getRemoteUser());
    }
    catch (DSException e)
    {
      if (log.isLoggable(Level.SEVERE))
      {
        log.throwing(CLASS_NAME, "getRemoteUser(HttpServletRequest request)", e); //$NON-NLS-1$
      }
    }

    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "getRemoteUser(HttpServletRequest request)", dsObject); //$NON-NLS-1$
    }
    return dsObject;
  }

  /**
   * Returns a JSON object from the request's input stream
   * 
   * @param request
   * @return a JSON object representing the request payload
   */
  private JSONObject getJSONFromRequest(HttpServletRequest request)
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "getJSONFromRequest(HttpServletRequest request)", request); //$NON-NLS-1$
    }
    StringBuffer jb = new StringBuffer();
    String line = null;
    try
    {
      BufferedReader reader = request.getReader();
      while ((line = reader.readLine()) != null)
        jb.append(line);
    }
    catch (Exception e)
    {
      if (log.isLoggable(Level.SEVERE))
      {
        log.throwing(CLASS_NAME, "getJSONFromRequest(HttpServletRequest request)", e); //$NON-NLS-1$
      }
    }

    JSONObject jsonObject = null;
    try
    {
      jsonObject = JSONObject.parse(jb.toString());
    }
    catch (IOException e)
    {
      if (log.isLoggable(Level.SEVERE))
      {
        log.throwing(CLASS_NAME, "getJSONFromRequest(HttpServletRequest request)", e); //$NON-NLS-1$
      }
    }

    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "getJSONFromRequest(HttpServletRequest request)", jsonObject); //$NON-NLS-1$
    }
    return jsonObject;
  }
}
