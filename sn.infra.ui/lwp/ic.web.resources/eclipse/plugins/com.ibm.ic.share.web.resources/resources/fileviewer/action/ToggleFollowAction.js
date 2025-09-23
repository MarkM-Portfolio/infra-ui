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
  "../util/network",
  "../util/fidoNewRelic"
], function (declare, lang, ToggleAction, i18n, domClass, when, globals, topic, networkUtil, fidoNewRelic) {
  "use strict";

  var initialFollowState;
  var ToggleFollowAction = declare([ToggleAction], {
    groupId: 1,
    
    postMixInProperties: function () {
      this.nls = i18n.ACTION.TOGGLE_FOLLOW || {};
      this.errorStrings = i18n.ACTION.TOGGLE_FOLLOW.ERROR;
      this.toggleStrings = {
        unchecked: {
          name: this.nls.FOLLOW_NAME,
          title: this.nls.FOLLOW_TOOLTIP,
          a11y: this.nls.FOLLOW_A11Y
        },
        checked: {
          name: this.nls.STOP_FOLLOWING_NAME,
          title: this.nls.STOP_FOLLOWING_TOOLTIP,
          a11y: this.nls.STOP_FOLLOWING_A11Y
        }
      };
      this.topic = topic;
    },

    postCreate: function () {
      this.set("checked", this._isFollowing());
      
      if (initialFollowState !== undefined) {
        this._updateFollowState(initialFollowState);
        initialFollowState = undefined;
      }
    },
    
    onLinkClicked: function () {
      this._updateFollowState(!this._isFollowing());
      fidoNewRelic.track("toggleFollow", {"followingStatus": this._isFollowing()});
    },
    
    _updateFollowState: function (newFollowState) {
      this.file.bean.set("mediaNotifications", newFollowState);
      this.file.bean.set("commentNotifications", newFollowState);
      
      this.file.bean.update({updateFromResponse: false}).then(lang.hitch(this, function () {
         var updatedState = this._isFollowing();
         this.set("checked", updatedState);
         this._successMessage(updatedState);
      }), lang.hitch(this, this._onError, newFollowState));
    },
    
    _onError: function(followState, error) {
        var errorTypeStrings = followState ? this.errorStrings.FOLLOW : this.errorStrings.UNFOLLOW;
        var errorMessage = networkUtil.getErrorMessage(error, errorTypeStrings);
        topic.publish("ic-fileviewer/push/messages", {
        type: "error",
        message: errorMessage,
        cancelable: true
       });
    },
    
    _successMessage: function(followState) {
       var messageText = followState ? this.nls.FOLLOW_SUCCESS : this.nls.STOP_FOLLOWING_SUCCESS;
       topic.publish("ic-fileviewer/push/messages", {
       type: "success",
       message: messageText,
       cancelable: true
       });
    },
    
    _isFollowing: function () {
       return this.file.bean.get("mediaNotifications") || this.file.bean.get("commentNotifications");
    }
  });

  return {
    isSubItem: true,

    create: function (args) {
      return new ToggleFollowAction(args);
    },

    isValid: function (file) {
      return when(globals.policy).then(lang.hitch(this, function (policy) {
        var isGuest = lang.getObject("currentUser._native.isGuest", false, globals);
        return !isGuest && policy && !!policy.contentFollowing;
      }));
    },

    getClassName: function () {
      return "ics-viewer-action-toggleFollow";
    },
    
    setInitialFollowState: function (initialState) {
      initialFollowState = initialState;
    }
  };
});
