/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/data/ECMCommentsFeedDataStore",
	"ic-ee/gadget/_CommentsMixin"
], function (declare, lang, ECMCommentsFeedDataStore, _CommentsMixin) {

	/* This file should be removed and ECMDraftReviewEntry.js should be changed to be use _CommentsMixin.js once defect 89827 is fixed */
	var _ECMDraftReviewCommentsMixin = declare("com.ibm.social.ee.gadget._ECMDraftReviewCommentsMixin", _CommentsMixin, {
	
	  
	   initializeComments: function () {
	   //get correct comment count for ECM draft comments
		  var totalItems = 0;
	      var dsOpts = {
	         net: this.network,
	         url: this.value("urlFeed"),
	         forceDraftComments: true
	      }; 
		  var tmpCommtDs = new ECMCommentsFeedDataStore(dsOpts);
		     tmpCommtDs.fetch({
		        start: 0,
		        count: 0,
		        query: {uuid: "12345"},
		        sort: [{attribute: "published", descending: true}],
		        onBegin: lang.hitch(this, function(totalItems, request) {
		           this.draftCommentCount = totalItems ? parseInt(totalItems) : 0;
		           _CommentsMixin.prototype.initializeComments.apply(this);
		        })
		     }); 
	  }
	});
	return _ECMDraftReviewCommentsMixin;
});
