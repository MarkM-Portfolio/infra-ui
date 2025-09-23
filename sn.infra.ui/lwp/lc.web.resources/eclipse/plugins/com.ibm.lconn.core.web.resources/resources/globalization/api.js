/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {

   dojo.provide("lconn.core.globalization.api");
   dojo.require("lconn.core.globalization.config");
   dojo.require("lconn.core.auth");
   dojo.require("lconn.core.config.services");
   dojo.require("lconn.core.url");
   dojo.require("lconn.core.util.PreferenceCache");
   dojo.require("com.ibm.oneui.util.proxy");

   var cfg = lconn.core.globalization.config, cache = lconn.core.util.PreferenceCache;

   if (cfg.areSettingsEnabled()) {

      var PREF_NAME = "globalization", noretry = false;

      function handleError(response, ioArgs) {
         if (response)
            switch (response.status) {
               case 500:
               case 404:
                  // TODO: move to global preferences service
                  dojo.publish('lconn/core/preferences/unavailable');
                  noretry = true;
            }
      }

      function getSettings() {
         if (!lconn.core.auth.isAuthenticated())
            return {};
         var settings = getStoredPref();
         // Settings are not available (yet?) so fetch them synchronously
         if (!settings && !noretry) {
            dojo.xhrGet({
               // TODO: centralize OSAPI routes
               url: getUrl(),
               // Do not fail when OSAPI returns 302 and login redirect
               failOk: true,
               handleAs: 'json',
               sync: true,
               handle: function(r, i) {
                  if (r instanceof Error) {
                     handleError(r, i);
                     return;
                  }
                  // Set variable
                  settings = parseResponse(r);
                  // And store in cookie
                  setStoredPref(r, i);
               }
            });
         }
         return settings || {}; // Fall back when OSAPI call fails
      }

      // TODO: centralize OSAPI routes
      function getUrl() {
         var osapiUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial).toString() + 
         "/rest/people/@me/@self?fields=userSettings.textDirection&fields=userSettings.bidiEnabled&fields=userSettings.calendar";
         // TODO: introspect settings
         
         return com.ibm.oneui.util.proxy(osapiUrl);
      }

      function loadSettings() {
         // Register handlers for globalization preferences changes
         registerHandlers();
         // Return if anonymous
         if (!lconn.core.auth.isAuthenticated())
            return;
         // Return immediately if set
         if (getStoredPref())
            return;
         // If not, fetch settings from OSAPI service
         if (!noretry)
            dojo.xhrGet({
               url: getUrl(),
               handleAs: 'json',
               timeout: 3000
            }).addCallback(setStoredPref).addErrback(handleError); // And store
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
            dojo.subscribe("lconn/core/globalization/saved", updateSettings);
            dojo.subscribe("lconn/core/globalization/restored", updateSettings);
            // Register handlers for login and logout
            lconn.core.auth.addLogoutHandler(unsetStoredPref);
            lconn.core.auth.addLoginHandler(unsetStoredPref);
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
       * @namespace lconn.core.globalization
       */
      /**
       * This class exposes an extensible API to obtain globalization preferences for the current user
       * @namespace lconn.core.globalization.api
       * @see {@link lconn.core.globalization.config}
       */
      dojo.mixin(lconn.core.globalization.api, /** @lends lconn.core.globalization.api */ {
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

      dojo.addOnLoad(function(){setTimeout(loadSettings, 100)});
   }

})();
