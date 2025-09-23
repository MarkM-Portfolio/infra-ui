/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/CommentDialog.html",
  "dijit/Dialog",
  "dojo/_base/lang",
  "./DialogAction",
  "dojo/Evented",
  "../widget/MessageBox",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-attr",
  "dijit/registry",
  "dojo/dom-construct"
  ], function (declare, template, Dialog, lang, DialogAction, Evented, MessageBox, i18n, domAttr, registry, domConstruct) {

  return declare([Dialog, Evented], {
    "class": "commentDialog",
    constructor: function(args) {
      var contentWidget = new DialogAction({template: template, nls: i18n.ACTION.DELETE_COMMENT});
      this.title = i18n.ACTION.DELETE_COMMENT.DIALOG_TITLE;

      contentWidget.clickLink = lang.hitch(this, function (e) {
        if (e.target.id === "ok") {
          this.emit("clicked", {});
          domConstruct.destroy(this.containerNode.parentNode);
        } else if (e.target.id === "cancel") {
          this.onCancel();
        }
      });

      contentWidget.startup();
      this.content = contentWidget;
    },

    showError: function (errorString) {
      this._errorBox.setMessage(errorString);
    },
    
    postCreate: function () {
      this.inherited(arguments);
      
      var contentId = registry.getUniqueId("fileviewer") + "_commentDeleteDialog"
      domAttr.set(this.domNode, "aria-label", this._get("title"));
      domAttr.set(this.domNode, "aria-describedBy", contentId);
      domAttr.set(this.content.promptContainer, "id", contentId);
      
      var msgArgs = {type: "error"};
      this._errorBox = MessageBox.create(msgArgs);
      this._errorBox._hide();
      this._errorBox.placeAt(this.content.errorContainer);
    },

    onCancel: function () {
      this.emit("close");
      this.inherited(arguments);
      domConstruct.destroy(this.containerNode.parentNode);
    }
  });
});