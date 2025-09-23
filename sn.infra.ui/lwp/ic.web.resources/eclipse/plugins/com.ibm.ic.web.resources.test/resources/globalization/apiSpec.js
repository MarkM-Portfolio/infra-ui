/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/lang",
   "dojo/json",
   "ic-core/auth",
   "ic-core/globalization/api",
   "ic-core/globalization/config",
   "ic-core/util/PreferenceCache",
   "../mocks/SyncXMLHttpRequest",
   "../utils/inject"
], function (lang, JSON, auth, api, config, cache, MockXMLHttpRequest, inject) {

   var PREF_NAME = "globalization", _create;
   function mockRequest(fn) {
      var request = inject("dojo/request/xhr");
      _create = request._create;
      request._create = function() { return new MockXMLHttpRequest(fn); };
   }
   function demockRequest() {
      var request = inject("dojo/request/xhr");
      request._create = _create;
   }
   function clearCache() { cache.unset(PREF_NAME); }
   function makePrefs(b,c,t) { return JSON.stringify({entry:{appData:{userSettings:{bidiEnabled:b,calendar:c,textDirection:t}}}}); }
   var PREFS_BIDIENABLED_TRUE = makePrefs(true,'gregorian','default'),
      PREFS_BIDIENABLED_FALSE = makePrefs(false,'gregorian','default'),
      PREFS_CALENDAR_GREGORIAN = makePrefs(true,'gregorian','default'),
      PREFS_CALENDAR_HEBREW = makePrefs(true,'hebrew','default'),
      PREFS_CALENDAR_HIJRI = makePrefs(true,'hijri','default'),
      PREFS_TEXTDIRECTION_DEFAULT = makePrefs(true,'gregorian','default'),
      PREFS_TEXTDIRECTION_LTR = makePrefs(true,'hebrew','ltr'),
      PREFS_TEXTDIRECTION_RTL = makePrefs(true,'hijri','rtl'),
      PREFS_TEXTDIRECTION_CONTEXTUAL = makePrefs(true,'gregorian','contextual');

   describe("the interface of ic-core/globalization/api", function() {
      it("implements the expected methods", function() {
         expect(lang.isFunction(api.isBidiEnabled)).toBeTruthy();
         expect(lang.isFunction(api.getCalendar)).toBeTruthy();
         expect(lang.isFunction(api.getTextDirection)).toBeTruthy();
      });
   });

//   describe("ic-core/globalization/api", function() {
//      it("calls dojo.addOnLoad()", function() {
//         expect(addOnLoadCalled).toBeTruthy();
//      });
//   });

   describe("the method ic-core/globalization/api.isBidiEnabled()", function() {
      var isAuthenticated, response;
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns false when the user is anonymous", function() {
         auth.isAuthenticated = function() { return false; };
         expect(api.isBidiEnabled()).toBeFalsy();
      });
      it("returns the preference when the user is authenticated", function() {
         auth.isAuthenticated = function() { return true; };
         response = PREFS_BIDIENABLED_TRUE;
         clearCache();
         expect(api.isBidiEnabled()).toBeTruthy();
         response = PREFS_BIDIENABLED_FALSE;
         clearCache();
         expect(api.isBidiEnabled()).toBeFalsy();
      });

   });

   describe("the method ic-core/globalization/api.getTextDirection()", function() {
      var isAuthenticated, response;
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns 'default' when the user is anonymous", function() {
         expect(api.getTextDirection()).toBe(config.TEXT_DIRECTION.DEFAULT);
      });
      it("returns the preference when the user is authenticated", function() {
         auth.isAuthenticated = function() { return true; };
         response = PREFS_TEXTDIRECTION_DEFAULT;
         clearCache();
         expect(api.getTextDirection()).toBe(config.TEXT_DIRECTION.DEFAULT);
         response = PREFS_TEXTDIRECTION_LTR;
         clearCache();
         expect(api.getTextDirection()).toBe(config.TEXT_DIRECTION.LEFT_TO_RIGHT);
         response = PREFS_TEXTDIRECTION_RTL;
         clearCache();
         expect(api.getTextDirection()).toBe(config.TEXT_DIRECTION.RIGHT_TO_LEFT);
         response = PREFS_TEXTDIRECTION_CONTEXTUAL;
         clearCache();
         expect(api.getTextDirection()).toBe(config.TEXT_DIRECTION.CONTEXTUAL);
      });
   });

   describe("the method ic-core/globalization/api.getCalendar()", function() {
      var isAuthenticated, response;
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns 'gregorian' when the user is anonymous", function() {
         expect(api.getCalendar()).toBe(config.CALENDAR.GREGORIAN);
      });
      it("returns the preference when the user is authenticated", function() {
         auth.isAuthenticated = function() { return true; };
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(api.getCalendar()).toBe(config.CALENDAR.GREGORIAN);
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(api.getCalendar()).toBe(config.CALENDAR.HEBREW);
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(api.getCalendar()).toBe(config.CALENDAR.HIJRI);
      });
   });
});
