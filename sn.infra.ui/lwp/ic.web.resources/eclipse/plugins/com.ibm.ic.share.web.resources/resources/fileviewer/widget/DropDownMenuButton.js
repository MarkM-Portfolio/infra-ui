/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",    
  "dijit/Toolbar",
  "dijit/form/DropDownButton",
  "dijit/MenuItem",
  "dijit/DropDownMenu",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-attr",
  "dojo/query"
], function (declare, Toolbar, DropDownButton, MenuItem, DropDownMenu, array, lang, i18n, domAttr, query) {
  
  var DropDownMenuButton = declare([Toolbar], {
    _subMenu: null,
    _popupMenu: null,
    _items: [],
    _menuItems: [],
    _currentItemGroupId: 0,
    _currentItemGroupItemCount: 0,

    constructor: function (opts) {
      opts = opts || {};
       
      var subMenuOpts = opts.subMenu || {};
      subMenuOpts.className = "lconnContentTitleDropdownBody ics-viewer-dropdown-menu " + (subMenuOpts.className || "");

      this.nls = opts.nls || {};
      this.showLabel = opts.showLabel;
      this._subMenu = new DropDownMenu(subMenuOpts);
      this._items = opts.items || [];
      this._menuItems = [];
    },
    
    postCreate: function () {
      this.addMenuItems(this._items);
      this.domNode.setAttribute("aria-labelledby", this.id);
      this.title = this.nls.TITLE;
      this._setupPopupMenu();
      this.inherited(arguments);
      this._removeToolbarRole();
    },
    
    _removeToolbarRole: function() {
       domAttr.remove(this.containerNode, "role");
       var buttonValueNode = query(".dijitOffScreen", this.domNode);
       buttonValueNode.removeAttr("role");
    },

    _setupPopupMenu: function () {
      if (this._popupMenu) {
        this._popupMenu.destroy();
      }

      this._popupMenu = new DropDownButton({
        label: this.title,
        showLabel: this.showLabel,
        iconClass: this.getIconClassName(),
        dropDown: this._subMenu,
        _aroundNode: this._submenuAroundNode
      });

      lang.getObject("_subMenu.domNode.style", true, this).marginTop = this.subMenuMarginTop || '8px';

      this.setDropDownButtonTitle();
      this.addChild(this._popupMenu);
    },

    togglePopupMenu: function() {
       if (this._popupMenu) {
          this._popupMenu.toggleDropDown();
       }
    },

    setDropDownButtonTitle: function() {},
    
    addMenuItem: function (item, callback, menuItemArgs) {
      var menuItem = new MenuItem(lang.mixin(menuItemArgs, {
        label: item.name || item.title || item.itemShortDesc,
        title: item.title || "",
        action: item
      }));
      var itemGroupId = item.groupId;
      if (callback) {
        menuItem.onClick = callback;
      }
      if (lang.isFunction(item.watch)) {
        item.watch("name", function (name, oldValue, value) {
          menuItem.set("label", value);
          menuItem.set("title", item.title);
        });
      }
      this._addMenuItemToSubMenu(menuItem);
      this._currentItemGroupItemCount++;
    },
    
    _addMenuItemToSubMenu: function (item) {
      this._subMenu.addChild(item);
      this._menuItems.push(item);
    },
    
    _removeMenuItemsFromSubMenu: function () {
       for (var i=0; i<this._menuItems.length; i++) {
          this._subMenu.removeChild(this._menuItems[i]);
       }
       this._menuItems.splice(0, this._menuItems.length);
     },
    
   addMenuItems: function (items) {
      array.forEach(items, function (item) {
        this.addMenuItem(item);
      }, this);
    },

    getClassName: function (args) {
      return "dropdown-menu";
    },
    getIconClassName: function (args) {
      return this.getClassName() + "-icon";
    },

    setSubmenuAroundNode: function (node) {
       this._popupMenu._aroundNode = node;
       this._submenuAroundNode = node;
    }
  }); 

  return DropDownMenuButton;
});