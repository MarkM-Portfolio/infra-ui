/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"ic-as/comment/CommentInputManager",
	"ic-as/config/ConfigManager",
	"ic-as/item/NewsItem",
	"ic-as/item/comment/InlineComments",
	"ic-as/item/data/NewsDataAccessor",
	"ic-as/util/AbstractHelper",
	"ic-test/integration/as/config/homepage/config",
	"ic-test/integration/as/testfeeds/StandardConnectionsFeed"
], function (dojo, lang, windowModule, domConstruct, CommentInputManager, ConfigManager, NewsItem, InlineComments, NewsDataAccessor, AbstractHelper, config, StandardConnectionsFeed) {

	/**
	 * inlineComments tests.
	 */
	
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
			window.activityStreamAbstractHelper = new AbstractHelper({
				isGadget: false
			});
			com.ibm.social.as.configManager = new ConfigManager({configObject: window.activityStreamConfig});
			
			// Singleton commentInputManager
			lang.setObject("com.ibm.social.as.comment.commentInputManager", 
				new CommentInputManager());
			
			var standardFeed = new StandardConnectionsFeed();
			var newsData = dojo.safeMixin(standardFeed.content.entry[0], 
											new NewsDataAccessor());
			newsData.init();
			
			this.testDiv = domConstruct.create("div", {"id":"testDiv"}, windowModule.body());
			
			this.newsItem = new NewsItem({
				newsData: newsData
			}, domConstruct.create("div", {"id":"newsItemDiv"}, this.testDiv));
			this.inlineComments = new InlineComments({
				newsItem: this.newsItem,
				comments: lang.clone(replies), 
				createdByActivityStream: true,
				showAddComment: true,
				focusAddComment: true,
				network: activityStreamAbstractHelper
			}, domConstruct.create("div", {"id":"inlineCommentsDiv"}, this.testDiv));
	},
	function tearDown(){
		// ridiculous, but there's some timeouts in the mentions code, so we have to wait if we don't want an error.
		setTimeout(lang.hitch(this, function(){
			this.newsItem.destroyRecursive();
			this.inlineComments.destroyRecursive();
			domConstruct.destroy("testDiv");
		}), 130);
	});
	return com.ibm.social.test.integration.as.item.comment.testInlineComments;
});
