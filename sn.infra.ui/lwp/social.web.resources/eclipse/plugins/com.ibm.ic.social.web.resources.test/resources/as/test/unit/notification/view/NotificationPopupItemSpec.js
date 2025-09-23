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
	"ic-as/notification/view/NotificationPopupItem"
], function(NotificationPopupItem) {

	 var testObj = null;
	 
     describe("the ic-as/notification/view/NotificationPopupItem class", function() {
		it("instantiates correctly", function() {
			testObj = new NotificationPopupItem();
			expect(testObj).not.toBeNull();
		});	

		it("instantiates and sets up correct values", function() {
			testObj = new NotificationPopupItem("title", "body", "icon");
			expect(testObj.title).toEqual("title");
			expect(testObj.body).toEqual("body");
			expect(testObj.icon).toEqual("icon");
		});				
	});

});