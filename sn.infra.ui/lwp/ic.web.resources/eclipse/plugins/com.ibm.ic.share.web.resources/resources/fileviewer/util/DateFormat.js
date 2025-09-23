/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/date/locale",
	"dojo/has",
	"dojo/_base/config"
], function (dojo, declare, lang, localeModule, has, config) {
  /* jshint ignore:start */
	         var DateFormat = declare([], {
	      MILLS_IN_DAY: 86400000,
	
	      // During construction, if this is a redefinition of DateFormat, copy the old version of _nls
	      _nls: lang.getObject("DateFormat.prototype._nls"),
	
	      constructor: function(date, parameters) {
	         this.dt = date || new Date();
	         if (parameters)
	            for (var key in parameters)
	               this[key] = parameters[key];
	         this._transform = lang.hitch(this,this.substitute);
	      },
	      nls: function() {
	         if (!this._nls)
	            throw "Resource bundle must be set to DateFormat.prototype._nls prior to use";
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
	      delta: function() {
	         if (typeof this._delta != "undefined")
	            return this._delta;
	
	         this._delta = DateFormat.delta(this.dt, this._currDate || new Date());
	         return this._delta;
	      },
	      getDays: function() {
	         if (!this._days)
	            DateFormat.prototype._days = localeModule.getNames("days", "wide");
	         return this._days;
	      },
	      getDaysAbbr: function() {
	         if (!this._daysAbbr)
	            DateFormat.prototype._daysAbbr = localeModule.getNames("days", "abbr");
	         return this._daysAbbr;
	      },
	      getMonths: function() {
	         if (!this._months)
	            DateFormat.prototype._months = localeModule.getNames("months", "abbr");
	         //bidi support
	            return this._months;
	      },
	      getMonthsWide: function() {
	         if (!this._monthsWide)
	            DateFormat.prototype._monthsWide = localeModule.getNames("months", "wide");
	         // bidi support 
	            return this._monthsWide;
	      },
	      getMonthsShort: function() {
	         if (!this._monthsShort)
	            DateFormat.prototype._monthsShort = this.nls().DATE.MONTHS_ABBR;
	         // bidi support
	            return this._monthsShort;
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
	            if (has("ie")) {
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
	            return this.dt.getFullYear();
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
	            return this.getMonthsWide()[this.dt.getMonth()];
	      },
	      MMM: function() {
	         //bidi support
	            return this.getMonths()[this.dt.getMonth()];
	      },
	      MM: function() {
	         //bidi support
	            var i = this.dt.getMonth() + 1;
	
	         return (i > 9) ? i : ("0"+i);
	      },   
	      Mmm: function() {
	         //bidi support
	            return this.dt.getMonthsShort()[this.dt.getMonth()];
	      },
	
	      d: function() {
	         //bidi support
	            return this.dt.getDate();
	      },
	      dd: function() {
	         //bidi support
	            var i = this.dt.getDate(); 
	
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
	            return localeModule.format(this.dt, {selector:'date',formatLength: 'short', locale: config.locale });
	      },
	      date_long: function() {
	         //bidi support
	            return localeModule.format(this.dt, {selector:'date',formatLength: 'long', locale: config.locale });	
	      },
	      time: function() {
	         return localeModule.format(this.dt, {selector:'time',formatLength: 'short', locale: config.locale });
	      },
	      time_long: function() {
	         return localeModule.format(this.dt, {selector:'time',formatLength: 'long', locale: config.locale });
	      }
	   });
	         
	   DateFormat.delta = function(from,to) {
	      var dateMillis = from.getTime();
	      var toMidnight = new Date(to.getTime());
	      toMidnight.setHours(0);
	      toMidnight.setMinutes(0);
	      toMidnight.setSeconds(0);
	      toMidnight.setMilliseconds(0);
	
	      var diff  = toMidnight.getTime() - dateMillis;
	      var dayDelta = Math.ceil( diff / ( DateFormat.prototype.MILLS_IN_DAY) );
	      return dayDelta;
	   }
	
	return DateFormat;
	/* jshint ignore:end */
});
