/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/topic",
	"../container/Topics"
], function (topic, Topics) {

	com.ibm.lconn.gadget.services.lifecycleModifications = 
		(function() {
			/* API to export */
			var api_ = {};
	
			api_.registerService = function(container) {
				// manually hoist our vars so we don't forget it happens anyway
				var masterTopic, publisher, makePublisher;
	
				masterTopic = Topics.getMasterLifecycleTopic();
				publisher = {};
	
				makePublisher = function(eventType, masterTopic) {
					var eventTopic = Topics.getLifecycleEventTopic(eventType);
					
					return function() {
						topic.publish(eventTopic, arguments);
						topic.publish(masterTopic, arguments);
					}
				};
				
				for(var eventType in osapi.container.CallbackType) {
					publisher[osapi.container.CallbackType[eventType]] = makePublisher(osapi.container.CallbackType[eventType], masterTopic);
				}
				
				container.addGadgetLifecycleCallback("lconn_gadget_lifecycle_publisher", publisher);
			};
	
			return api_;
	
		})();
	return com.ibm.lconn.gadget.services.lifecycleModifications;
});
