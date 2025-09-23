/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-as/extension/interfaces/IExtension",
	"ic-as/item/StatusNewsItem",
	"ic-as/lconn/extension/MicroblogDeletionExtension"
], function (declare, IExtension, StatusNewsItem, MicroblogDeletionExtension) {

	/**
	 * Profiles specific microblog deletion extension. Allows board owners,
	 * news admins and authors delete community updates.
	 * 
	 * @author Robert Campion
	 */
	
	var ProfilesMicroblogDeletionExtension = declare("com.ibm.social.as.lconn.extension.ProfilesMicroblogDeletionExtension", 
	MicroblogDeletionExtension,
	{
		/**
		 * Override the default News Item behaviour to check if the current
		 * user is the author or the person whose profile is being displayed. 
		 * @returns {Boolean} true if they can, false otherwise.
		 */
		isMicroblogXDisplayed: function(){
			// If the profilesData or widgetUserInfo objects aren't available, we can't make any checks
			if(!(profilesData && profilesData.displayedUser && widgetUserInfo && widgetUserInfo.userid)){
				return false;
			}
			
			// Get the current user's id
			var currentUserId = widgetUserInfo.userid;
			
			// Get the ID of the owner of the board the item was posted to.
			var boardUserId = "";
			
			if (this.newsData && this.newsData.getActivityType() === "note") {
				boardUserId = this.newsData.getBoardUserId();
			}
			
			// Strip off any opensocial prefix on the id
			if ( boardUserId ) {
				boardUserId = this.getConnectionsUserId(boardUserId);
			}
			
			// Get the activity author id, stripping prefix if there
			var activityAuthorId = this.getConnectionsUserId(this.newsData.getActivityAuthorId());
			
			// Check if the current user is the news admin
			var isNewsAdmin = this.configManager.isUserNewsAdmin();
			
			// Return true if the current user is:
			// 1) the author of the microblog 
			// 2) the owner of the current board
			// 3) a News administrator
			return (currentUserId === activityAuthorId || boardUserId === currentUserId 
					|| isNewsAdmin);
		},
		
		/**
		 * Should the 'X' be displayed for this microblog.
		 * @returns {Boolean} true if it should, false otherwise.
		 */
		isMicroblogCommentXDisplayed: function(){
			var newsItem = this.newsItem;
			
			// Make sure the global profilesData is set and ignore all news items except status updates
			if(!(profilesData && profilesData.displayedUser && widgetUserInfo && widgetUserInfo.userid)
					|| !newsItem.newsData || newsItem.newsData.getActivityType() !== "note"){
				return false;
			}
	
			// Get the ID of the owner of the board the item was posted to.
			var boardUserId = "";
			
			if (this.newsItem && this.newsItem.newsData && this.newsItem.newsData.getActivityType() === "note") {
				boardUserId = this.newsItem.newsData.getBoardUserId();
			}
		
			// Strip off any opensocial prefix on the id
			if ( boardUserId ) {
				boardUserId = this.getConnectionsUserId(boardUserId);
			}
			
			// Get the current user's id
			var currentUserId = widgetUserInfo.userid;
			
			// Get the activity author id, stripping prefix if there
			var activityAuthorId = this.getConnectionsUserId(this.newsItem.newsData.getActivityAuthorId());
			
			// Check if the current user is the news admin
			var isNewsAdmin = this.configManager.isUserNewsAdmin();
			
			// Return true if the current user is:
			// 1) the author of the microblog 
			// 2) the author of the microblog comment
			// 3) the owner of the current board
			// 4) a News administrator
			return (currentUserId == activityAuthorId 
					|| currentUserId === this.getConnectionsUserId(this.comment.author.id)
					|| currentUserId === boardUserId || isNewsAdmin);
		}
	});
	return ProfilesMicroblogDeletionExtension;
});
