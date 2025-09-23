/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./EventAction",
  "dojo/i18n!../nls/FileViewerStrings",
  "../config/globals",
  "dojo/has",
  "dojo/topic",
  "dojo/_base/lang",
  "../editTracker",
  "../dialog/ConfirmationDialog",
  "../util/fidoNewRelic"
], function (declare, EventAction, i18n, globals, has, topic, lang, editTracker, ConfirmationDialog, fidoNewRelic) {

  var TearOffAction = declare([EventAction], {
    eventName: "ic-fileviewer/action/tearoff",
    
    postMixInProperties: function () {
      this.nls = i18n.ACTION.TEAR_OFF;
      
      if (!this.nls) {
        this.nls = {
          TOOLTIP: "Open in new window",
          A11Y: "Open in new window"
        };
      }
      
      this.title = this.nls.TOOLTIP;
      this.a11y = this.nls.A11Y;
    },
    
    onLinkClicked: function () {
      var superMethod = lang.hitch(this, this.getInherited(arguments));
      if (editTracker.hasUnsavedChanges()) {
        this._showDialog(superMethod);
      } else {
        superMethod();
      }
      fidoNewRelic.track("tearOff");
    },
    
    _showDialog: function (onOk) {
      var dialog = new ConfirmationDialog({
        strings: {
          DIALOG_TITLE: this.nls.DIALOG_TITLE,
          PROMPT: this.nls.UNSAVED_CHANGES_WARNING,
          OK: this.nls.OPEN_ANYWAY,
          CANCEL: this.nls.CANCEL_ALT
        }
      });
      dialog.on("clicked", lang.hitch(this, function () {
        dialog.onCancel();
        onOk();
      }));
      dialog.render();
    }
  });

  return {
    isSticky: true,
    isOverlayAction: true,

    create: function (args) {
      return new TearOffAction(args);
    },

    isValid: function () {
      return !globals.tornOff && has("fileviewer-tearoff");
    },

    getClassName: function () {
      return "ics-viewer-action-tearoff";
    }
  };
});
