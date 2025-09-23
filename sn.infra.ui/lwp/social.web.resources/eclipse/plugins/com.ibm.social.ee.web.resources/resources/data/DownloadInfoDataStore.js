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

dojo.provide("com.ibm.social.ee.data.DownloadInfoDataStore");

dojo.require("com.ibm.social.ee.data.DataStore");
dojo.require("com.ibm.social.incontext.util.misc");

dojo.declare("com.ibm.social.ee.data.DownloadInfoDataStore", [com.ibm.social.ee.data.QCSFeedDataStore], {
   
   getValue: function ( item, attribute, defaultValue) {
      if (attribute in item) {
         if (attribute == "time") {
            return com.ibm.social.incontext.util.misc.date.convertAtomDate(item.time);
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
      var target = (request.scope) ? request.scope : dojo.global;
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
      var feedUrl = com.ibm.social.incontext.util.uri.rewriteUri(this.url, params);
      request.url = feedUrl;
      request.params = params;
      this.inherited(arguments, [request]);        
   }
});