/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.oauth.web.resources.config;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.ic.core.web.resources.map.ConfigurationMapResource;
import com.ibm.lconn.oauth.platform.config.LCProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

/**
 * Resource provider that exposes useful Connections OAuth configuration values to the JS context
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
public class OAuthConfig extends ResourceProvider
{
  public class OAuthConfigurationMap extends ConfigurationMapResource
  {
    private static final String MAX_AUTHORIZATION_GRANT_LIFETIME_SECONDS = "maxAuthorizationGrantLifetimeSeconds"; //$NON-NLS-1$

    private static final String TOKEN_LIFETIME_SECONDS = "tokenLifetimeSeconds"; //$NON-NLS-1$

    private static final String REFRESH_TOKEN_LENGTH = "refreshTokenLength"; //$NON-NLS-1$

    private static final String ACCESS_TOKEN_LENGTH = "accessTokenLength"; //$NON-NLS-1$

    private static final String PUBLIC_CLIENTS_ALLOWED = "publicClientsAllowed"; //$NON-NLS-1$

    private static final String ALLOWED_GRANT_TYPES = "allowedGrantTypes"; //$NON-NLS-1$

    private static final String DISABLE_UI = "disableUI"; //$NON-NLS-1$

    private static final String DEFAULT_CLIENTS = "defaultClients"; //$NON-NLS-1$

    private static final String PROVIDER_NAME = "providerName"; //$NON-NLS-1$

    private static final String UI_ENABLED_PROPERTY_NAME = "com.ibm.lconn.oauth.ui.enabled"; //$NON-NLS-1$

    public OAuthConfigurationMap(String id)
    {
      super(id);
    }

    /*
     * (non-Javadoc)
     * 
     * @see com.ibm.lconn.core.web.resources.map.ConfigurationMapResource#createConfigurationMap(net.jazz.ajax.model.RenderContext)
     */
    @Override
    protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
    {
      Map<String, Object> config;
      try
      {
        // Ensure provider is initialized in this JVM
        LCProvider.init();
        // Obtain a reference to the provider instance
        LCProvider provider = LCProvider.getInstance();

        config = new HashMap<String, Object>();
        // Add useful config settings
        config.put(PROVIDER_NAME, LCProvider.getName());
        putIfNotNull(config, DEFAULT_CLIENTS, LCProvider.getDefaultClientIds());
        putIfNotNull(config, ALLOWED_GRANT_TYPES, provider.getAllowedGrantTypes());
        config.put(PUBLIC_CLIENTS_ALLOWED, provider.arePublicClientsAllowed());
        config.put(ACCESS_TOKEN_LENGTH, provider.getAccessTokenLength());
        config.put(REFRESH_TOKEN_LENGTH, provider.getRefreshTokenLength());
        config.put(TOKEN_LIFETIME_SECONDS, provider.getTokenLifetimeSeconds());
        config.put(MAX_AUTHORIZATION_GRANT_LIFETIME_SECONDS, provider.getMaxAuthorizationGrantLifetimeSeconds());
        putIfTrue(config, DISABLE_UI, getDisableUIProperty());
      }
      catch (Exception e)
      {
        throw new RuntimeException(e);
      }
      return config;
    }

    private boolean getDisableUIProperty()
    {
      try
      {
        Properties props = VenturaConfigurationHelper.Factory.getInstance().getGenericProperties();

        Enumeration<Object> keys = props.keys();

        while (keys.hasMoreElements())
        {
          String key = (String) keys.nextElement();

          if (key.equals(UI_ENABLED_PROPERTY_NAME))
            return !Boolean.valueOf(props.getProperty(key));
        }
      }
      catch (VenturaConfigHelperException e)
      {
        throw new RuntimeException(e);
      }
      return false;
    }

    /**
     * Puts a boolean in the map only if true
     * 
     * @param map
     *          The map
     * @param key
     *          The key
     * @param value
     *          The value
     */
    private void putIfTrue(Map<String, Object> map, String key, boolean value)
    {
      if (value)
        map.put(key, value);
    }

    /**
     * Puts an object in the map only if not null
     * 
     * @param map
     *          The map
     * @param key
     *          The key
     * @param value
     *          The value
     */
    private void putIfNotNull(Map<String, Object> map, String key, Object value)
    {
      if (value != null)
        map.put(key, value);
    }
  }

  @Override
  public Resource provide(String id)
  {
    return new OAuthConfigurationMap(id);
  }

}
