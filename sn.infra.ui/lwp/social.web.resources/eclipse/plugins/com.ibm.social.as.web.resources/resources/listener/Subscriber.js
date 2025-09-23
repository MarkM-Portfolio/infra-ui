/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.listener.Subscriber");

/**
 * Simple subscriber class that other classes can subclass in order
 * to provide quick subscription and easy tear down.
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.listener.Subscriber", null,
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
		this.subscribes.push(dojo.subscribe(eventName, callback));
	},
	
	/**
	 * Destroy all subscribed to events.
	 */
	destroy: function(){
		dojo.forEach(this.subscribes, function(handle){
			dojo.unsubscribe(handle);
		});
	}
});
