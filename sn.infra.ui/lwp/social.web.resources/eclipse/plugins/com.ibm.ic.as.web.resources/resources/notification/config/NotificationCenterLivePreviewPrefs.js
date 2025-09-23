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
		'dojo/_base/json',
		"dojo/topic",
		"ic-as/notification/util/keys",
		"dojo/_base/lang",
		"ic-as/notification/util/ICNotificationController",
		"ic-as/util/xhr/XhrHandler"	,
		"ic-as/util/RouteHelper"
	], function (declare, dojoJSON, topic, keys, lang, ICNotificationController, XhrHandler, RouteHelper) {
	
		var NotificationCenterLivePreviewPrefs = declare(null,
		{
			notificationLivePreviewEnabled: false,
			mentionLivePreviewEnabled: false,
			LIVEPREVIEW_MENTIONS: "LIVEPREVIEW_MENTIONS",
			LIVEPREVIEW_NOTIFICATIONS: "LIVEPREVIEW_NOTIFICATIONS",
			SESSION_STORAGE_KEY: 'IC_NOTIFICATION_CENTER_LIVE_PREFS',
			
			constructor: function(notificationLivePreview, mentionLivePreview){
	        	if(notificationLivePreview !== undefined){
	        		this.notificationLivePreviewEnabled = notificationLivePreview;
	        	}
	        	if(mentionLivePreview !== undefined){
	        		this.mentionLivePreviewEnabled = mentionLivePreview;
	        	}
	        	topic.subscribe(keys.LIVEPREVIEW_PREF_CHANGE, lang.hitch(this, "updatePreferences"))
	        	
			},

			isNotificationLivePreviewEnabled: function(){
				return this.notificationLivePreviewEnabled;
			},

			isMentionLivePreviewEnabled: function(){
				return this.mentionLivePreviewEnabled;
			},

			/**
			 * Update the current preferences from a request to the backend
			 * Setup the appropriate values and request html5 browser permissions
			 * @param  {Obj} data Data from opensocial user settings api
			 */
			updatePreferences: function(data){
				var tempDefaultsNotif = true;
				if(data && data.entry && data.entry.appData && data.entry.appData.userSettings){
					var userSettings = data.entry.appData.userSettings;
					this.mentionLivePreviewEnabled = (typeof userSettings[this.LIVEPREVIEW_MENTIONS] !== 'undefined') 
						? (userSettings[this.LIVEPREVIEW_MENTIONS] == 'true') : tempDefaultsNotif;

					this.notificationLivePreviewEnabled = (typeof userSettings[this.LIVEPREVIEW_NOTIFICATIONS] !== 'undefined') 
						? (userSettings[this.LIVEPREVIEW_NOTIFICATIONS] == 'true') : tempDefaultsNotif;
				}				
				this.setPrefencesToStorage();

			},

			setPrefencesToStorage: function(){
				var prefs = {
						'LIVEPREVIEW_MENTIONS': this.mentionLivePreviewEnabled, 
						'LIVEPREVIEW_NOTIFICATIONS': this.notificationLivePreviewEnabled
				};
				sessionStorage.setItem(this.SESSION_STORAGE_KEY, dojoJSON.toJson(prefs));
			},

			readPreferencesFromStorage: function(){
				var prefs = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
				if (prefs){
					var prefsObj = dojoJSON.fromJson(prefs);
					this.mentionLivePreviewEnabled = prefsObj.LIVEPREVIEW_MENTIONS;
					this.notificationLivePreviewEnabled = prefsObj.LIVEPREVIEW_NOTIFICATIONS;
				}
			},

			/**
			 * Get the user preferences for the live previews in the browser from
			 * the user prefs service in News
			 */
			requestUserLivePreviewPreferences: function(){
				var prefs = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
				if (!prefs){
					XhrHandler.xhrGet({
			                url:  RouteHelper.getInstance().getNotificationsLivePreviewPreferences(),
			                handleAs: "json",
			                timeout: 10000                
			        }).then(lang.hitch(this, function(data){
			        	this.updatePreferences(data);
			        }), function(error){
			        	console.log(error);
			        });	
				} else {
					this.readPreferencesFromStorage();
				}	
				//if the user has a true set for either setup the notification controller to request
				//permissions from the user
				if(this.isMentionLivePreviewEnabled() || this.isNotificationLivePreviewEnabled()){
					ICNotificationController.requestNotificationPermission();
				}
				
			},

			/**
			 * Based on a push notification message from the server return true if the 
			 * current preferences match the notification type - based on isMention field
			 * @param  {NotificationItem}  notificationItem [comet push message]
			 * @return {Boolean} true if user preferences allow the notification type for live previews
			 */
			isNotificationAllowed: function(notificationItem){
				if(notificationItem && notificationItem.isMention){
					return this.isMentionLivePreviewEnabled();
				} else if(notificationItem && !notificationItem.isMention){
					return this.isNotificationLivePreviewEnabled();
				}
			}

		});
		
		return NotificationCenterLivePreviewPrefs;
		
	});