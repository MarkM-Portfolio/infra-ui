/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   "use strict";
   dojo.provide("lconn.share.util.IBMDocs.ViewerAPI");
   dojo.require("lconn.share.util.IBMDocs.ThumbnailConstants");
   dojo.require("lconn.share.util.IBMDocs.ViewerRoutes");
   dojo.require("lconn.core.auth");

   var ViewerAPI = lconn.share.util.IBMDocs.ViewerAPI;
   var ThumbnailConstants = lconn.share.util.IBMDocs.ThumbnailConstants;
   var ViewerRoutes = lconn.share.util.IBMDocs.ViewerRoutes;
   
   ViewerAPI.sendThumbnailBatchRequest = function(items, sizeFormat, successCallback, errorCallback) {
      var processedItems = [],
      processedItemIds = [],
      processedItemIdsString,
      batchThumbnailId,
      xhrArgs,
      repositoryName;
      
      if(!items) {
         return;
      }
      if(!dojo.isArray(items)) {
         items = [items];
      }
      if (!ViewerAPI.canSendThumbnailBatchRequest(items)) {
         return;
      }
      
      ThumbnailConstants.validateSize(sizeFormat);
      dojo.forEach(items, function(item) {
         if(!item) {
            return;
         }
         batchThumbnailId = ViewerAPI._getBatchThumbnailId(item);
         if (batchThumbnailId) {
            processedItems.push(item);
            processedItemIds.push(batchThumbnailId);
         }
      });
      if (processedItemIds.length > 0) {
         repositoryName = ViewerAPI._getRepositoryNameFromItems(processedItems);
         processedItemIdsString = processedItemIds.join(",");
         xhrArgs = {
            url: ViewerRoutes.getThumbnailBatchURL(ViewerRoutes.serviceNames.ecm, repositoryName, sizeFormat),
            content: {format: "json",
                      vids: processedItemIdsString},
            handleAs: "json",
            load: dojo.hitch(ViewerAPI, "_onThumbnailDataReceived", processedItems, sizeFormat, successCallback),
            error: errorCallback
         };
         return ViewerAPI._get(xhrArgs);
      }
   };
   
   ViewerAPI.canSendThumbnailBatchRequest = function(items) {
      if(!items) {
         return false;
      }
      if(!dojo.isArray(items)) {
         items = [items];
      }
      
      if (!lconn.core.auth.isAuthenticated()) {
         return false;
      }

      var hasAValidItem = dojo.some(items, function(item) {
         return ViewerAPI._getBatchThumbnailId(item);
      });
      var canMakeViewerServiceCall = ViewerRoutes.canBuildViewerServiceURL();
      var hasRepositoryName = !!(ViewerAPI._getRepositoryNameFromItems(items));

      return canMakeViewerServiceCall && hasAValidItem && hasRepositoryName;
   };

   ViewerAPI._onThumbnailDataReceived = function(items, sizeFormat, callback, batchThumbnailData) {
      if(!batchThumbnailData) {
         return;
      }

      ThumbnailConstants.validateSize(sizeFormat);
      var itemId, singleThumbnailData;
      dojo.forEach(items, function(item) {
         itemId = ViewerAPI._getBatchThumbnailId(item);
         if (itemId in batchThumbnailData) {
            singleThumbnailData = batchThumbnailData[itemId];
            item.setThumbnailData(
                  sizeFormat,
                  ViewerAPI.buildImageBase64DataUri(
                     singleThumbnailData.format,
                     singleThumbnailData.stream
                  )
            );
         }
      });
      if (callback) {
         callback(items, sizeFormat, batchThumbnailData);
      }
   };

   ViewerAPI._getBatchThumbnailId = function(item) {
      if (item.getBatchThumbnailId) {
         return item.getBatchThumbnailId();
      }
   };
   
   ViewerAPI._getRepositoryNameFromItems = function(items) {
      var repositoryName;
      dojo.some(items, function(item) {
         var itemRepositoryName = item.getRepositoryName && item.getRepositoryName();
         if(itemRepositoryName) {
            repositoryName = itemRepositoryName;
         }
         return itemRepositoryName;
      });
      return repositoryName;
   };

   ViewerAPI.buildImageBase64DataUri = function(/* String */ fileExtension, /* String */ data){
      return "data:image/" + fileExtension + ";base64," + data;
   };

   ViewerAPI._get = function(opts) {
      return dojo.xhrGet(opts);
   };
}());
