/* Copyright IBM Corp. 2016  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./UploadWidget",
   "dojo/_base/lang",
   "dojo/text!./templates/NewVersionWidget.html",
   "dojo/dom-attr",
   "dojo/dom-class",
   "dojo/on",
   "dojo/i18n!../nls/FileViewerStrings",
   "./EditBox",
   "../util/validation",
   "dijit/registry",
   "dijit/focus",
   "./UploadingVersionWidget",
   "dojo/dom-construct",
   "dijit/ProgressBar",
   "dojo/has",
   "dojo/query",
   "dojo/string",
   "../config/globals"
], function (declare, UploadWidget, lang, template, domAttr, domClass, on, i18n, EditBox, validation, registry, focusUtil, 
            UploadingVersionWidget, domConstruct, ProgressBar, has, query, string, globals) {

   var NewVersionWidget = declare([ UploadWidget ], {
      templateString: template,

      postMixInProperties: function () {
         this.nls = i18n.UPLOAD_VERSION;
         if (!this.nls.CANCEL_UPLOAD) {
            this.nls.CANCEL_UPLOAD = "Cancel upload";
         }
         if (!this.nls.PROGRESS_BAR_TITLE) {
            this.nls.PROGRESS_BAR_TITLE = "Uploading new version (${uploaded} of ${total} complete)";
         }
      },

      postCreate: function () {
         this._disableButton(this.upload);
         if (!this.preserveMessage) {
            this.preserveMessage = "";
         }
         this.formFile.id = registry.getUniqueId("fileviewer") + "_versionTextBox";
         domAttr.set(this.uploadNodeLabel, "for", this.formFile.id);
         domAttr.set(this.uploadNodeLabel, "innerHTML", this.nls.LINK);
      },

      setupMessageBox: function () {
         if (this.expandableEditBox) {
           return;
         }
        
         var textBoxArgs = {widgetType: "versions"};
         this.expandableEditBox = new EditBox(textBoxArgs);
         this.expandableEditBox.placeAt(this.changeSummary);
         domClass.add(this.expandableEditBox.textBox, "transition");

         this.expandableEditBox.set("hintText", this.nls.CHANGE_SUMMARY);

         if (this.preserveMessage === "") {
            this.expandableEditBox.set("value", this.expandableEditBox.get("hintText"));
            domClass.add(this.expandableEditBox.textBox, "hintText");
         } else {
            this.expandableEditBox.set("value", this.preserveMessage);
         }

         on(this.expandableEditBox.textBox, "focus", lang.hitch(this, function () {
            domClass.remove(this.expandableEditBox.textBox, "hintText");

            if (this.expandableEditBox.get("value") === this.expandableEditBox.get("hintText")) {
               this.expandableEditBox.set("value", "");
            }
         }));

         on(this.expandableEditBox.textBox, "blur", lang.hitch(this, function () {
            if (this.expandableEditBox.get("value") === "") {
               this.preserveMessage = "";
               domClass.add(this.expandableEditBox.textBox, "hintText");
               this.expandableEditBox.set("value", this.expandableEditBox.hintText);
            } else {
               this.preserveMessage = this.expandableEditBox.get("value");
            }
         }));
      },

      validateFilename: function (filename, successCallback) {
         var oldFilename = NewVersionWidget._breakFilename(this.file.get("name")),
            newFilename = NewVersionWidget._breakFilename(filename),
            uploadAs;

         if (oldFilename.ext.toLowerCase() !== newFilename.ext.toLowerCase()) {
            domAttr.set(this.upload, "innerHTML", this.nls.UPLOAD_AND_CHANGE_EXTENSION);
            uploadAs = oldFilename.base + "." + newFilename.ext;
         } else {
            domAttr.set(this.upload, "innerHTML", this.nls.UPLOAD);
            uploadAs = oldFilename.base + "." + oldFilename.ext;
         }

         domAttr.set(this.label, "value", uploadAs);
         domAttr.set(this.title, "value", uploadAs);

         successCallback();
      },

      validateInput: function (successCallback) {
         if (validation.validateDescription(this.expandableEditBox, { maxLength: 1023 })) {
            successCallback();
         }
      },

      getUploadUrl: function () {
         var url = "{entry}?sendNotification=true&createVersion=true&opId=replace%2C{fileId}%2C{newTimestamp}" +
            "&format=html&X-Method-Override=PUT&If-Match={fileId}";

         return lang.replace(url, {
            entry: this.file.get("entryUrl"),
            fileId: this.file.get("id"),
            oldTimestamp: this.file.get("dateModified").getTime(),
            newTimestamp: (new Date()).getTime()
         });
      },

      _onSubmit: function () {
         domAttr.set(this.formChangeSummary, "value", this.preserveMessage);
         this.inherited(arguments);

         this.newVersionLink = query(".ics-viewer-upload-new-version")[0];
         this.newVersionSize =  this.form.elements.file.files[0].size;
         this._removeUploadForm();
         this._createProgressBar();
      },
      
      _createProgressBar: function() {
         var uploadArgs = {
            currentFile: this.file,
            summary: this.preserveMessage,
            uploadFile: this.form.elements.file.files[0]
         };
         
         this.uploadingVersionWidget = new UploadingVersionWidget(uploadArgs);
         domConstruct.place(this.uploadingVersionWidget.domNode, this.versionEntry, "first");
         domClass.remove(this.uploadingVersionDiv, "lotusHidden");
         var progressDiv = domConstruct.create("div");
         this.progressBar = new ProgressBar({}, this.progressDiv);
         this.progressBarHandle = this.on("_progressUpdate", lang.hitch(this, this._updateProgressBar, this.progressBar));
         this.on("error", lang.hitch(this, this._resetPanelUI));
         this.progressBar.placeAt(this.uploadingVersionWidget.domNode);
         this._setProgressBarTitle(this.progressBar, 0);
      },
      
      _disconnectListeners: function() {
         this.progressBar.destroy();
         this.uploadingVersionWidget.destroy();
         this.progressBarHandle.remove();
      },
      
      _resetPanelUI: function(cancelUpload) {
         this._disconnectListeners();
         if (cancelUpload) {
            domClass.add(this.uploadingVersionDiv, "lotusHidden");
            this._onCancel();
            this._enableButton(this.cancel);
         } else {
            domClass.add(this.newVersionLink, "lotusHidden");
            domClass.remove(this.form, "lotusHidden");
            this._enableButton(this.upload);
         }
      },
      
      _removeUploadForm: function() {
         domClass.add(this.form, "lotusHidden");
         domClass.remove(this.newVersionLink, "lotusHidden");
         this._disableButton(this.newVersionLink);
      },
      
      _updateProgressBar: function(progressBar, bytesComplete) {
         var pcomplete = this._getPercentCompleted(this.newVersionSize, bytesComplete);
         progressBar.set({value: pcomplete});
         this._setProgressBarTitle(progressBar, bytesComplete);
      },
      
      _setProgressBarTitle: function(progressBar, bytesComplete) {
         var uploadedSize = globals.formatFileSize(parseInt(bytesComplete));
         var totalSize = globals.formatFileSize(parseInt(this.newVersionSize));
         var progressTitle = string.substitute(this.nls.PROGRESS_BAR_TITLE, {uploaded: uploadedSize, total: totalSize});
         progressBar.set({title: progressTitle});
      },
      
      _getPercentCompleted: function(totalSize, bytesComplete) {
         return Math.floor(100 * (bytesComplete / totalSize)); //add error checking
      },

      _onUploaded: function () {
         if (this.expandableEditBox) {
            this.expandableEditBox.destroy();
            this.expandableEditBox = undefined;
         }

         this.preserveMessage = "";
         this.inherited(arguments);
      },

      _onCancel: function () {
         domAttr.set(this.upload, "innerHTML", this.nls.UPLOAD);
         if (this.expandableEditBox) {
            this.expandableEditBox.destroy();
            this.expandableEditBox = undefined;
         }

         this.preserveMessage = "";
         this.inherited(arguments);

         if (this.newVersionLink) {
            this._enableButton(this.newVersionLink);
         }
      },
      
      hasChanges: function () {
        return this.inherited(arguments) || !domClass.contains(this.expandableEditBox.textBox, "hintText");
      },
      
      show: function() {
        this.inherited(arguments);
        this.focus();
      },
      
      focus: function() {
        setTimeout(lang.hitch(this, function(){
          focusUtil.focus(this.formFile);
        }), 20);  //Fixes DOM not focusing in FF
      }
   });

   NewVersionWidget.isValid = function (file) {
      return file.get("permissions").canEdit();
   };

   NewVersionWidget._breakFilename = function (filename) {
      var index = filename.lastIndexOf(".");

      if (index === -1) {
         index = filename.length;
      }

      return {
         base: filename.slice(0, index),
         ext: filename.slice(index + 1)
      };
   };

   return NewVersionWidget;
});