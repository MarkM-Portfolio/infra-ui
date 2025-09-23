/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/Panel.html",
  "dojo/_base/lang",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-class"
], function (declare, _WidgetBase, _TemplatedMixin, template, lang, i18n, domClass) {

  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    _setTitleAttr: { node: "titleNode", type: "innerHTML" },
    _setFeedLinkAttr: { node: "feedLinkNode", type: "attribute", attribute: "href" },
    _setFeedTextAttr: { node: "feedLinkSpan", type: "innerHTML" },
    _setFeedLinkTitleAttr: { node: "feedLinkNode", type: "attribute", attribute: "title" },
    _setFeedDivClassesAttr: { node: "feedDivNode", type: "attribute", attribute: "class" },

    constructor: function () {
       this.nls = i18n.PANEL;
       this.LOAD_ERROR = this.nls.LOAD_ERROR || "There was an error accessing the metadata of this file.";
       this.feedLink = "";
       this.feedLinkTitle = "";
       this.feedText = "";
       this.blank = this._blankGif;
       this.feedDivClasses = "panelContent panelFeed lotusHidden";
    },

    postMixInProperties: function () {
      this.title = this.factory.get("title");
      
      this.handle = this.factory.watch("title", lang.hitch(this, function () {
        this.set("title", this.factory.get("title"));
      }));
    },
    
    render: function () {
      if (this._isRendered) {
        return;
      }
      this._isRendered = true;
      
      if (this.factory.file.get("loadError")) {
        domClass.remove(this.fileError, "lotusHidden");
      } else {
        this.factory.renderContent(this);
      }
    },

    destroy: function () {
      this.handle.remove();
      this.inherited(arguments);
    }
  });
});
