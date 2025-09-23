/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"ic-ee/data/DataStore",
	"ic-incontext/util/url"
], function (dojo, declare, DataStore, url) {

	(function () { 
	var util = com.ibm.social.incontext.util;   
	var SharingInfoDataStore = declare("com.ibm.social.ee.data.SharingInfoDataStore", DataStore, {
	   
	   
	   _fetch: function(request) {
	      var params = {
	         pageSize: request.count || 100,
	         format: "json",
	         type: "community"
	      };
	      request.url = util.url.rewrite(this.url, params);
	      this.inherited(arguments);
	   },
	   
	   getFetchHandleAs: function() {
	      return "json";
	   },   
	   
	   dataLoaded: function(request, data) {
	      var opts = opts ? opts : {};
	      var items = request.items ? request.items : data.items;
	      for( var i=0; i < items.length; i++ ) {
	         var item =items[i];
	         item.isFullyLoaded = true;
	         item.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};         
	      }
	      this.hasMoreResults = data.hasMoreResults;
	      var target = (request.scope) ? request.scope : kernel.global;
	      if (request.onBegin) {
	         request.onBegin.call(target, items.length + (this.hasMoreResults ? 1 : 0), request);
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
	   
	   getValue: function ( item, attribute, defaultValue) {
	      if (attribute in item) {         
	         return item[attribute];
	      }
	      return defaultValue;
	   }
	   
	});
	
	})();
	return SharingInfoDataStore;
});
