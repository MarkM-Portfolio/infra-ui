/* Copyright IBM Corp. 2008, 2017  All Rights Reserved.              */

dojo.provide("lconn.core.paletteOneUI.Palette");

dojo.require("lconn.core.paletteOneUI.AddContentPane");
dojo.require("lconn.core.paletteOneUI.PaletteList");
dojo.require("lconn.core.paletteOneUI.PaletteDataStoreBuilder");
dojo.require("lconn.core.paletteOneUI.PaletteContentPanel");
dojo.require("lconn.core.aria.TabPanel");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");

dojo.requireLocalization("lconn.core.paletteOneUI", "Palette");

dojo.declare(
// widget name and class
"lconn.core.paletteOneUI.Palette",

// superclass
[dijit._Widget, dijit._Templated, dijit._Container],

// properties and methods
{
   // summary: Widget palette. See https://w3.tap.ibm.com/w3ki/display/conndev/Widget+palette+in+2.5

   // ADD_WIDGET_EVENT: Const String
   //      Name of the event published when the use clicks the "Add Widget to Page" button
   ADD_WIDGET_EVENT: "/lconn/core/palette/addWidget",

   // CLOSE_PALETTE_EVENT: Const String
   //      Name of the event published when the use clicks the "Close Palette" button
   CLOSE_PALETTE_EVENT: "/lconn/core/palette/closePalette",

   // RESET_COUNTER: Const String
   //      Name of the event published when the palette should reset the number of added items
   RESET_COUNTER_EVENT: "lconn/core/palette/resetCounter",

   // RECHECK_CAN_ADD_HANDLER_EVENT: Const String
   //      Name of the event listened to by the palette
   //      canAddHandler is checked automatically after:
   //            - the user selects a widget in the tree
   //            - the user adds a widget to the page
   //      
   //      Publishing RECHECK_CAN_ADD_HANDLER_EVENT allows the embedding environment to signal 
   //      that the canAddHandler should be recheck at other times
   RECHECK_CAN_ADD_WIDGET_HANDLER_EVENT: "/lconn/core/palette/recheck",

   // PRIMARY_WIDGET: Const String
   //      Id for a primary widget
   PRIMARY_WIDGET: "primary",

   // SECONDARY_WIDGET: Const String
   //      Id for a secondary widget
   SECONDARY_WIDGET: "secondary",

   // widgetTypes: static Array
   //      pseudo-enum for supported widget types. Only used internally
   _WIDGET_TYPES: [],

   // _topics: Array [handler]
   //      Used internally to keep track of dojo.subscribe handlers
   _topics: [],

   // _addWidgetTopic: addWidget topic handler
   _addWidgetTopic: null,

   // _contentArea: lconn.core.paletteOneUI.PaletteContentPanel
   _contentArea: null,

   // listNode: DOMNode
   //      Template Dojo attach point      
   listNode: null,

   // contentAreaNode: DOMNode
   //      Template Dojo attach point
   contentAreaNode: null,

   // closeImageNode: DOMNode
   //      Template Dojo attach point
   closeImageNode: null,

   // addWidgetButtonNode: DOMNode
   //      Template Dojo attach point   
   addWidgetButtonNode: null,

   // _canAddWidgetHandler: Function
   //      See documentation for registerCanAddWidgetFct()
   _canAddWidgetHandler: null,

   // _resourceBundle: JSON Object
   //      Object holding the externilized strings
   _resourceBundle: null,


   // _itemAddedCount: int
   //      Keep track of the number of item added
   _itemAddedCount: null,

   // itemAddedStr: String
   //      i18n string for number of items added
   itemAddedStr: null,
   
   modalTitleStr: null,
   
   close: null,
   
   imageContextRoot: "",

   _tabPanels: null,
   _currentTab: null,
   _tabBar: null,
   tabsContainerNode: null,

   templatePath: dojo.moduleUrl("lconn.core", "paletteOneUI/templates/Palette.html"),

   postMixInProperties: function() {
      this._resourceBundle = dojo.i18n.getLocalization("lconn.core.paletteOneUI", "Palette");
      this.itemAddedStr = this._resourceBundle.ITEM_ADDED_NONE;
      this.modalTitleStr = this._resourceBundle.ADD_CONTENT;
   },

   postCreate: function() {
      this.inherited("postCreate", arguments);
      this._tabPanels = [];

      this._registerDefaultPanel();

      this.closeImageNode.src = this._blankGif;
      this.closeImageNode.className = "otherFramework16 otherFramework16-CloseHover14";

      this._topics.push(dojo.subscribe(lconn.core.paletteOneUI.PaletteList.prototype.CATEGORY_SELECTED_EVENT, dojo.hitch(this, "_handleEventsControler", "category")));
      this._topics.push(dojo.subscribe(this.RECHECK_CAN_ADD_WIDGET_HANDLER_EVENT, dojo.hitch(this, "_handleEventsControler", "recheck")));
      this._topics.push(dojo.subscribe(this.RESET_COUNTER_EVENT, dojo.hitch(this, "_resetItemCount")));

      dojo.attr(this.domNode, "aria-label", this._resourceBundle.DESC);

      // Set focus to the current tab
   	  this.setTabFocus();
   },

   _registerDefaultPanel: function() {
      // summary: add default widget panel
      var imageRoot = this.imageContextRoot;

      this._contentArea = new lconn.core.paletteOneUI.AddContentPane({
         imageContextRoot: imageRoot
      });
      this.addTabPane("widgetAddId", this._resourceBundle.ADD_CONTENT, this._contentArea, true);

      var contentWidget = this._tabPanels["widgetAddId"];
      this.addChild(contentWidget);
   },

   _handleEventsControler: function( /* String */ type) {
      if (this._currentTab != null) {
         var id = this._currentTab.id;
         var widget = this._tabPanels[id];

         if (widget instanceof lconn.core.paletteOneUI.AddContentPane) {
            if (type == "category") {
               widget.onCategorySelected(dojo._toArray(arguments)[1]);
            } else if (type == "recheck") {
               widget._populateContentArea(null, dojo._toArray(arguments)[1]);
            }
         }
      }
   },

   // Set focus to the current tab
   setTabFocus: function() {
	  var menuArray = dojo.query("li", this.tabsContainerNode);
	  dojo.forEach(menuArray, function(menuEntry, ii) {
		 if (dojo.hasClass(menuEntry, "lotusSelected")) {
			 dojo.attr(menuEntry, {"aria-selected":"true","tabindex":"0"});
			 setTimeout(function() {
				if (menuEntry) {
					// console.log("***** Set focus to selected: "+menuEntry.id);
					menuEntry.focus();
				}
			 }, dojoConfig.defaultDuration + 200);
		 }
		 else {
			 dojo.attr(menuEntry, {"aria-selected":"false","tabindex":"-1"});
		 }
	  }, this);
   },

   setJsonSourceUrl: function( /* String */ url) {
      // summary: set source url from where to fetch the Json String containing the available widgets
      // description: The url is only used if populatePalette is called with the xhr parameter set to true
      this._contentArea.setJsonSourceUrl(url);
   },

   getJsonSourceUrl: function() {
      // summary: returns source url from where to fetch the Json String containing the available widgets (if previously set)
      return this._contentArea.getJsonSourceUrl();
   },

   setJsonData: function( /* String | Object */ jsonData) {
      this._contentArea.setJsonData(jsonData);
   },

   getJsonData: function() {
      // summary: returns currently used json data object (if any)
      return this._contentArea.getJsonData();
   },

   populatePalette: function( /* Boolean */ isXhr) {
      // summary: populate the palette tree from the json data
      // description: if isXhr is true: the palette fetches the json data from the url passed to setJsonSourceUrl
      //            if isXhr is false: the palette populate the tree from the json data passed to setJsonData
      this._contentArea.populatePalette(isXhr);
   },

   removeItem: function( /* String */ itemId) {
      // summary: remove an item from the current data store.
      this._contentArea.removeItem(itemId);
   },

   onClosePalette: function(evt) {
      // summary: onclick handler invoked when the user clicks the "Close Palette" button
      // description: publish CLOSE_PALETTE_EVENT dojo event
      //if (this._currentWidgetItem != null){
      //}
      
      if(lconn.core.theme.isHikariTheme())
      {
    	  dojo.publish(this.CLOSE_PALETTE_EVENT);
          dijit.byId('palette_modal_id').hide();
      }
      else
      {
    	  dojo.publish(this.CLOSE_PALETTE_EVENT);
    	  dojo.stopEvent(evt);
      }
   },

   setLayoutImage: function( /* String */ widgetType, /* url */ url) {
      // summary: allows to set a layout preview image for primary and secondary widgets
      //      This override the default images bundled with the palette
      this._contentArea.setLayoutImage(widgetType, url);
   },

   getLayoutImage: function( /* String */ widgetType) {
      return this._contentArea.getLayoutImage(widgetType);
   },

   addTabPane: function( /* String */ id, /* String */ name, /* dijit */ widget, /* Boolean? */ isSelected) {

      var headerNode = null;

      // TODO: check unique id
	  if (typeof widget.domNode != "undefined") {

	         headerNode = this._buildTabHeaderNode(id, name, isSelected, widget.containerNode.id);
         this.tabsContainerNode.appendChild(headerNode);
         this._tabPanels[id] = widget;


         if ((typeof isSelected != "undefined") && (isSelected == true)) {
            dojo.addClass(headerNode, "lotusSelected");
            dojo.attr(headerNode, {"aria-selected":"true","tabindex":"0"});
            this._currentTab = headerNode;
         }

		 // Attach the ARIA toolbar helper
		 this._tabBar = new lconn.core.aria.TabPanel(this.tabsContainerNode);

		 // Initialize ARIA tabpanel roles
		 dojo.attr(widget.containerNode, {"role":"tabpanel", "aria-labelledby":id+"Link"});
	  }
   },

   // Build a tab in the tablist.
   _buildTabHeaderNode: function( /* String */ id, /* String */ name, /* Boolean */ isSelected, /* String */ ariaControls) {
      var liElem = dojo.doc.createElement("li");

	  // Create the List element
	  if (isSelected)
		 dojo.attr(liElem, {"role":"tab","tabindex":"0","aria-selected":"true","aria-controls":ariaControls});

	  else {
		 dojo.attr(liElem, {"role":"tab","tabindex":"-1","aria-selected":"false","aria-controls":ariaControls});
	  }
	  liElem.id = id;

	  // Enable keyboard and click handlers
	  dojo.connect(liElem, "onkeydown", dojo.hitch(this, "_handleKeyEvent", id));
      dojo.connect(liElem, "onclick", dojo.hitch(this, "_switchToTab", id));

	  // Create the Anchor tag
	  liElem.innerHTML = "<a href='javascript:;' id='" + id + "Link' tabindex='-1'>" + "<strong>" + name + "</strong></a>";
      return liElem;
   },

   // Activate the current tab when enter or space is pressed
  _handleKeyEvent: function( /* String id */ id, /* DOMNode */ evt) {
	  if (id && evt) {
		 code = evt.keyCode || evt.charCode;
		 switch(code){
			case dojo.keys.ENTER:
			case dojo.keys.SPACE:

				// console.log("***** Navbar enter/space pressed, activate tab");
				this._switchToTab(id);
				dojo.stopEvent(evt);
				break;
		 }
	  }
   },

   _switchToTab: function( /* String id */ id, /* DOMNode */ evt) {

      // Clear old selection
      if (this._currentTab != null) {
         dojo.removeClass(this._currentTab, "lotusSelected");
         dojo.attr(this._currentTab, {"aria-selected":"false","tabindex":"-1"});
      }

	  // Set new selection
      var liElem = dojo.byId(id);
      dojo.addClass(liElem, "lotusSelected");
      dojo.attr(liElem, {"aria-selected":"true","tabindex":"0"});
      this._currentTab = liElem;

      var contentWidget = this._tabPanels[id];
      var contentWidgets = this.getChildren();

      var that = this;
      dojo.forEach(contentWidgets, function(widget) {
         that.removeChild(widget);
      });

      this.addChild(contentWidget);

	  // Give the selected Tab focus
	  this.setTabFocus();
   },

   registerCanAddWidgetFct: function( /* Function(widgetData) */ handler) {
      // summary: register handler called to determine if a given widget can be added to the page
      // description: Useful in the case a widget should be only added once to the page
      //      - The client can register an handler allowing the palette to know that the selected widget
      //      cannot be added to the page.
      //      - The handler is called when the user select a widget in the tree
      //      - The handler is passed the item containing metadata about the selected widget
      //      - If the handler returns false, the "add to page" button is disabled
      this._contentArea.registerCanAddWidgetFct(handler);
   },

   registerIsVisibleButton: function( /* Function(widgetData) */ handler) {
      // summary: Determine whether a widget button should be displayed
      this._contentArea.registerIsVisibleButton(handler);
   },

   enableItemCounter: function() {
      // summary: display a counter with the number of added items
      dojo.removeClass(this.itemAddedNode, "lotusHidden");
   },

   disableItemCounter: function() {
      // summary: hide counter (but do not reset it)
      dojo.addClass(this.itemAddedNode, "lotusHidden");
   },

   _incAddedItemCount: function() {
      // summary: Function invoked when ADD_WIDGET_EVENT is publish.
      //      Update counter and refresh display
      this._itemAddedCount++;

      if (this._itemAddedCount > 0) {
         dojo.addClass(this.itemAddedNode, "lotusAdded");
      } else {
         dojo.removeClass(this.itemAddedNode, "lotusAdded");
      }

      if (this._itemAddedCount == 1)
         this.itemAddedTextHolder.innerHTML = this._resourceBundle.ITEM_ADDED_ONE;
      else
         this.itemAddedTextHolder.innerHTML = dojo.string.substitute(this._resourceBundle.ITEM_ADDED_MANY, [this._itemAddedCount]);
   },

   _resetItemCount: function() {
      // summary: Function invoked when RESET_COUNTER_EVENT is published.
      //      Set counter of added items to 0 and refresh display
      dojo.removeClass(this.itemAddedNode, "lotusAdded");
      
      this.itemAddedTextHolder.innerHTML = this._resourceBundle.ITEM_ADDED_NONE;
   },

   incCounter: function() {
      // summary: give the possibility to embedding env to inc the counter
      this._incAddedItemCount();
   },

   enabledAutoCounter: function() {
      this._addWidgetTopic = dojo.subscribe(this.ADD_WIDGET_EVENT, dojo.hitch(this, "_incAddedItemCount"));
   },

   disabledAutoCounter: function() {
      if (this._addWidgetTopic != null) {
         dojo.unsubscribe(this._addWidgetTopic);
      }
   },

   destroy: function() {
      // summary: overriden. Clean up handlers
      dojo.forEach(this._topics, function(topic) {
         dojo.unsubscribe(topic);
      });

      this._contentArea.destroy();
      this.inherited("destroy", arguments);
   }
});