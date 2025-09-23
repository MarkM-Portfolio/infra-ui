/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Convenient wrapper around the Dojo locale
 * @namespace lconn.core.locale
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(){
dojo.provide("lconn.core.locale");

function parts(loc, part) {
	return loc.getLocale().split('-')[part] || "";
}

dojo.mixin(lconn.core.locale, /** @lends lconn.core.locale */ {
	/**
	 * Returns the Dojo locale
	 * @returns the Dojo locale
	 */
	getLocale:function(){return dojo.locale;},
	/**
	 * Returns this locale's language
	 * @returns this locale's language
	 */
	getLanguage:function(){return parts(this, 0);},
	/**
	 * Returns this locale's country if available
	 * @returns this locale's country if available
	 */
	getCountry:function(){return parts(this, 1);},
	/**
	 * Returns this locale's variant if available
	 * @returns this locale's variant if available
	 */
	getVariant:function(){return parts(this, 2);},
	/**
	 * Returns the Java locale equivalent of this locale
	 * @returns the Java locale equivalent of this locale
	 */
	toJavaLocale:function(){
		var ret, lang = this.getLanguage(), country = this.getCountry();
		// Handle special cases
		if (lang === 'pt' && !country) {
			country = 'pt';
		}
		else if (lang === 'he') {
			lang = 'iw';
		}
		else if (lang === 'nb') {
			lang = 'no';
		}
		ret = lang;
		if (country) {
			ret += '_' + country.toUpperCase();
		}
		return ret;
	}
});

})();
