/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.config;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

import com.ibm.lconn.core.config.services.Services;
import com.ibm.lconn.core.config.StylesheetConfig;
import com.ibm.lconn.core.config.GenericProperties;;

public class Activator implements BundleActivator {

	private static final String CLASS_NAME = Activator.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	private static BundleContext context;

	public void start(BundleContext context) throws Exception {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER
					.entering(CLASS_NAME, "start(BundleContext context)",
							context);
		}

		Activator.context = context;

		if (LOGGER.isLoggable(Level.FINE)) {
			LOGGER.logp(Level.FINE, Activator.class.getName(), "start",
					"Initializing bundle {0} [{0}_{1}]", new Object[]{context
							.getBundle().getSymbolicName()});
		}

		Services.init();
		VersionStamp.init();
		StylesheetConfig.init();
		GenericProperties.init();

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "start(BundleContext context)");
		}
	}

	public void stop(BundleContext context) throws Exception {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "stop(BundleContext context)", context);
		}

		Activator.context = null;

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "stop(BundleContext context)");
		}
	}

}
