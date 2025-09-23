/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([], function () {
	
		/**
		 * Objects wishing to be used as a ServiceEventHandler should mixin to this.
		 * 
		 * @author Robert Campion
		 */
		
		com.ibm.social.as.util.service.IServiceEventHandler = {
			/**
			 * @override to register to a topic
			 * @param topic
			 * @param callback
			 */
			register: function(topic, callback){
			},
			
			/**
			 * @override to register call a topic
			 * @param topic
			 * @param args
			 */
			call: function(topic, args){
			},
			
			/**
			 * @override to unregister a handle
			 * @param handle
			 */
			unregister: function(handle){
			}
		};
		return com.ibm.social.as.util.service.IServiceEventHandler;
	});
