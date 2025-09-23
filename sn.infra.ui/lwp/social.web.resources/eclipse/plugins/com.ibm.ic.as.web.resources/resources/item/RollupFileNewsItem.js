/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/FileNewsItem",
		"ic-as/item/RollupNewsItem"
	], function (declare, FileNewsItem, RollupNewsItem) {
	
		/**
		 * @author Robert Campion
		 */
		
		var RollupFileNewsItem = declare(
		"com.ibm.social.as.item.RollupFileNewsItem", 
		[FileNewsItem,
		 RollupNewsItem],
		{
			/**
			 * Mix news data into this object.
			 */
			mixInData: function(){
				
				//summary not to be shown for Files - content will be catered for in RollupNewsItem
				this.newsData.setActivitySummary("");
				
				this.inherited(arguments);
			}
			
		});
		
		return RollupFileNewsItem;
	});
