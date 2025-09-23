/* Copyright IBM Corp. 2011, 2017  All Rights Reserved.              */

(function com_ibm_lconn_layout_track() {
   /**
    * This module provides the standard Connections tracking API.
    */
   var track = dojo.provide("com.ibm.lconn.layout.track");

   dojo.require("dijit._base.wai");
   dojo.require("com.ibm.oneui.util.Url");
   dojo.require("lconn.core.config.features");
   dojo.require("lconn.core.config.properties");
   dojo.require("lconn.core.config.services");
   dojo.require("lconn.core.url");
   dojo.require("lconn.core.auth");
   dojo.require("com.ibm.lconn.layout.insights.tracker");
   dojo.require("com.ibm.lconn.layout.insights.NewRelic");

   var insightsTracker = com.ibm.lconn.layout.insights.tracker.getInstance("metrics.eventTracker");
   var QUICK_RESULT_PROPERTY = "quickResultsEnabled";
   // Every beacon added to this page is given a unique id, so that the browser
   // will not reuse the same beacon.
   var beaconCount = 0;

   var metricsService = lconn.core.config.services.metrics;
   var searchService = lconn.core.config.services.search;
   var genericEventService = lconn.core.config.services.eventTracker;
   var quickResultsProperty = lconn.core.config.properties[QUICK_RESULT_PROPERTY] === "true";
   var quickResultsEnabled = searchService && quickResultsProperty;
   var genericEventServiceEnabled = lconn.core.config.features("event-tracker-service") && genericEventService;

   if (metricsService || quickResultsEnabled || genericEventServiceEnabled) {
      track._addTracker = function(args, extra, sync) {
         if (!args) {
            return;
         }

         var dfd;
         var isGenericTrackerOnlyEnabled = lconn.core.config.features("event-tracker-service") && lconn.core.config.features("event-tracker-metrics-via-event-tracker-only");

         if (!isGenericTrackerOnlyEnabled && metricsService) {
            dfd = track.postToTracker(args, extra, sync, lconn.core.url.getServiceUrl(metricsService), "/service/eventTracker");
         }
         if (genericEventServiceEnabled) {
            dfd = track.postToTracker(args, extra, sync, lconn.core.url.getServiceUrl(genericEventService), "/eventTracker");
         } else if (!lconn.core.config.features("event-tracker-service") && quickResultsEnabled && lconn.core.auth.isAuthenticated()) {
            dfd = track.postToTracker(args, extra, sync, lconn.core.url.getServiceUrl(searchService), "/eventTracker");
         }
         return dfd;
      };
   }
   else {
      track._addTracker = function() {
         return;
      };
   }

   track.postToTracker = function(args, extra, sync, serviceUrl, contextPath) {
      var dfd;

      var query = dojo.mixin(serviceUrl.getQuery(), args);
      if (typeof extra == "object") {
         dojo.mixin(query, extra);
      }
      else if (typeof extra == "string") {
         query.data = extra;
      }

      var ajaxProxyUrl = dojo.config.proxy;
      serviceUrl.path += contextPath;
      var source = serviceUrl.toString();
      if (ajaxProxyUrl) {
         var proxyHelper = new lconn.core.url.ProxyUrlHelper(ajaxProxyUrl);
         source = proxyHelper.getProxifiedURL(source);
      }

      var xhrLoadCB = function(rawData) {
         return;
      };

      var xhrErrorCB = function(rawData) {
         return;
      };

      dfd = dojo.xhrPost({
         url : source,
         sync : sync || false,
         timeout : 10000,
         load : xhrLoadCB,
         error : xhrErrorCB,
         headers : {
            "X-Update-Nonce" : "true"
         }
      });
      return dfd;
   };

   /**
    * Contact the Metrics API endpoint and indicate that the item identified by
    * id and of type itemType has been viewed. Will add a transparent 1x1 image
    * to the page that performs a GET request to the metrics server. Multiple
    * calls per page to the same
    * 
    * @param id
    *           The unique identifier of the item to be tracked.
    * @param itemType
    *           The type of item to be tracked.
    * @param opt
    *           (optional) Parameters that may be passed to the API. communityId
    *           or community: The UUID of the current community. Not required
    *           unless the current page is showing a different community than
    *           the community that owns the item. source: The name of the
    *           application that is generating this read event. By default the
    *           current application service ID will be used for this value.
    *           extra: Additional non-standard parameters that will be sent to
    *           the tracker service.
    */
   track.read = function(id, itemType, opt) {
      opt = opt || {};

      if (dojo.config.isDebug) {
         console.log("Send read event with itemType = " + itemType + ", contentId = " + id);
         console.log("Options=" + dojo.toJson(opt, true));
      }

      insightsTracker.track(
          [opt.source, itemType].join("."),
          {
            context: opt.context,
            contentId: id,
            itemType: itemType,
            source: opt.source || null
          });

      return track._addTracker({
         context : opt.context,
         contentId : id,
         itemType : itemType,
         // FIXME: pull from app type
         source : opt.source || null,
         // FIXME: must be checked on every single call - ajax envs can change
         // this
         community : opt.communityId || opt.community || null,
         contentorgid : opt.communityOrgId || null,
         i : beaconCount++ || null
      }, opt.extra, opt.sync);
   };
}());
