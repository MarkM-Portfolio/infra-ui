/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo",
   "dojo/_base/lang",
   "dojo/request",
   "dojo/topic",
   "ic-core/auth",
   "ic-core/config",
   "ic-core/config/services",
   "ic-core/globalization/config",
   "ic-core/url",
   "ic-core/util/PreferenceCache",
   "dojo/domReady!"
], function (dojo, lang, request, topic, auth, config, services, config, url, PreferenceCache) {

   var api = {}, cfg = config, cache = PreferenceCache;

   if (cfg.areSettingsEnabled()) {

      var PREF_NAME = "globalization", noretry = false;

      function handleError(response, ioArgs) {
         if (response)
            switch (response.status) {
               case 500:
               case 404:
                  // TODO: move to global preferences service
                  topic.publish('ic-core/preferences/unavailable');
                  noretry = true;
            }
      }

      function getSettings() {
         if (!auth.isAuthenticated())
            return {};
         var settings = getStoredPref();
         // Settings are not available (yet?) so fetch them synchronously
         if (!settings && !noretry) {
            request(getUrl(), {method: "GET", failOk: true, handleAs: 'json', sync: true}).then(function(r, i) {
                  if (r instanceof Error) {
                     handleError(r, i);
                     return;
                  }
                  // Set variable
                  settings = parseResponse(r);
                  // And store in cookie
                  setStoredPref(r, i);
               });
         }
         return settings || {}; // Fall back when OSAPI call fails
      }

      // TODO: centralize OSAPI routes
      function getUrl() {
         var osapiUrl = url.getServiceUrl(services.opensocial).toString();
         // TODO: introspect settings
         return osapiUrl + "/rest/people/@me/@self?fields=userSettings.textDirection&fields=userSettings.bidiEnabled&fields=userSettings.calendar";
      }

      function loadSettings() {
         // Register handlers for globalization preferences changes
         registerHandlers();
         // Return if anonymous
         if (!auth.isAuthenticated())
            return;
         // Return immediately if set
         if (getStoredPref())
            return;
         // If not, fetch settings from OSAPI service
         if (!noretry)
            request(getUrl(), {method: "GET", handleAs: 'json', timeout: 3000}).then(setStoredPref, handleError); // And store
      }

      function updateSettings() {
         if (arguments[1])
            updateStoredPref(arguments[1]);
         else
            unsetStoredPref();
      }

      var MAP = {
         CTX: "contextual",
         DEF: "default",
         LTR: "ltr",
         RTL: "rtl",
         HEB: "hebrew",
         HIJ: "hijri",
         GRE: "gregorian",
         "true" : true,
         "false" : false
      };

      function map(from) {
         var to = {};
         for (var prop in from)
            if (from.hasOwnProperty(prop))
               to[prop] = typeof MAP[from[prop]] !== 'undefined' ? MAP[from[prop]] : from[prop];
         return to;
      }

      function parseResponse(response) {
         return (response && response.entry && response.entry.appData) ?
            map(response.entry.appData.userSettings) : null;
      }

      function getStoredPref() {
         return cache.get(PREF_NAME);
      }

      function updateStoredPref(value) {
         if (!value) {
            console.debug('Trying to store invalid preference:', value);
            return;
         }
         cache.set(PREF_NAME, value);
      }

      function setStoredPref(response, ioArgs) {
         updateStoredPref(parseResponse(response));
      }

      var registered = false;
      function registerHandlers() {
         // Register cleanup handlers
         if (!registered) {
            // Register handlers for globalization preferences changes
            topic.subscribe("ic-core/globalization/saved", updateSettings);
            topic.subscribe("ic-core/globalization/restored", updateSettings);
            // Register handlers for login and logout
            auth.addLogoutHandler(unsetStoredPref);
            auth.addLoginHandler(unsetStoredPref);
            registered = true;
         }
      }

      function unsetStoredPref() {
         cache.unset(PREF_NAME);
      }

      function getProp(propName) {
         var ret = getSettings()[propName];
         return typeof ret !== 'undefined' ? ret : cfg.defaults[propName];
      }

      /**
       * Core Globalization package
       * @namespace ic-core.globalization
       */
      /**
       * This class exposes an extensible API to obtain globalization preferences for the current user
       * @namespace ic-core.globalization.api
       * @see {@link lconn.core.globalization.config}
       */
      lang.mixin(api, /** @lends ic-core.globalization.api */ {
         /**
          * Returns true if the user has enabled bidi preferences
          * @returns true if the user has enabled bidi preferences
          */
         isBidiEnabled: function() {
            return getProp(cfg.SETTINGS.BIDI_ENABLED);
         },
         /**
          * Returns the user's preferred calendar
          *
          * The return value is one of the following constants:
          * <ul>
          *    <li><code>lconn.core.globalization.config.CALENDAR.GREGORIAN</code></li>
          *    <li><code>lconn.core.globalization.config.CALENDAR.HEBREW</code></li>
          *    <li><code>lconn.core.globalization.config.CALENDAR.HIJRI</code></li>
          * </ul>
          * @returns the user's preferred calendar
          */
         getCalendar: function() {
            return getProp(cfg.SETTINGS.CALENDAR);
         },
         /**
          * Returns the user's preferred text direction
          *
          * The return value is one of the following constants:
          * <ul>
          *    <li><code>lconn.core.globalization.config.TEXT_DIRECTION.DEFAULT</code></li>
          *    <li><code>lconn.core.globalization.config.TEXT_DIRECTION.LEFT_TO_RIGHT</code></li>
          *    <li><code>lconn.core.globalization.config.TEXT_DIRECTION.RIGHT_TO_LEFT</code></li>
          *    <li><code>lconn.core.globalization.config.TEXT_DIRECTION.CONTEXTUAL</code></li>
          * </ul>
          * @returns the user's preferred text direction
          */
         getTextDirection: function() {
            return getProp(cfg.SETTINGS.TEXT_DIRECTION);
         }
      })

      setTimeout(loadSettings, 100);
   }

   return api;
});
