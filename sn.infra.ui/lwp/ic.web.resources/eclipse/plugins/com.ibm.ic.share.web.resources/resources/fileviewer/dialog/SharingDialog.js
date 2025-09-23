/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/SharingDialog.html",
  "dijit/Dialog",
  "dojo/_base/lang",
  "./DialogAction",
  "dojo/Evented",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "dojox/html/entities",
  "dojo/dom-attr",
  "dijit/registry",
  "dojo/when",
  "../config/globals",
  "dojo/dom-construct"
], function (declare, template, Dialog, lang, DialogAction, Evented, i18n, string, htmlEntities, domAttr, registry, when, globals, domConstruct) {

  return declare([Dialog, Evented], {
    "class": "sharingDialog",
    constructor: function (args) {
      var nls, contentWidget;

      nls = lang.clone(i18n.ACTION.STOP_SHARING);
      if (!lang.getObject("capabilities.canView.communities", false, globals.policy)) {
         nls = nls.EFSS || nls;
      }
      nls.PROMPT = args.promptKey ? nls[args.promptKey] : "";
      if (nls.PROMPT) {
        nls.PROMPT = string.substitute(nls.PROMPT, {
          user: htmlEntities.encode(args.name),
          communityName: htmlEntities.encode(args.name),
          folderName: htmlEntities.encode(args.name)
        });
      } else {
        nls.PROMPT = "";
      }

      contentWidget = new DialogAction({template: template, nls: nls});
      this.title = nls.DIALOG_TITLE;

      contentWidget.clickLink = lang.hitch(this, function (e) {
        if (e.target.id === "ok") {
          this.emit("clicked", {});
          domConstruct.destroy(this.containerNode.parentNode);
        }
        this.onCancel();
      });

      contentWidget.startup();
      this.content = contentWidget;
    },

    postCreate: function () {
      this.inherited(arguments);
      var contentId = registry.getUniqueId("fileviewer") + "_sharingDialogContent";
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