/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.RollupStatusImageFileType");

dojo.require("com.ibm.social.as.item.type.RollupStatusFileType");
dojo.require("com.ibm.social.as.item.type.StatusImageFileType");

/**
 * Rollup status image file news item type.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.RollupStatusImageFileType", 
[com.ibm.social.as.item.type.RollupStatusFileType,
 com.ibm.social.as.item.type.StatusImageFileType],
{
	// {String} the type of news item this represents
	type: "RollupStatusImageFile",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		if(this.isRollupStatusFile(newsData)){
			this.transform(newsData);
			
			if(this.isImage(newsData)){
				return true;
			}
		}
		
		return false;
	}
});
