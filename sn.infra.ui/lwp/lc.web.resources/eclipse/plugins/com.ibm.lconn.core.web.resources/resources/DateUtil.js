/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.DateUtil");

dojo.require("dojo.i18n");
dojo.require("dojo.string");
dojo.require("dojo.date.locale");
dojo.require("lconn.core.locale");
dojo.requireLocalization("lconn.core", "strings");
dojo.requireLocalization("dojo.cldr", "gregorian");

dojo.require("lconn.core.Res");
dojo.require("lconn.core.globalization.BidiDateUtil");

/**
 * @namespace lconn.core.DateUtil
 */
(function() {
// Documentation:
// https://w3.webahead.ibm.com/w3ki/display/conndev/Common+date+printing+code
var w = {}, bdu = lconn.core.globalization.BidiDateUtil;
w.MILLS_IN_DAY = 86400000;

w.inited = null;
w.Today = "Error: not inited";
w.Yesterday = "Error: not inited";
w.Tomorrow = "Error: not inited";

w.initResStrings = function() {
   var res = new lconn.core.Res();
   res.loadDefaultBundle();
   var b = res.resBundle;
   this.Today = b.rs_today;
   this.Yesterday = b.rs_yesterday;
   this.Tomorrow = b.rs_tomorrow;
   this.At = b.rs_at;
   this.inited = true;
};

w.delta = function(todayMidnight, date) {
   var diff = todayMidnight.getTime() - date;
   /*
    * calculate the number of days way from now the date is this uses the
    * truncate function (we defined it) since floor() won't work with negative
    * numbers
    */
   var dayDelta = Math.ceil(diff / (this.MILLS_IN_DAY));
   return dayDelta;
};

/**
 * This is the major function. Pass in a Date object or other valid date string,
 * get back a Connections 2.0 spec date string in the language+format the user
 * is using. you can optionally pass in true as the 2nd parameter to hide the
 * time part of the date string.
 * 
 * This function CANNOT be called until Dojo has been script included and loaded
 * by the calling page. The reason for this has to do with how Dojo loads
 * resource strings.
 * 
 * The locale used is determined by checking djConfig.locale. If this isn't set,
 * then its default is 'en' You're supposed to set this when you script include
 * Dojo
 */
w.toString = function(date, dontshowtime) {
   var dateInMS;
   if (!date || !(dateInMS = Date.parse(date))) {
      console.log("Invalid date passed to DateUtil.toString(): " + date);
      return;
   }

   var resultTime = "";
   resultTime = this.toStringForTimeinMs(dateInMS, dontshowtime);

   return resultTime;

};

w.toStringForTimeinMs = function(dateInMS, dontshowtime, showFullYear) {
   if (this.Days == null)
      this.Days = dojo.i18n.getLocalization("dojo.cldr", "gregorian")['days-format-wide'];
   if (this.Month == null)
      this.Month = dojo.i18n.getLocalization("dojo.cldr", "gregorian")['months-format-abbr'];
   //bidi support
   if(!bdu.isGregorian())
      this.Month = bdu.getDateComponent("months","abbr");

   // will only work if toString is called after Dojo is loaded
   if (this.inited == null)
      this.initResStrings();

   var todayMidnight = new Date();
   todayMidnight.setHours(0, 0, 0, 0);

   var serverDate = new Date();
   serverDate.setTime(dateInMS);
   var dayDelta = this.delta(todayMidnight, dateInMS);
   var resultTime = "";
   //bidi support
   if(!bdu.isGregorian()){
      serverDate = bdu.fromGregorian(serverDate);
      todayMidnight = bdu.fromGregorian(todayMidnight);
   }
   if (dayDelta <= 2 && dayDelta >= -2) {

      if (dayDelta == 2) {
         // output "<day name> at hour"
         if (!dontshowtime)
            resultTime = this.Days[serverDate.getDay()] + " " + this.At + " "
                  + this.getLocalizedTime(serverDate);
         else
            resultTime = this.Days[serverDate.getDay()];
      }
      else if (dayDelta == 1) {
         // output "Yesterday at hour"
         if (!dontshowtime)
            resultTime = this.Yesterday + " " + this.At + " "
                  + this.getLocalizedTime(serverDate);
         else
            resultTime = this.Yesterday;
      }
      else if (dayDelta == 0) {
         // output "Today at hour"
         if (!dontshowtime)
            resultTime = this.Today + " " + this.At + " " + this.getLocalizedTime(serverDate);
         else
            resultTime = this.Today;
      }
      else if (dayDelta == -1) {
         // output "Tomorrow"
         resultTime = this.Tomorrow;
      }
      else if (dayDelta == -2) {
         // output "<day name>"
         resultTime = this.Days[serverDate.getDay()];
      }

      // if still in the same year
   }
   else if (todayMidnight.getFullYear() == serverDate.getFullYear()) {
      // output "<day num> <month>"
      var lcl = lconn.core.locale, lang = lcl.getLanguage(), country = lcl.getCountry();
      if(lang === 'en' && (!country || country === 'us') && !showFullYear){
          resultTime = this.Month[ serverDate.getMonth() ] + " " + serverDate.getDate();
      } else {
          resultTime = this.getLocalizedDate(serverDate);
      }

      // really frickin old, or in the far future
   }
   else {
      // output "<day num> <month> <year>"
      var lcl = lconn.core.locale, lang = lcl.getLanguage(), country = lcl.getCountry();
      if(lang === 'en' && (!country || country === 'us')) {
         resultTime = this.Month[serverDate.getMonth()] + " "
               + serverDate.getDate() + ", " + serverDate.getFullYear();
      }
      else {
         resultTime = this.getLocalizedDate(serverDate);
      }
   }

   // return "<span title=\"" + serverDate.toLocaleString() + "\">" + resultTime
   // + "</span>";

   // #CBHG7SZH4L: Add an RTL marker before Arabic dates or else the date will
   // be rendered incorrectly if they
   // are preceded by Latin text.
   if (djConfig.locale == 'ar') {
      return '\u200F' + resultTime;
   }
   return resultTime;

};

w.getLocalizedTime = function(date) {
   return dojo.date.locale.format(date, {
      selector : 'time',
      formatLength : 'short',
      locale : djConfig.locale
   });
};

w.getLocalizedDate = function(date) {
     //bidi support
   if(bdu.isGregorian())
      return dojo.date.locale.format(date, {selector : 'date', formatLength : 'medium', locale : djConfig.locale});
   else
      return bdu.formatBidiDate(date, {selector: "date", formatLength: "medium", locale: djConfig.locale});
};

w.getLocaleString = function(date) {
   var serverDate = new Date();
   serverDate.setTime(date);
   if(bdu.isGregorian())
      return serverDate.toLocaleString();
   else
      return bdu.formatBidiDate(serverDate, {selector: "date", formatLength: "medium", locale: djConfig.locale});
};

lconn.core.DateUtil = w;

})();

