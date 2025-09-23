define([
   "dojo",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-attr",
   "dojo/i18n!./nls/Timeago",
   "dijit/_Templated",
   "dijit/_Widget",
   "dijit/registry",
   "ic-incontext/util/date"
], function (dojo, declare, lang, domAttr, i18nTimeago, _Templated, _Widget, registry, inContextDate) {

   /*
    * FIXME: this module has the following issues:
    * - Refers to com.ibm.social.incontext.util.date without requiring it
    * - calls dijit.byId() in an evaluated string
    */

   /*
    * timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
    * @requires jQuery v1.2.3 or later
    *
    * Timeago is a jQuery plugin that makes it easy to support automatically
    * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
    *
    * For usage and examples, visit:
    * http://timeago.yarp.com/
    *
    * Licensed under the MIT:
    * http://www.opensource.org/licenses/mit-license.php
    *
    * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
    */
   var Timeago = declare('lconn.core.ext.timeago.Timeago', _Widget, {
       settings: {
           refreshMillis: 60000,
           secRefreshMillis: 5000,
           allowFuture: false,
           strings: {
       }
       },
       dayInMillis : 24 * 60 * 60 * 1000,
       interval: null,
       postCreate: function() {
           this.settings.strings = i18nTimeago; //i18n.getLocalization(n.core.ext.timeago', "Ti, ago", thi, lang);

           this.refresh();

           if (this.timeout && this.id && registry) {
               this.interval = setInterval(lang.hitch(this, function(){
            	   var timeagoNode = registry.byId(this.id);
            	   if(timeagoNode){
            		   timeagoNode.refresh();
            	   }
               }), this.timeout);
           } else {
        	   clearInterval(this.interval);
           }
       },

       inWords: function(distanceMillis) {
           var $l = this.settings.strings;
           var prefix = $l.prefixAgo;
           var suffix = $l.timeAgo;
           if (this.settings.allowFuture) {
            if (distanceMillis < 0) {
                   prefix = $l.prefixFromNow;
                   suffix = $l.suffixFromNow;
               }
               distanceMillis = Math.abs(distanceMillis);
           } else {
               if (distanceMillis < 0) {
                  distanceMillis = 1;
               }
           }

           var seconds = distanceMillis / 1000;
           var minutes = seconds / 60;
           var hours = minutes / 60;
           var days = hours / 24;
           var years = days / 365;

           function substitute(stringOrFunction, number) {
               var string = lang.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
               var value = ($l.numbers && $l.numbers[number]) || number;
               return string.replace(/%d/i, value);
           }

           var words = seconds < 45 && $l.now ||
           minutes < 60 && substitute($l.minutes, Math.round(minutes)) ||
           hours < 24 && substitute($l.hours, Math.round(hours)) ||
           hours < 48 && substitute($l.day, 1) || // all other lines should be redundant from here (inclusive)
           days < 30 && substitute($l.days, Math.floor(days)) ||
           days < 60 && substitute($l.month, 1) ||
           days < 365 && substitute($l.months, Math.floor(days / 30)) ||
           years < 2 && substitute($l.year, 1) ||
           substitute($l.years, Math.floor(years));

           return seconds<45 ? words : substitute(suffix, words);
       },
       parse: function(iso8601) {
           if(!iso8601) return new Date();
           var s = lang.trim(iso8601);
           s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
           s = s.replace(/-/,"/").replace(/-/,"/");
           s = s.replace(/T/," ").replace(/Z/," UTC");
           s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
           return new Date(s);
       },
       datetime: function() {
           var isTime = this.domNode.tagName.toLowerCase() === "time";
           var iso8601 = isTime ? domAttr.get(this.domNode, "datetime") : domAttr.get(this.domNode, "title");
           return this.parse(iso8601);
       },

       refresh: function () {
           var data = this.prepareData();
           if (!isNaN(data.datetime)) {
            var distance = this.distance(data.datetime);
            if(distance < this.dayInMillis) {
               this.domNode.innerHTML = this.inWords(this.distance(data.datetime));
            } else {
               var strings = this.settings.strings;
               this.domNode.innerHTML = inContextDate.formatByAge(data.datetime, {
                  DAY: strings.timeDay,
                  MONTH: strings.timeMonth,
                  YEAR: strings.timeYear,
                  YESTERDAY: strings.timeYesterday
               }, {AM:"AM", PM:"PM"});
            }
           }

           if(this.distance(data.datetime) < 45000) {
               this.timeout = this.settings.secRefreshMillis;
           } else if (this.timeout == this.settings.secRefreshMillis) {
               this.timeout = this.settings.refreshMillis;
               clearInterval(this.interval);
               this.interval = setInterval(lang.hitch(this, function(){
            	   var timeagoNode = registry.byId(this.id);
            	   if(timeagoNode){
            		   timeagoNode.refresh()
            	   }
               }), this.timeout);
           } else {
               this.timeout = this.settings.refreshMillis;
           }

           return ;
       },

       prepareData: function () {
           if (!this.timeago) {
               this.timeago= {
                   datetime: this.datetime()
               };
               var text = inContextDate.format(this.timeago.datetime, this.settings.strings.timeHover, this.settings.strings.AMPM);
               if (text.length > 0) {
                   domAttr.set(this.domNode, "title", text);
               }
           }
           return this.timeago;
       },
       distance: function (date) {
           return (new Date().getTime() - date.getTime());
       },
       dayDelta: function(date){

       }
   });
   return Timeago;
});