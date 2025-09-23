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
	"ic-as/notification/view/NotificationsItem"
], function(NotificationsItem) {

	 var testObj = null;
	 var data = {
		 id: "id",
		 title: "title",
		 published: "2015-03-18T23:09:46.837Z",
		 object: {
			summary: "summary",
			url: "https://www.ibm.com"
		 },
		 connections: {
		 	plainTitle: "plain title"
		 }		
	 };
	 
	 beforeEach(function() {
		 testObj = new NotificationsItem({data: data});
     });

     afterEach(function() {
    	 testObj = null;
     });	


});