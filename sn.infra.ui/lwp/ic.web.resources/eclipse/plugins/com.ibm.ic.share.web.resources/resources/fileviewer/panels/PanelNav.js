/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/PanelNavText.html",
   "dojo/text!./templates/PanelNav.html",
   "dojo/text!./templates/NavItem.html",
   "dojo/text!./templates/NavItemText.html",
   "dojo/_base/array",
   "dojo/_base/config",
   "dojo/on",
   "dojo/dom-construct",
   "dojo/dom-class",
   "dojo/_base/lang",
   "dojo/query",
   "./factories",
   "../config/globals",
   "dojo/topic",
   "dojo/has",
   "dojox/collections/Dictionary",
   "dojo/dom-attr",
   "dojo/keys",
   "../uiState",
   "../widget/DropDownMenuButton",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/dom-style",
   "../util/text",
   "dojo/html",
   "../util/fidoNewRelic",
   "../util/feature",
   "dojo/sniff"
], function (declare, _WidgetBase, _TemplatedMixin, panelTemplateText, panelTemplate, navTemplate, navTextTemplate,
   array, config, on, domConstruct, domClass, lang, query, factories, globals, topic, has, Dictionary, domAttr, keys,
   uiState, DropDownMenuButton, i18n, domStyle, textUtil, html, fidoNewRelic, feature) {

   var selectPanelHandle,
      PANEL_TITLE_BREAK_LENGTH = 18;

   if (has("safari") < 8) {
      domClass.remove(document.documentElement, "fileviewer-panels-resize fileviewer-panels-textnav");
   }

   var NavItem = declare([ _WidgetBase, _TemplatedMixin ], {
      refreshPanel: false,
      templateString: feature.isTextNavEnabled() ? navTextTemplate : navTemplate,

      postMixInProperties: function () {
         this.blank = config.blankGif || dijit._WidgetBase.prototype._blankGif;
         this.itemId = this.factory.get("id");
         this.urlParameterId = this.factory.get("urlParameterId");
         this.id = this.factory.get("id");
         this.itemShortDesc = this.factory.get("title") || "";
      },

      postCreate: function () {
         this.refreshHandle = topic.subscribe("ic-fileviewer/refresh", lang.hitch(this, function () {
            this.refreshPanel = true;
         }));

         this._setTitle();
         this._titleChangeHandle = this.factory.watch("title", lang.hitch(this, "_setTitle"));
      },

      select: function () {
         fidoNewRelic.track("panelSelect", {"newPanel": this.itemId});
         this.selectPanel(this);
      },

      getPanel: function (refreshPanel) {
         if (this._panel && (this.refreshPanel || refreshPanel)) {
            this.refreshPanel = false;
            domConstruct.destroy(this._panel.domNode);
            this._panel.destroy();
            delete this._panel;
         }
         if (!this._panel) {
            this._panel = this.factory.get("panel");
            this._panel.placeAt(this.panelContainer);
            this._panel.startup();
         }

         return this._panel;
      },

      destroy: function () {
         this.refreshHandle.remove();
         this._titleChangeHandle.remove();
         this.inherited(arguments);
      },

      _setTitle: function () {
         var newTitle = this.factory.get("title");
         var titleBroken = false;

         if (newTitle.length > PANEL_TITLE_BREAK_LENGTH) {
            var brokenString = textUtil.breakString(newTitle);

            if (brokenString !== newTitle) {
               newTitle = brokenString;
               titleBroken = true;
            }
         }

         if (this.anchor) {
            html.set(this.anchor, newTitle);

            if (titleBroken) {
               domClass.add(this.anchor, "wrapped");
            } else {
               domClass.remove(this.anchor, "wrapped");
            }

            this.emit("titlechanged");
         }
      }
   });

   return declare([ _WidgetBase, _TemplatedMixin ], {
      templateString: feature.isTextNavEnabled() ? panelTemplateText : panelTemplate,

      postCreate: function () {
         var navItem;
         this._factories = {};
         this._selected = null;
         this.refreshPanel = false;

         this.navItems = new Dictionary();

         if(selectPanelHandle) {
            selectPanelHandle.remove();
         }

         selectPanelHandle = topic.subscribe("ic-fileviewer/selectpanel", lang.hitch(this, function () {
            if (uiState.get("panelSize") === window.VIEWER_PANELS_CLOSED_SIZE) {
               uiState.set("panelSize", window.VIEWER_PANELS_MINIMUM_SIZE || 385);
            }

            array.forEach(arguments, lang.hitch(this, function(actions){
               var navItemId = actions[0];
               this.selectPanel(this.navItems.entry(navItemId).value);
               if(actions.length > 1) {
                  topic.publish("ic-fileviewer/panel/"+navItemId, actions.slice(1));
               }
            }));
         }));

         domConstruct.empty(this.container);
         this.panelsArray = [];
         var panelIndex = 0,
         selectedId;
         array.forEach(factories, function (Factory) {
            var instance = new Factory({ file: this.file });
            this._factories[instance.get("id")] = instance;

            var navItem = new NavItem({ factory: instance, selectPanel: lang.hitch(this, this.selectPanel), panelContainer: this.container });
            navItem.placeAt(this.tabList);
            navItem.startup();

            navItem.on("titlechanged", lang.hitch(this, "_insertMoreButton"));

            navItem.panelIndex = panelIndex;
            this.panelsArray.push(navItem);
            panelIndex ++ ;
            var associatedPanel = navItem.getPanel().domNode;
            associatedPanel.setAttribute("aria-labelledby", navItem.itemId);
            domClass.add(associatedPanel, "lotusHidden");

            this.navItems.add(navItem.itemId, navItem);

            if (this.panelUrlParameterId && navItem.urlParameterId === this.panelUrlParameterId) {
               selectedId = navItem.itemId;
            }
         }, this);

         this.refreshHandle = topic.subscribe("ic-fileviewer/refresh", lang.hitch(this, function () {
            navItem = this._selected;
            this.refreshPanel = true;
            this._selected = null;
            this.selectPanel(navItem);
         }));


         this.selectPanel(this.navItems.item(selectedId || globals.selectedId || "comments"));

         this._listenForKeys(this.panelsArray);
         if(feature.isTextNavEnabled()){
            this.panelWatch = uiState.watch("panelSize", lang.hitch(this, function () {
               setTimeout(lang.hitch(this, this._insertMoreButton), 1);
            }));
         }
      },

      startup: function() {
         this.inherited(arguments);
         var nls = i18n.MORE_ACTIONS.PANELS;
         if (!i18n.MORE_ACTIONS.PANELS) {
            nls = {
                   TITLE: "More",
                   A11Y: "Opens a drop-down menu with a list of hidden panels"
            };
         } else {
            nls.TITLE = textUtil.breakString(nls.TITLE);
         }
         this.dropDownMenuButton = new DropDownMenuButton({
            nls: nls,
            showLabel: true,
            subMenuMarginTop: '16px'
         });
         this._listenKeysOnMoreButton();
         setTimeout(lang.hitch(this, this._insertMoreButton), 1);
         setTimeout(lang.hitch(this, this._insertMoreButton), 1000); // In case the DOM isn't ready when loading FiDO directly
      },

      _insertMoreButton: function() {
         var visibleWithMoreButton, resize = true;
         if (this._getNumVisibleEntries(resize) < this.panelsArray.length && uiState.get("panelSize") > window.VIEWER_PANELS_CLOSED_SIZE) {
            this.dropDownMenuButton.placeAt(this.moreButton);
            domClass.remove(this.moreButton, "moreButtonHide");
            this._resizeTabsWidth();
            visibleWithMoreButton = this._getNumVisibleEntries();
            this._populateDropDownMenu(visibleWithMoreButton);
            if (dojo.isIE) {domClass.add(this.moreButton, "moreButtonDisplayIE")} else {domClass.add(this.moreButton, "moreButtonDisplay");}
         } else {
            domClass.add(this.moreButton, "moreButtonHide");
         }
         this._selectMoreButton();
      },

      _populateDropDownMenu: function(visibleTabs) {
         var totalTabs = this.panelsArray.length;
         this.dropDownMenuButton._removeMenuItemsFromSubMenu();
         var hiddenTabs = totalTabs - visibleTabs;
         for (var i = visibleTabs; i < totalTabs; i++) {
            this.dropDownMenuButton.addMenuItem(this.panelsArray[i], lang.hitch(this.panelsArray[i], this.panelsArray[i].select));
         }
      },

      _resizeTabsWidth: function() {
         var moreButtonWidth = this.moreButton.offsetWidth + domStyle.get(this.moreButton, "margin-left") + domStyle.get(this.moreButton, "margin-right") ;
         var newTabsWidth = this.panelNavDiv.offsetWidth - moreButtonWidth;
         this.tabsTableDiv.style.width = newTabsWidth + "px";
      },

      _getNumVisibleEntries: function(resize){
         if(this.panelsArray.length === 0){
            return 0;
         }
         if (resize) {
            this.tabsTableDiv.style.width = this.panelNavDiv.offsetWidth + "px";
         }

         var firstRowOffset = this.panelsArray[0].domNode.offsetTop;
         var visibleEntries = 1;
         for(var j = 1; j < this.panelsArray.length; j++){
            if(firstRowOffset !== this.panelsArray[j].domNode.offsetTop){
               return visibleEntries;
            }
            visibleEntries++;
         }
         return visibleEntries;
      },

      _selectMoreButton: function() {
         if (!this.moreButton) {
            return;
         }

         if (this._getNumVisibleEntries() <= this._selected.panelIndex) {
            domClass.add(this.moreButton, "select");
            this._selected.domNode.tabIndex = -1;
         } else {
            domClass.remove(this.moreButton, "select");
            this._adjustTabindex();
         }
      },

      _adjustTabindex: function() {
         var visibleTabsCount = this._getNumVisibleEntries();
         if (this._selected.panelIndex < visibleTabsCount || visibleTabsCount == this.panelsArray.length) {
            this._selected.domNode.tabIndex = 0;
         }
      },

      _listenForKeys: function(panelsArray) {
         on(this.domNode, "keydown", lang.hitch(this, function(evt) {

            switch (evt.keyCode) {
               case keys.RIGHT_ARROW:
               case keys.LEFT_ARROW:
               case keys.DOWN_ARROW:
               case keys.UP_ARROW:
                  evt.stopPropagation();
                  evt.preventDefault();
                  this._switchTab(evt);
                  break;
            }
         }));
      },
      _listenKeysOnMoreButton: function() {
         var moreButton = query(".dijitDownArrowButton", this.dropDownMenuButton.domNode)[0];
         on(moreButton, "keydown", lang.hitch(this, function(evt) {
            if (evt.keyCode == keys.TAB && evt.shiftKey) {
               if (this._getNumVisibleEntries() <= this._selected.panelIndex) {
                  evt.stopPropagation();
                  evt.preventDefault();
                  this._switchTab(evt, moreButton);
               }
            }
         }));
      },

      _switchTab: function(evt, moreButton) {

         var nextTabIndex, currentTabIndex, lastSelectedElement;
         var lastVisibleIndex = this._getNumVisibleEntries() - 1;

         if (evt.keyCode == keys.TAB && evt.shiftKey) {
            nextTabIndex = 0;

         } else {
            var currentTab = array.filter(this.panelsArray, function(item) {
               return item.itemId == evt.target.id;
            });
            currentTabIndex = currentTab[0].panelIndex;

            if(evt.keyCode == keys.RIGHT_ARROW || evt.keyCode == keys.DOWN_ARROW){
               nextTabIndex = (currentTabIndex == this.panelsArray.length-1) ?  0 : currentTabIndex+1;
            }
            if(evt.keyCode == keys.LEFT_ARROW || evt.keyCode == keys.UP_ARROW) {
               nextTabIndex = (currentTabIndex == 0) ?  this.panelsArray.length-1 : currentTabIndex-1;
            }

            if (nextTabIndex > lastVisibleIndex) {
               if(currentTabIndex == 0) {
                  nextTabIndex = lastVisibleIndex;
               } else {
                  nextTabIndex = 0;
               }
            }
         }

         this.selectPanel(this.panelsArray[nextTabIndex]);

         if (currentTabIndex == undefined) {
            lastSelectedElement = moreButton;
         } else {
            lastSelectedElement = this._getPanelLink(currentTabIndex, this.panelsArray);
         }

         lastSelectedElement.blur();
         var nextPanel = this._getPanelLink(nextTabIndex, this.panelsArray);
         nextPanel.focus();
         this._hidePanels(nextTabIndex, this.panelsArray);
      },

      _getPanelLink: function(index, panelsArray) {
         return panelsArray[index].domNode;
      },

      _hidePanels: function(nextTabIndex, panelsArray) {
         array.forEach(panelsArray,function(item, i){
            if (i != nextTabIndex) {
               var tabElement = this._getPanelLink(i, panelsArray);
               tabElement.tabIndex = -1;
               tabElement.setAttribute("aria-selected", "false");
            }
         }, this);
      },

      selectPanel: function (navItem) {
         var id = navItem.itemId,
         selectedNode,
         currentPanel;

         if (!this._factories[id] || navItem === this._selected) {
            return;
         } else if (this._selected !== null){
            domClass.remove(this._selected.domNode, "selected");
         }

         domClass.add(navItem.domNode, "selected");

         if (this._selected) {
            domClass.add(this._selected.getPanel().domNode, "lotusHidden");
         }

         this._selected = navItem;

         currentPanel = this._selected.getPanel(this.refreshPanel);
         domClass.remove(currentPanel.domNode, "lotusHidden");
         currentPanel.render();

         globals.selectedId = this._selected.itemId;

         var tabElement = navItem.domNode;
         tabElement.setAttribute("aria-selected", "true");
         tabElement.tabIndex = 0;
         var associatedPanel = this._selected.getPanel().domNode;
         associatedPanel.setAttribute("aria-labelledby", this._selected.itemId);

         this.refreshPanel = false;

         var currentTab = array.filter(this.panelsArray, function(item) {
            return item.itemId == id;
         });
         var currentTabIndex = currentTab[0].panelIndex;

         this._hidePanels(currentTabIndex, this.panelsArray);

         this._selectMoreButton();
         
         fidoNewRelic.setPanel(id);
         
         if (id == "comments") {
            topic.publish("ic-fileviewer/selectpanel", ["comments"]);
         }

      },

      destroy: function () {
         this.refreshHandle.remove();
         this.inherited(arguments);
         if(feature.isTextNavEnabled()){
            this.panelWatch.remove();
         }
      }
   });
});
