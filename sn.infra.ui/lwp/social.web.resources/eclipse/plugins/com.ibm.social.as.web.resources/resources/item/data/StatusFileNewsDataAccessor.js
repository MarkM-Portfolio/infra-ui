/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.data.StatusFileNewsDataAccessor");

dojo.require("com.ibm.social.as.item.data.NewsDataAccessor");

/**
 * Implementation of the INewsDataAccessors for StatusFile item types.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.data.StatusFileNewsDataAccessor", 
[com.ibm.social.as.item.data.NewsDataAccessor],
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

