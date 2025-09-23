/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.ImageFileType");

dojo.require("com.ibm.social.as.item.type.FileType");

/**
 * Image file upload type.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.ImageFileType", 
[com.ibm.social.as.item.type.PreviewableFileType],
{
	// {String} the type of news item this represents
	type: "ImageFile",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		var isFile = this.isFile(newsData);

        var isPreviewable = this.isPreviewable(newsData);

		// If it's a file and and image type, return true
		if(isFile && isPreviewable && this.isImage(newsData)){
			return true;
		}
		
		return false;
	},
	
	/**
	 * Determines whether the file name is an image.
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true is an image, false otherwise
	 */
	isImage: function(newsData){

        if(!this.isPreviewable(newsData)){
            return false;
        }

        var thisMimeType = newsData.getActivityMimeType();

        if(!thisMimeType){
            return false;
        }

        // TODO: change this to "image" or "jpeg" to catch every image
        var imageMimeType = "image";

        return thisMimeType.indexOf(imageMimeType) !== -1;
	}
});
