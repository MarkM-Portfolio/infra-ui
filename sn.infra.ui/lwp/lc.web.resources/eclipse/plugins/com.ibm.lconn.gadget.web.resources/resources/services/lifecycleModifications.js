/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.services.lifecycleModifications');

com.ibm.lconn.gadget.services.lifecycleModifications = 
	(function() {
		/* API to export */
		var api_ = {};

		api_.registerService = function(container) {
			// manually hoist our vars so we don't forget it happens anyway
			var masterTopic, publisher, makePublisher;

			masterTopic = com.ibm.lconn.gadget.container.Topics.getMasterLifecycleTopic();
			publisher = {};

			makePublisher = function(eventType, masterTopic) {
				var eventTopic = com.ibm.lconn.gadget.container.Topics.getLifecycleEventTopic(eventType);
				
				return function() {
					dojo.publish(eventTopic, arguments);
					dojo.publish(masterTopic, arguments);
				}
			};
			
			for(var eventType in osapi.container.CallbackType) {
				publisher[osapi.container.CallbackType[eventType]] = makePublisher(osapi.container.CallbackType[eventType], masterTopic);
			}
			
			container.addGadgetLifecycleCallback("lconn_gadget_lifecycle_publisher", publisher);
		};

		return api_;

	})();
