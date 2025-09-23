/* Copyright IBM Corp. 2007, 2017  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/text!ic-ee/gadget/templates/ECMPublishdDocEntry.html",
	"ic-ee/util/misc",
	"ic-ee/gadget/_CommentsMixin",
	"ic-ee/data/ECMFileAccessChecker",
	"ic-ee/config",
	"ic-ee/gadget/_ECMEntry",
	"ic-ee/gadget/_RecommendationsMixin",
	"ic-ee/gadget/_TagsMixin",
	"ic-eeconfig/config",
	"ic-incontext/util/text",
	"ic-incontext/util/url"
], function (dojo, array, declare, template, misc, _CommentsMixin, ECMFileAccessChecker, config, _ECMEntry, _RecommendationsMixin, _TagsMixin, ibmSocialEeconfigConfig, text, urlModule) {

	/**
	 * Widget that displays an EE UI for an ECM File Entry The following properties are
	 * required for creation: - network - An instance of either NetworkOS or
	 * NetworkDojo - context - A context object containing the URL of the EE entry
	 */
	
	(function(){
	
		var uu = urlModule;
		var ut = text;
		var g = com.ibm.social.ee.gadget;
	
		var ECMPublishedDocEntry = declare("com.ibm.social.ee.gadget.ECMPublishedDocEntry", 
		  [g._ECMEntry, 
		   g._RecommendationsMixin,
		   g._CommentsMixin,
		   g._TagsMixin], {
			templateString: template,
	   
			initializeUI: function () {
	         this.inherited(arguments);
	         this.setButtonActions();
	         this.commentCountChange(this.value("commentCount"));
	         this.initializeRecommendations();
	         this.initializeComments();
	         this.initComplete();
	         this.notifyLoaded();
			},  
			// Tabs
			widgetTabs: { 
			   comments: { tab: "commentsTab", tabLink: "commentsTabLink", tabBody: "commentsTabBody" },
			   history: { tab: "historyTab", tabLink: "historyTabLink", tabBody: "historyTabBody" } 
			},
		   initialTab: "comments",
		    
		   // Tags
		    getTags: function() { return this.value("tags"); },
		    getTagsContainer: function() { return this.tagsCtnr; },
		    getTagsNode: function() { return this.tagsNode;  },
	       
	       // Comments
		    getCommentOpts: function () {
		       var count = parseInt(this.value("commentCount"));
		       var url = this.value("urlFeed"); //TODO fix instances of anonymous
		       return { 
		          commentCount: count, 
		          url: this.authUser.id ? uu.rewrite(url, { acls: "true" }) : url,
		          dsOpts: { totalItems: count, anonymous: this.routes.anonymous },  
		          dsConstructor: "com.ibm.social.ee.data.ECMCommentsFeedDataStore",
		          docTitle: this.value("name"),
		          showVersion: true,
		          currVersion: this.value("versionLabel"),
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
		    
		    // Recommendations
		    getRecommendInlineDSClass: function() { return "com.ibm.social.ee.data.ECMRecommendationsDataStore"; },
		    getRecommendPopupDSClass: function () { return "com.ibm.social.ee.data.ECMRecommendationsDataStore"; }, 
		    getRecommendElement: function () { return this.recommendationNode; },
		    getRecommendDSOptions: function() {
		       var url = this.value("UrlRecommendations");
		       var recommEntry = this.value("UrlRecommendation");
		       var args = {
		          url: url,
		          entryUrl: recommEntry,
		          hasRecommended: this.value("userRecommended"),
		          recommendCount: this.value("ratingCount")
		       };
		       return args;
		   },
	      initializeMetadata: function() {
	         this.inherited(arguments);
	         this.initializeTags();
	      },
	      getAddtlParams: function() {
	         return config.ecm.publishedParams;
	      },
	      initSwitchEELink: function() {
	         //Show the draft link if the auth user is the draft owner, a draft reviewer, or we already loaded the draft gadget
	         if (this.value("draftId") || this.ecmDraftGadget)
	            this.switchEELink.style.display = "";
	      },
	      dataLoaded: function (item, ioArgs) {
	    	/* If the draft gadget exists, we know we are in the toggle scenario, so override this.data.
	    	 * Or if there is no draft gadget and we did load again, we know the draft has been deleted and we
	    	 * had to fetch again for published data.  So make sure we override this.data with published data */
	         if (this.ecmDraftGadget || (!this.ecmDraftGadget && !this.dontLoadAgain))
	    	    this.data = item;
	    	 this.inherited(arguments);
	      },
	      setButtonActions: function() {
	          var scope = this;
	          var nls = this.nls;
	          this.isFollowing = this.value("notificationEnabled") === true;
	          var actions = [
	             {
	                name: this.isFollowing ? nls.file.following.remove : nls.file.following.add,
	                title: nls.file.following.title, 
	                isVisible: function() {
	                   if(!scope.routes.anonymous)
	                       return true;
	                    else
	                       return false;
	                },
	                execute: function() {
	                   scope.toggleFollowing(scope.followBtn);
	                },
	                isFollow: true
	             }
	          ];
	
	          misc.generateActionBtns(this, this.btnContainer, actions, nls);
	       },
	       toggleFollowing: function (followBtn) {
	           if (this.followingInProgress) return;
	           this.followingInProgress = true;
	           var ds = new com.ibm.social.ee.data.FileFollowingDataStore({ url: this.routes.getEntryUrl(), net: this.network });
	           var newValue = !this.isFollowing;
	           var item = ds.newItem({following: this.isFollowing });
	           ds.revert();
	           ds.setValue(item, "following", newValue);
	           ds.setValue(item, "id", this.data.id);
	           ds.save({
	              scope: this,
	              onError: function (error) {
	                 this.onErrorMessage();
	                 this.followingInProgress = false;
	                 
	              },  
	              onComplete: function () {
	                 this.followingInProgress = false;
	                 this.isFollowing = newValue;
	                 dojo.html.set(followBtn, newValue ? this.nls.file.following.remove : this.nls.file.following.add); 
	              }
	           });
	        },
	        isAuthUserReviewer: function() {
	      	  if (this.value("approvalState")) {
	      		 array.some (this.value("approvers"), function (approver) {
	      	        if (approver.isSelf) {
	      	           return true;
	      	        }
	      	     });
	      	  }
	      	  return false;
	        }
		});	
	})();
	return ECMPublishedDocEntry;
});
