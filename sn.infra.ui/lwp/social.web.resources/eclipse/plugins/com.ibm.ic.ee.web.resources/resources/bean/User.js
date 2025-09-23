/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-incontext/util/dom",
	"ic-incontext/util/text"
], function (declare, dom, text) {

	var User = declare("com.ibm.social.ee.bean.User", null, {
	   constructor: function(e) {
	      var qsu = dom;
	      this.userid = qsu.getChildElementTextContentNS(e, "userid", qsu.SNX_NAMESPACE) || qsu.getChildElementTextContentNS(e, "principalid", qsu.LCMIS_NAMESPACE);
	      //TODO what should we use for a backup id?
	      this.id =  this.userid ? this.userid : qsu.getChildElementTextContentNS(e, "name", qsu.DOCUMENTS_ATOM_NAMESPACE);
	      this.uri = qsu.getChildElementTextContentNS(e, "uri", qsu.DOCUMENTS_ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "uri", qsu.ATOM_NAMESPACE);
	      this.name = qsu.getChildElementTextContentNS(e, "name", qsu.DOCUMENTS_ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "name", qsu.ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "displayname",qsu.LCMIS_NAMESPACE);
	      this.email = qsu.getChildElementTextContentNS(e, "email", qsu.DOCUMENTS_ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "email", qsu.ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "email", qsu.LCMIS_NAMESPACE);
	      this.hasEmail = (this.email !== null && typeof(this.email) != "undefined") || (text.trim(this.email).length > 0);
	      this.state = qsu.getChildElementTextContentNS(e, "userState", qsu.SNX_NAMESPACE);
	      this.inactive = (this.state === "inactive");
	   },
	   getId: function() {
	      return this.id;
	   },
	   getUri: function() {
	      return this.uri;
	   },
	   getName: function() {
	      return this.name;
	   },
	   getEmail: function() {
	      return this.email;
	   },
	   isHasEmail: function() {
	      return this.hasEmail;
	   },
	   getState: function() {
	      return this.state;
	   }
	});
	
	com.ibm.social.ee.bean.User.decodeUserUri = function(s) {
	   return decodeURIComponent(s.replace("+"," "));
	};
	return User;
});
