/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/topic",
   "dojo/string",
   "./Action",
   "../dialog/FlagActionDialog",
   "../util/network",
   "dojo/Deferred",
   "../config/globals",
   "dojo/i18n!../nls/FileViewerStrings",
   "../util/ModerationUtil",
   "../util/fidoNewRelic"
], function (declare, lang, array, topic, string, Action, FlagActionDialog, networkUtil, Deferred, globals, i18n, moderationUtil, fidoNewRelic) {
   "use strict";
   
   var FlagAction = declare([Action], {
     groupId: 2,

     _inProgress: false,

     _handlers: [],

     constructor: function (args) {
       lang.mixin(this, args);
       
       if (this.item && this.item.moderatedBeanType === "comment") {
         this.nls = i18n.ACTION.FLAG.COMMENT;
       } else {
         this.item = this.file.bean;
         this.nls = i18n.ACTION.FLAG.FILE;
       }
       this.title = this.name = this.nls.NAME;
       this.a11y = this.nls.A11Y;
     },

     onLinkClicked: function () {
       this.createDialog();
       fidoNewRelic.track("flag");
     },
     
     createDialog: function () {
       this.dialog = new FlagActionDialog({strings: this.nls});
       this._handlers.push(this.dialog.on("clicked", lang.hitch(this, "_flag")));
       this._handlers.push(this.dialog.on("close", lang.hitch(this, "_close")));

       this.dialog.placeAt(document.body);
       this.dialog.startup();
       this.dialog.show();
     },

     _flag: function (args) {
       if (!this._inProgress) {
         this._inProgress = true;
         this.item.flag(args.summary).then(lang.hitch(this, "_onSuccess"), 
           lang.hitch(this, function (error) {
             this._onError(error)
          }));
       }
     },
     
     _onSuccess: function () {
       this._inProgress = false;
       var args = {
           type: "success",
           message: this.nls.SUCCESS
       };
       
       var dialogNls = i18n.ACTION.FLAG.FILE_DIALOG ||
       {DIALOG_TITLE: "Success", PROMPT: "The file has been flagged and submitted for review", CANCEL: "OK"};

       if (this.item.moderatedBeanType === "document") {
          moderationUtil.launchModerationDialog(dialogNls);
       } else {
         topic.publish("ic-fileviewer/refresh", args);
         topic.publish("ic-fileviewer/push/messages", {
            type: args.type,
            message: args.message,
            cancelable: true
            });
       }
     },

     _onError: function (error) {
       this._inProgress = false;
       
       var args = {
           type: "error",
           message: this.nls.ERROR
       };

       topic.publish("ic-fileviewer/refresh", args);
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
        return new FlagAction(args);
     },

     isValid: function (file, args) {
          var deferred = new Deferred();
          
          var isAuthenticated = globals.isAuthenticated;
          if (file.bean.get("libraryType") !== "communityFiles" || !isAuthenticated) {
            return false;
          }
          
          file.bean.get("fullEntry").then(function (file) {
            deferred.resolve(file.get("reportUrl") && file.get("reportUrl") !== "");
          });
          return deferred.promise;
     },

     getClassName: function () {
        return "ics-viewer-action-flag";
     }
  };
});