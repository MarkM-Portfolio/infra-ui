/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.listener.ExternalEventListener");

dojo.require("com.ibm.social.as.listener.AbstractListener");
dojo.require("com.ibm.social.as.constants.events");

/**
 * EventListener responsible for listening to events external to the AS.
 * For example, events from the LHSidebar, EE or Share Box.
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.listener.ExternalEventListener", 
[com.ibm.social.as.listener.AbstractListener],
{
	// Event called when something external wants to update the AS state
	updateStateEvent: com.ibm.social.as.constants.events.UPDATESTATE,
	
	/**
	 * Subscribes to AS events and sets up the callbacks.
	 */
	setupSubscribes: function(){
		var self = this;
		var ctrlr = self.controller;

		// Register a callback to be fired when something requests that we change state.
		this.register(this.updateStateEvent, dojo.hitch(ctrlr, "onUpdateState"));
	}
});
