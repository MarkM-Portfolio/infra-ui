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

package com.ibm.ic.core.web.resources.internal;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Enumeration;
import java.util.Locale;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.jazz.ajax.internal.util.CacheConfiguration;

import com.ibm.ic.core.web.resources.Activator;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class WebResourcesCacheConfig
{
  private static final String PROPERTY_PREFIX = "com.ibm.ic.core.web.resources.config.caching.";

  private static final String PRODUCTION_CACHE_SETTINGS = "/com/ibm/ic/core/web/resources/config/caching.properties";

  private static final String DEVELOPMENT_CACHE_SETTINGS = "/com/ibm/ic/core/web/resources/config/development_caching.properties";

  private static final Logger LOGGER = Logger.getLogger(WebResourcesCacheConfig.class.getName());

  private static final String SET_METHOD_PREFIX = "set";

  private static final int PREFIX_LENGTH = SET_METHOD_PREFIX.length();

  public static void register()
  {
    Properties p = new Properties();
    InputStream is = null;
    try
    {
      is = WebResourcesCacheConfig.class.getResourceAsStream(Activator.isOsgiDevEnabled() ? DEVELOPMENT_CACHE_SETTINGS
          : PRODUCTION_CACHE_SETTINGS);
      p.load(is);
    }
    catch (IOException e)
    {
      LOGGER.logp(Level.FINE, WebResourcesCacheConfig.class.getName(), "register", "Unable to load configuration", e);
    }
    finally
    {
      try
      {
        if (is != null)
          is.close();
      }
      catch (IOException e)
      {
      }
    }

    try
    {
      Properties genericProperties = VenturaConfigurationHelper.Factory.getInstance().getGenericProperties();
      Enumeration<?> e = genericProperties.propertyNames();
      while (e.hasMoreElements())
      {
        String s = (String) e.nextElement();
        if (s.startsWith(PROPERTY_PREFIX))
        {
          String key = s.substring(PROPERTY_PREFIX.length());
          String value = genericProperties.getProperty(s);
          p.setProperty(key, value);
          LOGGER.logp(Level.FINEST, WebResourcesCacheConfig.class.getName(), "register",
              "Cache configuration from Connections configuration {0} = {1}", new Object[] { key, value });
        }
      }
    }
    catch (VenturaConfigHelperException e)
    {
      LOGGER.logp(Level.FINE, WebResourcesCacheConfig.class.getName(), "register", "Unable to load Connections config properties", e);
    }

    for (Method method : CacheConfiguration.class.getMethods())
    {
      if (method.getName().startsWith(SET_METHOD_PREFIX))
      {
        String name = method.getName().substring(PREFIX_LENGTH, PREFIX_LENGTH + 1).toLowerCase(Locale.ENGLISH)
            + method.getName().substring(PREFIX_LENGTH + 1);
        String value = p.getProperty(name);
        if (value != null && value.trim().length() > 0)
        {
          value = value.trim();
          try
          {
            int intValue = Integer.parseInt(value);
            method.invoke(null, intValue);
            LOGGER.logp(Level.FINE, WebResourcesCacheConfig.class.getName(), "register", "Cache configuration {0} = {1}", new Object[] {
                name, value });
          }
          catch (NumberFormatException e)
          {
            LOGGER.logp(Level.FINE, WebResourcesCacheConfig.class.getName(), "register",
                "The value ''{0}'' for property {1} must be a number", new Object[] { value, name });
          }
          catch (InvocationTargetException e)
          {
            LOGGER.logp(Level.FINE, WebResourcesCacheConfig.class.getName(), "register", "Unable to invoke setter " + name, e);
          }
          catch (IllegalAccessException e)
          {
            LOGGER.logp(Level.FINE, WebResourcesCacheConfig.class.getName(), "register", "Unable to invoke setter " + name, e);
          }
        }
      }
    }
  }
}
