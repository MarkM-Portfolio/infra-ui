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

dojo.provide("com.ibm.social.ee.widget.NetworkInviteLoader");

dojo.require("com.ibm.social.ee.gadget.NetworkInvite");
dojo.require("com.ibm.social.ee.widget.HtmlJsonEELoader");
dojo.require("com.ibm.social.ee.data.ProfilesRoutes");

dojo.declare("com.ibm.social.ee.widget.NetworkInviteLoader", [com.ibm.social.ee.widget.HtmlJsonEELoader], {
   allowNotificationDisplay: false,
   decodeJsonData: true,
   loaderSetup: function () {
      this.routes = new com.ibm.social.ee.data.ProfilesRoutes(this.routesParams);
   },   
   getLoadUrl: function () {
      return this.routes.getNetworkInviteEEUrl(this.context.actor.id, this.context.id);
   },   
   getErrorStrings: function (nls) { return nls.network; },
   
   setupGadgetUI: function (data, prefix) {
      if (!this.networkEE) {
         this.networkEE = new com.ibm.social.ee.gadget.NetworkInvite({
            makeRequest: dojo.hitch(this, this.makeRequest),
            context: this.context, 
            network: this.network, 
            routes: this.routes,
            nls: this.nls.network,
            onSizeChange: dojo.hitch(this, this.onSizeChange),
            nlsCommon: this.nls.common });     
      }
      this.networkEE.initializeUI(data, prefix);    
   },   
   onDataLoaded: function (data, ioRequest) {
      if (ioRequest.postFunc)
         dojo.empty(this.domNode);
      var newData = data.replace(/\{profilesUrl\}/g, this.routes.getServiceUrl());
      this.inherited(arguments, [newData, ioRequest]);         
      if (ioRequest.postFunc)
         ioRequest.postFunc();
   }   
});