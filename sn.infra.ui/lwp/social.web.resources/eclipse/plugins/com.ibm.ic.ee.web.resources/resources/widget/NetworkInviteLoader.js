/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"ic-ee/data/ProfilesRoutes",
	"ic-ee/gadget/NetworkInvite",
	"ic-ee/widget/HtmlJsonEELoader"
], function (declare, lang, domConstruct, ProfilesRoutes, NetworkInvite, HtmlJsonEELoader) {

	var NetworkInviteLoader = declare("com.ibm.social.ee.widget.NetworkInviteLoader", HtmlJsonEELoader, {
	   allowNotificationDisplay: false,
	   decodeJsonData: true,
	   loaderSetup: function () {
	      this.routes = new ProfilesRoutes(this.routesParams);
	   },   
	   getLoadUrl: function () {
	      return this.routes.getNetworkInviteEEUrl(this.context.actor.id, this.context.id);
	   },   
	   getErrorStrings: function (nls) { return nls.network; },
	   
	   setupGadgetUI: function (data, prefix) {
	      if (!this.networkEE) {
	         this.networkEE = new NetworkInvite({
	            makeRequest: lang.hitch(this, this.makeRequest),
	            context: this.context, 
	            network: this.network, 
	            routes: this.routes,
	            nls: this.nls.network,
	            onSizeChange: lang.hitch(this, this.onSizeChange),
	            nlsCommon: this.nls.common });     
	      }
	      this.networkEE.initializeUI(data, prefix);    
	   },   
	   onDataLoaded: function (data, ioRequest) {
	      if (ioRequest.postFunc)
	         domConstruct.empty(this.domNode);
	      var newData = data.replace(/\{profilesUrl\}/g, this.routes.getServiceUrl());
	      this.inherited(arguments, [newData, ioRequest]);         
	      if (ioRequest.postFunc)
	         ioRequest.postFunc();
	   }   
	});
	return NetworkInviteLoader;
});
