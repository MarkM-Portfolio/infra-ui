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
	"ic-as/notification/util/WindowBroadcastSupport",
	"dojo/json",
	"dojo/date"
], function(WindowBroadcastSupport, JSON, date) {

		describe("the ic-as/notification/util/WindowBroadcastSupport class", function() {
			beforeEach(function() {
				testObj = new WindowBroadcastSupport();	
			});

			it("implements the expected methods that components override", function() {
				expect(testObj.handleStorageEvent).toEqual(jasmine.any(Function));
				expect(testObj.cleanupWindowSupport).toEqual(jasmine.any(Function));
				expect(testObj.windowActivated).toEqual(jasmine.any(Function));
				expect(testObj.windowDeactivated).toEqual(jasmine.any(Function));
			});

			it("initialized correctly and becomes master", function() {
				//note reset localstorage lock for poll
				try {
			        localStorage.setItem(testObj.STORAGE_LOCK, 0);
			    } catch ( error ) {}	
				expect(testObj.isMaster).not.toBeTruthy();
				testObj.initWindowBroadcastSupport();
				expect(testObj.isMaster).toBeTruthy();
			});

			it("initialized correctly and becomes master when storage locked longer than timeout", function() {
				expect(testObj.isMaster).not.toBeTruthy();

				var dateInPast = new Date();
				dateInPast = date.add(dateInPast, "day", -1);
				try {
			        localStorage.setItem( testObj.STORAGE_LOCK, dateInPast.getTime() );
			    } catch ( error ) {}

				testObj.initWindowBroadcastSupport()
				expect(testObj.isMaster).toBeTruthy();

			});

			it("initialized correctly and becomes slave when storage locked less than timeout", function() {
				expect(testObj.isMaster).not.toBeTruthy();

				var dateInFuture = new Date();
				dateInFuture = date.add(dateInFuture, "day", 1);
				try {
			        localStorage.setItem( testObj.STORAGE_LOCK, dateInFuture.getTime() );
			    } catch ( error ) {}

				testObj.initWindowBroadcastSupport()
				expect(testObj.isMaster).not.toBeTruthy();

			});

			it("sends a broadcast storage message successfully", function() {
				var msgObj = {connections:{unreadNotifications:2}};
				testObj.windowBroadcast(msgObj);
				var msgFromStorage = localStorage.getItem(testObj.IC_WINDOW_BROADCAST);
				expect(msgFromStorage).not.toBeNull();
				var msgObjFromStorage = JSON.parse(msgFromStorage);
				expect(msgObjFromStorage.event.connections).not.toBeNull();
				expect(msgObjFromStorage.event.connections.unreadNotifications).not.toBeNull();
				expect(msgObjFromStorage.event.connections.unreadNotifications).toEqual(2);
			});

			it("sets the storageLock to localStorage correctly", function() {
				try {
			        localStorage.setItem( testObj.STORAGE_LOCK, 0 );
			    } catch ( error ) {}
				var storageLockBefore = localStorage.getItem(testObj.STORAGE_LOCK);
				expect(storageLockBefore).toEqual("0");
				testObj.setStorageLock();
				var storageLockAfter = localStorage.getItem(testObj.STORAGE_LOCK);
				expect(storageLockAfter).not.toBeNull();
			});

			it("handles the storage broadcast events correctly", function() {
				var eventVal = {key: "icWindowBroadcast"}; 
				spyOn(testObj, "handleStorageEvent");				
				testObj.handleStorageEventInternal(eventVal);
				expect(testObj.handleStorageEvent).toHaveBeenCalledWith(eventVal);											
			});

			it("handles the storage icStorageChannelLock events correctly for master", function() {
				var eventVal = {key: "icStorageChannelLock"}; 	
				testObj.isMaster = true;

				spyOn(testObj, "loseMaster");	
				testObj.handleStorageEventInternal(eventVal);
				expect(testObj.loseMaster).not.toHaveBeenCalled();					
			});

			it("handles the storage icStorageChannelLock events correctly for slave", function() {
				var eventVal = {key: "icStorageChannelLock"}; 	
				testObj.isMaster = false;
				//set a storage lock value
 				localStorage.setItem(testObj.STORAGE_LOCK, Date.now() );
				spyOn(testObj, "loseMaster");	
				testObj.handleStorageEventInternal(eventVal);
				expect(testObj.loseMaster).toHaveBeenCalled();					
			});

			it("generates a random number for timeout", function() {
				var random = testObj.getRandomTimeout(10000);
				expect(random).toBeGreaterThan(0);					
				expect(random).toBeLessThan(10000);		
			});

			it("generates a random number that is int", function() {
				var random = testObj.getRandomTimeout(10000);
				expect(random % 1).toEqual(0);
			});
		});

});
