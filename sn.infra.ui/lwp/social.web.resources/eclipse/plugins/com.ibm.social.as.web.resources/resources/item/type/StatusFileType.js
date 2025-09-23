/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.StatusFileType");

dojo.require("com.ibm.social.as.item.data.StatusFileNewsDataAccessor");

dojo.require("com.ibm.social.as.item.type.StatusType");
dojo.require("com.ibm.social.as.item.type.FileType");

/**
 * Status update with file attachment type.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.StatusFileType", 
[com.ibm.social.as.item.type.StatusType,
 com.ibm.social.as.item.type.FileType],
{
	// {String} the type of news item this represents
	type: "StatusFile",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		if(this.isStatusFile(newsData)){
			this.transform(newsData);
			return true;
		}
	},

	/**
	 * Transform the news data passed so that it fits properties
	 * of this particular news item type (if it is of this type).
	 * @param newsData
	 */
	transform: function(newsData){
		this.inherited(arguments);
		
		// Mixin the StatusFileNewsDataAccessor, which will fetch data 
		// from the appropriate location.
		dojo.safeMixin(newsData, new com.ibm.social.as.item.data.StatusFileNewsDataAccessor());
		// Init the status file news item data
		newsData.init();
	},
	
	isStatusFile: function(newsData){
		var isStatus = this.isStatus(newsData);
		var isFile = newsData.getActivityAttachments();
		var isUrl = newsData.isUrlAttachment();
		return (isStatus && isFile && !isUrl);
	}
});
