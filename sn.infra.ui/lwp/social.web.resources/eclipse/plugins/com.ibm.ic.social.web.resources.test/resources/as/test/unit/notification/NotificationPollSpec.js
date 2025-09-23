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
	"ic-as/notification/NotificationPoll",
	"dojo/date/stamp",
	"dojo/date"
], function(NotificationPoll, stamp, date){

	 var testObj = null;
	 
     describe("the ic-as/notification/NotificationPoll class", function() {
		 beforeEach(function() {
			 testObj = NotificationPoll;
	     });
	
	     afterEach(function() {
	    	 testObj = null;
	     });
         
		it("instantiates correctly", function() {
			expect(testObj).not.toBeNull();
		});
		
		it("sets the date back into the past correctly", function() {
			var pastDate = stamp.fromISOString(testObj.timeStampInPast);
			var dateInPast = new Date();
			dateInPast = date.add(dateInPast, "year", -19);
			expect(date.compare(dateInPast, pastDate)).toEqual(1);
		});

		it("sets the poll up correctly", function() {
			//note reset localstorage lock for poll
			try {
		        localStorage.setItem(testObj.STORAGE_LOCK, 0);
		    } catch ( error ) {}	

			testObj.init = false;
			spyOn(testObj, "fetchNewNotificationsInfo");
			expect(testObj.fetchNewNotificationsInfo.calls.count()).toBe(0);
			jasmine.clock().install();
			testObj.initPoll();
			expect(testObj.fetchNewNotificationsInfo.calls.count()).toBe(1);	
			
			jasmine.clock().tick(500);
			expect(testObj.fetchNewNotificationsInfo.calls.count()).toBe(1);	
			jasmine.clock().tick(600000);
			expect(testObj.fetchNewNotificationsInfo.calls.count()).toBe(2);
			jasmine.clock().tick(10000);
			expect(testObj.fetchNewNotificationsInfo.calls.count()).toBe(2);			
			jasmine.clock().tick(590001);
			expect(testObj.fetchNewNotificationsInfo.calls.count()).toBe(3);
			jasmine.clock().tick(600000);
			expect(testObj.fetchNewNotificationsInfo.calls.count()).toBe(4);
			jasmine.clock().uninstall();
			testObj.stopPoll();
		});

		it("handles the poll results: handleNotificationBadgeUpdate", function() {
			var data = {connections: {unreadNotifications:"2"} };
			testObj.handleNotificationBadgeUpdate(data);			
			expect(testObj.cacheUnread).toEqual(2);		
			var data2 = {connections: {unreadNotifications:"5"} };	
			testObj.handleNotificationBadgeUpdate(data2);			
			expect(testObj.cacheUnread).toEqual(5);	
		});
	});

});