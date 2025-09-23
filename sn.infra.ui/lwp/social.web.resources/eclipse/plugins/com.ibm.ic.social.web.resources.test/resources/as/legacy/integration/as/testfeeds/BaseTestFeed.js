/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
	"dojo/_base/declare"
], function (declare) {

	/**
	 * Provides a base class for testfeeds consumed in the tests for the ActivityStream news
	 * item creation. The testfeed class contains the feed and also attributes which are checked
	 * against in the Doh tests.
	 * 
	 * Each test feed contains the following attributes:
	 * name					- A name for the feed
	 * content 				- The JSON feed consumed by the ActivityStream
	 * expectedFragments 	- The number of news item HTML fragments expected to be produced
	 * expectedClasses		- Array of the expected classes of items created.
	 */
	var BaseTestFeed = declare("com.ibm.social.test.integration.as.testfeeds.BaseTestFeed",null,
	{
		name: "",
		expectedFragments: 0,
		content: null,
		expectedClasses: null
	});
	return BaseTestFeed;
});
