/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"ic-as/item/type/RollupStatusFileType",
		"ic-as/item/type/StatusImageFileType"
	], function (declare, RollupStatusFileType, StatusImageFileType) {
	
		/**
		 * Rollup status image file news item type.
		 * 
		 * @author Robert Campion
		 */
		
		var RollupStatusImageFileType = declare("com.ibm.social.as.item.type.RollupStatusImageFileType", 
		[RollupStatusFileType,
		 StatusImageFileType],
		{
			// {String} the type of news item this represents
			type: "RollupStatusImageFile",
			
			/**
			 * Is the news data passed in eligible to be of type 'type'?
			 * @param newsData {Object} see NewsDataAccessor.
			 * @returns {Boolean} true if it is, false otherwise.
			 */
			isOfType: function(newsData){
				if(this.isRollupStatusFile(newsData)){
					this.transform(newsData);
					
					if(this.isImage(newsData)){
						return true;
					}
				}
				
				return false;
			}
		});
		
		return RollupStatusImageFileType;
	});
