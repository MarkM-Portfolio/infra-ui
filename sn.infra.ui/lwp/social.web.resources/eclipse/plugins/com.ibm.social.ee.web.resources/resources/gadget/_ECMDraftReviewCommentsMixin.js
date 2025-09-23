/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget._ECMDraftReviewCommentsMixin");

dojo.require("com.ibm.social.ee.gadget._CommentsMixin");
dojo.require("com.ibm.social.ee.data.ECMCommentsFeedDataStore");

/* This file should be removed and ECMDraftReviewEntry.js should be changed to be use _CommentsMixin.js once defect 89827 is fixed */
dojo.declare("com.ibm.social.ee.gadget._ECMDraftReviewCommentsMixin", com.ibm.social.ee.gadget._CommentsMixin, {

  
   initializeComments: function () {
   //get correct comment count for ECM draft comments
	  var totalItems = 0;
      var dsOpts = {
         net: this.network,
         url: this.value("urlFeed"),
         forceDraftComments: true
      }; 
	  var tmpCommtDs = new com.ibm.social.ee.data.ECMCommentsFeedDataStore(dsOpts);
	     tmpCommtDs.fetch({
	        start: 0,
	        count: 0,
	        query: {uuid: "12345"},
	        sort: [{attribute: "published", descending: true}],
	        onBegin: dojo.hitch(this, function(totalItems, request) {
	           this.draftCommentCount = totalItems ? parseInt(totalItems) : 0;
	           com.ibm.social.ee.gadget._CommentsMixin.prototype.initializeComments.apply(this);
	        })
	     }); 
  }
});