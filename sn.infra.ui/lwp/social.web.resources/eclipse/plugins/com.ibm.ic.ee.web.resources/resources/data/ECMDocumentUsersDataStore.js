/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/ECMDocumentUser",
	"ic-ee/data/FeedDataStore"
], function (declare, ECMDocumentUser, FeedDataStore) {

	(function() {
	            
	   var ECMDocumentUsersDataStore = declare("com.ibm.social.ee.data.ECMDocumentUsersDataStore", FeedDataStore, {
	      itemFromDocEl: function(el, base) {
	         return new ECMDocumentUser(el, base);
	      }
	   });
	})();
	return ECMDocumentUsersDataStore;
});
