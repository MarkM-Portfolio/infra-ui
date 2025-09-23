/* Copyright IBM Corp. 2015, 2016  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-attr",
   "dojo/dom-class",
   "dojo/_base/json",
   "dojo/request",
   "dojo/request/iframe",
   "dojo/Evented",
   "dijit/_TemplatedMixin",
   "dijit/_WidgetBase",
   "../data/util/routes",
   "dojo/topic",
   "../util/ModerationUtil",
   "dojo/has",
   "../config/globals",
   "dojo/string",
   "dojo/keys",
   "dojo/when",
   "./MessageBox",
   "dojo/dom-construct"
], function (declare, lang, domAttr, domClass, json, request, iframe, Evented, _TemplatedMixin, _WidgetBase, routes,
    topic, moderationUtil, has, globals, string, keys, when, MessageBox, domConstruct) {
   "use strict";

   var uploadProcess = null;
   var configUtil = lang.getObject("lconn.share.util.configUtil");

   /**
    * UploadWidget is an abstract class
    */
   return declare([ _WidgetBase, _TemplatedMixin, Evented ], {
      MOCK_PATH_REGEX: /(\\|\/)/g,
      GET_NONCE_OPTIONS: {
         method: 'GET',
         handleAs: 'text'
      },
      POST_FORM_OPTIONS: {
         method: 'POST',
         form: {}, 
         handleAs:"html"
      },

      _onSelected: function (event) {
         this._disableButton(this.upload);

         var mockPath = domAttr.get(this.formFile, "value"),
            filename = mockPath.split(this.MOCK_PATH_REGEX).pop();

         this.validateFilename(filename, lang.hitch(this, "_enableButton", this.upload));
         this.validateFileSize();
      },

      _onSubmit: function (event) {
         this.emit("submit", event);
         this.validateInput(lang.hitch(this, "_submit"));
      },

      _submit: function () {
         this._disableButton(this.upload);
         this._disableButton(this.cancel);
         var filesNonceUrl = routes.getFilesNonceUrl();
         request(filesNonceUrl, this.GET_NONCE_OPTIONS).then(lang.hitch(this, "_validateNonce"), lang.hitch(this, "_onError"));
      },

      _validateNonce: function (response) {
         if (!response || typeof response !== 'string') {
            var error = new Error("Nonce value received was unexpected: " + response);
            this._onError(error);
         }
         else {
            this._onNonce(response);
         }
      },

      _onNonce: function (response) {
         domAttr.set(this.nonce, "value", response);
         var uploadURL = this.getUploadUrl();
         var uploadOptions = this.POST_FORM_OPTIONS;
         uploadOptions.form = this.form;

         when(globals.policy).then(lang.hitch(this, "_uploadFile", response, uploadURL, uploadOptions));
      },

      _uploadFile: function (response, uploadURL, uploadOptions, policy) {
         var user = {policy: policy};
         var simpleUploadMaxFileSize = configUtil.getSimpleUploadMaxFileSize(user);
         var uploadUtil = new lconn.core.upload.provider.HtmlFileProvider();
         var file = this.form.elements.file.files[0];
         var bean = new lconn.core.upload.data.File(file, file.name);
         bean.setSize(file.size);
         
         this.progressHandle = dojo.connect(bean, "setBytesComplete", this, function (bytesComplete) {
            this.emit("_progressUpdate", bytesComplete);
         });

         var args = {
            noStatus: true,
            url: uploadURL,
            form: uploadOptions.form,
            handleAs: uploadOptions.handleAs,
            contentTypeHack: true,
            _xhrHandleAs: "json-embedded",
            simpleUploadMaxFileSize: simpleUploadMaxFileSize,
            nonce: response,
            headers: {},
            failOk: true,
            isConsumer: true
         }

         globals.isUploading = true;
         uploadProcess = uploadUtil.uploadFile(null, bean, args);
         uploadProcess.then(lang.hitch(this, "_validateUploaded"), lang.hitch(this, "_onError"));

         topic.subscribe("ic-fileviewer/stopUpload", lang.hitch(this, function (args) {
             this.cancelUpload();
         }));

      },

      _validateUploaded: function (response) {
         if (this.progressHandle) {
            dojo.disconnect(this.progressHandle);
         }
         var response = response.doc || response;
         if (!response || typeof response !== 'object') {
            var error = new Error("Upload response received was unexpected: " + response);
            this._onError(error);
            return;
         }
         try {
            //TODO Check dom children
            var responseObj = json.fromJson(response.body.innerHTML);
            if (responseObj.errorCode) {
               var error = new Error("Upload response received was unexpected: " + responceObj.errorCode + " " + responseObj.errorMessage);
               this._onError(error);
               return;
            }
            var metaInfo = response.getElementsByTagName("meta")[0];
            if (metaInfo) {
               var errorCode = metaInfo.getAttribute("content");
               var error = new Error("Upload response received error code: " + errorCode);
               this._onError(error);
               return;
            }
         } catch (error) {
              var error = new Error("Exception thrown parsing upload response: " + error.message);
              this._onError(error);
              return;
         }
         this._onUploaded(response);
      },

      _onUploaded: function (response) {
         this.form.reset();
         this._checkModerationStatus(response);
         this.emit("uploaded", {message: this.nls.SUCCESS, source: response});
         globals.isUploading = false;
         topic.publish("ic-fileviewer/editStop", this);
      },
      
      _checkModerationStatus: function(response) {
         var isModerated = moderationUtil.isResponseModerated(response);
         if (isModerated) {
            moderationUtil.launchModerationDialog();
         }
      },

      _onError: function (error, message) {
         if (this.progressHandle) {
            dojo.disconnect(this.progressHandle);
         }
         //TODO Check status
         if(error.dojoType == "cancel") {
            return;
         }

         globals.isUploading = false;
         var message = message || this.nls.ERROR;
         this.emit("error", {message: message, source: error});
         this._enableButton(this.cancel);
      },
      
      _onReset: function () {
         this._disableButton(this.upload);
      },

      _onCancel: function (event) {
         this.form.reset();
         this.emit("cancel", event);
         topic.publish("ic-fileviewer/editStop", this);

         if(this._warningBox) {
            this._warningBox.removeMessage();
         }
      },

      show: function () {
         domClass.remove(this.domNode, "lotusHidden");
         topic.publish("ic-fileviewer/editStart", this, lang.hitch(this, this.hasChanges));
      },
      
      hasChanges: function () {
        return !!this.formFile.value;
      },

      hide: function () {
         domClass.add(this.domNode, "lotusHidden");
      },

      cancelUpload: function (event) {
         if(uploadProcess) {
            globals.isUploading = false;
            uploadProcess.cancel();
            if (event && (event.type == "click" || event.keyCode == keys.ENTER)) {
               this._resetPanelUI("cancelUpload");
            }
         }
      },

      _enableButton: function (domNode) {
         domAttr.remove(domNode, "disabled");
         domAttr.set(domNode, "tabindex", "");
         domAttr.set(domNode, "aria-disabled", "false");
      },

      _disableButton: function (domNode) {
         domAttr.set(domNode, "disabled", "disabled");
         domAttr.set(domNode, "tabindex", "-1");
         domAttr.set(domNode, "aria-disabled", "true");
      },

      // This can be overridden by subclasses
      validateInput: function (successCallback) {
         successCallback();
      },

      validateFileSize: function () {
         var file = this.formFile.files[0];
         var maxFileSize = null;
         when(globals.policy).then(lang.hitch(this, function(policy) {
            var user = {policy: policy};
            maxFileSize = configUtil.getMaxFileSize(user);
         }));

         if(this._warningBox) {
            this._warningBox.removeMessage();
         }

         if(maxFileSize && (file.size > maxFileSize)) {
            var strTooLarge = this.nls.TOO_LARGE || "${file} is larger than the ${size} file size allowed.";
            var strMaxSize = globals.formatFileSize(parseInt(maxFileSize));
            var warningMesssage = string.substitute(strTooLarge, {file: file.name, size: strMaxSize});
            this._showSizeWarning(warningMesssage);
            this._disableButton(this.upload);
         }
      },

      _showSizeWarning: function (warningMesssage) {
         var msgArgs = {type: "warning"};
         this._warningBox = MessageBox.create(msgArgs);
         this._warningBox._hide();
         this._warningBox.placeAt(this.form);

         var messageNode = document.createDocumentFragment();
         messageNode.appendChild(document.createTextNode(warningMesssage));

         this._warningBox.setMessage(messageNode);
      },

      // This is a workaround for a bug in IE11 when running in IE9 compatibility mode.  It should
      // be safe to remove once IE11 is running in native mode.
      onuploaded: function () {
         return;
      }
   });
});