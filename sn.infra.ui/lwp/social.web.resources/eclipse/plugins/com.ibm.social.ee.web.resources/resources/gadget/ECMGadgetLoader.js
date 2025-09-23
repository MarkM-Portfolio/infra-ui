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

dojo.provide("com.ibm.social.ee.gadget.ECMGadgetLoader");

dojo.require("com.ibm.social.ee.gadget.ECMPublishedDocEntry");
dojo.require("com.ibm.social.ee.gadget.ECMDraftEntry");
dojo.require("com.ibm.social.ee.gadget.ECMDraftReviewEntry");
dojo.require("com.ibm.social.ee.gadget._ECMEEGadgetWidget");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.ee.config");

dojo.declare("com.ibm.social.ee.gadget.ECMGadgetLoader", [com.ibm.social.ee.gadget._ECMEEGadgetWidget], {
   templatePath: dojo.moduleUrl("com.ibm.social.ee", "gadget/templates/ECMGadgetLoader.html"),
   draftType: ["draft", "draftpage"],
   loadDraft: false,
   dontLoadAgain: false, // Prevent 2 requests from being made for the doc entry the first time
   loadData: function(args) {
      this.inherited(arguments, [{addtlParams: this.getAddtlParams()}]);
   },
   getAddtlParams: function() {
      return this.shouldLoadDraft() ? com.ibm.social.ee.config.ecm.draftParams : com.ibm.social.ee.config.ecm.publishedParams;    
   },
   /* Determine which EE to show (draft or published) */
   initializeUI: function() {
      if (this.shouldLoadDraft()) {
         // We expected a draft based on the event type.  First check to see if we really did get back a draft.
         if(dojo.indexOf(this.draftType, this.data.category) != -1) {
            // We did get back a draft so load draft widget
            this.loadDraft = this.dontLoadAgain = true;
            this.loadDraftWidget();
         }
         else {
            // We got back a document so the draft must have been deleted or promoted.  Show the public doc instead with a message.
            this.loadDraft = this.dontLoadAgain = false;
            // We want to show a special message to the reviewers when a file is canceled.  Otherwise we show a general message to both reviewers and owners if a draft no longer exists.
            var msg = (this.context.eventType == "ecm.review.task.cancelled" && !this.isAuthUserDraftOwner()) ? this.nls.ecm_file.draft_review_canceled : this.nls.ecm_file.draft_404_info;
            this.loadPublishedDocWidget();
            this.ecmPublishedGadget.onInfoMessage(null, null, msg);
         }
      }
      else {
         // The event type is not about a draft so expect to show published document
         this.loadDraft = false;
         this.dontLoadAgain = true;
         this.loadPublishedDocWidget();  
      }
   },
   /* We don't get back reviewer data with certain events like cancel but we can make an assumption if draftId is there. */
   isAuthUserDraftOwner: function() {
      return this.value("draftId") ? true : false;  
   },
   /* Make a guess as to which EE we want to show first based on event type.  This is so we include the correct
    * parameters on the initial request. Returns true or false */
   shouldLoadDraft: function() {
	   //All events containing the review chars should load the Draft Review EE except for ecm.review.document.approved
      return ((this.context.eventType.indexOf("review") != -1) && (this.context.eventType.indexOf("document.approved") == -1));   
   },
   initComplete: function() {
      this.hideLoading();
      if(this.loadDraft) {
         this.publishedNode.style.display = "none";
         this.draftNode.style.display = "";   
      }
      else {
         this.draftNode.style.display = "none";
         this.publishedNode.style.display = "";   
      }
   },
   loadDraftWidget: function() {
      this.publishedNode.style.display = "none";
      this.showLoading();
      this.loadDraft = true;
      if (!this.ecmDraftGadget) {
         var gadgetDiv = dojo.create("div", { }, this.draftNode); 
         var addtlParams = {
            loadPublishedDocWidget: dojo.hitch(this, this.loadPublishedDocWidget),
            initComplete: dojo.hitch(this, this.initComplete),
            showLoading: dojo.hitch(this, this.showLoading),
            hideLoading: dojo.hitch(this, this.hideLoading),
            ecmPublishedGadget: this.ecmPublishedGadget,
            eventType: this.context.eventType,
            draftDeleteStr: this.nls.ecm_file.draft_404_info,
            ds: this.ds,
            data: this.data,
            container: this.draftNode,
            publishedCtnr: this.publishedNode
         };
         var params = dojo.mixin(this.params, addtlParams);
         var isReview = this.value("approvalState");
         var gadget = this.ecmDraftGadget = isReview ? new com.ibm.social.ee.gadget.ECMDraftReviewEntry(params, gadgetDiv) : new com.ibm.social.ee.gadget.ECMDraftEntry(params, gadgetDiv);
         /* Prevent the initial request from being made a second time.  We also want to make sure
          * we load from the beginning when toggling to the draft EE from the published document EE.
          */
         if (!this.dontLoadAgain || this.ecmPublishedGadget)
            gadget.loadData(); // Initial request
         else
            gadget.dataLoaded(); // Initial request already made, re-use this.data
      }
      else {
         this.draftNode.style.display = ""; 
      }
      this.hideLoading();
      this.onSizeChange();
   },
   loadPublishedDocWidget: function() {
      this.draftNode.style.display = "none";
      this.showLoading();
      this.loadDraft = false;
      if (!this.ecmPublishedGadget) {
         var gadgetDiv = dojo.create("div", { }, this.publishedNode); 
         var addtlParams = {
            loadDraftWidget: dojo.hitch(this, this.loadDraftWidget),
            initComplete: dojo.hitch(this, this.initComplete),
            ecmDraftGadget: this.ecmDraftGadget,
            ds: this.ds,
            data: this.data,
            dontLoadAgain: this.dontLoadAgain
         };
         var params = dojo.mixin(this.params, addtlParams);
         var gadget = this.ecmPublishedGadget = new com.ibm.social.ee.gadget.ECMPublishedDocEntry(params, gadgetDiv);
         /* Prevent the initial request from being made a second time.  However it should be made a second time
         * if the draft has been deleted and we want to check for the public doc.  We also want to make sure
         * we load from the beginning when toggling to the published EE from the draft EE.
         */
         if (!this.dontLoadAgain || this.ecmDraftGadget)
            gadget.loadData();  // Initial request
         else
            gadget.dataLoaded();  // Initial request already made, re-use this.data
      }
      else {
         this.hideLoading();
         this.publishedNode.style.display = "";
      }
      this.onSizeChange();
   },
   showLoading: function() { 
      dojo.empty(this.loadingNode);
      com.ibm.social.incontext.util.html.showLoading(this.loadingNode);
      this.loadingNode.style.display = "";  
   },
   hideLoading: function() {
      this.loadingNode.style.display = "none";   
   }

});   