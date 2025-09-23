/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "dojo/string"
], function (declare, Action, i18n, string) {
   "use strict";

   var CloseAction = declare([Action], {
      postMixInProperties: function () {
         this.nls = i18n.ACTION.CLOSE;
         this.title = string.substitute(this.nls.TOOLTIP, [this.file.args.name]);
         this.a11y = this.nls.A11Y;
      },

      onLinkClicked: function () {
         this.viewerActions.close();
      }
   });

   return {
      create: function (args) {
         return new CloseAction(args);
      },

      isValid: function () {
         return true;
      },

      getClassName: function () {
         return "ics-viewer-action-close";
      }
   };
});
