/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.listener.EventListener");

dojo.require("com.ibm.social.as.listener.AbstractListener");
dojo.require("com.ibm.social.as.constants.events");

/**
 * Simple event listener for AS events that passes the responsibility
 * back to the main controller when an event comes in. Put here to 
 * make it easier to manage.
 * TODO: Small enough at the moment to possibly merge with controller
 * TODO: Listen out for EE and SB events
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.listener.EventListener", 
[com.ibm.social.as.listener.AbstractListener],
{
	// Event names for the main internal AS events. May be overridden.
	pageChangeEvent: com.ibm.social.as.constants.events.PAGECHANGE,
	
	/**
	 * Subscribes to AS events and sets up the callbacks.
	 */
	setupSubscribes: function(){
		var self = this;
		var ctrlr = self.controller;
		
		this.subscribe(self.pageChangeEvent, dojo.hitch(ctrlr, "onPageChange"));
		this.subscribe(com.ibm.social.as.constants.events.PARAMCHANGE, dojo.hitch(ctrlr, "onParamChange"));
	}
});
