/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/IdeationBlogIdea",
	"ic-ee/data/BlogEntryDataStore"
], function (declare, IdeationBlogIdea, BlogEntryDataStore) {

	var IdeationBlogIdeaDataStore = declare("com.ibm.social.ee.data.IdeationBlogIdeaDataStore", BlogEntryDataStore, {
	
		_createBean: function(el, base) {
			return new IdeationBlogIdea(el, base);
		}
	
	});
	
	return IdeationBlogIdeaDataStore;
});
