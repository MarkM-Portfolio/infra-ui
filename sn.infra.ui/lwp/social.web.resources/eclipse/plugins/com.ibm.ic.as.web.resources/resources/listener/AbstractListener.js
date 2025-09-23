/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/listener/Registrar"
	], function (declare, lang, Registrar) {
	
		/**
		 * Abstract listener class that listeners should subclass.
		 * @author Robert Campion
		 */
		
		var AbstractListener = declare("com.ibm.social.as.listener.AbstractListener", 
		Registrar,
		{
			// Main controller. Pass in at creation.
			controller: null,
			
			/**
			 * Called at init.
			 * @param options - 'controller' must be included.
			 */
			constructor: function(options){
				if(options){
					lang.mixin(this, options);
				}
				
				// Setup all the subscribes
				this.setupSubscribes();
			}
		});
		
		return AbstractListener;
	});
