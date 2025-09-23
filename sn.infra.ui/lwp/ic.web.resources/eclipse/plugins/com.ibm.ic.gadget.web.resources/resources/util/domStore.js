/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/dom-attr",
      "dojo/_base/lang"
], function(dojo, domAttr, lang) {

   var cache_ = [ 0
   ], elemDataKeyLookup = 'data-iContainer-data-' + +new Date();

   var domStore = function(elem) {

      var cacheIndex = domAttr.get(elem, elemDataKeyLookup), nextCacheIndex = cache_.length;

      if (!cacheIndex) {
         cacheIndex = nextCacheIndex;
         domAttr.set(elem, elemDataKeyLookup, nextCacheIndex);
         cache_[cacheIndex] = {};
      }

      return {
         get : function(key) {
            return cache_[cacheIndex][key];
         },
         set : function(key, val) {
            cache_[cacheIndex][key] = val;
            return val;
         }
      }
   };

   lang.setObject("com.ibm.lconn.gadget.util.domStore", domStore);

   return domStore;
});
