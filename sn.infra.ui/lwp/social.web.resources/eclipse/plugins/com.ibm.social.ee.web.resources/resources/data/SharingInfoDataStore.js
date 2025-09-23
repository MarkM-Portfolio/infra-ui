/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.SharingInfoDataStore");

dojo.require("com.ibm.social.ee.data.DataStore");
dojo.require("com.ibm.social.incontext.util.url");

(function () { 
var util = com.ibm.social.incontext.util;   
dojo.declare("com.ibm.social.ee.data.SharingInfoDataStore", com.ibm.social.ee.data.DataStore, {
   
   
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
      var target = (request.scope) ? request.scope : dojo.global;
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