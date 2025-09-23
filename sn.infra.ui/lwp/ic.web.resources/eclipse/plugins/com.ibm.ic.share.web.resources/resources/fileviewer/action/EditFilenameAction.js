/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/dom-class",
  "./Action",
  "../widget/EditBox",
  "../util/validation",
  "../util/network",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/on",
  "dojo/topic",
  "../util/html",
  "../config/globals",
  "../util/ModerationUtil",
  "../util/fidoNewRelic",
  "dojo/has"
], function (declare, lang, domClass, Action, EditBox, validation, network, i18n, on, topic, html, globals, moderationUtil, 
fidoNewRelic, has) {
  "use strict";

  var EditFilenameAction = declare([Action], {
    postMixInProperties: function () {
      this.nls = i18n.ACTION.EDIT_FILENAME;
    },
    
    onLinkClicked: function () {
      var filename = this.file.get("name");
      this.filenameNode.style.display = "none";

      if (has("files-folder-syncable")) { 
        domClass.add(this.myDriveNode, "lotusHidden");
      }

      var editBox = this._editBox = new EditBox({
        multiline: false,
        invalidCharacters: validation.INVALID_FILENAME_CHARS,
        closeButtonEnabled: true,
        useInlineMessages: false
      });
      editBox.placeAt(this.filenameNode, "after");
      editBox.set("value", this.file.get("name"));
      
      editBox.focus();
      
      var extensionIndex = filename.lastIndexOf(".");
      if (extensionIndex > -1) {
        editBox.setSelectionRange(0, extensionIndex);
      }
      
      editBox.on("save", lang.hitch(this, this._onSave));
      editBox.on("cancel", lang.hitch(this, this._displayFilenameNode));
      
      fidoNewRelic.track("editFilename.open");
    },
    
    _onSave: function () {
      topic.publish("ic-fileviewer/push/clearMessages");
      
      var newFilename = this._editBox.get("value");

      if (newFilename === this.file.get("name")) {
         this._displayFilenameNode();
         return;
      }

      if (newFilename.length > validation.FILENAME_LENGTH) {
        topic.publish("ic-fileviewer/push/messages", {
          type: "error",
          message: i18n.VALIDATION.FILENAME.WARN_TOO_LONG,
          cancelable: true,
          focus: false
        });
        return;
      }
      
      this._initialType = this.file.get("type");
      this.file.set("name", newFilename);
      this.file.update().then(lang.hitch(this, this._onSuccess), lang.hitch(this, this._onError));
      
      fidoNewRelic.track("editFilename.save");
    },
    
    _onSuccess: function () {
      this._displayFilenameNode();
      if (this._initialType !== this.file.get("type")) {
        topic.publish("ic-fileviewer/changedExtension", {});
      }

      if (this.file.get("status") == "pending") {
        moderationUtil.launchModerationDialog();
      }
    },
    
    _displayFilenameNode: function () {
      this._editBox.destroy();
      html.setText(this.filenameNode, this.file.get("name"));
      this.filenameNode.style.display = "";
      if (has("files-folder-syncable") && (this.file.isSyncable || this.file.isIndirectSyncable)) { 
        domClass.remove(this.myDriveNode, "lotusHidden");
      }
    },
    
    _onError: function (error) {
      var errorMessage = network.getErrorMessage(error, this.nls.ERROR);

      topic.publish("ic-fileviewer/push/messages", {
        type: "error",
        message: errorMessage,
        cancelable: true,
        focus: false
      });
    },

    _closeFile: function() {
        topic.publish("ic-fileviewer/dirty");    	
        topic.publish("ic-fileviewer/action/completed");
    }
  });

  return {
    create: function (args) {
      return new EditFilenameAction(args);
    },

    isValid: function (file) {
    if (globals.isPanels(file)) {
        return file.get("fullEntry").then(function () {
        return file.get("permissions").canEdit();
      });
    } else {
       return false;
      }
    },

    getClassName: function () {
      return "ics-viewer-title-name-rename";
    }
  };
});
