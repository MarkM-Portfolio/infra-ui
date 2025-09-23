/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.extension.SearchBarExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.filter.FilterContainer");

/**
 * @author scrawford
 * 
 * Simple extension to allow search bar to be switched on/off on a view
 */
dojo.declare("com.ibm.social.as.extension.SearchBarExtension", 

[com.ibm.social.as.extension.interfaces.IExtension],
{
	// Reference to the news item class function
	filterContainerClass: null,
	
	// Reference to the NewsItem class's prototype
	filterContainerPrototype: null,
	
	constructor: function(){
		this.filterContainerClass = com.ibm.social.as.filter.FilterContainer;
		this.filterContainerPrototype = this.filterContainerClass.prototype;
	},
	
	/**
	 * Called when the AS loads on the page.
	 */
	onLoad: function(){
		as_console_debug("com.ibm.social.as.extension.SearchBarExtension - onLoad");
		this.filterContainerPrototype.setSearchBarEnabled(true);
		dojo.publish(com.ibm.social.as.constants.events.ENABLESEARCH, [true]);
	},
	
	/**
	 * Called when the view is moved away from.
	 */
	onUnload: function(){	
		as_console_debug("com.ibm.social.as.extension.SearchBarExtension - onLoad");
		this.filterContainerPrototype.setSearchBarEnabled(false);
		dojo.publish(com.ibm.social.as.constants.events.ENABLESEARCH, [false]);
	}	
});
