/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.DisableDynamicLoadExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");

/**
 * Use this extension when you want to disable dynamic loads into the 
 * Activity Stream. Dynamic loads are defined as requests to update the
 * stream from the Sharebox or the EE.
 */

dojo.declare("com.ibm.social.as.lconn.extension.DisableDynamicLoadExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	// Activity Stream config object
	configObj: null,
	
	constructor: function(){
		this.configObj = com.ibm.social.as.configManager.getConfigObject();
	},
	
	/**
	 * Called on extension load.
	 */
	onLoad: function(){
		this.setDynamicLoadingDisabled(true);
	},
	
	/**
	 * Called on extension unload.
	 */
	onUnload: function(){
		this.setDynamicLoadingDisabled(false);
	},
	
	/**
	 * Set the dynamic loading disabled config property. 
	 */
	setDynamicLoadingDisabled: function(disable){
		this.configObj.dynamicLoadingDisabled = disable;
	}
});
