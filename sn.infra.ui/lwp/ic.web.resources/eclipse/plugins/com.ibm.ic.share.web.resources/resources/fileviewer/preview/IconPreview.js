/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/IconPreview.html",
   "dojo/_base/config",
   "dojo/i18n!../nls/FileViewerStrings",
   "./util",
   "../util/FileDraftTracker",
   "../config/documentTypes",
   "dojo/_base/array"
], function (declare, _WidgetBase, _TemplatedMixin, template, config, i18n, util, FileDraftTracker, documentTypes, array) {
   "use strict";

   var IconPreview = declare([ _WidgetBase, _TemplatedMixin ], {
      templateString: template,
      previewId: "icon",

      postMixInProperties: function () {
         this.blank = config.blankGif || dijit._WidgetBase.prototype._blankGif;
         this.iconClass = util.getIconClass(this.file.args, 64);
         this.noPreviewMessage = !!this.userMessage ? this.userMessage : i18n.PREVIEW.ICON.PREVIEW_NOT_AVAILABLE;
         this.model = this.file.bean;
         
         if (array.indexOf(documentTypes.edit, this.file.args.type) > -1) {
            FileDraftTracker.init({file: this.file});
         }
      },

      _stopProp: function (evt) {
         evt.stopPropagation();
      }
   });

   return {
      create: function (args) {
         return new IconPreview(args);
      },

      isValid: function () {
         return true;
      }
   };
});
