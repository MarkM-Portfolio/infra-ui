/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function () {
   dojo.provide("lconn.share.action.impl.fileViewer");

   dojo.require("ic-share.fileviewer.ConnectionsFileViewer");
   dojo.require("lconn.core.config.features");

   var ConnectionsFileViewer = window["ic-share"].fileviewer.ConnectionsFileViewer;

   lconn.share.action.impl.fileViewer.addFileViewer = function () {
      var execute = lconn.share.action.impl.FilePreviewDialog.prototype.execute;

      function publishEvent(item, app) {
         var scene = {
            document: item,
            sceneInfo: {
               id: "lconn.files.scenes.FilePreview"
            },
            fileId: item.getId(),
            app: app
         };

         dojo.publish("lconn/share/scene/render", [scene, {}]);
      }

      lconn.share.action.impl.FilePreviewDialog.prototype.execute = function (initialFile) {
         try {
            if (lconn.share.action.impl.fileViewer.isCCM(initialFile)) {
               if (!lconn.core.config.features("fileviewer-ccm-preview")) {
                  return execute.apply(this, arguments);
               }
            } else {
               publishEvent(initialFile, this.app);
            }

            ConnectionsFileViewer._openForFiles({
               initialFile: initialFile,
               allFiles: this.feedItems,
               policy: this.app && this.app.authenticatedUser && this.app.authenticatedUser.policy,
               getUrlForPersonalFileInCommunity: dojo.hitch(this, "getUrlForPersonalFileInCommunity"),
               showDetailsExternalAction: this.showDetailsExternalAction
            });
         } catch (e) {
           if(dojoConfig.isDebug) {
             console.log("Exception caught while instantiating file viewer; debug mode enabled; throwing error to top level so it can be inspected.", e);
             throw e;
           } else {
             console.log("Exception caught while instantiating file viewer; falling back to lightbox.", e);
           }
         }
      };

      lconn.share.action.impl.fileViewer.isCCM = function(file) {
         return (file.getLibraryType() === "library");
      };
   };
})();
