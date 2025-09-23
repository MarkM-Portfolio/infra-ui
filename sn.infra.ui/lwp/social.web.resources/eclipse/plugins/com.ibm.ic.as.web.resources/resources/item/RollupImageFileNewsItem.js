/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/ImageFileNewsItem",
		"ic-as/item/RollupFileNewsItem"
	], function (declare, ImageFileNewsItem, RollupFileNewsItem) {
	
		/**
		 * @author Robert Campion
		 */
		
		var RollupImageFileNewsItem = declare(
		"com.ibm.social.as.item.RollupImageFileNewsItem", 
		[RollupFileNewsItem,
		 ImageFileNewsItem],
		{
		});
		
		return RollupImageFileNewsItem;
	});
