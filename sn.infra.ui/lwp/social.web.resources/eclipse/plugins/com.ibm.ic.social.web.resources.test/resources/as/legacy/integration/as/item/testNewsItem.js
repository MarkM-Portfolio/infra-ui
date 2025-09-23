/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/dom",
	"ic-as/item/NewsItem",
	"ic-as/item/data/NewsDataAccessor",
	"ic-as/util/AbstractHelper",
	"ic-test/integration/as/testfeeds/StandardConnectionsFeed",
	"ic-test/testUtil"
], function (dojo, dom, NewsItem, NewsDataAccessor, AbstractHelper, StandardConnectionsFeed, testUtil) {

	/**
	 * type manager tests.
	 */
	
	// Feeds needed
	window.activityStreamAbstractHelper = new AbstractHelper({
		isGadget: false
	});
	
	testUtil.registerGroup("integration.as.item.testNewsItem", [
		{
			name: "testStandardNewsItem",
			description: "Test a standard news item",
			setUp: function(){
				var standardFeed = new StandardConnectionsFeed();
				var newsData = dojo.safeMixin(standardFeed.content.entry[0], 
												new NewsDataAccessor());
				
				this.newsItem = new NewsItem({
					newsData: newsData
				}, dom.byId("newsItemDiv"));
			},
			runTest: function(){
				// X shouldn't display
				doh.f(this.newsItem.isXDisplayed());
				
				// Test the _onClick function
				var dohDeferred = new doh.Deferred();
				// This event should be called by the onClick
				this.subscribe(com.ibm.social.as.constants.events.ITEMCLICKED, function(){
					// Tell the deferred that everything went ok
					dohDeferred.callback(true);
				});
				
				// Create a dummy node and pass it to the onClick
				var dummyNode = {target: {tagName: "<div>"}};
				dummyNode.target.parentNode = dummyNode.target;
				this.newsItem._onClick(dummyNode);
				
				return dohDeferred;
			},
			timeout: 10000
		}
	]);
	return com.ibm.social.test.integration.as.item.testNewsItem;
});
