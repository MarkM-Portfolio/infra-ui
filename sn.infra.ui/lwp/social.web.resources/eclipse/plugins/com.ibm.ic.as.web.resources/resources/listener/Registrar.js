/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"ic-as/listener/Subscriber"
	], function (array, declare, Subscriber) {
	
		/**
		 * Similar to the Subscriber, but uses the abstract helper to subscribe and
		 * destroy
		 * 
		 * @author Robert Campion
		 */
		
		var Registrar = declare("com.ibm.social.as.listener.Registrar", 
		Subscriber,
		{
			// Array containing registrations
			registrations: null,
			
			// Helper object used for abstracting
			abstractHelper: null,
			
			constructor: function(){
				// Initialize the registrations array
				this.registrations = [];
				
				this.abstractHelper = window.activityStreamAbstractHelper || window.abstractHelper;
			},
			
			/**
			 * Register to an event or service, saving the handler.
			 * @param topicName {String} Name of the event/service.
			 * @param callback {Function} Call when event fires.
			 */
			register: function(eventName, callback){
				this.registrations.push(this.abstractHelper.register(eventName, callback));
			},
			
			/**
			 * Destroy all subscribed to events.
			 */
			destroy: function(){
				array.forEach(this.registrations, function(handle){
					this.abstractHelper.unregister(handle);
				}, this);
				
				this.inherited(arguments);
			}
		});
		
		return Registrar;
	});
