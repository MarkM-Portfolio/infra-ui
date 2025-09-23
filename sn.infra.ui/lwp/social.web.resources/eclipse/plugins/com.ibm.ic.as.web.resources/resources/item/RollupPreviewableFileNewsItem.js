/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/PreviewableFileNewsItem",
		"ic-as/item/RollupFileNewsItem"
	], function (declare, PreviewableFileNewsItem, RollupFileNewsItem) {
	
		/**
		 * @author Marco Vicente
		 */
		
		var RollupPreviewableFileNewsItem = declare(
		    "com.ibm.social.as.item.RollupPreviewableFileNewsItem",
		    [RollupFileNewsItem,
		        PreviewableFileNewsItem],
		    {
		
		    });
		
		return RollupPreviewableFileNewsItem;
	});
