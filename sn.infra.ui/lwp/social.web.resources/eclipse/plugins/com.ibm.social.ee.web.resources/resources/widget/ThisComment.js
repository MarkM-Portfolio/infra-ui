/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.ThisComment");

dojo.require("com.ibm.social.ee.widget.Comments");

dojo.declare("com.ibm.social.ee.widget.ThisComment", [com.ibm.social.ee.widget.Comments], {
   nls: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings"),
   
   countAvailable: false,
   commentCount: 1,
   postMixInProperties: function() {
	  this.inherited(arguments);
	  
	  var dsConstructor = dojo.getObject(this.fetch.dsConstructor);
      var dsOpts = {};
	  var util = com.ibm.social.incontext.util;
      dsOpts.url = util.uri.rewriteUri(this.fetch.url,{});
      dsOpts.net = this.net;
      this._fetchds = new dsConstructor(dsOpts);
   },
   postCreate: function() {
      this.inherited(arguments);
      dojo.addClass(this.domNode, "lotusThreadedComments");
      this.onDisplayChange();
   },  
   _getCommentItems: function(isInitial) {
        this._fetchds.fetch({
           onComplete: dojo.hitch(this, function(items, request) {
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
           onError: dojo.hitch(this, function(errorData, request) {
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
         var childUl = dojo.query("> ul.lotusChild", parentLi)[0];
         if (!childUl) {
            childUl = dojo.create("ul", { className: "lotusChild lotusCommentList" }, parentLi);
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
      if (!(li.parentNode && dojo.hasClass(li.parentNode, "lotusChild"))) {
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
            var li = dojo.create("li", { className: "replyAction lotusFirst" }, ul);
               var a = dojo.create("a", {href: "javascript:;", title: this.nls.THISCOMMENT.REPLY_ACTION_TOOLTIP, role: "button", className: "lotusAction"}, li);
                  this.connect(a, "onclick", dojo.hitch(this, this.reply, comment, itemLi));
                  a.appendChild(d.createTextNode(this.nls.THISCOMMENT.REPLY_ACTION));
         }
      }      
   },
   reply: function (comment, parentLi) {
	  var misc = com.ibm.social.ee.util.misc;
	  
      var childUl = dojo.query("> ul.lotusChild", parentLi)[0];
      if (!childUl) {
         childUl = dojo.create("ul", { className: "lotusChild lotusCommentList" }, parentLi);
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
         dojo.publish("com/ibm/social/ee/comment/created", [this._moreDs.getValue(item, "published")]);
         this.cancelCreate();
         item.disableReply = true;
         this._createCommentUItem(item, null, true, false, false, this.replyParentLi);
         if (this.onCommentAdded) {
            this.onCommentAdded(item);
         }
         dojo.publish("com/ibm/social/ee/comment/afterCreated");
         this.confirmSubmission(item);
         this.enableSubmit(this.addCommentNode);
      }
      else {
         this.onCreateError(item);
      }
      dijit.focus(this.addCmtNode);
   }
});