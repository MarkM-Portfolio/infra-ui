/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/User",
	"ic-incontext/util/dom"
], function (declare, User, dom) {

	var ECMUser = declare("com.ibm.social.ee.bean.ECMUser", null, {
	   constructor: function(e) {
	      var qsu = dom;
	      this.userid = qsu.getChildElementTextContentNS(e, "userid", qsu.SNX_NAMESPACE) || qsu.getChildElementTextContentNS(e, "principalid", qsu.LCMIS_NAMESPACE);
	      this.id =  this.userid ? this.userid : qsu.getChildElementTextContentNS(e, "uid", qsu.DOCUMENTS_ATOM_NAMESPACE);
	      this.uri = qsu.getChildElementTextContentNS(e, "uri", qsu.DOCUMENTS_ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "uri", qsu.ATOM_NAMESPACE);
	      this.name = qsu.getChildElementTextContentNS(e, "name", qsu.DOCUMENTS_ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "name", qsu.ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "displayname",qsu.LCMIS_NAMESPACE);
	      this.state = qsu.getChildElementTextContentNS(e, "userState", qsu.SNX_NAMESPACE);
	   }
	});
	return ECMUser;
});
