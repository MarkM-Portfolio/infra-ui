/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.config;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class Properties
{
  static Map<String, String> propertiesMap;

  private synchronized static void init()
  {
    VenturaConfigurationHelper vch = VenturaConfigurationHelper.Factory.getInstance();
    java.util.Properties props = vch.getGenericProperites();
    Map<String, String> temp = new HashMap<String, String>();
    for (Object key : props.keySet())
    {
      temp.put((String) key, (String) props.getProperty((String) key));
    }
    propertiesMap = Collections.unmodifiableMap(temp);
  }

  public static String get(String key)
  {
    if (propertiesMap == null)
      init();
    return propertiesMap.get(key);
  }

  public static String get(String key, String defaultValue)
  {
    String ret = get(key);
    return ret != null ? ret : defaultValue;
  }
}
