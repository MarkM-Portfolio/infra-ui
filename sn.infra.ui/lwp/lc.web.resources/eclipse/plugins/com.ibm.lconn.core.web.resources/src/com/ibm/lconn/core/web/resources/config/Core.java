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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.lconn.core.versionstamp.VersionStamp;
import com.ibm.lconn.core.web.resources.map.ConfigurationMapResource;
import com.ibm.lconn.core.web.util.taglib.EmailSettingsBean;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;


/**
 * Generate configuration for core Lotus Connections. Output only information that is identical across the deployment. Only surfaces simple
 * configuration
 * 
 */
public class Core extends ResourceProvider
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
      Map<String, Object> config;
      try
      {
        config = new HashMap<String, Object>();

        VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory.getInstance();
        VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();
        List<String> cookieList = helper.getSessionCookies();
        
        config.put("deploymentId", helper.getConfigDeploymentId());
        config.put("versionStamp", VersionStamp.INSTANCE.getVersionStamp());
        config.put("sessionCookies", cookieList);
                
        if (helper.getExposeEmail())
          config.put("exposeEmail", Boolean.TRUE);
        if (helper.getForceConfidentialCommunications())
          config.put("forceConfidentialCommunications", Boolean.TRUE);
        if (helper.getLanguageSensitivity())
          config.put("languageSensitivity", Boolean.TRUE);
        if (provider.isMultiTenantConfigEngineEnabled())
          config.put("multiTenantEnabled", Boolean.TRUE);

        config.put("enableEmail", new EmailSettingsBean().isEnabled());
      }
      catch (VenturaConfigException e)
      {
        throw new RuntimeException(e);
      }

      return config;
    }
  }
}
