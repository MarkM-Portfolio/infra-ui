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
	"ic-as/notification/view/NoNotificationView",
	"dojo/dom-class"
], function(NoNotificationView, domClass) {

	 var testObj = null;
	 
     describe("the ic-as/notification/view/NoNotificationView class", function() {
		 beforeEach(function() {
			 testObj = new NoNotificationView();
	     });
	
	     afterEach(function() {
	    	 testObj = null;
	     });
         
		it("instantiates correctly", function() {
			expect(testObj).not.toBeNull();
		});
	});

});