/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([], function () {

	define([
		"dojo/_base/declare",
		"ic-as/item/PreviewableFileNewsItem",
		"ic-as/item/StatusStandaloneFileNewsItem"
	], function (declare, PreviewableFileNewsItem, StatusStandaloneFileNewsItem) {
	
		/**
		 * Provide a class for standalone status update image file - use object summary instead of title
		 * @author Marco Vicente
		 */
		
		var StatusStandalonePreviewableFileNewsItem = declare(
		    "com.ibm.social.as.item.StatusStandalonePreviewableFileNewsItem",
		    [StatusStandaloneFileNewsItem,
		        PreviewableFileNewsItem],
		    {
		    });
		
		return StatusStandalonePreviewableFileNewsItem;
	});
});
