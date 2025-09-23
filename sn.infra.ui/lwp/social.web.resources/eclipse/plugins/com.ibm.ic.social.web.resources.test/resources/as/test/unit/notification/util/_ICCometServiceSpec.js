/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-as/notification/util/_ICCometService",
	"ic-core/config/services",
	"ic-core/url",
	"cometd-dojo/cometd"	
], function(ICCometService, services, url, cometd) {
		
		var testObj;
		describe("the ic-as/notification/util/ICCometService class", function() {
			beforeEach(function() {
				testObj = new ICCometService();	
				testObj._subscriptions = [];
			});
			
			it("implements the expected methods", function() {
				expect(testObj.initCometD).toEqual(jasmine.any(Function));
				expect(testObj.stopCometD).toEqual(jasmine.any(Function));
				expect(testObj.addCometChannelSubscription).toEqual(jasmine.any(Function));
				expect(testObj.setWebSocketEnabled).toEqual(jasmine.any(Function));				
			});
			
			it("implements the expected variables and initializes correctly", function() {
				expect(testObj._internalSubscriptions).toEqual([]);
				expect(testObj._subscriptions).toEqual([]);
				expect(testObj._webSocketsEnabled).not.toBeTruthy();	
			});		
			
			it("implements setWebSocketEnabled correctly", function() {
				testObj.setWebSocketEnabled(true);
				expect(testObj._webSocketsEnabled).toBeTruthy();
			});
			
			it("implements does not initialize when push notification disabled", function() {    
			   if(services.pushnotification){
			      delete services.pushnotification;
			   }
            testObj._initCometD();
            spyOn(url, 'getServiceUrl');
            expect(url.getServiceUrl).not.toHaveBeenCalled();
         });

			it("implements addCometChannelSubscription correctly", function() {
				var testOutput;
				testObj.addCometChannelSubscription("news", function(message) {
					return;
	        	});	
				
				testObj.addCometChannelSubscription("files", function(message) {
					return;
	        	});	
				
				expect(testObj._subscriptions.length).toEqual(2);				
				
			});

			it("handles window decactivated events correctly", function() {
				testObj.windowDeactivated();
				var newsObj = {
			      callback: function(message) {
			        return;
			      }
			    };

			    var filesObj = {
			      callback: function(message) {
			        return;
			      }
			    };
				
				spyOn(newsObj, 'callback');
				spyOn(filesObj, 'callback');

				testObj.addCometChannelSubscription("news", newsObj.callback);	
				
				testObj.addCometChannelSubscription("files", filesObj.callback);	
				
				testObj.handleStorageEvent({newValue:'{"event":{"channelName": "news", "payload": "news message payload"}}'});	

				expect(newsObj.callback).toHaveBeenCalled();
				expect(filesObj.callback).not.toHaveBeenCalled();
				
			});
			it("implements random number generation correctly", function() {
				var testTimeout = testObj.generateRandomNumber(10000);
				expect(testTimeout >= 10000).toBeTruthy();
			});

		});

});
