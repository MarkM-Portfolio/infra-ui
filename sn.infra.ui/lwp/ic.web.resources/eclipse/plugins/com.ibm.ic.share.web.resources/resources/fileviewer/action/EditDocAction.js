/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/string",
   "dojo/_base/array",
   "dojo/i18n!../nls/FileViewerStrings",
   "../config/documentTypes",
   "dojo/_base/lang",
   "dojo/dom-class",
   "dojo/dom-style",
   "../preview/util",
   "dojo/request/xhr",
   "dojo/promise/all",
   "dojo/Deferred",
   "../util/ibmDocs",
   "dojo/topic",
   "dojo/has",
   "../util/feature",
   "../config/globals",
   "../util/fidoNewRelic"
], function (declare, Action, string, array, i18n, documentTypes, lang, domClass, domStyle, util, xhr, all,
      Deferred, ibmDocs, topic, has, feature, globals, fidoNewRelic) {
   "use strict";

   var EditAction = declare([Action], {
      postMixInProperties: function () {
         this.nls = i18n.ACTION.EDIT_DOC;
         this.name = this.splitButtonName || this.nls.NAME;
         this.title = this.nls.TOOLTIP;
         this.a11y = this.nls.A11Y;
      },

      postCreate: function () {
         domStyle.set(this.img, "display", "none");
      },

      onLinkClicked: function () {
         window.open(this.getDocsLink(this.file.args.id), "_blanks");
         
         if (has("fileviewer-close-on-edit")) {
            topic.publish("ic-fileviewer/close");
         }
         fidoNewRelic.track("editDoc");
      },

      getDocsLink: function (fileId) {
         var url = this.services.getDocsUrl() + "/app/doc/lcfiles/${id}/edit/content";

         return string.substitute(url, { id: fileId });
      }
   });

   return {
      isSplitButtonItem: true,
			
      create: function (args) {
         return new EditAction(args);
      },

      isValid: function (file, args) {
         if (globals.isCCM(file)) {
            return false;
         }
         
         return all({
            hasDocsEntitlement: ibmDocs.isDocsEnabled(),
            fileBean: file.bean.get("fullEntry")
         }).then(lang.hitch(this, function (results) {
            if (file.type === "verse") {
               return false;
            }
            
            var fileType = file.bean.get("type");

            if (array.indexOf(documentTypes.edit, fileType) < 0) {
               return false;
            }

            if (file.bean.get("isEncrypted")) {
               return false;
            }

            if (file.bean.get("size") === 0 && (fileType === "csv" || fileType === "txt")) {
               // IBM Docs does not support editing zero byte CSV and TXT files
               return false;
            }

            if (feature.isOffice365EnabledWithoutDocsEditor()) {
               return false;
            }

            return results.hasDocsEntitlement && file.bean.get("permissions").canEdit();
         }));
      },

      getClassName: function () {
         return "ics-viewer-action-edit";
      },

      getActionCategory: function () {
         return "edit";
      }
   };
});
