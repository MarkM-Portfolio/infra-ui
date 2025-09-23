/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/string",
  "dojo/when",
  "../bean/Recommendation",
  "./FeedDataStore",
  "./util/routes"
], function (declare, lang, string, when, Recommendation, FeedDataStore, routes) {
  "use strict";

  return declare([FeedDataStore], {
     _pageSize: 100,
    _feedHandleAs: "json",
    EntryClass: Recommendation,

    _getFeedQuery: function () {
      var query = {
        format: "json",
        page: this._page,
        pageSize: this._pageSize        
      };
      
      return query;
    },
    
    _getHasNext: function (response) {
       return response.page * response.pageSize < response.totalSize;
    },
    
    _getEntries: function (response) {
      return response.items;
    },
    
    _getCreateUrl: function (item, args) {
      return routes.getFileFeedUrl(this.file);
    },
    
    _getNewItemProperties: function (args) {
      return {
        category: "recommendation"
      };
    }
  });
});
