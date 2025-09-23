/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "./ToggleAction",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-class",
  "dojo/when",
  "../config/globals",
  "dojo/topic",
  "../util/fidoNewRelic"
], function (declare, lang, ToggleAction, i18n, domClass, when, globals, topic, fidoNewRelic) {
  "use strict";

  var ToggleLockAction = declare([ToggleAction], {
     groupId: 1,
     postMixInProperties: function () {
        this.nls = i18n.ACTION || {};
        this.toggleStrings = {
           unchecked: {
              name: this.nls.LOCK.NAME,
              title: this.nls.LOCK.TITLE,
              a11y: this.nls.LOCK.A11Y
           },
           checked: {
              name: this.nls.UNLOCK.NAME,
              title: this.nls.UNLOCK.TITLE,
              a11y: this.nls.UNLOCK.A11Y
           }
        };
     },

     postCreate: function () {
        this.set("checked", this._isLocked());
     },

     onLinkClicked: function () {
        var newState = !this._isLocked();
        this.file.bean.set("isLocked", newState);

        var isLocked = this._isLocked();

        this.file.bean.update().then(lang.hitch(this, function () {
           this.set("checked", isLocked);

           if (isLocked) {
              topic.publish("ic-fileviewer/push/messages", {
                 type: "success",
                 message: this.nls.LOCK.SUCCESS,
                 cancelable: true
               });
           } else {
              topic.publish("ic-fileviewer/push/messages", {
                 type: "success",
                 message: this.nls.UNLOCK.SUCCESS,
                 cancelable: true
               });
           }
           
           fidoNewRelic.track("toggleLock", {"lockStatus": isLocked});
        }), lang.hitch(this, function(err) {            
           topic.publish("ic-fileviewer/push/messages", {
              type: "error",
              message: this._isLocked() ? (this.nls.UNLOCK.ERROR || "The file could not be unlocked because it has been deleted or is no longer shared with you.") : 
                 (this.nls.LOCK.ERROR || "The file could not be locked because it has been deleted or is no longer shared with you."),
              cancelable: true
            });
        }));
     },

     _isLocked: function () {
        return this.file.bean.get("isLocked");
     }
  });

  return {
     isSubItem: true,

     create: function (args) {
        return new ToggleLockAction(args);
     },

     isValid: function (file) {
        return file.bean.get("fullEntry").then(function () {
           return file.bean.get("permissions").canLock() || file.bean.get("permissions").canUnlock();
         });
     },

     getClassName: function () {
        return "ics-viewer-action-toggleLock";
     }
  };
});
