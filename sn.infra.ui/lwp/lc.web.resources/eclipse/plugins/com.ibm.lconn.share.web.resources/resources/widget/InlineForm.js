/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.InlineForm");

dojo.declare("lconn.share.widget.InlineForm", null, {
   show: function(focus) {
      this._prevFocus = dijit.getFocus();
      this.domNode.style.display = "";
      if (focus) {
         var focusItem = dijit.getFirstInTabbingOrder(this.domNode);
         if (focusItem)
            focusItem.focus();                                                                                       
      }
   },
   hide: function() {
      this.domNode.style.display = "none";
      if (this._prevFocus)
         dijit.focus(this._prevFocus);
      delete this._prevFocus;
   },
   onCancel: function() {
      this.inherited(arguments);
      this.hide();
   },
   onComplete: function() {
      this.inherited(arguments);
      this.hide();
   }
});
