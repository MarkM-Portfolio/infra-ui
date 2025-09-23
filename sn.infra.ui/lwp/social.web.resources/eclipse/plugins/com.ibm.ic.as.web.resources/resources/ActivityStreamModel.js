/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/constants/events"
	], function (declare, events) {
	
		/**
		 * ActivityStreamModel - Retrieves and stores river of news data.
		 */
		
		var ActivityStreamModel = declare(
		"com.ibm.social.as.ActivityStreamModel", null,
		{
			/**
			 * Get a new stream. Simply GETs the URL passed by options.newsUrl,
			 * appends the data returned to an internal array and fires the onLoad
			 * callback function.
			 * @param options - object that should contain 'newsUrl' and 'onLoad'
			 * properties (with String and Function type respectively).
			 */
			getStream: function(options){
				// If a URL is passed, call it and retrieve a stream object 
				var xhr;
				if(options.newsUrl){
					xhr = activityStreamAbstractHelper.xhrGet({
						url: options.newsUrl,
						preventCache: true,
						handleAs: "json",
						load: options.onLoad,
						error: options.onError,
						timeout: 60000
					});
				}
				return xhr;
			}
		});
		
		return ActivityStreamModel;
	});
