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
dojo.provide('lconn.core.ext.timeago.Timeago');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require("dojo.i18n");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.requireLocalization("lconn.core.ext.timeago", "Timeago");

dojo.declare('lconn.core.ext.timeago.Timeago', [dijit._Widget], {
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
        this.settings.strings = dojo.i18n.getLocalization('lconn.core.ext.timeago', "Timeago", this.lang);
        
        this.refresh();        
        
        if (this.timeout && this.timeout > 0) {
            this.interval = setInterval("dijit.byId('"+this.id+"').refresh();", this.timeout);
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
            var string = dojo.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
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
        var s = dojo.trim(iso8601);      
        s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
        s = s.replace(/-/,"/").replace(/-/,"/");
        s = s.replace(/T/," ").replace(/Z/," UTC");
        s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
        return new Date(s);
    },
    datetime: function() {
        var isTime = this.domNode.tagName.toLowerCase() === "time";
        var iso8601 = isTime ? dojo.attr(this.domNode, "datetime") : dojo.attr(this.domNode, "title");
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
        		this.domNode.innerHTML = com.ibm.social.incontext.util.date.formatByAge(data.datetime, {
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
            this.interval = setInterval("dijit.byId('"+this.id+"').refresh();", this.timeout);
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
            var text = com.ibm.social.incontext.util.date.format(this.timeago.datetime, this.settings.strings.timeHover, this.settings.strings.AMPM);
            if (text.length > 0) {
                dojo.attr(this.domNode, "title", text);
            }
        }
        return this.timeago;
    },
    distance: function (date) {
        return (new Date().getTime() - date.getTime());
    },
    dayDelta: function(date){
    	
    },

    uninitialize: function() {
	    clearInterval(this.interval);
	    this.inherited(arguments);		   
    }
});