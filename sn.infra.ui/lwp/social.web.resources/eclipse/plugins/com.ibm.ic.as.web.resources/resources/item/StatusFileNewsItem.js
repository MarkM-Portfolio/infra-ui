/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/text!ic-as/item/templates/fileNewsItem.html",
	"dojo/text!ic-as/item/templates/statusUpdateFileNewsItem.html",
	"ic-as/item/FileNewsItem",
	"ic-as/item/StatusNewsItem"
], function (declare, template, statusUpdateFileNewsItem, FileNewsItem, StatusNewsItem) {

	/**
	 * @author Robert Campion
	 */
	
	var StatusFileNewsItem = declare(
	"com.ibm.social.as.item.StatusFileNewsItem", 
	[StatusNewsItem,
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
	declare("com.ibm.social.as.item.DummyStatusFileNewsItem",null,
	{
		templateString: statusUpdateFileNewsItem
	});
	
	return StatusFileNewsItem;
});
