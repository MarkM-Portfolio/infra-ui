/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/kernel",
	"ic-ee/util/misc",
	"ic-incontext/util/misc",
	"ic-incontext/util/uri"
], function (dojo, declare, lang, kernel, miscEE, misc, uri) {

	(function () {
	   var uu = uri;
	   var _JsonRecommendationsMixin = declare("com.ibm.social.ee.data._JsonRecommendationsMixin", null, {
	   
	   getValue: function ( item, attribute, defaultValue) {
	      if (attribute in item) {         
	         return item[attribute];
	      }
	      return defaultValue;
	   },
	   
	   dataLoaded: function (request, data) {
	      var i, opts = opts ? opts : {};
	      var items = request.items ? request.items : [];
	      var list = this._getList(data);
	      for(i=0; i < list.length; i++ ) {
	         var item = list[i];
	         item.isFullyLoaded = true;
	         item.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	         item.name = this._getAuthorName(item);
	         item.id = miscEE.getItemId(this._getAuthorId(item));
	         items.push(item);
	      }
	      var sortedItems = misc.sort(items, "name");
	      this.totalItems = this._getTotalResults(data);
	      if (this.totalItems === null || typeof this.totalItems === "undefined") this.totalItems = data.totalResuts; // TODO This will need to change
	      var target = (request.scope) ? request.scope : kernel.global;
	      if (request.onBegin) {
	         request.onBegin.call(target, this.totalItems, request);
	      }
	      if (request.onItem) {
	         for (i = 0; i < sortedItems.length; i++) {
	            request.onItem.call(target, sortedItems[i], request);
	         }
	      }
	      if (request.onComplete) {
	         var itemsParam = (request.onItem) ? null : sortedItems;
	         request.onComplete.call(target, itemsParam, request);
	      }
	   },
	   _fetch: function (request) {
	      if (request.count) {
	         request.url = this.url;
	         request.url = uu.rewriteUri(this.url, { count: request.count } );
	         this.inherited(arguments, [request]);
	      }
	      else {
	         this.dataLoaded(request, this._getEmptyResult());
	      } 
	   },
	   _getRecommendation: function(request) {
	      if (request.onItem) {
	         var scope = request.scope ? request.scope : kernel.global;
	         var item = null;
	         if (this.hasRecommended) {
	            var item = {ds: {isDirty: false, isDeleted: false, isNew: false, attributes: {}} };
	            lang.mixin(item, this.authUser); 
	         }
	         request.onItem.apply(scope, item ? [item] : []);
	      }   
	   },
	   /* These functions should be implemented by the subclasses */
	   fetchItemByIdentity: function ( request ) {},
	   _getEmptyResult: function() {},
	   _getList: function(data) {},
	   _getAuthorName: function(item) {},
	   _getAuthorId: function(item) {},
	   _getTotalResults: function(data) {}
	   
	});
	
	})();
	
	
	return _JsonRecommendationsMixin;
});
