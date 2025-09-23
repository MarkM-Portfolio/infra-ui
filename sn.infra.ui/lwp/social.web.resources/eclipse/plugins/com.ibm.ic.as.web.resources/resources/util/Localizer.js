/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/i18n",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/string"
	], function (dojo, declare, i18n, i18nactivitystream, string) {
	
		/**
		* Declare a single static instance of activity stream resource bundle
		* This can be subclassed and all localization done within overridden initializeStrings function
		* @author scrawford
		*/
		
		var Localizer = declare("com.ibm.social.as.util.Localizer",null,
		{
			bundle: {_initialized: false},
		
		    constructor: function(){
		    	if(!this.bundle._initialized)
		    	{
		    		this.bundle.nlsStrings = i18nactivitystream;
		    		this.bundle._initialized = true;
		    	}
		    },
		
			/**
			* Get a localized string based on the key and placeholders passed in.
			* If the placeHolders param is null just return the localized string with
			* no string substitution.
			* 
			* @param key - bundle key
			* @param placeHolders - allow placeholders to be passed in to dojo.string.substitute function
			* 
			*/
		    getLocalizedString: function(/*String*/ key, /*Object or Array?*/ placeHolders){
		    	var localizedString = this.bundle.nlsStrings[key];
		    	return (placeHolders)? string.substitute(localizedString,placeHolders):localizedString;	
		    },
		    
		    postMixInProperties: function(){
		    	this.inherited(arguments);
		    	
		    	this.localizeStrings();
		    },
		
		    localizeStrings: function(){}
		});
		return Localizer;
	});
