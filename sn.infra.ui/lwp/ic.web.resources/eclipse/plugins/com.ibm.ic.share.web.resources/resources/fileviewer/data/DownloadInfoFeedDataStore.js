/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "../bean/DownloadInfo",
  "./FeedDataStore",
  "./util/routes"
], function (declare, DownloadInfo, FeedDataStore, routes) {
  "use strict";

  return declare([FeedDataStore], {
    _pageSize: 100,
    _feedHandleAs: "json",
    EntryClass: DownloadInfo,
    
    _getFeedQuery: function (args) {
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
    }
  });
});
