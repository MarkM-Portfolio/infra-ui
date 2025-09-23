/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/string",
		"dojo/text!ic-as/item/templates/imageFileNewsItem.html",
		"ic-as/item/PreviewableFileNewsItem"
	], function (declare, domClass, domConstruct, string, template, PreviewableFileNewsItem) {
	
		/**
		 * Widget used to display individual file news items in the 
		 * activity stream.
		 * @author Robert Campion
		 */
		
		var ImageFileNewsItem = declare(
		"com.ibm.social.as.item.ImageFileNewsItem", 
		PreviewableFileNewsItem,
		{
			templateExtension: template,
		
		    /**
		     * Override and do nothing.
		     */
		    updateIconClass: function(){
		    },
		
		    /**
		     * Override this function to add "From" for the author's name.
		     * Only images require this as normal file news items contain
		     * the original file name.
		     */
		    setupAuthorInfo: function(){
		        this.inherited(arguments);
		
		        if(this.authorInfo){
		            this.authorInfo = string.substitute(this.strings.fromText, [this.authorInfo]);
		        }
		    },
		
		    /**
		     * Called when the thumbnail has failed to load.
		     */
		    imageLoadError: function(e){
		        // Show the file name now that the image has failed to load
		        if(this.fileNameHeaderNode){
		            domClass.remove(this.fileNameHeaderNode, "lotusHidden");
		        }
		
		        //Replace the current image with a grey square
		        this.imageCellNode.innerHTML = "";
		        var table = domConstruct.create("table", {
		            className: "activityStreamNoThumbnailTable"
		        }, this.imageCellNode);
		
		        // Show a 'Not Available' sign
		        domConstruct.create("td", {
		            innerHTML: this.strings.imageNotAvailable,
		            className: "lotusTiny activityStreamNoThumbnailCell"
		        }, domConstruct.create("tr", {}, domConstruct.create("tbody", {}, table)));
		    }
		});
		
		
		/**
		 * Dummy class that is used as a means to serialize the rollupNewsItem.html in the dojo build.
		 * It couldn't be put in the main RollupNewsItem as it would overwrite the NewsItem's 
		 * templatePath. If the HTML file is just pulled in from a property that isn't called
		 * templatePath, the dojo build doesn't serialize it and an extra XHR request is made for it.
		 */
		
		declare("com.ibm.social.as.item.DummyImageFileNewsItem",null,
		{
			templateString: template
		});
		
		return ImageFileNewsItem;
	});
