/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "../bean/Tag",
  "./FeedDataStore",
  "./util/routes",
  "../util/url",
  "dojo/_base/array"
], function (declare, lang, Tag, FeedDataStore, routes, urlUtil, array) {

  return declare([FeedDataStore], {
    _feedHandleAs: "json",
    EntryClass: Tag,

    // Different implementation from other datastores in order to provide support for share widget TagTypeAhead
    _loadPage: function (args) {
      var promise = this.inherited(arguments);
      
      if (args.onComplete) {
        promise.then(function (items) {
          args.onComplete(items, args);
        });
      }
      
      return args;
    },
    
    _getFeedQuery: function (args) {
      var parameters = {
        format: "json",
        scope: "document",
        pageSize: args.count,
        sK: "cloud",
        sO: "dsc",
        filter: args.query,
        page: args.page
      };
      if (args.start !== 0) {
        parameters.sI = args.start;
      }
      return parameters;
    },
    
    _handleFeedResponse: function (response) {
      return response.items;
    },
    
    createItem: function(item, args) {
      var promise = this.updateItem(item, args);
      promise.then(lang.hitch(this, function (response) {
        this.file.set("xml", response);
        this.file.unmarkDirty();
      }));
      return promise;
    },
    
    _getUpdateUrl: function (item, args) {
      return urlUtil.rewrite(this.file.get("entryUrl"), {
        tag: item.value,
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
    },
    
    deleteItem: function (item, args) {
      var promise = this.inherited(arguments);
      
      var fileTags = this.file.get("tags");
      var index = array.indexOf(fileTags, item.get("value"));
      if (index > -1) {
        fileTags.splice(index, 1);
      }
      
      return promise;
    },
    
    _getDeleteUrl: function (item, args) {
      return urlUtil.rewrite(routes.getFileFeedUrl(this.file), {
        category: "tag",
        tag: item.value
      });
    },
    
    _getNewItemProperties: function () {
      return {
        category: "document"
      };
    }
  });
});
