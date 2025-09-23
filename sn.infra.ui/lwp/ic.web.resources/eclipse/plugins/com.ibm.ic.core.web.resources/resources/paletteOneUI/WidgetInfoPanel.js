define([
	"dojo",
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/i18n",
	"dojo/i18n!ic-core/paletteOneUI/nls/WidgetInfoPanel",
	"dojo/text!ic-core/paletteOneUI/templates/WidgetInfoPanel.html",
	"dijit/_Container",
	"dijit/_Templated",
	"dijit/_Widget"
], function (dojo, declare, domClass, i18n, i18nWidgetInfoPanel, template, _Container, _Templated, _Widget) {

	/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
	
	// FIXME: in Dojo 1.3, properties of DataStore items are no longer scalar values, but arrays.
	// The paletteOneUI code makes the assumption that properties are scalar values. This code must
	// be entirely refactored.
	
	var WidgetInfoPanel = declare(
	// widget name and class
	"lconn.core.paletteOneUI.WidgetInfoPanel",
	
	// superclass
	[_Widget, _Templated, _Container],
	
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
	
	   templateString: template,
	
	   postMixInProperties: function() {
	      this._resourceBundle = i18nWidgetInfoPanel;
	   },
	
	   postCreate: function() {
	      this.inherited("postCreate", arguments);
	
	      // FIXME: sprite
	      // init image
	      this.paletteLogoNode.src = require.toUrl("ic-core/paletteOneUI/images/iconPalette.gif");
	
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
	      domClass.remove(this.welcomeModeNode, "lotusHidden");
	      domClass.add(this.categoryInfoPanelNode, "lotusHidden");
	      domClass.add(this.widgetInfoPanelNode, "lotusHidden");
	   },
	
	   switchToWidgetInfoMode: function() {
	      // summary: Hide "welcome mode" and display widget info panel (ie: information panel)
	      domClass.remove(this.widgetInfoPanelNode, "lotusHidden");
	      domClass.add(this.categoryInfoPanelNode, "lotusHidden");
	      domClass.add(this.welcomeModeNode, "lotusHidden");
	   },
	
	   switchToCategoryInfoMode: function() {
	      // summary: Hide "welcome mode" and display widget info panel (ie: information panel)
	      domClass.remove(this.categoryInfoPanelNode, "lotusHidden");
	      domClass.add(this.widgetInfoPanelNode, "lotusHidden");
	      domClass.add(this.welcomeModeNode, "lotusHidden");
	   }
	});
	
	return WidgetInfoPanel;
});
