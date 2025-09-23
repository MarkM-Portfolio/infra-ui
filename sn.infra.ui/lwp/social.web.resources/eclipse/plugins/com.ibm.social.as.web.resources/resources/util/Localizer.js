/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.Localizer");

dojo.require("dojo.i18n");
dojo.require("dojo.string");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

/**
* Declare a single static instance of activity stream resource bundle
* This can be subclassed and all localization done within overridden initializeStrings function
* @author scrawford
*/

dojo.declare("com.ibm.social.as.util.Localizer",null,
{
	bundle: {_initialized: false},

    constructor: function(){
    	if(!this.bundle._initialized)
    	{
    		this.bundle.nlsStrings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
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
    	return (placeHolders)? dojo.string.substitute(localizedString,placeHolders):localizedString;	
    },
    
    postMixInProperties: function(){
    	this.inherited(arguments);
    	
    	this.localizeStrings();
    },

    localizeStrings: function(){}
});
