/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/query",
	"dojo/topic",
	"dijit/focus",
	"ic-ee/util/misc",
	"ic-ee/widget/Comments"
], function (dojo, declare, lang, domClass, domConstruct, on, query, topic, focusUtils, miscModule, Comments) {

	var ThisComment = declare("com.ibm.social.ee.widget.ThisComment", Comments, {
	   nls: i18nsocialEEStrings,
	   
	   countAvailable: false,
	   commentCount: 1,
	   postMixInProperties: function() {
		  this.inherited(arguments);
		  
		  var dsConstructor = lang.getObject(this.fetch.dsConstructor);
	      var dsOpts = {};
		  var util = com.ibm.social.incontext.util;
	      dsOpts.url = util.uri.rewriteUri(this.fetch.url,{});
	      dsOpts.net = this.net;
	      this._fetchds = new dsConstructor(dsOpts);
	   },
	   postCreate: function() {
	      this.inherited(arguments);
	      domClass.add(this.domNode, "lotusThreadedComments");
	      this.onDisplayChange();
	   },  
	   _getCommentItems: function(isInitial) {
	        this._fetchds.fetch({
	           onComplete: lang.hitch(this, function(items, request) {
			       this.cmtList.style.display = "";
				   
	               if (items && items.length > 0){
	                   this._showCommentsUI(items, false, isInitial);
	               }
	               else {
	                  this._doNothing();
	               }
				   
				   this.addCommentLink.style.display = "none";
		           this.addCommentCtnr.style.display = "none";
				   
	               this.onDisplayChange();
	           }),
	           onError: lang.hitch(this, function(errorData, request) {
	              this._showPagingErrorMsg(isInitial, errorData); 
	           })
	        });
	   },   
	   _createCommentUItem: function (comment, li, isNew, isEdit, isInitial, parentLi) {
	      if (!parentLi) {
	         var li = this.inherited(arguments);
	         if (isInitial && comment.childReply) {
	            this._createCommentUItem (comment.childReply, null, false, false, true, li);
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
	            var li = this.inherited(arguments);
				if (isInitial && comment.childReply) {
					this._createCommentUItem (comment.childReply, null, false, false, true, li);
				 }
	         }
	         catch (e) {
	            this.cmtList = _temp;
	            throw e;
	         }
	      }
	      this.onDisplayChange();
	   },
	   _showCommentsUI: function (commentArray, moreExists, isInitial) {
	      this.commentCount = commentArray.length;
	      for(var i = 0; i < commentArray.length; i++) {
		      if(i == commentArray.length - 1) {
			      commentArray[i].childReply = false;
				  break;
			  } else {
		          commentArray[i].childReply = commentArray[i + 1];
			  }
		  }
		  arguments[0] = [commentArray[0]];
	      this.inherited(arguments);
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
	      if(modStatus)
	         modStatus = modStatus.toLowerCase();
	      if((modStatus == "pending") || (modStatus == "quarantined") || (modStatus == "rejected"))
	         return;
	      if (divContent.actionList)
	         ul = divContent.actionList;      
	      if (!isDeleted) {
	         if(this.authUser.id && this.allowNewComments && !comment.disableReply && ds.getValue(comment, 'allowReplies')) {            
	            var li = domConstruct.create("li", { className: "replyAction lotusFirst" }, ul);
	               var a = domConstruct.create("a", {href: "javascript:;", title: this.nls.THISCOMMENT.REPLY_ACTION_TOOLTIP, role: "button", className: "lotusAction"}, li);
	                  this.own(on(a, "click", lang.hitch(this, this.reply, comment, itemLi)));
	                  a.appendChild(d.createTextNode(this.nls.THISCOMMENT.REPLY_ACTION));
	         }
	      }      
	   },
	   reply: function (comment, parentLi) {
		  var misc = miscModule;
		  
	      var childUl = query("> ul.lotusChild", parentLi)[0];
	      if (!childUl) {
	         childUl = domConstruct.create("ul", { className: "lotusChild lotusCommentList" }, parentLi);
	      }
	      this.replyToId = comment.getId();
	      this.replyParentLi = parentLi;
	      this.addCommentCtnr.style.display = "";
	      this.createComment();
	   },
	   cancelCreate: function(e) {
	      this.inherited(arguments);
	      this.addCommentCtnr.style.display = "none";
	      this.onDisplayChange();
	   },
	   _doPerformCreate: function(ds, item) {
	      if(typeof this.replyToId != 'undefined') {
			 ds.setValue(item, "replyTo", this.replyToId);
		  }
		  this.inherited(arguments);
	   },
	   handleCreate: function(item, ioArgs) {
	      if(!(item instanceof Error)) {
	         topic.publish("com/ibm/social/ee/comment/created", this._moreDs.getValue(item, "published"));
	         this.cancelCreate();
	         item.disableReply = true;
	         this._createCommentUItem(item, null, true, false, false, this.replyParentLi);
	         if (this.onCommentAdded) {
	            this.onCommentAdded(item);
	         }
	         topic.publish("com/ibm/social/ee/comment/afterCreated");
	         this.confirmSubmission(item);
	         this.enableSubmit(this.addCommentNode);
	      }
	      else {
	         this.onCreateError(item);
	      }
	      focusUtils.focus(this.addCmtNode);
	   }
	});
	return ThisComment;
});
