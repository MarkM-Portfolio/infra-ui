/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
dojo.provide("lconn.test.jasmine.globalization.bidiDateSpec");

dojo.require("lconn.core.globalization.BidiDateUtil");
dojo.require("lconn.core.globalization.api");
dojo.require("lconn.core.globalization.config");
dojo.require("lconn.core.auth");
dojo.require("lconn.core.util.PreferenceCache");

dojo.require("dojox.date.islamic");
dojo.require("dojox.date.islamic.Date");
dojo.require("dojox.date.islamic.locale");
dojo.require("dojox.date.hebrew");
dojo.require("dojox.date.hebrew.Date");
dojo.require("dojox.date.hebrew.locale");
dojo.require("dojo.date.locale");

/**
 * Jasmine spec for Bidi Date utilities
 * @module lconn.test.jasmine.globalization.bidiDateSpec
 * @author Mariam El Tantawi <mariamel@eg.ibm.com>
 */
(function(bidi, cache) {
   var PREF_NAME = "globalization";
   function clearCache() { cache.unset(PREF_NAME); }
   function makePrefs(c) { return {entry:{appData:{userSettings:{bidiEnabled:false,calendar:c,textDirection:'default'}}}}; }
   var PREFS_CALENDAR_GREGORIAN = makePrefs('gregorian'),
   PREFS_CALENDAR_HEBREW = makePrefs('hebrew'),
   PREFS_CALENDAR_HIJRI = makePrefs('hijri');
   var di = dojox.date.islamic, il = di.locale, dh = dojox.date.hebrew,hl = dh.locale, dg = dojo.date, gl = dg.locale;
   
   describe("the interface of lconn.core.globalization.BidiDateUtil", function() {
      it("implements the expected methods", function() {
         expect(dojo.isFunction(bidi.isHijri)).toBeTruthy();
         expect(dojo.isFunction(bidi.isHebrew)).toBeTruthy();
         expect(dojo.isFunction(bidi.isGregorian)).toBeTruthy();
         expect(dojo.isFunction(bidi.getCalendar)).toBeTruthy();
         expect(dojo.isFunction(bidi.getDateComponent)).toBeTruthy();
         expect(dojo.isFunction(bidi.fromGregorian)).toBeTruthy();
         expect(dojo.isFunction(bidi.formatBidiDate)).toBeTruthy();
         expect(dojo.isFunction(bidi.getBundle)).toBeTruthy();
      });
   });
   
    describe("the method lconn.core.globalization.BidiDateUtil.getCalendar()", function() {
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
         expect(bidi.getCalendar()).toBe(lconn.core.globalization.config.CALENDAR.GREGORIAN);
      });
      it("returns the preference when the user is authenticated", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
        
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidi.getCalendar()).toBe(lconn.core.globalization.config.CALENDAR.GREGORIAN);
        
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidi.getCalendar()).toBe(lconn.core.globalization.config.CALENDAR.HEBREW);
        
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidi.getCalendar()).toBe(lconn.core.globalization.config.CALENDAR.HIJRI);
      });
   });
   
    describe("the method lconn.core.globalization.BidiDateUtil.isHijri()", function() {
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
      it("returns true when the user's selected calendar is Hijri, false otherwise", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidi.isHijri()).toBeTruthy();
         response = PREFS_CALENDAR_GREGORIAN;//any value other than Hijri
         clearCache();
         expect(bidi.isHijri()).toBeFalsy();
      });
   });
   
   describe("the method lconn.core.globalization.BidiDateUtil.isHebrew()", function() {
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
      it("returns true when the user's selected calendar is Hebrew, false otherwise", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidi.isHebrew()).toBeTruthy();
         response = PREFS_CALENDAR_GREGORIAN;//any value other than Hebrew
         clearCache();
         expect(bidi.isHebrew()).toBeFalsy();
      });
   });
   
   describe("the method lconn.core.globalization.BidiDateUtil.isGregorian()", function() {
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
      it("returns true when the user's selected calendar is Gregorian, false otherwise", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidi.isGregorian()).toBeTruthy();
         response = PREFS_CALENDAR_HIJRI;//any value other than Gregorian
         clearCache();
         expect(bidi.isGregorian()).toBeFalsy();
      });
   });
   
   describe("the method lconn.core.globalization.BidiDateUtil.getDateComponent()", function() {
      var isAuthenticated, xhrGet, response;
      var mnths = "months", dys = "days", w = "wide", ab = "abbr", n = "narrow";
      beforeEach(function() {
         xhrGet = dojo.xhrGet;
         dojo.xhrGet = function(params) { if (params.sync) { params.handle(response); } };
         isAuthenticated = lconn.core.auth.isAuthenticated;
      });
      afterEach(function() {
         lconn.core.auth.isAuthenticated = isAuthenticated;
         dojo.xhrGet = xhrGet;
      });
      it("returns date component (month) of the selected preferences formatted like ops", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidi.getDateComponent(mnths,w)).toEqual(gl.getNames(mnths,w));
         expect(bidi.getDateComponent(mnths,ab)).toEqual(gl.getNames(mnths,ab));
         expect(bidi.getDateComponent(mnths,n)).toEqual(gl.getNames(mnths,n));
         
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidi.getDateComponent(mnths,w)).toEqual(il.getNames(mnths,w));
         expect(bidi.getDateComponent(mnths,ab)).toEqual(il.getNames(mnths,ab));
         expect(bidi.getDateComponent(mnths,n)).toEqual(il.getNames(mnths,n));
         
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidi.getDateComponent(mnths,w)).toEqual(hl.getNames(mnths,w,null,null,new dh.Date()));
         expect(bidi.getDateComponent(mnths,ab)).toEqual(hl.getNames(mnths,ab,null,null,new dh.Date()));
         expect(bidi.getDateComponent(mnths,n)).toEqual(hl.getNames(mnths,n,null,null,new dh.Date()));
         
      });
      it("returns date component (day) of the selected preferences formatted like ops", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidi.getDateComponent(dys,w)).toEqual(gl.getNames(dys,w));
         expect(bidi.getDateComponent(dys,ab)).toEqual(gl.getNames(dys,ab));
         expect(bidi.getDateComponent(dys,n)).toEqual(gl.getNames(dys,n));
         
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidi.getDateComponent(dys,w)).toEqual(il.getNames(dys,w));
         expect(bidi.getDateComponent(dys,ab)).toEqual(il.getNames(dys,ab));
         expect(bidi.getDateComponent(dys,n)).toEqual(il.getNames(dys,n));
         
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidi.getDateComponent(dys,w)).toEqual(hl.getNames(dys,w,null,null,new dh.Date()));
         expect(bidi.getDateComponent(dys,ab)).toEqual(hl.getNames(dys,ab,null,null,new dh.Date()));
         expect(bidi.getDateComponent(dys,n)).toEqual(hl.getNames(dys,n,null,null,new dh.Date()));
      });
   });
   
   describe("the method lconn.core.globalization.BidiDateUtil.formatBidiDate()", function() {
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
      it("returns passed date formatted according to the passed format ops", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         var gDate = new Date(), ops = {selector: "date",formatLength: "short"};
         
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidi.formatBidiDate(gDate,ops)).toBe(gl.format(gDate, ops));
         
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidi.formatBidiDate(gDate,ops)).toBe(il.format(new di.Date().fromGregorian(gDate), ops));
         
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidi.formatBidiDate(gDate,ops)).toBe(hl.format(new dh.Date().fromGregorian(gDate), ops));
      });
   });
   
   describe("the method lconn.core.globalization.BidiDateUtil.getBundle()", function() {
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
      it("returns the bundle of the passed dateFormat", function() {
         lconn.core.auth.isAuthenticated = function() { return true; };
         var ops="days-format-abbr";
       
         response = PREFS_CALENDAR_GREGORIAN;
         clearCache();
         expect(bidi.getBundle(ops)).toEqual(gl._getGregorianBundle()[ops]);
         
         response = PREFS_CALENDAR_HIJRI;
         clearCache();
         expect(bidi.getBundle(ops)).toEqual(il._getIslamicBundle()[ops]);
         
         response = PREFS_CALENDAR_HEBREW;
         clearCache();
         expect(bidi.getBundle(ops)).toEqual(hl._getHebrewBundle()[ops]);
      });
   });
   
}(lconn.core.globalization.BidiDateUtil, lconn.core.util.PreferenceCache));
