/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.StatusType");

dojo.require("com.ibm.social.as.item.type.interfaces.IType");

/**
 * Status update news item type.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.StatusType", 
[com.ibm.social.as.item.type.interfaces.IType],
{
	// {String} the type of news item this represents
	type: "Status",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		if(this.isStatus(newsData)){
			// TODO: Move to StatusRollupType
			this.transform(newsData);
			return true;
		}
	},
	
	isStatus: function(newsData){
		return newsData.isStatusUpdate();
	}
});
