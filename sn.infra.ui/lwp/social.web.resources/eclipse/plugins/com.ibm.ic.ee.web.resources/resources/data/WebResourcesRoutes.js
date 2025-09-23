define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-core/config/services",
	"ic-ee/data/AbstractRoutes",
	"ic-incontext/util/url"
], function (declare, lang, services, AbstractRoutes, url) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2012                                          */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var WebResourcesRoutes = declare("com.ibm.social.ee.data.WebResourcesRoutes", AbstractRoutes, {
	   getTopicEntryUrl: function (id) {
	      return this.getForumsUrl() + "/atom/topic?topicUuid=" + id;
	   },
	
	   getWebResourcesUrl: function () {
	      if (!this.webResourcesUrl) {
	         if (lang.getObject("lconn.core.config.services")) {
	            this.webResourcesUrl = services.webresources[this.isSecure() ? "secureUrl" : "url"];
	         }
	         else {
	            this.webResourcesUrl = "/connections/resources";
	         }
	      }
	      return this.webResourcesUrl;
	   },
	   getSystemTimeUrl: function () {
	      return this.getWebResourcesUrl() + "/web/systemTime";
	   }
	});
	return WebResourcesRoutes;
});