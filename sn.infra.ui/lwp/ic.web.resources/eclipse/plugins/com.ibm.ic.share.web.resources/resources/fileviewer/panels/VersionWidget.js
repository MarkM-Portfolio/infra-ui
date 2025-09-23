/* Copyright IBM Corp. 2015, 2017  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./EntryWidget",
  "../preview/util",
  "../dialog/VersionDialog",
  "../config/globals",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-attr",
  "../util/fidoNewRelic"
], function (declare, EntryWidget, util, VersionDialog, globals, i18n, domAttr, fidoNewRelic) {
  return declare([ EntryWidget ], {
    postMixInProperties: function () {
      this.baseClasses = "version";
      this.reloadItem = true;
      this.DialogFactory = VersionDialog;
      this.dialogArgs = { version: this.entry.get("version"), isLast: false };

      this.downloadLink = this.entry.get("downloadUrl") || "";
      this.h1 = "<span class='versionNumber'>" + this.entry.get("version") + "</span>" + " ";
      this.h2 = this.formatDate(this.entry.get("dateModified"));
      this.h3 = globals.formatFileSize(parseInt(this.entry.get("size")));
      this.content = "";
      this.footer = this.entry.get("summary");

      this.restoreTooltip = i18n.ACTION.RESTORE_VERSION.TOOLTIP;
      this.removeTooltip = i18n.ACTION.DELETE_VERSION.TOOLTIP;
      this.downloadTooltip = i18n.ACTION.DOWNLOAD_VERSION.TOOLTIP;
      
      this.usernameMaxWidth = 225;
    },

    download: function () {
      if (!util.isPreviewSafe(this.file) || util.isMalicious(this.file)) {
        domAttr.set(this.link,"target","_blank");
      } else {
        domAttr.remove(this.link,"target");
      }
      fidoNewRelic.track("download");
    },

    postCreate: function () {
      this.inherited(arguments);
      this.setUserName(this.entry.get("author"), this.h1Node);
    },
    
    onEventSuccess: function (arg, dialog) {
       this.inherited(arguments);
       this.file.update();
    },
    
    _setIsLastAttr: function (isLast) {
      this.dialogArgs.isLast = isLast;
    }
  });
});
