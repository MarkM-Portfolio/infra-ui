/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/event",
  "./Action",
  "dojo/i18n!../nls/FileViewerStrings",
  "./DownloadDocsFileMixin",
  "../util/fidoNewRelic",
  "../preview/util",
  "dojo/dom-attr"
], function (declare, lang, event, Action, i18n, DownloadDocsFileMixin, fidoNewRelic, util, domAttr) {
   var DownloadAction = declare([Action, DownloadDocsFileMixin], {
      isDownloadAction: true,

      postMixInProperties: function () {
         this.nls = i18n.ACTION.DOWNLOAD;
         this.title = this.nls.TOOLTIP;
         this.a11y = this.nls.A11Y;
         this.href = this.file.args.links.download; // At this point, the links are not yet available from the bean
      },

      onLinkClicked: function (e) {
         if (!util.isPreviewSafe(this.file) || util.isMalicious(this.file)) {
           domAttr.set(this.link,"target","_blank");
         } else {
           domAttr.remove(this.link,"target");
         }

         if (lang.isFunction(this.customDownload) && this.file.bean.get('isDocsFile')) {
            event.stop(e);
            this.customDownload();
         }
         fidoNewRelic.track("download");
      }
   });

   return {
      isSticky: true,

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
