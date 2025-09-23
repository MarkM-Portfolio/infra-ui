/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/text!./templates/ViewDocAction.html",
   "dojo/cookie",
   "dojo/string",
   "dojo/_base/array",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/_base/lang",
   "../config/documentTypes"
], function (declare, Action, template, cookie, string, array, i18n, lang, documentTypes) {
   "use strict";

   function getViewerLink(fileId) {
      var url = "/viewer/app/lcfiles/${id}/content";

      if (cookie("com.ibm.ic.share.fileviewer.cswg-data")) {
         url = "//connections.swg.usma.ibm.com" + url;
      }

      return string.substitute(url, { id: fileId });
   }

   var CloseAction = declare([Action], {
      templateString: template,

      postMixInProperties: function () {
         this.nls = i18n.ACTION.VIEW_DOC;
         this.ui = {
            text: this.nls.NAME,
            title: this.nls.TOOLTIP,
            target: getViewerLink(this.file.args.id)
         };

         this.hide();
      },
      
      postCreate: function () {
        this.entitlements.getViewerDfd().then(lang.hitch(this, function (hasViewerEntitlement) {
          if (hasViewerEntitlement) {
            this.show();
          }
       }));
      }
   });

   return {
      create: function (args) {
         return new CloseAction(args);
      },

      isValid: function (file, args) {
         return array.indexOf(documentTypes.view, file.args.type) > -1 &&
         args.properties && args.properties["ic-share.fileviewer.showViewButton"] === "true";
      },

      getClassName: function () {
         return "ics-viewer-action-view";
      }
   };
});
