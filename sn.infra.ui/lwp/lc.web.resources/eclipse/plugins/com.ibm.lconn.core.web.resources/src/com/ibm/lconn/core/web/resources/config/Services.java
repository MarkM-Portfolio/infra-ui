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

package com.ibm.lconn.core.web.resources.config;

import java.net.URL;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import org.apache.commons.configuration.Configuration;
import org.osgi.framework.ServiceReference;

import com.ibm.lconn.core.url.ThreadHttpRequest;
import com.ibm.lconn.core.web.request.HttpRequestFilter;
import com.ibm.lconn.core.web.resources.map.ConfigurationMapResource;
import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;

import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;
/**
 * Generate service configuration
 * 
 */
public class Services extends ResourceProvider
{
  public Resource provide(String id)
  {
    return new ConnectionsConfigurationResource(id);
  }

  private static class ConnectionsConfigurationResource extends ConfigurationMapResource
  {

    private static final String IS_CONNECT_CLIENT = "isConnectClient";

    private static final VenturaConfigurationProvider provider;

    static
    {
      try
      {
        provider = VenturaConfigurationProvider.Factory.getInstance();
      }
      catch (VenturaConfigException e)
      {
        throw new VenturaConfigHelperException(e);
      }
    }

    public ConnectionsConfigurationResource(String id)
    {
      super(id);
    }

    @Override
    protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
    {
      Map<String, Object> services;
      try
      {
        if (context != null && context.request != null)
        {
          HttpServletRequest request = HttpRequestFilter.getWrappedRequest(context.request);
          ThreadHttpRequest.set(request);
        }

        VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();
        VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory.getInstance();
        Collection<String> serviceNames = helper.getInstalledComponents();

        services = new HashMap<String, Object>();
        for (String serviceName : serviceNames)
        {
          boolean isEnabled = provider.isServiceEnabled(serviceName);
          if (!isEnabled)
            continue;

          Map<String, Object> service = new HashMap<String, Object>();
          services.put(serviceName, service);

          if (provider.isSecureServiceEnabled(serviceName))
            service.put("secureEnabled", Boolean.TRUE);
          URL url = provider.getServiceURL(serviceName);
          if (url != null)
            service.put("url", url.toString());
          url = provider.getSecureServiceURL(serviceName);
          if (url != null)
            service.put("secureUrl", url.toString());
          if (serviceName.equals(ServiceReferenceUtil.Service.SAMETIME_PROXY))
            service.put(IS_CONNECT_CLIENT, getServiceAttribute(ServiceReferenceUtil.Service.SAMETIME_PROXY, IS_CONNECT_CLIENT));
        }
      }
      catch (VenturaConfigHelperException e)
      {
        throw new RuntimeException(e);
      }
      catch (VenturaConfigException e)
      {
        throw new RuntimeException(e);
      }
      finally
      {
        ThreadHttpRequest.remove();
      }

      return services;
    }

    @Override
    protected boolean isOutOfDate(long now)
    {
      // because this can vary based on dynamic hosts, we can't cache this resource. if it's always out of date, it'll never be cached
      return true;
    }
  

    private boolean getServiceAttribute(String serviceName, String attribute)
    {

      boolean retVal = false;
      attribute = "[@" + attribute + "]";

      try
      {
        Configuration serviceConfig = provider.getServiceConfiguration(serviceName);
        if (serviceConfig.containsKey(attribute))
          retVal = serviceConfig.getBoolean(attribute, false);

      }
      catch (VenturaConfigException e)
      {
        throw new RuntimeException(e);
      }

      return retVal;
    }
  }
}
