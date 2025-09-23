/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/lang",
   "dojox/date/hebrew",
   "dojox/date/islamic",
   "ic-core/auth",
   "ic-core/globalization/BidiDateUtil",
   "ic-core/globalization/api",
   "ic-core/globalization/config",
   "ic-core/util/PreferenceCache",
   "../mocks/SyncXMLHttpRequest",
   "../utils/inject"
], function (dojo, lang, hebrew, islamic, auth, bidiDateUtil, api, config, cache, MockXMLHttpRequest, inject) {

   /**
    * Jasmine spec for Bidi Date utilities
    * @module ic-test.globalization.bidiDateSpec
    * @author Mariam El Tantawi <mariamel@eg.ibm.com>
    */
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
   function makePrefs(c) { return dojo.toJson({entry:{appData:{userSettings:{bidiEnabled:false,calendar:c,textDirection:'default'}}}}); }
   var PREFS_CALENDAR_GREGORIAN = makePrefs('gregorian'),
   PREFS_CALENDAR_HEBREW = makePrefs('hebrew'),
   PREFS_CALENDAR_HIJRI = makePrefs('hijri');
   var di = islamic, il = di.locale, dh = hebrew,hl = dh.locale, dg = dojo.date, gl = dg.locale;
   
   describe("the interface of ic-core/globalization/BidiDateUtil", function() {
      it("implements the expected methods", function() {
         expect(lang.isFunction(bidiDateUtil.isHijri)).toBeTruthy();
         expect(lang.isFunction(bidiDateUtil.isHebrew)).toBeTruthy();
         expect(lang.isFunction(bidiDateUtil.isGregorian)).toBeTruthy();
         expect(lang.isFunction(bidiDateUtil.getCalendar)).toBeTruthy();
         expect(lang.isFunction(bidiDateUtil.getDateComponent)).toBeTruthy();
         expect(lang.isFunction(bidiDateUtil.fromGregorian)).toBeTruthy();
         expect(lang.isFunction(bidiDateUtil.formatBidiDate)).toBeTruthy();
         expect(lang.isFunction(bidiDateUtil.getBundle)).toBeTruthy();
      });
   });
   
    describe("the method ic-core/globalization/BidiDateUtil.getCalendar()", function() {
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
         expect(bidiDateUtil.getCalendar()).toBe(config.CALENDAR.GREGORIAN);
      });
      it("returns the preference when the user is authenticated", function() {
         auth.isAuthenticated = function() { return true; };
        
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidiDateUtil.getCalendar()).toBe(config.CALENDAR.GREGORIAN);
        
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidiDateUtil.getCalendar()).toBe(config.CALENDAR.HEBREW);
        
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidiDateUtil.getCalendar()).toBe(config.CALENDAR.HIJRI);
      });
   });
   
    describe("the method ic-core/globalization/BidiDateUtil.isHijri()", function() {
      var isAuthenticated, response;
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns true when the user's selected calendar is Hijri, false otherwise", function() {
         auth.isAuthenticated = function() { return true; };
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidiDateUtil.isHijri()).toBeTruthy();
         response = PREFS_CALENDAR_GREGORIAN;//any value other than Hijri
         clearCache();
         expect(bidiDateUtil.isHijri()).toBeFalsy();
      });
   });
   
   describe("the method ic-core/globalization/BidiDateUtil.isHebrew()", function() {
      var isAuthenticated, response;
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns true when the user's selected calendar is Hebrew, false otherwise", function() {
         auth.isAuthenticated = function() { return true; };
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidiDateUtil.isHebrew()).toBeTruthy();
         response = PREFS_CALENDAR_GREGORIAN;//any value other than Hebrew
         clearCache();
         expect(bidiDateUtil.isHebrew()).toBeFalsy();
      });
   });
   
   describe("the method ic-core/globalization/BidiDateUtil.isGregorian()", function() {
      var isAuthenticated, response;
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns true when the user's selected calendar is Gregorian, false otherwise", function() {
         auth.isAuthenticated = function() { return true; };
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidiDateUtil.isGregorian()).toBeTruthy();
         response = PREFS_CALENDAR_HIJRI;//any value other than Gregorian
         clearCache();
         expect(bidiDateUtil.isGregorian()).toBeFalsy();
      });
   });
   
   describe("the method ic-core/globalization/BidiDateUtil.getDateComponent()", function() {
      var isAuthenticated, response;
      var mnths = "months", dys = "days", w = "wide", ab = "abbr", n = "narrow";
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns date component (month) of the selected preferences formatted like ops", function() {
         auth.isAuthenticated = function() { return true; };
         
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidiDateUtil.getDateComponent(mnths,w)).toEqual(gl.getNames(mnths,w));
         expect(bidiDateUtil.getDateComponent(mnths,ab)).toEqual(gl.getNames(mnths,ab));
         expect(bidiDateUtil.getDateComponent(mnths,n)).toEqual(gl.getNames(mnths,n));
         
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidiDateUtil.getDateComponent(mnths,w)).toEqual(il.getNames(mnths,w));
         expect(bidiDateUtil.getDateComponent(mnths,ab)).toEqual(il.getNames(mnths,ab));
         expect(bidiDateUtil.getDateComponent(mnths,n)).toEqual(il.getNames(mnths,n));
         
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidiDateUtil.getDateComponent(mnths,w)).toEqual(hl.getNames(mnths,w,null,null,new dh.Date()));
         expect(bidiDateUtil.getDateComponent(mnths,ab)).toEqual(hl.getNames(mnths,ab,null,null,new dh.Date()));
         expect(bidiDateUtil.getDateComponent(mnths,n)).toEqual(hl.getNames(mnths,n,null,null,new dh.Date()));
         
      });
      it("returns date component (day) of the selected preferences formatted like ops", function() {
         auth.isAuthenticated = function() { return true; };
         
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidiDateUtil.getDateComponent(dys,w)).toEqual(gl.getNames(dys,w));
         expect(bidiDateUtil.getDateComponent(dys,ab)).toEqual(gl.getNames(dys,ab));
         expect(bidiDateUtil.getDateComponent(dys,n)).toEqual(gl.getNames(dys,n));
         
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidiDateUtil.getDateComponent(dys,w)).toEqual(il.getNames(dys,w));
         expect(bidiDateUtil.getDateComponent(dys,ab)).toEqual(il.getNames(dys,ab));
         expect(bidiDateUtil.getDateComponent(dys,n)).toEqual(il.getNames(dys,n));
         
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidiDateUtil.getDateComponent(dys,w)).toEqual(hl.getNames(dys,w,null,null,new dh.Date()));
         expect(bidiDateUtil.getDateComponent(dys,ab)).toEqual(hl.getNames(dys,ab,null,null,new dh.Date()));
         expect(bidiDateUtil.getDateComponent(dys,n)).toEqual(hl.getNames(dys,n,null,null,new dh.Date()));
      });
   });
   
   describe("the method ic-core/globalization/BidiDateUtil.formatBidiDate()", function() {
      var isAuthenticated, response;
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns passed date formatted according to the passed format ops", function() {
         auth.isAuthenticated = function() { return true; };
         var gDate = new Date(), ops = {selector: "date",formatLength: "short"};
         
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidiDateUtil.formatBidiDate(gDate,ops)).toBe(gl.format(gDate, ops));
         
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidiDateUtil.formatBidiDate(gDate,ops)).toBe(il.format(new di.Date().fromGregorian(gDate), ops));
         
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidiDateUtil.formatBidiDate(gDate,ops)).toBe(hl.format(new dh.Date().fromGregorian(gDate), ops));
      });
   });
   
   describe("the method ic-core/globalization/BidiDateUtil.getBundle()", function() {
      var isAuthenticated, response;
      beforeEach(function() {
         mockRequest(function(){return response;});
         isAuthenticated = auth.isAuthenticated;
      });
      afterEach(function() {
         auth.isAuthenticated = isAuthenticated;
         demockRequest();
      });
      it("returns the bundle of the passed dateFormat", function() {
         auth.isAuthenticated = function() { return true; };
         var ops="days-format-abbr";
       
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidiDateUtil.getBundle(ops)).toEqual(gl._getGregorianBundle()[ops]);
         
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidiDateUtil.getBundle(ops)).toEqual(il._getIslamicBundle()[ops]);
         
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidiDateUtil.getBundle(ops)).toEqual(hl._getHebrewBundle()[ops]);
      });
   });

});
