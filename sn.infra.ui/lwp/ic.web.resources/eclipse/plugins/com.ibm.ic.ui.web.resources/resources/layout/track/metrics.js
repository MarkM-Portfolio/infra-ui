/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
      "dojo/_base/config",
      "dojo/_base/lang",
      "dojo/string",
      "dojo/topic",
      "ic-ui/layout/track"
], function(dojoConfig, lang, string, topic, coreTracker) {

   var tracker = lang.getObject("com.ibm.lconn.layout.track.metrics", true);

   tracker.read = function(currentScene) {
      // ---- start --- capture read event for metrics app
      var app = currentScene.app;

      var defaultTracker = {
         getContentId : function(scene) {
            return this.getItemType(scene);
         },
         getItemType : function(scene) {
            return "METRICS";
         },
         getExtraMetrics : function(scene) {
            return {
               contentLink : app.routes.getWelcomeUrl()
            };
         }
      };

      var trackers = {
         "lconn.metrics.scenes.Report" : {
            getContentId : function(scene) {
               var si = scene.sceneInfo;
               var idTemplate = "${scope}-${metric_name}-${date_range_filter}-${is_compare}-${app_filter}-${group_by_filter}";
               var contentId = string.substitute(idTemplate, {
                  scope : scene.app.isCommunityScope() ? "COMMUNITY" : "GLOBAL",
                  metric_name : scene.metricname || scene.name,
                  date_range_filter : scene.selectedDRFilter.value,
                  is_compare : si.parameters.ca || "0",
                  app_filter : si.parameters.app || "system",
                  group_by_filter : scene.selectedDFilter
               });

               return contentId;
            },
            getItemType : function(scene) {
               return "REPORT";
            },
            getExtraMetrics : function(scene) {
               var file = scene.document;
               return {
                  contentTitle : this.getContentId(scene),
                  contentLink : scene.getSceneUrl()
               };
            }
         }
      };

      var tracker = trackers[currentScene.sceneInfo.id];
      if ((typeof tracker) == "undefined") {
         // tracker = defaultTracker;
         // only track report scene
         return;
      }
      else if (!tracker) { // for configure scenes that have no need to track
         return;
      }

      try {
         coreTracker.read(tracker.getContentId(currentScene), tracker.getItemType(currentScene), {
            source : "METRICS",
            userId : app.getAuthenticatedUserId(),
            community : app.isCommunityScope() ? app.routes.communityUuid : null,
            extra : tracker.getExtraMetrics(currentScene)
         });
      }
      catch (e) {
         if (dojoConfig.isDebug) {
            console.debug(e);
         }
      }
      // ---- end --- capture read event for Metrics App
   };

   /*
    * topic.subscribe("lconn/share/scene/begin", function(sceneId, scene,
    * sceneInfo, app) { if (!scene.render) tracker.read(scene); });
    */

   topic.subscribe("lconn/share/scene/render", function(scene, el) {
      tracker.read(scene);
   });

   return tracker;
});
