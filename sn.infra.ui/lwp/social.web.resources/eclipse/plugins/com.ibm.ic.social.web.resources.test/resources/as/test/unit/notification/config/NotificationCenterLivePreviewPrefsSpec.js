/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-as/notification/config/NotificationCenterLivePreviewPrefs"
], function(prefs) {
		var testObj;
		
		describe("the ic-as/notification/config/NotificationCenterLivePreviewPrefs class", function() {
			beforeEach(function() {
				this.testObj = new prefs();	
			});

			it("implements the expected methods", function() {
				expect(this.testObj.updatePreferences).toEqual(jasmine.any(Function));
				expect(this.testObj.isMentionLivePreviewEnabled).toEqual(jasmine.any(Function));
				expect(this.testObj.isNotificationLivePreviewEnabled).toEqual(jasmine.any(Function));
			});

			it("sets up default values on construction", function() {
				var prefObj = new prefs(true, true);
				expect(prefObj.isNotificationLivePreviewEnabled()).toBeTruthy();	
				expect(prefObj.isMentionLivePreviewEnabled()).toBeTruthy();
			});

			it("sets up default values on construction", function() {
				var prefObj = new prefs(true, false);
				expect(prefObj.isNotificationLivePreviewEnabled()).toBeTruthy();	
				expect(prefObj.isMentionLivePreviewEnabled()).not.toBeTruthy();
			});

			it("sets up default values no contructor params", function() {				
				expect(this.testObj.isNotificationLivePreviewEnabled()).not.toBeTruthy();	
				expect(this.testObj.isMentionLivePreviewEnabled()).not.toBeTruthy();
			});

			it("handles updatePreferences call with valid data", function() {	
				expect(this.testObj.isNotificationLivePreviewEnabled()).not.toBeTruthy();	
				expect(this.testObj.isMentionLivePreviewEnabled()).not.toBeTruthy();
				var data = {entry:{appData:{userSettings:{LIVEPREVIEW_MENTIONS: "true", LIVEPREVIEW_NOTIFICATIONS: "true"}}}};
				this.testObj.updatePreferences(data);			
				expect(this.testObj.isNotificationLivePreviewEnabled()).toBeTruthy();	
				expect(this.testObj.isMentionLivePreviewEnabled()).toBeTruthy();
				expect(this.testObj.preferencesUpdated).toBeTruthy();
			});

			it("handles updatePreferences call with empty user pref values", function() {	
				expect(this.testObj.isNotificationLivePreviewEnabled()).not.toBeTruthy();	
				expect(this.testObj.isMentionLivePreviewEnabled()).not.toBeTruthy();
				var data = {entry:{appData:{userSettings:{}}}};
				this.testObj.updatePreferences(data);			
				expect(this.testObj.isNotificationLivePreviewEnabled()).toBeTruthy();	
				expect(this.testObj.isMentionLivePreviewEnabled()).toBeTruthy();
			});

			it("handles updatePreferences call with one valid user setting and one invalid", function() {	
				expect(this.testObj.isNotificationLivePreviewEnabled()).not.toBeTruthy();	
				expect(this.testObj.isMentionLivePreviewEnabled()).not.toBeTruthy();
				var data = {entry:{appData:{userSettings:{LIVEPREVIEW_MENTIONS: "true", LIVEPREVIEW_NOTIFDICATIONS: "true"}}}};
				this.testObj.updatePreferences(data);			
				expect(this.testObj.isNotificationLivePreviewEnabled()).toBeTruthy();	
				expect(this.testObj.isMentionLivePreviewEnabled()).toBeTruthy();
			});

			it("checks a push message for user preferences negative", function() {	
				var message = {isMention: "false"};
				expect(this.testObj.isNotificationAllowed(message)).not.toBeTruthy();				
			});

			it("checks a push message for user preferences positive", function() {	
				var message = {isMention: false};
				this.testObj.notificationLivePreviewEnabled = true;
				expect(this.testObj.isNotificationAllowed(message)).toBeTruthy();	
				var mentionMessage = {isMention: true};
				expect(this.testObj.isNotificationAllowed(mentionMessage)).not.toBeTruthy();	
			});

		});

});
