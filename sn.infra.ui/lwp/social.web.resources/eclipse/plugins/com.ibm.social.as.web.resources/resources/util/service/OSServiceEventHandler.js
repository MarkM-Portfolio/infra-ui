/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.service.OSServiceEventHandler");

/**
 * OpenSocial implementation of a service event handler.
 * 
 * @author Robert Campion
 */

com.ibm.social.as.util.service.OSServiceEventHandler =  
	dojo.mixin(dojo.mixin({}, com.ibm.social.as.util.service.IServiceEventHandler), {
		/**
		 * Register a service name with a callback. When a service is contacted,
		 * the callback function will be executed.
		 * @param topic {String} Service to listen to.
		 * @param callback {Function} Executed when service is called.
		 * @returns registered service handler
		 */
		register: function(topic, callback){
			// Register to an RPC service call
			gadgets.rpc.register(topic, callback);
	
			// Topic is used to unregister
			return topic;
		},
		
		/**
		 * Make a service call.
		 * @param topic {String} Service to call.
		 * @param args {Array} Arguments to be passed in the call.
		 */
		call: function(topic, args){
			// Call it
			gadgets.rpc.call(this.gadgetTargetId, topic, null, args);
		},
		
		/**
		 * Unregister from a registration.
		 * @param handle {String | Object} service identification.
		 */
		unregister: function(handle){
			// RPC service, unregister it
			gadgets.rpc.unregister(handle);
		}
	});
