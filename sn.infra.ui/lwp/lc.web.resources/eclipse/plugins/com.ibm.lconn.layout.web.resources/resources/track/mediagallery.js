/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.track.mediagallery");

dojo.require("com.ibm.lconn.layout.track");
dojo.require("lconn.core.url");

(function() {
   var trackers = {
      "Summary" : {
         getContentId : function(data, iw) {
            var cId = data.getId();
            var pattern = /^[a-zA-Z0-9_-]*!([a-zA-Z0-9_-]+)$/;
            if (cId && pattern.test(cId)) {
               return RegExp.$1;
            }
         },
         getItemType : function() {
            return "MEDIAFILE";
         },
         getExtraMetrics : function(data, iw) {
            return {
               contentTitle : data.getTitle(),
               contentContainerId : iw.df.getRepositoryId(),
               contentCreatorId : data.getAuthor().id,
               contentCreateTs : data.getCreationDate(),
               contentLink : (function() {
                  var uri = lconn.core.url.parse(self.location.href);
                  if (dojo.exists("queryParameters.lang", uri))
                     delete uri.queryParameters.lang;

                  // for url that doesn't have correct media file id, e.g.,
                  // preview page url
                  var fragmentParas = lconn.core.url.splitQuery(uri.fragment);
                  fragmentParas.file = data.getId();
                  var fragment = lconn.core.url.writeParameters(fragmentParas);
                  if (fragment.charAt(0) == "?")
                     fragment = fragment.substring(1);
                  uri.fragment = fragment;
                  return lconn.core.url.write(uri);
               })()
            };
         }
      },
      "Preview" : function() {
         return dojo.mixin(dojo.clone(this["Summary"]), {
            getItemType : function() {
               return "PREVIEW";
            }
         });
      },
      "Library" : {
         getContentId : function(data, iw) {
            return iw.df.getRepositoryId();
         },
         getItemType : function() {
            return "LIBRARY";
         },
         getExtraMetrics : function(data, iw) {
            return {
               contentContainerId : iw.df.getRepositoryId(),
               contentCreatorId : null,
               contentCreateTs : null,
               contentLink : self.location.href
            };
         }
      }
   };

   com.ibm.lconn.layout.track.mediagallery.read = function(flag, data, iw) {
      // ---- start --- capture read event for MediaGallery
      var isMediaGallery = iw.getWidgetName().indexOf("MediaGallery") != -1;
      if (!isMediaGallery) {
         return;
      }

      var tracker = trackers[flag];
      if (typeof tracker == "function")
         tracker = tracker.call(trackers);
      if (!tracker) { // for configure scenes that have no need to track
         return;
      }

      try {
         com.ibm.lconn.layout.track.read(tracker.getContentId(data, iw), tracker.getItemType(), {
            source : "MEDIAGALLERY",
            userId : iw.getAuthenticatedUser().id || null,
            community : (function() {
               var repositoryId = iw.df.getRepositoryId();
               var pattern = /^[a-zA-Z0-9_-]*![a-zA-Z0-9_-]*!([a-zA-Z0-9_-]+)$/;
               if (repositoryId && pattern.test(repositoryId)) {
                  return RegExp.$1;
               }
            })(),
            extra : tracker.getExtraMetrics(data, iw)
         });
      }
      catch (e) {
         if (dojo.config.isDebug) {
            console.debug(e);
         }
      }
      // ---- end --- capture read event for MediaGallery
   };

   dojo.subscribe("quickr.lw.scenes.AbstractDocumentSummary.setSceneData", function(data, iw) {
      if (data.doc && iw)
         com.ibm.lconn.layout.track.mediagallery.read("Summary", data.doc, iw);
   });

   dojo.subscribe("quickr.lw.action.MGPreview.renderMediaPreview", function(data, iw) {
      if (data.doc && iw)
         com.ibm.lconn.layout.track.mediagallery.read("Preview", data.doc, iw);
   });

   dojo.subscribe("quickr.lw.scenes.AbstractDocMain.onRequestsCompleted", function(data, iw) {
      if (data && iw)
         com.ibm.lconn.layout.track.mediagallery.read("Library", data.feedItem, iw);
   });
})();
