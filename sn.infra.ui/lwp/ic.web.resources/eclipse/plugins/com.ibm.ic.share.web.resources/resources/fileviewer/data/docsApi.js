/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/lang",
   "../network/request",
   "../config/globals",
   "dojox/encoding/digests/MD5",
   "dojox/encoding/digests/_base",
   "../bean/DocsDraftInfo",
   "dojo/Deferred"
], function (lang, request, globals, MD5, digests, DocsDraftInfo, Deferred) {
   "use strict";

   return {
      getDraftInformation: function (file) {
         var url = globals.services.getDocsUrl() + "/api/docsvr/lcfiles/" + (file.id || file.get("id")) + "/draft";
         return this._request(url, {
            handleAs: "json",
            preventCache: true,
            failOk: true
         }).then(lang.hitch(this, function (response) {
            return new DocsDraftInfo({docsResponse: response});
         }));
      },

      publish: function (file) {
         var promise = new Deferred();

         var url = globals.services.getDocsUrl() + "/api/docsvr/lcfiles/" + file.get("id") + "/draft";
         this._request(url, {
            method: "POST",
            handleAs: "json",
            filesUserId: globals.currentUser.id,
            data: "{}",
            headers: { "Content-Type": "application/json" }
         }).then(lang.hitch(this, function (response) {
            this._handlePublishStatus(file, response.id, promise, response);
         }));

         return promise;
      },

      _handlePublishStatus: function (file, jobId, promise, response) {
         if (response instanceof Error) {
            promise.reject(this._getPublishError(response));
         }

         if (response.status === "complete") {
            promise.resolve(response);
         } else if (response.status === "pending") {
            setTimeout(lang.hitch(this, this._queryPublishStatus, file, jobId, promise), 1000);
         } else {
            promise.reject(this._getPublishError(response));
         }
      },

      _queryPublishStatus: function (file, jobId, promise) {
         var url = globals.services.getDocsUrl() + "/api/job/lcfiles/" + file.get("id") + "/" + jobId;
         this._request(url, {
            handleAs: "json",
            preventCache: true
         }).then(lang.hitch(this, this._handlePublishStatus, file, jobId, promise));
      },

      _getPublishError: function (response, promise) {
         var error = new Error();
         error.isDocsError = true;

         var publishErrorCode = response.error_code || 0;

         var errorCode;
         switch(publishErrorCode) {
            case 1001:
            case 1002:
               errorCode = "AccessDenied";
               break;
            case 1003:
               errorCode = "ItemNotFound";
               break;
            case 1004:
               errorCode = "CannotReachRepository";
               break;
            case 1005:
               errorCode = "QuotaViolation";
               break;
            case 1200:
               errorCode = "ConversionUnavailable";
               break;
            case 1201:
            case 1500:
               errorCode = "DocumentTooLarge";
               break;
            case 1202:
               errorCode = "ConversionTimeout";
               break;
            case 1208:
               errorCode = "ServerBusy";
               break;
            default:
               errorCode = 0;
         }

         error.code = errorCode || "Unknown";

         return error;
      },

      _request: function (url, options) {
         this._addDefaultHeaders(url, options);
         return request(url, options);
      },

      _addDefaultHeaders: function (url, options) {
         var headers = lang.getObject("headers", true, options);

         var userId = "";
         var user = globals.currentUser;
         if (user) {
            userId = user.id;
         }

         var ct = new Date().getTime().toString();
         var seed = userId + "@@" + ct.substring(4, ct.length-1) + "##";
         var token = MD5(seed, digests.outputTypes.Hex);

         headers["X-Csrf-Token"] = token;
         headers["X-Timestamp"] = ct;
         headers["X-DOCS-REPOID"] = "lcfiles";
      }
   };
});
