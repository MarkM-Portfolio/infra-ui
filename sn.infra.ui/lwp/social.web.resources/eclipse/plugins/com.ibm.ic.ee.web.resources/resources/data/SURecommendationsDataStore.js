/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/date/stamp",
	"dojo/topic",
	"ic-ee/data/DataStore",
	"ic-ee/data/_JsonRecommendationsMixin",
	"ic-incontext/util/uri"
], function (dojo, declare, lang, stamp, topic, DataStore, _JsonRecommendationsMixin, uri) {

	(function () {
	   var uu = uri;
	   var SURecommendationsDataStore = declare("com.ibm.social.ee.data.SURecommendationsDataStore", [DataStore, _JsonRecommendationsMixin], {
	    constructor: function () {
	       this.baseCount = this.recommendCount - (this.hasRecommended ? 1 : 0);
	    }, 
	    _getIdentifierAttribute: function () {
	       return "id";
	    },
	    isItem: function (item) {
	       if ("id" in item) {
	          return true;
	       }
	       return false;
	    },
	    getFetchHandleAs: function () {
	       return "json";
	    },
	    fetchItemByIdentity: function ( request ) {
	      var userId = request.identity;
	      if (!this.retrievedRecommend) {
	         var url = this._rewriteUrl(this.url, request.identity);
	         this.net.get({
	            url: url,
	            handleAs: "json",
	            failOk: true,
	            preventCache: true,
	            handle: lang.hitch(this, function (response, ioArgs) {
	               this.retrievedRecommend = true;
	               var user = null;
	               if (typeof response != "Error" || !(response instanceof Error)) {
	                  var id = lang.getObject("entry.author.id", false, response);
	                  if (id) {                  
	                     var name = lang.getObject("entry.author.displayName", false, response);
	                     user = { name: name, id: id, 
	                              ds: {isDirty: false, isDeleted: false, isNew: false, 
	                                   attributes: {}}, 
	                              isFullyLoaded: true };
	                  }
	               }
	               if (request.onItem) {
	                  var scope = request.scope ? request.scope : kernel.global;
	                  request.onItem.apply(scope, [user]);
	               }
	            })
	         });
	      }
	      else {
	         this._getRecommendation(request);
	      }
	   },
	   _newItem: function(item, keywordArgs) {
	      topic.publish("com/ibm/social/ee/like/beforeLike");
	      this.net.postJson({
	         url: this.url,
	         handleAs: "json",
	         postData: "",
	         headers: {"Content-Type":"application/json; charset=utf-8"},
	         handle: lang.hitch(this, this._recommended, item, keywordArgs)
	      });
	   },
	   _recommended: function (item, keywordArgs, response, ioArgs) {
	   	  var published = lang.getObject("entry.published", false, response);
	      topic.publish("com/ibm/social/ee/like/liked", published ? stamp.fromISOString(published) : null);
	      this.hasRecommended = true;
	      this.recommendCount = this.baseCount + 1;
	      this._saveItemComplete(item, keywordArgs, response, ioArgs);
	   },
	   
	   _unRecommended: function (item, keywordArgs, response, ioArgs) {
	      this.hasRecommended = false;
	      this.recommendCount = this.baseCount;  
	      topic.publish("com/ibm/social/ee/like/unliked");    
	      this._saveItemComplete(item, keywordArgs, response, ioArgs);
	   },
	   _deleteItem: function(item, keywordArgs) {
	      topic.publish("com/ibm/social/ee/like/beforeUnlike");
	      this.net.deleteXml({
	         url: this.url + "/" + item.id,
	         handle: lang.hitch(this, this._unRecommended, item, keywordArgs),
	         headers: {"Content-Type": "application/json; charset=utf-8"},
	         handleAs: "json"
	      });
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
	      if(typeof response == "Error" || response instanceof Error)
	         error = response;
	      if(error && error.code) {
	         if (keywordArgs.onError) {
	            keywordArgs.onError.call(scope, error);
	         }
	         return;
	      }      
	      //if we have no more requests to complete
	      if ((!keywordArgs.requests || keywordArgs.requests === 0) && keywordArgs.onComplete)
	         keywordArgs.onComplete.call(scope, response, ioArgs);
	   },
	   _rewriteUrl: function(url, identity) {
	      return url + "/" + identity;
	   },
	   _getEmptyResult: function() {
	      return { list: [ ], totalResults: this.recommendCount };
	   },
	   _getList: function(data) {
	      return data.list;
	   },
	   _getAuthorName: function(item) {
	      return item.author.displayName;
	   },
	   _getAuthorId: function(item) {
	      return item.author.id;
	   },
	   _getTotalResults: function(data) {
	      return data.totalResults;
	   }
	});
	
	})();
	
	
	return SURecommendationsDataStore;
});
