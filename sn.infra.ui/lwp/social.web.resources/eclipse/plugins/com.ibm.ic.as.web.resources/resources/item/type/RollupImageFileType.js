/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"ic-as/item/type/ImageFileType",
		"ic-as/item/type/RollupFileType"
	], function (declare, ImageFileType, RollupFileType) {
	
		/**
		 * Rollup image file news item type.
		 * 
		 * @author Robert Campion
		 */
		
		var RollupImageFileType = declare("com.ibm.social.as.item.type.RollupImageFileType", 
		[RollupFileType,
		 ImageFileType],
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
		
		return RollupImageFileType;
	});
