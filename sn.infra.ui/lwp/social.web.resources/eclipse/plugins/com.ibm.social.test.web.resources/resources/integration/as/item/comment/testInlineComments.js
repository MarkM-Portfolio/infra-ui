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
 * inlineComments tests.
 */

dojo.provide("com.ibm.social.test.integration.as.item.comment.testInlineComments");


dojo.require("com.ibm.social.test.integration.as.testfeeds.StandardConnectionsFeed");
dojo.require("com.ibm.social.test.integration.as.config.homepage.config");
dojo.require("com.ibm.social.as.item.data.NewsDataAccessor");

dojo.require("com.ibm.social.as.item.comment.InlineComments");
dojo.require("com.ibm.social.as.comment.CommentInputManager");
dojo.require("com.ibm.social.as.util.AbstractHelper");
dojo.require("com.ibm.social.as.config.ConfigManager");
dojo.require("com.ibm.social.as.item.NewsItem");

var replies = {
	items: [{
		content: "asdf",
	    author: {
			objectType: "person",
			id: "5bd1ba6b-1b19-4021-bd5b-7a1b5d2a5797",
			displayName: "Robert Campion"
		},
		updated: "2012-01-12T09:54:15.010Z",
		id: "0b3a40d5-4c5e-4046-982e-95ba8b161af1"
	},
	{
		content: "qwer",
		author: {
			objectType: "person",
			id: "5bd1ba6b-1b19-4021-bd5b-7a1b5d2a5797",
			displayName: "Robert Campion"
		},
		updated: "2012-01-12T09:54:29.336Z",
		id: "1afd60c5-8b88-4008-a23d-45e0256bece0"
	}],
	totalItems: 3						
}

doh.registerGroup("integration.as.item.comment.testInlineComments", [
	{
		name: "testAddComment",
		description: "Test adding a comment",
		setUp: function(){
			var newComment = {
				author: {
					objectType: "person",
					id: "5bd1ba6b-1b19-4021-bd5b-7a1b5d2a5797",
					displayName: "Robert Campion"
				},
				content: "dd",
				id:	"95018341-88d7-4419-b9a4-37a46499cf30",
				updated: "2012-01-12T16:23:03.325Z"
			};
			this.group.inlineComments.addComment(newComment)
		},
		runTest: function(){
			doh.is(3, this.group.inlineComments.comments.items.length);
		}
	},
	{
		name: "testRemovingComment",
		description: "Test removing a comment",
		setUp: function(){
			this.group.inlineComments.commentDeleted("95018341-88d7-4419-b9a4-37a46499cf30");
			this.group.inlineComments.commentDeleted("1afd60c5-8b88-4008-a23d-45e0256bece0");
		},
		runTest: function(){
			 doh.is(1, this.group.inlineComments.comments.items.length);
		}
	}
],
	function setUp(){
		window.activityStreamAbstractHelper = new com.ibm.social.as.util.AbstractHelper({
			isGadget: false
		});
		com.ibm.social.as.configManager = new com.ibm.social.as.config.ConfigManager({configObject: window.activityStreamConfig});
		
		// Singleton commentInputManager
		dojo.setObject("com.ibm.social.as.comment.commentInputManager", 
			new com.ibm.social.as.comment.CommentInputManager());
		
		var standardFeed = new com.ibm.social.test.integration.as.testfeeds.StandardConnectionsFeed();
		var newsData = dojo.safeMixin(standardFeed.content.entry[0], 
										new com.ibm.social.as.item.data.NewsDataAccessor());
		newsData.init();
		
		this.testDiv = dojo.create("div", {"id":"testDiv"}, dojo.body());
		
		this.newsItem = new com.ibm.social.as.item.NewsItem({
			newsData: newsData
		}, dojo.create("div", {"id":"newsItemDiv"}, this.testDiv));
		this.inlineComments = new com.ibm.social.as.item.comment.InlineComments({
			newsItem: this.newsItem,
			comments: dojo.clone(replies), 
			createdByActivityStream: true,
			showAddComment: true,
			focusAddComment: true,
			network: activityStreamAbstractHelper
		}, dojo.create("div", {"id":"inlineCommentsDiv"}, this.testDiv));
},
function tearDown(){
	// ridiculous, but there's some timeouts in the mentions code, so we have to wait if we don't want an error.
	setTimeout(dojo.hitch(this, function(){
		this.newsItem.destroyRecursive();
		this.inlineComments.destroyRecursive();
		dojo.destroy("testDiv");
	}), 130);
});