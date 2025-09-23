/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/LinkDialog.html",
  "dijit/Dialog",
  "dojo/_base/lang",
  "./DialogAction",
  "dojo/Evented",
  "../widget/MessageBox",
  "dojo/dom-class",
  "dojo/i18n!../nls/FileViewerStrings",
  "dijit/registry",
  "dojo/dom-construct"
  ], function (declare, template, Dialog, lang, DialogAction, Evented, MessageBox, domClass, i18n, registry, domConstruct) {

  return declare([Dialog, Evented], {
    "class": "linkDialog",
    postMixInProperties: function(args) {
      this.inherited(arguments);

      var contentWidget = new DialogAction({
        template: template,
        nls: i18n.ACTION.GET_LINKS,
        fileLink: this.file.get("alternateUrl"),
        filePreview: ("" + this.file.get("thumbnailUrl")).replace("renditionKind=mediumview", "renditionKind=largeview").replace("/basic/", "/form/"),
        fileDownload: ("" + this.file.get("downloadUrl")).replace("/basic/", "/form/"),
        fileLinkInputId: registry.getUniqueId("fileviewer") + "_link_dialog_file",
        previewLinkInputId: registry.getUniqueId("fileviewer") + "_link_dialog_preview",
        downloadLinkInputId: registry.getUniqueId("fileviewer") + "_link_dialog_download"
      });

      this.title = i18n.ACTION.GET_LINKS.DIALOG_TITLE;

      contentWidget.clickLink = lang.hitch(this, function (e) {
        if (e.target.id === "ok") {
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
      if(!this.file.get("thumbnailUrl")) {
        domClass.add(this.domNode, "hidePreview");
      }
    },
    onCancel: function () {
      this.emit("close");
      this.inherited(arguments);
      domConstruct.destroy(this.containerNode.parentNode);
    }
  });
});