/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"ic-as/item/data/StatusFileNewsDataAccessor",
		"ic-as/item/type/FileType",
		"ic-as/item/type/StatusType"
	], function (dojo, declare, StatusFileNewsDataAccessor, FileType, StatusType) {
	
		/**
		 * Status update with file attachment type.
		 * 
		 * @author Robert Campion
		 */
		
		var StatusFileType = declare("com.ibm.social.as.item.type.StatusFileType", 
		[StatusType,
		 FileType],
		{
			// {String} the type of news item this represents
			type: "StatusFile",
			
			/**
			 * Is the news data passed in eligible to be of type 'type'?
			 * @param newsData {Object} see NewsDataAccessor.
			 * @returns {Boolean} true if it is, false otherwise.
			 */
			isOfType: function(newsData){
				if(this.isStatusFile(newsData)){
					this.transform(newsData);
					return true;
				}
			},
		
			/**
			 * Transform the news data passed so that it fits properties
			 * of this particular news item type (if it is of this type).
			 * @param newsData
			 */
			transform: function(newsData){
				this.inherited(arguments);
				
				// Mixin the StatusFileNewsDataAccessor, which will fetch data 
				// from the appropriate location.
				declare.safeMixin(newsData, new StatusFileNewsDataAccessor());
				// Init the status file news item data
				newsData.init();
			},
			
			isStatusFile: function(newsData){
				var isStatus = this.isStatus(newsData);
				var isFile = newsData.getActivityAttachments();
				var isUrl = newsData.isUrlAttachment();
				return (isStatus && isFile && !isUrl);
			}
		});
		
		return StatusFileType;
	});
