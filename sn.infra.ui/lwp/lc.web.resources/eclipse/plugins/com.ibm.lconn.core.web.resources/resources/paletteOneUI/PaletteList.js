/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.paletteOneUI.PaletteList");

// FIXME: in Dojo 1.3, properties of DataStore items are no longer scalar values, but arrays.
// The paletteOneUI code makes the assumption that properties are scalar values. This code must
// be entirely refactored.

// dojo.require("dijit.Tree");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("lconn.core.aria.TabPanel");

dojo.require("dojo.parser");

dojo.requireLocalization("lconn.core.paletteOneUI", "Palette");

//dojo.requireLocalization("lconn.core.paletteOneUI", "activitiesCalendar");
dojo.declare(
// widget name and class
"lconn.core.paletteOneUI.PaletteList",

// superclass
[dijit._Widget, dijit._Templated, dijit._Container],

// properties and methods
{
   // summary: Widget displaying the available iWidgets to the end-user as a clickable list following the OneUI markup
   // description: See http://prototyping.westford.ibm.com/OneUItest/oneui.doc/build/out/doc/components/palette.htm for more details
   // WIDGET_SELECTED_EVENT: Const String
   //   Name of internal event published by the tree when the user selects an widget in the tree
   //WIDGET_SELECTED_EVENT: "/lconn/core/palette/widgetSelected",
   // CATEGORY_SELECTED_EVENT: Const String
   //   Name of internal event published by the list when the user selects a category
   CATEGORY_SELECTED_EVENT: "/lconn/core/palette/categorySelected",

   // PERSIST_LABEL_CSS: Const String
   //   Name of CSS class used tp persist the background color or the last selected node, even when the focus is no longer on the tree
   //PERSIST_LABEL_CSS: "persistLabelFocused",
   WIDGET_CATEGORY: "widgetCategory",

   // store: dojo.data.api.Read
   //   List is populated from the file read data store
   store: null,

   // query: String
   //       Query executed against the data store to fetch the list of categories
   query: null,

   // itemListNode: DOMNode
   //      Dojo attach point
   itemListNode: null,

   // _currentSelectedNode: DOMNode
   //      Keep track of currently selected li node
   _currentSelectedNode: null,

   // _lastSelelectedCategoryId: String
   //      Id of the last selected category by the user. Used to republish the event
   _lastSelectedCategoryId: null,
   
   _resourceBundle: null,

   templatePath: dojo.moduleUrl("lconn.core", "paletteOneUI/templates/PaletteList.html"),
   
   postMixInProperties: function() {
      this._resourceBundle = dojo.i18n.getLocalization("lconn.core.paletteOneUI", "Palette");
   },

   postCreate: function() {
      // summary: post create initialization
      this.inherited("postCreate", arguments);
      this._fetchCategoryList();
   },

   setStoreQuery: function( /* dojo.data.store */ store, /* query obj */ query) {
      // summary: reset the list with a new store/query
      this.story = store;
      this.query = query;

      this._fetchCategoryList();
   },

   _fetchCategoryList: function() {
      var that = this;

      if ((this.store != null) && (this.query != null)) {
         var fetchArgs = {
            query: that.query,
            onComplete: dojo.hitch(that, "_onFetchComplete")
         };

         this.store.fetch(fetchArgs);
      }
   },

   _onFetchComplete: function( /* dojo.data.Item[] */ items, /* */ request) {
      // summary: callback to fetch category list         
      var first = true;

      dojo.forEach(items, function(item) {
         var liElem = this._buildItemMarkup(item, first);
         first = false;
         this.itemListNode.appendChild(liElem);
      }, this);

      if (items.length > 1) {
         console.log(this._parent);
         console.log(items.length);
         this._parent.showShelf();
      } else {
         this._parent.hideShelf();
      }

      // Make itemListNode a aria TabPanel
      new lconn.core.aria.TabPanel(this.itemListNode);
   },

   setParent: function( /* Widget */ parent) {
      this._parent = parent;
   },

   _buildItemMarkup: function( /* dojo.data.Item */ item, /* Boolean */ isSelectedItem) {
      // summary: return a <li> node representing the category item following OneUI markup
      var liElem = dojo.doc.createElement("li");
      dojo.attr(liElem, "role", "presentation");
      var aElem = dojo.doc.createElement("a");
      dojo.attr(aElem, "href", "javascript:;");
      dojo.attr(aElem, "categoryId", item.id);
      dojo.attr(aElem, "role", "tab");
      dojo.attr(aElem, "aria-selected", "false");

      aElem.innerHTML = item.name[0];

      dojo.connect(aElem, "onclick", dojo.hitch(this, "_onClickCategoryItem", item));
      liElem.appendChild(aElem);

      if (isSelectedItem == true) {
         dojo.attr(aElem, "aria-selected", "true");
         this._selectCategoryItem(item, liElem);
      }

      return liElem;
   },

   _onClickCategoryItem: function( /* dojo.data.Item */ categoryItem, /* DOM event */ evt) {
      // summary: on category click handler. Change style of selected item and publish an internal event
      this._selectCategoryItem(categoryItem, evt.currentTarget.parentNode);
      dojo.stopEvent(evt);
   },

   _selectCategoryItem: function( /* dojo.data.Item */ categoryItem, /* DOMNode */ node) {
      // summary: change style of selected item and publish an internal event
      if (this._currentSelectedNode != null) {
         dojo.removeClass(this._currentSelectedNode, "lotusSelected");
      }
      dojo.addClass(node, "lotusSelected");
      this._currentSelectedNode = node;

      this._lastSelectedCategoryId = categoryItem.id[0];

      // publish internal event
      dojo.publish(this.CATEGORY_SELECTED_EVENT, [categoryItem]);
   },

   getLastCategoryId: function() {
      return this._lastSelectedCategoryId;
   }
});
