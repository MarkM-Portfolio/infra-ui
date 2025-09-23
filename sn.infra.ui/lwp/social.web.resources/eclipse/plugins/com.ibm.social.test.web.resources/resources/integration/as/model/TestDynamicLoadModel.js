/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.integration.as.model.TestDynamicLoadModel");

dojo.require("com.ibm.social.test.integration.as.testfeeds.controller.DefaultFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.controller.DynamicAddFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.controller.DynamicUpdateFeed");

/**
 */

dojo.declare("com.ibm.social.test.integration.as.model.TestDynamicLoadModel", null, {
	
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