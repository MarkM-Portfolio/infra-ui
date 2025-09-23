/* Copyright IBM Corp. 2014, 2016  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/dom-class",
  "./Action",
  "../widget/EditBox",
  "../util/validation",
  "../util/network",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/topic",
  "../util/ModerationUtil",
  "../util/fidoNewRelic",
  "dojox/html/entities"
], function (declare, lang, domClass, Action, EditBox, validation, network, i18n, topic, moderationUtil, fidoNewRelic, entities) {
  "use strict";

  var EditDescriptionAction = declare([Action], {
    postMixInProperties: function () {
      this.nls = i18n.ACTION.EDIT_DESCRIPTION;
    },
    
    onLinkClicked: function () {
      var editBox = this._editBox = new EditBox();
      editBox.descriptionBox = true;
      domClass.remove(editBox.descriptionControlsContainer, "lotusHidden");
      editBox.set("value", this.file.get("summary"));
      this.widget.set("content", editBox);
      editBox.focus();
      
      editBox.on("save", lang.hitch(this, this._onSave));
      editBox.on("cancel", lang.hitch(this, this._onCancel));
      
      domClass.add(this.widget.domNode, "editing");
    },
    
    _onSave: function () {
      this._editBox.setErrorMessage("");
      
      if (!validation.validateDescription(this._editBox)) {
        return;
      }
      
      this.file.set("summary", this._editBox.get("value"));
      this.file.update().then(lang.hitch(this, this._onSuccess), lang.hitch(this, this._onError));
      fidoNewRelic.track("editDescription");
    },
    
    _onCancel: function () {
       this.widget.set("content", entities.encode(this.file.get("summary")));
       domClass.remove(this.widget.domNode, "editing");
    },
    
    _onSuccess: function () {
      this.widget.set("content", entities.encode(this.file.get("summary")));
      domClass.remove(this.widget.domNode, "editing");

      if (this.file.get("status") == "pending") {
         moderationUtil.launchModerationDialog();
      }
    },
    
    _onError: function (error) {
      this._editBox.setErrorMessage(network.getErrorMessage(error, this.nls.ERROR));
    },

    _closeFile: function() {
        topic.publish("ic-fileviewer/dirty");    	
        topic.publish("ic-fileviewer/action/completed");
    }
  });

  return {
    create: function (args) {
      return new EditDescriptionAction(args);
    },

    isValid: function (file) {
      return file.get("fullEntry").then(function () {
        return file.get("permissions").canEdit();
      });
    },

    getClassName: function () {
      return "";
    }
  };
});
