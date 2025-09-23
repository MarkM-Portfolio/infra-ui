/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/BlogComment",
	"ic-ee/data/DomBuilder",
	"ic-ee/data/FeedDataStore",
	"ic-incontext/util/uri"
], function (declare, BlogComment, DomBuilder, FeedDataStore, uri) {

	var BlogThisCommentFeedDataStore = declare("com.ibm.social.ee.data.BlogThisCommentFeedDataStore", FeedDataStore, {
		_domBuilder: new DomBuilder(),
	
		loadItem: function(keywordArgs) {
			var params = {};
			params.format = "xml";
			params.includeTags = true;
			params.acls = true;
			this.inherited(arguments, [keywordArgs, params]);
		},
	
		itemFromDocElAndCat: function(el, base, category, keywordArgs) {
			return this.itemFromDocEl(el, base);
		},
	
		itemFromDocEl: function(el, base) {
			return new BlogComment(el, base);
		}
	});
	return BlogThisCommentFeedDataStore;
});
