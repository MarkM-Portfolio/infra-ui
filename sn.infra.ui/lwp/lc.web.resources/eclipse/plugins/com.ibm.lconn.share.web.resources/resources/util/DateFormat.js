/* Copyright IBM Corp. 2009, 2018  All Rights Reserved.              */
(function(){
dojo.provide("lconn.share.util.DateFormat");
dojo.require("dojo.date.locale");
dojo.require("lconn.core.globalization.BidiDateUtil");
dojo.require("lconn.core.globalization.bidiUtil");

var bdu = lconn.core.globalization.BidiDateUtil;

dojo.declare("lconn.share.util.DateFormat", null, {
   MILLS_IN_DAY: 86400000,
   
   // During construction, if this is a redefinition of DateFormat, copy the old version of _nls
   _nls: dojo.getObject("lconn.share.util.DateFormat.prototype._nls"),
   
   constructor: function(date, parameters) {
      this.dt = date || new Date();
      if (parameters)
         for (var key in parameters)
            this[key] = parameters[key];
      this._transform = dojo.hitch(this,this.substitute);
   },
   nls: function() {
      if (!this._nls)
         throw "Resource bundle must be set to lconn.share.util.DateFormat.prototype._nls prior to use";
      return this._nls;
   },
   substitute: function(value,key) {
      var value = this[key];
      if (typeof value == "function")
         value = value.apply(this, []);
      if (typeof value == "undefined" || value == null)
         value = "${"+key+"}";
      return value;
   },
   toTimestamp: function() {
      return this.format(this.nls().DATE.FULL);
   },
   format: function(s) {
      return dojo.string.substitute(s, null, this._transform);
   },
   formatByAge: function(strings) {
      strings = strings || this.nls().DATE.RELATIVE_TIME;
      var delta = this.delta();
      if (delta < 7 && delta >= -1) {
         if (delta >= 2)
            return this.format(strings.DAY);
         else if (delta == 1)
            return this.format(strings.YESTERDAY);
         else if (delta == 0)
            return this.format(strings.TODAY);
         else if (delta == -1 && strings.TOMORROW)
            return this.format(strings.TOMORROW);
      } 
      else if ( new Date().getFullYear() == this.dt.getFullYear() )
         return this.format(strings.MONTH);
      return this.format(strings.YEAR);
   },
   formatByAgeToHtml: function(strings,d) {
      var format = this.formatByAge(strings);
      var span = d.createElement("SPAN");
      var spanText = format ? format : this.dt.toString();
      spanText = lconn.core.globalization.bidiUtil.numShapeStr(spanText);
      span.appendChild(d.createTextNode(spanText));
      span.title = (strings && strings.FULL) ? this.format(strings.FULL) : this.format(this.nls().DATE.RELATIVE_TIME.FULL);
      span.title = lconn.core.globalization.bidiUtil.numShapeStr(span.title);
      
      return span;
   },
   delta: function() {
      if (typeof this._delta != "undefined")
         return this._delta;

      this._delta = lconn.share.util.DateFormat.delta(this.dt, new Date());
      return this._delta;
   },
   getDays: function() {
      if (!this._days)
         lconn.share.util.DateFormat.prototype._days = dojo.date.locale.getNames("days", "wide");
      return this._days;
   },
   getDaysAbbr: function() {
      if (!this._daysAbbr)
         lconn.share.util.DateFormat.prototype._daysAbbr = dojo.date.locale.getNames("days", "abbr");
      return this._daysAbbr;
   },
   getMonths: function() {
      if (!this._months)
         lconn.share.util.DateFormat.prototype._months = dojo.date.locale.getNames("months", "abbr");
   //bidi support
   if (bdu.isGregorian())
  return this._months;
   else
  return bdu.getDateComponent("months", "abbr");
   },
   getMonthsWide: function() {
      if (!this._monthsWide)
         lconn.share.util.DateFormat.prototype._monthsWide = dojo.date.locale.getNames("months", "wide");
 // bidi support 
   if (bdu.isGregorian())
  return this._monthsWide;
   else
  return bdu.getDateComponent("months", "wide");  
   },
   getMonthsShort: function() {
      if (!this._monthsShort)
         lconn.share.util.DateFormat.prototype._monthsShort = this.nls().DATE.MONTHS_ABBR;
    // bidi support
   if (bdu.isGregorian())
  return this._monthsShort;
   else
  return bdu.getDateComponent("months", "abbr");
   },
   
   Z: function() {
      if (!this._Z) {
         var timezone = "-";
         var tzMins = this.dt.getTimezoneOffset();
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
         this._Z = timezone;
      }
      return this._Z;
   },
   ZZZZ_REGEX: /\(([^\)]+)\)/,
   ZZZZ: function() {
      if (!this._ZZ) {
         if (dojo.isIE) {
            var tokens = this.dt.toString().split(" ");
            this._ZZ = (tokens.length > 2) ? tokens[tokens.length-2] : this.Z();
         }
         else {
            var r = this.ZZZZ_REGEX.exec(this.dt.toString());
            this._ZZ = r ? r[1] : this.Z();
         }
      }
      return this._ZZ;
   },
   YYYY: function() {
   //bidi support
 if (bdu.isGregorian())
  return this.dt.getFullYear();
 else
  return bdu.fromGregorian(this.dt).getFullYear();
   },

   EEE: function(offset) {
      var day = this.dt.getDay();
      if (offset > 0)
         day = (day+7-offset) % 7;
      return this.getDaysAbbr()[day];
   },
   EEEE: function(offset) {
      var day = this.dt.getDay();
      if (offset > 0)
         day = (day+7-offset) % 7;
      return this.getDays()[day];
   },
   EEee: function(offset) {
      var delta = this.delta() + (offset ? offset : 0);
      return (delta == 0) ? this.nls().DATE.TODAY_U : (delta == 1) ? this.nls().DATE.YESTERDAY_U : this.EEEE(offset);
   },
   eeEE: function(offset) {
      var delta = this.delta() + (offset ? offset : 0);
      return (delta == 0) ? this.nls().DATE.TODAY : (delta == 1) ? this.nls().DATE.YESTERDAY : this.EEEE(offset);
   },
      
   MMMM: function() {
   //bidi support
  if (bdu.isGregorian())
   return this.getMonthsWide()[this.dt.getMonth()];
  else
   return this.getMonthsWide()[bdu.fromGregorian(this.dt).getMonth()];
 },
   MMM: function() {
   //bidi support
  if (bdu.isGregorian())
   return this.getMonths()[this.dt.getMonth()];
  else
   return this.getMonths()[bdu.fromGregorian(this.dt).getMonth()];
   },
   MM: function() {
   //bidi support
  if (bdu.isGregorian())
   var i = this.dt.getMonth() + 1;
  else
   var i = bdu.fromGregorian(this.dt).getMonth() + 1;
   
  return (i > 9) ? i : ("0"+i);
   },   
   Mmm: function() {
   //bidi support
  if (bdu.isGregorian())
   return this.dt.getMonthsShort()[this.dt.getMonth()];
  else
   return this.getMonthsShort()[bdu.fromGregorian(this.dt).getMonth()];
   },
   
   d: function() {
    //bidi support
  if (bdu.isGregorian())
   return this.dt.getDate();
  else
   return bdu.fromGregorian(this.dt).getDate();
 },
   dd: function() {
   //bidi support
  if (bdu.isGregorian())
   var i = this.dt.getDate(); 
  else
    var i = bdu.fromGregorian(this.dt).getDate();
    
  return (i > 9) ? i : ("0"+i);
   },

   a: function() {return this.dt.getHours() < 12 ? this.nls().DATE.AM : this.nls().DATE.PM;},
   HH: function() {var i = this.dt.getHours(); return (i > 9) ? i : ("0"+i);},
   hh: function() {
      var hours = this.dt.getHours();
      if (hours > 12)
         hours -= 12;
      else if (hours == 0)
         hours = 12;
      return (hours > 9) ? hours : ("0"+hours);
   },
   mm: function() {
      var minutes = this.dt.getMinutes();
      return (minutes < 10) ? "0"+minutes : minutes;
   },
   ss: function() {
      var seconds = this.dt.getSeconds();
      return (seconds < 10) ? "0"+seconds : seconds;
   }, 
   date: function() {
   //bidi support
  if (bdu.isGregorian())
   return dojo.date.locale.format(this.dt, {selector:'date',formatLength: 'short', locale: djConfig.locale });
  else
   return bdu.formatBidiDate(this.dt, {selector:'date',formatLength: 'short', locale: djConfig.locale});
   },
   date_long: function() {
   //bidi support
  if (bdu.isGregorian())
   return dojo.date.locale.format(this.dt, {selector:'date',formatLength: 'long', locale: djConfig.locale });
  else
   return bdu.formatBidiDate(this.dt, {selector:'date',formatLength: 'long', locale: djConfig.locale});
      
   },
   
   date_medium: function() {
      var template = dojo.i18n.getLocalization("dojo.cldr", "gregorian")["dateFormatItem-MMMd"];
      if (bdu.isGregorian()) {
         return dojo.date.locale.format(this.dt, {selector:'date', datePattern: template, formatLength: 'long', locale: djConfig.locale });
      }
      template = dojo.i18n.getLocalization("dojo.cldr", "hebrew")["dateFormatItem-MMMd"];
      return bdu.formatBidiDate(this.dt, {selector:'date', datePattern: template, formatLength: 'long', locale: djConfig.locale});
   },
   
   time: function() {
      return dojo.date.locale.format(this.dt, {selector:'time',formatLength: 'short', locale: djConfig.locale });
   },
   time_long: function() {
      return dojo.date.locale.format(this.dt, {selector:'time',formatLength: 'long', locale: djConfig.locale });
   }
});

lconn.share.util.date = {
   REPLACE: /\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
   MILLS_IN_DAY: 86400000,
   toTimestamp: function(date, nls) {
      return lconn.share.util.date.format(date,nls.FULL,nls);
   },
   formatByAge: function(date, strings, nls) {
      var now = new Date();
      var qud = lconn.share.util.date;
      var delta = qud.delta(date, now);
      if (delta < 7 && delta >= -1) {
         if (delta >= 2)
            return qud.format(date, strings.DAY, nls);
         else if (delta == 1)
            return qud.format(date, strings.YESTERDAY, nls);
         else if (delta == 0)
            return qud.format(date, strings.TODAY, nls);
         else if (delta == -1 && strings.TOMORROW)
            return qud.format(date, strings.TOMORROW, nls);
      } 
      else if ( now.getFullYear() == date.getFullYear() )
         return qud.format(date, strings.MONTH, nls);
      return qud.format(date, strings.YEAR, nls);
   },   
   format: function(date,template,nls) {
      var qud = lconn.share.util.date;
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
      return lconn.share.util.DateFormat.delta(date, new Date());
   },
   getDays: function() {
      var qud = lconn.share.util.date;
      if (!qud._days)
         qud._days = dojo.date.locale.getNames("days", "wide");
      return qud._days;
   },
   getDaysAbbr: function() {
      var qud = lconn.share.util.date;
      if (!qud._daysAbbr)
         qud._daysAbbr = dojo.date.locale.getNames("days", "abbr");
      return qud._daysAbbr;
   },
   getMonths: function() {
      var qud = lconn.share.util.date;
      if (!qud._months)
         qud._months = dojo.date.locale.getNames("months", "abbr");
 
 //bidi support
   if (bdu.isGregorian())
  return qud._months;
   else
  return bdu.getDateComponent("months", "abbr");
      
   },
   getMonthsWide: function() {
      var qud = lconn.share.util.date;
      if (!qud._monthsWide)
         qud._monthsWide = dojo.date.locale.getNames("months", "wide");
      
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
      var qud = lconn.share.util.date;
      if (dojo.isIE) {
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
      var day = date.getDay();
      if (offset > 0)
         day = (day+7-offset) % 7;
      return lconn.share.util.date.getDaysAbbr()[day];
   },
   EEEE: function(date,nls,offset) {
      var day = date.getDay();
      if (offset > 0)
         day = (day+7-offset) % 7;
      return lconn.share.util.date.getDays()[day];
   },
   EEee: function(date,nls,offset) {
      var delta = lconn.share.util.date.delta(date) + (offset ? offset : 0);
      return (delta == 0) ? nls.TODAY_U : (delta == 1) ? nls.YESTERDAY_U : lconn.share.util.date.EEEE(date,nls,offset);
   },
   eeEE: function(date,nls,offset) {
      var delta = lconn.share.util.date.delta(date) + (offset ? offset : 0);
      return (delta == 0) ? nls.TODAY : (delta == 1) ? nls.YESTERDAY : lconn.share.util.date.EEEE(date,nls,offset);
   },
      
   MMMM: function(date, nls) {
    //bidi support
 if (bdu.isGregorian())
  return lconn.share.util.date.getMonthsWide()[date.getMonth()];
 else
  return lconn.share.util.date.getMonthsWide()[bdu.fromGregorian(date).getMonth()];
   },
   MMM: function(date, nls) {
   //bidi support
 if (bdu.isGregorian())
  return lconn.share.util.date.getMonths()[date.getMonth()];
 else
  return lconn.share.util.date.getMonthsWide()[bdu.fromGregorian(date).getMonth()];
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
  return lconn.share.util.date.getMonths()[bdu.fromGregorian(date).getMonth()];
   
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
   var i = date.getDate();
  else
      var i = bdu.fromGregorian(date).getDate();
  
  return (i > 9) ? i : ("0"+i);  
    },

   a: function(date, nls) {return date.getHours() < 12 ? nls.AM : nls.PM;},
   HH: function(date, nls) {var i = date.getHours(); return (i > 9) ? i : ("0"+i);},
   hh: function(date, nls) {
      var hours = date.getHours();
      if (hours > 12)
         hours -= 12;
      else if (hours == 0)
         hours = 12;
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
  return dojo.date.locale.format(date, {selector:'date', formatLength: 'short', locale: djConfig.locale });
 else
  return bdu.formatBidiDate(date, {selector:'date', formatLength: 'short', locale: djConfig.locale}); 
   },
   date_long: function(date, nls) {
   //bidi support
 if (bdu.isGregorian())
  return dojo.date.locale.format(date, {selector:'date', formatLength: 'long', locale: djConfig.locale });
 else
  return bdu.formatBidiDate(date, {selector:'date', formatLength: 'long', locale: djConfig.locale});
   },
   
   date_medium: function(date, nls) {
      var template = dojo.i18n.getLocalization("dojo.cldr", "gregorian")["dateFormatItem-MMMd"];
      if (bdu.isGregorian()) {
         return dojo.date.locale.format(date, {selector:'date', datePattern: template, formatLength: 'long', locale: djConfig.locale });
      }
      template = dojo.i18n.getLocalization("dojo.cldr", "hebrew")["dateFormatItem-MMMd"];
      return bdu.formatBidiDate(date, {selector:'date', datePattern: template, formatLength: 'long', locale: djConfig.locale});
   },
   
   time: function(date, nls) {
      return dojo.date.locale.format(date, {selector:'time',formatLength: 'short', locale: djConfig.locale });
   },
   time_long: function(date, nls) {
      return dojo.date.locale.format(date, {selector:'time',formatLength: 'long', locale: djConfig.locale });
   }
}

lconn.share.util.DateFormat.delta = function(from,to) {
   var dateMillis = from.getTime();
   var toMidnight = new Date(to.getTime());
   toMidnight.setHours(0);
   toMidnight.setMinutes(0);
   toMidnight.setSeconds(0);
   toMidnight.setMilliseconds(0);

   var diff  = toMidnight.getTime() - dateMillis;
   var dayDelta = Math.ceil( diff / ( lconn.share.util.DateFormat.prototype.MILLS_IN_DAY) );
   return dayDelta;
}
})();
