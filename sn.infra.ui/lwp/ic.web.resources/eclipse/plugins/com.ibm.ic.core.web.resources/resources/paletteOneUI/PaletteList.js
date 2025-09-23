define([
	"dojo",
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/_base/array",
	"dojo/_base/window",
	"dojo/dom-class",
	"dojo/i18n!ic-core/paletteOneUI/nls/Palette",
	"dojo/_base/lang",
	"dojo/on",
	"dojo/parser",
	"dojo/text!ic-core/paletteOneUI/templates/PaletteList.html",
	"dojo/topic",
	"dijit/_Container",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/aria/TabPanel"
], function (dojo, domAttr, declare, i18n, array, windowModule, domClass, i18nPalette, lang, on, parser, template, topic, _Container, _Templated, _Widget, TabPanel) {

	/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
	
	// FIXME: in Dojo 1.3, properties of DataStore items are no longer scalar values, but arrays.
	// The paletteOneUI code makes the assumption that properties are scalar values. This code must
	// be entirely refactored.
	
	// dojo.require("dijit.Tree");
	//dojo.requireLocalization("lconn.core.paletteOneUI", "activitiesCalendar");
	var PaletteList = declare(
	// widget name and class
	"lconn.core.paletteOneUI.PaletteList",
	
	// superclass
	[_Widget, _Templated, _Container],
	
	// properties and methods
	{
	   // summary: Widget displaying the available iWidgets to the end-user as a clickable list following the OneUI markup
	   // description: See http://prototyping.westford.ibm.com/OneUItest/oneui.doc/build/out/doc/components/palette.htm for more details
	   // WIDGET_SELECTED_EVENT: Const String
	   //   Name of internal event published by the tree when the user selects an widget in the tree
	   //WIDGET_SELECTED_EVENT: "/ic-core/palette/widgetSelected",
	   // CATEGORY_SELECTED_EVENT: Const String
	   //   Name of internal event published by the list when the user selects a category
	   CATEGORY_SELECTED_EVENT: "/ic-core/palette/categorySelected",
	
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
	
	   templateString: template,
	   
	   postMixInProperties: function() {
	      this._resourceBundle = i18nPalette;
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
	            onComplete: lang.hitch(that, "_onFetchComplete")
	         };
	
	         this.store.fetch(fetchArgs);
	      }
	   },
	
	   _onFetchComplete: function( /* dojo.data.Item[] */ items, /* */ request) {
	      // summary: callback to fetch category list         
	      var first = true;
	
	      array.forEach(items, function(item) {
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
	      new TabPanel(this.itemListNode);
	   },
	
	   setParent: function( /* Widget */ parent) {
	      this._parent = parent;
	   },
	
	   _buildItemMarkup: function( /* dojo.data.Item */ item, /* Boolean */ isSelectedItem) {
	      // summary: return a <li> node representing the category item following OneUI markup
	      var liElem = windowModule.doc.createElement("li");
	      domAttr.set(liElem, "role", "presentation");
	      var aElem = windowModule.doc.createElement("a");
	      domAttr.set(aElem, "href", "javascript:;");
	      domAttr.set(aElem, "categoryId", item.id);
	      domAttr.set(aElem, "role", "tab");
	      domAttr.set(aElem, "aria-selected", "false");
	
	      aElem.innerHTML = item.name[0];
	
	      on(aElem, "click", lang.hitch(this, "_onClickCategoryItem", item));
	      liElem.appendChild(aElem);
	
	      if (isSelectedItem == true) {
	         domAttr.set(aElem, "aria-selected", "true");
	         this._selectCategoryItem(item, liElem);
	      }
	
	      return liElem;
	   },
	
	   _onClickCategoryItem: function( /* dojo.data.Item */ categoryItem, /* DOM event */ evt) {
	      // summary: on category click handler. Change style of selected item and publish an internal event
	      this._selectCategoryItem(categoryItem, evt.currentTarget.parentNode);
	      evt.preventDefault(), evt.stopPropagation();
	   },
	
	   _selectCategoryItem: function( /* dojo.data.Item */ categoryItem, /* DOMNode */ node) {
	      // summary: change style of selected item and publish an internal event
	      if (this._currentSelectedNode != null) {
	         domClass.remove(this._currentSelectedNode, "lotusSelected");
	      }
	      domClass.add(node, "lotusSelected");
	      this._currentSelectedNode = node;
	
	      this._lastSelectedCategoryId = categoryItem.id[0];
	
	      // publish internal event
	      topic.publish(this.CATEGORY_SELECTED_EVENT, categoryItem);
	   },
	
	   getLastCategoryId: function() {
	      return this._lastSelectedCategoryId;
	   }
	});
	
	return PaletteList;
});
