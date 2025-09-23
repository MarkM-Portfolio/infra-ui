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
	var url = urlModule;
	var misc = miscModule;
	var NewsRoutes = declare("com.ibm.social.ee.data.NewsRoutes", AbstractRoutes, {
	   service: "news",	
		getStatusUpdateEEUrl: function (contextId, resourceId, commentCount) {
	       var eeActionUrl = this.getServiceUrl() + 
	          (this.anonymous ? "/anonymous" : "") + (this.oauth ? "/oauth" : "") + 
	          "/web/statusUpdateEE.action";
	       return url.rewrite(
	         eeActionUrl, 
	         { id: misc.getItemId(contextId), commentCount: commentCount, resourceId: resourceId }
	      );
		},
		getStatusUpdateEEPreviewUrl: function(contextId, previewUrl, isPublic) {
			 var eeActionUrl = this.getServiceUrl() + (isPublic ? "/anonymous" : "") + "/web/statusUpdateEE.action";
	       return url.rewrite(
	          eeActionUrl, 
	          { id: misc.getItemId(contextId), redirect: previewUrl }
		   );
		},
		
		getSUPermissionsUrl: function () {
		   return this.getServiceUrl() + 
	          (this.anonymous ? "/anonymous" : "") + (this.oauth ? "/oauth" : "") +  
	          "/microblogging/isPermitted.action";
		}	
	});
	})();
	return NewsRoutes;
});