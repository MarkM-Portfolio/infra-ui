/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

define([
      'dojo/_base/declare',
      'dojo/_base/lang',
      'dojo/dom-class',
      'dojo/dom-attr',
      '../paletteOneUI/PaletteContentPanel',
      './ChangeLayoutButton',
      'dojo/text!./templates/ChangeLayoutContentPanel.html',
      'dojo/i18n!./nls/ChangeLayoutContentPanel',
      '../theme'
], function(declare, lang, domClass, domAttr, PaletteContentPanel, ChangeLayoutButton, template, i18nchangeLayoutContentPanel,theme) {

   // We just need to change one CSS class in the template (lotusLargeWidgets)
   // to make the button look larger
   var ChangeLayoutContentPanel = declare(

   // widget name and class
   "lconn.core.palette.ChangeLayoutContentPanel",

   // superclass
   [ PaletteContentPanel
   ],

   // properties and methods
   {
      templateString : template,

      postMixInProperties : function() {
         this.inherited("postMixInProperties", arguments);
         lang.mixin(this._resourceBundle, i18nchangeLayoutContentPanel);
      },

      postCreate : function() {
         // summary: post create initialization
         this.inherited("postCreate", arguments);
         //gatekeeper: communities-new-widget-layouts
     	 var is_communities_new_widget_layouts = false;
     	 if ( typeof gatekeeperConfig != "undefined" && gatekeeperConfig['communities-new-widget-layouts'] )
     	 	 is_communities_new_widget_layouts = true;
         var isHikari = theme.isHikariTheme();
		 
     	 if( is_communities_new_widget_layouts && isHikari){
     		 if (this.navLegendImgNode) {
                var navLegendImgUrl = require.toUrl('ic-core/palette/images/nav_Legend.png');
                domAttr.set(this.navLegendImgNode, "src", navLegendImgUrl);
                domClass.add(this.legendNodeOldLayout, "lotusHidden");
             }
     	 }else{
     		if (this.navLegendImgNodeOldLayout) {
                var navLegendImgUrl = require.toUrl('ic-core/palette/images/nav_Legend.png');
                domAttr.set(this.navLegendImgNodeOldLayout, "src", navLegendImgUrl);
                domClass.add(this.legendNode, "lotusHidden");
             }
     	 }

      },

      _togglePagingButtons : function() {
         // Overriden to always hide the pager. It does not make sense in the
         // content of switch buttons
         domClass.add(this.pagerNode, "lotusHidden");
      },

      _addPaletteButton : function(widgetItem, enabled) {
         // summary: add a button representing a widget to the content area

         var imageRoot = this.imageContextRoot;
         var button = new ChangeLayoutButton({
            widgetItem : widgetItem,
            imageContextRoot : imageRoot,
            initialStatus : enabled
         });
         this.addChild(button);
      }
   });

   return ChangeLayoutContentPanel;
});
