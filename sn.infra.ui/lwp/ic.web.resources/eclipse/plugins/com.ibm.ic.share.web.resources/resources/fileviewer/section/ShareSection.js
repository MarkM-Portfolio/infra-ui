/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/ShareSection.html",
  "dojo/text!./templates/SharingGroup.html",
  "dojo/dom-construct",
  "dojo/_base/lang",
  "dojo/Deferred",
  "dojo/_base/array",
  "../action/ShareAction",
  "../panels/Stream",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "dojo/topic",
  "dojo/dom-attr",
  "dojo/aspect",
  "../config/globals",
  "dojo/promise/all"
], function (declare, _WidgetBase, _TemplatedMixin, sectionTemplate, groupTemplate, domConstruct, lang, Deferred,
    array, ShareAction, Stream, i18n, string, topic, domAttr, aspect, globals, all) {
  "use strict";

  var ROLES = ["Owner", "Edit", "View"],
    filteredItems = {Owner: [], Edit: [], View: []},
    streams = {Owner: null, Edit: null, View: null},
    permissions = {Owner: 2, Edit: 1, View: 0},

    /**
     * A sharing Group contains a stream of sharingwidgets. Each group is either
     * that of Owners, Editors, Readers, or Folders. The arguments passed in should
     * be at the minimum, the permission level(owner/edit/view/folder) the
     * widget constructor(SharingWidget), and the factory(SharingPanelFactory)
     */
    SharingGroup = declare([ _WidgetBase, _TemplatedMixin ], {

      templateString: groupTemplate,

      constructor: function (args) {
        this.streamArgs = args;
        this.nls = i18n.SHARE;
        this.id = args.permission + '_' + (new Date().getTime());
        lang.mixin(this, args);
      },

      postCreate: function () {
        this.userStream = streams[this.streamArgs.permission] = new Stream(this.streamArgs);
        this.userStream.refreshCallback = this.refreshCallback;
        this.refreshTitle();

        if (this.streamArgs.permission !== "Owner" && ShareAction.isValid(this.file, this.streamArgs.permission)) {
          this.shareAction = ShareAction.create(this.streamArgs);
          this.shareAction.placeAt(this.content);

          this.shareAction.on("_add", lang.hitch(this, this.addUser));
        }

        this.userStream.placeAt(this.content);
      },

      /**
       * This function accepts an entry which is expected to be an 
       * extension of AtomBean. After first checking if the element exists
       * in any of the streams, it will attempt to add the entry to the appropriate
       * sharing stream.
       */
      addUser: function (entry) {
        var existingEntry = this.getExistingEntry(entry),
        streamsOnly = true;
        if (!existingEntry) {
          entry.create().then(lang.hitch(this, function () {
            this.factory.addItem(entry);
            if (entry.type === "community" || entry.type === "everyone") {
              this.refreshCallback(entry, streamsOnly);
            } else {
              filteredItems[this.streamArgs.permission].push(entry);
              this.userStream.addItem(entry);
              this.refreshTitle();
            }

            topic.publish("ic-fileviewer/push/messages", {
               type: "success",
               message: string.substitute(this.nls.SHARE_SUCCESS.SUCCESS, {user: entry.name}),
               cancelable: true
             });

          }), lang.hitch(this, this._handleError, entry));
        } else if(permissions[entry.permission] > permissions[existingEntry.permission]) {
          entry.update().then(lang.hitch(this, function () {
            topic.publish("ic-fileviewer/push/messages", {
              type: "info",
              message: string.substitute(this.nls.SHARE_INFO.PROMOTED, {user: entry.name}),
              cancelable: true
            });
            this.refreshCallback(entry, streamsOnly);
          }), lang.hitch(this, this._handleError, entry));

        } else{
          var message = globals.currentUser.id === entry.id ?
            this.nls.SHARE_FAIL.SELF : 
            string.substitute(this.nls.SHARE_FAIL.EXISTING_USER, {user: entry.name});
          
          topic.publish("ic-fileviewer/push/messages", {
            type: "warning",
            message: message,
            cancelable: true
          });
        }
      },

      /**
       * This function accepts an entry which is expected to be an extension
       * of an AtomBean and iterates through the filtered lists of items to
       * find if an entry with the entry ID exists
       */
      getExistingEntry: function (entry) {
        var existingEntry = false;
        array.some(ROLES, function (role) {
          array.some(streams[role].filteredItems, function (item) {
            if (entry.get("type") === "everyone") {
              return (item.get("type") === entry.get("type"));
            }
            
            if (entry.get("type") === "user") {
              if ((item.get("id") === entry.get("id"))) {
                existingEntry = item;
              }
              return (item.get("id") === entry.get("id"));
            }

            if (entry.get("type") === "community") {
              if ((item.get("communityUuid") === entry.get("communityUuid"))) {
                existingEntry = item;
              }
              return (item.get("communityUuid") === entry.get("communityUuid"));
            }
          }, this);
        }, this);
        return existingEntry;
      },
      
      refreshTitle: function () {
         var title = this.nls.ROLES[this.userStream.permission.toUpperCase()];
         if (title !== this.nls.ROLES.OWNER) {
           title = string.substitute(this.nls.USERROLE, {userRole: title, sharedUserCount: this.userStream.widgets.length});
         }
         domAttr.set(this.titleNode, "innerHTML", title);
      },

      removeEntryFromStream: function (entry, stream) {
        stream.removeItem(entry);
      },
      
      _handleError: function (entry) {
        topic.publish("ic-fileviewer/push/messages", {
          type: "error",
          message: string.substitute(this.nls.SHARE_FAIL.ERROR, {user: entry.name}),
          cancelable: true
        });
      }
    }),


    /**
     * ShareSection contains the sharing groups. This is used to make
     * the feed request for all shared items, filters them into groups 
     * and renders those groups.
     * The arguments should be at minimum, the file bean, the dataKey mapping
     * to feed type(sharingFeed), factory(SharingPanelFactory) and the widget 
     * costructor(SharingWidget).
     */
    ShareSection = declare([_WidgetBase, _TemplatedMixin], {
      templateString: sectionTemplate,

      constructor: function (args) {
        this.groupArgs = {
          file: args.file,
          dataKey: "sharingFeed",
          entryConstructor: args.entryConstructor,
          factory: args.factory,
          refreshCallback: lang.hitch(this, this._onStreamRefresh)
        };

        lang.mixin(this, args);

        this.titleWithCount = this.factory.get("titleWithCount");
      },

      postCreate: function () {

        if (this.factory._items) {
          this.renderUsers();
          return;
        }

        if (this.file.get("libraryType") !== "personalFiles") {
          this.renderCommunityAsOwner();
        } else{
          this.getSharedUsers();
        }
      }, 
      
      getSharedUsers: function () {

        var args = {shareUsersPageSize: 500};
        this.clearItems();

        var deferred = new Deferred(),
          ownerItem = {
            type: "Owner",
            id: this.file.author.id,
            permission: "Owner",
            name: this.file.author.name
          };

        this.factory._items = deferred;
        this.factory._feed = this.file.get(this.dataKey);

        filteredItems.Owner.push(this.factory._feed.newItem(ownerItem));

        all({
          shareLinksFeed: this.file.get("shareLinksFeed").fetch(args),
          sharesFeed: this.factory._feed.fetch(args)
        }).then(lang.hitch(this, function (responses) {
          
          array.forEach(responses.shareLinksFeed, lang.hitch(this, function(entry) {
            if (entry.id === globals.currentUser.id) {
              this.file.set("myShares", entry.targets);
            }
          }));
          
          this._handleLoad(responses.sharesFeed);

          deferred.resolve(responses.sharesFeed);

        }), function (error) {
          deferred.reject(error);
        });
        
        return deferred;
      },

      filterResponse: function (items) {
        array.forEach(items, lang.hitch(this, function (item) {
          filteredItems[item.permission].push(item);
        }));
      },

      renderCommunityAsOwner: function () {       
        this.clearItems();
        
        var commItem = {
          type: "community",
          id: this.file.get("libraryId"),
          permission: "Owner",
          title: this.file.get("libraryTitle"),
          name: this.file.get("libraryTitle"),
          communityUuid: this.file.get("communityId")
        };
          
        this.factory._feed = this.file.get(this.dataKey);
        
        filteredItems.Owner.push(this.factory._feed.newItem(commItem));
        this.renderRole("Owner");
      },
        
      renderUsers: function () {
        array.forEach(ROLES, lang.hitch(this, this.renderRole));
      },
        
      renderRole: function (role) {
        this.groupArgs.filteredItems = filteredItems[role];
        this.groupArgs.permission = role;
        var group = new SharingGroup(this.groupArgs);
        aspect.after(this, "_refreshStreams", lang.hitch(group, "refreshTitle"));
        group.placeAt(this[role + 'Container']);
      },

      refresh: function (streamsOnly) {
        this.clearItems(streamsOnly);
        this.refreshUsers(streamsOnly);
      },
      
      _onStreamRefresh: function (widget, streamsOnly) {
        if (widget && widget.type === "everyone") {
          this.refreshPanel();
        } else {
          this.refresh(streamsOnly);
        }
      },

      refreshUsers: function (streamsOnly) {

        var args = {shareUsersPageSize: 500};
        var deferred = new Deferred(),
          ownerItem = {
            type: "Owner",
            id: this.file.author.id,
            permission: "Owner",
            name: this.file.author.name
          };

        this.factory._items = deferred;

        filteredItems.Owner.push(this.factory._feed.newItem(ownerItem));

        all({
          shareLinksFeed: this.file.get("shareLinksFeed").refresh(args),
          sharesFeed: this.factory._feed.refresh(args)
        }).then(lang.hitch(this, function (responses) {
    
          array.forEach(responses.shareLinksFeed, lang.hitch(this, function(entry) {
            if (entry.id === globals.currentUser.id) {
              this.file.set("myShares", entry.targets);
            }
          }));
    
          this._handleLoad(responses.sharesFeed, streamsOnly);

          deferred.resolve(responses.sharesFeed);

        }), function (error) {
          deferred.reject(error);
        });

        return deferred;
      },
      
      _handleLoad: function (response, streamsOnly) {
        
        if (streamsOnly) {
          this._refreshStreams(response);
        } else {
          this._filterAndRender(response);
        }
        
        this.sharedWithUsers = array.some(response, function (sharedItem) {
          return sharedItem.get("type") === "user";
        });
      },
      
      _filterAndRender: function (response) {
        this.factory.set("_items", response);
        this.filterResponse(response);
        this.renderUsers();
      },
      
      _refreshStreams: function (response) {
        this.factory._items = response;
        this.filterResponse(response);
        
        array.forEach(ROLES, lang.hitch(this, function (role) {
          var stream = streams[role];
          stream.filteredItems = filteredItems[role];
          stream.render(filteredItems[role]);
        }));
      },

      clearItems: function (streamsOnly) {
        this.resetFilteredItems();
        if (streamsOnly) {
          array.forEach(ROLES, lang.hitch(this, function (role) {
            var stream = streams[role];
            domConstruct.empty(stream.content);
            stream.clearItems();
          }));
        } else {
          array.forEach(ROLES, lang.hitch(this, function (role) {
            domConstruct.empty(this[role + 'Container']);
          }));
        }
      },

      resetFilteredItems: function () {
        filteredItems = {Owner: [], Edit: [], View: [], Folder: []};
      },
      
      updateTitle: function (numEntries) {
        this.factory.set("title", string.substitute(this.titleWithCount, [numEntries || this.factory.getTotalEntries()]));
      }
    });

  return ShareSection;
});