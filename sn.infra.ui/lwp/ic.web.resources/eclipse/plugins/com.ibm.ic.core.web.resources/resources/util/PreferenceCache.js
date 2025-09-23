/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/lang",
   "dojo/json"
], function (lang, JSON) {

   /**
    * Convenient wrapper around DOM Storage APIs for local persistence of
    * various application preferences.
    * @namespace ic-core.util.PreferenceCache
    */
   var PREF_KEY = "icprefs", nopersist = false;

   /*
    * The user agent may throw a SecurityError exception and abort the Storage
    * object initialization steps if the request violates a policy decision
    * (e.g. if the user agent is configured to not allow the page to persist
    * data), or the Document's origin is not a scheme/host/port tuple.
    * 
    * See http://www.w3.org/TR/webstorage/#the-localstorage-attribute
    */
   try {
      window.localStorage;
   }
   catch (e) {
      console.warn("Unable to access localStorage: " + e);
      nopersist = true;
   }

   function get() { return JSON.parse(localStorage.getItem(PREF_KEY)) || {}; }
   function set(val) { localStorage.setItem(PREF_KEY, JSON.stringify(val)); }
   function unset() { localStorage.removeItem(PREF_KEY); }

   return /** @lends ic-core.util.PreferenceCache */ {
      /**
       * Sets or updates the value of a key in the preference cache.
       * 
       * @param {String} key
       * @param {Object} val
       */
      set: function(key, val) {
         if (nopersist) {
            return;
         }
         var o = {}; o[key] = val;
         set(lang.mixin(get(), o));
      },
      /**
       * Removes a key from the preference cache.
       * 
       * @param {String} key
       */
      unset: function(key) {
         if (nopersist) {
            return;
         }
         var p = get();
         delete p[key];
         set(p);
      },
      /**
       * Returns the value of a key from the preference cache.
       * 
       * @param {String} key
       * @returns the value of a key from the preference cache.
       */
      get: function(key) { return nopersist ? undefined : get()[key]; },
      /**
       * Clears the preference cache.
       */
      clear: function() {
         if (nopersist) {
            return;
         }
         unset();
      }
   };
});
