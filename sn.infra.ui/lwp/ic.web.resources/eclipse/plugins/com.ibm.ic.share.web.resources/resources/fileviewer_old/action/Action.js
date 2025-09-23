/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/Action.html",
   "dojo/_base/config",
   "dojo/dom-attr",
   "dojo/html",
   "dijit/focus"
], function (declare, _WidgetBase, _TemplatedMixin, template, config, domAttr, html, focus) {
   "use strict";

   return declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,

      constructor: function () {
         this.blank = config.blankGif || "";
         this.title = "";
         this.name = "";
      },

      onLinkClicked: function () {
         return;
      },

      focus: function () {
         focus.focus(this.link);
      },

      _setTitle: function (text) {
         domAttr.set(this.link, "title", text);
         domAttr.set(this.img, "alt", text);
         html.set(this.altText, text);
      }
   });
});
