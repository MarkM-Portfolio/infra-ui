/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * DynamicLoadController tests.
 */

dojo.provide("com.ibm.social.test.integration.as.controller.testDynamicLoadController");

dojo.require("com.ibm.social.test.integration.as.config.homepage.dynamicLoadControllerConfig");
dojo.require("com.ibm.social.test.integration.as.model.TestDynamicLoadModel");
dojo.require("com.ibm.social.test.testUtil");

dojo.require("com.ibm.social.as.controller.Controller");
dojo.require("com.ibm.social.as.ActivityStream");
dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");

// Number of news items in the feed
function numNewsItems(node){
	return dojo.query("> li .lotusPost", node).length;
}

com.ibm.social.test.testUtil.registerGroup("integration.as.controller.testDynamicLoadController", 
	[
		{	
			name: "dynamicAddTest",
		 	description: "Test dynamically adding to the AS (e.g. from the Sharebox)",
			runTest: function(){
				// There should be only 1 news item loaded by default
				doh.is(1, numNewsItems(this.group.as.newsFeedNode));
				
				// Dynamically add another feed
				dojo.publish(com.ibm.social.as.constants.events.ADDACTIVITYENTRY, ["DynamicAddFeed", null, 50]);
				var dohDeferred = new doh.Deferred();
				setTimeout(dohDeferred.getTestCallback(function(){
					// Now there should be 2
					doh.is(2, numNewsItems(this.group.as.newsFeedNode));
				}, this), 150);
				return dohDeferred;
			},
			timeout:10000
		},{	
			name: "dynamicUpdateTest",
		 	description: "Test dynamically updating the AS (e.g. from the EE)",
			runTest: function(){
				// There should be only 2 news item loaded at this stage
				doh.is(2, numNewsItems(this.group.as.newsFeedNode));
				
				// Dynamically update an item in the feed
				dojo.publish(com.ibm.social.as.constants.events.ADDACTIVITYENTRY, ["DynamicUpdateFeed"]);
				
				// There should still be only two
				doh.is(2, numNewsItems(this.group.as.newsFeedNode));
			}
		}
	], function setUp(){
		com.ibm.social.as.configManager = new com.ibm.social.as.config.ConfigManager({configObject: window.dynamicLoadControllerConfig});
		new com.ibm.social.as.ActivityStream({
			configObject: dynamicLoadControllerConfig,
			domNode: dojo.create("div", {"id":"activityStreamTestDynLoad"}, dojo.body()),
			selectedState: true
		});
		// this feels silly...
		this.as = dijit.byId("activityStreamTestDynLoad");
	}, function tearDown(){
		this.as.destroyRecursive();
	}
);