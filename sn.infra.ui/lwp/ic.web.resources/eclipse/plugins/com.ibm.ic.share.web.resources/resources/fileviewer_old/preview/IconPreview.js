/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/IconPreview.html",
   "dojo/_base/config",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "./util",
   "dojo/string"
], function (declare, _WidgetBase, _TemplatedMixin, template, config, i18n, util, string) {
   "use strict";

   var IconPreview = declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,

      postMixInProperties: function () {
         this.blank = config.blankGif || "";
         this.iconClass = util.getIconClass(this.file.args, 64);

         this.text = string.substitute(i18n.PREVIEW.ICON.PREVIEW_NOT_AVAILABLE, {
            filename: this.file.args.name
         });
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
