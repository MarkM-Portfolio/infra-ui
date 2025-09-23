/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/ForumTopic",
	"ic-ee/data/EntryDataStore"
], function (declare, ForumTopic, EntryDataStore) {

	var ForumTopicDataStore = declare("com.ibm.social.ee.data.ForumTopicDataStore", EntryDataStore, {
	
		itemFromDocEl: function(el, base) {
			return new ForumTopic(el, base);
		}
	});
	
	return ForumTopicDataStore;
});
