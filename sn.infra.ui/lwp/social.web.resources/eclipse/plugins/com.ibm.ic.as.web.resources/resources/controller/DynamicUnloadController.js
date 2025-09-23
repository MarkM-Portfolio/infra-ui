/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dijit/registry",
		"ic-as/constants/events"
	], function (array, declare, lang, registry, events) {
	
		/**
		 * @author Robert Campion
		 */
		
		var DynamicUnloadController = declare("com.ibm.social.as.controller.DynamicUnloadController", null,
		{
			constructor: function(){
				this.register(events.REMOVEACTIVITYENTRY, 
								lang.hitch(this, "onRemoveRequest"));
			},
			
			onRemoveRequest: function(objectId){
				// Search through all dijits in the activity stream
				array.forEach(registry.findWidgets(this.view.newsFeedNode), lang.hitch(this, function(widget){
					var activityId = widget.newsData && widget.newsData.getActivityId();
					
					// If we find the activity we're looking for
					if(activityId && activityId.indexOf(objectId) >= 0 && widget.onDeleteCallback){
						// Delete it
						widget.onDeleteCallback();
					}
				}));
			}
		});
		
		return DynamicUnloadController;
	});
