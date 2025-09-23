/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/i18n",
        "dojo/i18n!./nls/FlyoutDialog",
        "dojo/text!./templates/FlyoutDialog.html",
        "dojo/text!./templates/FlyoutPopup.html",
        "./PreviewDialog",
        "./PreviewDialogPresentation",
        "./internal/_MasterPopup"
], function(dojo, declare, i18n, i18nFlyoutDialog, dialogTemplate, popupTemplate, PreviewDialog, PreviewDialogPresentation, _MasterPopup) {

   var masterDialogPopup;

   /**
    * @class ic-ui.FlyoutDialogPresentation
    * @extends ic-ui.PreviewDialogPresentation
    * @private
    * @author Kathryn L Mercer <klemanski@us.ibm.com>
    */
   var FlyoutDialogPresentation = declare("com.ibm.oneui.controls.FlyoutDialogPresentation", PreviewDialogPresentation, /** @lends ic-ui.FlyoutDialogPresentation.prototype */
   {
      templateString : dialogTemplate,
      messages : i18nFlyoutDialog,
      metaClickClose : function(e) {
         this.master.clickClose();
      }
   });

   /**
    * @class ic-ui.FlyoutDialog
    * @extends ic-ui.PreviewDialog
    * @author Kathryn L Mercer <klemanski@us.ibm.com>
    */
   var FlyoutDialog = declare("com.ibm.oneui.controls.FlyoutDialog", PreviewDialog,
   /** @lends ic-ui.FlyoutDialog.prototype */
   {
      hideClose : true,
      hideCSS : true,
      _getMasterPopup : function() {
         if (!masterDialogPopup) {
            masterDialogPopup = new _MasterPopup(this.getMasterPopupParams());
         }
         return masterDialogPopup;
      },
      getMasterPopupParams : function() {
         return {
            place : "before",
            templateString : popupTemplate
         };
      },
      initPresentation : function() {
         return new FlyoutDialogPresentation({
            parent : this,
            updateContents : this.updateDialogContents,
            master : this._getMasterPopup()
         });
      }
   });

   return FlyoutDialog;
});
