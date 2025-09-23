/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.palette.ChangeLayoutContentPanel");

dojo.require("lconn.core.paletteOneUI.PaletteContentPanel");
dojo.require("lconn.core.palette.ChangeLayoutButton");

dojo.requireLocalization("lconn.core.palette", "ChangeLayoutContentPanel");

// We just need to change one CSS class in the template (lotusLargeWidgets) to make the button look larger

dojo.declare(// widget name and class
"lconn.core.palette.ChangeLayoutContentPanel", // superclass
[lconn.core.paletteOneUI.PaletteContentPanel], // properties and methods
{    
   templateString: null,
   templatePath: dojo.moduleUrl("lconn.core", "palette/templates/ChangeLayoutContentPanel.html"),

   navLegendImgNode: null,

   postMixInProperties: function() {
      this.inherited("postMixInProperties", arguments);
      var newResourceBundle = dojo.i18n.getLocalization("lconn.core.palette", "ChangeLayoutContentPanel");
      dojo.mixin(this._resourceBundle, newResourceBundle);
   },
   
   postCreate: function() {
      // summary: post create initialization
      this.inherited("postCreate", arguments);
      if ( this.navLegendImgNode ) {
         var navLegendImgUrl = dojo.moduleUrl('lconn.core.palette', 'images/nav_Legend.png');
         dojo.attr(this.navLegendImgNode, "src", navLegendImgUrl);
      }
   },
   
   _togglePagingButtons: function(){
      // Overriden to always hide the pager. It does not make sense in the content of switch buttons
      dojo.addClass(this.pagerNode, "lotusHidden");		
   },

   _addPaletteButton: function(widgetItem, enabled){
      // summary: add a button representing a widget to the content area		

      var imageRoot = this.imageContextRoot;
      var button = new lconn.core.palette.ChangeLayoutButton({
         widgetItem: widgetItem,
         imageContextRoot: imageRoot,
         initialStatus: enabled
      });
      this.addChild(button);
   }
});
