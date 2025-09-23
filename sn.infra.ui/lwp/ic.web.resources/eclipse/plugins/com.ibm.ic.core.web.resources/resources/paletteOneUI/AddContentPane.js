define([
	"dojo",
	"dojo/dom-class",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/i18n!ic-core/paletteOneUI/nls/AddContentPane",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/json",
	"dojo/text!ic-core/paletteOneUI/templates/AddContentPane.html",
	"dojo/topic",
	"dijit/_Container",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/paletteOneUI/PaletteContentPanel",
	"ic-core/paletteOneUI/PaletteDataStoreBuilder",
	"ic-core/paletteOneUI/PaletteList"
], function (dojo, domClass, declare, i18n, i18nAddContentPane, lang, array, JSON, template, topic, _Container, _Templated, _Widget, PaletteContentPanel, PaletteDataStoreBuilder, PaletteList) {

	/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
	
	// FIXME: in Dojo 1.3, properties of DataStore items are no longer scalar values, but arrays.
	// The paletteOneUI code makes the assumption that properties are scalar values. This code must
	// be entirely refactored.
	
	var AddContentPane = declare( // widget name and class
	   "lconn.core.paletteOneUI.AddContentPane", // superclass
	   [_Widget, _Templated, _Container, dijit._Contained], // properties and methods
	{
	   // summary: Widget palette. See
	   // https://w3.tap.ibm.com/w3ki/display/conndev/Widget+palette+in+2.5
	   // ADD_WIDGET_EVENT: Const String
	   // Name of the event published when the use clicks the "Add
	   // Widget to Page" button
	   // ADD_WIDGET_EVENT: "/ic-core/palette/addWidget",
	   // RECHECK_CAN_ADD_HANDLER_EVENT: Const String
	   // Name of the event listened to by the palette
	   // canAddHandler is checked automatically after:
	   // - the user selects a widget in the tree
	   // - the user adds a widget to the page
	   //      
	   // Publishing RECHECK_CAN_ADD_HANDLER_EVENT allows the
	   // embedding environment to signal
	   // that the canAddHandler should be recheck at other times
	   // RECHECK_CAN_ADD_WIDGET_HANDLER_EVENT:
	   // "/ic-core/palette/recheck",
	   // PRIMARY_WIDGET: Const String
	   // Id for a primary widget
	   PRIMARY_WIDGET: "primary",
	
	   // SECONDARY_WIDGET: Const String
	   // Id for a secondary widget
	   SECONDARY_WIDGET: "secondary",
	
	   // widgetTypes: static Array
	   // pseudo-enum for supported widget types. Only used
	   // internally
	   _WIDGET_TYPES: [],
	
	   // _topics: Array [handler]
	   // Used internally to keep track of dojo.subscribe handlers
	   _topics: [],
	
	   // _jsonSourceUrl: String
	   // Url from where to fetch the Json string when
	   // populatePalette is called with the parameter xhr=true
	   _jsonSourceUrl: null,
	
	   // _jsonData: Object
	   // Json Object containing the information about the
	   // available widgets
	   _jsonData: null,
	
	   // _storeBuilder:
	   // lconn.core.paletteOneUI.PaletteDataStoreBuilder
	   // Utility used internally to create datastore to feed the
	   // tree
	   _storeBuilder: null,
	
	   // _infoPanel: lconn.core.paletteOneUI.WidgetInfoPanel
	   // Reference to widget displaying individual pieces of
	   // information about a widget
	   // _infoPanel: null,
	   // _contentArea: lconn.core.paletteOneUI.PaletteContentPanel
	   _contentArea: null,
	
	   // listNode: DOMNode
	   // Template Dojo attach point
	   listNode: null,
	
	   // contentAreaNode: DOMNode
	   // Template Dojo attach point
	   contentAreaNode: null,
	
	   _contentAreaItems: null,
	
	   // panelNode: DOMNode
	   // Template Dojo attach point
	   // panelNode: null,
	   // addWidgetButtonNode: DOMNode
	   // Template Dojo attach point
	   addWidgetButtonNode: null,
	
	   // shelfNode: DOMNode
	   // Template Dojo attach point
	   shelfNode: null,
	
	   // _canAddWidgetHandler: Function
	   // See documentation for registerCanAddWidgetFct()
	   _canAddWidgetHandler: null,
	   _isVisibleWidgetHandler: null,
	
	   // _resourceBundle: JSON Object
	   // Object holding the externilized strings
	   _resourceBundle: null,
	
	   // _layoutImages: Map
	   // Mapping between widgetType and images
	   _layoutImages: null,
	
	   // _currentStore: dojo.data.Store
	   // Keep reference to current store used by the list.
	   _currentStore: null,
	
	   // _listWidget: lconn.core.paletteOneUIList
	   _listWidget: null,
	
	   imageContextRoot: "",
	
	   browseLabelNode: null,
	   loadingNode: null,
	
	   templateString: template,
	
	   postMixInProperties: function() {
	      this._resourceBundle = i18nAddContentPane;
	   },
	
	   postCreate: function() {
	      this.inherited("postCreate", arguments);
	
	      this._createLoadingNode();
	      this._setLoading();
	
	      // init and display info panel
	      var imageRoot = this.imageContextRoot;
	      this._contentArea = new PaletteContentPanel({
	         imageContextRoot: imageRoot
	      });
	      this.contentAreaNode.appendChild(this._contentArea.domNode);
	      dojo.addClass(this.contentAreaNode, "lotusPaletteContentAreaNode");
	      
	      // utility to create datastore for the tree
	      this._storeBuilder = new PaletteDataStoreBuilder();
	
	      this._registerDefaultCanAddWidgetFct();
	      this._registerDefaultIsVisibleWidgetFct();
	
	      // register to event published by the tree
	      // this._topics.push(dojo.subscribe(lconn.core.paletteOneUI.PaletteList.prototype.CATEGORY_SELECTED_EVENT,
	      // dojo.hitch(this, "onCategorySelected")));
	      // this._topics.push(dojo.subscribe(lconn.core.paletteOneUI.PaletteTree.prototype.WIDGET_SELECTED_EVENT,
	      // dojo.hitch(this, "onWidgetSelected")));
	      // this._topics.push(dojo.subscribe(this.RECHECK_CAN_ADD_WIDGET_HANDLER_EVENT,
	      // dojo.hitch(this, "_populateContentArea")));
	   },
	
	   setJsonSourceUrl: function( /* String */ url) {
	      // summary: set source url from where to fetch the Json
	      // String containing the available widgets
	      // description: The url is only used if populatePalette
	      // is called with the xhr parameter set to true
	      this._jsonSourceUrl = url;
	   },
	
	   getJsonSourceUrl: function() {
	      // summary: returns source url from where to fetch the
	      // Json String containing the available widgets (if
	      // previously set)
	      return this._jsonSourceUrl;
	   },
	
	   setJsonData: function( /* String | Object */ jsonData) {
	      // work with a Json Object
	      this._jsonData = lang.isString(jsonData) ? JSON.parse(jsonData) : jsonData;
	   },
	
	   getJsonData: function() {
	      // summary: returns currently used json data object (if
	      // any)
	      return this._jsonData;
	   },
	
	   populatePalette: function( /* Boolean */ isXhr) {
	      // summary: populate the palette tree from the json data
	      // description: if isXhr is true: the palette fetches
	      // the json data from the url passed to setJsonSourceUrl
	      // if isXhr is false: the palette populate the tree from
	      // the json data passed to setJsonData
	      this._setLoading();
	
	      var deferred;
	      if (isXhr) {
	         deferred = this._storeBuilder.buildDataStore(this._jsonSourceUrl, true);
	      } else {
	         deferred = this._storeBuilder.buildDataStore(this._jsonData, false);
	      }
	
	      var that = this;
	
	      deferred.then(lang.hitch(this, "_setupList"), lang.hitch(this, "_handleError"));
	      deferred.then(null, function() {
	         that._hideLoading();
	      });
	   },
	
	   _createLoadingNode: function() {
	
	      this.loadingNode.innerHTML = "";
	      // var url = dojo.moduleUrl("lconn.core.paletteOneUI",
	      // "images/progressIndicator.gif").toString();
	      // var imgElm = dojo.doc.createElement("img");
	      // dojo.attr(imgElm, "src", url);
	      // dojo.attr(imgElm, "title",
	      // this._resourceBundle.LOADING);
	      // dojo.attr(imgElm, "alt",
	      // this._resourceBundle.LOADING);
	      this.loadingNode.innerHTML = "<div>" + this._resourceBundle.LOADING + "</div>";
	
	      // this.loadingNode.style.padding = "25px";
	      domClass.add(this.loadingNode, "lotusMeta");
	
	      // this.loadingNode.appendChild(imgElm);
	   },
	
	   _setLoading: function() {
	      // summary: Display loading message
	      domClass.remove(this.loadingNode, "lotusHidden");
	   },
	
	   _removeLoading: function() {
	      // summary: Hide loading message
	      // if ((this.loadingNode != null) &&
	      // (this.loadingNode.parentNode != null)){
	      // this.loadingNode.parentNode.removeChild(this.loadingNode);
	      // }
	      domClass.add(this.loadingNode, "lotusHidden");
	
	      // this.contentAreaNode.innerHTML = "";
	   },
	
	   _setupList: function( /* dojo.data.ItemFileWriteStore */
	   dataStore) {
	      // summary: setup and display the category list
	/*
	         * var treeModel = new dijit.tree.ForestStoreModel({
	         * store: dataStore, query: {type: 'widgetCategory'},
	         * childrenAttrs: ["children"] });
	         */
	      this._removeLoading();
	
	      this._currentStore = dataStore;
	      this._loadList();
	   },
	
	   _loadList: function() {
	      // summary: load list with current data store
	      if (this._currentStore != null) {
	
	         // if (this._listWidget == null){
	         // create list instance
	         var dataStore = this._currentStore;
	
	         if (this._listWidget != null) {
	            this._listWidget.destroy();
	         }
	
	         this._listWidget = new PaletteList({
	            store: dataStore,
	            query: {
	               type: 'widgetCategory'
	            },
	            _parent: this
	         });
	
	         this.listNode.innerHTML = "";
	         this.listNode.appendChild(this._listWidget.domNode);
	
	         domClass.remove(this.browseLabelNode, "lotusHidden");
	         // } else {
	         // refesh list instance
	         // }
	      }
	   },
	
	   showShelf: function() {
	      // summary: show shelf
	      domClass.remove(this.shelfNode, "lotusHidden");
	      domClass.remove(this.shelfNode.parentNode, "lotusPaletteNoShelf");
	   },
	
	   hideShelf: function() {
	      domClass.add(this.shelfNode, "lotusHidden");
	      domClass.add(this.shelfNode.parentNode, "lotusPaletteNoShelf");
	   },
	
	   removeItem: function( /* String */ itemId) {
	      // summary: remove an item from the current data store.
	      var store = this._currentStore;
	      var that = this;
	
	      if (store != null) {
	         var dfd = store.fetch({
	            query: {
	               id: itemId
	            },
	            onComplete: function(items) {
	               if (items.length == 1) {
	                  store.deleteItem(items[0]);
	                  that._updateContentArea();
	               } else {
	                  // TODO: unexpected number of items,
	                  // throw exception?
	               }
	            }
	         });
	      }
	   },
	
	   _updateContentArea: function() {
	      // summary: republish the new category item obj (used
	      // after removing a widget)
	      var catId = this._listWidget.getLastCategoryId();
	
	      if (catId != null) {
	         this._currentStore.fetch({
	            query: {
	               id: catId
	            },
	            onComplete: function(items) {
	               if (items.length == 1) {
	                  topic.publish("/ic-core/palette/categorySelected", items[0]);
	               } else {
	                  // TODO: unexpected number of
	                  // items, throw exception?
	               }
	            }
	         });
	      }
	
	   },
	
	   _initWidgetTypes: function() {
	      // summary: init pseudo-enum unsed internally
	      this._WIDGET_TYPES.push(this.PRIMARY_WIDGET);
	      this._WIDGET_TYPES.push(this.SECONDARY_WIDGET);
	   },
	
	   _registerDefaultLayoutImages: function() {
	      // summary: register layout images for primary and
	      // secondary widgets
	      // Layout images can be replaced by the embedding
	      // environment with setLayoutImage
	      var defaultUrl = require.toUrl("ic-core/paletteOneUI/images/primary_widget.png").toString();
	
	      // registering the same image for now. Karl to deliver
	      // additional images
	      this.setLayoutImage(this.PRIMARY_WIDGET, defaultUrl);
	      this.setLayoutImage(this.SECONDARY_WIDGET, defaultUrl);
	   },
	
	   registerIsVisibleButton: function(handler) {
	      if (lang.isFunction(handler)) {
	         this._isVisibleWidgetHandler = handler;
	      }
	   },
	
	   _handleError: function() {
	      // summary: common error handler responsible for
	      // surfacing the error to the end user
	      console.log("error in palette");
	      console.log(arguments[0]);
	   },
	
	   _populateContentArea: function( /* Boolean */ resetPager, /* String */ addedWidgetId) {
	      // summary: populate the content area with the
	      // predefined items (_contentAreaItems)
	      if (this._contentAreaItems != null) {
	         var items = [];
	
	         array.forEach(this._contentAreaItems, function(childItem) {
	            if (this._isVisibleWidgetHandler(childItem)) {
	               var item = {};
	               if (this._canAddWidgetHandler(childItem)) {
	                  item = {
	                     enabled: true,
	                     item: childItem
	                  };
	               }
	               else {
	                  item = {
	                     enabled: false,
	                     item: childItem
	                  };
	               }
	               
	               if (addedWidgetId && (addedWidgetId == childItem.widgetId)) {
	                  item.showMsg = true;
	               }
	               
	               items.push(item);
	            }
	         }, this);
	
	         if ((resetPager != null) && (resetPager == true)) {
	            this._contentArea.goToFirstPage();
	         }
	
	         this._contentArea.setItems(items);
	      }
	   },
	
	   onCategorySelected: function( /* dojo.data.item */
	   categoryItem) {
	      // summary: callback invoked when user select a category
	      // in the list
	      this._contentAreaItems = categoryItem.children;
	      this._populateContentArea(true);
	   },
	
	   // FIXME: unused
	   _runCanAddWidgetHandler: function( /* dojo.data.item */
	   item) {
	      // summary: run the registred handler and toggle the add
	      // widget button accordingly
	      // TODO: move to button?
	      // item = item == null ? this._currentWidgetItem : item;
	      // try{
	      // if (this._canAddWidgetHandler(item)){
	      // this._enabledAddWidgetButton();
	      // } else {
	      // this._disableAddWidgetButton();
	      // }
	      // } catch(e){
	      // console.log("Exception while running
	      // canAddWidgetHandler");
	      // console.log(e);
	      // }
	   },
	
	   setLayoutImage: function( /* String */ widgetType, /* url */ url) {
	      // summary: allows to set a layout preview image for
	      // primary and secondary widgets
	      // This override the default images bundled with the
	      // palette
	      dojo.deprecated("setLayoutImage");
	   },
	
	   getLayoutImage: function( /* String */ widgetType) {
	      dojo.deprecated("getLayoutImage");
	
	      return null;
	   },
	
	   _disableAddWidgetButton: function() {
	      this.addWidgetButtonNode.disabled = true;
	      domClass.add(this.addWidgetButtonNode, this.DISABLED_BUTTON_CSS);
	   },
	
	   _enabledAddWidgetButton: function() {
	      this.addWidgetButtonNode.disabled = false;
	      domClass.remove(this.addWidgetButtonNode, this.DISABLED_BUTTON_CSS);
	   },
	
	   registerCanAddWidgetFct: function( /* Function(widgetData) */
	   handler) {
	      // summary: register handler called to determine if a
	      // given widget can be added to the page
	      // description: Useful in the case a widget should be
	      // only added once to the page
	      // - The client can register an handler allowing the
	      // palette to know that the selected widget
	      // cannot be added to the page.
	      // - The handler is called when the user select a widget
	      // in the tree
	      // - The handler is passed the item containing metadata
	      // about the selected widget
	      // - If the handler returns false, the "add to page"
	      // button is disabled
	      if (lang.isFunction(handler)) {
	         this._canAddWidgetHandler = handler;
	      }
	   },
	
	   _registerDefaultCanAddWidgetFct: function() {
	      // summary: default handler. Always return true. This
	      // handler can be overriden by using
	      // registerCanAddWidgetFct
	      if (this._canAddWidgetHandler == null) {
	         this._canAddWidgetHandler = function(widgetData) {
	            return true;
	         };
	      }
	   },
	
	   _registerDefaultIsVisibleWidgetFct: function() {
	      // summary: default handler. Always return true. This
	      // handler can be overriden by using registerCanAddWidgetFct
	      if (this._isVisibleWidgetHandler == null) {
	         this._isVisibleWidgetHandler = function(widgetData) {
	            return true;
	         };
	      }
	   },
	
	   destroy: function() {
	      // summary: overriden. Clean up handlers
	      array.forEach(this._topics, function(topic) {
	         topic.remove();
	      });
	   }
	});
	
	return AddContentPane;
});
