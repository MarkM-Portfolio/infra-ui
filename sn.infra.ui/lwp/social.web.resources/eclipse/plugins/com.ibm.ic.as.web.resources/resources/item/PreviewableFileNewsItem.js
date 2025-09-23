/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-class",
		"dojo/text!ic-as/item/templates/previewableFileNewsItem.html",
		"ic-as/item/FileNewsItem"
	], function (declare, lang, domClass, template, FileNewsItem) {
	
		/**
		 * Widget used to display previewable file news items in the
		 * activity stream.
		 * @author marco Vicente
		 */
		
		var PreviewableFileNewsItem = declare(
		    "com.ibm.social.as.item.PreviewableFileNewsItem",
		    FileNewsItem,
		    {
		        templateExtension: template,
		
		        // We want to hide the file name for images
		        fileNameClass: "lotusHidden",
		
		        imageSrc: "",
		        imageClass: "activityStreamImageUpload",
		
		        mixInData: function(){
		            as_console_debug("PreviewableFileNewsItem mixInData");
		
		            this.inherited(arguments);
		
		            this.imageSrc = this.newsData.getActivityImageUrl() || "";
		        },
		
		        /**
		         * Called after the widget is rendered in the UI.
		         */
		        postCreate: function(){
		            this.inherited(arguments);
		
		           
		            //hitch the onerror event for the image
		            this.previewImage.onerror = lang.hitch(this, "imageLoadError");
		            
		
		        },
		
		        /**
		         * Called when the thumbnail has failed to load.
		         * In these cases we will fallback to the File CSS styling
		         */
		        imageLoadError: function(e){
		
		            if(this.previewImage){
		                domClass.add(this.previewImage, "lotusHidden");
		            }
		
		            if(this.imageCellNode){
		                domClass.remove(this.imageCellNode, "lotusPostObject");
		            }
		
		            if(this.fileContainer){
		                domClass.remove(this.fileContainer, "previewable");
		                domClass.add(this.fileContainer, "file");
		            }
		        },
		
		        uninitialize: function(){
		            this.imageCellNode = null;
		            this.authorInfo = null;
		            this.previewImage = null;
		            this.imageSrc = null;
		            this.inherited(arguments);
		        }
		    });
		
		/**
		 * Dummy class that is used as a means to serialize the rollupNewsItem.html in the dojo build.
		 * It couldn't be put in the main RollupNewsItem as it would overwrite the NewsItem's
		 * templatePath. If the HTML file is just pulled in from a property that isn't called
		 * templatePath, the dojo build doesn't serialize it and an extra XHR request is made for it.
		 */
		
		declare("com.ibm.social.as.item.DummyPreviewableFileNewsItem",null,
		    {
		        templateString: template
		    });
		
		return PreviewableFileNewsItem;
	});
