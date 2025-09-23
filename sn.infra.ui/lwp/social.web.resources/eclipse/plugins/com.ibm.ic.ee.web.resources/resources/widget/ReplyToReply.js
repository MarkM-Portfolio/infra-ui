/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/query",
	"dojo/topic",
	"dijit/focus",
	"ic-ee/widget/Replies"
], function (declare, lang, domClass, domConstruct, on, query, topic, focusUtils, Replies) {

	/**
	 * Expected constructor arguments:
	 *  - parentReply
	 *  - childReply
	 *  - authUser
	 *  - allowNewComments
	 *  - 
	 */
	
	var ReplyToReply = declare("com.ibm.social.ee.widget.ReplyToReply", Replies, {
	   countAvailable: true,
	    postMixInProperties: function () {
	        this.inherited(arguments);
	        this._strings.ARIA_LABEL = this._strings.THIS_ARIA_LABEL;
	    },
	   postCreate: function() {
	      this.inherited(arguments);
	      domClass.add(this.domNode, "lotusForumReplyToReply");
	      this.addCommentCtnr.style.display = "none";
	      this.onDisplayChange();
	   },     
	   _getCommentItems: function(isInitial) {        
	      this._showCommentsUI([this.parentReply], /* hasMore */ false, /* isInitial */ true);       
	   },     
	   _createCommentUItem: function (comment, li, isNew, isEdit, isInitial, parentLi) {
	      if (!parentLi) {
	         var resultLi = this.inherited(arguments);
	         if (isInitial && this.childReply) {
	            this._createCommentUItem (this.childReply, null, false, false, true, resultLi);
	         }
	      }
	      else {
	         var childUl = query("> ul.lotusChild", parentLi)[0];
	         if (!childUl) {
	            childUl = domConstruct.create("ul", { className: "lotusChild lotusCommentList" }, parentLi);
	         }
	         var _temp = this.cmtList;
	         this.cmtList = childUl;
	         try {
	            this.inherited(arguments);
	         }
	         catch (e) {
	            this.cmtList = _temp;
	            throw e;
	         }
	      }
	      this.onDisplayChange();
	   },
	   _showCommentsUI: function () {
	      this.inherited(arguments);
	      this.addCommentLink.style.display = "none";
	      this.onCommentsDisplayed();
	   },
	   _placeCommentNode: function(li, isNew, isEdit) {
	      // Do not change node position if it's in a child list
	      if (!(li.parentNode && domClass.contains(li.parentNode, "lotusChild"))) {
	         this.inherited(arguments);
	      }
	   },
	   renderActionLinks: function(ds, divActions, ul, d, comment, divDetails, divContent, canEdit, canDelete, isUserComment, isFileOwner, isDeleted, divFlagItem, itemLi) {
	      this.inherited(arguments);
	      var modStatus = ds.getValue(comment, "moderationStatus");
	      if(modStatus) {
	          modStatus = modStatus.toLowerCase();
	      }
	      if((modStatus === "pending") || (modStatus === "quarantined") || (modStatus === "rejected")) {
	          return;
	      }
	      if (divContent.actionList) {
	          ul = divContent.actionList;
	      }
	      if (!isDeleted) {
	         if(this.authUser.id && this.allowNewComments && !comment.disableReply) {            
	            var li = domConstruct.create("li", { className: "replyAction" }, ul);
	               var a = domConstruct.create("a", {href: "javascript:;", title: this._strings.REPLY_ACTION_TOOLTIP, role: "button", className: "lotusAction"}, li);
	                  this.own(on(a, "click", lang.hitch(this, this.reply, comment, itemLi)));
	                  a.appendChild(d.createTextNode(this._strings.REPLY_ACTION));
	         }
	      }      
	   },
	   
	   reply: function (comment, parentLi) {
	      var childUl = query("> ul.lotusChild", parentLi)[0];
	      if (!childUl) {
	         childUl = domConstruct.create("ul", { className: "lotusChild lotusCommentList" }, parentLi);
	      }
	      this.replyToId = this._moreDs.getValue(comment, "id");
	      this.replyParentLi = parentLi;
	      domConstruct.place(this.addCommentCtnr, childUl, "last");
	      this.addCommentCtnr.style.display = "";
	      this.createComment();
	   },
	   
	   handleCreate: function(item, ioArgs) {
	      if(!(item instanceof Error)) {
	         topic.publish("com/ibm/social/ee/comment/created", this._moreDs.getValue(item, "published"));
	         this.cancelCreate();
	         item.disableReply = true;
	         this._createCommentUItem(item, null, true, false, false, this.replyParentLi);
	         if (this.onReplyAdded) {
	            this.onReplyAdded(item);
	         }
	         topic.publish("com/ibm/social/ee/comment/afterCreated");
	         this.confirmSubmission(item);
	         this.enableSubmit(this.addCommentNode);
	      }
	      else {
	         this.onCreateError(item);
	      }
	      focusUtils.focus(this.addCmtNode);
	   },   
	   
	   _getReplyTo: function () {
	      return this.replyToId;
	   },   
	   
	   _txtOnBlur: function (e) {
	      // do nothing
	   },
	   scrollToNewComment: function() {
	      // do nothing
	   },
	   cancelCreate: function(e) {
	      this.inherited(arguments);
	      this.addCommentCtnr.style.display = "none";
	      this.onDisplayChange();
	   }
	});
	return ReplyToReply;
});
