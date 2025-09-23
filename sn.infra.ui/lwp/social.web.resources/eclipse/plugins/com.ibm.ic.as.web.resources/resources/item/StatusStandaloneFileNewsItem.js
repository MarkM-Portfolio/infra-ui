/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/text!ic-as/item/templates/fileNewsItem.html",
	"dojo/text!ic-as/item/templates/statusUpdateFileNewsItem.html",
	"ic-as/item/FileNewsItem",
	"ic-as/item/StatusStandaloneNewsItem"
], function (declare, template, statusUpdateFileNewsItem, FileNewsItem, StatusStandaloneNewsItem) {

	/**
	 * Provide a class for standalone status update file - use object summary instead of title
	 * @author Stephen Crawford
	 */
	
	var StatusStandaloneFileNewsItem = declare(
	"com.ibm.social.as.item.StatusStandaloneFileNewsItem", 
	[StatusStandaloneNewsItem,
	 FileNewsItem],
	{
		templateExtension: statusUpdateFileNewsItem,
		
		/**
		 * Mix in data 
		 */
		mixInData: function(){
			this.inherited(arguments);
			if(this.isVideoPlayable()) 
				this.templateExtension = template;
		}
	});
	
	declare("com.ibm.social.as.item.DummyStatusStandaloneFileNewsItem",null,
	{
		templateString: statusUpdateFileNewsItem
	});
	
	
	return StatusStandaloneFileNewsItem;
});
