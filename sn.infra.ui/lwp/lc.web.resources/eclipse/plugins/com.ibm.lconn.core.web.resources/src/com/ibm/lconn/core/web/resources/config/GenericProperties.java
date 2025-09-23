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

package com.ibm.lconn.core.web.resources.config;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.lconn.core.web.resources.map.ConfigurationMapResource;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

/**
 * Generate service configuration
 * 
 */
public class GenericProperties extends ResourceProvider
{
  public Resource provide(String id)
  {
    return new ConnectionsConfigurationResource(id);
  }

  private static class ConnectionsConfigurationResource extends ConfigurationMapResource
  {

    public ConnectionsConfigurationResource(String id)
    {
      super(id);
    }

    @Override
    protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
    {
      Map<String, Object> miscConfig = new HashMap<String, Object>();
      try
      {
        Properties props = VenturaConfigurationHelper.Factory.getInstance().getGenericProperties();

        Enumeration<Object> keys = props.keys();

        while (keys.hasMoreElements())
        {
          String key = (String) keys.nextElement();

          miscConfig.put(key, props.getProperty(key));
        }
      }
      catch (VenturaConfigHelperException e)
      {
        throw new RuntimeException(e);
      }

      return miscConfig;
    }
  }
}
