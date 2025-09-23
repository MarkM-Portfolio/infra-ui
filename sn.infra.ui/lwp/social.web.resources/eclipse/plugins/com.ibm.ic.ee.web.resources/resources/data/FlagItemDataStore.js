/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/bean/FlagItem",
	"ic-ee/data/DomBuilder",
	"ic-ee/data/FeedDataStore",
	"ic-incontext/util/atom",
	"ic-incontext/util/dom",
	"ic-incontext/util/uri"
], function (declare, lang, FlagItem, DomBuilder, FeedDataStore, atom, dom, uri) {

	var FlagItemDataStore = declare("com.ibm.social.ee.data.FlagItemDataStore", FeedDataStore, {
	
	   _createNewItem: function (keywordArgs, parentInfo) {
	   	return new FlagItem(null);
		},
	   _getPostBody: function(attrs) {
	      if(!this.domBuilder)
	         this.domBuilder = new DomBuilder();
	   	return this.domBuilder.getFlagItemPostBody(attrs);
	   },
	   _newItem: function(item, keywordArgs) {
	      this.net.postXml({
			   noStatus: true,
			   handleAs: "text",
			   url: this._getNewItemUrl(item),
			   postData: this._getPostBody(item.ds.attributes),
			   requireData: true,
			   headers: {"Content-Type":"application/atom+xml;charset=\"UTF-8\""},
			   handle: lang.hitch(this, this._saveItemComplete, item, keywordArgs)
			}); 
	   }
	});
	
	
	return FlagItemDataStore;
});
