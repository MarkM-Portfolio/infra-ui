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

dojo.provide("com.ibm.social.ee.data.PreloadedCommentsDataStore");

dojo.require("com.ibm.social.ee.data.CommentFeedDataStore");

dojo.declare("com.ibm.social.ee.data.PreloadedCommentsDataStore", com.ibm.social.ee.data.CommentFeedDataStore, {
   itemsFetched: false,
   dateAttrs: ["published", "updated", "stateChangedDate"],  
   _fetch: function (request) {
      if (!this.itemsFetched)
         this._preloadedFetch(request);
      else
         this.inherited(arguments);
   },
   _preloadedFetch: function (request) {
      this.itemsFetched = true;
      var items = this.items || request.items || [];
      for (var i = 0; i < items.length; i++) {
         var item = items[i];
         item.ds = {attributes:{ }, isNew: false, isDirty: false };
         item.category = "comment";
         item.preloaded = true;         
      }      
      
      if (!("totalItems" in this)) this.totalItems = request.totalItems;
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
   isItem: function (item) {
      if (item.preloaded)
         return true;
      else 
         return this.inherited(arguments);
   },
   getValue: function (item, attribute, defaultValue) {
      if (item.preloaded) {
         if (dojo.indexOf(this.dateAttrs, attribute) > -1) {
            return dojo.date.stamp.fromISOString(item[attribute]);
         }
         if (attribute in item) {
            return item[attribute];
         }
         else
            return defaultValue;
      }
      else return this.inherited(arguments);
   }
   
});