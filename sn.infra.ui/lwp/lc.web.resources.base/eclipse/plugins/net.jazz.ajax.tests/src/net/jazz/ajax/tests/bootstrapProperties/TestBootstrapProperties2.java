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

public class TestBootstrapProperties2 extends AbstractBootstrapProperties
{
	private static final Log LOG = LogFactory.getLog(TestBootstrapProperties2.class);

	/*
	private static final Log LOG = LogFactory.getLog(TestBootstrapProperties.class);

	/*
	 * This is bogus as we don't know where this will be but its ok for testing
	 */

	public String getDiscoveryServiceUrl(String contextPath) {
		LOG.warn("Getting discovery service url from TestBootstrapProperties, contextPath:"+contextPath);
		return "https://localhost:9443/jazz/DiscoveryService2";
	}
	public String getFrontsideUrl() {
		LOG.warn("Getting frontside url from TestBootstrapProperties2");
		return "https://localhost:9443/jazz2";
	}

	public String getApplicationName(Locale locale) {
		LOG.warn("Getting application Name from TestBootstrapProperties2");
		return "bogus application name 2";
	}

	public String getApplicationIdentifier() {
		LOG.warn("Getting application Identifier from TestBootstrapProperties2");
		return "bogus identifer 2";
	}
	
	public String getApplicationDescription(Locale locale) {
		LOG.warn("Getting application Description from TestBootstrapProperties2");
		return "bogus application description 2";
	}
	public String getApplicationVersion(Locale locale) {
		LOG.warn("Getting application version from TestBootstrapProperties2");
		return "bogus application version 2";
	}
}
