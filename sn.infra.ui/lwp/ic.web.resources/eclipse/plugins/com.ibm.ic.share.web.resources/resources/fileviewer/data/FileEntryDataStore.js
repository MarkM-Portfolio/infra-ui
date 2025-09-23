/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/string",
   "./FeedDataStore",
   "../util/url",
   "dojo/when"
], function (declare, lang, string, FeedDataStore, urlUtil, when) {

   var CACHE_TTL = 1000;

   var FileEntryDataStore = declare([FeedDataStore], {
      postscript: function () {
         this.inherited(arguments);

         this.file.create = lang.hitch(this, this.createItem, this.file);
         this.file.update = lang.hitch(this, this.updateItem, this.file);
         this.file.remove = lang.hitch(this, this.deleteItem, this.file);
         this.file.load = lang.hitch(this, this.loadItem, this.file);
      },

      _requestItem: function (item) {
         var cache = FileEntryDataStore._cachedEntry,
            cacheLoadTime = cache.loadTime || 0,
            currentTime = (new Date()).getTime();

         // Check to see if we just loaded this XML in FilesAPI.js 
         if (currentTime - cacheLoadTime < CACHE_TTL && item.get('id') === cache.fileId) {
            return when(cache.content);
         } else {
            return this.inherited(arguments);
         }
      },

      _getUpdateUrl: function (item) {
         return this._getLoadUrl(item);
      },

      _getLoadUrl: function (item) {
         var url = this.inherited(arguments);
         return urlUtil.rewrite(url, {
            acls: true,
            includeNotification: true,
            includePolicy: true,
            includeRecommendation: true,
            includeTags: true,
            includeLibraryInfo: true,
            includeDownloadInfo: true,
            inline: true,
            rank: true
         });
      }
   });

   FileEntryDataStore._cachedEntry = {};

   return FileEntryDataStore;
});
