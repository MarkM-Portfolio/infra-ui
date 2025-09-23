/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./Stream",
  "./Panel",
  "../action/ShareAction",
  "dojo/Stateful",
  "./SharingWidget",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-class",
  "../section/ShareSection",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "./SharingPanel",
  "dojo/topic",
  "dojo/when",
  "../config/globals"
], function (declare, Stream, Panel, ShareAction, Stateful, SharingWidget, lang, array, domClass, ShareSection, i18n,
   string, SharingPanel, topic, when, globals) {
  "use strict";

  return declare([ Stateful ], {
    id: "share",
    urlParameterId: "share",
    actions: ["restore", "delete"],

    constructor: function () {
      this.nls = i18n.PANEL.SHARING;
      this.title = this.nls.TITLE;
      this.titleWithCount = this.nls.TITLE_WITH_COUNT;
      
      topic.subscribe("ic-fileviewer/refresh", lang.hitch(this, function () {
        delete this._items;
        delete this._folders;
        delete this._feed;
      }));
    },
    
    _panelGetter: function () {
      return new Panel({factory: this});
    },
    
    renderContent: function (panel) {
      when(globals.policy).then(lang.hitch(this, function () {
        var sharingPanel = new SharingPanel({
          file: this.file,
          factory: this
        });
        sharingPanel.placeAt(panel.content);
      }));
    },
    
    updateTitle: function () {
      this.set("title", string.substitute(this.titleWithCount, [this.getTotalEntries()]));
    },
    
    getTotalEntries: function(numEntries) {
      var total = 0;
      if (lang.isArray(this._items)) {
        total += this._items.length;
      }
      if (lang.isArray(this._folders)) {
        total += this._folders.length;
      }
      return total;
    },
    
    countItemsType: function(type) {
      var count = 0;
      if (lang.isArray(this._items)) {
        array.forEach(this._items, function(item) {
          if(item.type === type) {
            count++;
          }
        });
      }
      return count;
    },
    
    countFoldersVisibility: function(visibility) {
      var count = 0;
      if (lang.isArray(this._folders)) {
        array.forEach(this._folders, function(folder) {
          if(folder.visibility === visibility) {
            count++;
          }
        });
      }
      return count;
    },
    
    getTotalSharedEntries: function() {
      return this.countItemsType("user") + this.countItemsType("community") + this.countFoldersVisibility("shared");
    },
    
    getTotalPublicEntries: function() {
      return this.countItemsType("everyone") + this.countFoldersVisibility("public");
    },
    
    addItem: function(item) {
      if(item.type === "everyone") {
        // file visibility is set to public in SharingFeedDataStore.createItem()
        return;
      }
      var myShares = this.file.get("myShares") || [];
      myShares.push(item);
      this.file.set("myShares", myShares);
      this._items.push(item);

      var _items = lang.clone(this.get("_items") || []);
      _items.push(item);
      this.set("_items", _items);
    },
    
    updateFileVisibility: function() {
      var fileVisibility = "private";
      
      if(this.getTotalPublicEntries() > 0 || this.file.get("visibility") === "public") {
        fileVisibility = "public";
      } else if(this.getTotalSharedEntries() > 0) {
        fileVisibility = "shared";
      }
      
      if(this.file.get("visibility") != fileVisibility) {
        this.file.set("visibility", fileVisibility);
        this.file.unmarkDirty();
      }
    },

    __itemsSetter: function(items) {
      this._items = items;
      this.updateFileVisibility();
    },
    
    __foldersSetter: function(folders) {
      this._folders = folders;
      this.updateFileVisibility();
    }
  });
});
