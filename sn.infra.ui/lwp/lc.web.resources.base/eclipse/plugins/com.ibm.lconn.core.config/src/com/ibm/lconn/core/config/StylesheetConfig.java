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

package com.ibm.lconn.core.config;

import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import com.ibm.sistdase.json.JSONParser;

import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class StylesheetConfig
{
  public static final String PROPERTY_NAME = "com.ibm.lconn.core.config.StylesheetConfig"; //$NON-NLS-1$

  private static final String PROXY_PATH_PROPERTY = "proxyPath"; //$NON-NLS-1$

  private static final String IGNORED_PATHS_PROPERTY = "ignoredPaths"; //$NON-NLS-1$

  private static Properties genericProperties;

  private static Map<String, String> ignoredPaths;

  private static String proxyPath;

  @SuppressWarnings("unchecked")
  public static void init()
  {

    try
    {
      VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory.getInstance();

      genericProperties = helper.getGenericProperites();

      String stylesheetProperties = genericProperties.getProperty(PROPERTY_NAME);

      if (stylesheetProperties != null)
      {
        HashMap<String, Object> properties = (HashMap<String, Object>) JSONParser.parse(new StringReader(stylesheetProperties));

        proxyPath = (String) properties.get(PROXY_PATH_PROPERTY);
        ignoredPaths = (HashMap<String, String>) properties.get(IGNORED_PATHS_PROPERTY);
      }

    }
    catch (VenturaConfigHelperException e1)
    {
      throw new RuntimeException(e1);
    }
    catch (IOException e)
    {
      e.printStackTrace();
    }
  }

  public static void setIgnoredPaths(Map<String, String> paths)
  {
    ignoredPaths = paths;
  }

  public static Map<String, String> getIgnoredPaths()
  {
    return ignoredPaths;
  }

  public static void setProxyPath(String path)
  {
    proxyPath = path;
  }

  public static String getProxyPath()
  {
    return proxyPath;
  }
}
