/* Copyright IBM Corp. 2015, 2017  All Rights Reserved. */

define([
   "dojo/_base/declare",
   "./UploadWidget",
   "dojo/_base/lang",
   "dojo/text!./templates/ThumbnailWidget.html",
   "dojo/dom-attr",
   "dojo/string",
   "dojo/i18n!../nls/FileViewerStrings",
   "../data/util/routes",
   "./util/ThumbnailWidgetUtil",
   "dijit/registry",
   "dojo/sniff"
], function (declare, UploadWidget, lang, template, domAttr, string, i18n, routes, ThumbnailWidgetUtil, registry, has) {
   "use strict";

   var ThumbnailWidget = declare([ UploadWidget ], {
      templateString: template,

      postMixInProperties: function () {
         this.nls = i18n.THUMBNAIL;
         var exts = ThumbnailWidgetUtil.get.validPhotoExts();
         var seperator = ThumbnailWidgetUtil.constants.EXTS_SEPARATOR;
         var formattedExtsString = exts.split(seperator).join(seperator + ' ');
         this.formattedExtsError = string.substitute(this.nls.EXT_ERROR, [formattedExtsString]);
      },

      postCreate: function () {
         this._disableButton(this.upload);
         domAttr.set(this.renditionKind, "value", ThumbnailWidgetUtil.constants.DEFAULT_RENDITION_KIND);
         this.formFile.id = registry.getUniqueId("fileviewer") + "_changeThumbnailInputBox";
         domAttr.set(this.uploadNodeLabel, "for", this.formFile.id);
         domAttr.set(this.uploadNodeLabel, "innerHTML", this.nls.CHANGE_LINK);

         /*
          * Firefox, Chrome, and IE support passing extensions to the "accept" attribute.  That is ideal because we will
          * validate the selected file based on the extension, so this is guaranteed to recommend a file if and only if
          * that file will pass our validation.
          * 
          * Safari only accepts passing mime types to the "accept" attribute.  That is not ideal because it will allow
          * additional, unsupported files to be selected.  But it is still better than nothing because it will hide many
          * unsupported files while still recommending all supported files.
          * 
          * Most other browsers will ignore the attribute entirely.  However, some browsers (e.g., Android Mobile and IE
          * mobile), will (supposedly) disable the input field if the attribute is defined.  So if we cannot be sure
          * that the user's browser will support the attribute, we will just omit it.
          * 
          * More details: http://caniuse.com/#feat=input-file-accept
          */ 
         if (has("ff") || has("chrome") || has("ie") || has("trident")) {
            domAttr.set(this.formFile, "accept", ".gif, .jpg, .jpeg, .png");
         } else if (has("safari")) {
            domAttr.set(this.formFile, "accept", "image/*");
         }
      },

      validateFilename: function (filename, successCallback) {
         if (ThumbnailWidgetUtil.isValidThumbnailExt(filename)) {
            domAttr.set(this.label, "value", filename);
            domAttr.set(this.title, "value", filename);

            successCallback();
         } else {
            this._extensionError(new Error("The selected filename does not have a supported extension: " + filename));
         }
      },

      getUploadUrl: function () {
         return lang.replace(ThumbnailWidgetUtil.constants.UPLOAD_URL_TEMPLATE, {
            fileFeed: routes.getFileFeedUrl(this.file)
         });
      },
      
      _extensionError: function (error) {
         this.emit("error", {message: this.formattedExtsError, source: error});
      }
   });

   ThumbnailWidget.isValid = ThumbnailWidgetUtil.isValid;

   return ThumbnailWidget;
});