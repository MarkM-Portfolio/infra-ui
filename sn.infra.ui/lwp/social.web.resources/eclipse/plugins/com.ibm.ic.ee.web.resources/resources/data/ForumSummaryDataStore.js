/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/ForumSummary",
	"ic-ee/data/EntryDataStore"
], function (declare, ForumSummary, EntryDataStore) {

	var ForumSummaryDataStore = declare("com.ibm.social.ee.data.ForumSummaryDataStore", EntryDataStore, {
	
		itemFromDocEl: function(el, base) {
			return new ForumSummary(el, base);
		}
	});
	
	return ForumSummaryDataStore;
});
