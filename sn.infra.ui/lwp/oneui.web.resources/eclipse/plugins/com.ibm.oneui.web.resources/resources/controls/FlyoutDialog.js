/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("com.ibm.oneui.controls.FlyoutDialog");
   dojo.require("com.ibm.oneui.controls.PreviewDialog");
   
   dojo.requireLocalization("com.ibm.oneui.controls", "FlyoutDialog");
   var masterDialogPopup;
   /**
    * @class com.ibm.oneui.controls.FlyoutDialog
    * @extends com.ibm.oneui.controls.PreviewDialog
    * @author Kathryn L Mercer <klemanski@us.ibm.com>
    */
   dojo.declare("com.ibm.oneui.controls.FlyoutDialog", com.ibm.oneui.controls.PreviewDialog, /** @lends com.ibm.oneui.controls.FlyoutDialog */ {
      hideClose: true,
      hideCSS: true,
      _getMasterPopup: function() {
          if (!masterDialogPopup)
             masterDialogPopup = new com.ibm.oneui.controls.internal._MasterPopup(this.getMasterPopupParams());
          return masterDialogPopup;
      },
      getMasterPopupParams: function() {
    	   return {place: "before", templatePath: dojo.moduleUrl("com.ibm.oneui","controls/templates/FlyoutPopup.html")};
      },
      initPresentation: function() {
         return new com.ibm.oneui.controls.FlyoutDialogPresentation({
            parent: this,
            updateContents: this.updateDialogContents,
            master: this._getMasterPopup()
         });
      }
   });
   
   dojo.declare("com.ibm.oneui.controls.FlyoutDialogPresentation", com.ibm.oneui.controls.PreviewDialogPresentation, {
      templatePath: dojo.moduleUrl("com.ibm.oneui", "controls/templates/FlyoutDialog.html"),
      messages: dojo.i18n.getLocalization("com.ibm.oneui.controls", "FlyoutDialog"),
      metaClickClose: function(e) {
         this.master.clickClose();
      }
   });
   
})();
