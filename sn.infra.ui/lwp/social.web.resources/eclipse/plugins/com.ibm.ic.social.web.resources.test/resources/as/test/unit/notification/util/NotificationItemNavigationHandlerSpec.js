/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-as/notification/util/NotificationItemNavigationHandler"
], function(NotificationItemNavigationHandler) {
				
		describe("the ic-as/notification/util/NotificationItemNavigationHandlerSpec class", function() {
			it("implements the expected methods", function() {
				expect(NotificationItemNavigationHandler.landmark).toEqual(".icNotification-post-inner");
			});
		});

});
