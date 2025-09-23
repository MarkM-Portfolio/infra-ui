/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("com.ibm.oneui.controls.HoverHelp");
   dojo.require("com.ibm.oneui.controls.HoverPopup");
   dojo.require("com.ibm.oneui.controls._HoverDialogMixin");

   dojo.requireLocalization("com.ibm.oneui.controls", "HoverPopup");
   var messages = dojo.i18n.getLocalization("com.ibm.oneui.controls", "HoverPopup");

   /**
    * @class com.ibm.oneui.controls.HoverHelp
    * @extends com.ibm.oneui.controls.HoverPopup
    * @mixes com.ibm.oneui.controls._HoverDialogMixin
    * @author Clayton Coleman <claycole@us.ibm.com>
    */
   dojo.declare("com.ibm.oneui.controls.HoverHelp", [
         com.ibm.oneui.controls.HoverPopup,
         com.ibm.oneui.controls._HoverDialogMixin
   ],
   /** @lends com.ibm.oneui.controls.HoverHelp.prototype */
   {
      dialogTitle : messages.help,
      _clickAround : "_targetClickAround",
      createContents : function() {
         var div = dojo.create("div", {});
         if (this.title)
            dojo.create("div", {
               className : "lotusPopupHeader"
            }, div).appendChild(document.createTextNode(this.title));
         dojo.create("p", {
            className : "lotusFirst",
            innerHTML : this.help
         }, div);
         return div;
      }
   });
}());
