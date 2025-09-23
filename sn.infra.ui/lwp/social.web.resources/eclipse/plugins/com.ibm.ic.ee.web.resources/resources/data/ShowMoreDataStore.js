define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/util/misc"
], function (dojo, declare, lang, misc) {

	/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */
	
	/**
	 * Pass-thru datastore that enables the type of paging required for a UI that allows paging via a 'Show More...' link.
	 * It handles collision detection and reverse ordering of results when appropriate.
	 */
	
	var ShowMoreDataStore = declare("com.ibm.social.ee.data.ShowMoreDataStore", null, {
	
	   ds: null, // The internal datastore that is used to retrieve actual results, must be passed in upon creation
	   dateAttr: null, // The attribute used to get date value from the datastore
	   idAttr: null, // The attribute used to get the id value from the datastore
	   resultThreshold: 0.75,
	   
	   /**
	    * opts is an object with the following attributes:
	    * ds - The datastore to wrap with this one
	    * dateAttr - The attribute that returns the date created for the item being returned
	    * idAttr - The attribute that returns a unique item id
	    */
	   constructor: function(opts) {
	      lang.mixin(this, opts);
	   },
	   
	   getValue: function(  /* item */ item, 
	                  /* attribute-name-string */ attribute, 
	                  /* value? */ defaultValue){
	      return this.ds.getValue(item, attribute, defaultValue);
	   },
	
	   getValues: function(/* item */ item,
	                  /* attribute-name-string */ attribute){
	      return this.ds.getValues(item, attribute);
	   },
	
	   getAttributes: function(/* item */ item){
	      return this.ds.getAttributes(item);
	   },
	
	   hasAttribute: function( /* item */ item,
	                     /* attribute-name-string */ attribute){
	      return this.ds.hasAttribute(item);
	   },
	
	   containsValue: function(/* item */ item,
	                     /* attribute-name-string */ attribute, 
	                     /* anything */ value){
	      return this.ds.containsValue(item, value);
	   },
	
	   isItem: function(/* anything */ something){
	      return this.ds.isItem(something);
	   },
	
	   isItemLoaded: function(/* anything */ something){
	      return this.ds.isItemLoaded(something);
	   },
	
	   loadItem: function(/* object */ keywordArgs){
	      return this.ds.loadItem(keywordArgs);
	   },
	
	   fetch: function(keywordArgs, refetch) {
	      // First, do translation of the order. For datastores where the total count is known, then
	      // it's better to request a page of items starting from the bottom. The order assumed for this query
	      // is descending in date order
	      if (!this._validateRequest(keywordArgs)) return;
	            
	      var fetchArgs = {
	         onBegin: lang.hitch(this, this.onBegin, keywordArgs),
	         onComplete: lang.hitch(this, this.onComplete, keywordArgs),
	         onError: lang.hitch(this, this.onError, keywordArgs),
	         scope: this            
	      };
	      if (this.countAvailable && !("totalItems" in this)) {
	         if ("totalItems" in this.ds && this.ds.totalItems !== null) {
	            this.totalItems = this.ds.totalItems;
	         }
	         else {
	            // Do an initial fetch to retrieve the total count (won't be needed in EE)
	         }
	      }
	      
	      if (!("skipCount" in this)) {
	         this.skipCount = 0;
	      }
	     
	      // Determine if fetch should be inverted (only when count is available)
	      if (this.countAvailable) {
	         keywordArgs.sortInverted = true;
	         var sort = keywordArgs.sort[0];
	         var startIndex = this.totalItems - keywordArgs.count - keywordArgs.start - this.skipCount;
	         var count = keywordArgs.count;         
	         if (startIndex < 0) {
	        	 count = Math.max(count + startIndex, 0); // Subtract excess from count
	        	 startIndex = 0;
	         }
	
	         lang.mixin(fetchArgs, { 
	            start: startIndex,
	            count: count,
	            sort: [ { attribute: sort.attribute, descending: false } ]
	         });
	      }
	      else {
	         keywordArgs.sortInverted = false;
	         lang.mixin(fetchArgs, { 
	            count: keywordArgs.count,
	            sort: [ { attribute: keywordArgs.sort[0].attribute, descending: true } ]
	         });
	      }
	      if (!refetch)
	         this.previousItems = null;
	      return this.ds.fetch(fetchArgs);
	   },
	   
	   _validateRequest: function (request) {      
	      try {
	         if (!this.lastFetch) {
	            if (request.start !== 0)
	               throw new Error("Initial request must start with index 0");
	         }
	         
	         if (!request.sort || !request.sort.length) {
	            throw new Error("A sort order must be specified.");            
	         }
	         else {
	            if (!request.sort[0].descending)
	               throw new Error("The sort order must be descending");
	         }
	      }
	      catch (e) {
	         if (request.onError) {
	            var scope = request.scope || kernel.global;
	            request.onError.call(scope, e, request);
	         }
	         return false;
	      }
	      return true;
	   },
	   
	   
	   onBegin: function(keywordArgs, size, request) {
	      this.lastFetchCount = size;
	   },
	   
	   _storeIds: function (items) {
	      if (!this.itemIds) this.itemIds = { };
	      for (var i = 0; i < items.length; i++) {
	         var itemId = this.ds.getValue(items[i], this.idAttr);
	         this.itemIds[itemId]=true;
	      }
	   },
	   
	   _processCallbacks: function (args, items) {
	      var i, allItems = items;
	      if (this.previousItems) {
	         allItems = [];
	         for (i = 0; i < this.previousItems.length; i++)
	            allItems.push(this.previousItems[i]);
	         for (i = 0; i < items.length; i++)
	            allItems.push(items[i]);
	      }
	      var scope = args.scope || kernel.global;
	      if (args.onBegin) {
	         args.onBegin.call(scope, this.totalItems, args);
	      }      
	      if (args.onItem) {
	         for (i = 0; i < allItems.length; i++) {
	            args.onItem.call(scope, allItems[i], args);
	         }
	         if (args.onComplete) {
	            args.onComplete.call(scope, null, args);
	         }
	      }
	      else if (args.onComplete) {
	         args.onComplete.call(scope, allItems, args);
	      }
	   },
	   
	   _reverseSort: function (items) {
	      var result = [];
	      for (var i = 1; i <= items.length; i++) {
	         result.push(items[items.length - i]);
	      }
	      return result;
	   },
	   
	   _storeFetch: function (args, items) {
	      this.lastFetch = { 
	         start: args.start, 
	         count: args.count
	      };
	      if (items && items.length) {
	         lang.mixin(this.lastFetch, {
	            startDate: this.ds.getValue(items[0], this.dateAttr),
	            endDate: this.ds.getValue(items[items.length-1], this.dateAttr)
	         });
	      }
	   },
	      
	   _getUniqueItems: function (items) {
	      var result = [];
	      for (var i = 0; i < items.length; i++) {
	         var id = misc.getItemId(this.ds.getValue(items[i], this.idAttr));
	         var itemDate = this.ds.getValue(items[i], this.dateAttr);
	         if (itemDate.getTime() <= this.mostRecentDate.getTime()) { // Only consider item if it's not newer than the datastore's most recent item
		         if (!this.itemIds[id]) {
		            result.push(items[i]);
		            this.itemIds[id] = true;
		         }
	         }
	      }
	      return result;
	   },
	     
	   onComplete: function(keywordArgs, items, request) {      
	      
	      if (!this.lastFetch) {
	      	keywordArgs.hasMore = (request.start > 0);
	         this._storeIds(items);
	         if (keywordArgs.sortInverted)
	            items = this._reverseSort(items);     
	         this.mostRecentDate = items.length ? this.ds.getValue(items[0], this.dateAttr) : null; 
	         this._storeFetch(keywordArgs, items);    
	         this._processCallbacks(keywordArgs, items);
	      }
	      else {
	         keywordArgs.hasMore = (request.start > 0);
	        
	         if (keywordArgs.sortInverted)
	            items = this._reverseSort(items);
	         
	         var fetchMore = false, endDate = null;
	         if (items.length)
	             endDate = this.ds.getValue(items[items.length-1], this.dateAttr);         
	         
	         if (endDate && endDate.getTime() > this.mostRecentDate.getTime()) {
	      		items = [];
	            fetchMore = keywordArgs.hasMore;
	         }
	         else {         
		         items = this._getUniqueItems(items);	        
		         fetchMore = this._checkNeedMore(items, request.count, keywordArgs.hasMore);
	         }
	         
	         if (fetchMore) {
	            if (items.length) {
	            	if (!this.previousItems) {
	                  this.previousItems = items;
	            	}
	            	else {
	            		for (var i = 0; i < items.length; i++)
	            		   this.previousItems.push(items[i]);
	            	}
	            }               
	         }
	         else {
	            this._storeFetch(keywordArgs, items, true);
	         }
	
	         this.skipCount = this.skipCount + request.count - items.length;
	         
	         if (fetchMore) {
	            this.fetch(keywordArgs, true);
	         }         
	         else {         
	            this._processCallbacks(keywordArgs, items);
	         }
	         
	      }
	
	   },
	   
	   _checkNeedMore: function (items, count, hasMore) {      
	   	var resultLength = ((items && items.length) ? items.length : 0) + (this.previousItems ? this.previousItems.length : 0);
	      return hasMore && (!resultLength || (resultLength / count) < this.resultThreshold );
	   },
	      
	   onError: function(keywordArgs, errorData, request) {
	      if (keywordArgs.onError) {
	         var scope = keywordArgs.scope || kernel.global;
	         keywordArgs.onError.call(scope, errorData, request);
	      }
	   },
	
	   getFeatures: function(){
	      return this.ds.getFeatures();
	   },
	
	   close: function(/*dojo.data.api.Request || keywordArgs || null */ request){
	      return this.ds.close(request);
	   },
	
	   getLabel: function(/* item */ item){
	      return this.ds.getLabel(item);
	   },
	
	   getLabelAttributes: function(/* item */ item){
	      return this.ds.getLabelAttributes(item);
	   },
	   newItem: function(keywordArgs, parentInfo) {
	      return this.ds.newItem(keywordArgs, parentInfo);
	   },
	   revert: function() {
	      return this.ds.revert();
	   },
	   setValue: function (/* item */ item, /* string */ attribute, /* almost anything */ value) {
	      return this.ds.setValue(item, attribute, value);
	   },
	   save: function (/* object */ keywordArgs) {
	      return this.ds.save(keywordArgs);
	   },
	   deleteItem: function (/* item */ item) {
	      return this.ds.deleteItem(item);
	   }
	      
	});
	return ShowMoreDataStore;
});
