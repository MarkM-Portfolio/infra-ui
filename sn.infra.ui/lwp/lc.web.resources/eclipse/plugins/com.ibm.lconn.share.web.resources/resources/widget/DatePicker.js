/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.DatePicker");
dojo.require("dijit.form.DateTextBox");

dojo.declare("lconn.share.widget.DatePicker", [dijit.form.DateTextBox], {

   // Restores drop down calendar opening up on clicking user input area
   // http://dojotoolkit.org/reference-guide/1.8/releasenotes/1.8.html#id45
   hasDownArrow:  false,
   
   onValueSelected: function(value) {
   },

   _open: function() {
      this.inherited(arguments);
      if(this._picker) {
         var scope = this;
         dojo.connect(this._picker, "onValueSelected", function(value) {
            // Give the focus timeouts from DateTextBox time to sort themselves out
            setTimeout(dojo.hitch(scope, "onValueSelected", value), 100);
         });
      }
   },
   
   _onKeyPress: function(/*Event*/e){
      this.inherited(arguments);
      if (e.charOrCode === dojo.keys.ENTER && this.isValid())
         this.onValueSelected(this.attr("value"));
   }
});
