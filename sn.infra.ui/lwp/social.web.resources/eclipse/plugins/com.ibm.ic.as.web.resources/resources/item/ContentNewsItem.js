/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */



	define([
		"dojo/_base/declare",
		"dojo/text!ic-as/item/templates/contentNewsItem.html",
		"ic-as/item/NewsItem"
	], function (declare, template, NewsItem) {
	
		/**
		 * Widget used to display a News Item with content attribute in the 
		 * activity stream.
		 * @author Jim Antill
		 */
		
		var ContentNewsItem = declare(
		"com.ibm.social.as.item.ContentNewsItem", 
		NewsItem,
		{
			// A template extension to be used inside the NewsItem dijit
			templateExtension: template,		
		
			postCreate: function() {
				this.inherited(arguments);
				// Put the content into the holder.
				this.contentHolder.innerHTML = this.newsData.getContent() || "";
				this.resizeContentHeight();		
			},
			
			postMixInProperties: function() {
				this.inherited(arguments);		
			},
			
			/**
			 * Override NewsItem function to set max height for rollup content
			 */
			resizeContentHeight: function(){			
				this.setContentHeight(this.contentHolder,this.showMoreText,this.showLessText, this.newsData.getId());
				this.addImageOnloadResizeSupport(this.contentHolder, this.newsData.getId());
			},
			
			onShowMoreLessClicked : function(e){
				this.handleShowMoreLessClicked(e, this.contentHolder, this.showMoreText, this.showLessText);		
			}
		});
		
		/**
		 * Dummy class that is used as a means to serialize the contentNewsItem.html in the dojo build.
		 */
		
		declare("com.ibm.social.as.item.DummyContentNewsItem", null,
		{
			templateString: template
		});
		return ContentNewsItem;
	});
