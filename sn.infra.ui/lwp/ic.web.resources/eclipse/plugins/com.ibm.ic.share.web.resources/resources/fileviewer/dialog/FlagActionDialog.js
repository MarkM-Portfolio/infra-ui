/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/FlagActionDialog.html",
  "dijit/Dialog",
  "dojo/_base/lang",
  "./DialogAction",
  "dojo/Evented",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "dojo/dom-attr",
  "dijit/registry",
  "../widget/EditBox"
], function (declare, template, Dialog, lang, DialogAction, Evented, i18n, string, domAttr, registry, EditBox) {

  return declare([Dialog, Evented], {
    "class": "flagActionDialog",

    constructor: function (args) {
      var nls, contentWidget;
      
      nls = args.strings || {};

      contentWidget = new DialogAction({template: template, nls: nls});
      this.title = nls.TITLE;

      contentWidget.clickLink = lang.hitch(this, function (e) {
        if (e.target.id === "ok") {
          this.emit("clicked", {summary: this.summaryBox.get("value")});
        }
        this.onCancel();
      });

      contentWidget.startup();
      this.content = contentWidget;
      this.summaryBox = new EditBox();
      this.summaryBox.placeAt(this.content.summaryContainer);
    },

    postCreate: function () {
      this.inherited(arguments);
      var contentId = registry.getUniqueId("fileviewer") + "_flagActionDialogContent";
      domAttr.set(this.domNode, "aria-label", this._get("title"));
      domAttr.set(this.domNode, "aria-describedBy", contentId);
      domAttr.set(this.content.promptContainer, "id", contentId);
    },

    onCancel: function () {
      this.emit("close");
      this.inherited(arguments);
    }
  });
});