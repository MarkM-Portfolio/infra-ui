/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/topic"
	], function (array, declare, topic) {
	
		/**
		 * Simple subscriber class that other classes can subclass in order
		 * to provide quick subscription and easy tear down.
		 * @author Robert Campion
		 */
		
		var Subscriber = declare("com.ibm.social.as.listener.Subscriber", null,
		{
			// Array containing subscriptions
			subscribes: null,
			
			constructor: function(){
				// Initialize the subscribes array
				this.subscribes = [];
			},
			
			/**
			 * Setup your subscribes in this function.
			 * @override and use the this.subscribe function to safely
			 * subscribe to events.
			 */
			setupSubscribes: function(){
			},
			
			/**
			 * Subscribe to an event, saving the handler.
			 * @param eventName - Name of the event.
			 * @param callback - Function to call when event fires.
			 */
			subscribe: function(eventName, callback){
				this.subscribes.push(topic.subscribe(eventName, callback));
			},
			
			/**
			 * Destroy all subscribed to events.
			 */
			destroy: function(){
				array.forEach(this.subscribes, function(handle){
					handle.remove();
				});
			}
		});
		
		return Subscriber;
	});
