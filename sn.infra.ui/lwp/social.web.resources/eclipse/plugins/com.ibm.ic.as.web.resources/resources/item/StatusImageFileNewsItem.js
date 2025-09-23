/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/string",
		"ic-as/item/ImageFileNewsItem",
		"ic-as/item/StatusFileNewsItem",
		"ic-as/item/StatusNewsItem"
	], function (declare, string, ImageFileNewsItem, StatusFileNewsItem, StatusNewsItem) {
	
		/**
		 * @author Robert Campion
		 */
		
		var StatusImageFileNewsItem = declare(
		"com.ibm.social.as.item.StatusImageFileNewsItem", 
		[StatusFileNewsItem,
		 ImageFileNewsItem],
		{
		});
		
		return StatusImageFileNewsItem;
	});
