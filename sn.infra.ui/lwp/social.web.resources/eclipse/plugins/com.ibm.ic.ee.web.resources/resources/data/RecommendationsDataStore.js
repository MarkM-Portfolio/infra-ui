/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/topic",
	"ic-ee/data/QCSFeedDataStore",
	"ic-incontext/util/atom",
	"ic-incontext/util/uri"
], function (dojo, declare, topic, QCSFeedDataStore, atom, uri) {

	var RecommendationsDataStore = declare("com.ibm.social.ee.data.RecommendationsDataStore", QCSFeedDataStore, {
	
	   constructor: function () {
	      this.baseCount = this.recommendCount - (this.hasRecommended ? 1 : 0);
	   },
	         
	   _getIdentifierAttribute: function () {
	      return "id";
	   },
	        
	   fetchItemByIdentity: function ( request ) {
	      if (!this.authUser.ds) {
	         this.authUser.isFullyLoaded = true;
	         this.authUser.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	      }
	      if (request.onItem) {
	         request.onItem.apply(this, [this.hasRecommended ? this.authUser : null]);
	      }
	   },
	   
	   isItem: function (item) {
	      if ("id" in item) {
	         return true;
	      }
	      return false;
	   },
	   
	   getValue: function ( item, attribute, defaultValue) {
	      if (attribute in item) {         
	         return item[attribute];
	      }
	      return defaultValue;
	   },
	   dataLoaded: function (request, data) {
	      var opts = opts ? opts : {};
	      var items = request.items ? request.items : [];
	      for( var i=0; i < data.items.length; i++ ) {
	         var item =data.items[i];
	         item.isFullyLoaded = true;
	         item.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	         items.push(item);
	      }
	      this.totalItems = data.totalSize;
	      var target = (request.scope) ? request.scope : kernel.global;
	      if (request.onBegin) {
	         request.onBegin.call(target, this.totalItems, request);
	      }
	      if (request.onItem) {
	         for (i = 0; i < items.length; i++) {
	            request.onItem.call(target, items[i], request);
	         }
	      }
	      if (request.onComplete) {
	         var itemsParam = (request.onItem) ? null : items;
	         request.onComplete.call(target, itemsParam, request);
	      }
	   },
	   getFetchHandleAs: function () {
	      return "json";
	   },
	   _fetch: function (request) {
	      if (!this.countOnly) {
	         var params = this._addAddtlParams(request);
	         var feedUrl = uri.rewriteUri(this.url, params);
	         request.url = feedUrl;
	         request.params = params;
	         this.inherited(arguments, [request]);    
	      }
	      else {
	         this.dataLoaded(request, { items: [ ], totalSize: this.recommendCount });
	      } 
	   },
	   _addAddtlParams: function(request) {
	      request.sort = [{attribute: "createdByName", descending: false}];   
	      var params = this.getStdParams(request);
	      params.format = "json";
	      return params;
	   },
	   _getNewItemUrl: function(item) {
	      return this.documentFeed;
	   },
	   _getPostBody: function(attrs) {
	      return this.inherited(arguments, [{ category: "recommendation" }]);
	   },
	   _newItem: function(item, keywordArgs) {
	      keywordArgs.recommending = true;
	      topic.publish("com/ibm/social/ee/like/beforeLike");
	      this.inherited(arguments);
	   },
	   
	   _saveItemComplete: function(item, keywordArgs, response, ioArgs, recommended) {
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
	         error = atom.getError(response, ioArgs);
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
	    	  if (keywordArgs.recommending) {
	    		  this.hasRecommended = true;
	    		  this.recommendCount = this.baseCount + 1;
	    		  this.captureResponseUrl(response);
	    		  topic.publish("com/ibm/social/ee/like/liked");
	    	  }
	    	  else {
	    		  this.hasRecommended = false;
	    		  this.recommendCount = this.baseCount;
	    		  topic.publish("com/ibm/social/ee/like/unliked");
	    	  }
	    	  keywordArgs.onComplete.call(scope, response, ioArgs);
	      }
	         
	   },        
	   _deleteItem: function(item, keywordArgs) {
	      keywordArgs.recommending = false;
	      topic.publish("com/ibm/social/ee/like/beforeUnlike");
	      this.inherited(arguments);
	   },
	   _getDeleteItemUrl: function (item) {
	      return this.entryUrl;
	   },
	   captureResponseUrl: function(response) {}
	});
	return RecommendationsDataStore;
});
