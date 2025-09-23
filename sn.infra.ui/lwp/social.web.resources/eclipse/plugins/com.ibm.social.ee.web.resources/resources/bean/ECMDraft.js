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

dojo.provide("com.ibm.social.ee.bean.ECMDraft");
dojo.require("com.ibm.social.ee.bean.ECMApprover");

dojo.require("com.ibm.social.ee.bean.ECMAbstractDoc");

(function () {
   var util = com.ibm.social.incontext.util;
   
   dojo.declare("com.ibm.social.ee.bean.ECMDraft", [com.ibm.social.ee.bean.ECMAbstractDoc], {
      category: "draft",   
      getDocumentId: function() {
         return util.dom.getChildElementTextContentNS(this.e, "documentUuid", util.dom.DOCUMENTS_ATOM_NAMESPACE);
      },
      isLocked: function() {return true;}, //do drafts always imply a locked document?
      getType: function() { return "draft"; },
      isCurrentVersionAvail: function () {
         var documentUuid = this.getDocumentId();
         if (documentUuid && documentUuid != "")
            return true;
         return false;
      },
      getDraftUuid: function() {
         if (!this.draftUuid)
            this.draftUuid = util.dom.getChildElementTextContentNS(this.e, "uuid", util.dom.DOCUMENTS_ATOM_NAMESPACE);
         return this.draftUuid;
      },
	  getApprovalType: function() {
	     if (!this.approvalType)
	       this.approvalType = util.dom.getChildElementTextContentNS(this.e, "approvalType", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	     return this.approvalType;
	  },
	  getApprovers: function() {
	     if (!this.approvers) {
	        var approvers = util.dom.getElementsByTagNameNS(this.e, "approver", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	        this.approvers = [];
	        for (var i = 0; i < approvers.length; i++) {
	           this.approvers.push(new com.ibm.social.ee.bean.ECMApprover(approvers[i]));
	        }
	     }
	     return this.approvers;
	  },
	  getCommunityOwnerGroupId: function() {
	     if (!this.communityOwnerGroupId)
		    this.communityOwnerGroupId = util.dom.getChildElementTextContentNS(this.e, "communityOwnerGroupId", util.dom.DOCUMENTS_ATOM_NAMESPACE); 
		 return this.communityOwnerGroupId;
      }
   });

})();