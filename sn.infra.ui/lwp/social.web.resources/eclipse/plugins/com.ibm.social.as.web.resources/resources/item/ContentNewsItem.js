/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.ContentNewsItem");

dojo.require("com.ibm.social.as.item.NewsItem");

/**
 * Widget used to display a News Item with content attribute in the 
 * activity stream.
 * @author Jim Antill
 */

dojo.declare(
"com.ibm.social.as.item.ContentNewsItem", 
[com.ibm.social.as.item.NewsItem],
{
	// A template extension to be used inside the NewsItem dijit
	templateExtension: dojo.cache("com.ibm.social.as", "item/templates/contentNewsItem.html"),		

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

dojo.declare("com.ibm.social.as.item.DummyContentNewsItem", null,
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/templates/contentNewsItem.html")
});
