/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/request",
   "../util/routes",
   "dojo/Deferred"
], function (request, routes, Deferred) {
   "use strict";

   function sendRequest(file, lock, errorHandler) {
      var filesNonceUrl = "/files/basic/api/nonce";

      // TODO Combine this nonce call with Bryan's (at the least)
      // TODO There has to be a better way to chain these deferred
      return request(filesNonceUrl, { withCredentials: true }).then(function (nonce) {
         var headers = {
            "X-UPDATE-NONCE": nonce
         };

         if (!lock) {
            headers["X-METHOD-OVERRIDE"] = "DELETE";
         }

         return request(routes.getFileLockUrl(file, lock), {
            method: "POST",
            withCredentials: true,
            headers: headers
         });
      }, errorHandler);
   }

   return {
      save: function (file, errorHandler) {
         if (file.hasPropertyChanged("isLocked")) {
            return sendRequest(file, file.get("isLocked") ? "HARD" : "", errorHandler);
         }
      }
   };
});