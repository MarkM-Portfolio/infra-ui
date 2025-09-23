/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/text!ic-ee/gadget/templates/ECMDraftReviewEntry.html",
	"dojo/topic",
	"ic-ee/util/misc",
	"ic-ee/gadget/_ECMDraftEntryMixin",
	"ic-ee/data/ECMFileAccessChecker",
	"ic-ee/gadget/_ECMEntry",
	"ic-ee/data/ECMDraftReviewDataStore",
	"ic-ee/widget/ECMReview",
	"ic-eeconfig/config",
	"ic-incontext/util/text",
	"ic-incontext/util/url"
], function (dojo, declare, array, lang, dom, domClass, domConstruct, query, template, topic, misc, _ECMDraftEntryMixin, ECMFileAccessChecker, _ECMEntry, ECMDraftReviewDataStore, ECMReview, ibmSocialEeconfigConfig, text, urlModule) {

	/**
	 * Widget that displays an EE UI for an ECM Draft Entry The following properties are
	 * required for creation: - network - An instance of either NetworkOS or
	 * NetworkDojo - context - A context object containing the URL of the EE entry
	 */
	(function(){
	
	   var uu = urlModule;
	   var ut = text;
	   var g = com.ibm.social.ee.gadget;
	   
	   var ECMDraftReviewEntry = declare("com.ibm.social.ee.gadget.ECMDraftReviewEntry", [g._ECMEntry, g._ECMDraftReviewCommentsMixin, g._ECMDraftEntryMixin], {  	      
	      templateString: template,
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
		     dojo.html.set(dom.byId(this.getCommentsTabLinkId()), this.nls.COMMENTS.ARIA_LABEL);
		  },
		  isApprover: function(approver) {
		     return (approver.isSelf || approver.id == this.authUser.id);
		  },
		  checkIsSelfApprover: function() {
		     var scope = this, approvers = this.value("approvers");
			 array.forEach(approvers, function (approver) {
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
		         mentionsEnabled: ibmSocialEeconfigConfig.ecmMentionsEnabled,
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
		        visibilityChecker: new ECMFileAccessChecker(visibilityCheckerArgs)
		     };
		  },
		  getCommentsTabLinkId: function () { return this.commentsTabLink; },
		  getCommentsContainer: function() { return this.commentsTabBody; },
		  initializeReview: function() {
		     var container = this.reviewTabBody;
		     if (!this.reviewWidget) {
		        var reviewDiv = domConstruct.create("div", { }, container);
		        this.reviewWidget = new ECMReview({
		           _blankGif: this._blankGif,
		           isApprover: lang.hitch(this, this.isApprover),
	  		       generateLinkToPerson: lang.hitch(this, this.generateLinkToPerson),
	  		       getRouteOptions: lang.hitch(this, this.getRouteOptions),
	  		       approvers: this.value("approvers"),
	  		       allLibraryApprovers: this.allLibraryApprovers,
	  		       approvalState: this.approvalState,
	  		       submitter: this.value("modifier"),
	  		       submitted: this.value("modified"), //submitted date of the draft should be the last modified date
	  		       onDisplayChange: lang.hitch(this, this.onSizeChange)
		        }, reviewDiv);
		     }
		  },
		  setButtonActions: function() {
		     var reviewDs = null, scope = this;
		     if (this.isSelfApprover && this.selfApprover.status == "pending" && this.approvalState == "pending") {
			    reviewDs = new ECMDraftReviewDataStore({net: this.network, url: this.selfApprover.submitUrl});
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
	            misc.generateActionBtns(this, this.btnContainer, actions, null);
		     }
	      },
		  rejectDraft: function(ds) {
			 this._disableReviewBtns();
			 this._getReviewItem(ds, {
			    onItem: lang.hitch(this, function(item, args) {
				   if (item && !(item instanceof Error)){
				      ds.setValue(item, false);
					  ds.save({
					     onComplete: lang.hitch(this, function() {
						    this._displayReviewMsg(false, true);
						    this.btnContainer.style.display = "none";
						    this.updateReviewTab(false);
					     }),
						 onError: lang.hitch(this, function() {
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
					onItem: lang.hitch(this, function(item, args) {
						if (item && !(item instanceof Error)){
							ds.setValue(item, true);
							ds.save({
							   onComplete: lang.hitch(this, function() {
							      this._displayReviewMsg(true, true); 
							      this.btnContainer.style.display = "none";
							      this.updateReviewTab(true);
							    }),
								onError: lang.hitch(this, function() {
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
			   query(".eeReviewBtn", this.domNode).forEach(function(btn){
			      domClass.add(btn, "lotusBtnDisabled");
			      btn.setAttribute("disabled", "true");
			      btn.setAttribute("aria-disabled", "true");
			   });
			},
			_enableReviewBtns: function() {
			   query(".eeReviewBtn", this.domNode).forEach(function(btn){
			      domClass.remove(btn, "lotusBtnDisabled");
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
			   topic.publish("com/ibm/social/ee/event/scrollTop");
			},
			updateReviewTab: function(isApprove) {
			   this.switchTab("review", this.reviewTab, this.reviewTabLink, this.reviewTabBody);
			   query(".authUserStatus", this.reviewTabBody).forEach(function(img) {
				  domClass.remove(img); //remove all existing css classes
				  if (isApprove)
				     domClass.add(img, "otherVoting12 otherVoting12-VoteAccepted12");   
				  else
				     domClass.add(img, "otherVoting12 otherVoting12-VoteRejected12");	   
			   });
			},
			getDraftIdChangeMsg: function() {
			   //If the draft has been deleted and a new one exists, we should show the appropriate message
			   return this.getPendingMessage(true);
			}
	   });
	})();
	return ECMDraftReviewEntry;
});
