/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/string",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/i18n!ic-as/nls/activitystream",
	"dojo/text!ic-as/notification/badging/templates/NotificationCenterBadge.html",
	"dijit/_Templated",	
	"dijit/_Widget",
	"dojo/topic",
	"ic-as/notification/util/keys"
], function (declare, string, lang, domClass, domStyle, i18nactivitystream, template, _Templated, _Widget, topic, keys) {

	/**
	 * Widget used to display the notification center badging
	 * @author Stephen Crawford
	 */
	
	var NotificationCenterInlineBadge = declare("com.ibm.social.as.notification.badging.NotificationCenterInlineBadge",
	[_Widget, _Templated],
	{
		templateString: template,

		maxBadgeNum: 99,

		maxBadgeNumStr: "99+",
		
		strings: i18nactivitystream,
		
		 /**
	     * Called before the widget is rendered in the UI.	    
	     */
	    postMixInProperties: function(){
	        this.inherited(arguments);
	      
	        this.ariaLabelNotifications = this.strings.newNotifications.substring(5);
	    },
	
		postCreate: function(){
			this.inherited(arguments);
			this.subscribe(keys.UPDATEBADGE, lang.hitch(this, this.updateBadging));
			this.subscribe(keys.SHOWBADGE, lang.hitch(this, this.showBadge));
			this.subscribe(keys.HIDEBADGE, lang.hitch(this, this.hideBadge));
			this.subscribe(keys.NEWNOTIFICATION, lang.hitch(this, this.updateNewNotificationAria));
		},

		/**
		 * Update the realtime notification text in the badge area for screen readers
		 * Set timeout to allow badge to update first before reading message
		 */
		updateNewNotificationAria: function(text){
			if(text){
				setTimeout(lang.hitch(this, function() {
		    		var notifText = string.substitute(this.strings.ariaNewNotification, [text]);
					this.updateTextNode(this.ariaNewNotification, text);	
	    		}), 2000);					
			}			
		},
		
		/**
		 * Update the badge number to passed in value and unhide the badge
		 * If 0 set a small timeout to allow the badge fade out first. Then
		 * set to 0 for screenreaders
		 */
		updateBadging: function(unreadItems){								
			if(unreadItems > 0){
				this._updateBadgeNumber(unreadItems);
				this.showBadge();
			} else {//small timeout to allow the badge to fade out before setting to 0	
				this.hideBadge();		
				setTimeout(lang.hitch(this, function(){
					this._updateBadgeNumber(unreadItems);
				}), 1500);
				
			}
		},

		_updateBadgeNumber: function(unreadItems){
			var updatedLabel = "";
			if(unreadItems > this.maxBadgeNum){
				this.updateTextNode(this.notificationCenterBadge, this.maxBadgeNumStr);
				updatedLabel = string.substitute(this.strings.newNotifications, [this.maxBadgeNumStr]);
				this.updateTextNode(this.ncBadge, updatedLabel);
			} else {
				this.updateTextNode(this.notificationCenterBadge, unreadItems);
				updatedLabel = string.substitute(this.strings.newNotifications, [unreadItems]);
				this.updateTextNode(this.ncBadge, updatedLabel);
			}
		},

		updateTextNode: function(node, text){			
			if(node.innerText){
				node.innerText = text;
			}else{
				node.textContent = text;
			}
		},
				
		showBadge: function(){
			domClass.remove(this.notificationCenterBadge, "lotusHidden");
			domStyle.set(this.notificationCenterBadge, "opacity", "1");
		},
		
		hideBadge: function(){
			domStyle.set(this.notificationCenterBadge, "opacity", "0");	
		}
	  
	});
	return NotificationCenterInlineBadge;
});
