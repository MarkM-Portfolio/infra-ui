/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.core.services.cre.web.resources.config;

import java.util.HashMap;
import java.util.Map;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.lconn.core.services.cre.core.config.settings.DeveloperSettings;
import com.ibm.lconn.core.services.cre.core.config.settings.SecuritySettings;
import com.ibm.lconn.core.web.resources.map.ConfigurationMapResource;

/**
 * Inject settings into JS
 * @author Michael Ahern (michael.ahern@ie.ibm.com)
 */
public class Settings extends ResourceProvider {

	/*
	 * Results in:
	 * 
	 * {
	 * 		"developer" : 
	 * 			{
	 * 				"enabled" : <boolean>,
	 * 				"allowSSOFeature" : <boolean>,
	 * 				"allowIntranetProxyAccess" : <boolean>
	 *			}
	 * 		"security" :
	 * 			{
	 * 				"whiteListEnabled" : <boolean>,
	 * 				"featureAdminEnabled" : <boolean>,
	 * 				"ssoDomain" : <sso-domain>,
	 * 				"containerTokenTTLSec" : <seconds>,
	 * 				"containerTokenCheckSec" : <seconds>,
	 * 				"gadgetTokenTTLSec" : <seconds>,
	 * 				"transientErrorRetryIntervalSec" : <seconds>
	 * 				"authErrorRetryIntervalSec" : <seconds>,
	 * 				"urlWhitelistEnabled" : <boolean>,
	 * 				"allowUrlCheckPattern" : "<string-of-regexp-for-url-checking>"
	 * 			}
	 * }
	 */
	private static class SettingsResource extends ConfigurationMapResource {

		public SettingsResource(String id) {
			super(id);
		}

		@Override
		protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException 
		{
			final Map<String, Object> m = new HashMap<String, Object>();
			m.put("developer", developerSettings());	
			m.put("security", securitySettings());
			return m;
		}
		
		private Map<String, Object> developerSettings() {
			final DeveloperSettings config = DeveloperSettings.instance();
			
			final Map<String,Object> m = new HashMap<String,Object>();
			m.put("enabled", config.isEnabled());
			m.put("allowSSOFeature", config.isAllowSSOFeature());
			m.put("allowIntranetProxyAccess", config.isAllowIntranetProxyAccess());
			
			return m;
		}
		
		private Map<String, Object> securitySettings() {
			final SecuritySettings config = SecuritySettings.instance();
			
			final Map<String,Object> m = new HashMap<String,Object>();
			m.put("whiteListEnabled", config.isWhiteListEnabled());
			m.put("featureAdminEnabled", config.isFeatureAdminEnabled());
			
			m.put("ssoDomain", config.getSSODomain());
			
			m.put("containerTokenTTLSec", config.getContainerTokenTTLSec());
			m.put("containerTokenCheckSec", config.getContainerTokenCheckSec());
			m.put("gadgetTokenTTLSec", config.getGadgetTokenTTLSec());
			m.put("transientErrorRetryIntervalSec", config.getTransientErrorRetryIntervalSec());
			m.put("authErrorRetryIntervalSec", config.getAuthErrorRetryIntervalSec());
			
			m.put("urlWhitelistEnabled", config.isUrlWhitelistEnabled());
			m.put("allowUrlCheckPattern", config.getAllowUrlCheckPattern().pattern());
			m.put("preloadJS", config.getPreloadJS());
			m.put("preloadJSSafari", config.getPreloadJSSafari());
			
			return m;
		}
		
	}
	
	/* (non-Javadoc)
	 * @see net.jazz.ajax.model.ResourceProvider#provide(java.lang.String)
	 */
	@Override
	public Resource provide(String id) {
		return new SettingsResource(id);
	}

}
