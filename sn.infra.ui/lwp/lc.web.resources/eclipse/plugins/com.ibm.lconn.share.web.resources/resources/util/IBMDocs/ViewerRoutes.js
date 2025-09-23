/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   "use strict";
   dojo.provide("lconn.share.util.IBMDocs.ViewerRoutes");
   dojo.require("lconn.share.util.IBMDocs.ThumbnailConstants");
   dojo.require("lconn.core.config.services");
   dojo.require("lconn.core.url");

   var ViewerRoutes = lconn.share.util.IBMDocs.ViewerRoutes;
   var ThumbnailConstants = lconn.share.util.IBMDocs.ThumbnailConstants;
   var services = lconn.core.config.services;
   var url = lconn.core.url;

   var thumbnailBatchURLPathTemplate = "/api/thumbnails/{serviceName}/{repositoryName}/{size}";
   var thumbnailSingleURLPathTemplate = "/api/thumbnails/{serviceName}/{cmisVersionSeriesId}@{repositoryName}/{size}";

   ViewerRoutes.serviceNames = {
      files: "icfiles",
      ecm: "ecm"
   };
   
   ViewerRoutes.getServiceName = function(bean) {
      if(bean.isFilesContext()) {
         return ViewerRoutes.serviceNames.files;
      }
      if(bean.isLibraryContext()) {
         return ViewerRoutes.serviceNames.ecm;
      }
   };

   ViewerRoutes.getViewerServiceURL = function() {
      return url.getServiceUrl(services.viewer);
   };
   
   ViewerRoutes.canBuildViewerServiceURL = function() {
      var hasViewerService = !!(services.viewer);
      return hasViewerService;
   };

   ViewerRoutes.getThumbnailBatchURL = function(serviceName, repositoryName, size) {
      if(!serviceName || !repositoryName) {
         throw {name: "InvalidArgumentException", message: "One of the following arguments was invalid: serviceName=("+serviceName+"), repositoryName=("+repositoryName+"), size=("+size+")"};
      }
      if(!ViewerRoutes.canBuildViewerServiceURL()) {
         throw {name: "IllegalStateException", message: "Not able to build Viewer service URL because of incorrect environment.  This should have been guarded against with \"ViewerRoutes.canBuildViewerServiceURL\"."};
      }
      ThumbnailConstants.validateSize(size);
      var url = ViewerRoutes.getViewerServiceURL() + thumbnailBatchURLPathTemplate;
      url = ViewerRoutes._replaceCommonThumbnailURLIdentifiers(url, serviceName, repositoryName, size);
      // TODO: This URL is not currently being proxied, and must be in order to support retrieving thumbnails
      //  from other FileNet systems with different connected Docs/Viewer installations..
      return url;
   };

   ViewerRoutes.getThumbnailSingleURL = function(serviceName, cmisVersionSeriesId, repositoryName, size) {
      if(!serviceName || !repositoryName) {
         throw {name: "InvalidArgumentException", message: "One of the following arguments was invalid: serviceName=("+serviceName+"), repositoryName=("+repositoryName+"), size=("+size+")"};
      }
      if(!ViewerRoutes.canBuildViewerServiceURL()) {
         throw {name: "IllegalStateException", message: "Not able to build Viewer service URL because of incorrect environment.  This should have been guarded against with \"ViewerRoutes.canBuildViewerServiceURL\"."};
      }
      if(!cmisVersionSeriesId) {
         return;
      }
      ThumbnailConstants.validateSize(size);
      var url = ViewerRoutes.getViewerServiceURL() + thumbnailSingleURLPathTemplate;
      url = url.replace("{cmisVersionSeriesId}", encodeURIComponent(cmisVersionSeriesId));
      url = ViewerRoutes._replaceCommonThumbnailURLIdentifiers(url, serviceName, repositoryName, size);
      // TODO: This URL is not currently being proxied, and must be in order to support retrieving thumbnails
      //  from other FileNet systems with different connected Docs/Viewer installations..
      return url;
   };

   ViewerRoutes._replaceCommonThumbnailURLIdentifiers = function(url, serviceName, repositoryName, size) {
      url = url.replace("{serviceName}", encodeURIComponent(serviceName));
      url = url.replace("{repositoryName}", encodeURIComponent(repositoryName));
      url = url.replace("{size}", encodeURIComponent(size));
      return url;
   };
}());
