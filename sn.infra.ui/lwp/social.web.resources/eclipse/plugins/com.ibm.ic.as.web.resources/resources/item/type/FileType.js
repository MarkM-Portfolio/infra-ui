/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/interfaces/IType"
	], function (declare, IType) {
	
		/**
		 * File upload type
		 * 
		 * @author Robert Campion
		 */
		
		var FileType = declare("com.ibm.social.as.item.type.FileType", 
		IType,
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
		
		return FileType;
	});
