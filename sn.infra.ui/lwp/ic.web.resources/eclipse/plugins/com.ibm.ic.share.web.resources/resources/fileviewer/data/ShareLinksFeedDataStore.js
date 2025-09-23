/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "../bean/DocumentUser",
  "./FeedDataStore",
  "../config/globals"
], function (declare, array, DocumentUser, FeedDataStore, globals) {
  "use strict";

  return declare([FeedDataStore], {
    _feedHandleAs: "json",
    _pageSize: 100,
    EntryClass: DocumentUser,

    _getFeedQuery: function (args) {
      return {
        format: "json",
        includeDownload: true,
        pageSize: (args && args.shareUsersPageSize) || this._pageSize
      };
    },
    
    _getHasNext: function(response) {
      // This feed does not return whether are not there are more elements
      return false;
    },
    
    _getItems: function (response) {
      var userShares = {}, creators = [];
      
      array.forEach(response.items, function (userShare) {
        var creator, target, targets;
        if (userShares.hasOwnProperty(userShare.creator.id)) {
          creator = userShares[userShare.creator.id];
        } else {
          userShares[userShare.creator.id] = creator = this.newItem(userShare.creator);
          creator.set("targets", []);
          creators.push(creator);
        }
        
        targets = creator.get("targets");
        target = this.newItem(userShare.target);
        targets.push(target);
      }, this);
      
      this._sortItems(creators);
      return creators;
    },
    
    _sortItems: function (items) {
      var sortByName = function (a, b) {
        if (a.id === globals.currentUser.id) {
          return -1;
        } else if (b.id === globals.currentUser.id) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      };
      items.sort(sortByName);
      array.forEach(items, function (item) {
        item.targets.sort(sortByName);
      }, this);
    }
  });
});
