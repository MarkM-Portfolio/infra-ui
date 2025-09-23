/* Copyright IBM Corp. 2011, 2017  All Rights Reserved.              */

define([
      "dojo/_base/config",
      "dojo/_base/lang",
      "dojo/json",
      "dojo/request",
      "dijit/_base/wai",
      "ic-core/auth",
      "ic-core/config/features",
      "ic-core/config/properties",
      "ic-core/config/services",
      "ic-core/url",
      "ic-ui/util/Url",
      "ic-ui/layout/insights/NewRelic",
      "ic-ui/layout/insights/tracker"
], function(dojoConfig, lang, JSON, request, wai, auth, has, properties, services, url, Url, NewRelic, NRTracker) {

   /**
    * This module provides the standard Connections tracking API.
    */
   var track = lang.getObject("com.ibm.lconn.layout.track", true);
   var QUICK_RESULT_PROPERTY = "quickResultsEnabled";
   var insightsTracker = NRTracker.getInstance("metrics.eventTracker");
   // Every beacon added to this page is given a unique id, so that the
   // browser
   // will not reuse the same beacon.
   var beaconCount = 0;

   var metricsService = services.metrics;
   var searchService = services.search;
   var genericEventService = services.eventTracker;
   var quickResultsProperty = properties[QUICK_RESULT_PROPERTY] === "true";
   var quickResultsEnabled = searchService && quickResultsProperty;
   var genericEventServiceEnabled = has("event-tracker-service") && genericEventService;

   if (metricsService || quickResultsEnabled || genericEventServiceEnabled) {
      track._addTracker = function(args, extra, sync) {
         if (!args) {
            return;
         }

         var dfd;
         var isGenericTrackerOnlyEnabled = has("event-tracker-service") && has("event-tracker-metrics-via-event-tracker-only");

         if (!isGenericTrackerOnlyEnabled && metricsService) {
            dfd = track.postToTracker(args, extra, sync, url.getServiceUrl(metricsService), "/service/eventTracker");
         }
         if (genericEventServiceEnabled) {
            dfd = track.postToTracker(args, extra, sync, url.getServiceUrl(genericEventService), "/eventTracker");
         } else if (!has("event-tracker-service") && quickResultsEnabled && auth.isAuthenticated()) {
            dfd = track.postToTracker(args, extra, sync, url.getServiceUrl(searchService), "/eventTracker");
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

      var query = lang.mixin(serviceUrl.getQuery(), args);
      if (typeof extra == "object") {
         lang.mixin(query, extra);
      }
      else if (typeof extra == "string") {
         query.data = extra;
      }

      var ajaxProxyUrl = dojoConfig.proxy;
      serviceUrl.path += contextPath;
      var source = serviceUrl.toString();
      if (ajaxProxyUrl) {
         var proxyHelper = new url.ProxyUrlHelper(ajaxProxyUrl);
         source = proxyHelper.getProxifiedURL(source);
      }

      var xhrLoadCB = function(rawData) {
         return;
      };

      var xhrErrorCB = function(rawData) {
         return;
      };

      dfd = request(source, {
         method : "POST",
         sync : sync || false,
         timeout : 10000,
         headers : {
            "X-Update-Nonce" : "true"
         }
      }).then(xhrLoadCB, xhrErrorCB);
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

      if (dojoConfig.isDebug) {
         console.log("Send read event with itemType = " + itemType + ", contentId = " + id);
         console.log("Options=" + JSON.stringify(opt, true));
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
         // FIXME: must be checked on every single call - ajax envs can
         // change
         // this
         community : opt.communityId || opt.community || null,
         i : beaconCount++ || null
      }, opt.extra, opt.sync);
   };

   return track;
});
