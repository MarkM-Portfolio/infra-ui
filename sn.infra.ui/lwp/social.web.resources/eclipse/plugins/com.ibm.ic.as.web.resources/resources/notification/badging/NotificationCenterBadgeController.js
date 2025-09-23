/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/topic",
	"ic-as/notification/util/MessageTransport",
	"ic-as/notification/util/keys",
	"ic-as/constants/events",
	"ic-as/util/badging/BadgingUtil",
], function (declare, lang, topic, MessageTransport, keys, events, BadgingUtil) {

	/**
	 * Widget used to display the notification center flyout
	 * @author Stephen Crawford
	 */
	
	var NotificationCenterBadgeController = declare("com.ibm.social.as.notification.badging.NotificationCenterBadgeController",
	null,
	{
		currentCount: 0,
		
		constructor: function(options){
			// Mix the options in with this class
			if(options){
				lang.mixin(this, options);
			}
			topic.subscribe(keys.FEEDFETCHED, lang.hitch(this, "clearBadge"));
			topic.subscribe(events.BADGE_RESET, lang.hitch(this, "checkBadge"));
			topic.subscribe(events.BADGE_SYNC_MY_NOTIFICATIONS, lang.hitch(this, "updateBadging"));
		},
		
		/* Only clear the notification centre badge if My Notifications badge has been cleared. */
		checkBadge: function(badgeType){
			if(badgeType === '@responses'){
				this.clearBadge();
			}
		},
		
		
		getCount: function(){
			 return this.currentCount;
		},
		
		/**
		 * Increase the badge count by one and ensure that the badge is showing
		 */
		incrementBadging: function(){
			this.currentCount = this.currentCount + 1;
			MessageTransport.getInstance().sendMessage(keys.UPDATEBADGE, this.currentCount);
			
		},
		
		showBadge: function(){
			MessageTransport.getInstance().sendMessage(keys.SHOWBADGE);		
		},
		
		hideBadge: function(){
			MessageTransport.getInstance().sendMessage(keys.HIDEBADGE);
		},
		
		updateBadging: function(count){
			if(count !== undefined){
				this.currentCount = count;
				MessageTransport.getInstance().sendMessage(keys.UPDATEBADGE, count);
			}			
		},
		
		/* Publish badge update event, the left nav bar should be listening */
		updateASSideNavBadging: function(item){
			if(item !== undefined){
				topic.publish(events.BADGE_UPDATE_MY_NOTIFICATIONS, item.viewCounts.notifications);
				topic.publish(events.BADGE_UPDATE_MENTIONS, item.viewCounts.mentions);
			}
	},
		
		setBadgeForReset: function(){
			this.resetBadge = true;
		},
		
		/**
		 * Clear the badge from the NC banner and call a reset on the 
		 * backend
		 * Only do this if the badge is active and greater than 0
		 */
		clearBadge: function(){
			if(this.currentCount !== 0){			
				this.updateBadging(0);
				this.hideBadge();				
				topic.publish(events.BADGE_RESET_AMD, "@responses");
				topic.publish(events.BADGE_UPDATE_MY_NOTIFICATIONS, 0);
			}
							
		}
	  
	});
	NotificationCenterBadgeController._Instance = null;
	  
	NotificationCenterBadgeController.getInstance = function(){
		if(NotificationCenterBadgeController._Instance == null){
			NotificationCenterBadgeController._Instance = new NotificationCenterBadgeController();				
	  	}
	  	return NotificationCenterBadgeController._Instance;
	}
	
	return NotificationCenterBadgeController.getInstance();
});
