/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/RollupStatusNewsItem",
		"ic-as/item/StatusFileNewsItem"
	], function (declare, RollupStatusNewsItem, StatusFileNewsItem) {
	
		/**
		 * @author Robert Campion
		 */
		
		var RollupStatusFileNewsItem = declare(
		"com.ibm.social.as.item.RollupStatusFileNewsItem", 
		[RollupStatusNewsItem,
		 StatusFileNewsItem],
		{
			
		});
		
		return RollupStatusFileNewsItem;
	});
