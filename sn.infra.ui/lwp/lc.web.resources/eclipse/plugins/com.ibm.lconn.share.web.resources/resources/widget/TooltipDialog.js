/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.TooltipDialog");
dojo.require("dijit.Dialog");

dojo.declare("lconn.share.widget.TooltipDialog", dijit.TooltipDialog, {
   /** When a link in the tooltip is clicked, close the dialog */
   closeOnLinkClick: true,
   _attachTemplateNodes: function() {
      this.inherited(arguments);
      // connect the hover events so that hide/show can also apply when the user mouses over the popup 
      this.connect(this.domNode, "onmouseover", "onMouseOver");
      this.connect(this.domNode, "onmouseout", "onMouseOut");
      if (this.closeOnLinkClick)
         this.connect(this.domNode, "onclick", "onTooltipClick");
   },
   orient: function(/*DomNode*/ node, /*String*/ aroundCorner, /*String*/ corner){
      // summary: configure widget to be displayed in given position relative to the button
      var s = this["class"] +" dijitTooltipAB"+(corner.charAt(1)=='L'?"Left":"Right");
      if (aroundCorner.charAt(0) != corner.charAt(0))
         s += " dijitTooltip"+(corner.charAt(0)=='T' ? "Below" : "Above");
      this.domNode.className = s;
   },
   onTooltipClick: function(e) {
      var el = e.target;
      for (var i=0; el && i<5; i++)
         if (el.nodeName.toLowerCase() == "a") {
            this.onCancel();
            return;
         }
         else
            el = el.parentNode;
   }
});
