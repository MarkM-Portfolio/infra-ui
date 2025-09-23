/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/ViewerPreview.html",
   "dojo/_base/array",
   "dojo/string",
   "../config/documentTypes",
   "dojo/_base/lang",
   "dojo/_base/config",
   "dojo/dom-style",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "dojo/sniff"
], function (declare, _WidgetBase, _TemplatedMixin, template, array, string, documentTypes, lang, config, domStyle,
      i18n, has) {
   "use strict";

   var ViewerPreview = declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,

      postMixInProperties: function () {
         this.nls = i18n.PREVIEW.VIEWER;
         this.blankGif = config.blankGif || "";

         // TODO: Remove this once the string is translated
         if (!this.nls) {
            this.nls = {LOADING: ""};
         }
      },

      postCreate: function () {
         this.entitlements.getViewerDfd().then(lang.hitch(this, function (hasViewerEntitlement) {
            if (hasViewerEntitlement) {
               this._showViewer();
            } else {
               setTimeout(this.errorHandler, 0);
            }
         }));
      },

      _showViewer: function () {
         if (has("ie") <= 8 && this.frame.attachEvent) {
            this.frame.attachEvent("onload", lang.hitch(this, this._onFrameLoad), false);
         }
         this.frame.src = this.getViewerLink(this.file.args.id);
      },

      getViewerLink: function (fileId) {
         var url = "/viewer/app/lcfiles/${id}/content?mode=compact&focusWindow=false";

         return string.substitute(url, { id: fileId });
      },

      _onFrameLoad: function () {
         domStyle.set(this.loading, "display", "none");
      }
   });

   return {
      create: function (args) {
         return new ViewerPreview(args);
      },

      isValid: function (file) {
         var type = file.args.type;

         return !file.args.isEncrypted && (array.indexOf(documentTypes.view, type) > -1);
      }
   };
});
