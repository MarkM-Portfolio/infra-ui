/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
	"dojo/_base/declare"
], function (declare) {

	/**
	 * A feed that contains a status update.
	 */
	var NoContentFeed = declare("com.ibm.social.test.integration.as.testfeeds.NoContentFeed",
					com.ibm.social.test.integration.as.testfeeds.BaseTestFeed,
					{
						name: "No Content Feed",
						expectedFragments: 1,
						expectedClasses: ["com.ibm.social.as.item.NoContentItem"],
	
						content : {
							"startIndex" : 0,
							"totalResults" : 1,
							"entry" : [ ],
							"itemsPerPage" : 1
						}
					});
	return NoContentFeed;
});
