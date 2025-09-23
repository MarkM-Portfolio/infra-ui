/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/FileType"
	], function (declare, FileType) {
	
		var FolderFileType = declare("com.ibm.social.as.item.type.FolderFileType", 
		FileType,
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
		
		return FolderFileType;
	});
