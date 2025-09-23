/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo/_base/declare",
        "./HoverPopup",
        "./_HoverDialogMixin",
        "./internal/_MasterPopup"
], function(declare, HoverPopup, _HoverDialogMixin, _MasterPopup) {

   var masterDialogPopup;

   /**
    * @class ic-ui.HoverDialog
    * @extends ic-ui.HoverPopup
    * @extends ic-ui._HoverDialogMixin
    * @author Clayton Coleman <claycole@us.ibm.com>
    */
   var HoverDialog = declare("com.ibm.oneui.HoverDialog", [
                                                    HoverPopup,
                                                    _HoverDialogMixin
   ],
   /** @lends ic-ui.HoverDialog */
   {
      programmatic : true,

      /** Gets or create the master dialog popup */
      _getMasterPopup : function() {
         if (!masterDialogPopup) {
            masterDialogPopup = new _MasterPopup({
               place : "before"
            });
         }
         return masterDialogPopup;
      }
   });
   return HoverDialog;
});
