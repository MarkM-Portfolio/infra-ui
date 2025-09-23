/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.HelpLauncher");
dojo.require("lconn.core.widget.MenuLauncher");
dojo.require("lconn.share.require");

dojo.declare("lconn.share.widget.HelpLauncher", lconn.core.widget.MenuLauncher, {
   openDelay: 250,
   hideDelay: 400,
   orient: {'TR':'TL', 'TL':'TR', 'BR':'BL', 'BL':'BR'},
   orientRTL: {'TL':'TR', 'TR':'TL', 'BL':'BR', 'BR':'BL'},
   _initMenu: function() {
      return lconn.share.requireAsync("lconn.share.widget.tooltip.HelpText").addCallback(this, function() {
         this.menu = new lconn.share.widget.tooltip.HelpText(dojo.mixin({id: this.menuId},this.optMenu));
         this.menu.containerNode.parentNode.style.border = "0px";
      });
   },
   
   onOpen: function(){
      this.inherited(arguments);
      //ensures the alert actually gets read
      this.menu.containerNode.appendChild(document.createTextNode(""));
   }
});
