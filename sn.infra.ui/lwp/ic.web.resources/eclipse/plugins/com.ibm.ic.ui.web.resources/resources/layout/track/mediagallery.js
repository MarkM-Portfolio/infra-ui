/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/lang",
      "dojo/topic",
      "ic-ui/layout/track",
      "ic-core/url"
], function(dojo, lang, topic, track, url) {

   var mediagalleryTracker = lang.getObject("com.ibm.lconn.layout.track.mediagallery", true);

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
                  var uri = url.parse(self.location.href);
                  if (lang.exists("queryParameters.lang", uri))
                     delete uri.queryParameters.lang;

                  // for url that doesn't have correct media file id, e.g.,
                  // preview page url
                  var fragmentParas = url.splitQuery(uri.fragment);
                  fragmentParas.file = data.getId();
                  var fragment = url.writeParameters(fragmentParas);
                  if (fragment.charAt(0) == "?")
                     fragment = fragment.substring(1);
                  uri.fragment = fragment;
                  return url.write(uri);
               })()
            };
         }
      },
      "Preview" : function() {
         return lang.mixin(lang.clone(this["Summary"]), {
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

   mediagalleryTracker.read = function(flag, data, iw) {
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
         track.read(tracker.getContentId(data, iw), tracker.getItemType(), {
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

   topic.subscribe("quickr.lw.scenes.AbstractDocumentSummary.setSceneData", function(data, iw) {
      if (data.doc && iw)
         mediagalleryTracker.read("Summary", data.doc, iw);
   });

   topic.subscribe("quickr.lw.action.MGPreview.renderMediaPreview", function(data, iw) {
      if (data.doc && iw)
         mediagalleryTracker.read("Preview", data.doc, iw);
   });

   topic.subscribe("quickr.lw.scenes.AbstractDocMain.onRequestsCompleted", function(data, iw) {
      if (data && iw)
         mediagalleryTracker.read("Library", data.feedItem, iw);
   });

   return mediagalleryTracker;
});
