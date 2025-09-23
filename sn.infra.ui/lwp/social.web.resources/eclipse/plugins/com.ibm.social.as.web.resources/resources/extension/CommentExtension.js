/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.extension.CommentExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.item.NewsItem");
dojo.require("com.ibm.social.as.item.comment.InlineComments");
dojo.require("com.ibm.social.as.comment.CommentInputManager");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.extension.CommentExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	// String object used to override the default news item strings
	strings: null,
	
	// Backup of the onDeleteClicked function held by the news item
	onDeleteClickedFunction: null,
	
	// Reference to the news item class function
	newsItemClass: null,
	
	// Reference to the NewsItem class's prototype
	newsItemPrototype: null,
	
	constructor: function(){
		// Make local references to these objects
		this.newsItemClass = com.ibm.social.as.item.NewsItem;
		this.newsItemPrototype = this.newsItemClass.prototype;
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
	},
	
	/**
	 * Called when the Action Required view loads on the page.
	 */
	onLoad: function(){
		// Extend the news item class, adding an unfollow function
		as_console_debug("com.ibm.social.as.extension.CommentExtension - onLoad");
		
		// Singleton commentInputManager
		com.ibm.social.as.comment.commentInputManager = 
			new com.ibm.social.as.comment.CommentInputManager();
		
		dojo.extend(this.newsItemClass, {
			onCommentClicked: this.onCommentClicked,
			onLoginClicked: this.onLoginClicked
		});
	
		var cfg = com.ibm.social.as.configManager.getConfigObject();
		var userInfo = cfg && cfg.userInfo;
		
		if(userInfo && userInfo.displayName){
			// Add a comment action to status updates items
			this.newsItemPrototype.addAction({
				name: "comment",
				text: this.strings.commentText,
				callback: "onCommentClicked",
				isActionDisplayed: dojo.hitch(this, function(newsData) { return this.isCommentable(newsData) && newsData.id && newsData.id != ""; }),
				ordinal: 100
			});
		}else{
			// Add an login action to status updates items
			this.newsItemPrototype.addAction({
				name: "login",
				text: this.strings.logInCommentText,
				callback: "onLoginClicked",
				isActionDisplayed: dojo.hitch(this, function(newsData) { return this.isCommentable(newsData) && newsData.id && newsData.id != ""; }),
				ordinal: 100
			});	
		}
	},
	
	/**
	 * Called when the view is moved away from.
	 */
	onUnload: function(){
		this.newsItemPrototype.removeAction("comment");
		dojo.extend(this.newsItemClass, {
			onCommentClicked: undefined,
			onLoginClicked: undefined
		});
		
		com.ibm.social.as.comment.commentInputManager.destroy();
		com.ibm.social.as.comment.commentInputManager = undefined;
	},
	
	/**
	 * The 'Comment' link was clicked.
	 */
	onCommentClicked: function() {
		as_console_debug("com.ibm.social.as.extension.CommentExtension - onCommentClicked");
		this.setupCommentContentStandalone();
	},
	
	/**
	 * The 'Log in to comment' link was clicked.
	 */
	onLoginClicked: function() {
	},
	
	isCommentable: function(newsData) {
		return this.isStatusUpdateNewsItem(newsData) && com.ibm.social.as.configManager.isInlineCommentingEnabled();
	},
	
	/**
	 * Check to see if the news item is a status update
	 * @param newsData {object} new item data
	 */
	isStatusUpdateNewsItem: function(newsData) {
		var generatorId = newsData.getGeneratorId();
		
		// Make sure the generator is either profies or communities
		// and that the news data itself belongs to a status update
		return ((generatorId == "profiles" || generatorId == "communities") 
					&& newsData.isStatusUpdate());
	}
});
