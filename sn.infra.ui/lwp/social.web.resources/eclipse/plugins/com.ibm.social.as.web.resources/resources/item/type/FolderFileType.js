/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.FolderFileType");

dojo.require("com.ibm.social.as.item.type.FileType");

dojo.declare("com.ibm.social.as.item.type.FolderFileType", 
[com.ibm.social.as.item.type.FileType],
{
	// {String} the type of news item this represents
	type: "FolderFile",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		// If it's a file and and image type, return true
		if(newsData.getActivityType() == "collection" && newsData.getGeneratorId() == "files"){
			return true;
		}
		
		return false;
	}
});