/**
 * Convert a date in atom format to a javascript date object. Return null if
 * date could not be parsed
 * 
 * @param dateString -
 *           date string in atom date format
 * @return - the date as a javascript date, or null if not parsed
 */
lconn.core.DateUtil.atomDateToJsDate = function atomDateToJsDate(dateString) {
   var parsedDate = null;
   var s = dateString;
   var isZulu = (s.charAt(s.length - 1) == 'Z');
   var firstDash = s.indexOf("-");

   // safety check - make sure date string is long enough before attempting to
   // parse
   if (s.length >= "yyyy-mm-ddThh:mm".length) {

      s = s.substring(firstDash - 4);// back up for yyyy
      var y = parseInt(s.substr(0, 4));
      var m = parseInt(s.substr(5, 2), 10) - 1;
      var d = parseInt(s.substr(8, 2), 10);
      var h = parseInt(s.substr(11, 2), 10);
      var mi = parseInt(s.substr(14, 2), 10);

      var utc = 0;

      // deal with "UTC Zulu" format like this: 2008-09-26T14:51:41.931Z
      if (isZulu) {
         var secStr = s.substring(17, s.length - 1);
         var secNum = parseFloat(secStr);
         utc = Date.UTC(y, m, d, h, mi) + secNum * 1000;
      }
      else {
         // deal with "UTC Offset" format 2008-09-24T15:02:12-04:00
         var zh = 0; // offset hour
         var zm = 0; // offset minute

         var offsetCharIdx = s.length - 6;
         var offsetChar = s.charAt(offsetCharIdx);

         // safety check - make sure there is an offset time
         if ((offsetChar == "+" || offsetChar == "-")
               && s.indexOf("T") < s.length - 5) {
            var se = parseInt(s.substr(17, 2), 10);
            var zh = parseInt(s.substr(offsetCharIdx, 3), 10); // offset hour
            var zm = parseInt(s.substr(offsetCharIdx + 4, 2), 10); // offset
                                                                     // minute
         }

         utc = Date.UTC(y, m, d, h, mi, se)
               - (zh * 60 * 60 * 1000 + zm * 60 * 1000);
      }

      // get utc date object from computed date and make into string
      parsedDate = new Date(utc);
   }
   return parsedDate;
};

/**
 * Convert a date in atom date format to connections spec date.
 * @function
 * @name AtomDateToString
 * @memberof lconn.core.DateUtil
 * 
 * @see lconn.core.DateUtil.toString
 * 
 * @param {String} dateString
 *           string in atom date format
 * @param {boolean} dontShowTime
 *           hide the time part of the date string
 * 
 * @return {String} the formatted date, or the original string if date could not be
 *         parsed
 */
lconn.core.DateUtil.AtomDateToString = function AtomDateToString(dateString,
      dontShowTime) {
	var date = lconn.core.DateUtil.atomDateToJsDate(dateString);
	//bidi support
	var iDate = new Date(dateString);
	date = iDate.getDay() && !date ? iDate : date;
   return date ? lconn.core.DateUtil.toString(date, dontShowTime) : dateString;
};
