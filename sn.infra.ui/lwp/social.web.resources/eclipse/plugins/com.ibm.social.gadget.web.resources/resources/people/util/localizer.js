/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('com.ibm.social.gadget.people.util.localizer');
dojo.require('dojo.i18n');
dojo.require('dojo.string');
dojo.requireLocalization('com.ibm.social.gadget', 'i18n');

/**
 * Declare a single static instance of  resource bundle for Connection Container and it's service
 * This can be subclassed and all localization done within overridden initializeStrings function
 */
(function() {
	var getString_ = function(/*String*/ key, /*Object or Array?*/placeHolders) {
		var bundle = dojo.i18n.getLocalization('com.ibm.social.gadget', 'i18n');
		
		getString_ = function (/*String*/ key, /*Object or Array?*/placeHolders) {
			var localizedString = bundle[key];
	    	return (placeHolders)? dojo.string.substitute(localizedString,placeHolders):localizedString;	
		};
		
		return getString_(key, placeHolders);
	};
	
	/**
	 * Dummy class to get jazz to inline localization bundle
	 */
	dojo.declare('', null, {
		constructor : function() {
			dojo.i18n.getLocalization('com.ibm.social.gadget', 'i18n');
		}
	});
	
	dojo.declare('com.ibm.social.gadget.people.util.localizer', null,
	{		
		/**
		 * Get a localized string based on the key and placeholders passed in.
		 * If the placeHolders param is null just return the localized string with
		 * no string substitution.
		 * 
	 	 * @param key - bundle key
		 * @param placeHolders - allow placeholders to be passed in to dojo.string.substitute function
		 * 
		 */
	    getLocalizedString: function(/*String*/ key, /*Object or Array?*/ placeHolders) {
	    	return getString_(key, placeHolders);
	    }
	});
})();