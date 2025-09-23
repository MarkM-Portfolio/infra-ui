define([
	"dojo",
	"dojo/dom-class",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/_base/window",
	"dojo/dom-attr",
	"dojo/i18n!ic-core/paletteOneUI/nls/Palette",
	"dojo/dom",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/on",
	"dojo/query",
	"dojo/topic",
	"dojo/string",
	"dojo/text!ic-core/paletteOneUI/templates/Palette.html",
	"dijit/_Container",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/aria/TabPanel",
	"ic-core/paletteOneUI/AddContentPane",
	"ic-core/paletteOneUI/PaletteContentPanel",
	"ic-core/paletteOneUI/PaletteDataStoreBuilder",
	"ic-core/paletteOneUI/PaletteList"
], function (dojo, domClass, declare, i18n, windowModule, domAttr, i18nPalette,
   dom, array, lang, on, query, topic, string, template, _Container, _Templated,
   _Widget, TabPanel, AddContentPane, PaletteContentPanel,
   PaletteDataStoreBuilder, PaletteList) {

	/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

	var Palette = declare(
	// widget name and class
	"lconn.core.paletteOneUI.Palette",

	// superclass
	[_Widget, _Templated, _Container],
	
	// properties and methods
	{
	   // summary: Widget palette. See https://w3.tap.ibm.com/w3ki/display/conndev/Widget+palette+in+2.5
	
	   // ADD_WIDGET_EVENT: Const String
	   //      Name of the event published when the use clicks the "Add Widget to Page" button
	   ADD_WIDGET_EVENT: "/ic-core/palette/addWidget",
	
	   // CLOSE_PALETTE_EVENT: Const String
	   //      Name of the event published when the use clicks the "Close Palette" button
	   CLOSE_PALETTE_EVENT: "/ic-core/palette/closePalette",
	
	   // RESET_COUNTER: Const String
	   //      Name of the event published when the palette should reset the number of added items
	   RESET_COUNTER_EVENT: "ic-core/palette/resetCounter",
	
	   // RECHECK_CAN_ADD_HANDLER_EVENT: Const String
	   //      Name of the event listened to by the palette
	   //      canAddHandler is checked automatically after:
	   //            - the user selects a widget in the tree
	   //            - the user adds a widget to the page
	   //      
	   //      Publishing RECHECK_CAN_ADD_HANDLER_EVENT allows the embedding environment to signal 
	   //      that the canAddHandler should be recheck at other times
	   RECHECK_CAN_ADD_WIDGET_HANDLER_EVENT: "/ic-core/palette/recheck",
	
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

	   templateString: template,
	
	   postMixInProperties: function() {
	      this._resourceBundle = i18nPalette;
	      this.itemAddedStr = this._resourceBundle.ITEM_ADDED_NONE;
	      this.modalTitleStr = this._resourceBundle.ADD_CONTENT;
	   },
	
	   postCreate: function() {
	      this.inherited("postCreate", arguments);
	      this._tabPanels = [];

	      this._registerDefaultPanel();

	      this.closeImageNode.src = this._blankGif;
	      this.closeImageNode.className = "otherFramework16 otherFramework16-CloseHover14";
	
	      this._topics.push(topic.subscribe(PaletteList.prototype.CATEGORY_SELECTED_EVENT, lang.hitch(this, "_handleEventsControler", "category")));
	      this._topics.push(topic.subscribe(this.RECHECK_CAN_ADD_WIDGET_HANDLER_EVENT, lang.hitch(this, "_handleEventsControler", "recheck")));
	      this._topics.push(topic.subscribe(this.RESET_COUNTER_EVENT, lang.hitch(this, "_resetItemCount")));

	      domAttr.set(this.domNode, "aria-label", this._resourceBundle.DESC);
	   },
	
	   _registerDefaultPanel: function() {
	      // summary: add default widget panel
	      var imageRoot = this.imageContextRoot;
	
	      this._contentArea = new AddContentPane({
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
	
	         if (widget instanceof AddContentPane) {
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
						// console.log("***** Set focus to selected tab: "+menuEntry.id);
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
		    	  topic.publish(this.CLOSE_PALETTE_EVENT);
		    	  dijit.byId("app_palette_dialog_modal").hide();
			  }
			  else
			  {
			      topic.publish(this.CLOSE_PALETTE_EVENT);
			      evt.preventDefault(), evt.stopPropagation();
			  }
		      // COMMUNITY-170 : Communities URL isn't correctly updated after adding an when Highlights is the default landing page
		      // remove '&contextAction=customize' from URL
		    
		      location.href=location.href.replace('&contextAction=customize','');
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
	            domClass.add(headerNode, "lotusSelected");
	            this._currentTab = headerNode;
	         }

	         // Attach the ARIA toolbar helper
	         this._tabBar = new TabPanel(this.tabsContainerNode);

	         // Initialize ARIA tabpanel roles
			 dojo.attr(widget.containerNode, {"role":"tabpanel", "aria-labelledby":id+"Link"});
	      }
	   },

	   // Build a tab in the tablist.
	   _buildTabHeaderNode: function( /* String */ id, /* String */ name, /* Boolean */ isSelected, /* String */ ariaControls) {
	      var liElem = windowModule.doc.createElement("li");

	      // Create the List element
	      if (isSelected)
	      	 dojo.attr(liElem, {"role":"tab","tabindex":"0","aria-selected":"true","aria-controls":ariaControls});

	      else {
			 dojo.attr(liElem, {"role":"tab","tabindex":"-1","aria-selected":"false","aria-controls":ariaControls});
	  	  }
	      liElem.id = id;

		  // Enable keyboard and click handlers
	      on(liElem, "keydown", lang.hitch(this, "_handleKeyEvent", id));
	      on(liElem, "click", lang.hitch(this, "_switchToTab", id));

	      // Create the Anchor tag
	      liElem.innerHTML = "<a href='javascript:;' id='" + id + "Link' tabindex='-1'>" + "<strong>" + name + "</strong></a>";
	      return liElem;
	   },

       // Activate the current tab when enter or space is pressed
       _handleKeyEvent: function( /* String id */ id, /* DOMNode */ evt) {
	      if (id && lang.isString(id) && evt) {
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
	      if (!id || !lang.isString(id)) {
	         return;
	      }

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

	      array.forEach(contentWidgets, lang.hitch(this, function(widget) {
	         this.removeChild(widget);
	      }));

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
	      domClass.remove(this.itemAddedNode, "lotusHidden");
	   },
	
	   disableItemCounter: function() {
	      // summary: hide counter (but do not reset it)
	      domClass.add(this.itemAddedNode, "lotusHidden");
	   },
	
	   _incAddedItemCount: function() {
	      // summary: Function invoked when ADD_WIDGET_EVENT is publish.
	      //      Update counter and refresh display
	      this._itemAddedCount++;
	
	      if (this._itemAddedCount > 0) {
	         domClass.add(this.itemAddedNode, "lotusAdded");
	      } else {
	         domClass.remove(this.itemAddedNode, "lotusAdded");
	      }
	
	      if (this._itemAddedCount == 1)
	         this.itemAddedTextHolder.innerHTML = this._resourceBundle.ITEM_ADDED_ONE;
	      else
	         this.itemAddedTextHolder.innerHTML = string.substitute(this._resourceBundle.ITEM_ADDED_MANY, [this._itemAddedCount]);
	   },
	
	   _resetItemCount: function() {
	      // summary: Function invoked when RESET_COUNTER_EVENT is published.
	      //      Set counter of added items to 0 and refresh display
	      domClass.remove(this.itemAddedNode, "lotusAdded");
	      
	      this.itemAddedTextHolder.innerHTML = this._resourceBundle.ITEM_ADDED_NONE;
	   },
	
	   incCounter: function() {
	      // summary: give the possibility to embedding env to inc the counter
	      this._incAddedItemCount();
	   },
	
	   enabledAutoCounter: function() {
	      this._addWidgetTopic = topic.subscribe(this.ADD_WIDGET_EVENT, lang.hitch(this, "_incAddedItemCount"));
	   },
	
	   disabledAutoCounter: function() {
	      if (this._addWidgetTopic != null) {
	         this._addWidgetTopic.remove();
	      }
	   },
	
	   destroy: function() {
	      // summary: overriden. Clean up handlers
	      array.forEach(this._topics, function(topic) {
	         topic.remove();
	      });
	
	      this._contentArea.destroy();
	      this.inherited("destroy", arguments);
	   }
	});
	
	return Palette;
});