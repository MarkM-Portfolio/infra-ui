/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "ic-core/widget/autocomplete/TagDataStore"
], function(declare, TagDataStore) {

   var ShareTagDataStore = declare("lconn.core.widget.autocomplete.ShareTagDataStore", TagDataStore, {
      convert : function(response) {
         var items = response.items;
         for (var i = 0, l = items.length; i < l; i++)
            items[i].count = items[i].weight;
         items.hasMore = response.hasMore;
         items.total = response.totalItems;
         return items;
      }
   });
   return ShareTagDataStore;
});
