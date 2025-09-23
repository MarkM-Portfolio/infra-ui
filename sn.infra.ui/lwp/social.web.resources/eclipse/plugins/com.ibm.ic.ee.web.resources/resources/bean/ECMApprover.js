/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/ECMUser",
	"ic-incontext/util/dom"
], function (declare, AtomBean, ECMUser, dom) {

	var ECMApprover = declare("com.ibm.social.ee.bean.ECMApprover", [AtomBean, ECMUser], {
	   category: "user",
	   constructor: function(e) {
	      this.inherited(arguments);
	      this.scope = dom.getChildElementTextContentNS(e, "approvalScope", dom.DOCUMENTS_ATOM_NAMESPACE);
	      this.status = dom.getChildElementTextContentNS(e, "approvalState", dom.DOCUMENTS_ATOM_NAMESPACE);
	      this.isSelf = dom.getChildElementTextContentNS(e, "approverSelf", dom.DOCUMENTS_ATOM_NAMESPACE) == "true";
	      this.type = dom.getChildElementTextContentNS(e, "approverType", dom.DOCUMENTS_ATOM_NAMESPACE);
	      this.id = dom.getChildElementTextContentNS(e, "approverId", dom.DOCUMENTS_ATOM_NAMESPACE);
	      this.submitUrl = this.getUrlEntry();
	   }
	});
	return ECMApprover;
});
