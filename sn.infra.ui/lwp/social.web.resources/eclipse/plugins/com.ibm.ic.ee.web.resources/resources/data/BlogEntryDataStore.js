/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/BlogEntry",
	"ic-ee/data/EntryDataStore",
	"ic-ee/util/misc"
], function (declare, BlogEntry, EntryDataStore, misc) {

	var BlogEntryDataStore = declare("com.ibm.social.ee.data.BlogEntryDataStore", EntryDataStore, {
	
		itemFromDocEl: function(el, base) {
			var entry = this._createBean(el, base);
			var id = misc.getItemId(entry.getId());
			if (id === "empty") {
				var error = new Error();
				error.code = error.type ="ItemNotFound";
				throw error;
			}
			return entry;
		},
	
		_createBean: function(el, base) {
		   return new BlogEntry(el, base);
		},
	
		dataLoaded: function (request, doc, ioArgs, opts) {
			try {
				this.inherited(arguments);
			}
			catch (error) {
				this.dataError(request, error);
			}
		}
	
	});
	
	return BlogEntryDataStore;
});
