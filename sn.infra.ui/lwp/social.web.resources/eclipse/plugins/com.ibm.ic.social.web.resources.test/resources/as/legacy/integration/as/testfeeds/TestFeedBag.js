/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-test/integration/as/testfeeds/NonConnectionsNoteFeed",
	"ic-test/integration/as/testfeeds/MinimalFeed",
	"ic-test/integration/as/testfeeds/FileItemFeed",
	"ic-test/integration/as/testfeeds/ImageItemFeed",
	"ic-test/integration/as/testfeeds/NoValidContentFeed",
	"ic-test/integration/as/testfeeds/NoGeneratorFeed",
	"ic-test/integration/as/testfeeds/NoContentFeed",
	"ic-test/integration/as/testfeeds/IllegalFeed",
	"ic-test/integration/as/testfeeds/LargeVulcanTestFeed",
	"ic-test/integration/as/testfeeds/StandardConnectionsFeed",
	"ic-test/integration/as/testfeeds/StatusUpdateFeed",
	"ic-test/integration/as/testfeeds/TinyFeed"
], function (declare, NonConnectionsNoteFeed, MinimalFeed, FileItemFeed, ImageItemFeed, NoValidContentFeed, NoGeneratorFeed, NoContentFeed, IllegalFeed, LargeVulcanTestFeed, StandardConnectionsFeed, StatusUpdateFeed, TinyFeed) {

	/**
	 * Class to collect together all the feeds that we need to test with. The test feeds are
	 * presented to the using class in an array.
	 */
	var TestFeedBag = declare("com.ibm.social.test.integration.as.testfeeds.TestFeedBag",
					null,
	{
		feedsToTest: null,
		
		constructor: function() {
			// Build an array containing instances of all the test feeds.
			this.feedsToTest = [
	            new StandardConnectionsFeed(),
	            new NoGeneratorFeed(),
	            new MinimalFeed(),
				new FileItemFeed(),
				new ImageItemFeed(),
				new StatusUpdateFeed(),
				new NonConnectionsNoteFeed(),
				new NoContentFeed(),
				new IllegalFeed(),
				new LargeVulcanTestFeed(),
				new TinyFeed(),
				new NoValidContentFeed()
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
	return TestFeedBag;
});
