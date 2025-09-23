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

package net.jazz.ajax.internal.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.osgi.framework.Bundle;

import net.jazz.ajax.internal.AjaxFramework;

public class NLSMessages {
	static final Map<Triple<Bundle, Locale, String>, String> messages = Collections.synchronizedMap(new HashMap());
	static final TraceSupport LOGGER = TraceSupport.create(NLSMessages.class.getName());
	
	public static String getMessage(String key, Locale locale) {
		return getMessage(AjaxFramework.bundle(), key, locale);
	}

	public static String getMessage(Bundle bundle, String key, Locale locale) {
		Triple<Bundle, Locale, String> triple = Triple.create(bundle, locale, key);
		String result = messages.get(triple);
		if (result == null) {
			try {
				result = AjaxFramework.bundleLocalization().getLocalization(bundle, locale.toString()).getString(key);
			} catch (Exception e) {
				LOGGER.error("Unable to translate \"", key, "\" for locale: \"", locale + "\"");
				result = key;
			}
			messages.put(triple, result);
		}
		return result;
	}
}
