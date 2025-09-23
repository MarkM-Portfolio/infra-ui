/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/constants/events",
		"ic-as/listener/AbstractListener"
	], function (declare, lang, eventsModule, AbstractListener) {
	
		/**
		 * EventListener responsible for listening to events external to the AS.
		 * For example, events from the LHSidebar, EE or Share Box.
		 * @author Robert Campion
		 */
		
		var ExternalEventListener = declare("com.ibm.social.as.listener.ExternalEventListener", 
		AbstractListener,
		{
			// Event called when something external wants to update the AS state
			updateStateEvent: eventsModule.UPDATESTATE,
			
			/**
			 * Subscribes to AS events and sets up the callbacks.
			 */
			setupSubscribes: function(){
				var self = this;
				var ctrlr = self.controller;
		
				// Register a callback to be fired when something requests that we change state.
				this.register(this.updateStateEvent, lang.hitch(ctrlr, "onUpdateState"));
			}
		});
		
		return ExternalEventListener;
	});
