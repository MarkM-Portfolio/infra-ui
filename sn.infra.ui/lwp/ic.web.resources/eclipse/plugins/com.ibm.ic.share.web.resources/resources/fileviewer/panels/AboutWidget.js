/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "./EntryWidget",
  "dojo/dom-construct",
  "dojo/on",
  "../dialog/LinkDialog",
  "dojox/html/entities"
], function(declare, lang, EntryWidget, domConstruct, on, LinkDialog, entities) {
  return declare([ EntryWidget ], {
    postMixInProperties : function() {
      this.baseClasses = "about " + this.entry.baseClasses;
      this.DialogFactory = LinkDialog;

      this.h1 = this.entry.h1 || "";
      if (!this.entry.links) {
        this.h2 = this.entry.h2 || "";
      } else {
        this.h2 = "";
      }
      this.h3 = this.entry.h3 || "";
      this.content = this.entry.content || "";
      this.footer = this.entry.footer || "";
    },
    postCreate : function() {
      this.inherited(arguments);
      if (this.entry.links) {
        this._setDialogLink(this.entry.h2, this.h2Node);
      }
      if (this.entry.content) {
        this.set("content", entities.encode(this.entry.content));
      }
    },
    _setDialogLink: function(initialValue, parent) {
      var dialogLink = domConstruct.create("a", {
        innerHTML: initialValue,
        href: "javascript:;",
        role: "button"
      }, parent);
      
      on(dialogLink, "click", lang.hitch(this, this._dialogHandler));
    },
    createDialog: function (args) {
      this.dialog = new this.DialogFactory(args);
      this.dialog.placeAt(document.body);
      this.dialog.startup();
      this.dialog.show();
    },
    _dialogHandler: function () {
      this.createDialog({ file: this.entry.file });
    }
  });
});
