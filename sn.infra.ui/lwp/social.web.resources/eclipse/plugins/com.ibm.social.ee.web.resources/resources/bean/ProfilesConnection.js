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

dojo.provide("com.ibm.social.ee.bean.ProfilesConnection");

dojo.require("com.ibm.social.ee.bean.AtomBean");
dojo.require("com.ibm.social.ee.bean.User");
dojo.require("com.ibm.social.incontext.util.dom");

(function () {
var domutil = com.ibm.social.incontext.util.dom;
dojo.declare("com.ibm.social.ee.bean.ProfilesConnection", com.ibm.social.ee.bean.AtomBean, {	
	getTargetUser: function () {
		if (!this.targetUser) {
			var tn = domutil.getChildElementMatchingAttributeNS(this.e, "contributor", domutil.NAMESPACES.ATOM, "rel", domutil.NAMESPACES.SNX, "http://www.ibm.com/xmlns/prod/sn/connection/target");
			this.targetUser = new com.ibm.social.ee.bean.User(tn);
		}
		return this.targetUser;
	}
});
}) ();