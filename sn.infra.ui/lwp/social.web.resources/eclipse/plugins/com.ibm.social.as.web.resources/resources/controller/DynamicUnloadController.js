/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.controller.DynamicUnloadController");

dojo.require("com.ibm.social.as.constants.events");

/**
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.controller.DynamicUnloadController", null,
{
	constructor: function(){
		this.register(com.ibm.social.as.constants.events.REMOVEACTIVITYENTRY, 
						dojo.hitch(this, "onRemoveRequest"));
	},
	
	onRemoveRequest: function(objectId){
		// Search through all dijits in the activity stream
		dojo.forEach(dijit.findWidgets(this.view.newsFeedNode), dojo.hitch(this, function(widget){
			var activityId = widget.newsData && widget.newsData.getActivityId();
			
			// If we find the activity we're looking for
			if(activityId && activityId.indexOf(objectId) >= 0 && widget.onDeleteCallback){
				// Delete it
				widget.onDeleteCallback();
			}
		}));
	}
});
