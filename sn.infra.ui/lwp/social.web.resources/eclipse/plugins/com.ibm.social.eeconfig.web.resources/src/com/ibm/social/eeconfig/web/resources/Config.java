/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.social.eeconfig.web.resources;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.configuration.XMLConfiguration;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.lconn.core.web.resources.map.ConfigurationMapResource;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

/**
 * Generate service configuration
 * 
 */
public class Config extends ResourceProvider
{
  private static final String OPENSOCIAL_CONFIG_ID = "opensocial-config";

  private static final String LIBRARY_CONFIG_ID = "library";

  private static final String USE_SSO_KEY = "connections-ee-settings[@useSSO]";
  
  private static final String IS_ANONYMOUS_ALLOWED_KEY = "connections-ee-settings[@isAnonymousAllowed]";

  private static final String JS_TRACE_KEY = "connections-ee-settings[@jsTrace]";

  private static final String POPUP_RESIZING_KEY = "com.ibm.connections.ee.PopupResizing";

  private static final String COMMENT_LIKES_PROPERTY = "com.ibm.lconn.microblogging.inlineLiking";

  private static final String AT_MENTIONS_PROPERTY = "com.ibm.connections.ublog.AtMentionsEnabled";

  private static final String ECM_OAUTH_PROPERTY = "com.ibm.connections.ecm.OAuthEnabled";

  public Resource provide(String id)
  {
    return new EEConfigurationResource(id);
  }

  private static class EEConfigurationResource extends ConfigurationMapResource
  {

    private static final XMLConfiguration OPENSOCIAL_CONFIG;

    private static final XMLConfiguration LIBRARY_CONFIG;

    private static final VenturaConfigurationHelper CONFIG_HELPER;

    static
    {
      CONFIG_HELPER = VenturaConfigurationHelper.Factory.getInstance();
      try
      {
        VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();
        OPENSOCIAL_CONFIG = (XMLConfiguration) provider.getConfiguration(OPENSOCIAL_CONFIG_ID);
        LIBRARY_CONFIG = (XMLConfiguration) provider.getConfiguration(LIBRARY_CONFIG_ID);
      }
      catch (VenturaConfigException e)
      {
        throw new VenturaConfigHelperException(e);
      }
    }

    public EEConfigurationResource(String id)
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
        boolean useSSO = false;
        if (OPENSOCIAL_CONFIG.containsKey(USE_SSO_KEY))
        {
          useSSO = OPENSOCIAL_CONFIG.getBoolean(USE_SSO_KEY);
        }
        config.put("useSSO", useSSO);

        boolean isAnonymousAllowed = true;
        if (OPENSOCIAL_CONFIG.containsKey(IS_ANONYMOUS_ALLOWED_KEY))
        {
        	isAnonymousAllowed = OPENSOCIAL_CONFIG.getBoolean(IS_ANONYMOUS_ALLOWED_KEY);
        }
        config.put("isAnonymousAllowed", isAnonymousAllowed);
        
        String jsTrace = "";
        if (OPENSOCIAL_CONFIG.containsKey(JS_TRACE_KEY))
        {
          useSSO = OPENSOCIAL_CONFIG.getBoolean(JS_TRACE_KEY);
        }
        config.put("jsTrace", jsTrace);

        Properties props = CONFIG_HELPER.getGenericProperties();
        boolean commentLikesEnabled = true;
        config.put("commentLikes", commentLikesEnabled);

        boolean mentionsEnabled = true;
        config.put("mentionsEnabled", mentionsEnabled);

        boolean eme = mentionsEnabled && LIBRARY_CONFIG.getBoolean("allowMentions", false);
        config.put("ecmMentionsEnabled", eme);

        boolean ecmOAuth = false;
        if (!useSSO && props.containsKey(ECM_OAUTH_PROPERTY))
        {
          String value = props.getProperty(ECM_OAUTH_PROPERTY).toLowerCase();
          if ("true".equals(value) || "enabled".equals(value))
            ecmOAuth = true;
        }
        config.put("ecmOAuth", ecmOAuth);

        boolean popupResizing = true;
        if (props.containsKey(POPUP_RESIZING_KEY))
        {
          String value = props.getProperty(POPUP_RESIZING_KEY).toLowerCase();
          if ("false".equals(value) || "disabled".equals(value))
            popupResizing = false;
        }
        config.put("popupResizing", popupResizing);
      }
      catch (Exception e)
      {
        throw new RuntimeException(e);
      }
      return config;
    }
  }
}
