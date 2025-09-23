/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.extension.CommentLinkToEEExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.item.NewsItem");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.extension.CommentLinkToEEExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	// String object used to override the default news item strings
	strings: null,
	
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
	 * Called when the view loads on the page.
	 */
	onLoad: function(){
		as_console_debug("com.ibm.social.as.extension.CommentLinkToEEExtension - onLoad");
		
		dojo.extend(this.newsItemClass, {
			onCommentLinkToEEClicked: this.onCommentLinkToEEClicked
		});
		
		// Add a comment action to status updates items
		this.newsItemPrototype.addAction({
			name: "commentLinkToEE",
			text: this.strings.commentText,
			callback: "onCommentLinkToEEClicked",
			isActionDisplayed: function(newsData) { 
				var generatorId = newsData.getGeneratorId();
				return (generatorId == "profiles" || generatorId == "communities"); 
				},
			ordinal: 100
		});
	},
	
	/**
	 * Called when the view is moved away from.
	 */
	onUnload: function(){
		this.newsItemPrototype.removeAction("commentLinkToEE");
		dojo.extend(this.newsItemClass, {
			onCommentLinkToEEClicked: undefined
		});
	},
	
	/**
	 * The 'Comment' link was clicked.
	 */
	onCommentLinkToEEClicked: function() {
		as_console_debug("com.ibm.social.as.extension.CommentLinkToEEExtension - onCommentLinkToEEClicked");
		this.openEE();
	}
});
