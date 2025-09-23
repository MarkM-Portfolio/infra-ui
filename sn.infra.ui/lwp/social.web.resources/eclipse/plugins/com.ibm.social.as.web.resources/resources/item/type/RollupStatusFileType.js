/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.RollupStatusFileType");

dojo.require("com.ibm.social.as.item.type.RollupStatusType");
dojo.require("com.ibm.social.as.item.type.StatusFileType");

/**
 * Rollup status file news item type.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.RollupStatusFileType", 
[com.ibm.social.as.item.type.RollupStatusType,
 com.ibm.social.as.item.type.StatusFileType],
{
	// {String} the type of news item this represents
	type: "RollupStatusFile",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		if(this.isRollupStatusFile(newsData)){
			this.transform(newsData);
			return true;
		}
		
		return false;
	},
	
	/**
	 * Is the news data rolled up and a status update.
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean}
	 */
	isRollupStatusFile: function(newsData){
		return (this.isRollupStatus(newsData) && this.isStatusFile(newsData));
	}
});
