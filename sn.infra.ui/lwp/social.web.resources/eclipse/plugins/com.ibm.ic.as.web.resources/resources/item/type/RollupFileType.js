/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/FileType",
		"ic-as/item/type/RollupType"
	], function (declare, FileType, RollupType) {
	
		/**
		 * Rollup file news item type.
		 * 
		 * @author Robert Campion
		 */
		
		var RollupFileType = declare("com.ibm.social.as.item.type.RollupFileType", 
		[RollupType,
		 FileType],
		{
			// {String} the type of news item this represents
			type: "RollupFile",
			
			/**
			 * Is the news data passed in eligible to be of type 'type'?
			 * @param newsData {Object} see NewsDataAccessor.
			 * @returns {Boolean} true if it is, false otherwise.
			 */
			isOfType: function(newsData){
				return this.isRollupFile(newsData);
			},
		
			isRollupFile: function(newsData){
				//up for review post 4.0 - Files rollup will supress summary but show content (share event)
				//so allow rollup to be created if content exists
				return ((this.isRollup(newsData) || newsData.getContent()) && this.isFile(newsData));
			}
		});
		
		return RollupFileType;
	});
