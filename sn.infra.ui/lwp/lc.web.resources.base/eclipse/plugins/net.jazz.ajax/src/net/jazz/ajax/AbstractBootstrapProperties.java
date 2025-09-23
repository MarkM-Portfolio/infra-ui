/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax;

import java.util.Locale;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public abstract class AbstractBootstrapProperties 
{
	private static final Log LOG = LogFactory.getLog(AbstractBootstrapProperties.class);
	
	/**
	 * @return the name of this type of application. 
	 * This is the title of the application. 
	 * It MUST the same for all installations of a given version of an application and a particular locale. 
	 * 
	 * Application names include:
	 *   Change and Configuration Management
	 *   Requirements Management
	 *   Quality Management
	 *   
	 * @param locale locale of the application name. 
	 *  
	 * @throws RuntimeException any exceptions thrown by implementors be caught, logged, and a null value assumed 
	 */
	public String getApplicationName(Locale locale) {
		LOG.error("BootstrapProperties.getApplicationName not implemented");
		return System.getProperty(BootstrapProperties.PROPERTY_APP_NAME);
	}
	
	/**
	 * @return Identifer This is a URI which identifies the application. 
	 * It MUST be the same for all installations and versions of an Application. 
	 *   
	 * @throws RuntimeException any exceptions thrown by implementors be caught, logged, and a null value assumed 
	 */
	public String getApplicationIdentifier(){
		LOG.error("BootstrapProperties.getApplicationIdentifier not implemented");
		return System.getProperty(BootstrapProperties.PROPERTY_APP_IDENTIFIER);
	}


	/**
	 * @return This is the version of the application. Its format is application specific and undefined. 
	 * It SHOULD change for each version and revision an installed application.  
    *
	 * @param locale locale for the version. The version MAY be language-sensitive. 
	 * If it is not then locale should be ignored. 
    *   
	 * @throws RuntimeException any exceptions thrown by implementors be caught, logged, and a null value assumed 
	 */

	public String getApplicationVersion(Locale locale){
		LOG.error("BootstrapProperties.getApplicationVersion not implemented");
		return System.getProperty(BootstrapProperties.PROPERTY_APP_VERSION);
	}

	/**
	 * @return Description of the application. 
	 * 
	 * @param locale locale of the description. 
	 *  
	 * @throws RuntimeException any exceptions thrown by implementors be caught, logged, and a null value assumed 
	 */
	
	public String getApplicationDescription(Locale locale){
		LOG.error("BootstrapProperties.getApplicationDescription not implemented");
		return System.getProperty(BootstrapProperties.PROPERTY_APP_DESCRIPTION);
	}

	/**
	 * @return Icon for the application. 
	 * 
	 * @throws RuntimeException any exceptions thrown by implementors be caught, logged, and a null value assumed 
	 */
	
	public String getApplicationIconUrl(){
		LOG.error("BootstrapProperties.getApplicationIconUrl  not implemented");
		return System.getProperty(BootstrapProperties.PROPERTY_APP_ICON);
	}
	
	/**
	 * @return the URL of the JTS discovery services with which this application is affiliated.
	 * 
	 * @param contextPath the context path (e.g. /jazz) is which may be used to calculate the 
	 * discovery service Url. Use of this parameter is not required or expected.
	 * 
	 * @see An overview of the discovery service spec:
	 * <a href="https://jazz.net/wiki/bin/view/Main/DiscoveryServiceSpecifications">
	 * https://jazz.net/wiki/bin/view/Main/DiscoveryServiceSpecifications
	 * </a>  

	 * @throws RuntimeException any Exceptions thrown by implementors will be treated as fatal.  
     * These exceptions will be caught, logged, wrapped and re-thrown.
	 * 
	 */
	public String getDiscoveryServiceUrl(String contextPath) {
		LOG.error("BootstrapProperties.getDiscoveryServiceUrl not implemented");
		return System.getProperty(BootstrapProperties.PROPERTY_DISCOVERYSERVICE_URL);
	}

	/**
     * @return URL prefix which should be used to create URLs that are exposed in other resources.
     * 
     * It should be a complete URL prefix including protocol, server, port and path up to and 
     * including the root context of the application. It MUST NOT end with a trailing '/'
     * <p>
     * Examples:
     * <ul>
     * 	<li>https://www.jazz.net/jazz</li>
     * 	<li>https://localhost:9443/jazz</li>
     * </ul>
     * 
     * It should return null if no front side URL has been specified. In this case the an coming request will be used
     * to create any URLs exposed in resources.
     * 
	 * @throws RuntimeException any Exceptions thrown by implementors will not be treated as fatal.  
     * These exceptions will be caught, logged, wrapped and a null value will be assumed.
     *
	 */
	public String getFrontsideUrl() {
		LOG.error("BootstrapProperties.getFrontsideUrl not implemented");
		return System.getProperty(BootstrapProperties.PROPERTY_FRONTSIDE_URL);
	}
	
	
	public String getApplicationAuthToken() {return null;}

}
