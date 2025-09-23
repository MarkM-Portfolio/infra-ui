/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.liking.ASCommentLikeDataStore");

dojo.require("lconn.core.util.LCDeferred");
dojo.require("com.ibm.lconn.layout.people");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.item.liking.ASLikeDataStore");

/**
 * DataStore for Like control for AS
 * 
 * @author BrianOG
 */

dojo.declare("com.ibm.social.as.item.liking.ASCommentLikeDataStore", [com.ibm.social.as.item.liking.ASLikeDataStore],
{
	_inlineComment: null,  	// The inline comment dijit
	_comment: null,			// The comment data
	
	constructor: function(newsItem, inlineComment) {
		this._inlineComment = inlineComment;
		this._comment = inlineComment.comment;
		
		this._likeSvcUrl = ( this._comment && this._comment.connections && this._comment.connections.likeService) ? this._comment.connections.likeService : null;
		this._curLikeCount = ( this._comment && this._comment.likes && this._comment.likes.totalItems ) ? this._comment.likes.totalItems : 0;
		this._curUserLikes = this.doesCurrentUserLike(this.getCommentLikesItems());
		
		this._joinCommunityGenericStr = this._ublogStrings.COMMENT_LIKE_JOIN_GENERIC;
		this._joinCommunitySpecificStr = this._ublogStrings.COMMENT_LIKE_JOIN_COMMUNITY;		
	},
	
	destroy: function() {
		this._inlineComment = null;
		this._comment = null;
		this.inherited(arguments);
	},

	getCommentLikesItems: function() {
		return ( this._comment && this._comment.likes && this._comment.likes.items ) ? this._comment.likes.items : [];
	},
	
	displayLikeError: function(msg) {
		this._inlineComment.displayLikeError(msg);
	},
	
	recreateLikeControl: function(readonly) {
		this._inlineComment.recreateLikeControl(true);
	}
});
