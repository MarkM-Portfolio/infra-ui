/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/User",
	"ic-incontext/util/dom"
], function (declare, AtomBean, User, dom) {

	(function () {
	var domutil = dom;
	var ProfilesConnection = declare("com.ibm.social.ee.bean.ProfilesConnection", AtomBean, {	
		getTargetUser: function () {
			if (!this.targetUser) {
				var tn = domutil.getChildElementMatchingAttributeNS(this.e, "contributor", domutil.NAMESPACES.ATOM, "rel", domutil.NAMESPACES.SNX, "http://www.ibm.com/xmlns/prod/sn/connection/target");
				this.targetUser = new User(tn);
			}
			return this.targetUser;
		}
	});
	}) ();
	return ProfilesConnection;
});
