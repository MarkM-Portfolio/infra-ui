/* Copyright IBM Corp. 2015, 2017  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/RoundtripEditDialog.html",
  "dijit/Dialog",
  "dojo/_base/lang",
  "dojo/dom-attr",
  "dijit/registry",
  "./DialogAction",
  "dojo/Evented",
  "dojo/when",
  "dojo/Deferred",
  "../widget/MessageBox",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-construct",
  "dojo/html",
  "dojo/dom-style",
  "dojo/dom-class",
  "dojo/cookie",
  "dijit/focus",
  "dojo/string",
  "../config/globals"
  ], function (declare, template, Dialog, lang, domAttr, registry, DialogAction, Evented, when, deferred, MessageBox, i18n, 
     domConstruct, htmlUtil, domStyle, domClass, cookie, focusUtil, string, globals) {

  return declare([Dialog, Evented], {
    "class": "roundtripEditDialog",

    constructor: function(args) {
      var contentWidget = new DialogAction({template: template, nls: args.strings});
      this.nls = args.strings;
      this._set("title", args.strings.DIALOG_TITLE);

      contentWidget.clickLink = lang.hitch(this, function (e) {
        if (e.target.id === "ok") {
          this._errorBox.removeMessage();
          this._checkSkipDialogOption();
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

      var contentId = registry.getUniqueId("fileviewer") + "_RoundtripEditDialogContent";
      domAttr.set(this.domNode, "aria-label", this._get("title"));
      domAttr.set(this.domNode, "aria-describedBy", contentId);
      domAttr.set(this.content.promptContainer, "id", contentId);
      
      var msgArgs = {type: "error"};
      this._errorBox = MessageBox.create(msgArgs);
      this._errorBox._hide();
      this._errorBox.placeAt(this.content.errorContainer);
      
      when(globals.baseFilesConfig).then(lang.hitch(this, function(results) {
         if (lang.getObject("lconn.files.config.features.fileSync.clientDownloadLinkEnabled")) {
            var url = lang.getObject("lconn.files.config.features.fileSync.clientDownloadLink");
            var newString = string.substitute(this.nls.INSTALL,{
               "startLink": '<a target="_blank" href="' + url + '"><span class="lotusAccess">',
               "endLink": '</span></a>'
            });
            htmlUtil.set(this.content.promptLink, newString);
            domClass.add(this.content.promptLink, "display");
         }
    }));
    },

    _checkSkipDialogOption: function() {
      if(this.content.skipDialogOption.checked) {
        cookie("com.ibm.ic.share.fileviewer.skipRoundTripDialog", "true", { expires: 365 });
      }
    },
    
    showError: function (errorString) {
      this._errorBox.setMessage(errorString);
    },

    onCancel: function () {
      this.emit("close");
      this.inherited(arguments);
    }
  });
});