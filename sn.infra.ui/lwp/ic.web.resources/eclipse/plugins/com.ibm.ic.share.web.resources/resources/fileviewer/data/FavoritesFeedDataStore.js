/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/string",
  "dojo/when",
  "../util/url",
  "../bean/Favorite",
  "./FeedDataStore",
  "./util/routes",
  "dojo/query"
], function (declare, lang, array, string, when, urlUtil, Favorite, FeedDataStore, routes, query) {
  "use strict";

  return declare([FeedDataStore], {
    _pageSize: 500,
    _feedHandleAs: "json",
    EntryClass: Favorite,
    
    _getPostBody: function (item) {
       var type = item.get("type");
       var template;
         template = '<entry xmlns="http://www.w3.org/2005/Atom"><category term="document" label="document" scheme="tag:ibm.com,2006:td/type"></category><itemId xmlns="urn:ibm.com/td">${fileId}</itemId></entry>';
         return string.substitute(template, lang.mixin({
           fileId: this.file.get("id")
         }, item));
    },
    
    _getFeedQuery: function () {
      var query = {
        pageSize: "500",
        format: "json:combined"
      };
      
      return query;
    },
    _getDeleteUrl: function(item) {
       var query = {
             itemId : item.get("id")
       };
       return urlUtil.rewrite(this.serviceUrl, query);
    },
    _getHasNext: function (response) {
      return false;
    },
    _getNewItemProperties: function (args) {
      return {
        category: "favorite"
      };
    },
    _getCreateQuery: function (item, args) {
       return null;
    },
    _getCreateUrl: function (item, args) {
       return this.serviceUrl;
    },
    
    _handleFeedResponse: function (response) {
       var r = [];
       array.forEach(response.collections.items, function(item) {
          r.push(item.id);
       });
       return r.concat(response.documents.items);
    },
    _updateItemFromResponse: function(item, response) {
      item.unmarkDirty();
    }
  });
});
