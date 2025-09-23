/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-as/notification/NotificationCenter",
	"ic-as/notification/util/ICCometService"
], function(NoticationCenter, ICCometService) {
	
		var testObj;		
		describe("the ic-as/notification/NoticationCenter class", function() {
			beforeEach(function() {
				//disable the comet system
				spyOn(ICCometService, "addCometChannelSubscription").and.callFake(function() {
					return;
				});
				testObj = new NoticationCenter();				
			});
			
			it("implements the expected methods", function() {
				expect(testObj.toggle).toEqual(jasmine.any(Function));
			});									
		});		

});
