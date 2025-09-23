/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/ImageFileNewsItem",
		"ic-as/item/StatusStandaloneFileNewsItem"
	], function (declare, ImageFileNewsItem, StatusStandaloneFileNewsItem) {
	
		/**
		 * Provide a class for standalone status update image file - use object summary instead of title
		 * @author Stephen Crawford
		 */
		
		var StatusStandaloneImageFileNewsItem = declare(
		"com.ibm.social.as.item.StatusStandaloneImageFileNewsItem", 
		[StatusStandaloneFileNewsItem,
		 ImageFileNewsItem],
		{
		});
		
		return StatusStandaloneImageFileNewsItem;
	});
