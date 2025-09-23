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

package com.ibm.lconn.common.admintasks.mbean;

import static java.util.logging.Level.FINER;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashSet;
import java.util.List;
import java.util.Collection;
import java.util.Set;
import java.util.logging.Logger;


import com.ibm.lconn.news.activitystreams.service.util.AsUtil;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

/**
 * @author tonycal3@ie.ibm.com 
 * @see ConnectionsConfigServiceMBean
 */
public class ConnectionsConfigService implements ConnectionsConfigServiceMBean
{
	private static String CLASS_NAME = ConnectionsConfigService.class.getName();
	private static Logger logger = Logger.getLogger(CLASS_NAME);
	
	private static String USAGE = "Please set the string parameter to true or false";
	private static String CHECK = "Please check your input parameters";
	
	protected enum Types
	{
		OPENSOCIAL("opensocial"), 
		NEWS("news"), 
		PROFILES("profiles"), 
		COMMUNITIES("communities"), 
		ECM("ecm"), // currently there is no ecm property in LotusConnections-config.xml, so this may have to be revised. TODO
		FILES("files");
		
		String value = null;
		
		Types(String input)
		{ value = input; }
		
		public String toString()
		{ return value;	}
	}
	
	public ConnectionsConfigService(){ init(); }
	
	public void init(){}

	/* (non-Javadoc)
	 * @see com.ibm.lconn.news.admintasks.mbean.ConnectionsConfigServiceMBean#getServiceUrl(java.lang.String, java.lang.String)
	 */
	public String getServiceUrl(String service, String isSecure)
	{
		if (logger.isLoggable(FINER)) logger.entering(CLASS_NAME, "getServiceUrl", new Object[] { service,
				isSecure });
		
		String output = null;
		
		if ((service != null) && (isSecure != null))
			output = AsUtil.getComponentUrl(service, Boolean.parseBoolean(isSecure));
			
		if (output == null)
			output =  "The service " + service + " was not found.";
		
		if (logger.isLoggable(FINER)) logger.exiting(CLASS_NAME, "getServiceUrl", output);
		
		return output;
	}

	/* (non-Javadoc)
	 * @see com.ibm.lconn.news.admintasks.mbean.ConnectionsConfigServiceMBean#listAllHostNamesInConfig(java.lang.String)
	 */
	public Set<String> listAllHostnamesInConfig(String isSecure)
	{
		if (logger.isLoggable(FINER))
		{
			logger.entering(CLASS_NAME,
			                "listAllHostNamesInConfig",
			                new Object[] { isSecure });
		}
		
		Set<String> output = null;
		
		if (isSecure != null)
			output = listAllHostnamesInConfig(false, Boolean.parseBoolean(isSecure));
		else 
		{
			output = (new HashSet<String>());
			output.add(USAGE);
		}
		
		if (logger.isLoggable(FINER)) logger.exiting(CLASS_NAME, "listAllHostNamesInConfig", output);
		
		return output;
	}
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.news.admintasks.mbean.ConnectionsConfigServiceMBean#listAllAllowedConnectionsASHostName(java.lang.String)
	 */
	public Set<String> listAllAllowedConnectionsASHostnames(String secure)
	{
		if (logger.isLoggable(FINER)) 
		{
			logger.entering(CLASS_NAME,
			                "listAllAllowedConnectionsASHostName",
			                new Object[] { secure });
		}
		
		
		Set<String> output = null;
		
		if (secure != null)
		{
			Types types[] = Types.values();
			
			Collection<String> components = new HashSet<String>();
			
			for (int i = 0; i < types.length; i++)
				components.add(types[i].toString());
			
			listAllHostnamesforComponentsInternal(components, false,  Boolean.parseBoolean(secure));
		}
		else 
		{
			output = new HashSet<String>();
			output.add(USAGE);
		}
		
		if (logger.isLoggable(FINER)) logger.exiting(CLASS_NAME, "listAllAllowedConnectionsASHostName", output);
		
		return output;
	}
	
