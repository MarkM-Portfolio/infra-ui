/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2016                                    */
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

import java.util.Locale;

public class LocaleUtil {
	// CHANGED: null check, no/nb conversion
	public static Locale fromDojoString(String locale) {
		if (locale == null)
			return Locale.ENGLISH;
		else if (locale.equals("nb") || locale.equals("nb-no"))
			return new Locale("no");
		int index = locale.indexOf('-');
		if (index == -1)
			return new Locale(locale);
		return new Locale(locale.substring(0, index), locale.substring(index + 1));
	}
	
	// CHANGED: null check, locale conversions
	public static void toDojoString(StringBuilder result, Locale locale) {
		if (locale == null)
			locale = Locale.ENGLISH;
		String language = locale.getLanguage();
		if ("iw".equals(language))
			language = "he";
		// ADDED
		else if ("no".equals(language))
			language = "nb";
		else if ("in".equals(language))
			language = "id";
		else if ("sr_latn".equals(language))
			language = "sr";
		result.append(language);
		String country = locale.getCountry();
		if (!country.isEmpty()) {
			result.append('-');
			result.append(country.toLowerCase());
		}
	}

	// ADDED: null check, locale conversions
	public static void toURLParameters(StringBuilder result, Locale locale) {
		if (locale == null)
			locale = Locale.ENGLISH;
		String language = locale.getLanguage();
		String country = locale.getCountry();
		String variant = locale.getVariant();
		if ("iw".equals(language))
			language = "he";
		// ADDED
		else if ("no".equals(language))
			language = "nb";
		else if ("in".equals(language))
			language = "id";
		result.append("&lang=").append(language);
		if (country != null) {
			result.append("&country=").append(country);
			if (variant != null)
				result.append("&variant=").append(variant);
		}
	}

	// ADDED: internal locale conversions
	public static Locale internalize(String language) {
		if (language == null)
			return null;
		if ("no".equals(language) || "nb-no".equals(language))
			language = "nb";
		return new Locale(language);
	}
}
