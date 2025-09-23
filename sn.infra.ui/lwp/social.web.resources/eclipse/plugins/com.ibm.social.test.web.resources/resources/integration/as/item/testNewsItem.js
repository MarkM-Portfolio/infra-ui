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
 * type manager tests.
 */

dojo.provide("com.ibm.social.test.integration.as.item.testNewsItem");


dojo.require("com.ibm.social.test.testUtil");

dojo.require("com.ibm.social.as.item.NewsItem");
dojo.require("com.ibm.social.as.item.data.NewsDataAccessor");
dojo.require("com.ibm.social.as.util.AbstractHelper");

// Feeds needed
dojo.require("com.ibm.social.test.integration.as.testfeeds.StandardConnectionsFeed");

window.activityStreamAbstractHelper = new com.ibm.social.as.util.AbstractHelper({
	isGadget: false
});

com.ibm.social.test.testUtil.registerGroup("integration.as.item.testNewsItem", [
	{
		name: "testStandardNewsItem",
		description: "Test a standard news item",
		setUp: function(){
			var standardFeed = new com.ibm.social.test.integration.as.testfeeds.StandardConnectionsFeed();
			var newsData = dojo.safeMixin(standardFeed.content.entry[0], 
											new com.ibm.social.as.item.data.NewsDataAccessor());
			
			this.newsItem = new com.ibm.social.as.item.NewsItem({
				newsData: newsData
			}, dojo.byId("newsItemDiv"));
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