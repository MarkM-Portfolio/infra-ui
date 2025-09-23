/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/data/NewsDataAccessor"
	], function (declare, NewsDataAccessor) {
	
		/**
		 * Implementation of the INewsDataAccessors for StatusFile item types.
		 * 
		 * @author Robert Campion
		 */
		
		var StatusFileNewsDataAccessor = declare("com.ibm.social.as.item.data.StatusFileNewsDataAccessor", 
		NewsDataAccessor,
		{
			getActivityImage: function() {
				var attachment = this.getActivityAttachment();
				
				return (attachment) ? attachment.image : undefined;
			},
			
			getActivityDisplayName: function() {
				var attachment = this.getActivityAttachment();
				
				return (attachment) ? attachment.displayName : undefined;
			},
			
			getActivityFileUrl: function() {
				var attachment = this.getActivityAttachment();
				
				return (attachment) ? attachment.url : undefined;
			},
			
			getActivityAttachment: function(){
				var activityAttachments = this.getActivityAttachments();
				
				if(activityAttachments && activityAttachments.length > 0){
					return activityAttachments[0];
				}
			},
			
			getActivityFileAuthorId: function(){
				var attachment = this.getActivityAttachment();
				
				return (attachment && attachment.author) ? attachment.author.id : undefined;
			},
			
			getActivityFileAuthorName: function(){
				var attachment = this.getActivityAttachment();
				
				return (attachment && attachment.author) ? attachment.author.displayName : undefined;
			},
			
			getActivityFileAuthorUrl: function(){
				var attachment = this.getActivityAttachment();
				
				return (attachment && attachment.author) ? attachment.author.url : undefined; 
			},
			
			/**
			 * Return the published time of the file attachment
			 */
			getFilePublshTime: function(){
				var attachment = this.getActivityAttachment();
				
				return (attachment) ? attachment.published : undefined;
			}
		});
		
		
		return StatusFileNewsDataAccessor;
	});
