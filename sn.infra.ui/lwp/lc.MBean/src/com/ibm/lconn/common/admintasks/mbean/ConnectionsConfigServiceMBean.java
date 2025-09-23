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

import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * Class that retrieves settings from LotusConnections-config.xml 
 * 
 * @author tonycal3@ie.ibm.com
 */
public interface ConnectionsConfigServiceMBean extends IServiceMBean
{
	/**
	 * Method that returns the hostname for the service or application specified. 
	 * 
	 * @param service		The service to lookup. 
	 * @param isSecure		Whether to return the prefix of http vs https, pass in a string "true" for https.
	 * 						"false" for http. 
	 * @return				The hostname and prefix for the service. 
	 */
	public String getServiceUrl(String service, String isSecure);
	
	/**
	 * Method that iterates through all the components listed in LotusConnections-config.xml and then aggregates
	 * all distinct hostnames  
	 * 
	 * @param isSecure		A string "true" or "false" indicating whether to return http or https
	 * @return				The hostname with prefix for the service. 
	 */
	public Set<String> listAllHostnamesInConfig(String isSecure);
	
	/**
	 * Retrieves the distinct hostnames for:
	 * opensocial, news, profiles, communities, ecm, and files. 
	 * 
	 * @param secure		A string param that indicates whether to return http or https. 
	 * @return				A set containing the distinct hostnames. 
	 */
	public Set<String> listAllAllowedConnectionsASHostnames(String secure);
	
	/**
	 * Retrieves all urls from all services in LotusConnections-config.xml
	 * 		
	 * @param isSecure		A string param that can be parsed into a Boolean. 
	 * @return				A list of all distinct urls in the 
	 */
	public Set<String> listAllServiceHostnamesInConfig(String isSecure);
	
	/**
	 * Retrieves all the urls from the specified services. 
	 * 
	 * @param services		A list of services for whom we are to retrieve urls. 
	 * @param secure		A string param that can be parsed into a Boolean. 
	 * @return				A list of distinct urls for the services specified. 
	 */
	public Set<String> listAllServiceHostnamesInConfigforServices(List<String> services, String secure);
	/**
	 * Retrieves a Set of distinct hostnames for the components specified. 
	 * 
	 * @param components 	A Collection of components for whom we are to retrieve the hostname. 
	 * @param secure	 	A string that indicates whether to return http or https.
	 * @return				A set containing the distinct hostnames. 
	 */
	public Set<String> listAllHostnamesforComponents(List<String> components, String secure);
}
