/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/interfaces/IType"
	], function (declare, IType) {
	
		/**
		 * Normal news item type
		 * 
		 * @author Robert Campion
		 */
		
		var NormalType = declare("com.ibm.social.as.item.type.NormalType", 
		IType,
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
		
		return NormalType;
	});
