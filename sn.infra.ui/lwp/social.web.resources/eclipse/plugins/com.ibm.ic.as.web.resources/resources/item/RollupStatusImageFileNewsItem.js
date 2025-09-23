/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/RollupStatusFileNewsItem",
		"ic-as/item/StatusImageFileNewsItem"
	], function (declare, RollupStatusFileNewsItem, StatusImageFileNewsItem) {
	
		/**
		 * @author Robert Campion
		 */
		
		var RollupStatusImageFileNewsItem = declare(
		"com.ibm.social.as.item.RollupStatusImageFileNewsItem", 
		[RollupStatusFileNewsItem,
		 StatusImageFileNewsItem],
		{
			
		});
		
		return RollupStatusImageFileNewsItem;
	});
