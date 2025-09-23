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

package com.ibm.lconn.core.config.services;

import java.net.URL;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class Services {

	private static VenturaConfigurationProvider provider;
	public static String COMMON_PATH = null;
	public static String COMMON_PATH_SECURE = null;
	public static String CONTEXT_ROOT;

	private static Map<String, Object> services;
	private static final String WEBRESOURCES = "webresources";

	public static void init() {

		try {
			provider = VenturaConfigurationProvider.Factory.getInstance();
		} catch (VenturaConfigException e) {
			throw new VenturaConfigHelperException(e);
		}

		try {
			VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory
					.getInstance();
			Collection<String> serviceNames = helper.getInstalledComponents();

			services = new HashMap<String, Object>();
			for (String serviceName : serviceNames) {
				boolean isEnabled = provider.isServiceEnabled(serviceName);
				if (!isEnabled)
					continue;

				Map<String, Object> service = new HashMap<String, Object>();
				services.put(serviceName, service);
			}
			URL commonUrl = provider.getServiceURL(WEBRESOURCES);
			COMMON_PATH = commonUrl.toString();
			URL commonSecureUrl = provider.getSecureServiceURL(WEBRESOURCES);
			COMMON_PATH_SECURE = commonSecureUrl.toString();
			CONTEXT_ROOT = provider.getHrefPathPrefix(WEBRESOURCES);
		} catch (VenturaConfigHelperException e1) {
			throw new RuntimeException(e1);
		} catch (VenturaConfigException e2) {
			throw new RuntimeException(e2);
		}
	}
	
	// For runtime check in MT environment
	public static String getServiceUrl(boolean secure)
	{
		String ret = null;
		try {
			ret = secure ? provider.getSecureServiceURL(WEBRESOURCES).toString() : provider.getServiceURL(WEBRESOURCES).toString();
		} catch (VenturaConfigException e) {
			throw new RuntimeException(e);
		}
		return ret;
	}
}
