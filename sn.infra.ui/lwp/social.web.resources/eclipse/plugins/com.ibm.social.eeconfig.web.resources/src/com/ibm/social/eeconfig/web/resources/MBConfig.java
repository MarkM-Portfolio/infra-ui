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
public class MBConfig extends ResourceProvider
{

  private static final String NEWS_CONFIG_ID = "news";

  private static final String PEOPLE_PICKER_PROPERTY = "com.ibm.lconn.microblogging.peoplePicker";

  private static final String MAX_ENTRY_CHARS_KEY = "microblogging-settings.microblogEntryMaxChars";

  private static final int DEFAULT_MAX_ENTRY_CHARS = 1000;

  public Resource provide(String id)
  {
    return new MicrobloggingConfigurationResource(id);
  }

  private static class MicrobloggingConfigurationResource extends ConfigurationMapResource
  {

    private static final VenturaConfigurationHelper CONFIG_HELPER;

    private static final XMLConfiguration NEWS_CONFIG;

    static
    {
      CONFIG_HELPER = VenturaConfigurationHelper.Factory.getInstance();
      try
      {
        VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();
        NEWS_CONFIG = (XMLConfiguration) provider.getConfiguration(NEWS_CONFIG_ID);
      }
      catch (VenturaConfigException e)
      {
        throw new VenturaConfigHelperException(e);
      }

    }

    public MicrobloggingConfigurationResource(String id)
    {
      super(id);
    }

    @Override
    protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
    {
      Map<String, Object> config;
      try
      {
        // Get people picker flag
        config = new HashMap<String, Object>();
        Properties props = CONFIG_HELPER.getGenericProperties();
        boolean peoplePickerEnabled = false;
        if (props.containsKey(PEOPLE_PICKER_PROPERTY))
        {
          String value = props.getProperty(PEOPLE_PICKER_PROPERTY).toLowerCase();
          if ("enabled".equals(value) || "true".equals(value))
          {
            peoplePickerEnabled = true;
          }
        }
        config.put("peoplePickerEnabled", peoplePickerEnabled);

        // Get the max post length
        config.put("maxNumberChars", NEWS_CONFIG.getInt(MAX_ENTRY_CHARS_KEY, DEFAULT_MAX_ENTRY_CHARS));
      }
      catch (Exception e)
      {
        throw new RuntimeException(e);
      }
      return config;
    }
  }
}
