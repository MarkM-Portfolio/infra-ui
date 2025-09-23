/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/date/stamp",
	"ic-core/DateUtil"
], function (declare, stamp, DateUtil) {

	var DateFormater = declare(
		// class
		"lconn.search.utils.DateFormater",
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
		// 		The utility class is fully internationalized.
		// 
		// author: Vincent Burckhardt
		// adapted to the search namespace
		
		formatDateTime: function(/*Date object or ISODateStamp string*/ date){
			// summary: Format date according to common guildelines. See class description for more details
			// returns: String - formated date
			
			// create date object if timestamp string was passed
			var d = date instanceof Date ? date : stamp.fromISOString(date);
			var formatedDate = null;
			
			try{
				formatedDate = DateUtil.toString(d);
			}
			catch (ignoreException){
				; 
			}
			
			return formatedDate;
		}
	});
	
	return DateFormater;
});
