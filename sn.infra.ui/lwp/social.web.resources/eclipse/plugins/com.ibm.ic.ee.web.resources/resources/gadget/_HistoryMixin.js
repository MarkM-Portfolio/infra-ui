define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/config",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/Deferred",
	"ic-ee/util/misc",
	"ic-ee/widget/History"
], function (dojo, declare, lang, config, domConstruct, on, Deferred, misc, History) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	var _HistoryMixin = declare("com.ibm.social.ee.gadget._HistoryMixin", null, {
	   // Must be implemented by subclass
	   getHistoryTab: function() {},
	   getHistoryContainer: function() {},
	   
	   // May be implemented by subclass
	   getId: function () {
	      return null;
	   },
	   
	   // Lifecycle
	   destroyUI: function () {
	      this.inherited(arguments);
	      if (this.historyWidget) {
	         this.historyWidget.destroy();
	         delete this.historyWidget;
	      }
	   },
	   
	   initializeHistoryTab: function () {
	      if (!this.context.rollupUrl || misc.getItemIdFromRollupUrl(this.context.rollupUrl) == "null") {
	         var historyTab = this.getHistoryTab();
	         if (historyTab) {
	            historyTab.style.display = "none";
	         }
	         this.historyDisabled = true;
	      }      
	   },
	   getRollupUrl: function() {
	      return this.context.rollupUrl;	   
	   },
	   initializeHistory: function() {
	      var dfd = new Deferred();
	      if (this.historyDisabled) {
	         dfd.callback();
	         return dfd;
	      }
	      if(!this.historyWidget) {
	         var container = this.getHistoryContainer();
	         var historyDiv = domConstruct.create("div", { }, container);
	         var rollupUrl = this.getRollupUrl();
	         if (this.authUser && this.authUser.id && this.routes.oauth && rollupUrl) {
	            // fixup the rollupUrl for oauth
	         	if (rollupUrl.indexOf("/oauth/rest/activitystreams") == -1)
	               rollupUrl = rollupUrl.replace("/rest/activitystreams", "/oauth/rest/activitystreams");
	         }
	         var self = this;
	         this.historyWidget = new History({
	            net: self.network,
	            uuid: self.getId(),
	            routeOptions: self.getRouteOptions(),
	            rollupUrl: rollupUrl,
	            _blankGif: config.blankGif,
	            generateUserImage: lang.hitch(self, self.generateUserImage), 
	            generateLinkToPerson: lang.hitch(self, self.generateLinkToPerson),
	            onLoaded: function() { dfd.callback(); }
	         }, historyDiv);
	         on(this.historyWidget, "DisplayChange", lang.hitch(this, "onSizeChange"));
	      }
	      else {
	         dfd.callback();
	      }
	      return dfd;
	   }
	   
	});
	return _HistoryMixin;
});
