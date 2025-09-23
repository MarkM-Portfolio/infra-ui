/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2012                                    */
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
package net.jazz.ajax.tests.bootstrapProperties;

import java.util.Locale;

import net.jazz.ajax.AbstractBootstrapProperties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class TestBootstrapProperties extends AbstractBootstrapProperties
{
	private static final Log LOG = LogFactory.getLog(TestBootstrapProperties.class);

	/*
	 * This is bogus as we don't know where this will be but its ok for testing
	 */

	public String getDiscoveryServiceUrl(String contextPath) {
		LOG.warn("Getting discovery service url from TestBootstrapProperties, contextPath:"+contextPath);
		return "https://localhost:9443/jazz/DiscoveryService";
	}
	public String getFrontsideUrl() {
		LOG.warn("Getting frontside url from TestBootstrapProperties");
		return "https://localhost:9443/jazz";
	}

	public String getApplicationName(Locale locale) {
		LOG.warn("Getting application Name from TestBootstrapProperties");
		return "bogus application name";
	}

	public String getApplicationIdentifier() {
		LOG.warn("Getting application Identifier from TestBootstrapProperties");
		return "bogus identifer";
	}
	
	public String getApplicationDescription(Locale locale) {
		LOG.warn("Getting application Description from TestBootstrapProperties");
		return "bogus application description";
	}
	public String getApplicationVersion(Locale locale) {
		LOG.warn("Getting application version from TestBootstrapProperties");
		return "bogus application version";
	}

}
