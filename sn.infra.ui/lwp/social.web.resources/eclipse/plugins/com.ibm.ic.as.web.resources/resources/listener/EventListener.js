/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/topic",
		"ic-as/constants/events",
		"ic-as/listener/AbstractListener"
	], function (declare, lang, topic, events, AbstractListener) {
	
		/**
		 * Simple event listener for AS events that passes the responsibility
		 * back to the main controller when an event comes in. Put here to 
		 * make it easier to manage.
		 * TODO: Small enough at the moment to possibly merge with controller
		 * TODO: Listen out for EE and SB events
		 * @author Robert Campion
		 */
		
		var EventListener = declare("com.ibm.social.as.listener.EventListener", 
		AbstractListener,
		{
			// Event names for the main internal AS events. May be overridden.
			pageChangeEvent: events.PAGECHANGE,
			
			/**
			 * Subscribes to AS events and sets up the callbacks.
			 */
			setupSubscribes: function(){
				var self = this;
				var ctrlr = self.controller;
				
				this.own(topic.subscribe(self.pageChangeEvent, lang.hitch(ctrlr, "onPageChange")));
				this.own(topic.subscribe(events.PARAMCHANGE, lang.hitch(ctrlr, "onParamChange")));
			}
		});
		
		return EventListener;
	});
