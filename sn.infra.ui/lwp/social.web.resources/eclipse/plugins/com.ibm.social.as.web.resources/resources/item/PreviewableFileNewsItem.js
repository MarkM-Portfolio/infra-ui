/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.PreviewableFileNewsItem");

dojo.require("com.ibm.social.as.item.FileNewsItem");

/**
 * Widget used to display previewable file news items in the
 * activity stream.
 * @author marco Vicente
 */

dojo.declare(
    "com.ibm.social.as.item.PreviewableFileNewsItem",
    [com.ibm.social.as.item.FileNewsItem],
    {
        templateExtension: dojo.cache("com.ibm.social.as", "item/templates/previewableFileNewsItem.html"),

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
            this.previewImage.onerror = dojo.hitch(this, "imageLoadError");
            

        },

        /**
         * Called when the thumbnail has failed to load.
         * In these cases we will fallback to the File CSS styling
         */
        imageLoadError: function(e){

            if(this.previewImage){
                dojo.addClass(this.previewImage, "lotusHidden");
            }

            if(this.imageCellNode){
                dojo.removeClass(this.imageCellNode, "lotusPostObject");
            }

            if(this.fileContainer){
                dojo.removeClass(this.fileContainer, "previewable");
                dojo.addClass(this.fileContainer, "file");
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

dojo.declare("com.ibm.social.as.item.DummyPreviewableFileNewsItem",null,
    {
        templatePath: dojo.moduleUrl("com.ibm.social.as", "item/templates/previewableFileNewsItem.html")
    });
