/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.StatusUpdateLoader");

dojo.require("com.ibm.social.ee.gadget.StatusUpdate");
dojo.require("com.ibm.social.ee.widget.HtmlJsonEELoader");
dojo.require("com.ibm.social.ee.data.NewsRoutes");


dojo.declare("com.ibm.social.ee.widget.StatusUpdateLoader", [com.ibm.social.ee.widget.HtmlJsonEELoader], {
   
   loaderSetup: function () {
      this.routes = new com.ibm.social.ee.data.NewsRoutes(this.routesParams);
   },
   getLoadUrl: function () {
      return this.routes.getStatusUpdateEEUrl(this.context.id, this.context.containerid, com.ibm.social.ee.config.common.commentCount);
   },   
   getErrorStrings: function (nls) { return nls.statusUpdate; },
   
   setupGadgetUI: function (statusUpdateData, prefix) {
      // Setup status update UI
      var statusUpdateEE = new com.ibm.social.ee.gadget.StatusUpdate({ 
         network: this.network, 
         authUser: statusUpdateData.authUser,
         data: statusUpdateData, 
         context: this.context,
         prefix: prefix, 
         routes: this.routes,
         nls: this.nls,
         onSizeChange: dojo.hitch(this, this.onSizeChange)
      });
      statusUpdateEE.initializeUI();
      this.setupPrefixFunctions(statusUpdateEE);
      
      // Publish metrics data
      var metricsData = { };
      dojo.mixin(metricsData, statusUpdateData);
      if (this.context.communityid) {
         metricsData.communityId = this.context.communityid;
         metricsData.inCommunity = true;
      }      
      dojo.publish("social/ee/statusupdate/load", [metricsData, this.network, this.routes.oauth]);
   },
   setupPrefixFunctions: function(suEE) {
      window[suEE.prefix + "_switchTab"] = function(tabName) { suEE.switchTab(tabName); };
   }
});