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
 * news item manager tests.
 */

dojo.provide("com.ibm.social.test.integration.as.item.manager.testNewsItemManager");



dojo.require("dojo.parser");
dojo.require("dojo.cache");

dojo.require("com.ibm.social.as.item.manager.NewsItemManager");
dojo.require("com.ibm.social.as.item.manager.NewsItemFactory");
dojo.require("com.ibm.social.as.item.NewsItem");
dojo.require("com.ibm.social.as.config.ConfigManager");
dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");

dojo.require("com.ibm.social.test.integration.as.testfeeds.TestFeedBag");
dojo.require("com.ibm.social.test.integration.as.config.homepage.config");

// perform setup outside doh, but catch any errors and log them.
try {
	// Retrieve the bag containing all the feeds to test.
	var testFeedBag = new com.ibm.social.test.integration.as.testfeeds.TestFeedBag();
	
	// Set up the manager that will produce the news item widgets.
	var itemManager = new com.ibm.social.as.item.manager.NewsItemManager(
		new com.ibm.social.as.item.manager.NewsItemFactory()
	);
	
	// Set up a config manager.
	com.ibm.social.as.configManager = new com.ibm.social.as.config.ConfigManager({configObject: window.activityStreamConfig});
	
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
	
	var tests = dojo.map(testFeedBag.getFeedsToTest(), function(feedToTest){
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