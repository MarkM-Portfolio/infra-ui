/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("com.ibm.social.as.notification.badging.NotificationCenterBadgeController");
dojo.require("com.ibm.social.as.util.RouteHelper");
dojo.require("com.ibm.social.as.util.xhr.XhrHandler");
dojo.require("com.ibm.social.as.notification.util.keys");
dojo.require("com.ibm.social.as.notification.util.MessageTransport");
/**
 * Widget used to display the notification center flyout
 * @author Stephen Crawford
 */

dojo.declare("com.ibm.social.as.notification.badging.NotificationCenterBadgeController",
[com.ibm.social.as.notification.util.MessageTransport],
{
	routeHelper: null,
	
	currentCount: 0,
	
	constructor: function(options){
		// Mix the options in with this class
		if(options){
			dojo.mixin(this, options);
		}
		dojo.subscribe(com.ibm.social.as.notification.util.keys.SHOW, dojo.hitch(this, "clearBadge"));
	},
	
	
	getCount: function(){
		 return this.currentCount;
	},
	
	/**
	 * Increase the badge count by one and ensure that the badge is showing
	 */
	incrementBadging: function(){
		this.currentCount = currentCount + 1;
		this.sendMessage(com.ibm.social.as.notification.util.keys.INCREMENTBADGE, this.currentCount);
		
	},
	
	showBadge: function(){
		this.sendMessage(com.ibm.social.as.notification.util.keys.SHOWBADGE);		
	},
	
	hideBadge: function(){
		this.sendMessage(com.ibm.social.as.notification.util.keys.HIDEBADGE);
	},
	
	updateBadging: function(count){
		this.currentCount = count;
		this.sendMessage(com.ibm.social.as.notification.util.keys.UPDATEBADGE, count);
	},
	
	/**
	 * Clear the badge from the NC banner and call a reset on the 
	 * backend
	 * Only do this if the badge is active and greater than 0
	 */
	clearBadge: function(){
		if(this.currentCount !== 0){
			this.currentCount = 0;				
			this.updateBadging(0);
			this.hideBadge();
			var url = this.routeHelper.getBadgeResetUrl("@responses");
			com.ibm.social.as.util.xhr.XhrHandler.xhrGet({
				url: url ,
				handleAs: "json",
				preventCache: true,
				error: function(error) {
					console.error(error);
				}
			});	
		}
						
	}
  
});
