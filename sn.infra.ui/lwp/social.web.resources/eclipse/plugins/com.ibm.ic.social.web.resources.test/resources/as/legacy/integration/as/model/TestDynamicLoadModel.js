/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare"
], function (declare) {

	/**
	 */
	
	var TestDynamicLoadModel = declare("com.ibm.social.test.integration.as.model.TestDynamicLoadModel", null, {
		
		/**
		 * Get a new stream. Simply GETs the URL passed by options.newsUrl,
		 * appends the data returned to an internal array and fires the onLoad
		 * callback function.
		 * @param options - object that should contain 'newsUrl' and 'onLoad'
		 * properties (with String and Function type respectively).
		 */
		getStream: function(options){
			var feedToLoad = this.getFeedToLoad(options.newsUrl); 
			
			options.onLoad({
				entry: com.ibm.social.test.integration.as.testfeeds.controller[feedToLoad]
			});
		},
		
		getFeedToLoad: function(url){
			if(url.indexOf("=") > -1){
				return url.substring(url.lastIndexOf("=")+1);
			}
			
			return "DefaultFeed";
		}
	});
	return TestDynamicLoadModel;
});
