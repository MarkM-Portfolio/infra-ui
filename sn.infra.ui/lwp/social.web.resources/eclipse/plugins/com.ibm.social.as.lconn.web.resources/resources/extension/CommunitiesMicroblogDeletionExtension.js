/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.CommunitiesMicroblogDeletionExtension");

dojo.require("com.ibm.social.as.lconn.extension.MicroblogDeletionExtension");
dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.item.StatusNewsItem");

/**
 * Communities specific microblog deletion extension. Allows community owners,
 * news admins and authors delete community updates.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.lconn.extension.CommunitiesMicroblogDeletionExtension", 
[com.ibm.social.as.lconn.extension.MicroblogDeletionExtension],
{
	/**
	 * Override the default News Item behaviour to check if the current
	 * user is also the author, community owner or news admin. If they are
	 * they can delete microblogs.
	 * @returns {Boolean} true if current user is the owner, false otherwise.
	 */
	isMicroblogXDisplayed: function(){
		// If the widgetUserInfo object isn't available, we can't make any checks
		if(!widgetUserInfo){
			return false;
		}
		
		// Get the current user's id
		var currentUserId = widgetUserInfo.userid;
		
		// Get the activity author id, stripping prefix if there
		var activityAuthorId = this.getConnectionsUserId(this.newsData.getActivityAuthorId());
		
		// Check if the current user is the news admin
		var isNewsAdmin = this.configManager.isUserNewsAdmin();
		
		// Return true if the current user is:
		// 1) the author of the microblog 
		// 2) the community owner
		// 3) a News administrator
		return (currentUserId === activityAuthorId || widgetUserInfo.canPersonalize === "true" 
				|| isNewsAdmin);
	},
	
	/**
	 * Should the 'X' be displayed for this microblog.
	 * @returns {Boolean} true if it should, false otherwise.
	 */
	isMicroblogCommentXDisplayed: function(){
		var newsItem = this.newsItem;
		
		// Make sure the global widgetUserInfo is set and ignore all news items except status updates
		if(!widgetUserInfo || !newsItem.newsData || newsItem.newsData.getActivityType() !== "note"){
			return false;
		}
		
		// Get the current user's id
		var currentUserId = widgetUserInfo.userid;
		
		// Check if the current user is the news admin
		var isNewsAdmin = this.configManager.isUserNewsAdmin();
		
		// Return true if the current user is:
		// 1) the author of the microblog
		// 2) the author of the microblog comment
		// 3) the community owner
		// 4) a News administrator
		return (currentUserId === this.getConnectionsUserId(newsItem.newsData.getActivityAuthorId())
				|| currentUserId === this.getConnectionsUserId(this.comment.author.id)
				|| widgetUserInfo.canPersonalize === "true" || isNewsAdmin);
	}
});
