/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/string",
  "../bean/Comment",
  "./FeedDataStore"
], function (declare, string, Comment, FeedDataStore) {
  return declare([FeedDataStore], {
    EntryClass: Comment,

    _getFeedQuery: function () {
      return {
        sK: "published",
        sO: "desc",
        contentFormat: "html",
        category: "comment",
        page: this._page,
        pageSize: this._pageSize,
        acls: true
      };
    },

    _getNewItemProperties: function () {
      return {
        category: "comment",
        mimeType: "html"
      };
    },

    _handleFeedResponse: function () {
       var result = this.inherited(arguments);

       if (this.file) {
          this.file.set("commentCount", this.getTotal());
       }

       return result;
    }
  });
});
