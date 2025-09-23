/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/data/FeedDataStore"
], function (declare, AtomBean, FeedDataStore) {

	var EntryDataStore = declare("com.ibm.social.ee.data.EntryDataStore", FeedDataStore, {
	
		getDataLoadedEntries: function(el) {
			return [el];
		},
	
		getTotalItems: function(el) {      
			return 1;
		},
		itemFromDocEl: function(el, base) {
			return new AtomBean(el, base);
		}
	});
	
	return EntryDataStore;
});
