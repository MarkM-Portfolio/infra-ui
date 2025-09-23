/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/Action.html",
  "dojo/_base/config",
  "dojo/dom-attr",
  "dojo/html",
  "dijit/focus",
  "dojo/dom-class"
], function (declare, _WidgetBase, _TemplatedMixin, template, config, domAttr, html, focus, domClass) {

  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    _setNameAttr: { node: "linkText", type: "innerHTML" },
    _setA11yAttr: { node: "describedBy", type: "innerHTML" },

    constructor: function () {
      this.blank = config.blankGif || dijit._WidgetBase.prototype._blankGif;
      this.title = "";
      this.name = "";
      this.a11y = "";
      this.href = "javascript:;";
    },

    onLinkClicked: function () {
      return;
    },

    focus: function () {
      focus.focus(this.link);
    },

    _setTitle: function (text) {
      this.title = text;
      domAttr.set(this.link, "title", text);
      html.set(this.altText, text);
    },

    _setTitleAttr: function (text) {
      this._setTitle(text);
    },
    
    hide: function () {
      if (this.parentNode)
        domClass.add(this.parentNode, "lotusHidden");
    },
    
    show: function () {
      if (this.parentNode)
        domClass.remove(this.parentNode, "lotusHidden");
    },

    set: function (key) {
       if (key !== "parentNode") {
          this.inherited(arguments);
       }
    }
  });
});
