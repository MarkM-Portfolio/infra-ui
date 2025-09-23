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
		"dojo/_base/lang",
		"dojo/string",
		"dojo/date/stamp",
		"dojo/date",
		"dojo/topic",
		"dojo/aspect",
		"dojo/json",
		"ic-as/constants/events",
		"ic-as/util/xhr/XhrHandler",
		"ic-as/notification/util/WindowBroadcastSupport",
		"ic-as/notification/badging/NotificationCenterBadgeController",
		"ic-as/util/RouteHelper",
		"ic-core/config/features",
		"ic-as/notification/util/ICNotificationController",
		"dojo/i18n!ic-as/nls/activitystream"
	], function (declare, lang, dojoString, stamp, date, topic, aspect, JSON, events, XhrHandler, WindowBroadcastSupport, NotificationCenterBadgeController, RouteHelper, features, ICNotificationController, i18nactivitystream) {
	
		var NotificationPoll = declare(WindowBroadcastSupport,
		{

			timeoutID: null,

			pollingInterval: 600000,			

			helper: null,

			timeStampInPast: null,

			init: false,

			strings: i18nactivitystream,

			cacheUnread: 0,

			constructor: function(){
	        	this.helper = RouteHelper.getInstance({cfg: {userInfo:{id: "id"}}});
		        this.setupDateInPast();		
		        topic.subscribe(events.BADGE_RESET_AMD, lang.hitch(this, "resetUnreadCache"));		        
			},	

			/**
			 * Set the cached counter for unread notifications back
			 * to 0, this occurs when the badging is cleared.
			 */
			resetUnreadCache: function(){
				this.cacheUnread = 0;
			},

			/**
			 * Create a date well into the past to pass onto badge check xhr call
			 * being out of range of actual data saves DB query
			 * @return {[type]} [description]
			 */
			setupDateInPast: function(){
				var dateInPast = new Date();
				dateInPast = date.add(dateInPast, "year", -20);
		        this.timeStampInPast = stamp.toISOString(dateInPast, {zulu: true, milliseconds: true});
			},

			initPoll: function(){
		       //setup and init window broadcast support	
		        this.masterFrequency = this.pollingInterval;
		        this.initWindowBroadcastSupport();
			},

			windowActivated: function(){
 				// removes the current setTimeout
		        this.stopPoll();
		        this.timeoutID = setTimeout(lang.hitch(this, this.poll), this.pollingInterval);
		        //When we first start, run the query to get the initial update
		        if (!this.init) {
		          this.fetchNewNotificationsInfo();		       
		          this.init = true;
		        }
			},

			windowDeactivated: function(){
				this.stopPoll();
				this.handleStorageEvent = function(event){
					var msg = JSON.parse(event.newValue);
					this.handleNotificationBadgeUpdate(msg.event, true);
				};
			},

			/**
			 * Stop the current timeout polling
			 * @return {[type]} [description]
			 */
			stopPoll: function(){
				if (this.timeoutID) {
		          clearTimeout(this.timeoutID);
		        }
			},

			poll: function(){
				console.debug("polling notification center");				
			    this.fetchNewNotificationsInfo();		  
			    this.timeoutID = setTimeout(lang.hitch(this, this.poll), this.pollingInterval);
			},

			/**
			 * Handle a feed back from server with badge details. If the badge number
			 * has increased, update the badge and fire the notification html5 popup
			 */
			handleNotificationBadgeUpdate: function(data){
				if(data && data.connections && data.connections.unreadNotifications){
					var unread = data.connections.unreadNotifications;
					try{
						unread = parseInt(unread);
					}catch(e){}
					if(unread > this.cacheUnread){
						this.cacheUnread = unread;
						NotificationCenterBadgeController.updateBadging(data.connections.unreadNotifications);						
					}
				}				
			},

			/**
			 * Call to the Notfication AS API - pass in data to ensure we get
			 * no results back except for the notification badge numbers
			 */
			fetchNewNotificationsInfo: function(){
				var notifUrl = this.helper.getNotificationsForMeUrl()+"?count=0";				
				notifUrl = notifUrl + "&updatedBefore="+this.timeStampInPast;				
		        XhrHandler.xhrGet({
		                url:  notifUrl,
		                handleAs: "json"                
		        }).then(lang.hitch(this, function(data){	        		               
		        	this.handleNotificationBadgeUpdate(data);
		        }), function(error){
		        	console.log(error);
		        });
		    }
		});
		
		NotificationPoll._Instance = null;
		  
		NotificationPoll.getInstance = function(){
			if(NotificationPoll._Instance == null){
				NotificationPoll._Instance = new NotificationPoll();				
		  	}
		  	return NotificationPoll._Instance;
		}
		
		return NotificationPoll.getInstance();
		
	});