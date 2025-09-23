/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/VersionDialog.html",
  "dijit/Dialog",
  "dojo/_base/lang",
  "./DialogAction",
  "dojo/Evented",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "dojo/dom-attr",
  "dijit/registry",
  "dojo/dom-construct"
], function (declare, template, Dialog, lang, DialogAction, Evented, i18n, string, domAttr, registry, domConstruct) {

  return declare([Dialog, Evented], {
    "class": "versionDialog",

    constructor: function (args) {
      var nls, contentWidget;

      nls = lang.clone(args.action === "remove" ? i18n.ACTION.DELETE_VERSION : i18n.ACTION.RESTORE_VERSION);
      nls.PROMPT = string.substitute(nls.PROMPT, { version: args.version });
      nls.DELETE_PRIOR = i18n.ACTION.DELETE_VERSION.DELETE_PRIOR;

      contentWidget = new DialogAction({template: template, nls: nls});
      this.title = i18n.ACTION.STOP_SHARING.DIALOG_TITLE;

      contentWidget.clickLink = lang.hitch(this, function (e) {
        var deleteFrom = this.content.deleteFromOption.checked;
        if (e.target.id === "ok") {
          this.emit("clicked", {deleteFrom: deleteFrom});
          domConstruct.destroy(this.containerNode.parentNode);
        }
        this.onCancel();
      });

      contentWidget.startup();
      this.content = contentWidget;

      if (args.isLast) {
         this["class"] += " ics-version-last";
      }
    },

    postCreate: function () {
      this.inherited(arguments);
      var contentId = registry.getUniqueId("fileviewer") + "_versionDialogContent";
      domAttr.set(this.domNode, "aria-label", this._get("title"));
      domAttr.set(this.domNode, "aria-describedBy", contentId);
      domAttr.set(this.content.promptContainer, "id", contentId);
    },

    onCancel: function () {
      this.emit("close");
      this.inherited(arguments);
      domConstruct.destroy(this.containerNode.parentNode);
    }
  });
});