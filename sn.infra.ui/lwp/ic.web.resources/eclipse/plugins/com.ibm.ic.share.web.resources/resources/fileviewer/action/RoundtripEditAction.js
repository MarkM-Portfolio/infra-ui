/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/string",
   "dojo/_base/array",
   "../config/documentTypes",
   "dojo/_base/lang",
   "../config/globals",
   "../bean/FileAdapter",
   "dojo/_base/config",
   "../data/util/routes",
   "dojo/topic",
   "dojo/Deferred",
   "dojo/aspect",
   "dojo/dom-attr",
   "dojo/promise/all",
   "dojo/cookie",
   "../dialog/RoundtripEditDialog",
   "../util/fidoNewRelic"
], function (declare, Action, i18n, string, array, documentTypes, lang, globals, FileAdapter, config, routes, topic, Deferred, aspect, domAttr, all, cookie, RoundtripEditDialog, fidoNewRelic) {
   "use strict";

   var RoundtripEditAction = declare([Action], {
     groupId: 0,
     
     _handlers: [],

     postMixInProperties: function () {
       this.nls = i18n.ACTION.ROUNDTRIP_EDIT;
       this.title = this.nls.TOOLTIP;
       this.name = this.splitButtonName || this.nls.NAME;
       this.a11y = this.nls.A11Y;
     },

     postCreate: function () {
        domAttr.set(this.altText, "innerHTML", "");
     },
     
     onLinkClicked: function () {
       if(!cookie("com.ibm.ic.share.fileviewer.skipRoundTripDialog")) {
         this.createDialog();
       } else {
         this._redirectDesktop();
       }
       fidoNewRelic.track("roundTripEdit");
     },
     
     createDialog: function() {
       this.dialog = new RoundtripEditDialog({strings: this.nls});
       this._handlers.push(this.dialog.on("clicked", lang.hitch(this, "_onClicked")));
       this._handlers.push(this.dialog.on("close", lang.hitch(this, "_onClose")));
       this.dialog.placeAt(document.body);
       this.dialog.startup();
       this.dialog.show();
     },
     
     _onClicked: function() {
       this.dialog.onCancel();
       this._redirectDesktop();
     },
     
     _onClose: function() {
       array.forEach(this._handlers, function(handler) {
         handler.remove();
       });
       this._handlers = [];
       delete this.dialog;
     },
     
     getDesktopLink: function(fileId) {
       var filesAppRoutes = routes.getFilesAppRoutes(this.file.bean);
       return filesAppRoutes.getRoundTripEditingUrl(this.file.bean.id);
     },
     
     _redirectDesktop: function() {
       window.location.href = this.getDesktopLink(this.file.args.id);
     }
   });

   return {
     isSplitButtonItem: true, 

      create: function (args) {
         return new RoundtripEditAction(args);
      },

      isValid: function (file, args) {
        return all({
          fileBean: file.bean.get("fullEntry"),
          policy: globals.policy,
          baseFilesConfig: globals.baseFilesConfig
        }).then(lang.hitch(this, function (results) {
          
          if(navigator.platform.indexOf("Win") !== 0) {
            return false;
          }
          var extensions = lang.getObject("features.roundTripEditing.extensions", false, results.baseFilesConfig);
          var isExtensionValid = false;
          if(extensions) {
            isExtensionValid = array.some(extensions, function(extension) {
              return ("." + file.bean.get("type")) == extension.toLowerCase();
            });
          }
          if(!isExtensionValid) {
            return false;
          }
          if(!results.policy.roundTripEditingEnabled) {
            return false;
          }
          if(results.fileBean.get("isLocked") && results.fileBean.get("lock").user.id != globals.currentUser.id) {
            return false;
          }
          if (!results.fileBean.get("permissions").canEdit()) {
            return false;
          }
          return true;
        }));
      },

      getClassName: function () {
         return "ics-viewer-action-roundtripedit";
      },

      getActionCategory: function () {
         return "edit";
      }
   };
});
