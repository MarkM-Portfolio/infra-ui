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

dojo.provide("com.ibm.social.ee.data._JsonRecommendationsMixin");

dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.ee.util.misc");

(function () {
   var uu = com.ibm.social.incontext.util.uri;
   dojo.declare("com.ibm.social.ee.data._JsonRecommendationsMixin", null, {
   
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
         item.id = com.ibm.social.ee.util.misc.getItemId(this._getAuthorId(item));
         items.push(item);
      }
      var sortedItems = com.ibm.social.incontext.util.misc.sort(items, "name");
      this.totalItems = this._getTotalResults(data);
      if (this.totalItems === null || typeof this.totalItems === "undefined") this.totalItems = data.totalResuts; // TODO This will need to change
      var target = (request.scope) ? request.scope : dojo.global;
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
         var scope = request.scope ? request.scope : dojo.global;
         var item = null;
         if (this.hasRecommended) {
            var item = {ds: {isDirty: false, isDeleted: false, isNew: false, attributes: {}} };
            dojo.mixin(item, this.authUser); 
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

