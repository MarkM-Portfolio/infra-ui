/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo",
	"ic-as/item/data/StatusFileNewsDataAccessor",
	"ic-test/integration/as/item/type/artifact/StatusFileNewsData"
], function (dojo, StatusFileNewsDataAccessor, StatusFileNewsData) {

	/**
	 * status file news data accessor tests.
	 */
	
	doh.registerGroup("integration.as.item.data.testStatusFileNewsDataAccessor", [
		{
			name: "testGetActivityImage",
			description: "Testing the getActivityImage function",
			runTest: function(){
				doh.is(undefined, this.group.newsData.getActivityImage());
			}
		},{
			name: "testGetActivityDisplayName",
			description: "Testing the getActivityDisplayName function",
			runTest: function(){
				doh.is("ci-log.txt", this.group.newsData.getActivityDisplayName());
			}
		},{
			name: "testGetActivityUrl",
			description: "Testing the getActivityUrl function",
			runTest: function(){
				doh.is("/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&" + 
						"entryid=1a5405b8-b1fb-46e3-b7d9-e2d503f1b00c", this.group.newsData.getActivityUrl());
			}
		}
	],
		function setUp(){
		// Create the newsData object
		this.newsData = StatusFileNewsData;
		dojo.safeMixin(this.newsData, new StatusFileNewsDataAccessor());
		this.newsData.init();
	});
	return com.ibm.social.test.integration.as.item.data.testStatusFileNewsDataAccessor;
});
