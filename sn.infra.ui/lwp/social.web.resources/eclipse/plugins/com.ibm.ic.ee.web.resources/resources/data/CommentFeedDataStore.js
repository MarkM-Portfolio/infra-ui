/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/has",
	"ic-ee/bean/Comment",
	"ic-ee/data/QCSFeedDataStore",
	"ic-incontext/util/uri"
], function (declare, has, Comment, QCSFeedDataStore, uri) {

	var CommentFeedDataStore = declare("com.ibm.social.ee.data.CommentFeedDataStore", QCSFeedDataStore, {
	
	   loadItem: function(keywordArgs) {
	      var params = {};
	      if(has("ie"))
	         params.format = "xml";
	      params.includeTags = true;
	      params.acls = true;
	      this.inherited(arguments, [keywordArgs, params]);
	   },
	
	   itemFromDocElAndCat: function(el, base, category, keywordArgs) {
	      return this.itemFromDocEl(el, base);
		},
	
	   itemFromDocEl: function(el, base) {
	      return new Comment(el, base);
	   },
	
	   _fetch: function (request) {
	      var params = this._getParams(request);
	      var feedUrl = uri.rewriteUri(this.url, params);
	      request.url = feedUrl;
	      request.params = params;
	      this.inherited(arguments, [request]);
	   },
	   
	   _getParams: function(request) {
	      var params = this.getStdParams(request);
	      params.category = ["comment"];
	      return params;
	   },
	
	   dataLoaded: function(request, doc, ioArgs) {
	      var opts = {
	         checkForNext: true
	      };
	      this.inherited(arguments, [request, doc, ioArgs, opts]);
	   },
	
	   _createNewItem: function (keywordArgs, parentInfo) {
	   	return new Comment(null);
	   },
	   
	   _getSaveItemUrl: function(item) {
	      var url = this.getValue(item,"urlEntry");
	      return this.rewriteUri(url, { acls: true });
	   }
	});
	return CommentFeedDataStore;
});
