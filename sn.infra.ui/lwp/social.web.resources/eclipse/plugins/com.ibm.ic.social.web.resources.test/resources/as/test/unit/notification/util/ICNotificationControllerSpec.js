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
	"ic-as/notification/util/ICNotificationController"
], function(ICNotificationController) {
		
		
		describe("the ic-as/notification/util/ICNotificationController class", function() {
			it("implements the expected methods", function() {
				expect(ICNotificationController.createNative).toEqual(jasmine.any(Function));
			});
			it("handles notification not being on the global scope", function() {
				try{
					expect(ICNotificationController.requestNotificationPermission());	
				}catch(e){	
					expect(e).toBeNull();//effectively a fail command
				}
				
			});
		});

});