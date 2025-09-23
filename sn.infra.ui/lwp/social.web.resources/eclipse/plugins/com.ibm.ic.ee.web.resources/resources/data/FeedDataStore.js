/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/kernel",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/data/DataStore",
	"ic-incontext/util/uri",
	"ic-incontext/util/url"
], function (dojo, kernel, declare, lang, DataStore, uriModule, urlModule) {

	(function () {
	
	var util = com.ibm.social.incontext.util;
	var FeedDataStore = declare("com.ibm.social.ee.data.FeedDataStore", DataStore, {
	   requireData: true,
	
	   // Override this function when special uri handling is needed
	   rewriteUri: function (uri, params) {
	   	if (params)
	   	    return util.url.rewrite(uri, params);
	   	else
	   	    return uri;
	   },
	
	   _newItem: function(item, keywordArgs) {
	      var postBody = this._getPostBody(item.ds.attributes);
	      this.net.postXml({
	         noStatus: true,
	         url: this._getNewItemUrl(item),
	         postData: postBody,
	         requireData: this.requireData,
	         headers: {"Content-Type":"application/atom+xml;charset=\"UTF-8\""},
	         handle: lang.hitch(this, this._saveItemComplete, item, keywordArgs)
	      });
	   },
	   
	   _getNewItemUrl: function(item) {
	      return this.url;
	   },
	   
	   _deleteItem: function(item, keywordArgs) {
	      var url = this._getDeleteItemUrl(item);
	      this.net.deleteXml({
	         url: this.rewriteUri(url,{}),
	         handle: lang.hitch(this, this._saveItemComplete, item, keywordArgs),
	         headers: {"Content-Type": "application/atom+xml;charset=\"UTF-8\""},
	         handleAs: this.getDeleteHandleAs()
	      });
	   },
	   
	   _getDeleteItemUrl: function (item) {
	      return this.getValue(item,"urlEntry");
	   },
	   
	   getDeleteHandleAs: function() {
	      return "xml"; 
	   },
	   
	   _saveItem: function (item, keywordArgs) {
	      var attrs = this._getSaveItemAttrs(item);
	      var putBody = this._getPutBody(attrs);
	      this.net.putXml({
	         noStatus: true,
	         url: this._getSaveItemUrl(item, attrs),
	         postData: putBody,
	         headers: {"Content-Type":this._getSaveItemHeadersContentType()},
	         handle: lang.hitch(this, this._saveItemComplete, item, keywordArgs)
	      });
	   },
	   
	   _getSaveItemHeadersContentType: function() {
	      return "application/atom+xml;charset=\"UTF-8\"";
	   },
	   
	   _getSaveItemAttrs: function(item) {
	      return item.ds.attributes;
	   },
	   
	   _getSaveItemUrl: function(item) {
	      var url = this.getValue(item,"urlEntry");
	      return this.rewriteUri(url);
	   },
	   
	   _getPostBody: function(attrs) {
	      return this._domBuilder.getPostBody(attrs);
	   },
	   
	   _getPutBody: function(attrs) {
	      return this._getPostBody(attrs);
	   },
	   
	   _saveItemComplete: function(item, keywordArgs, response, ioArgs) {
	      item.isFullyLoaded = false;
	      item.ds.isDirty = false;
	      item.ds.isNew = false;
	      //note: dont reset item.isDeleted, if its deleted its no longer a valid item      
	      if (keywordArgs.requests)
	         keywordArgs.requests--;
	      var scope = keywordArgs.scope ? keywordArgs.scope : kernel.global;
	      //if an error occurred call onError
	      var error;
	      if(typeof response == "Error" || response instanceof Error){
	         error = response;}
	      else {
	         error = util.atom.getError(response, ioArgs);
	      }
	      if(error && error.code) {
	         if (keywordArgs.onError) {
	            keywordArgs.onError.call(scope, error);
	         }
	         return;
	      }
	      else {
	         if(item.setDocumentElement && response && response.documentElement)
	            item.setDocumentElement(response.documentElement);
	      }
	      
	      //if we have no more requests to complete
	      if ((!keywordArgs.requests || keywordArgs.requests === 0) && keywordArgs.onComplete) {
	         
	         var newItem = null;
	         if (response) {
	            if (item && item.ds && item.ds.isDeleted) {
	               newItem = response;
	            }
	            else {
	               newItem = this.itemFromDocEl(response.documentElement);
	               newItem.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	               this.initializeItem(newItem);
	            }
	         } 
	         keywordArgs.onComplete.call(scope, newItem, ioArgs);
	      }
	   },     
	   
	   dataLoaded: function (request, doc, ioArgs, opts) {  
	      var i, opts = opts ? opts : {};
	      var error = util.atom.getError(doc, ioArgs);
	      if (error && error.type) {
	         this.dataError(request, error);
	         return;
	      }      
	      var el = doc.documentElement;
	      var base = util.dom.getAttributeNS(el,"base",util.dom.XML_NAMESPACE);   
	      this.preInitializeItems(request, el, base);
	      var entries = this.getDataLoadedEntries(el);   
	      var items = request.items ? request.items : [];
	      for(i=0; i < entries.length; i++ ) {
	         var item = this.itemFromDocEl(entries[i], base);
	         item.isFullyLoaded = true;
	         item.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	         this.initializeItem(item);
	         items.push(item);
	      }
	      this.totalItems = this.getTotalItems(el);
	      if (opts.checkForNext && this.totalItems < 0) {
	         var next = util.dom.getChildElementAttributeMatchingNS(el, "link", util.dom.ATOM_NAMESPACE, "rel", null, "next", "href");
	         if (next)
	            request.nextFlag = true;
	      }              
	      
	      var preprocessedItems = this.preprocessItems(items, request);
	      
	      var target = (request.scope) ? request.scope : kernel.global;
	      if (request.onBegin) {
	         request.onBegin.call(target, this.totalItems, request);
	      }
	      if (request.onItem) {
	         for (i = 0; i < preprocessedItems.length; i++) {
	            request.onItem.call(target, preprocessedItems[i], request);
	         }
	      }
	      if (request.onComplete) {
	         var itemsParam = (request.onItem) ? null : preprocessedItems;
	         request.onComplete.call(target, itemsParam, request);
	      }
	      
	      this.postInitializeItems(request);
	   },  
	   preprocessItems: function(items, request) {
		   return items;
	   },
	   
	   getDataLoadedEntries: function(el) {
	      return util.dom.getChildElementsNS(el, "entry", util.dom.ATOM_NAMESPACE);  
	   },
	   
	   getTotalItems: function(el) {      
	      return -1;
	   },
	   
	   initializeItem: function(item) {},
	   
	   preInitializeItems: function(request, el, base) {},
	   
	   postInitializeItems: function(request) {},
	   
	   itemError: function (keywordArgs, error, ioArgs) {
	      if (keywordArgs.onError) {
	         var atomError = util.atom.getError(error, ioArgs);
	         var scope = keywordArgs.scope ? keywordArgs.scope : kernel.global;
	         keywordArgs.onError.call(scope, atomError ? atomError : error);
	      }
	   },
	   
	   itemLoaded: function (keywordArgs, result, ioArgs) {
	      var error = util.atom.getError(result, ioArgs);
	      if (error  && error.type) {
	         var scope = keywordArgs.scope ? keywordArgs.scope : kernel.global;
	         if (keywordArgs.onError)
	            keywordArgs.onError.call(scope, error);
	         return;
	      }
	      var el = result.documentElement;
	      var category = this.getCategory(el);
	      var newItem = this.itemFromDocElAndCat(el, null, category, keywordArgs);
	      if (newItem.isFullyLoaded !== false && newItem.isFullyLoaded !== true)
	      {
	         newItem.isFullyLoaded = true;
	      }
	      newItem.ds = keywordArgs.item.ds;
	      newItem.ds.attributes = {};
	      var scope = keywordArgs.scope ? keywordArgs.scope : kernel.global;
	      if (keywordArgs.onItem)
	         keywordArgs.onItem.call(scope, newItem);
	   },
	   
	   loadItem: function(keywordArgs, params){
	      var item = keywordArgs.item;
	      var sync = keywordArgs.sync ? true : false;
	      if ((!this.isItemLoaded(item)) || keywordArgs.forceLoad) {
	         var itemUrl = this.getValue(item, "urlEntry");
	         itemUrl = this.rewriteUri(itemUrl, params);
	         var opts = {
	            url: itemUrl,
	            handleAs: "xml",
	            timeout: this.timeout,
	            sync: sync,
	            handle: lang.hitch(this, this.handleGet, lang.hitch(this, this.itemLoaded, keywordArgs), lang.hitch(this, this.itemError, keywordArgs))
	         };
	         this.net.get(opts);
	      }
	   },
	   
	   itemFromDocElAndCat: function (el, base, category, keywordArgs) {
	      return null;
	   }
	   
	});
	})();
	return FeedDataStore;
});
