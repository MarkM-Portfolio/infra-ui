/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/topic",
   "dojo/string",
   "./Action",
   "../dialog/ConfirmationDialog",
   "../util/network",
   "dojo/Deferred",
   "dojo/i18n!../nls/FileViewerStrings",
   "../util/fidoNewRelic"
], function (declare, lang, array, topic, string, Action, ConfirmationDialog, networkUtil, Deferred, i18n, fidoNewRelic) {
   "use strict";
   
   var TrashFileAction = declare([Action], {
     groupId: 2,

     _inProgress: false,

     _handlers: [],

     constructor: function (args) {
       lang.mixin(this, args);
       this.nls = i18n.ACTION.TRASH;
       this.title = this.name = this.nls.NAME;
       this.a11y = this.nls.A11Y;
     },

     onLinkClicked: function () {
       this.createDialog();
     },
     
     createDialog: function () {
       this.dialog = new ConfirmationDialog({strings: this.nls});
       this._handlers.push(this.dialog.on("clicked", lang.hitch(this, "_deleteFile")));
       this._handlers.push(this.dialog.on("close", lang.hitch(this, "_close")));

       this.dialog.placeAt(document.body);
       this.dialog.startup();
       this.dialog.show();
     },

     _deleteFile: function () {
       if (!this._inProgress) {
         this._inProgress = true;
         this.file.bean.remove().then(lang.hitch(this, "_onSuccess"), 
             lang.hitch(this, function (error) {
               this._onError(error);
             }));
       }
     },
     
     _onSuccess: function () {
       this.dialog.onCancel();
       this._inProgress = false;
       
       var args = {
           fileDelete: true, 
           messages: {
             message: string.substitute(this.nls.SUCCESS_MSG, {file: this.file.bean.get("name")}),
             success: true
           }
       };

       topic.publish("ic-fileviewer/dirty");
       topic.publish("ic-fileviewer/action/completed", args);
       fidoNewRelic.track("trashFile");
     },

     _onError: function (error) {
       if (this.nls.errorStrings) {
         this.dialog.showError(networkUtil.getErrorMessage(error, this.nls.errorStrings));
       }

       this._inProgress = false;
     },

     _close: function () {
       array.forEach(this._handlers, function (handler) {
         handler.remove();
       });
       this._handlers = [];
       delete this.dialog;
       this._inProgress = false;
     }
   });

   return {
     isSubItem: true,

     create: function (args) {
        return new TrashFileAction(args);
     },

     isValid: function (file, args) {
          var deferred = new Deferred();
          file.bean.get("fullEntry").then(function (file) {
            deferred.resolve(!!file.get("permissions").canDelete());
          });
          return deferred.promise;
     },

     getClassName: function () {
        return "ics-viewer-action-trash";
     }
  };
});