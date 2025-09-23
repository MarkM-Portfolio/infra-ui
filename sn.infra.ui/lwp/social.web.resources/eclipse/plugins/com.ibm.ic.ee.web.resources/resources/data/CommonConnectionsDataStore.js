/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/ProfilesConnection",
	"ic-ee/data/FeedDataStore"
], function (declare, ProfilesConnection, FeedDataStore) {

	var CommonConnectionsDataStore = declare("com.ibm.social.ee.data.CommonConnectionsDataStore", FeedDataStore, {
	   net: null, // Make sure to pass in a network object for requests
	   itemFromDocEl: function (el, base) {
	      return new ProfilesConnection(el, base);
	   }
	});
	return CommonConnectionsDataStore;
});
