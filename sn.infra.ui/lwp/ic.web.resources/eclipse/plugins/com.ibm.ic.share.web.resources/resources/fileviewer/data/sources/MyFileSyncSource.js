/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/request",
   "../util/routes"
], function (request, routes) {
   "use strict";

   var filesDocumentSyncTagName = "isSyncable";
   var fileViewerSyncFileBeanTrackingPropertyName = "syncing";
   var startSyncingCategoryXML = '<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/Atom"><category term="myfilesync" label="myfilesync" scheme="tag:ibm.com,2006:td/type"/></entry>';
   
   function sendRequest(file, startSyncing, errorHandler) {
      var filesNonceUrl = routes.getFilesNonceUrl();

      return request(filesNonceUrl, { withCredentials: true }).then(function (nonce) {
        var url = "";
        var postData = "";
        var headers = {
           "X-UPDATE-NONCE": nonce
        };
        var queryParams = {};

        if (startSyncing) {
          url = routes.getFileFeedUrl(file);
          postData += startSyncingCategoryXML;
          headers["Content-Type"] = 'application/atom+xml;charset="UTF-8"';
        } else {
          url = routes.getMyFileSyncUrl();
          queryParams.itemId = file.get("id");
          headers["X-METHOD-OVERRIDE"] = "DELETE";
        }

        return request(url, {
          method: "POST",
          withCredentials: true,
          headers: headers,
          query: queryParams,
          data: postData
        });
      }, errorHandler);
   }

   return {
      save: function (file, errorHandler) {
         if (file.hasPropertyChanged(fileViewerSyncFileBeanTrackingPropertyName)) {
            return sendRequest(file, !file.get(filesDocumentSyncTagName), errorHandler);
         }
      }
   };
});