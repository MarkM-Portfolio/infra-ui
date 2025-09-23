/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/date/stamp",
	"dojo/json",
	"ic-ee/bean/SUPermission",
	"ic-ee/data/DataStore",
	"ic-ee/util/misc",
	"ic-incontext/util/dom",
	"ic-incontext/util/uri"
], function (dojo, array, declare, lang, stamp, JSON, SUPermission, DataStore, misc, dom, uri) {

	var SUCommentsDataStore = declare("com.ibm.social.ee.data.SUCommentsDataStore", DataStore, {
	   itemsFetched: false,
	   dateAttrs: ["published", "updated"],
	   permissionsUrl: null,
	   attrMap: {
	      "id" : "id",
	      "author": function(item) { return { "id": misc.getItemId(item.author.id), "name": item.author.displayName }; },
	      "contents": "content",
	      "totalRecommendations": "likes.totalItems",
	      "hasRecommended": function (item) {
	         if (item.likes && item.likes.items)
	            return item.likes.items.length > 0;
	         else
	            return false;
	      },
	      "likesFeed": function (item) {
	         // Simply manipulate the comments url, given that the feed doesn't include a url
	         return this.url.substring(0, this.url.lastIndexOf("@all/") + 5) + item.id + "/likes";
	      },
	      "updated" : function (item) { return stamp.fromISOString(item.published); },
	      "published" : function(item) { return stamp.fromISOString(item.published); },
	      "urlEntry" : function(item) { 
	         var urlEntry = lang.getObject("ds.attributes.urlEntry", false, item);
	         if (urlEntry) 
	            return urlEntry;
	         else
	            return this.url + "/" + item.id;         
	      },
	      "permissions" : function(item) { return item.permissions ? item.permissions : { }; }
	   },
	   _fetch: function (request) {
	      if (!this.itemsFetched)
	         this._preloadedFetch(request);
	      else {
	         var params = this.getUrlParams(request);
	         request.url = uri.rewriteUri(this.url, params);
	         this.inherited(arguments);
	      }
	   },
	   getUrlParams: function (request) {
	      var params = {};
	      var start, count;
	      this.skipCount = 0;      
	      /* Adjust parameters to page boundaries in the back-end */
	      if ("start" in request && "count" in request) {
	         start = request.start;
	         count = request.count;
	         var endIndex = start+count;
	         var pageSize = count;
	         while (Math.floor(start / pageSize) * pageSize + pageSize < endIndex) {
	            pageSize++;
	         }
	         count = pageSize;
	         this.skipCount =  start % pageSize;
	         start = Math.floor(start / pageSize) + 1;
	      }
	      else if (request.start)
	         start = request.start + 1;      
	      else if (request.count)
	         count = request.count;
	     
	      
	      if (start) {
	         params.startIndex = start;
	      }
	      if (count) {
	         params.count = count;
	      }
	      if (request.sort && request.sort.length > 0) {
	         params.sortBy = request.sort[0].attribute;
	         params.sortOrder = (request.sort[0].descending) ? "descending" : "ascending";
	      }
	      return params;
	   },
	   getFetchHandleAs: function () {
		   return "json";
	   },
	   dataLoaded: function (request, response) {
		   var i, j, items = response.list;	   
		   if (items) {
		      items = items.splice(this.skipCount, request.count || items.length);
			   for (i = 0; i < items.length; i++) {
				   var item = items[i];
				   item.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
				   item.isFullyLoaded = true;
			   }
		   }
		   function respondToCaller() {
	   	   var target = (request.scope) ? request.scope : kernel.global;
	         if (request.onBegin) {
	            request.onBegin.call(target, response.totalResults, request);
	         }
	         if (request.onItem) {
	            for (i = this.skipCount; i < Math.min(items.length, request.count); i++) {
	               request.onItem.call(target, items[i], request);
	            }
	         }
	         if (request.onComplete) {
	            var itemsParam = (request.onItem) ? null : items;
	            request.onComplete.call(target, itemsParam, request);
	         }
		   }
		   if (this.permissionsUrl && items.length) {
		      // Retrieve permissions for the fetched items
		      var requestUrl = this.permissionsUrl + "?";
		      for (i = 0; i < items.length; i++) {
		         if (i > 0)
		           requestUrl += "&";
		         var shortId = misc.getItemId(items[i].id);
		         requestUrl += ("action=DELETE_COMMENT&entityId="+shortId);
		      }
		      
		      var util = com.ibm.social.incontext.util;
		      var self = this;
	         var opts = {
	            url: requestUrl,
	            handleAs: "xml",         
	            handle: function(response, ioArgs) {
	               if (!(response instanceof Error) && response.documentElement) {
	                  var entries = util.dom.getChildElementsNS(response.documentElement, "entry", util.dom.ATOM_NAMESPACE);
	                  for (i = 0; i < entries.length; i++) {
	                     var permission = new SUPermission(entries[i]);
	                     var entityId = permission.getEntityId();
	                     for (j = 0; j < items.length; j++) {
	                        var shortId = misc.getItemId(items[j].id);
	                        if (shortId === entityId) {
	                           items[j].permissions = { Delete: permission.getResult() };
	                           break;
	                        }
	                     }
	                  }
	               }
	               respondToCaller(self);               
	            },
	            scope: this,
	            preventCache: true
	         };        
	         request.httpReq = this.net.get(opts);  
		   } else {
		      respondToCaller.call(this);
		   }	   
	   },
	   _preloadedFetch: function (request) {
	      var i;
	      this.itemsFetched = true;
	      var items = this.items || request.items || [];
	      for (i = 0; i < items.length; i++) {
	         var item = items[i];
	         item.ds = {attributes:{ }, isNew: false, isDirty: false };
	         item.category = "comment";
	         item.preloaded = true;         
	      }      
	      
	      if (!("totalItems" in this)) this.totalItems = request.totalItems;
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
	   isItem: function (item) {
	      if (item.preloaded)
	         return true;
	      else 
	         return this.inherited(arguments);
	   },
	   getValue: function (item, attribute, defaultValue) {
	      if (item.preloaded) {
	         if (array.indexOf(this.dateAttrs, attribute) > -1) {
	            return stamp.fromISOString(item[attribute]);
	         }
	         if (attribute in item) {
	            return item[attribute];
	         }
	         else
	            return defaultValue;
	      }
	      else {
	         if (attribute in this.attrMap) {
	            var valueMap = this.attrMap[attribute];
	            if (lang.isFunction(valueMap))
	               return valueMap.call(this, item);
	            else
	               return lang.getObject(valueMap, false, item);
	         }
	         return defaultValue;
	      }
	   },
	   _newItem: function(item, keywordArgs) {
	      var postBody = JSON.stringify({"content": item.ds.attributes.contents});
	      this.net.postJson({
	         noStatus: true,
	         url: this.url,
	         postData: postBody,
	         requireData: true,
	         headers: {"Content-Type":"application/json; charset=utf-8"},
	         handle: lang.hitch(this, this._saveItemComplete, item, keywordArgs)
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
	      if ((!keywordArgs.requests || keywordArgs.requests === 0) && keywordArgs.onComplete) {         
	         if (this.permissionsUrl && response.entry) {
	            var item = response.entry;
	            // Retrieve permissions for the fetched items
	            var requestUrl = this.permissionsUrl + "?";
	            var shortId = misc.getItemId(item.id);
	            requestUrl += ("action=DELETE_COMMENT&entityId="+shortId);
	            
	            var util = com.ibm.social.incontext.util;
	            var self = this;
	            var opts = {
	               url: requestUrl,
	               handleAs: "xml",         
	               handle: function(response, ioArgs) {
	                  if (!(response instanceof Error) && response.documentElement) {
	                     var entries = util.dom.getChildElementsNS(response.documentElement, "entry", util.dom.ATOM_NAMESPACE);
	                     for (i = 0; i < entries.length; i++) {
	                        var permission = new SUPermission(entries[i]);
	                        var entityId = permission.getEntityId();
	                        if (shortId === entityId) {
	                           item.permissions = { Delete: permission.getResult() };
	                           break;
	                        }
	                     }
	                  }
	                  keywordArgs.onComplete.call(scope, item, ioArgs);
	               },
	               scope: this,
	               preventCache: true
	            };        
	            this.net.get(opts);  
	         } else {
	            keywordArgs.onComplete.call(scope, response.entry, ioArgs);           
	         }
	      }
	         
	   },
	   _deleteItem: function(item, keywordArgs) {
	      var url = this.getValue(item,"urlEntry");
	      this.net.deleteXml({
	         url: url,
	         handle: lang.hitch(this, this._saveItemComplete, item, keywordArgs),
	         headers: {"Content-Type": "application/json; charset=utf-8"},
	         handleAs: "json"
	      });
	   }
	   
	});
	return SUCommentsDataStore;
});
