/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.container.Topics");

com.ibm.lconn.gadget.container.Topics = (function(){
	var topics = {};
	var namespace = "com/ibm/lconn/gadget/";

	topics.GadgetWindow={};
	topics.GadgetWindow.SITE_TOPIC_SET_TITLE = "setTitle";
	topics.GadgetWindow.AFTER_ADJUST_WIDTH = "afterAdjustWidth";
	topics.GadgetWindow.AFTER_ADJUST_HEIGHT = "afterAdjustHeight";
	topics.GadgetWindow.SET_PREFS = "setPrefs";
	
	/**
	 * @memberOf com.ibm.lconn.gadget.services.Topics
	 * @function
	 * @param {String} siteId 
	 * 		siteId for topic, equal to the id of the DOM element
	 * 		containing the gadget iframe
	 * @param {String} topic 
	 * 		topic to retrieve, should be member of
	 * 		com.ibm.lconn.gadget.services.Topics
	 */
	topics.getSiteTopic = function(siteId, topic){
		return namespace + "site/" + siteId + "/" + topic;
	};
	
	/**
	 * @memberOf com.ibm.lconn.gadget.services.Topics
	 * @function
	 * @param {String} eventType 
	 * 		The name of the lifecycleEvent to get a topic for
	 * 		should be a member of osapi.container.CallbackType
	 */
	topics.getLifecycleEventTopic = function(eventType) {
		return namespace + eventType;
	}
	
	/**
	 * @memberOf com.ibm.lconn.gadget.services.Topics
	 * @function
	 */
	topics.getMasterLifecycleTopic = function() {
		return namespace + "lifecycle";
	}
	
	
	return topics;

})();