	/**
	 * Convenience internal method, it retrieves a list of all components then invokes 
	 * listAllHostNamesforComponentsInternal to return the list of hostnames. 
	 * 
	 * @param secure	A boolean indicating whether to prefix the hostnames with http or https.
	 * @return			A Set of hostnames with their prefix. 
	 */
	private Set<String> listAllHostnamesInConfig(boolean path, boolean secure)
	{
		Collection<String> components = VenturaConfigurationHelper.Factory.getInstance().getInstalledComponents();
		
		return listAllHostnamesforComponentsInternal(components, path,  secure);
	}
	
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.news.admintasks.mbean.ConnectionsConfigServiceMBean#listAllHostnamesforComponents(java.util.Collection, java.lang.String)
	 */
	public Set<String> listAllHostnamesforComponents(List<String> components, String secure)
	{
		if (logger.isLoggable(FINER)) logger.entering(CLASS_NAME, "listAllHostnamesforComponents", new Object[] {
				components, secure });
		
		Set<String> output = null;
		
		if ((components != null) && !(components.isEmpty()) && (secure != null))
			output = listAllHostnamesforComponentsInternal(components, false,  Boolean.parseBoolean(secure));
		else 
		{
			output = new HashSet<String>();
			output.add(CHECK);
		}
		
		if (logger.isLoggable(FINER)) logger.exiting(CLASS_NAME, "listAllHostnamesforComponents", output);
		
		return output;
	}
	
	
	/**
	 * Convenience method to take a Collection of components and return a distinct list of corresponding hostnames, 
	 * with prefixes dictated by the parameter secure. 
	 * 
	 * @param components	The Collection of components for whom we are to retrieve hostnames and prefixes. 
	 * @param secure		Param that determines whether to http or https. 
	 * @return				A Set of distinct hostnames. 
	 */
	private Set<String> listAllHostnamesforComponentsInternal(Collection<String> components, boolean path, boolean secure)
	{
		Set<String> output = new HashSet<String>();
		
		if ((components != null) && (!(components.isEmpty())))
		{
			for (String component : components)
			{
				String url = AsUtil.getComponentUrl(component, secure);
				
				if ((url != null) && !(url.trim().isEmpty()))
				{
					try
					{
						URL baseUrl = new URL(url);
						if (baseUrl != null)
						{
							if (path)
								url = baseUrl.toString();
							else 
							{
								url = baseUrl.getProtocol();
								url += "://";
								url += baseUrl.getHost();
							}
							
							output.add(url);
						}
					} catch (MalformedURLException e)
					{
						// ignore url and continue
					}
				}
			}
		}
		
		return output;
	}

	/* (non-Javadoc)
	 * @see com.ibm.lconn.common.admintasks.mbean.ConnectionsConfigServiceMBean#listAllServiceHostnamesInConfig(java.lang.String)
	 */
	public Set<String> listAllServiceHostnamesInConfig(String isSecure)
	{
		if (logger.isLoggable(FINER))
		{
			logger.entering(CLASS_NAME,
			                "listAllComponentHostnamesInConfig",
			                new Object[] { isSecure });
		}
		
		Set<String> output = null;
		
		if (isSecure != null)
		{
			output = listAllHostnamesInConfig(true, Boolean.parseBoolean(isSecure));
		}
		else
		{
			output = new HashSet<String>();
			output.add(USAGE);
		}
		
		if (logger.isLoggable(FINER)) logger.exiting(CLASS_NAME, "listAllComponentHostnamesInConfig", output);
		
		return output;
	}

	/* (non-Javadoc)
	 * @see com.ibm.lconn.common.admintasks.mbean.ConnectionsConfigServiceMBean#listAllServiceHostnamesInConfigforServices(java.util.List)
	 */
	public Set<String> listAllServiceHostnamesInConfigforServices(List<String> services, String secure)
	{
		Set<String> output = null;
		
		if ((services != null) && (!(services.isEmpty())) && (secure != null))
			output = listAllHostnamesforComponentsInternal(services, true, Boolean.parseBoolean(secure));
		else 
		{
			output = new HashSet<String>();
			output.add(CHECK);
		}
		
		return output;
	}
}
