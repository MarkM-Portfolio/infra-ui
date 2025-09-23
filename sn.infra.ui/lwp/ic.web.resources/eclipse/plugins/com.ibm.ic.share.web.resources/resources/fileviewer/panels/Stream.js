/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/Stream.html",
  "dojo/_base/array",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/_base/lang",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/promise/all"
], function (declare, _WidgetBase, _TemplatedMixin, template, array, domClass, domConstruct, lang, i18n, all) {
  "use strict";

  return declare([ _WidgetBase, _TemplatedMixin ], {
    templateString: template,

    postMixInProperties: function () {
      this.nls = i18n.STREAM;
      this.factory = this.factory || {};
      this._feed = this.file.get(this.dataKey);
    },

    postCreate: function () {
      this.widgets = [];

      if (this.filteredItems) {
        domClass.remove(this.domNode, "loading");
        this.render(this.filteredItems);
        return;
      }

      if (this.factory._items) {
        domClass.remove(this.domNode, "loading");
        this.render(this.factory._items);
        return;
      }

      var promises = [this._feed.refresh()];

      if (this.requireFullFileEntry) {
        promises.push(this.file.get("fullEntry"));
      }

      all(promises).then(lang.hitch(this, function (results) {
        this._handleLoadItems(results[0]);
      }));
    },

    refresh: function (widget) {
      if (this.refreshCallback) {
        this.refreshCallback(widget);
        return;
      }

      domConstruct.empty(this.content);
      domClass.add(this.domNode, "loading");

      this._feed.refresh().then(lang.hitch(this, function (response) {
        this._handleLoadItems(response);
      }));
    },

    _loadNextPage: function () {
      domClass.add(this.domNode, "loading");
      this._feed.next().then(lang.hitch(this, this._handleLoadItems));
    },

    _handleLoadItems: function (items) {
      this.clearItems();
      this._setFactoryTitle(this._feed.getTotal());

      domClass.remove(this.domNode, "loading");
      this.render(items);

      if (this._feed.hasNext()) {
        domClass.add(this.domNode, "hasNext");
      } else {
        domClass.remove(this.domNode, "hasNext");
      }
      this.emit("loaded");
    },

    render: function (items) {
      if (items.length) {
        var lastNode = this._getLastEntryNode();
        if (lastNode) {
          domClass.remove(this._getLastEntryNode(), "ics-viewer-last");
        }

        array.forEach(items, this.addItem, this);

        domClass.add(this._getLastEntryNode(), "ics-viewer-last");
        this.widgets[this.widgets.length - 1].set("isLast", true);
      }
    },

    addItem: function (item) {
      var args = {
        entry: item,
        file: this.file,
        actions: this.factory.actions,
        refresh: lang.hitch(this, this.refresh),
        onEdit: lang.hitch(this, this.edit),
        deleteErrorStrings: this.deleteErrorStrings,
        isActionValid: this.isActionValid
      };
      
      lang.mixin(args, this.entryArgs);
      var widget = new this.entryConstructor(args);

      this.widgets.push(widget);
      widget.placeAt(this.content);
      widget.startup();
    },

    _getLastEntryNode: function () {
      return this.content.childNodes[this.content.childNodes.length - 1];
    },

    removeItem: function (item) {
      var indexToSplice;
      array.some(this.widgets, function (widget, index) {
        if (widget.entry.get("id") === item.get("id")) {
          indexToSplice = index;
          widget.destroy();
          return true;
        }
      });

      this.widgets.splice(indexToSplice, 1);
      this.filteredItems.splice(indexToSplice, 1);
    },

    _setFactoryTitle: function () {},

    edit: function () {
      return;
    },
    
    onloaded: function () {},
    
    clearItems: function () {
      this.widgets = [];
      this.filteredItems = [];
    },
    
    size: function() {
      return this.widgets.length;
    }
  });
});
