/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo/_base/declare",
	"ic-as/notification/util/ICNotificationController",
	"../util/keys",
	"dojo/topic"
], function (declare, ICNotificationController, keys, topic) {

	/**
	 * represent a basic native html5 popup representation
	 * of an activity notification
	 * 
	 * @author scrawford
	 */
	
	var NotificationPopupItem = declare(null,
	{
		title: null,

		body: null,

		icon: null,

		/**
		 * Store the rollupId which acts as a tag.
		 */
		rollupId: null,

		url: null,

		constructor: function(title, body, icon, rollupId, url){
			this.title = title;
			this.body = body;
			this.icon = icon;
			this.rollupId = rollupId;
			this.url = url;
		},

		/**
		 * Create a notification popup and attach specific handler to open
		 * the flyout when the notification is clicked
		 */
		createPopup: function(){
			var nativeNotification = ICNotificationController.createNative(this.title, this.body, this.icon, "", true, this.rollupId);
			topic.publish(keys.NEWNOTIFICATION, this.title);
			var self = this;
			nativeNotification.onclick = function(e) { 
				e.preventDefault();
				var newWindow = window.open(self.url, "_blank");  
				newWindow.focus();				
				return false;      		
    		};
		}
	
	});
	return NotificationPopupItem;
});