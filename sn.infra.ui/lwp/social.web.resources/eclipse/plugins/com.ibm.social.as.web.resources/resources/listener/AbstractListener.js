/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.listener.AbstractListener");

dojo.require("com.ibm.social.as.listener.Registrar");

/**
 * Abstract listener class that listeners should subclass.
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.listener.AbstractListener", 
[com.ibm.social.as.listener.Registrar],
{
	// Main controller. Pass in at creation.
	controller: null,
	
	/**
	 * Called at init.
	 * @param options - 'controller' must be included.
	 */
	constructor: function(options){
		if(options){
			dojo.mixin(this, options);
		}
		
		// Setup all the subscribes
		this.setupSubscribes();
	}
});
