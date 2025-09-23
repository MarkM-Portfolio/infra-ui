/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/topic",
	"dijit/registry",
	"ic-as/ActivityStream",
	"ic-test/integration/as/model/TestDynamicLoadModel",
	"ic-test/testUtil"
], function (windowModule, domConstruct, query, topic, registry, ActivityStream, TestDynamicLoadModel, testUtil) {

	/**
	 * DynamicLoadController tests.
	 */
	
	// Number of news items in the feed
	function numNewsItems(node){
		return query("> li .lotusPost", node).length;
	}
	
	testUtil.registerGroup("integration.as.controller.testDynamicLoadController", 
		[
			{	
				name: "dynamicAddTest",
			 	description: "Test dynamically adding to the AS (e.g. from the Sharebox)",
				runTest: function(){
					// There should be only 1 news item loaded by default
					doh.is(1, numNewsItems(this.group.as.newsFeedNode));
					
					// Dynamically add another feed
					topic.publish(com.ibm.social.as.constants.events.ADDACTIVITYENTRY, "DynamicAddFeed", null, 50);
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
					topic.publish(com.ibm.social.as.constants.events.ADDACTIVITYENTRY, "DynamicUpdateFeed");
					
					// There should still be only two
					doh.is(2, numNewsItems(this.group.as.newsFeedNode));
				}
			}
		], function setUp(){
			com.ibm.social.as.configManager = new com.ibm.social.as.config.ConfigManager({configObject: window.dynamicLoadControllerConfig});
			new ActivityStream({
				configObject: dynamicLoadControllerConfig,
				domNode: domConstruct.create("div", {"id":"activityStreamTestDynLoad"}, windowModule.body()),
				selectedState: true
			});
			// this feels silly...
			this.as = registry.byId("activityStreamTestDynLoad");
		}, function tearDown(){
			this.as.destroyRecursive();
		}
	);
	return com.ibm.social.test.integration.as.controller.testDynamicLoadController;
});
