/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.DateFormater");

djConfig = dojo.config; // needed by DateUtils, this variable is not initialized in dojo 1.1 any longer
dojo.require("lconn.core.DateUtil");

dojo.declare(
	// class
	"com.ibm.social.as.util.DateFormater",	
	// superclass
	null,
	{	
		// Update 21st May: switched to DateUtils in Core
		// --------------------------------------
		// summary: DateFormater utility class to format dates according to common Connections guidelines
    	// description: The format follows the common guidelines for the dates, that is:
   		// 			- If the passed date is today, yesterday or tomorrow, the format is Today (resp. Yesterday, Tomorrow) + the time. For instance: Today 11:14 PM
    	// 			- If the passed date is in the current week, but not today, yesterday or tomorrow, the format is the full name of the day + the time. For instance: Monday 11:14 PM
    	// 			- If the passed date is not in the current week, but in the current year, the format is day number + abbreviated month. For instance: 4 Oct
    	// 			- If the passed date is neither in the current week nor in the current year, the format is day number + abbreviated month + full year. For instance: 4 Oct 1983
		//      The utility class is fully internationalized.
    	// 
		// author: Vincent Burckhardt
		// example: See Unit Tests		
		
		formatDateTime: function(/*Date object or ISODateStamp string*/ date){
			// summary: Format date according to common guildelines. See class description for more details
			// returns: String - formated date 		
			
			var formatedDate = null;
						
			try{
				// create date object if timestamp string was passed
				var d = date instanceof Date ? date : dojo.date.stamp.fromISOString(date);
				formatedDate = lconn.core.DateUtil.toString(d);
				return formatedDate;
			}
			catch (ex){
				as_console_debug("formatDateTime exception [" + ex + "]");
				return ""; 
			}
		},
		
		/**
		 * This formater will format date in the following style
		 * If the date time is in TODAY, it will display <time> eg. 9:30 AM
		 * If the date time is in THIS YEAR, it will display <Day> eg. Nov 11
		 * Otherwise it will display <Day>, <Year> eg. Nov 11, 2010 
		 * 
		 * NOTE: The code is mostly copied from lconn.core.DateUtil.toStringFoTimeInMs
		 * to meet the date formatting requirement of homepage activity stream.
		 * The change is it removes some if/else paths that handle 'Yesterday', 'Tomorrow', etc
		 * Other changes from are marked with // CHANGE:
		 * 
		 * @param date {object/string} Date object or ISODateStamp string
		 * @returns {string} formated date
		 */
		formatDateTime2: function(/*Date object or ISODateStamp string*/ date){
			var resultTime = null;
			try {
				// create date object if timestamp string was passed
				var d = date instanceof Date ? date : dojo.date.stamp.fromISOString(date);
				
				var du = lconn.core.DateUtil;
				
				// the following code is tailored from lconn.core.DateUtil.toStringFoTimeInMs
				var dateInMS = d.getTime();
				if(du.Days == null)
					du.Days = dojo.i18n.getLocalization("dojo.cldr", "gregorian")['days-format-wide'];
				if(du.Month == null)
					du.Month = dojo.i18n.getLocalization("dojo.cldr", "gregorian")['months-format-abbr'];
				//will only work if toString is called after Dojo is loaded
				if (du.inited == null)
					du.initResStrings();

				var todayMidnight = new Date();
				todayMidnight.setHours(0,0,0,0);
				var serverDate = new Date();
				serverDate.setTime(dateInMS);
				var dayDelta = du.delta(todayMidnight, dateInMS);

				if (dayDelta == 0) {
					//CHANGE: output "hour" only for TODAY, eg. 10:30 AM
					resultTime = du.getLocalizedTime(serverDate);
				}
				// CHANGE: remove the if/else paths of (dayDelta==1,2,-1...)
				//if still in the same year
				else if (todayMidnight.getFullYear() == serverDate.getFullYear()) {
					//output "<day num> <month>"
					var mainLocale = djConfig.locale.substring(0,2).toLowerCase();
					var country = '';
					if (djConfig.locale.length > 2) {
						country = djConfig.locale.substring(3,5).toLowerCase();
					}
					if(mainLocale == 'en' && (country == '' || country == 'us') ){
						resultTime = du.Month[serverDate.getMonth()] + " " + serverDate.getDate();
					} else {
						resultTime = du.getLocalizedDate(serverDate);
					}
				}
				//really old, or in the far future
				else {
					//output "<day num> <month> <year>"
					var mainLocale = djConfig.locale.substring(0,2).toLowerCase();
					var country = '';
					if (djConfig.locale.length > 2) {
						country = djConfig.locale.substring(3,5).toLowerCase();
					}
					if(mainLocale == 'en' && (country == '' || country == 'us') ){
						resultTime = du.Month[serverDate.getMonth()] + " " + serverDate.getDate() + ", " + serverDate.getFullYear();
					} else {
						resultTime = du.getLocalizedDate(serverDate);
					}
				}
				//return "<span title=\"" + serverDate.toLocaleString() + "\">" + resultTime + "</span>";
				//#CBHG7SZH4L: Add an RTL marker before Arabic dates or else the date will be rendered incorrectly if they
				// are preceded by Latin text.
				if (djConfig.locale == 'ar') {
					return '\u200F' + resultTime;
				}
				return resultTime;
				// end 
			} 
			catch (ex){
				as_console_debug("formatDateTime exception [" + ex + "]");
				return ""; 
			}
		},
		
		formatDate: function(/*Date object or ISODateStamp string*/ date){
			// summary: Format date according to common guildelines. See class description for more details
			// returns: String - formated date 		
			
			var formatedDate = null;
						
			try{
				// create date object if timestamp string was passed
				var d = date instanceof Date ? date : dojo.date.stamp.fromISOString(date);
				formatedDate = lconn.core.DateUtil.toString(d, true);
				return formatedDate;
			}
			catch (ex){
				as_console_debug("formatDate exception [" + ex + "]");
				return ""; 
			}
		},
		
		formatTime: function(/*Date object or ISODateStamp string*/ date){
			// summary: Format date according to common guildelines. See class description for more details
			// returns: String - formated date 		
			
			var formatedTime = null;
						
			try{
				// create date object if timestamp string was passed
				var d = date instanceof Date ? date : dojo.date.stamp.fromISOString(date);
				formatedTime = lconn.core.DateUtil.getLocalizedTime(d);
				return formatedTime;
			}
			catch (ex){
				as_console_debug("formatTime exception [" + ex + "]");
				return ""; 
			}
		}
		
	}
);
