/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
      "dojo/_base/config",
      "dojo/_base/lang",
      "ic-ui/layout/track",
      "ic-ui/layout/track/files"
], function(dojoConfig, lang, coreTracker, filesTracker) {

   var defaultTracker = {
      getContentId : function(scene) {
         return this.getItemType(scene);
      },
      getItemType : function(scene) {
         return "FILES";
      },
      getExtraMetrics : function(scene) {
         return {
            contentLink : scene.app.routes.getListUrl()
         };
      }
   };

   var trackers = {
      "lconn.files.scenes.FilePreview" : {
         getContentId : function(scene) {
            return scene.fileId;
         },
         getItemType : function(scene) {
            return "FILE";
         },
         getExtraMetrics : function(scene) {
            var file = scene.document;
            return {
               contentTitle : file.getTitle(),
               contentContainerId : file.getLibraryId(),
               contentCreatorId : file.getAuthor().id,
               contentCreateTs : file.getSystemCreated(),
               contentLink : scene.app.routes.getFileSummaryUrl(null, file.getId())
            };
         }
      },
      "lconn.files.comm.scenes.owned.CommunityFileSummary" : {
         getContentId : function(scene) {
            return scene.fileId;
         },
         getItemType : function(scene) {
            return "FILESUMMARY";
         },
         getExtraMetrics : function(scene) {
            var file = scene.document;
            return {
               contentTitle : file.getTitle(),
               contentContainerId : file.getLibraryId(),
               contentCreatorId : file.getAuthor().id,
               contentCreateTs : file.getSystemCreated(),
               contentLink : scene.app.routes.getFileSummaryUrl(null, file.getId())
            };
         }
      },
      
      "lconn.files.comm.scenes.ref.List" : {
         getLibraryId : function(scene) {
            return dojo.exists("app.library.getId", scene) ? scene.app.library.getId() : "";
         },
         getLibraryAuthorName : function(scene) {
            if (dojo.exists("app.library.getOwner", scene)) {
               var owner = scene.app.library.getOwner();
               return owner ? owner.name : null;
            }
            return null;
         },
         
         getContentId : function(scene) {
            return this.getLibraryId(scene);
         },
         
         getItemType : function(scene) {
            return "LIBRARY";
         },
         
         getExtraMetrics : function(scene) {
            return {
               contentContainerId : this.getLibraryId(scene),
               contentContainerTitle : this.getLibraryAuthorName(scene),
               contentTitle : this.getLibraryAuthorName(scene),
               contentCreatorId : dojo.exists("app.library.getOwner", scene) ? scene.app.library.getOwner().id : null,
               contentLink : dojo.exists("getSceneUrl", scene) ? scene.getSceneUrl() : null
            };
         }
      },
      
      "lconn.files.comm.scenes.owned.CommunityCollectionSummary" : lang.mixin(lang.clone(defaultTracker), {
         getContentId : function(scene) {
            var folder = scene.collection;
            contentId = folder.getId();
            return contentId;
         },
         getItemType : function(scene) {
            return "FOLDER";
         },
         getExtraMetrics : function(scene) {
            var folder = scene.collection;
            return {
               contentTitle : folder.getName(),
               contentCreatorId : folder.getAuthor().id,
               contentCreateTs : folder.getSystemCreated(),
               contentLink : scene.app.routes.getCollectionUrl(folder.getId())
            };
         }
      })
   };

   filesTracker.read = function(currentScene) {
      // ---- start --- capture read event for Files app
      var tracker = trackers[currentScene.sceneInfo.id];
      if ((typeof tracker) == "undefined") {
         tracker = defaultTracker;
      }
      else if (!tracker) { // for configure scenes that have no need to track
         return;
      }

      var app = currentScene.app;

      try {
         coreTracker.read(tracker.getContentId(currentScene), tracker.getItemType(currentScene), {
            source : "FILES",
            userId : app.getAuthenticatedUserId(),
            community : app.communityId,
            extra : tracker.getExtraMetrics(currentScene)
         });
      }
      catch (e) {
         if (dojoConfig.isDebug) {
            console.debug(e);
         }
      }
      // ---- end --- capture read event for Files App
   };

   return filesTracker;
});
