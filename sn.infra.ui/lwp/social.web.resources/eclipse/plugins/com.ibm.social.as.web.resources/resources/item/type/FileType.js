/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.FileType");

dojo.require("com.ibm.social.as.item.type.interfaces.IType");

/**
 * File upload type
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.FileType", 
[com.ibm.social.as.item.type.interfaces.IType],
{
	// {String} the type of news item this represents
	type: "File",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		return this.isFile(newsData);
	},
	
	isFile: function(newsData){
		return (newsData.getActivityType() == "file"); 
	}
});
