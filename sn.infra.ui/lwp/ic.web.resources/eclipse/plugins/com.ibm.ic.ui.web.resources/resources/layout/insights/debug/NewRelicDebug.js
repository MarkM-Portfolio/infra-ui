/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/lang",
   "../tracker",
   "dojox/lang/functional"
], function(lang, tracker, functional) {
   /**
    * Debug implementation of the New Relic plugin for page insights instrumentation
    * 
    * @namespace ic-ui.layout.insights.debug.NewRelicDebug
    */

   var NEWRELICDEBUG = "newrelicdebug",
      LS_KEY_ENABLED = "insights.newrelic.debug.enabled",
      LS_KEY_DATA = "insights.newrelic.debug.data";

   function getData() {
      var json, data = [];

      try {
         json = localStorage.getItem(LS_KEY_DATA);
         
         if (json) {
            data = JSON.parse(json);
         }
      } catch (e) {
         console.warn("Failed to parse existing New Relic debug data as JSON.  Existing data may be lost.", e);
      }
      
      if (!(data instanceof Array)) {
         console.warn("Existing New Relic debug data is not an array.  Existing data may be lost.");
         data = [];
      }

      return data;
   }

   function clearData() {
      localStorage.removeItem(LS_KEY_DATA);
   }

   function isDebugEnabled() {
      return lang.getObject("localStorage") && localStorage.getItem(LS_KEY_ENABLED);
   }

   function setDebugEnabled(enable) {
      if (enable) {
         localStorage.setItem(LS_KEY_ENABLED, "true");
      } else {
         localStorage.removeItem(LS_KEY_ENABLED);
      }
   }

   function track(actionName, args) {
      if (!isDebugEnabled()) {
         return;
      }

      var data = getData(),
         entry,
         trackerCall;

      try {
         entry = {
            actionName: actionName,
            timestamp: (new Date()).toISOString(),
            args: {}
         }

         functional.forIn(args, function (value, key) {
            entry.args[key] = "" + value;
         });

         data.push(entry);

         json = JSON.stringify(data);
         localStorage.setItem(LS_KEY_DATA, json);
      } catch (e) {
         console.warn("Failed to save New Relic debug data as JSON.", e);
      }

      try {
         trackerCall = 'require(["ic-ui/layout/insights/tracker", "ic-ui/layout/insights/NewRelic"], function (tracker) { tracker.track("${actionName}", ${args}); });';

         trackerCall = trackerCall.replace("${actionName}", entry.actionName);
         trackerCall = trackerCall.replace("${args}", JSON.stringify(entry.args));

         console.log("Call to New Relic: ", trackerCall);
      } catch (e) {
         console.warn("Failed to generate real call to ic-ui/layout/insights/tracker", e);
      }
   }

   var NewRelicDebug = lang.mixin(lang.getObject("com.ibm.lconn.layout.insights.debug.NewRelicDebug", true), /** @lends ic-ui.layout.insights.debug.NewRelicDebug */
   {
      /**
       * Name of this plugin
       * 
       * @type {String}
       */
      name : NEWRELICDEBUG,

      /**
       * Signals a page event. The caller must pass an event name and optional
       * metadata
       * 
       * @method
       * @param {String}
       *           event The event name
       * @param {Object}
       *           data The event metadata
       */
      track : track,

      /**
       * Registers this plugin with the insights tracker
       */
      register : function () {
         tracker.register(NEWRELICDEBUG, track);
      },

      _getData: getData,
      _clearData: clearData,
      _isDebugEnabled: isDebugEnabled,
      _setDebugEnabled: setDebugEnabled,
   });

   NewRelicDebug.register();

   return NewRelicDebug;
});
