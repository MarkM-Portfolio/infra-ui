/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/RollupStatusFileNewsItem",
		"ic-as/item/StatusPreviewableFileNewsItem"
	], function (declare, RollupStatusFileNewsItem, StatusPreviewableFileNewsItem) {
	
		/**
		 * @author Marco Vicente
		 */
		
		var RollupStatusPreviewableFileNewsItem = declare(
		    "com.ibm.social.as.item.RollupStatusPreviewableFileNewsItem",
		    [RollupStatusFileNewsItem,
		        StatusPreviewableFileNewsItem],
		    {
		
		    });
		
		return RollupStatusPreviewableFileNewsItem;
	});
