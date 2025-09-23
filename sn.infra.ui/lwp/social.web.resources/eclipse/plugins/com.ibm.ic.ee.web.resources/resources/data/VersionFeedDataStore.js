/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/has",
	"ic-ee/bean/Version",
	"ic-ee/data/QCSFeedDataStore",
	"ic-incontext/util/uri"
], function (declare, has, Version, QCSFeedDataStore, uri) {

	var VersionFeedDataStore = declare("com.ibm.social.ee.data.VersionFeedDataStore", QCSFeedDataStore, {
	   
	   loadItem: function(keywordArgs) {      
	      var params = {};
	      if(has("ie"))
	         params.format = "xml";
	      if (this.iw.svrSprt){
	         if (this.iw.svrSprt.tags)
	            params.includeTags = true;
	         if (this.iw.svrSprt.acls)
	            params.acls = true;
	      }
	      this.inherited(arguments, [keywordArgs, params]);
	   },
	      
	   itemFromDocElAndCat: function(el, base, category, keywordArgs) {
	      return this.itemFromDocEl(el, base);
		},
		
		itemFromDocEl: function(el, base) {
	      return new Version(el, base);
	   },
	   
	   _fetch: function (request) {
	      var params = this.getStdParams(request);
	      
	      params.category = ["version"];
	      params.acls = true;
	      var feedUrl = uri.rewriteUri(this.url, params);
	      request.url = feedUrl;
	      request.params = params;
	      this.inherited(arguments, [request]);        
	   },
	   
	   dataLoaded: function(request, doc, ioArgs) {
	      var opts = {
	         checkForNext: true
	      };
	      this.inherited(arguments, [request, doc, ioArgs, opts]);
	   },
	   
	   _createNewItem: function (keywordArgs, parentInfo) {
	   	return new Version(null);
	   }
	
	});
	return VersionFeedDataStore;
});
