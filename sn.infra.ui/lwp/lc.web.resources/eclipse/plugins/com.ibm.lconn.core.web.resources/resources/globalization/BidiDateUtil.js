/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */
(function() {
dojo.provide("lconn.core.globalization.BidiDateUtil");

dojo.require("dojox.date.islamic");
dojo.require("dojox.date.islamic.Date");
dojo.require("dojox.date.islamic.locale");
dojo.require("dojox.date.hebrew");
dojo.require("dojox.date.hebrew.Date");
dojo.require("dojox.date.hebrew.locale");
dojo.require("dojo.date.locale");

dojo.require("lconn.core.globalization.api");

/**
 * Bidi date utility for Hebrew and Islamic calendars
 * @namespace lconn.core.globalization.BidiDateUtil
 * @author Mariam El Tantawi <mariamel@eg.ibm.com>
 */
var lg = lconn.core.globalization, api = lg.api, cfg = lg.config.CALENDAR;

/**
 * Get the current selected Calendar.
 * 
 * @returns {string}
 */
function getCalendar() { return api.getCalendar(); }
lconn.core.globalization.BidiDateUtil = /** @lends lconn.core.globalization.BidiDateUtil */ {

   /**
    * Check if the current selected calendar is Hijri.
    * 
    * @returns {boolean}
    */
   isHijri : function() {
      return getCalendar() == cfg.HIJRI;
   },
   /**
    * Check if the current selected calendar is Hebrew.
    * 
    * @returns {boolean}
    */
   isHebrew : function() {
      return getCalendar() == cfg.HEBREW;
   },
   /**
    * Check if the current selected calendar is Gregorian.
    * 
    * @returns {boolean}
    */
   isGregorian : function() {
      return getCalendar() == cfg.GREGORIAN;
   },
   /**
    * Get localized Hijri/Hebrew months names.
    * 
    * @param {string}
    *           comp The item to retrieve ("months" or "days").
    * @param {string}
    *           ops The format type ("wide" , "abbr" or "narrow").
    * @param {hdate}
    *           date The hebrew date (dojox.date.hebrew.Date)
    * @returns {string[]} The array of months names
    */
   getDateComponent : function(comp, ops, date) {
      var di = dojox.date.islamic, il = di.locale,dh = dojox.date.hebrew,
      hl = dh.locale, dg = dojo.date, gl = dg.locale;
      
      if (this.isHijri()) {
         return il.getNames(comp, ops);
      }
      else if (this.isHebrew()) {
         return hl.getNames(comp, ops, null, null, date || this.fromGregorian());
      }
      return gl.getNames(comp, ops);
   },
   /**
    * Convert Gregorian Date to Hijri/Hebrew date.
    * 
    * @param {Date}
    *           d The gregorian date to be converted.
    * @returns {Date} The converted Hijri/Hebrew date.
    */
   fromGregorian : function(d) {
      var di = dojox.date.islamic,
      dh = dojox.date.hebrew,
      hl = dh.locale;
      
      d = typeof d !== 'undefined' ? new Date(d) : new Date();
      if (this.isHijri()) {
         var dateM = new di.Date();
         return dateM.fromGregorian(d);
      }
      else if (this.isHebrew()) {
         var dateM = new dh.Date();
         return dateM.fromGregorian(d);
      }
      return d;
   },
   /**
    * Return formatted Hijri/Hebrew date from gregorian date
    * 
    * @param {Date}
    *           d The gregorian date to be converted and formatted.
    * @param {Object}
    *           ops The format options.
    * @returns {String} The formatted date string.
    */
   formatBidiDate : function(d, ops) {
      var di = dojox.date.islamic, il = di.locale, dh = dojox.date.hebrew,
      hl = dh.locale,dg = dojo.date, gl = dg.locale;
      
      
      d = typeof d !== 'undefined' ? new Date(d) : new Date();
      if (this.isHijri()) {
         var dateM = new di.Date();
         return il.format(dateM.fromGregorian(d), ops);
      }
      else if (this.isHebrew()) {
         var dateM = new dh.Date();
         return hl.format(dateM.fromGregorian(d), ops);
      }
      return gl.format(d, ops);
   },
   /**
    * Get the current selected Calendar.
    * 
    * @returns {string}
    */
   getCalendar : function() {
      return getCalendar();
   },
   /**
    * Get the appropriate date bundle.
    */
   getBundle : function(/* String */dateFormat) {
      var di = dojox.date.islamic, il = di.locale, dh = dojox.date.hebrew,
      hl = dh.locale, dg = dojo.date, gl = dg.locale;
      
      if (this.isHijri()) {
         return il._getIslamicBundle()[dateFormat];
      }
      else if (this.isHebrew()) {
         return hl._getHebrewBundle()[dateFormat];
      }
      return gl._getGregorianBundle()[dateFormat];
   }
};
})();
