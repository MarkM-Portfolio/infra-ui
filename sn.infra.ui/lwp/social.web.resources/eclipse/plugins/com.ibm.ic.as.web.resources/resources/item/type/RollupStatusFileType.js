/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/RollupStatusType",
		"ic-as/item/type/StatusFileType"
	], function (declare, RollupStatusType, StatusFileType) {
	
		/**
		 * Rollup status file news item type.
		 * 
		 * @author Robert Campion
		 */
		
		var RollupStatusFileType = declare("com.ibm.social.as.item.type.RollupStatusFileType", 
		[RollupStatusType,
		 StatusFileType],
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
		
		return RollupStatusFileType;
	});
