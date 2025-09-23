/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.globalization.apiSpec");

dojo.require("lconn.core.globalization.api");
dojo.require("lconn.core.globalization.config");
dojo.require("lconn.core.auth");
dojo.require("lconn.core.util.PreferenceCache");


(function(api, cache) {
   var PREF_NAME = "globalization";
   function clearCache() { cache.unset(PREF_NAME); }
   function makePrefs(b,c,t) { return {entry:{appData:{userSettings:{bidiEnabled:b,calendar:c,textDirection:t}}}}; }
   var PREFS_BIDIENABLED_TRUE = makePrefs(true,'gregorian','default'),
      PREFS_BIDIENABLED_FALSE = makePrefs(false,'gregorian','default'),
      PREFS_CALENDAR_GREGORIAN = makePrefs(true,'gregorian','default'),
      PREFS_CALENDAR_HEBREW = makePrefs(true,'hebrew','default'),
      PREFS_CALENDAR_HIJRI = makePrefs(true,'hijri','default'),
      PREFS_TEXTDIRECTION_DEFAULT = makePrefs(true,'gregorian','default')
      PREFS_TEXTDIRECTION_LTR = makePrefs(true,'hebrew','ltr')
      PREFS_TEXTDIRECTION_RTL = makePrefs(true,'hijri','rtl'),
      PREFS_TEXTDIRECTION_CONTEXTUAL = makePrefs(true,'gregorian','contextual');
   
   describe("the interface of lconn.core.globalization.api", function() {
      it("implements the expected methods", function() {
         expect(dojo.isFunction(api.isBidiEnabled)).toBeTruthy();
         expect(dojo.isFunction(api.getCalendar)).toBeTruthy();
         expect(dojo.isFunction(api.getTextDirection)).toBeTruthy();
      });
   });
   
//   describe("lconn.core.globalization.api", function() {
//      it("calls dojo.addOnLoad()", function() {
//         expect(addOnLoadCalled).toBeTruthy();
//      });
//   });
   
   describe("the method lconn.core.globalization.api.isBidiEnabled()", function() {
      var isAuthenticated, xhrGet, response;
      beforeEach(function() {
         xhrGet = dojo.xhrGet;
         dojo.xhrGet = function(params) { if (params.sync) { params.handle(response); } };
         isAuthenticated = lconn.core.auth.isAuthenticated;
      });
      afterEach(function() {
         lconn.core.auth.isAuthenticated = isAuthenticated;
         dojo.xhrGet = xhrGet;
      });
      it("returns false when the user is anonymous", function() {
         lconn.core.auth.isAuthenticated = function() { return false; };
         expect(api.isBidiEnabled()).toBeFalsy();
      });
      it("returns the preference when the user is authenticated", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         response = PREFS_BIDIENABLED_TRUE;
         clearCache();
         expect(api.isBidiEnabled()).toBeTruthy();
         response = PREFS_BIDIENABLED_FALSE;
         clearCache()
         expect(api.isBidiEnabled()).toBeFalsy();
      });

   });
   
   describe("the method lconn.core.globalization.api.getTextDirection()", function() {
      var isAuthenticated, xhrGet, response;
      beforeEach(function() {
         xhrGet = dojo.xhrGet;
         dojo.xhrGet = function(params) { if (params.sync) { params.handle(response); } };
         isAuthenticated = lconn.core.auth.isAuthenticated;
      });
      afterEach(function() {
         lconn.core.auth.isAuthenticated = isAuthenticated;
         dojo.xhrGet = xhrGet;
      });
      it("returns 'default' when the user is anonymous", function() {
         expect(api.getTextDirection()).toBe(lconn.core.globalization.config.TEXT_DIRECTION.DEFAULT);
      });
      it("returns the preference when the user is authenticated", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         response = PREFS_TEXTDIRECTION_DEFAULT;
         clearCache();
         expect(api.getTextDirection()).toBe(lconn.core.globalization.config.TEXT_DIRECTION.DEFAULT);
         response = PREFS_TEXTDIRECTION_LTR;
         clearCache();
         expect(api.getTextDirection()).toBe(lconn.core.globalization.config.TEXT_DIRECTION.LEFT_TO_RIGHT);
         response = PREFS_TEXTDIRECTION_RTL;
         clearCache();
         expect(api.getTextDirection()).toBe(lconn.core.globalization.config.TEXT_DIRECTION.RIGHT_TO_LEFT);
         response = PREFS_TEXTDIRECTION_CONTEXTUAL;
         clearCache();
         expect(api.getTextDirection()).toBe(lconn.core.globalization.config.TEXT_DIRECTION.CONTEXTUAL);
      });
   });
   
   describe("the method lconn.core.globalization.api.getCalendar()", function() {
      var isAuthenticated, xhrGet, response;
      beforeEach(function() {
         xhrGet = dojo.xhrGet;
         dojo.xhrGet = function(params) { if (params.sync) { params.handle(response); } };
         isAuthenticated = lconn.core.auth.isAuthenticated;
      });
      afterEach(function() {
         lconn.core.auth.isAuthenticated = isAuthenticated;
         dojo.xhrGet = xhrGet;
      });
      it("returns 'gregorian' when the user is anonymous", function() {
         expect(api.getCalendar()).toBe(lconn.core.globalization.config.CALENDAR.GREGORIAN);
      });
      it("returns the preference when the user is authenticated", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(api.getCalendar()).toBe(lconn.core.globalization.config.CALENDAR.GREGORIAN);
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(api.getCalendar()).toBe(lconn.core.globalization.config.CALENDAR.HEBREW);
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(api.getCalendar()).toBe(lconn.core.globalization.config.CALENDAR.HIJRI);
      });
   });
}(lconn.core.globalization.api, lconn.core.util.PreferenceCache));
