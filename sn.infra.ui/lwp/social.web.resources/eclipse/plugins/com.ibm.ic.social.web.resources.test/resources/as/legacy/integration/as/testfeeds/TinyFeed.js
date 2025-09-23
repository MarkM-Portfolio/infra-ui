/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
	"dojo/_base/declare",
	"ic-test/integration/as/testfeeds/BaseTestFeed"
], function (declare, BaseTestFeed) {

	/**
	 * Example of an extremely small feed with lots of missing optional attributes.
	 * Note, the feed MUST have a published and actor object, although the actor can be empty.
	 */
	var TinyFeed = declare("com.ibm.social.test.integration.as.testfeeds.TinyFeed",
					BaseTestFeed,
					{
						name: "TinyFeed",
						expectedFragments: 1,
						expectedClasses: ["com.ibm.social.as.item.NewsItem"],
	
						content: {
							"startIndex" : 0,
							"totalResults" : 1,
							"entry" : [ {
								"actor": {"id":""
								},
								"object": {
									"id":"a"
								},
								"generator":{
									"id":"An External Application1"
								},
								"published":"2011-10-06T12:25:44.529Z"
							}]
						}
					});
	return TinyFeed;
});
