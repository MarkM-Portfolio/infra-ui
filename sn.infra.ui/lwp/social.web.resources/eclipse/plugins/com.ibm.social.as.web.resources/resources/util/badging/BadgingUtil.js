/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.badging.BadgingUtil");

dojo.declare("com.ibm.social.as.util.badging.BadgingUtil", null, { 
	
	subscriptionHandle: null,
	
	constructor: function(){
		this.subscriptionHandle = dojo.subscribe(com.ibm.social.as.constants.events.BADGE_RESET, dojo.hitch(this, "resetBadge"));
	},
	
	/**
	 * Utility method to fire of a reset request
	 */
	resetBadge: function(id) {
		var url = activityStreamAbstractHelper.getBadgeResetUrl(id);
		activityStreamAbstractHelper.xhrGet({
			url: url ,
			handleAs: "json",
			preventCache: true,
			error: function(error) {
				console.error(error);
			}
		});		
	},
	
	destroy: function(){
		dojo.unsubscribe(this.subscriptionHandle);
	}
});
