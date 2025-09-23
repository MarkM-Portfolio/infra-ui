/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/lang",
		"dojo/topic",
		"ic-as/util/service/IServiceEventHandler"
	], function (lang, topic, IServiceEventHandler) {
	
		/**
		 * Dojo implementation of a service event handler.
		 * 
		 * @author Robert Campion
		 */
		
		com.ibm.social.as.util.service.DojoServiceEventHandler = 
			lang.mixin(lang.mixin({}, IServiceEventHandler), {
				/**
				 * Register an event topic with a callback. When the event is contacted,
				 * the callback function will be executed.
				 * @param topic {String} Event topic to listen to.
				 * @param callback {Function} Executed when topic is called.
				 * @returns registered event handler
				 */
				register: function(topic, callback){
					// Subscribe to the dojo 'topic' event
					return topic.subscribe(topic, callback);
				},
				
				/**
				 * Make an event call.
				 * @param topic {String} Event topic to call.
				 * @param args {Array} Arguments to be passed in the call.
				 */
				call: function(topic, args){
					// Just publish the args to the dojo event
					topic.publish(topic, args);
				},
				
				/**
				 * Unsubscribe from this subscription.
				 * @param handle {String | Object} topic identification.
				 */
				unregister: function(handle){
					// Dojo handle, unsubscribe
					handle.remove();
				}
			});
		return com.ibm.social.as.util.service.DojoServiceEventHandler;
	});
