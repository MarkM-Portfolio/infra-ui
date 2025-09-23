/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/data/DataStore",
	"ic-incontext/util/atom",
	"ic-incontext/util/uri",
	"ic-incontext/util/url"
], function (dojo, array, declare, lang, DataStore, atom, uri, url) {

	var HistoryDataStore = declare("com.ibm.social.ee.data.HistoryDataStore", DataStore, {
	   url: null,
	   net: null,
	   prevItem: null,
	   pageNumber: 1,
	   defaultPageSize: 20,
	   isDesc: true,
	   disableSort: true,
	   attrMap: {
	      "id": function(item) { return item.id; },
	      "author": function(item) { return {name: item.actor.displayName, id: item.actor.id}; },
	      "plainTitle" : function(item) { return item.connections.plainTitle; },
	      "shortTitle" : function(item) { return item.connections.shortTitle; },
	      "published": function(item) {
	         return dojo.date.stamp.fromISOString(item.published); 
	      }
	   },
	   _fetch: function(request) {
	      var params = this._getUrlParams(request);
	      request.url = uri.rewriteUri(this.url, params);
	      request.params = params;
	      this.inherited(arguments, [request]);
	   },
	   getFetchHandleAs: function() {
	      return "json";
	   },
	   dataLoaded: function (request, obj) {
	     var items;
	      if (obj) {   
	         if (obj.list && obj.list.length > 0) {
	            var entries = obj.list;
	        	this.pageNumber += 1;
	            //We can't know if more exists. So we will assumer that if we got as many results as are maximum in one page, more might exist. 
	            var moreExists = (this.defaultPageSize == entries.length);          
	            var uniqueEntries = this._checkItems(entries, moreExists);
	
	            if (uniqueEntries) {
	               items = {
	                  items: uniqueEntries,
	                  moreExists: moreExists
	               };
	               var target = (request.scope) ? request.scope : kernel.global;
	               var q = request.query; 
	               if (lang.isObject(q) && q.uuid) {
	                  if (request.onBegin)
	                     request.onBegin.call(target, 1, request);
	                  if (request.onItem)
	                     request.onItem.call(target, q, request);
	                  if (request.onComplete)
	                     request.onComplete.call(target, request.onItem ? null: items, request);   
	               }
	               if (((uniqueEntries.length/this.defaultPageSize) < 0.75) && moreExists) {
	                  //If we didn't fetch too many items the last time, let's make another request
	                  this._fetchAgain(request);
	               }
	            }
	            else if (moreExists) {
	               //We couldn't use any of the items fetched, make another request
	               this._fetchAgain(request);
	            }
	         } 
	         else  {
	            items = {
	               items: null,
	               moreExists: false
	            };
	            if(this.prevItem !== null)
	               items.prevItem = true;
	            if (request.onComplete)
	               request.onComplete.call(target, request.onItem ? null: items, request);   
	         }
	      }
	      else if (request.onError) {
	         request.onError.call(null, request);   
	      }
	   },
	   _fetchAgain: function(request) {
	      this.fetch({
	         query: request.query,
	         onComplete: request.onComplete,
	         onError: request.onError
	      }); 
	   },
	   _checkItems: function(entries, moreExists) {
	      if (!this.prevItem) {
	         //This is the first request
	         if (moreExists) {
	            //There are more entries to pull down, store current entries so they can be referenced in the next fetch
	            this.prevItem = {
	               entries: entries,
	               startTime: this.getValue(entries[0], "published"),
	               endTime: this.getValue(entries[(entries.length - 1)], "published")
	            };
	         }
	         return entries;
	      } 
	      // We have previously fetched items
	      var currItem = {
	         entries: entries,
	         startTime: this.getValue(entries[0], "published"),
	         endTime: this.getValue(entries[(entries.length - 1)], "published")  
	      };
	      if (currItem.startTime.getTime() > this.prevItem.endTime.getTime()) {
	            //Duplicate entries may exist
	         if (currItem.endTime.getTime() > this.prevItem.endTime.getTime()) {
	               //There are more new updates than the paging size, we don't want to do anything with these new entries.
	               //Make an additional request for more entries
	            return null;
	         }
	         else {
	           //There could be duplicate entries.  First determine how many unique entries were fetched.
	           var uniqueItems = this._getUniqueItems(entries);
	           if (uniqueItems.length > 0) {
	             //Store current data for next round
	              this.prevItem = {
	                  entries: this.prevItem.entries.concat(uniqueItems),
	                  startTime: this.getValue(uniqueItems[0], "published"),
	                  endTime: this.getValue(uniqueItems[(uniqueItems.length - 1)], "published")  
	              };
	              return uniqueItems;
	           }
	           else {
	               //We don't have any items so we may want to make another request
	              return null;   
	           }
	        }
	     }  else {
	         currItem.entries = this.prevItem.entries.concat(currItem.entries);
	         this.prevItem = currItem;
	         return entries; 
	     }
	  
	  },
	   /* Make sure we aren't getting a duplicate of an item already retrieved */
	   _getUniqueItems: function(items) {
	      var exists, uniqueItems = [], scope = this;
	      array.forEach (items, function(item) {
	         exists = false; //reset
	         exists = array.some(scope.prevItem.entries, function(pItem) {
	            if (item.id == pItem.id)
	               return true;
	         });
	         if(!exists)
	            uniqueItems.push(item);
	      });
	      return uniqueItems;
	   },
	   dataError: function (request, error) {
	      if(request.onError)
	         request.onError.call(error, request);
	   },
	   getValue: function (item, attribute, defaultValue) {
	      if (item.preloaded) {
	         if (array.indexOf(this.dateAttrs, attribute) > -1) {
	            return dojo.date.stamp.fromISOString(item[attribute]);
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
	   _getUrlParams: function (request) {
	      var params = {};
	         params.startIndex = this.pageNumber;
	         params.count = this.defaultPageSize; 
	         params.sortBy = "published";
	         if(!this.disableSort)
	            params.sortOrder =  this.isDesc ? "descending" : "ascending";
	      return params;
	   },
	   switchSort: function(isDesc) {
	      this.pageNumber = 1;
	      this.prevItem = null;
	      this.isDesc = isDesc ? true : false;
	   }
	});
	return HistoryDataStore;
});
