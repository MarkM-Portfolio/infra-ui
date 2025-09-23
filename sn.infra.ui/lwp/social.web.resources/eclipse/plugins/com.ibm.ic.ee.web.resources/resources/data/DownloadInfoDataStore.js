/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"ic-ee/data/QCSFeedDataStore",
	"ic-incontext/util/misc",
	"ic-incontext/util/uri"
], function (dojo, declare, QCSFeedDataStore, misc, uri) {

	var DownloadInfoDataStore = declare("com.ibm.social.ee.data.DownloadInfoDataStore", QCSFeedDataStore, {
	   
	   getValue: function ( item, attribute, defaultValue) {
	      if (attribute in item) {
	         if (attribute == "time") {
	            return misc.date.convertAtomDate(item.time);
	         }
	         return item[attribute];
	      }
	      return defaultValue;
	   },
	   dataLoaded: function (request, data) {
	      var i, opts = opts ? opts : {};
	      var items = request.items ? request.items : [];
	      for(i=0; i < data.items.length; i++ ) {
	         var item =data.items[i];
	         item.isFullyLoaded = true;
	         item.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	         items.push(item);
	      }
	      this.totalItems = data.totalSize;
	      var target = (request.scope) ? request.scope : window;
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
	      var params = this.getStdParams(request);      
	      params.format = "json";
	      var feedUrl = uri.rewriteUri(this.url, params);
	      request.url = feedUrl;
	      request.params = params;
	      this.inherited(arguments, [request]);        
	   }
	});
	return DownloadInfoDataStore;
});
