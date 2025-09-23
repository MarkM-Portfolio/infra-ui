/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget.ECMDraftReviewEntry");
dojo.require("com.ibm.social.ee.gadget._ECMDraftReviewCommentsMixin");
dojo.require("com.ibm.social.ee.gadget._ECMEntry");
dojo.require("com.ibm.social.ee.widget.ECMReview");
dojo.require("com.ibm.social.ee.data.ECMDraftReviewDataStore");
dojo.require("com.ibm.social.ee.gadget._ECMDraftEntryMixin");
dojo.require("com.ibm.social.ee.data.ECMFileAccessChecker");

/**
 * Widget that displays an EE UI for an ECM Draft Entry The following properties are
 * required for creation: - network - An instance of either NetworkOS or
 * NetworkDojo - context - A context object containing the URL of the EE entry
 */
(function(){

   var uu = com.ibm.social.incontext.util.url;
   var ut = com.ibm.social.incontext.util.text;
   var g = com.ibm.social.ee.gadget;
   
   dojo.declare("com.ibm.social.ee.gadget.ECMDraftReviewEntry", [g._ECMEntry, g._ECMDraftReviewCommentsMixin, g._ECMDraftEntryMixin], {  	      
      templatePath: dojo.moduleUrl("com.ibm.social.ee", "gadget/templates/ECMDraftReviewEntry.html"),
	  selfApprover: null,
      isSelfApprover: false,
	  forceRefresh: false,
	  initialTab: "comments",
	  REVIEW_ALL: "all",
	  REVIEW_ANY: "any",
	  approvalState: null,
	  draftCommentCount: 0,
	  isCommunityOwner: false,
	  allLibraryApprovers: false, //Are all library approvers required to approve
	  // Tabs
	  widgetTabs: { 
	     comments: { tab: "commentsTab", tabLink: "commentsTabLink", tabBody: "commentsTabBody" },
		 history: { tab: "historyTab", tabLink: "historyTabLink", tabBody: "historyTabBody" },
		 review: { tab: "reviewTab", tabLink: "reviewTabLink", tabBody: "reviewTabBody" }
	  },
	  getTabInitializers: function() { 
		  return { 
		   history: "initializeHistory", 
		   review: "initializeReview"
          }; 
	  }, 
	  initializeUI: function () {
		 this.checkIsSelfApprover();
		 var approvalType = this.value("approvalType");
		 this.allLibraryApprovers = (approvalType == this.REVIEW_ALL);
		 this.approvalState = this.value("approvalState");
	     this.checkEventType();
	     this.inherited(arguments);
	     this.setButtonActions();
	     this.commentCountChange(0);
	     this.initComplete();
	     this.initializeComments();
	     this.notifyLoaded();
	  },
	  //No comment count for draft comments, override function
	  commentCountChange: function(count) {
	     dojo.html.set(dojo.byId(this.getCommentsTabLinkId()), this.nls.COMMENTS.ARIA_LABEL);
	  },
	  isApprover: function(approver) {
	     return (approver.isSelf || approver.id == this.authUser.id);
	  },
	  checkIsSelfApprover: function() {
	     var scope = this, approvers = this.value("approvers");
		 dojo.forEach(approvers, function (approver) {
			if (scope.isApprover(approver)) {
			      if (approver.id == scope.authUser.id) 
                  scope.individualApprover = approver;
               else
                  scope.communityApprover = approver;
               scope.isSelfApprover = true;
			}
		 });
		 if (this.individualApprover)
		    this.selfApprover = this.individualApprover;
		 else if (this.communityApprover)
		    this.selfApprover = this.communityApprover;
	  },
	  checkEventType: function() {
	     //UX has requested that we show messages for certain events because we have to be vague in event strings.
		 var nls = this._draftStrings, msg = null;
		 if (this.isSelfApprover) {
		    if (this.selfApprover.status == "pending") {
		    	msg = this.getPendingMessage();
		    }
		    else if (this.selfApprover.status == "rejected") {
		       msg = nls.reject_info;   
		    }
		    else {
		       msg = nls.accept_info; //approved case   
		    }
		 }
		 if (msg)
		    this.onInfoMessage(null, null, msg);	   
	   },
	   getPendingMessage: function(isDifferentId) {
	      var nls = this._draftStrings;
	      var msg = nls.draft_review_404_general_info; //If draft state is rejected or accepted, the review is no longer needed, even if user status = pending
	      if (this.approvalState == "pending") {
	         //doc type is pending
	         if (!this.selfApprover && isDifferentId)
	             msg = nls.draft_general_info;
	         else if (this.selfApprover && this.selfApprover.scope == "document")
	             msg = isDifferentId ? nls.draft_review_404_require_info : nls.draft_review_require_info;
	         else {
	            //library scope
	        	if (this.allLibraryApprovers)
	        	   msg = isDifferentId ? nls.draft_review_404_require_info : nls.draft_review_require_info;
	        	else
	        	   msg = isDifferentId ? nls.draft_review_404_request_info : nls.draft_review_request_info;
	         }
	      }
		  return msg;
	   },
	   // Comments
	   getCommentOpts: function () {
//	      var count = parseInt(this.value("commentCount")); //we expect to get the draft comment number here but CS is giving us the public doc comment number
		  var count = this.draftCommentCount; //temp solution for defect 89827
	      var url = this.value("urlFeed");
	      return { 
	         commentCount: count, 
	         url: uu.rewrite(url, { acls: "true" }),
	         dsOpts: { totalItems: count, anonymous: this.routes.anonymous, forceDraftComments: true},  
	         dsConstructor: "com.ibm.social.ee.data.ECMCommentsFeedDataStore",
	         docTitle: this.value("name"),
	         showVersion: false,
	         isDraft: true,
	         currVersion: this.value("versionLabel"),
	         noCountListener: true,
	         mentionsEnabled: com.ibm.social.eeconfig.config.ecmMentionsEnabled,
	         mentionsOpts: this.getMentionsOpts(),
            htmlComments: true,
            plainTextMentions: true,
            sendDocTitle: false
	      };
	  },
	  getMentionsOpts: function () {
	     var visibilityCheckerArgs = this.getVisibilityCheckerArgs();
	     return {
	        communityId: this._getCommunityId(this.context),
	        isPublic: true,
	        visibilityChecker: new com.ibm.social.ee.data.ECMFileAccessChecker(visibilityCheckerArgs)
	     };
	  },
	  getCommentsTabLinkId: function () { return this.commentsTabLink; },
	  getCommentsContainer: function() { return this.commentsTabBody; },
	  initializeReview: function() {
	     var container = this.reviewTabBody;
	     if (!this.reviewWidget) {
	        var reviewDiv = dojo.create("div", { }, container);
	        this.reviewWidget = new com.ibm.social.ee.widget.ECMReview({
	           _blankGif: this._blankGif,
	           isApprover: dojo.hitch(this, this.isApprover),
  		       generateLinkToPerson: dojo.hitch(this, this.generateLinkToPerson),
  		       getRouteOptions: dojo.hitch(this, this.getRouteOptions),
  		       approvers: this.value("approvers"),
  		       allLibraryApprovers: this.allLibraryApprovers,
  		       approvalState: this.approvalState,
  		       submitter: this.value("modifier"),
  		       submitted: this.value("modified"), //submitted date of the draft should be the last modified date
  		       onDisplayChange: dojo.hitch(this, this.onSizeChange)
	        }, reviewDiv);
	     }
	  },
	  setButtonActions: function() {
	     var reviewDs = null, scope = this;
	     if (this.isSelfApprover && this.selfApprover.status == "pending" && this.approvalState == "pending") {
		    reviewDs = new com.ibm.social.ee.data.ECMDraftReviewDataStore({net: this.network, url: this.selfApprover.submitUrl});
		    if (this.individualApprover && this.communityApprover) {
		       reviewDs.altUrl = this.communityApprover.submitUrl;
		    }
	        var actions = [
	           {
	              name: this._draftStrings.approve,
	              title: this._draftStrings.approve_tooltip, 
	              optClasses: "eeReviewBtn",
	              isVisible: function() { return true; },
	              isDisabled: function() { return false },
	              execute: function() { scope.approveDraft(reviewDs); }
	           },
	           {
	              name: this._draftStrings.reject,
	              title: this._draftStrings.reject_tooltip,
	              optClasses: "eeReviewBtn",
	              isVisible: function() { return true; },
	              isDisabled: function() { return false; },
	              execute: function() { scope.rejectDraft(reviewDs); }
		       }
	        ];
            com.ibm.social.ee.util.misc.generateActionBtns(this, this.btnContainer, actions, null);
	     }
      },
	  rejectDraft: function(ds) {
		 this._disableReviewBtns();
		 this._getReviewItem(ds, {
		    onItem: dojo.hitch(this, function(item, args) {
			   if (item && !(item instanceof Error)){
			      ds.setValue(item, false);
				  ds.save({
				     onComplete: dojo.hitch(this, function() {
					    this._displayReviewMsg(false, true);
					    this.btnContainer.style.display = "none";
					    this.updateReviewTab(false);
				     }),
					 onError: dojo.hitch(this, function() {
					    this._displayReviewMsg(false, false);
					    this._enableReviewBtns();
					 })
				 });
			   }
		    })
		 });
		},
		approveDraft: function(ds) {
			this._disableReviewBtns();
			this._getReviewItem(ds, {
				onItem: dojo.hitch(this, function(item, args) {
					if (item && !(item instanceof Error)){
						ds.setValue(item, true);
						ds.save({
						   onComplete: dojo.hitch(this, function() {
						      this._displayReviewMsg(true, true); 
						      this.btnContainer.style.display = "none";
						      this.updateReviewTab(true);
						    }),
							onError: dojo.hitch(this, function() {
							   this._displayReviewMsg(true, false);
							   this._enableReviewBtns();
							})
						});
					}
				})
			});
		},
		_getReviewItem: function(ds, opt) {
		   ds.fetch({
		      query: {uuid: "12345"}, //this.uuid
			  onItem: opt.onItem,
			  onError: opt.onError,
			  scope: null
		   });
		},
		_disableReviewBtns: function() {
		   dojo.query(".eeReviewBtn", this.domNode).forEach(function(btn){
		      dojo.addClass(btn, "lotusBtnDisabled");
		      btn.setAttribute("disabled", "true");
		      btn.setAttribute("aria-disabled", "true");
		   });
		},
		_enableReviewBtns: function() {
		   dojo.query(".eeReviewBtn", this.domNode).forEach(function(btn){
		      dojo.removeClass(btn, "lotusBtnDisabled");
		 	  btn.removeAttribute("disabled");
			  btn.removeAttribute("aria-disabled");
		   });
		},
		_displayReviewMsg: function(isAccept, isSuccess) {
		   var txt;
		   if (isSuccess) {
			  txt = isAccept ? this._draftStrings.accept_success : this._draftStrings.reject_success;
			  this.onSuccessMessage(null, null, txt);
		   }
		   else {
			  txt = isAccept ? this._draftStrings.accept_error : this._draftStrings.reject_error;
			  this.onErrorMessage(null, null, txt);
     	   }
		   this.msgNode.style.display = "";
		   dojo.publish("com/ibm/social/ee/event/scrollTop");
		},
		updateReviewTab: function(isApprove) {
		   this.switchTab("review", this.reviewTab, this.reviewTabLink, this.reviewTabBody);
		   dojo.query(".authUserStatus", this.reviewTabBody).forEach(function(img) {
			  dojo.removeClass(img); //remove all existing css classes
			  if (isApprove)
			     dojo.addClass(img, "otherVoting12 otherVoting12-VoteAccepted12");   
			  else
			     dojo.addClass(img, "otherVoting12 otherVoting12-VoteRejected12");	   
		   });
		},
		getDraftIdChangeMsg: function() {
		   //If the draft has been deleted and a new one exists, we should show the appropriate message
		   return this.getPendingMessage(true);
		}
   });
})();