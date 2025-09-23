/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.RecommendationsFeedDataStore");
dojo.require("com.ibm.social.ee.data.FeedDataStore");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.data.DomBuilder");
dojo.require("com.ibm.social.incontext.util.atom");
dojo.require("com.ibm.social.ee.bean.User");
dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("dojo.date.stamp");

dojo.declare("com.ibm.social.ee.data.RecommendationsFeedDataStore", [com.ibm.social.ee.data.FeedDataStore], {
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
		   return com.ibm.social.incontext.util.misc.sort(items, "name");
	   
	   var sortedByModificationDate =  com.ibm.social.incontext.util.misc.sort(items, "updated");
	   var lastUpdated =  sortedByModificationDate.slice (-count);
	   return com.ibm.social.incontext.util.misc.sort(lastUpdated, "name"); 
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
      var target = (request.scope) ? request.scope : dojo.global;
      if (request.onBegin) {
         request.onBegin.call(target, this.totalItems, request);
      }
      if (request.onComplete) {
         var itemsParam = (request.onItem) ? null : items;
         request.onComplete.call(target, itemsParam, request);
      }
   },
   itemFromDocEl: function(el, base) {
	   var qsu = com.ibm.social.incontext.util.dom; 
	   var user =  new com.ibm.social.ee.bean.User(qsu.getChildElement(el, "contributor"), base);
	   var updated = qsu.getChildElementTextContent(el, "updated");
	   user.updated = dojo.date.stamp.fromISOString(updated);
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
      dojo.publish("com/ibm/social/ee/like/beforeLike");
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
      var scope = keywordArgs.scope ? keywordArgs.scope : dojo.global;
      //if an error occurred call onError
      var error;
      if(typeof response == "Error" || response instanceof Error){
         error = response;}
      else {
         error = com.ibm.social.incontext.util.atom.getError(response, ioArgs);
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
    	     dojo.publish("com/ibm/social/ee/like/liked");
    		  this.hasRecommended = true;
    		  this.recommendCount = this.baseCount + 1;
    	  }
    	  else {
    	     dojo.publish("com/ibm/social/ee/like/unliked");
    		  this.hasRecommended = false;
    		  this.recommendCount = this.baseCount;
    	  }
    	  keywordArgs.onComplete.call(scope, response, ioArgs);
      }
         
   },        
   _deleteItem: function(item, keywordArgs) {   
        dojo.publish("com/ibm/social/ee/like/beforeUnlike");
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