/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/i18n!ic-gadget/nls/i18n",
	"dojo/string"
], function (dojo, declare, i18n, i18ni18n, string) {

	/**
	 * Declare a single static instance of  resource bundle for Connection Container and it's service
	 * This can be subclassed and all localization done within overridden initializeStrings function
	 */
	(function() {
		var getString_ = function(/*String*/ key, /*Object or Array?*/placeHolders) {
			var bundle = i18ni18n;
			
			getString_ = function (/*String*/ key, /*Object or Array?*/placeHolders) {
				var localizedString = bundle[key];
		    	return (placeHolders)? string.substitute(localizedString,placeHolders):localizedString;	
			};
			
			return getString_(key, placeHolders);
		};
		
		/**
		 * Dummy class to get jazz to inline localization bundle
		 */
		declare('', null, {
			constructor : function() {
				i18ni18n;
			}
		});
		
		var localizer = declare('com.ibm.social.gadget.people.util.localizer', null,
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
	return localizer;
});
