/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/string",
  "dojo/_base/array",
  "dojo/_base/lang",
  "../bean/DocumentUser",
  "../util/url",
  "./FeedDataStore",
  "./util/routes",
  "dojo/topic",
  "dojox/html/entities"
], function (declare, string, array, lang, DocumentUser, urlUtil, FeedDataStore, routes, topic, entities) {

  return declare([FeedDataStore], {
    _pageSize: 100,
    _feedHandleAs: "json",
    EntryClass: DocumentUser,

    _getPostBody: function(item, args) {

      if (lang.isArray(item)) {
        return this._getBulkPostBody(item, args);
      }
      
      var type = item.get("type");
      var summary = item.get("summary");
      var template;

      if (type === "user") {
        template = '<feed xmlns="http://www.w3.org/2005/Atom"><entry><category term="share" label="share" ' +
          'scheme="tag:ibm.com,2006:td/type"/><sharedWhat xmlns="urn:ibm.com/td">${fileId}</sharedWhat><sharedWith ' +
          'xmlns="urn:ibm.com/td"><sharePermission>${permission}</sharePermission><user><userid ' +
          'xmlns="http://www.ibm.com/xmlns/prod/sn">${id}</userid></user></sharedWith><sharePermission ' +
          'xmlns="urn:ibm.com/td">View</sharePermission>';
        template = string.substitute(template, lang.mixin({
          fileId: this.file.get("id")
        }, item));
      } else if (type === "community") {
        template = '<feed xmlns="http://www.w3.org/2005/Atom"><entry><category term="community" ' + 
          'label="community" scheme="tag:ibm.com,2006:td/type"/>' + 
          '<sharePermission xmlns="urn:ibm.com/td">${permission}</sharePermission><itemId xmlns="urn:ibm.com/td">' +
          '${communityUuid}</itemId>';
        template = string.substitute(template, lang.mixin({
          communityUuid: item.get("id")
        }, item));
      } else if (type === "everyone") {
        template = '<feed xmlns="http://www.w3.org/2005/Atom"/>';
      } else if (type === "folder") {
        template = '<feed xmlns="http://www.w3.org/2005/Atom"><entry><category term="collection" ' + 
        'label="collection" scheme="tag:ibm.com,2006:td/type"/>' + 
        '<sharePermission xmlns="urn:ibm.com/td">${permission}</sharePermission><itemId xmlns="urn:ibm.com/td">' +
        '${collectionId}</itemId>';
        template = string.substitute(template, lang.mixin({
          collectionId: item.get("id")
        }, item));
      }
      
      if (summary) {
        var summaryNode = document.createTextNode(summary);
        var summaryStr = new XMLSerializer().serializeToString(summaryNode);
        template += '<summary type="text">${summary}</summary></entry></feed>';
        return string.substitute(template, {summary: summaryStr});
      } else {
        return template += '</entry></feed>';
      }
    },
    
    _getBulkPostBody: function (items, args) {
      var readers = array.filter(items, function(u) {return u.entry.permission == "View" && u.entry.type == "user";}),
      editors = array.filter(items, function(u) {return u.entry.permission == "Edit" && u.entry.type == "user";}),
      communities = array.filter(items, function(u) {return u.entry.type == "community";}),
      template = '<feed xmlns="http://www.w3.org/2005/Atom">';
      
      if (readers.length > 0 || editors.length > 0)  {
        template += '<entry><category term="share" label="share" ' +
        'scheme="tag:ibm.com,2006:td/type"/><sharedWhat xmlns="urn:ibm.com/td">' + this.file.get("id") + '</sharedWhat>';
        
        if (readers.length > 0) {
          template += '<sharedWith xmlns="urn:ibm.com/td"><sharePermission>View</sharePermission>'
            array.forEach(readers, function (item) {
              template += '<user><userid xmlns="http://www.ibm.com/xmlns/prod/sn">' + item.entry.get("id") + '</userid></user>';
            }, this);
          template += '</sharedWith>';
        }
        
        if (editors.length > 0) {
          template += '<sharedWith xmlns="urn:ibm.com/td"><sharePermission>Edit</sharePermission>'
            array.forEach(editors, function (item) {
              template += '<user><userid xmlns="http://www.ibm.com/xmlns/prod/sn">' + item.entry.get("id") + '</userid></user>';
            }, this);
          template += '</sharedWith>';
        }
        
        template += '<sharePermission xmlns="urn:ibm.com/td">View</sharePermission>';
        
        if (args.summary && args.summary !== "" ) {
          var summaryNode = document.createTextNode(args.summary);
          var summaryStr = new XMLSerializer().serializeToString(summaryNode);
          template += '<summary type="text">' +summaryStr + '</summary>';
        }
        
        template += '</entry>';
      }
      
      array.forEach(communities, function (community) {
        template += '<entry><category term="community" ' + 
          'label="community" scheme="tag:ibm.com,2006:td/type"/>' + 
          '<sharePermission xmlns="urn:ibm.com/td">' + community.entry.get("permission") + '</sharePermission><itemId xmlns="urn:ibm.com/td">' +
          community.entry.get("communityUuid") + '</itemId>';
        if (args && args.summary && args.summary !== "" ) {
          var summaryNode = document.createTextNode(args.summary);
          var summaryStr = new XMLSerializer().serializeToString(summaryNode);
          template += '<summary type="text">' + summaryStr + '</summary>';
        }
          template += '</entry>';
      }, this);
      
      return template += '</feed>';
    },
    
    _getPutBody: function (item) {
      if (item.get("type") === "everyone") {
        var template = '<entry xmlns="http://www.w3.org/2005/Atom"><category term="document" label="document" ' + 
          'scheme="tag:ibm.com,2006:td/type"/><id>urn:lsid:ibm.com:td:${fileId}</id><visibility ' +
          'xmlns="urn:ibm.com/td">private</visibility></entry>';
        return string.substitute(template, lang.mixin({
          fileId: this.file.get("id")
        }, item));
      }
      
      return "";
    },

    getNonVisibleCount: function () {
      return this.getResponse().allNonVisibleCollectionCount;
    },
    
    _getFeedQuery: function (args) {
      var query = {
        sK: "published",
        sO: "desc",
        contentFormat: "html",
        category: "version",
        format: "json",
        page: this._page,
        pageSize: (args && args.shareUsersPageSize) || this._pageSize,
        includeSubCollections: true
      };
      
      query.type = this.file.get("libraryType") === "communityFiles" ? "community" : "personal";
      
      return query;
    },
    
    _getItems: function () {
      var entries = this.inherited(arguments);
      
      if (this.showEveryone && this.file.get("visibility") === "public") {
        var everyoneView = this.newItem({
             type: "everyone",
             permission: "View",
             id: "everyoneView"
        });
        entries.unshift(everyoneView);
        
        var everyoneEdit = this.newItem({
            type: "everyone",
            permission: "Edit",
            id: "everyoneEdit"
        });
          
        entries.unshift(everyoneEdit);
      }
      
      return entries;
    },
    
    _getCreateQuery: function(item, args) {
      var query = {}, hasPublicCommunities = false;
      
      if (lang.isArray(item)) {
        hasPublicCommunities = array.some(item, function(u) {return u.entry.type === "community" ? (u.entry.communityType !== "private") : false;});
      } else {
        hasPublicCommunities = item.get("type") === "community" ? item.get("communityType") !== "private" : false;
      }
      
      if (hasPublicCommunities && this.file.get("visibility") && this.file.get("visibility") !== "public") {
        query.visibility = "public";
        args.makePublic = true;
      }
      
      return query;
    },
    
    createItem: function (item, args) {
      if (item.type === "everyone") {
        this.file.set("visibility", "public");
        return this.file.update();
      } else {
        return this.inherited(arguments);
      }
    },
    
    updateItem: function(item, args) {
      if (item.get("permission") === "Edit") {
        return this.createItem(item, args);
      } else {
        return this.inherited(arguments);
      }
    },
    
    deleteItem: function(item, args) {
      var itemType = item.get("type");
      if (itemType === "everyone") {
        this.file.set("visibility", "shared");
        return this.file.update();
      } else {
        var dfd = this.inherited(arguments);
        
        dfd.then(lang.hitch(this, function () {
          if (itemType === "community") {
            var communityUuid = item.get("communityUuid");
            if (!!communityUuid && communityUuid === window.ic_comm_communityUuid) {
              topic.publish("ic-fileviewer/dirty");
            }
          } else if (itemType === "folder") {
            topic.publish("ic-fileviewer/dirty");
          }
        }));
        
        return dfd;
      }
    },
    
    _request: function (url, options) {
      var promise = this.inherited(arguments);
      
      if (options._args.makePublic) {
        promise.then(lang.hitch(this, function () {
          this.file.set("visibility", "public");
          this.file.unmarkDirty();
        }));
      } else if (options._args.stopSharing) {
        promise.then(lang.hitch(this, function () {
          this.file.set("visibility", "private");
          this.file.unmarkDirty();
        }));
      }
      
      return promise;
    },
    
    _getEntries: function (response) {
      return response.items;
    }, 
    
    _getHasNext: function (response) {
      return !!(response.hasMore || response.hasMoreResults);
    },
    
    _getCreateUrl: function(item, args) {
      if (lang.isArray(item))
        return routes.getFileFeedUrl(this.file);

      return routes.getFileFeedUrl(this.file);
    },
    
    _getDeleteUrl: function(item, args) {
      var url,
        query = {};

      if (args.stopSharing) {
        query.visibility = "private";
        url = this.url;
      } else if (item.isCollection()) {
        query.itemId = this.file.get("id");
        url = routes.getCollectionFeedUrl(item);
      } else if (item.get("isPersonalShare")){
        query.sharedWhat = this.file.get("id");
        query.sharedWith = item.get("id");
        url = routes.getMySharesFeedUrl();
      } else {
        query.sharedWhat = this.file.get("id");
        query.sharedWith = item.get("id");
        url = routes.getSharesFeedUrl();
      }
      return urlUtil.rewrite(url, query);
    },
    
    _getUpdateUrl: function(item, args) {
      if (item.get("type") === "everyone") {
        return this.file.get("entryUrl");
      }
      return routes.getSharesFeedUrl();
    },
    
    _getUpdateQuery: function(item, args) {
      if (item.get("type") === "everyone") {
        return {};
      } else {
        return {
          sharedWhat: this.file.get("id"),
          sharedWith: item.get("id")
        };
      }
    }
  });
});
