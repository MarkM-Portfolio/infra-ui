define([
	"dojo/_base/declare",
	"ic-ee/data/AbstractRoutes",
	"ic-ee/util/misc",
	"ic-incontext/util/url"
], function (declare, AbstractRoutes, miscModule, urlModule) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2012                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	(function () {
	var uu = urlModule;
	var misc = miscModule;
	var OpenSocialRoutes = declare("com.ibm.social.ee.data.OpenSocialRoutes", AbstractRoutes, {	
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
	return OpenSocialRoutes;
});