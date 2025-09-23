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
 * news item title tests.
 */

dojo.provide("com.ibm.social.test.integration.as.item.testNewsItemTitle");



dojo.require("com.ibm.social.as.item.NewsItem");
dojo.require("com.ibm.social.as.item.data.NewsDataAccessor");
dojo.require("com.ibm.social.as.util.AbstractHelper");

// Feeds needed
dojo.require("com.ibm.social.test.integration.as.testfeeds.TitleTestFeed");

window.activityStreamAbstractHelper = new com.ibm.social.as.util.AbstractHelper({
	isGadget: false
});

doh.register("integration.as.item.testNewsItemTitle", [
	{
		name: "testTitleBlankContent",
		description: "Test a standard news item where title is provided and also a blank content attribute",
		setUp: function(){
			var titleFeed = new com.ibm.social.test.integration.as.testfeeds.TitleTestFeed();
			var newsData = dojo.safeMixin(titleFeed.content.entry[0], 
										new com.ibm.social.as.item.data.NewsDataAccessor());
			
			this.newsItem = new com.ibm.social.as.item.NewsItem({
				newsData: newsData
			}, dojo.byId("newsItemDiv"));
		},
		runTest: function(){
			doh.is(this.newsItem.content , "<a>Some HTML</a>");
		}
	},
	{
		name: "testTitleNoContent",
		description: "Test a standard news item with no content attribute",
		setUp: function(){
			var titleFeed = new com.ibm.social.test.integration.as.testfeeds.TitleTestFeed();
			var newsData = dojo.safeMixin(titleFeed.content.entry[1], 
										new com.ibm.social.as.item.data.NewsDataAccessor());
			
			this.newsItem = new com.ibm.social.as.item.NewsItem({
				newsData: newsData
			}, dojo.byId("newsItemDiv2"));
		},
		runTest: function(){
			doh.is(this.newsItem.content , "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe5.\" href=\"http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/html/profileView.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/photo.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a\" alt=\"This is a photo of John Doe5.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe5\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003ed0b3b6c0-7546-102f-9f4c-f6be80987c6a\u003c/span\u003e\u003c/span\u003e \u003cspan class=\"profiles entry\"\u003eA simple test \u003c/span\u003e");
		}
	},
	{
		name: "testNoTitleNoContent",
		description: "Test a possible 3rd party feed where neither content or title are provided",
		setUp: function() {
			var titleFeed = new com.ibm.social.test.integration.as.testfeeds.TitleTestFeed();
			var newsData = dojo.safeMixin(titleFeed.content.entry[2], 
										new com.ibm.social.as.item.data.NewsDataAccessor());
			
			this.newsItem = new com.ibm.social.as.item.NewsItem({
				newsData: newsData
			}, dojo.byId("newsItemDiv3"));
		},
		runTest: function(){
			doh.is(this.newsItem.content , "");
		}
	},
	{
		name: "testNoTitleButContent",
		description: "Test a possible 3rd party feed where no title is provided but a content attribute is.",
		setUp: function() {
			var titleFeed = new com.ibm.social.test.integration.as.testfeeds.TitleTestFeed();
			var newsData = dojo.safeMixin(titleFeed.content.entry[3], 
										new com.ibm.social.as.item.data.NewsDataAccessor());
			
			this.newsItem = new com.ibm.social.as.item.NewsItem({
				newsData: newsData
			}, dojo.byId("newsItemDiv4"));
		},
		runTest: function(){
			// Should not use the content attribute from the feed.
			doh.is(this.newsItem.content , "");
		}
	}					
	
]);
