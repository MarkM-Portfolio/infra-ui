/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/kernel",
	"dojo/date/locale",
	"dojo/has",
	"dojo/string",
	"ic-core/globalization/BidiDateUtil",
	"./DateFormat"
], function (dojo, declare, kernel, localeModule, has, string, bdu, DateFormat) {
			
	 
	var incontextDate = {	
	   REPLACE: /\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
	   MILLS_IN_DAY: 86400000,
	   toTimestamp: function(date, nls) {
	      return date.format(date,nls.FULL,nls);
	   },
	   formatByAge: function(date, strings, nls) {
	      var now = new Date();
	      var qud = incontextDate;
	      var delta = qud.delta(date, now);
	      if (delta < 7 && delta >= -1) {
	         if (delta >= 2)
	            return qud.format(date, strings.DAY, nls);
	         else if (delta == 1)
	            return qud.format(date, strings.YESTERDAY, nls);
	         else if (delta === 0)
	            return qud.format(date, strings.TODAY, nls);
	         else if (delta == -1 && strings.TOMORROW)
	            return qud.format(date, strings.TOMORROW, nls);
	      } 
	      else if ( now.getFullYear() == date.getFullYear() )
	         return qud.format(date, strings.MONTH, nls);
	      return qud.format(date, strings.YEAR, nls);
	   },   
	   format: function(date,template,nls) {
	      var qud = incontextDate;
	      var re = qud.REPLACE;
	      re.lastIndex = 0;
	      var value = template.replace(re, function(match, key, format){
	         var f = qud[key];
	         var s = f ? f(date,nls) : "${"+key+"}";
	         return s;
	      }); // string
	      return value;
	   },
	   delta: function(date, nls) {
	      return DateFormat.delta(date, new Date());
	   },
	   getDays: function() {
	      var qud = incontextDate;
	      if (!qud._days)
	         qud._days = localeModule.getNames("days", "wide");
	      return qud._days;
	   },
	   getDaysAbbr: function() {
	      var qud = incontextDate;
	      if (!qud._daysAbbr)
	         qud._daysAbbr = localeModule.getNames("days", "abbr");
	      return qud._daysAbbr;
	   },
	   getMonths: function() {
	      var qud = incontextDate;
	      if (!qud._months)
	         qud._months = localeModule.getNames("months", "abbr");
	   //bidi support
	     if (bdu.isGregorian())    
	      return qud._months;
	     else
	      return bdu.getDateComponent("months", "abbr");
	   },
	   getMonthsWide: function() {
	      var qud = incontextDate;
	      if (!qud._monthsWide)
	         qud._monthsWide = localeModule.getNames("months", "wide");
	   //bidi support
	     if (bdu.isGregorian())    
	      return qud._monthsWide;
	     else
	      return bdu.getDateComponent("months", "wide");
	   },
	   
	   Z: function(date, nls) {
	      var timezone = "-";
	      var tzMins = date.getTimezoneOffset();
	      if(tzMins < 0) {
	         tzMins = Math.abs(tzMins);
	         timezone = "+";
	      }
	      
	      var tzHours = Math.floor(tzMins / 60);
	      tzMins %= 60;
	      if(tzHours < 10)
	         tzHours = "0"+tzHours;
	      if(tzMins < 10)
	         tzMins = "0"+tzMins;
	      timezone += tzHours+""+tzMins;
	
	      return timezone;
	   },
	   ZZZZ_REGEX: /\(([^\)]+)\)/,
	   ZZZZ: function(date, nls) {
	      var ZZZZ;
	      var qud = incontextDate;
	      if (has("ie")) {
	         var tokens = date.toString().split(" ");
	         ZZZZ = (tokens.length > 2) ? tokens[tokens.length-2] : qud.Z(date,nls);
	      }
	      else {
	         var re = qud.ZZZZ_REGEX;
	         re.lastIndex = 0;
	         var r = re.exec(date.toString());
	         ZZZZ = r ? r[1] : qud.Z(date,nls);
	      }
	      return ZZZZ;
	   },
	   YYYY: function(date, nls) {
	   //bidi support
	      if (bdu.isGregorian())  
	      return date.getFullYear();
	   else
	      return bdu.fromGregorian(date).getFullYear();
	   },
	
	   EEE: function(date,nls,offset) {
	      var day = incontextDate.dt.getDay();
	      if (offset > 0)
	         day = (day+7-offset) % 7;
	      return incontextDate.getDaysAbbr()[day];
	   },
	   EEEE: function(date,nls,offset) {
	      var day = date.getDay();
	      if (offset > 0)
	         day = (day+7-offset) % 7;
	      return incontextDate.getDays()[day];
	   },
	   EEee: function(date,nls,offset) {
	      var delta = date.delta(date) + (offset ? offset : 0);
	      return (delta === 0) ? nls.TODAY_U : (delta == 1) ? nls.YESTERDAY_U : incontextDate.EEEE(date,nls,offset);
	   },
	   eeEE: function(date,nls,offset) {
	      var delta = date.delta(date) + (offset ? offset : 0);
	      return (delta === 0) ? nls.TODAY : (delta == 1) ? nls.YESTERDAY : incontextDate.EEEE(date,nls,offset);
	   },
	      
	   MMMM: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      return incontextDate.getMonthsWide()[date.getMonth()];
	   else
	      return incontextDate.getMonthsWide()[bdu.fromGregorian(date).getMonth()];
	   },
	   MMM: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      return incontextDate.getMonths()[date.getMonth()];
	   else
	      return incontextDate.getMonths()[bdu.fromGregorian(date).getMonth()];
	   },
	   MM: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      var i = date.getMonth() + 1;
	   else
	      var i = bdu.fromGregorian(date).getMonth() + 1;
	      
	   return (i > 9) ? i : ("0"+i);
	   },   
	   Mmm: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      return nls.MONTHS_ABBR[date.getMonth()];
	   else
	      return incontextDate.getMonths()[bdu.fromGregorian(date).getMonth()];
	   },
	   
	   d: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      return date.getDate();
	   else
	      return bdu.fromGregorian(date).getDate();
	   },
	   dd: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      var i = incontextDate.getDate();
	   else
	       var i = bdu.fromGregorian(date).getDate();
	      
	   return (i > 9) ? i : ("0"+i);  
	   },
	
	   a: function(date, nls) {return date.getHours() < 12 ? nls.AM : nls.PM;},
	   HH: function(date, nls) {var i = date.getHours(); return (i > 9) ? i : ("0"+i);},
	   h: function(date, nls) {
	      var hours = date.getHours();
	      if (hours > 12)
	         hours -= 12;
	      else if (hours === 0)
	         hours = 12;
	      return hours;
	   },
	   hh: function(date, nls){
	      var hours = incontextDate.h(date, nls);
	      return (hours > 9) ? hours : ("0"+hours);
	   },
	   mm: function(date, nls) {
	      var minutes = date.getMinutes();
	      return (minutes < 10) ? "0"+minutes : minutes;
	   },
	   ss: function(date, nls) {
	      var seconds = date.getSeconds();
	      return (seconds < 10) ? "0"+seconds : seconds;
	   }, 
	   date: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      return localeModule.format(date, {selector:'date', formatLength: 'short', locale: djConfig.locale });
	   else
	      return bdu.formatBidiDate(date, {selector:'date', formatLength: 'short', locale: djConfig.locale});
	   },
	   date_short: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      return localeModule.format(date, {selector:'date',formatLength: DateFormat.prototype.USE_MED_DATE_FOR_SHORT[djConfig.locale] ? 'medium' : 'short', locale: djConfig.locale });
	   else
	      return bdu.formatBidiDate(date, {selector:'date',formatLength: DateFormat.prototype.USE_MED_DATE_FOR_SHORT[djConfig.locale] ? 'medium' : 'short', locale: djConfig.locale });   
	   },
	   date_long: function(date, nls) {
	   //bidi support
	   if (bdu.isGregorian())  
	      return localeModule.format(date, {selector:'date', formatLength: 'long', locale: djConfig.locale });
	   else
	      return bdu.formatBidiDate(date, {selector:'date', formatLength: 'long', locale: djConfig.locale});
	   },
	   time: function(date, nls) {
	      return localeModule.format(date, {selector:'time',formatLength: 'short', locale: djConfig.locale });
	   },
	   time_long: function(date, nls) {
	      return localeModule.format(date, {selector:'time',formatLength: 'long', locale: djConfig.locale });
	   }
	};
	return incontextDate;

});
