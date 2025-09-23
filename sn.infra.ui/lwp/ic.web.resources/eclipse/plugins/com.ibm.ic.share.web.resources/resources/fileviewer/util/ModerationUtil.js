/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/topic",
  "../dialog/ConfirmationDialog",
  "dojo/_base/lang",
  "dojo/_base/json",
  "dojo/i18n!../nls/FileViewerStrings"
], function (topic, ConfirmationDialog, lang, json, i18n) {

   return {
      launchModerationDialog: function (dialogNls) {
         if (!dialogNls) {
            var dialogNls = i18n.ACTION.MODERATION ||
               {DIALOG_TITLE: "Success", PROMPT: "The changes have been submitted for review. This file will not be available until the changes are approved.", CANCEL: "OK"};
         }

         this.dialog = new ConfirmationDialog({strings: dialogNls, hideOk: true});
         this.dialog.on("clicked", lang.hitch(this, "_closeFile"));
         this.dialog.on("close", lang.hitch(this, "_closeFile"));
         this.dialog.placeAt(document.body);
         this.dialog.startup();
         this.dialog.show();
      },
    
      _closeFile: function() {
         topic.publish("ic-fileviewer/dirty");
         topic.publish("ic-fileviewer/action/completed");
      },
   
      isFileModerated: function(file) {
         return file.get("status") == "pending";
      },
   
      isResponseModerated: function(response) {
         var responseJson = response.body.innerHTML;
         var responseObject = json.fromJson(responseJson);
         var categories = responseObject.categories;
         var status = (categories[1] && categories[1].term);
         return status;
      }
   };
});
    