/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-incontext/util/dom",
	"ic-incontext/util/text"
], function (declare, AtomBean, dom, text) {

	(function(){
	var du = dom;
	var dt = text;
	var Version = declare("com.ibm.social.ee.bean.Version", AtomBean, {
	   category: "version",
	   getDocumentId: function() {return du.getChildElementTextContentNS(this.e, "documentUuid", du.DOCUMENTS_ATOM_NAMESPACE);},
	   getVersionLabel: function() {return du.getChildElementTextContentNS(this.e, "versionLabel", du.DOCUMENTS_ATOM_NAMESPACE);},
	   getChangeSummary: function() {return du.getChildElementTextContent(this.e, "summary");},
	   getSize: function() {return dt.parseInt(du.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "length"));}
	});
	})();
	return Version;
});
