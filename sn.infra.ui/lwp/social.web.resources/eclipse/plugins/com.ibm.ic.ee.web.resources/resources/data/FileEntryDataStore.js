/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/File",
	"ic-ee/data/EntryDataStore"
], function (declare, File, EntryDataStore) {

	var FileEntryDataStore = declare("com.ibm.social.ee.data.FileEntryDataStore", EntryDataStore, {
	   itemFromDocEl: function(el, base) {
	      return new File(el, base);
	   }   
	   
	});
	return FileEntryDataStore;
});
