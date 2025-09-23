/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.paletteOneUI.WidgetInfoPanel");

// FIXME: in Dojo 1.3, properties of DataStore items are no longer scalar values, but arrays.
// The paletteOneUI code makes the assumption that properties are scalar values. This code must
// be entirely refactored.

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");

dojo.requireLocalization("lconn.core.paletteOneUI", "WidgetInfoPanel");

dojo.declare(
// widget name and class
"lconn.core.paletteOneUI.WidgetInfoPanel",

// superclass
[dijit._Widget, dijit._Templated, dijit._Container],

// properties and methods
{
   // summary: Simple panel dispaying the information about a given widget      

   // _resourceBundle: JSON Object
   //      Object holding the externilized strings
   _resourceBundle: null,

   // *Node: Dom Node
   //      Dojo attach points (see template file)
   titleNode: null,
   descNode: null,
   layoutImgNode: null,
   previewImgNode: null,
   welcomeModeNode: null,
   widgetInfoPanelNode: null,
   categoryTitleNode: null,
   paletteLogoNode: null,

   templatePath: dojo.moduleUrl("lconn.core", "paletteOneUI/templates/WidgetInfoPanel.html"),

   postMixInProperties: function() {
      this._resourceBundle = dojo.i18n.getLocalization("lconn.core.paletteOneUI", "WidgetInfoPanel");
   },

   postCreate: function() {
      this.inherited("postCreate", arguments);

      // FIXME: sprite
      // init image
      this.paletteLogoNode.src = dojo.moduleUrl("lconn.core", "paletteOneUI/images/iconPalette.gif");

      // default mode
      this.switchToWelcomeMode();
   },

   setTitle: function( /* String */ title) {
      this.titleNode.innerHTML = title;
   },

   setCategoryTitle: function( /* String */ title) {
      this.categoryTitleNode.innerHTML = title;
   },

   setDesc: function( /* String */ desc) {
      this.descNode.innerHTML = desc;
   },

   setLayoutImgUrl: function( /* String */ url) {
      this.layoutImgNode.src = url;
   },

   setPreviewImgUrl: function( /* String */ url) {
      this.previewImgNode.src = url;
   },

   switchToWelcomeMode: function() {
      // summary: Hide widget info and display "welcome mode"(ie: information panel)
      dojo.removeClass(this.welcomeModeNode, "lotusHidden");
      dojo.addClass(this.categoryInfoPanelNode, "lotusHidden");
      dojo.addClass(this.widgetInfoPanelNode, "lotusHidden");
   },

   switchToWidgetInfoMode: function() {
      // summary: Hide "welcome mode" and display widget info panel (ie: information panel)
      dojo.removeClass(this.widgetInfoPanelNode, "lotusHidden");
      dojo.addClass(this.categoryInfoPanelNode, "lotusHidden");
      dojo.addClass(this.welcomeModeNode, "lotusHidden");
   },

   switchToCategoryInfoMode: function() {
      // summary: Hide "welcome mode" and display widget info panel (ie: information panel)
      dojo.removeClass(this.categoryInfoPanelNode, "lotusHidden");
      dojo.addClass(this.widgetInfoPanelNode, "lotusHidden");
      dojo.addClass(this.welcomeModeNode, "lotusHidden");
   }
});
