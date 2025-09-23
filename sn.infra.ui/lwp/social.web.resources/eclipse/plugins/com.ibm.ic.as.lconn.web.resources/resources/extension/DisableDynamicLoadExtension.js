/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-as/extension/interfaces/IExtension"
], function (declare, IExtension) {

	/**
	 * Use this extension when you want to disable dynamic loads into the 
	 * Activity Stream. Dynamic loads are defined as requests to update the
	 * stream from the Sharebox or the EE.
	 */
	
	var DisableDynamicLoadExtension = declare("com.ibm.social.as.lconn.extension.DisableDynamicLoadExtension", 
	IExtension,
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
	
	return DisableDynamicLoadExtension;
});
