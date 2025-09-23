/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-attr",
   "dojo/dom-class",
   "dojo/_base/json",
   "dojo/request",
   "dojo/Evented",
   "dijit/Dialog",
   "../data/util/routes"
], function (declare, lang, domAttr, domClass, json, request, Evented, Dialog, routes) {
   "use strict";
   
   /**
    * UploadDialog is an abstract class
    */
   return declare([ Dialog, Evented ], {
      MOCK_PATH_REGEX: /(\\|\/)/g,
      GET_NONCE_OPTIONS: {
         method: 'GET',
         handleAs: 'text'
      },

      _onSubmit: function (event) {
         this.emit("submit", event);
         this._submit();
      },

      _submit: function () {
         this._disableUpload();
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
         //TODO Design a way so upload dialog/widget can submit a form via form.submit or via request iframe
         var uploadURL = this.getUploadUrl({ nonce: response });
         if (!uploadURL) {
            var error = new Error("Generated upload url was invalid: " + uploadURL);
            this._onError(error);
         } else {
            domAttr.set(this.content.form, "action", uploadURL);
            domAttr.set(this.content.form, "method", "POST");
            this.content.form.submit();
         }
      },

      _onError: function (error) {
         //TODO Check status
         this.emit("error", {message: this.nls.ERROR, source: error});
      },

      _onCancel: function (event) {
         this.content.form.reset();
         this.emit("cancel", event);
      },

      _enableUpload: function () {
         domAttr.remove(this.content.upload, "disabled");
         domAttr.set(this.content.upload, "tabindex", "");
         domAttr.set(this.content.upload, "aria-disabled", "false");
      },

      _disableUpload: function () {
         domAttr.set(this.content.upload, "disabled", "disabled");
         domAttr.set(this.content.upload, "tabindex", "-1");
         domAttr.set(this.content.upload, "aria-disabled", "true");
      }
   });
});