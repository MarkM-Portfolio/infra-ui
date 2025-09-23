/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"ic-as/config/ConfigManager",
	"ic-as/item/NewsItem",
	"ic-as/item/manager/NewsItemFactory",
	"ic-as/item/manager/NewsItemManager",
	"ic-as/util/hashtag/HashtagUtil",
	"ic-test/integration/as/config/homepage/config",
	"ic-test/integration/as/testfeeds/TestFeedBag"
], function (array, ConfigManager, NewsItem, NewsItemFactory, NewsItemManager, HashtagUtil, config, TestFeedBag) {

	/**
	 * news item manager tests.
	 */
	
	// perform setup outside doh, but catch any errors and log them.
	try {
		// Retrieve the bag containing all the feeds to test.
		var testFeedBag = new TestFeedBag();
		
		// Set up the manager that will produce the news item widgets.
		var itemManager = new NewsItemManager(
			new NewsItemFactory()
		);
		
		// Set up a config manager.
		com.ibm.social.as.configManager = new ConfigManager({configObject: window.activityStreamConfig});
		
		var testFeed = function() {
			var newsItems = this.feed.content.entry;
			var newsFragment = this.itemManager.createNewsItems(newsItems, false);
		
			// Test we got the right number of returned fragments.
			doh.is(this.feed.expectedFragments, newsFragment.childNodes.length);
		
			/* Test we created the right kinds of items. */
			var widgets = this._getAllWidgets();
			
			for (var i=0; i<widgets.length; i++) {
				doh.is(feed.expectedClasses[i], widgets[i].declaredClass);
			}
		};
		
		/* Function to return all the widgets formed by the NewsItemManager. */
		var _getAllWidgets = function() {
			var widgets=[];
			
			var thisItem = this.itemManager.lastNewsItem;
			
			while (thisItem) {
				widgets.push(thisItem);
				thisItem = thisItem.previous;
			}
			
			return widgets;
		};
		
		var tests = array.map(testFeedBag.getFeedsToTest(), function(feedToTest){
			return {
				"feed": feedToTest,
				"name": feedToTest.name,
				"runTest": testFeed,
				"_getAllWidgets":_getAllWidgets,
				"itemManager":itemManager
				};
		});
	} catch(e){doh.debug(e);}
	if(tests) {
		doh.register("integration.as.item.manager.testNewsItemManager", tests);
	}
	return com.ibm.social.test.integration.as.item.manager.testNewsItemManager;
});
