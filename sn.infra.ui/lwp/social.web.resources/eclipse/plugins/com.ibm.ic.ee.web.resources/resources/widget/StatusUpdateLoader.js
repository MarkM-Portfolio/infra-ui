/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/topic",
	"ic-ee/config",
	"ic-ee/data/NewsRoutes",
	"ic-ee/gadget/StatusUpdate",
	"ic-ee/widget/HtmlJsonEELoader"
], function (declare, lang, topic, config, NewsRoutes, StatusUpdate, HtmlJsonEELoader) {

	var StatusUpdateLoader = declare("com.ibm.social.ee.widget.StatusUpdateLoader", HtmlJsonEELoader, {
	   
	   loaderSetup: function () {
	      this.routes = new NewsRoutes(this.routesParams);
	   },
	   getLoadUrl: function () {
	      return this.routes.getStatusUpdateEEUrl(this.context.id, this.context.containerid, config.common.commentCount);
	   },   
	   getErrorStrings: function (nls) { return nls.statusUpdate; },
	   
	   setupGadgetUI: function (statusUpdateData, prefix) {
	      // Setup status update UI
	      var statusUpdateEE = new StatusUpdate({ 
	         network: this.network, 
	         authUser: statusUpdateData.authUser,
	         data: statusUpdateData, 
	         context: this.context,
	         prefix: prefix, 
	         routes: this.routes,
	         nls: this.nls,
	         onSizeChange: lang.hitch(this, this.onSizeChange)
	      });
	      statusUpdateEE.initializeUI();
	      this.setupPrefixFunctions(statusUpdateEE);
	      
	      // Publish metrics data
	      var metricsData = { };
	      lang.mixin(metricsData, statusUpdateData);
	      if (this.context.communityid) {
	         metricsData.communityId = this.context.communityid;
	         metricsData.inCommunity = true;
	      }      
	      topic.publish("social/ee/statusupdate/load", metricsData, this.network, this.routes.oauth);
	   },
	   setupPrefixFunctions: function(suEE) {
	      window[suEE.prefix + "_switchTab"] = function(tabName) { suEE.switchTab(tabName); };
	   }
	});
	return StatusUpdateLoader;
});
