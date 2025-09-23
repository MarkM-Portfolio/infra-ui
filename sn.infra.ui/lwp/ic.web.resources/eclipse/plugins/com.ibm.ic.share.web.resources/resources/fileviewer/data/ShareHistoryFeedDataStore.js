/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "../bean/ShareHistoryItem",
  "./FeedDataStore"
], function (declare, array, ShareHistoryItem, FeedDataStore) {
  "use strict";

  return declare([FeedDataStore], {
    _pageSize: 100,
    EntryClass: ShareHistoryItem,

    _getFeedQuery: function () {
      return {
        sharedWhat: this.file.get("id"),
        page: this._page,
        pageSize: this._pageSize
      };
    }
  });
});
