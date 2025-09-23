/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/Moderated",
	"ic-incontext/util/dom"
], function (declare, AtomBean, Moderated, dom) {

	(function(){
	var du = dom;
	var Comment = declare("com.ibm.social.ee.bean.Comment", [AtomBean, Moderated], {
	   category: "comment",   
	   getDocumentId: function() {return du.getChildElementTextContentNS(this.e, "documentId", du.DOCUMENTS_ATOM_NAMESPACE);},
	   isDeleted: function() {return (du.getChildElementTextContentNS(this.e, "deleteWithRecord", du.DOCUMENTS_ATOM_NAMESPACE) == "true");},
	   getVersionLabel: function() { return du.getChildElementTextContentNS(this.e, "versionLabel", du.DOCUMENTS_ATOM_NAMESPACE); }
	});
	
	})();
	return Comment;
});
