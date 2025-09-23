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

package com.ibm.lconn.core.config;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;

public class GenericProperties {
    
    private static Map<String, Object> genericPropertyMap;
  
    public static void init(){
      try {
        
        VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory.getInstance();
        Properties genericProperties = helper.getGenericProperites();
        
        Enumeration<Object> keys = genericProperties.keys();
        genericPropertyMap = new HashMap<String, Object>();
        
        while(keys.hasMoreElements()) {
          String key = (String) keys.nextElement();
          genericPropertyMap.put(key, genericProperties.getProperty(key));
        }
        
      } catch(VenturaConfigHelperException e){
        throw new RuntimeException(e);
      }
    }
    
    public static String getProperty(String propertyName){
      return (String) genericPropertyMap.get(propertyName);
    }
}

