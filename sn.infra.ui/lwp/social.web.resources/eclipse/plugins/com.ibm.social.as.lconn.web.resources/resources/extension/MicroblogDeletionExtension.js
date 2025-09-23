/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.MicroblogDeletionExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.item.StatusNewsItem");
dojo.require("lconn.core.DialogUtil");
dojo.require("com.ibm.social.as.constants.events");

dojo.declare("com.ibm.social.as.lconn.extension.MicroblogDeletionExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	// Reference to the news item class function and prototype
	statusNewsItemClass: null,
	statusNewsItemPrototype: null,
	
	// Reference to the inline comment class function
	inlineCommentClass: null,
	
	opensocialUri: lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial).uri,
	
	// Event to create message.
	createMessageEvent: com.ibm.social.as.constants.events.CREATEMESSAGE,
	
	constructor: function(){
		// Make local references to these objects
		this.statusNewsItemClass = com.ibm.social.as.item.StatusNewsItem;
		this.statusNewsItemPrototype = this.statusNewsItemClass.prototype;
		this.inlineCommentClass = com.ibm.social.as.item.comment.InlineComment;
	},
	
	/**
	 * Called when this extension is loaded.
	 */
	onLoad: function(){
		dojo.extend(this.statusNewsItemClass, {
			isXDisplayed: this.isMicroblogXDisplayed,
			onDeleteClicked: this.onMicroblogDeleteClicked,
			deleteMicroblog: this.deleteMicroblog,
			opensocialUri: this.opensocialUri,
			createMessageEvent: this.createMessageEvent,
			cancelDelete: this.cancelDelete
		});
		
		dojo.extend(this.inlineCommentClass, {
			isXDisplayed: this.isMicroblogCommentXDisplayed,
			onDeleteClicked: this.onMicroblogCommentDeleteClicked,
			deleteMicroblog: this.deleteMicroblog,
			opensocialUri: this.opensocialUri,
			createMessageEvent: this.createMessageEvent,
			cancelDelete: this.cancelDelete
		});
	},
	
	/**
	 * Called when this extension is unloaded.
	 */
	onUnload: function(){
		// Must delete these functions from the Status News Item prototype
		// or else we wouldn't be able to override them from the News Item
		// (as the status news item is a subclass of it).
		delete this.statusNewsItemPrototype.isXDisplayed;
		delete this.statusNewsItemPrototype.onDeleteClicked;
		
		dojo.extend(this.inlineCommentClass, {
			isXDisplayed: function(){return false;},
			onDeleteClicked: function(){},
			handleCancelDelete: function(){}
		});
	},
	
	/**
	 * Override the default News Item behaviour to check if the current
	 * user is also the owner of this status update or the target.
	 * @returns {Boolean} true if current user is the owner, false otherwise.
	 */
	isMicroblogXDisplayed: function(){
		// Get the current user's id
		var currentUserId = this.configManager.getUserInfoId();
		// we transfer the 'target' over to the 'object' if the item is rolled up in NewsItemManager.js

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
		// 1) the author of the item 
		// 2) owner of the board it was posted to
		// 3) a News administrator
		return (activityAuthorId === currentUserId 
				|| (boardUserId && boardUserId === currentUserId) || isNewsAdmin);
	},
	
	/**
	 * Called when the 'X' icon is clicked on a status update
	 */
	onMicroblogDeleteClicked: function(){
		var url = activityStreamAbstractHelper.getMBDeleteUrl(this.newsData.getActivityId());

		var messageNode = dojo.create("div",{
			innerHTML:this.strings.statusRemoveConfirmMessageText
		});
		// This class for setting the 'width' of the dialog 
		dojo.addClass(messageNode,"confirmDialogMessageNode");
		this.dialogBundle = lconn.core.DialogUtil.popupForm(
			this.strings.statusRemoveText,
			messageNode,
			this.strings.statusRemoveConfirmText,
			this.strings.statusRemoveCancelText,
			dojo.hitch(this,this.deleteMicroblog,url,this.strings.statusRemoveConfirmationMsg,this.strings.statusRemoveErrorMsg),
			dojo.hitch(this,this.cancelDelete)
		);
		
		activityStreamAbstractHelper.repositionDialog(this.domNode);
		
		// The line below prevented the previously focused element getting focus back in case of a delete.
		//lconn.core.DialogUtil._dialogs[lconn.core.DialogUtil._dialogs.length-1].refocus = false;

	},
	
	/**
	 * Should the 'X' be displayed for this microblog.
	 * @returns {Boolean} true if it should, false otherwise.
	 */
	isMicroblogCommentXDisplayed: function(){
		var newsItem = this.newsItem;
		
		// Ignore all news items except status updates
		if(!newsItem.newsData || newsItem.newsData.getActivityType() !== "note"){
			return false;
		}

		// Get the ID of the owner of the board the item was posted to.
		var boardUserId="";
		if (this.newsItem && this.newsItem.newsData && this.newsItem.newsData.getActivityType() === "note") {
			boardUserId = this.newsItem.newsData.getBoardUserId();
		}
		
		// Strip off any opensocial prefix on the id
		if ( boardUserId ) {
			boardUserId = this.getConnectionsUserId(boardUserId);
		}

		// Get the current user's id
		var currentUserId = this.configManager.getUserInfoId();

		// Get the activity author id, stripping prefix if there
		var activityAuthorId = this.getConnectionsUserId(this.newsItem.newsData.getActivityAuthorId());
		
		// Check if the current user is the news admin
		var isNewsAdmin = this.configManager.isUserNewsAdmin();
		
		// Return true if the current user:
		// 1) is the owner of the status update
		// 2) is the owner of the comment
		// 3) owns the board the item was posted onto
		// 4) is a News administrator
		return (currentUserId == activityAuthorId || currentUserId === (this.comment 
				&& this.comment.author && this.getConnectionsUserId(this.comment.author.id)) 
				|| boardUserId === currentUserId || isNewsAdmin);
	},
	
	/**
	 * Called when the 'X' is clicked on a microblog comment.
	 * Deletes the comment.
	 */
	onMicroblogCommentDeleteClicked: function(){
		var currentFocus = document.activeElement;
		
		var url = activityStreamAbstractHelper.getMBDeleteCommentUrl(this.newsItem.newsData.getActivityId(), this.comment.id);
		
		var messageNode = dojo.create("div",{
			innerHTML:this.strings.commentRemoveConfirmMessageText
		});
		// This class for setting the 'width' of the dialog 
		dojo.addClass(messageNode,"confirmDialogMessageNode");
		this.dialogBundle = lconn.core.DialogUtil.popupForm(
			this.strings.commentRemoveText,
			messageNode,
			this.strings.commentRemoveConfirmText,
			this.strings.commentRemoveCancelText,
			dojo.hitch(this,this.deleteMicroblog,url,this.strings.commentRemoveConfirmationMsg,this.strings.commentRemoveErrorMsg),
			dojo.hitch(this, this.cancelDelete, currentFocus)
		);

		activityStreamAbstractHelper.repositionDialog(this.domNode);
		
		// lconn.core.DialogUtil._dialogs[lconn.core.DialogUtil._dialogs.length-1].refocus = false;
		// TODO: Have to handle the "lotusFirst" class
	},
	
	/**
	 * Delete a microblog item.
	 * @param url {String} URL to call
	 */
	deleteMicroblog: function(url,confirmMsg,errorMsg){
		// Send request to delete the status update
		activityStreamAbstractHelper.xhrDelete({
			url: url,
			headers: {
				"Content-Type":"application/json"
			},
			handleAs: "json",
			load: dojo.hitch(this, function(){
				// Fade out and destroy this microblog item
				dojo.fadeOut({
					node: this.domNode,
					onEnd: dojo.hitch(this, function(){
						// Destroy microblog item
						this.destroyRecursive();
						dojo.publish(com.ibm.social.as.constants.events.NEWSITEMDELETE);
					})
				}).play();
				// Show the confirmation message
				if(confirmMsg) {
					dojo.publish(this.createMessageEvent,
						[confirmMsg,"CONFIRM",true]);
				}
			
			}),
			error: dojo.hitch(this, function(e){
				console.error("MicroblogDeletionExtension could not delete microblog: %o", e);
				// Show the error message
				if(errorMsg) {
					dojo.publish(this.createMessageEvent,
						[errorMsg,"ERROR",true]);
				}
				
			})
		});
		
		this.dialogBundle.hide();
	},

	/**
	 * Function to handle the cancellation of a deletion. 
	 * Fires event off to the ItemFocusHandler to refocus the item.
	 */
	cancelDelete: function(toFocus) {
		this.dialogBundle.hide();

		dojo.publish(com.ibm.social.as.constants.events.ITEMGOTFOCUS,[this,true,toFocus]);
	}
});
