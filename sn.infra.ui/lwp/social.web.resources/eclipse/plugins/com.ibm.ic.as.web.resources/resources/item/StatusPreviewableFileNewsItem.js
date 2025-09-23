/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/string",
		"ic-as/item/PreviewableFileNewsItem",
		"ic-as/item/StatusFileNewsItem"
	], function (declare, string, PreviewableFileNewsItem, StatusFileNewsItem) {
	
		/**
		 * @author Marco Vicente
		 */
		
		var StatusPreviewableFileNewsItem = declare(
		    "com.ibm.social.as.item.StatusPreviewableFileNewsItem",
		    [StatusFileNewsItem,
		        PreviewableFileNewsItem],
		    {
		    });
		
		return StatusPreviewableFileNewsItem;
	});
