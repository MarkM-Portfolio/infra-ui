/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/ECMAbstractDoc",
	"ic-ee/bean/ECMApprover"
], function (declare, ECMAbstractDoc, ECMApprover) {

	(function () {
	   var util = com.ibm.social.incontext.util;
	   
	   var ECMDraft = declare("com.ibm.social.ee.bean.ECMDraft", ECMAbstractDoc, {
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
		           this.approvers.push(new ECMApprover(approvers[i]));
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
	return ECMDraft;
});
