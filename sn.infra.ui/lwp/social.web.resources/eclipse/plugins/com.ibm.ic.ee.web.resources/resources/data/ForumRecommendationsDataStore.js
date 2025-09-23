/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/kernel",
	"dojo/topic",
	"ic-ee/bean/ForumRecommendation",
	"ic-ee/data/FeedDataStore",
	"ic-incontext/util/atom",
	"ic-incontext/util/dom",
	"ic-incontext/util/text"
], function (dojo, declare, topic, ForumRecommendation, FeedDataStore, atom, dom, text) {

	var ForumRecommendationsDataStore = declare("com.ibm.social.ee.data.ForumRecommendationsDataStore", FeedDataStore, {
	
	   constructor: function () {
	      this.baseCount = this.recommendCount - (this.hasRecommended ? 1 : 0);
	   },
	         
	   _getIdentifierAttribute: function () {
	      return "id";
	   },
	   
	   itemFromDocEl: function (el, base) {
	      return new ForumRecommendation(el, base);
	   },   
	   
	   _getDeleteItemUrl: function (item) {
	      return this.url;
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
	   
	   isItem: function (obj) { 
	      return obj && obj.id;
	   },
	         
	   _fetch: function (request) {
	      if (!this.countOnly) {
	         this.inherited(arguments);    
	      }
	      else {
	         this.dataLoaded(request, { items: [ ], totalSize: this.recommendCount });
	      } 
	   },
	   dataLoaded: function(request, data, ioArgs, opts) {
	      var error = atom.getError(data, ioArgs);
	      if (!error && "totalSize" in data) {
	         this.totalItems = data.totalSize;
	         var target = (request.scope) ? request.scope : kernel.global; 
	         if (request.onBegin) {
	            request.onBegin.call(target, this.totalItems, request);
	         }
	         if (request.onComplete) {
	            request.onComplete.call(target, null, request);
	         }      
	      }
	      else {
	         this.inherited(arguments);
	      }
	   },   
	   _getPostBody: function(attrs) {
	      var du = dom;
	      var doc = du.newXMLDocument("entry",du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE,du.SNX_NAMESPACE]);
	      var entry = doc.documentElement;
	      var titleElement = du.createElementNS(doc,"title",du.ATOM_NAMESPACE);
	         titleElement.appendChild(doc.createTextNode("like"));
	      entry.appendChild(titleElement);
	      var category = du.createElementNS(doc,"category",du.ATOM_NAMESPACE);
	         category.setAttribute("term", "recommendation");
	         category.setAttribute("scheme", "http://www.ibm.com/xmlns/prod/sn/type");
	      entry.appendChild(category);
	      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
	      return text.trim(postBody);
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
	        var newItem = null;
	        if (keywordArgs.recommending) {
	           this.hasRecommended = true;
	           this.recommendCount = this.baseCount + 1;
	           newItem = this.itemFromDocEl(response.documentElement);
	           newItem.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	           topic.publish("com/ibm/social/ee/like/liked");
	        }
	        else {
	           this.hasRecommended = false;
	           this.recommendCount = this.baseCount;
	           newItem = response;
	           topic.publish("com/ibm/social/ee/like/unliked");
	        }
	        keywordArgs.onComplete.call(scope, newItem, ioArgs);
	      }
	         
	   },        
	   _deleteItem: function(item, keywordArgs) {
	      keywordArgs.recommending = false;
	      topic.publish("com/ibm/social/ee/like/beforeUnlike");
	      this.inherited(arguments);
	   },
	   getTotalItems: function (el) {
	      var du = dom;
	      var totalResults = du.getChildElementTextContentNS(el, "totalResults", du.OPENSEARCH_NAMESPACE);
	      if (totalResults) {
	         return parseInt(totalResults);
	      }
	      return 0;
	   }
	});
	return ForumRecommendationsDataStore;
});
