/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-as/notification/badging/NotificationCenterInlineBadge",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/topic",
	"ic-as/notification/util/keys"
], function(NotificationCenterInlineBadge, domClass, domStyle, topic, keys) {

	 var testObj = null;
	
	 describe("the ic-as/notification/badging/NotificationCenterInlineBadge class", function() {
		 beforeEach(function() {
			 testObj = new NotificationCenterInlineBadge();
	     });
	
	     afterEach(function() {
	    	 testObj = null;
	     });
         
		it("instantiates correctly", function() {
			expect(testObj).not.toBeNull();
		});
		
		it("is hidden on initial creation", function() {
			expect(domClass.contains(testObj.notificationCenterBadge, "lotusHidden")).toBeTruthy();
			expect(testObj.notificationCenterBadge.innerHTML).toEqual("0");
		});
			
		it("shows correctly on showBadge call", function() {
			testObj.showBadge();
			expect(domClass.contains(testObj.notificationCenterBadge, "lotusHidden")).not.toBeTruthy();
		});
			
		it("can hide correctly after showBadge and hideBadge call", function() {
			testObj.showBadge();
			expect(domClass.contains(testObj.notificationCenterBadge, "lotusHidden")).not.toBeTruthy();
			testObj.hideBadge();

			expect(domStyle.get(testObj.notificationCenterBadge, "opacity")).toEqual("0");
			
		});
			
		it("can update the badge number correctly", function() {
			testObj.updateBadging(2);
			expect(domClass.contains(testObj.notificationCenterBadge, "lotusHidden")).not.toBeTruthy();
			expect(testObj.notificationCenterBadge.innerHTML).toEqual("2");
		});						
			
		it("correctly directs subcriptions to appropriate update functions", function() {
			topic.publish(keys.UPDATEBADGE, "3");
			expect(domClass.contains(testObj.notificationCenterBadge, "lotusHidden")).not.toBeTruthy();
			expect(testObj.notificationCenterBadge.innerHTML).toEqual("3");					
		});

		it("correctly handles the maximum badge number 99", function() {
			testObj.updateBadging(testObj.maxBadgeNum);
			expect(domClass.contains(testObj.notificationCenterBadge, "lotusHidden")).not.toBeTruthy();
			expect(testObj.notificationCenterBadge.innerHTML).toEqual(""+testObj.maxBadgeNum);					
			testObj.updateBadging(testObj.maxBadgeNum + 1);
			expect(testObj.notificationCenterBadge.innerHTML).toEqual(""+testObj.maxBadgeNumStr);		
			testObj.updateBadging(testObj.maxBadgeNum + 10);
			expect(testObj.notificationCenterBadge.innerHTML).toEqual(testObj.maxBadgeNumStr);
			testObj.updateBadging(testObj.maxBadgeNum - 30);
			expect(testObj.notificationCenterBadge.innerHTML).toEqual(""+(testObj.maxBadgeNum - 30));
		});
										
	});

});
