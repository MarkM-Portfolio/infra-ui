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
   "dojo/has",
   "../util/ibmDocs",
], function (declare, Action, i18n, string, array, documentTypes, lang, globals, FileAdapter, config, routes, topic, Deferred, aspect, domAttr, has, ibmDocs) {
   "use strict";

   var UploadNewVersionAction = declare([Action], {
     groupId: 0,

     postMixInProperties: function () {
       this.nls = i18n.ACTION.UPLOAD_VERSION;
       this.title = this.nls.TOOLTIP;
       this.name = this.splitButtonName || this.nls.NAME;
       this.a11y = this.nls.A11Y;
     },

     postCreate: function () {
				domAttr.set(this.altText, "innerHTML", "");
     },
     
     onLinkClicked: function () {
       topic.publish("ic-fileviewer/selectpanel", ["version", "showNewVersionWidget"]);
     }
   });

   return {
     isSplitButtonItem: true,

      create: function (args) {
         return new UploadNewVersionAction(args);
      },

      isValid: function (file, args) {
        if (globals.isCCM(file)) {
           return false;
        }
        return file.bean.get("fullEntry").then(lang.hitch(this, function (fileBean) {
           return fileBean.get("permissions").canEdit()
        }));
      },

      getClassName: function () {
         return "ics-viewer-action-upload";
      },

      getActionCategory: function () {
         return "upload";
      }
   };
});
