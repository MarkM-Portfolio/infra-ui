/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/i18n!ic-as/nls/activitystream",
		"ic-as/extension/interfaces/IExtension",
		"ic-as/item/NewsItem"
	], function (dojo, declare, lang, i18nactivitystream, IExtension, NewsItem) {
	
		var CommentLinkToEEExtension = declare("com.ibm.social.as.extension.CommentLinkToEEExtension", 
		IExtension,
		{
			// String object used to override the default news item strings
			strings: null,
			
			// Reference to the news item class function
			newsItemClass: null,
			
			// Reference to the NewsItem class's prototype
			newsItemPrototype: null,
			
			constructor: function(){
				// Make local references to these objects
				this.newsItemClass = NewsItem;
				this.newsItemPrototype = this.newsItemClass.prototype;
				this.strings = i18nactivitystream;
			},
			
			/**
			 * Called when the view loads on the page.
			 */
			onLoad: function(){
				as_console_debug("com.ibm.social.as.extension.CommentLinkToEEExtension - onLoad");
				
				lang.extend(this.newsItemClass, {
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
				lang.extend(this.newsItemClass, {
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
		return CommentLinkToEEExtension;
	});
