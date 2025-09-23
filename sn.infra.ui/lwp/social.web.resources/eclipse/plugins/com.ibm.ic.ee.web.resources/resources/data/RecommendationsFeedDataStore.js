/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/date/stamp",
	"dojo/topic",
	"ic-ee/bean/User",
	"ic-ee/data/DomBuilder",
	"ic-ee/data/FeedDataStore",
	"ic-incontext/util/atom",
	"ic-incontext/util/dom",
	"ic-incontext/util/misc",
	"ic-incontext/util/uri"
], function (dojo, declare, stamp, topic, User, DomBuilder, FeedDataStore, atom, dom, misc, uri) {

	var RecommendationsFeedDataStore = declare("com.ibm.social.ee.data.RecommendationsFeedDataStore", FeedDataStore, {
	   requireData: false,
	   constructor: function() {
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
	   //Return the last count updated recommendation sorted by name
	   preprocessItems: function(items, request) {
		   var count = request.count;
		   if(items.length <= count )
			   return misc.sort(items, "name");
		   
		   var sortedByModificationDate =  misc.sort(items, "updated");
		   var lastUpdated =  sortedByModificationDate.slice (-count);
		   return misc.sort(lastUpdated, "name"); 
	   }, 
	   getValue: function ( item, attribute, defaultValue) {
	      if (attribute in item) {         
	         return item[attribute];
	      }
	      return defaultValue;
	   },
	   noLoad: function (request, data) {
		  var opts = opts ? opts : {};
	      var items = request.items ? request.items : [];
	      this.totalItems = data.totalSize;
	      var target = (request.scope) ? request.scope : kernel.global;
	      if (request.onBegin) {
	         request.onBegin.call(target, this.totalItems, request);
	      }
	      if (request.onComplete) {
	         var itemsParam = (request.onItem) ? null : items;
	         request.onComplete.call(target, itemsParam, request);
	      }
	   },
	   itemFromDocEl: function(el, base) {
		   var qsu = dom; 
		   var user =  new User(qsu.getChildElement(el, "contributor"), base);
		   var updated = qsu.getChildElementTextContent(el, "updated");
		   user.updated = stamp.fromISOString(updated);
		   return user;
	   },
	   getFetchHandleAs: function () {
	      return "xml";
	   },
	   _fetch: function (request) {
	      if (!this.countOnly) {
	         request.url = this.url;
	         this.inherited(arguments, [request]);    
	      }
	      else {
	         this.noLoad(request, { items: [ ], totalSize: this.recommendCount });
	      } 
	   },
	   _getNewItemUrl: function(item) {
	      return this.url;
	   },
	   _getPostBody: function(attrs) {
	      return "";
	   },
	   _newItem: function(item, keywordArgs) {
	      topic.publish("com/ibm/social/ee/like/beforeLike");
	      keywordArgs.recommending = true;
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
	      if ((!keywordArgs.requests || keywordArgs.requests == 0) && keywordArgs.onComplete) {
	    	  if (keywordArgs.recommending) {
	    	     topic.publish("com/ibm/social/ee/like/liked");
	    		  this.hasRecommended = true;
	    		  this.recommendCount = this.baseCount + 1;
	    	  }
	    	  else {
	    	     topic.publish("com/ibm/social/ee/like/unliked");
	    		  this.hasRecommended = false;
	    		  this.recommendCount = this.baseCount;
	    	  }
	    	  keywordArgs.onComplete.call(scope, response, ioArgs);
	      }
	         
	   },        
	   _deleteItem: function(item, keywordArgs) {   
	        topic.publish("com/ibm/social/ee/like/beforeUnlike");
	    	  keywordArgs.recommending = false;
	    	  this.inherited(arguments);
	   },
	   _getDeleteItemUrl: function (item) {
	      return this.url;
	   },
	   getDeleteHandleAs: function() {
		      return "text"; 
	   },
	   getTotalItems: function(el) {
		   return this.getDataLoadedEntries(el).length;   
	   } 
	});
	return RecommendationsFeedDataStore;
});
