/* Copyright IBM Corp. 2015, 2016  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/ConfirmationDialog.html",
  "dijit/Dialog",
  "dojo/_base/lang",
  "dojo/dom-attr",
  "dijit/registry",
  "./DialogAction",
  "dojo/Evented",
  "../widget/MessageBox",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-construct",
  "../util/html",
  "dojo/dom-style",
  "dojo/html",
  "dojo/on"
  ], function (declare, template, Dialog, lang, domAttr, registry, DialogAction, Evented, MessageBox, i18n,
     domConstruct, htmlUtil, domStyle, html, on) {

  /**
   * ConfirmationDialog is a generic dialog which simply displays
   * a message prompt with an OK and Cancel button.
   *
   * ConfirmationDialog implements dojo/Dialog and dojo/Evented. It is on the consumer
   * to listen to the events emitted by the dialog on an 'OK' or 'Cancel' click in
   * order to handle them.
   *
   * If the consumer does not pass in strings to use, generic strings will be used.
   */
  return declare([Dialog, Evented], {
    "class": "confirmationDialog",

    constructor: function(args) {
      this.strings = lang.clone(args.strings || i18n.CONFIRMATION_DIALOG);

      if (!this.strings.OK) {
        this.strings.OK = i18n.CONFIRMATION_DIALOG.OK;
      }
      if (!this.strings.CANCEL) {
        this.strings.CANCEL = i18n.CONFIRMATION_DIALOG.CANCEL;
      }

      var contentWidget = new DialogAction({template: template, nls: this.strings});
      this._set("title", this.strings.DIALOG_TITLE);

      contentWidget.clickLink = lang.hitch(this, function (e) {
        if (e.target.id === "ok") {
          this._errorBox.removeMessage();

          this.emit("clicked", {});
        } else if (e.target.id === "cancel") {
          this.onCancel();
        }
      });

      contentWidget.startup();
      this.content = contentWidget;
    },

    postCreate: function () {
      this.inherited(arguments);

      var contentId = registry.getUniqueId("fileviewer") + "_confirmationDialogContent";
      domAttr.set(this.domNode, "aria-label", this._get("title"));
      domAttr.set(this.domNode, "aria-describedBy", contentId);
      domAttr.set(this.content.promptContainer, "id", contentId);
      html.set(this.content.promptSpan, this.strings.PROMPT);

      var msgArgs = {type: "error"};
      this._errorBox = MessageBox.create(msgArgs);
      this._errorBox._hide();
      this._errorBox.placeAt(this.content.errorContainer);

      if (this.strings.PROMPT2) {
        domConstruct.create("br", null, this.content.promptContainer);
        domConstruct.create("br", null, this.content.promptContainer);
        var promptNode = domConstruct.create("span", null, this.content.promptContainer);
        htmlUtil.setText(promptNode, this.strings.PROMPT2);
      }

      if (this.showOkRight) {
        var okRightButton = domConstruct.create("a", {
          className: "confirm bad ics-viewer-ok-button",
          href: "javascript:;",
          id: "ok_right",
          role: "button"
        }, this.content.buttonContainer);
        htmlUtil.setText(okRightButton, this.strings.OK);
        domStyle.set(this.content.okButton, "display", "none");

        on(okRightButton, "click", lang.hitch(this, function() {
          this._errorBox.removeMessage();
          this.emit("clicked", {});
        }));
      }

      if (this.hideOk) {
        domStyle.set(this.content.okButton, "display", "none");
      }
    },

    showError: function (errorString) {
      this._errorBox.setMessage(errorString);
    },

    render: function () {
      this.placeAt(document.body);
      this.startup();
      this.show();
    },

    onCancel: function () {
      this.emit("close");
      this.inherited(arguments);
    }
  });
});