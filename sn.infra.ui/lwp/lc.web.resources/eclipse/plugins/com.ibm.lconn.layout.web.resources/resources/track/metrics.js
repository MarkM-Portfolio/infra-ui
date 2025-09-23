/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.track.metrics");

dojo.require("com.ibm.lconn.layout.track");
dojo.require("dojo.string");

com.ibm.lconn.layout.track.metrics.read = function(currentScene) {
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
            var contentId = dojo.string.substitute(idTemplate, {
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
      com.ibm.lconn.layout.track.read(tracker.getContentId(currentScene), tracker.getItemType(currentScene), {
         source : "METRICS",
         userId : app.getAuthenticatedUserId(),
         community : app.isCommunityScope() ? app.routes.communityUuid : null,
         extra : tracker.getExtraMetrics(currentScene)
      });
   }
   catch (e) {
      if (dojo.config.isDebug) {
         console.debug(e);
      }
   }
   // ---- end --- capture read event for Metrics App
};

(function() {
   /*
    * dojo.subscribe("lconn/share/scene/begin", function(sceneId, scene,
    * sceneInfo, app) { if (!scene.render)
    * com.ibm.lconn.layout.track.metrics.read(scene); });
    */

   dojo.subscribe("lconn/share/scene/render", function(scene, el) {
      com.ibm.lconn.layout.track.metrics.read(scene);
   });
})();
