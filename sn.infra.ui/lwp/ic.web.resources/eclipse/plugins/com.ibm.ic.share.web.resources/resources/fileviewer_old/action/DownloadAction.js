/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/dom-attr",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "dojo/string"
], function (declare, Action, domAttr, i18n, string) {
   "use strict";

   var DownloadAction = declare([Action], {
      postMixInProperties: function () {
         this.nls = i18n.ACTION.DOWNLOAD;
         this.title = string.substitute(this.nls.TOOLTIP, [this.file.args.name]);
         this.a11y = this.nls.A11Y;
      },

      postCreate: function () {
         domAttr.set(this.link, "href", this.file.args.links.download);
      }
   });

   return {
      create: function (args) {
         return new DownloadAction(args);
      },

      isValid: function () {
         return true;
      },

      getClassName: function () {
         return "ics-viewer-action-download";
      }
   };
});
