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
import java.io.StringWriter;
import java.io.IOException;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.lconn.core.web.resources.map.ConfigurationMapResource;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;
/**
 * Generates a Javascript wrapper for LanguageSelector properties
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
public class LanguageSettings extends ResourceProvider
{
  private static class Keys {
    public static final String ENABLED = "enabled"; //$NON-NLS-1$
    
    public static final String COOKIE_NAME = "cookieName"; //$NON-NLS-1$
    
    public static final String COOKIE_DOMAIN = "cookieDomain"; //$NON-NLS-1$
    
    public static final String COOKIE_TIMEOUT = "cookieTimeout"; //$NON-NLS-1$
    
    public static final String DEFAULT_LANGUAGE = "defaultLanguage"; //$NON-NLS-1$
    
    public static final String LANGUAGES = "languages"; //$NON-NLS-1$
    
    public static final String LANGUAGES_AS_JSON = "languagesAsJson"; //$NON-NLS-1$
  };
  
  public Resource provide(String id)
  {
    return new LanguageSettingsResource(id);
  }

  private static class LanguageSettingsResource extends ConfigurationMapResource
  {
    private VenturaConfigurationHelper.LanguageSelectorSettings settings;
    
    public LanguageSettingsResource(String id)
    {
      super(id);
      settings = VenturaConfigurationHelper.Factory.getInstance().getLanguageSelectorSettings();
    }

    @Override
    protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
    {
      Map<String, Object> langConfig = new HashMap<String, Object>();
      
      langConfig.put(Keys.ENABLED, settings.isEnabled());
      langConfig.put(Keys.COOKIE_NAME, settings.getCookieName());
      langConfig.put(Keys.COOKIE_DOMAIN, settings.getCookieDomain());
      langConfig.put(Keys.COOKIE_TIMEOUT, settings.getCookieTimeout());
      langConfig.put(Keys.DEFAULT_LANGUAGE, settings.getDefaultLanguage());
      langConfig.put(Keys.LANGUAGES_AS_JSON, settings.getLanguagesAsJSONString());
      
      return langConfig;
    }
    
    @Override
    protected CharSequence content(RenderContext context) throws IOException
    {
      CharSequence cs = super.content(context);

      StringWriter sb = new StringWriter();
      sb.append(cs).append(getId()).append(".").append(Keys.LANGUAGES).append("=dojo.fromJson(").append(getId()).append(".").append(Keys.LANGUAGES_AS_JSON).append(");\n");
      return sb.getBuffer();
    }
  }
}
