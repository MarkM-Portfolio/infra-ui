/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.integration.as.testfeeds.TestFeedBag");

dojo.require("com.ibm.social.test.integration.as.testfeeds.StandardConnectionsFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.NoGeneratorFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.MinimalFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.FileItemFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.ImageItemFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.StatusUpdateFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.NonConnectionsNoteFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.NoContentFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.IllegalFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.LargeVulcanTestFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.TinyFeed");
dojo.require("com.ibm.social.test.integration.as.testfeeds.NoValidContentFeed");

/**
 * Class to collect together all the feeds that we need to test with. The test feeds are
 * presented to the using class in an array.
 */
dojo.declare("com.ibm.social.test.integration.as.testfeeds.TestFeedBag",
				null,
{
	feedsToTest: null,
	
	constructor: function() {
		// Build an array containing instances of all the test feeds.
		this.feedsToTest = [
            new com.ibm.social.test.integration.as.testfeeds.StandardConnectionsFeed(),
            new com.ibm.social.test.integration.as.testfeeds.NoGeneratorFeed(),
            new com.ibm.social.test.integration.as.testfeeds.MinimalFeed(),
			new com.ibm.social.test.integration.as.testfeeds.FileItemFeed(),
			new com.ibm.social.test.integration.as.testfeeds.ImageItemFeed(),
			new com.ibm.social.test.integration.as.testfeeds.StatusUpdateFeed(),
			new com.ibm.social.test.integration.as.testfeeds.NonConnectionsNoteFeed(),
			new com.ibm.social.test.integration.as.testfeeds.NoContentFeed(),
			new com.ibm.social.test.integration.as.testfeeds.IllegalFeed(),
			new com.ibm.social.test.integration.as.testfeeds.LargeVulcanTestFeed(),
			new com.ibm.social.test.integration.as.testfeeds.TinyFeed(),
			new com.ibm.social.test.integration.as.testfeeds.NoValidContentFeed()
       ];
	},

	/**
	 * Return an array containing all the feeds to test with.
	 * @returns {Array}
	 */
	getFeedsToTest: function() {
		return this.feedsToTest;
	}
});