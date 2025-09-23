/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.NormalType");

dojo.require("com.ibm.social.as.item.type.interfaces.IType");

/**
 * Normal news item type
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.NormalType", 
[com.ibm.social.as.item.type.interfaces.IType],
{
	// {String} the type of news item this represents
	type: "Normal",
	
	/**
	 * Is the news data passed in eligible to be of type 'type'?
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} true if it is, false otherwise.
	 */
	isOfType: function(newsData){
		return true;
	}
});
