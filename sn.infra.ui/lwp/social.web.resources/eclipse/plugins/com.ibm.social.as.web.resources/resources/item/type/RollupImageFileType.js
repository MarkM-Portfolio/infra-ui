/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.RollupImageFileType");

dojo.require("com.ibm.social.as.item.type.ImageFileType");
dojo.require("com.ibm.social.as.item.type.RollupFileType");

/**
 * Rollup image file news item type.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.RollupImageFileType", 
[com.ibm.social.as.item.type.RollupFileType,
 com.ibm.social.as.item.type.ImageFileType],
{
	// {String} the type of news item this represents
	type: "RollupImageFile",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		return this.isRollupImageFile(newsData);
	},

	isRollupImageFile: function(newsData){
		return (this.isRollupFile(newsData) && this.isImage(newsData));
	}
});
