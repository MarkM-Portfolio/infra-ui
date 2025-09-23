/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/i18n",
        "dojo/i18n!./nls/HoverPopup",
        "./HoverPopup",
        "./_HoverDialogMixin"
], function(dojo, declare, domConstruct, i18n, i18nHoverPopup, HoverPopup, _HoverDialogMixin) {

   /**
    * @class ic-ui.HoverHelp
    * @extends ic-ui.HoverPopup
    * @mixes com.ibm.oneui.controls._HoverDialogMixin
    * @author Clayton Coleman <claycole@us.ibm.com>
    */
   var HoverHelp = declare("com.ibm.oneui.HoverHelp", [
                                                HoverPopup,
                                                _HoverDialogMixin
   ],
   /** @lends ic-ui.HoverHelp.prototype */
   {
      dialogTitle : i18nHoverPopup.help,
      _clickAround : "_targetClickAround",
      createContents : function() {
         var div = domConstruct.create("div", {});
         if (this.title) {
            domConstruct.create("div", {
               className : "lotusPopupHeader"
            }, div).appendChild(document.createTextNode(this.title));
         }
         domConstruct.create("p", {
            className : "lotusFirst",
            innerHTML : this.help
         }, div);
         return div;
      }
   });
   return HoverHelp;
});
