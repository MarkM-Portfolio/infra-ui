/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2007, 2012                                    
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */
package com.ibm.lconn.atom.config;

import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import com.ibm.lconn.core.customization.ApplicationCustomization;


/**
 * This class is a bundle wrapping class for configure.properties. The configure
 * file configure.properties includes some options which should NOT be set or
 * modified by end users and specifies informations about the internal context
 * url of the Atom or APP interface.
 * 
 * 
 * @author Alan Cui (cuicai@cn.ibm.com)
 * 
 */
public class ServiceConfiguration  {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private static final String BUNDLE_NAME = "configure"; //$NON-NLS-1$

	private static ResourceBundle RESOURCE_BUNDLE = null;

	private ServiceConfiguration() {
	}
	
	public static void setHandler(AbstractConfigurationHandler handler) {
		RESOURCE_BUNDLE = handler;
	}

	public static String getString(String key) {
		if(RESOURCE_BUNDLE == null) {
			//RESOURCE_BUNDLE = ResourceBundle.getBundle(BUNDLE_NAME);
			RESOURCE_BUNDLE = ApplicationCustomization.getInstance().getBundle(BUNDLE_NAME, Locale.getDefault());
		}
		try {
			return RESOURCE_BUNDLE.getString(key);
		} catch (MissingResourceException e) {
			return '!' + key + '!';
		}
	}
}
