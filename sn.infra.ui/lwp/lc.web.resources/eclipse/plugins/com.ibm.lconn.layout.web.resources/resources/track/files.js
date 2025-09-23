/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.track.files");

dojo.require("com.ibm.lconn.layout.track");

(function() {

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
   
   var getExtraValue = function(document) {
      var isExternal = document.isExternal();
      var scope = "private";
      var isCommunityContent = false;
      var type = document.isFolder() ? document.getType() : document.getLibraryType();
      if (type === "community" || type === "communityFiles") {
         scope ="community";
         isCommunityContent = true;
      } else {
         if (document.getVisibility() === "public") {
            if (window._lconn_files_config && window._lconn_files_config.isCloudMode) {
               scope = "organization";
            } else {
               scope = "public";
            }
         }
      }
      var obj = {
         contentScope: scope,
         contentIsExternal: isExternal,
         isCommunityContent: isCommunityContent
      };
      return obj;
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
            return dojo.mixin({
               contentTitle : file.getTitle(),
               contentContainerId : file.getLibraryId(),
               contentCreatorId : file.getAuthor().id,
               contentCreateTs : file.getSystemCreated(),
               contentLink : scene.app.routes.getFileSummaryUrl(null, file.getId())
            }, getExtraValue(file));
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
            return dojo.mixin({
               contentTitle : file.getTitle(),
               contentContainerId : file.getLibraryId(),
               contentContainerTitle : file.getLibraryAuthor().name,
               contentCreatorId : file.getAuthor().id,
               contentCreateTs : file.getSystemCreated(),
               contentLink : scene.app.routes.getFileSummaryUrl(null, file.getId())
            }, getExtraValue(file));
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
            return dojo.mixin({
               contentTitle : folder.getNameNls(),
               contentCreatorId : folder.getAuthor().id,
               contentCreateTs : folder.getSystemCreated(),
               contentLink : scene.app.routes.getCollectionUrl(folder.getId())
            }, getExtraValue(folder));
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

   com.ibm.lconn.layout.track.files.read = function(currentScene) {
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
         com.ibm.lconn.layout.track.read(tracker.getContentId(currentScene), tracker.getItemType(currentScene), {
            source : "FILES",
            userId : app.getAuthenticatedUserId(),
            extra : tracker.getExtraMetrics(currentScene)
         });
      }
      catch (e) {
         if (dojo.config.isDebug) {
            console.debug(e);
         }
      }
      // ---- end --- capture read event for Files App
   };

   dojo.subscribe("lconn/share/scene/begin", function(sceneId, scene, sceneInfo, app) {
      if (!scene.render)
         com.ibm.lconn.layout.track.files.read(scene);
   });

   dojo.subscribe("lconn/share/scene/render", function(scene, el) {
      if (!scene.loadListData)
         com.ibm.lconn.layout.track.files.read(scene);
   });

   dojo.subscribe("lconn/share/scene/loadListData", function(scene) {
      com.ibm.lconn.layout.track.files.read(scene);
   });
})();
