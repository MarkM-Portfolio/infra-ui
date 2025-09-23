/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/topic",
  "./ToggleAction",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/when",
  "../config/globals",
  "../data/util/routes",
  "../util/network",
  "../util/fidoNewRelic",
  "dojo/has"
], function (declare, lang, topic, ToggleAction, i18n, when, globals, routes, networkUtil, fidoNewRelic, has) {
  "use strict";

  var fileViewerRefreshTopicName = "ic-fileviewer/dirty";
  var fileViewerUIMessageTopicName = "ic-fileviewer/push/messages";
  var filesDocumentSyncTagName = "isSyncable";
  var fileViewerSyncFileBeanTrackingPropertyName = "syncing";

  var ToggleSyncAction = declare([ToggleAction], {
    groupId: 1,

    postMixInProperties: function () {
      this.nls = i18n.ACTION.TOGGLE_SYNC || {};

      if (has("files-folder-syncable")) {
        this.toggleStrings = {
          unchecked: {
            name: this.nls.MYDRIVE.NAME,
            title: this.nls.MYDRIVE.TOOLTIP,
            a11y: this.nls.MYDRIVE.A11Y
          },
          checked: {
            name: this.nls.REMOVE_MYDRIVE.NAME,
            title: this.nls.REMOVE_MYDRIVE.TOOLTIP,
            a11y: this.nls.REMOVE_MYDRIVE.A11Y
          }
        };
      } else {
        this.toggleStrings = {
          unchecked: {
            name: this.nls.SYNC.NAME,
            title: this.nls.SYNC.TOOLTIP,
            a11y: this.nls.SYNC.A11Y
          },
          checked: {
            name: this.nls.STOP_SYNC.NAME,
            title: this.nls.STOP_SYNC.TOOLTIP,
            a11y: this.nls.STOP_SYNC.A11Y
          }
        };
      }
    },

    postCreate: function () {
      this.set("checked", this._isSyncing());
    },

    onLinkClicked: function () {
      this.file.bean.set(fileViewerSyncFileBeanTrackingPropertyName, this._isSyncing());

      this.file.bean.update().then(
        lang.hitch(this, "_onSuccess"),
        lang.hitch(this, "_onError")
      );
      
      fidoNewRelic.track("toggleSync");
    },

    _onSuccess: function () {
      var isSyncing = this._isSyncing();
      this.set("checked", isSyncing);
      if (has("files-folder-syncable")) {
        topic.publish("ic-fileviewer/refresh");
      } else {
        topic.publish(fileViewerRefreshTopicName, filesDocumentSyncTagName, isSyncing);
      }
      this._publishMessage(true);
    },

    _onError: function (error) {
      this._publishMessage(false, error);
    },
    
    // Assumes up-to-date action/file bean state so it will use the previous state's NLS strings for the success/error message
    _publishMessage: function (isSuccess, error) {
      var messageSubNLS, messageType, messageText;

      if (isSuccess) {
        messageSubNLS = this._getPreviousActionSubNLS();
        messageType = "success";
        messageText = messageSubNLS.SUCCESS;
      } else {
        messageSubNLS = this._getCurrentNextActionSubNLS();
        messageType = "error";
        messageText = networkUtil.getErrorMessage(error, messageSubNLS.ERROR);
      }

      topic.publish(fileViewerUIMessageTopicName, {
        type: messageType,
        message: messageText,
        cancelable: true
      });
    },

    _isSyncing: function () {
      return this.file.bean.get(filesDocumentSyncTagName);
    },
    
    _getPreviousActionSubNLS: function(isSyncing) {
      return this._getCurrentNextActionSubNLS(!((isSyncing !== undefined) ? isSyncing : this._isSyncing()));
    },

    _getCurrentNextActionSubNLS: function (isSyncing) {
      if (has("files-folder-syncable")) {
        return ((isSyncing !== undefined) ? isSyncing : this._isSyncing())
          ? this.nls.REMOVE_MYDRIVE : this.nls.MYDRIVE;
      } else {
        return ((isSyncing !== undefined) ? isSyncing : this._isSyncing())
          ? this.nls.STOP_SYNC : this.nls.SYNC;
      }
    }
  });

  return {
    isSubItem: true,

    create: function (args) {
      return new ToggleSyncAction(args);
    },

    isValid: function (file) {
      // These are hard-coded for now, but if we ever decide to support folders or other item types later,
      // these first 2 variables can be assigned more dynamically.
      var isFile = true;
      var isFolder = false;

      if (!globals.isAuthenticated) {
        return false;
      }

      return when(globals.policy).then(lang.hitch(this, function (policy) {
        var canSyncCapabilities = globals.policy.capabilities.canSync;
        var itemTypeSpecificSyncCapabilties, itemTypeAndEnvironmentSpecificSyncCapability;

        if (isFile) {
          itemTypeSpecificSyncCapabilties = canSyncCapabilities.files;
        } else if (isFolder) {
          itemTypeSpecificSyncCapabilties = canSyncCapabilities.folders;
        } else {
          return false;
        }

        if (file.bean.get("libraryType") === "personalFiles") {
          itemTypeAndEnvironmentSpecificSyncCapability = itemTypeSpecificSyncCapabilties.personal;
        } else if(file.bean.get("libraryType") === "communityFiles") {
          itemTypeAndEnvironmentSpecificSyncCapability = itemTypeSpecificSyncCapabilties.community;
        } else {
          return false;
        }

        return itemTypeAndEnvironmentSpecificSyncCapability;
      }));
    },

    getClassName: function () {
      return "ics-viewer-action-toggleSync";
    }
  };
});
