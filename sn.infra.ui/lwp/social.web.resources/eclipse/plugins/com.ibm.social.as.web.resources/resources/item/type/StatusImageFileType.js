/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.StatusImageFileType");

dojo.require("com.ibm.social.as.item.type.StatusFileType");
dojo.require("com.ibm.social.as.item.type.ImageFileType");

/**
 * Status update with image file attachment type.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.StatusImageFileType", 
[com.ibm.social.as.item.type.StatusFileType,
 com.ibm.social.as.item.type.ImageFileType],
{
	// {String} the type of news item this represents
	type: "StatusImageFile",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		if(this.isStatusFile(newsData)){
			// Do the transform here, will set image properties
			this.transform(newsData);
			
			return this.isStatusFileImage(newsData);
		}
	},
	
	/**
	 * Is this a StatusFileImage type
	 */
	isStatusFileImage: function(newsData){
		if(this.isImage(newsData) && newsData.getActivityImage()){
			return true;
		}
		
		return false;
	}
});
