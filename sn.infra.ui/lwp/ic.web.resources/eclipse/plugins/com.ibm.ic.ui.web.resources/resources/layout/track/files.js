/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
      "dojo/_base/config",
      "dojo/_base/lang",
      "dojo/topic",
      "ic-ui/layout/track"
], function(dojoConfig, lang, topic, coreTracker) {

   var filesTracker = lang.getObject("com.ibm.lconn.layout.track.files", true);

   var defaultTracker = {
      getContentId : function(scene) {
         return this.getItemType(scene);
      },
      getItemType : function(scene) {
         return "FILES";
      },
      getExtraMetrics : function(scene) {
         return {
            contentLink : scene.app.routes.getWelcomeUrl()
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
      "lconn.files.scenes.FileSummary" : {
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
               contentContainerTitle : file.getLibraryAuthor().name,
               contentCreatorId : file.getAuthor().id,
               contentCreateTs : file.getSystemCreated(),
               contentLink : scene.app.routes.getFileSummaryUrl(null, file.getId())
            };
         }
      },
      "lconn.files.scenes.CollectionSummary" : {
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
               contentTitle : folder.getNameNls(),
               contentCreatorId : folder.getAuthor().id,
               contentCreateTs : folder.getSystemCreated(),
               contentLink : scene.app.routes.getCollectionUrl(folder.getId())
            };
         }
      },
      "lconn.files.scenes.UserChannel" : {
         getLibraryId : function(scene) {
            return scene.library ? scene.library.getId() : "";
         },
         getLibraryAuthorName : function(scene) {
            if (scene.library) {
               var owner = scene.library.getOwner();
               return owner ? owner.name : null;
            }
            return null;
         },
         getContentId : function(scene) {
            return this.getLibraryId(scene);
         },
         getItemType : function(scene) {
            // var itemType;
            // if (scene.isPersonalHome) {
            // itemType = "MYFILES";
            // }
            // else {
            // itemType = "PERSONALFILES";
            // }
            return "LIBRARY";
         },
         getExtraMetrics : function(scene) {
            return {
               contentContainerId : this.getLibraryId(scene),
               contentContainerTitle : this.getLibraryAuthorName(scene),
               contentTitle : this.getLibraryAuthorName(scene),
               contentCreatorId : scene.userId,
               contentLink : scene.app.routes.getUserChannelUrl(scene.userId)
            };
         }
      }
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

   topic.subscribe("lconn/share/scene/begin", function(sceneId, scene, sceneInfo, app) {
      if (!scene.render)
         filesTracker.read(scene);
   });

   topic.subscribe("lconn/share/scene/render", function(scene, el) {
      if (!scene.loadListData)
         filesTracker.read(scene);
   });

   topic.subscribe("lconn/share/scene/loadListData", function(scene) {
      filesTracker.read(scene);
   });

   return filesTracker;
});
