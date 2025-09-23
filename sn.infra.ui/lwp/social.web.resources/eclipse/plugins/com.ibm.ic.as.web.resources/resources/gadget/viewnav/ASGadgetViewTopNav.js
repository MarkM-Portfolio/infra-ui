/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([], function () {

	define([
		"dojo",
		"dojo/topic",
		"dojo/_base/declare",
		"dojo/dom-construct",
		"dojo/_base/lang",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/text!ic-as/gadget/viewnav/templates/ASGadgetViewTopNav.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-as/util/AbstractHelper"
	], function (dojo, topic, declare, domConstruct, lang, i18nactivitystream, template, _Templated, _Widget, events, AbstractHelper) {
	
		var ASGadgetViewTopNav = declare("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNav", 
		[_Widget, _Templated],
		{
			// strings from resource bundle
			strings: null,
			
			// The currently selected view's id
			selectedViewId: "",
			
			// AS config - defining the views - to me mixedin
			configObject: null,
			
			// Event to be called for changing the AS view
			updateStateEvent: events.UPDATESTATE,
			
			// State listened to in case the AS updates its view.
			stateUpdatedEvent: events.STATEUPDATED,
			
			abstractHelper: null,
			
			templateString: template,
			
			postMixInProperties: function(){
				this.strings = i18nactivitystream;
				this.abstractHelper = new AbstractHelper();
			},
			
			postCreate: function(){
				// Subscribe to Activity Stream state updates. 
				topic.subscribe(this.stateUpdatedEvent, lang.hitch(this, function(stateArr){
					// When a state update fires, change our view to the new one.
					if(stateArr.length>0) {
						this.setSelectedView(stateArr[0]);
					}
				}));
				
				if ( this.configObject && this.configObject.filters ) {
					for ( var viewId in this.configObject.filters.options ) {
						var view = this.configObject.filters.options[viewId];
						as_console_debug("SideNav - viewId: ", viewId, ", view: ", view);
						
						var option = domConstruct.create("option", {
								id: viewId,
								value: viewId,
								innerHTML: view.label
							}, 
							this.navSelect);
						this[viewId + "View"] = option;
					}
				} 
			},
			
			/**
			 * Called when a list view in the side nav is clicked.
			 * Updates the selectedViewId and updates the AS view.
			 * @param e {Event}
			 */
			viewClicked: function(e) {
				var viewId = this.navSelect.options[this.navSelect.selectedIndex].value;
				
				// Set the selected view based on the id of the target node.
				this.setSelectedView(viewId, true, true);
			},
			
			/**
			 * Sets the selected view to the viewId if it is supported
			 * and it is not already selected.
			 * @param viewId {String} ID of the view you want selected
			 * @param updateAS {Boolean} true if you want to update the
			 * Activity Stream
			 * @param force {Boolean} true if we want to force an update
			 */
			setSelectedView: function(viewId, updateAS, force){
				if ( ( viewId != this.selectedViewId ) || force ) {
					// Change the selected view
					this.changeSelectedView(this.selectedViewId, viewId, updateAS);
				}
			},
			
			/**
			 * Change the selected view and send event publish, notifying others of
			 * the change.
			 * @param oldViewId {String} ID of the old view
			 * @param newViewId {String} ID of the new view
			 */
			changeSelectedView: function(oldViewId, newViewId, updateAS){
				// If we want to update the AS
				if ( updateAS ) {
					// Create the state object
					var stateArr = [];
						
					// If we are selecting a new view and this is not a page refresh
					if ( newViewId != this.selectedViewId ) {
						// Create a new state object with the new view id
						stateArr = [newViewId];
					}
					
					// Call an update state event. The AS should be listening.
					this.abstractHelper.call(this.updateStateEvent, [stateArr]);
				}
				
				// Update the selected view
				this.selectedViewId = newViewId;
			}
		});
		return ASGadgetViewTopNav;
	});
});
