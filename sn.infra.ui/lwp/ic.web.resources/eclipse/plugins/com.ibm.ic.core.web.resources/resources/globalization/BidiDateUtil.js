/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
   "dojo/date",
   "dojo/date/locale",
   "dojox/date/hebrew",
   "dojox/date/islamic",
   "./api",
   "./config"
], function (dateModule, dateLocale, hebrew, islamic, api, config) {

   /**
    * Bidi date utility for Hebrew and Islamic calendars
    * @namespace ic-core.globalization.BidiDateUtil
    * @author Mariam El Tantawi <mariamel@eg.ibm.com>
    */
   var cfg = config.CALENDAR,
      di = islamic, il = di.locale, dh = hebrew,
      hl = dh.locale, dg = dateModule, gl = dg.locale;
   
   /**
    * Get the current selected Calendar.
    * 
    * @returns {string}
    */
   function getCalendar() { return api.getCalendar(); }
   var BidiDateUtil = /** @lends ic-core.globalization.BidiDateUtil */ {
   
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
         if (this.isHijri()) {
            return il.getNames(comp, ops);
         }
         if (this.isHebrew()) {
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
         d = d !== undefined ? new Date(d) : new Date();
         var dateM;
         if (this.isHijri()) {
            dateM = new di.Date();
            return dateM.fromGregorian(d);
         }
         if (this.isHebrew()) {
            dateM = new dh.Date();
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
         d = d !== undefined ? new Date(d) : new Date();
         var dateM;
         if (this.isHijri()) {
            dateM = new di.Date();
            return il.format(dateM.fromGregorian(d), ops);
         }
         if (this.isHebrew()) {
            dateM = new dh.Date();
            return hl.format(dateM.fromGregorian(d), ops);
         }
         return gl.format(d, ops);
      },
      /**
       * Get the current selected Calendar.
       * 
       * @returns {string}
       */
      getCalendar : getCalendar,
      /**
       * Get the appropriate date bundle.
       */
      getBundle : function(/* String */dateFormat) {
         if (this.isHijri()) {
            return il._getIslamicBundle()[dateFormat];
         }
         if (this.isHebrew()) {
            return hl._getHebrewBundle()[dateFormat];
         }
         return gl._getGregorianBundle()[dateFormat];
      }
   };
   
   return BidiDateUtil;
});
