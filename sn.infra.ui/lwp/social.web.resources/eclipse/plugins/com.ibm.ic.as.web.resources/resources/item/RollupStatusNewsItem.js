/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/RollupNewsItem",
		"ic-as/item/StatusNewsItem"
	], function (declare, RollupNewsItem, StatusNewsItem) {
	
		/**
		 * @author Robert Campion
		 */
		
		var RollupStatusNewsItem = declare(
		"com.ibm.social.as.item.RollupStatusNewsItem", 
		[StatusNewsItem,
		 RollupNewsItem],
		{	
			
			/**
			 * Need to override for the CommunitiesStatusUpdateExtension. Otherwise,
			 * rolled up comment events won't show the top "X commented on Y" message.
			 */
			statusMixInData: function(){
		
			}
		});
		
		return RollupStatusNewsItem;
	});
