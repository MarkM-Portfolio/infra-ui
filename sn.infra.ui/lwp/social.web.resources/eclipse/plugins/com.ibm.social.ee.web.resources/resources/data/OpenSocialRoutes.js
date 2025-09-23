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

dojo.provide("com.ibm.social.ee.data.OpenSocialRoutes");

dojo.require("com.ibm.social.ee.data.AbstractRoutes");
dojo.require("com.ibm.social.ee.util.misc");
dojo.require("com.ibm.social.incontext.util.url");

(function () {
var uu = com.ibm.social.incontext.util.url;
var misc = com.ibm.social.ee.util.misc;
dojo.declare("com.ibm.social.ee.data.OpenSocialRoutes", com.ibm.social.ee.data.AbstractRoutes, {	
   service: "opensocial",
	getAuthUserUrl: function () {
	   return this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/rest/people/@me/@self"
	},
	getRollupUrl: function (id) {
	   var url = this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/rest/activitystreams/@public/@all/@all?filterBy=object&filterOp=equals";
	   url = uu.rewrite(url, { filterValue: id });
	   return url;
	},
	getRepostUrl: function() {
      return this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/rest/activitystreams/@me/@all/@all";	   
	},
	getMicrobloggingSettingsUrl: function() {
	   return this.getServiceUrl() + (this.oauth ? "/oauth" : (this.anonymous ? "/anonymous" : "")) + "/rest/ublog/@config/settings";
	}
});
})();