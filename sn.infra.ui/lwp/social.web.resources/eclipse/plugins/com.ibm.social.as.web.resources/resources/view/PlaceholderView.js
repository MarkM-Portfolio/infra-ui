/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.view.PlaceholderView");

dojo.require("com.ibm.social.as.constants.events");

// Globals for place holder locations
com.ibm.social.as.view.placeholder = {
	location: {
		headerLeft: "HeaderLeft",
		headerRight: "HeaderRight",
		headerCenter: "HeaderCenter",
		headerTopRight: "HeaderTopRight",
		headerTopLeft: "HeaderTopLeft",
		headerRightSub: "HeaderRightSub"	
	}
};

/**
 * View class that should be subclassed by a dijit. Essentially listens
 * out for placeholder events and adds/removes dom nodes to the view.
 * 
 * INSTRUCTIONS FOR USE
 * 
 * 1) Call the event to add:
 * 
 * 		dojo.publish("com.ibm.social.as.event.placeholder.add", 
 * 					[com.ibm.social.as.view.placeholder.location.headerRight, 
 * 						dojo.create("span", {innerHTML: "asdf"})]);
 * 
 * 2) Call the event to remove:
 * 
 * 		dojo.publish("com.ibm.social.as.event.placeholder.remove", 
 * 					[com.ibm.social.as.view.placeholder.location.headerRight]);
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.view.PlaceholderView", null,
{
	// Events object in the style of {eventName: functionCallback}
	placeholderEvents: null,
	
	// Place holder nodes 
	placeholderHeaderLeft: null,
	placeholderHeaderRight: null,
	placeholderHeaderRightSub: null,
	placeholderHeaderCenter: null,
	placeholderHeaderTopRight: null,
	placeholderHeaderTopLeft: null,
	
	postMixInProperties: function(){
		this.inherited(arguments);
		
		// Init the events object
		this.placeholderEvents={};
		this.placeholderEvents[com.ibm.social.as.constants.events.PLACEHOLDERADD] = "addPlaceholder";
		this.placeholderEvents[com.ibm.social.as.constants.events.PLACEHOLDERREMOVE] = "removePlaceholder";
		
		// Setup the subscribes
		this.setupSubscribes();
	},
	
	/**
	 * Setup all the subscriptions for this class
	 */
	setupSubscribes: function(){
		// For all events
		for(var eventName in this.placeholderEvents){
			// Subscribe to them, with a callback
			this.subscribe(eventName, dojo.hitch(this, this.placeholderEvents[eventName]));
		}
	},
	
	/**
	 * Called on placeholder add event. Adds a DOM node to a placeholder.
	 * @param location {String} e.g. "HeaderRight" or "HeaderCenter".
	 * @param domNode {Node} what you want added to location.
	 */
	addPlaceholder: function(location, domNode){
		// Get the place holder and make sure it's displaying
		var placeholderNode = this["placeholder" + location];
		dojo.removeClass(placeholderNode, "lotusHidden");
		
		// Place the DOM node passed onto the place holder
		dojo.place(domNode, placeholderNode);

		dojo.removeClass(this.placeholderHeaderLeft.parentNode, "lotusHidden");
	},
	
	/**
	 * Called on placeholder remove event. Removes the DOM node(s) at 'location'
	 * @param location {String} e.g. "HeaderLeft", "HeaderRight" or "HeaderCenter".
	 */
	removePlaceholder: function(location){
		// Get the place holder and hide it
		var placeholderNode = this["placeholder" + location];
		dojo.addClass(placeholderNode, "lotusHidden");
		
		// Destroy all child nodes on this place holder.
		// Child nodes should already be destroyed, but removing them just in case.
		while(placeholderNode.hasChildNodes()){
			dojo.destroy(placeholderNode.firstChild);
		}
		
		if(dojo.every(["placeholderHeaderLeft", "placeholderHeaderCenter", "placeholderHeaderRight"], function(nodeName){
			return dojo.hasClass(this[nodeName], "lotusHidden");
		}, this)) {
			dojo.addClass(this.placeholderHeaderLeft.parentNode, "lotusHidden");
		}
	}
});
