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

dojo.provide("com.ibm.social.ee.widget.EELoader");

dojo.require("dijit._Widget");
dojo.require("com.ibm.social.ee.util.ErrorHandling");
dojo.require("com.ibm.social.ee.util.ASNotifications");
dojo.require("com.ibm.social.ee.util.ContentManipulation");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.ee.util.misc");
dojo.require("com.ibm.social.ee.gadget._EEGadget");
dojo.require("com.ibm.social.ee.config");
dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");

/**
 * Common class for all EE gadget loader classes
 */
dojo.declare("com.ibm.social.ee.widget.EELoader", [dijit._Widget], {
   decodeJsonData: false,
   // Abstract methods that must be implemented by subclass
   getEEUrl: function () { this._notImplemented("getEEUrl"); },
   onDataLoaded: function (data, ioRequest) { this._notImplemented("onDataLoaded"); },   
   getErrorStrings: function (nls) { this._notImplemented("getErrorStrings"); },

   // Methods that must be called by this class
   onLoaded: function () { },
   onSizeChange: function () { },   
   
   // Methods that are optionally implemented by subclass
   loaderSetup: function () { }, 
   getHandleAs: function() { return "text"; },
   
   // Widget lifecycle
   postMixInProperties: function () {
      this.nls = dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings");
      
      // Initialize utility strings
      com.ibm.social.incontext.util.DateFormat.prototype._nls = this.nls;
      com.ibm.social.incontext.util.text._SIZE = this.nls.size;         
   },
   postCreate: function() {
      // Initialize network if not passed in
      if (!this.network) {
         var networkClass = this.isGadget ? "com.ibm.social.incontext.NetworkOS" : "com.ibm.social.incontext.NetworkDojo";
         var clz = dojo.getObject(networkClass);
         this.network = new clz();
      }
      com.ibm.social.ee.util.ErrorHandling.setNetwork(this.network);
      com.ibm.social.ee.util.ErrorHandling.setSizeChangeFunction(this.onSizeChange);
      
      // Initialize routes parameters
      this.routesParams = { anonymous: this.anonymous, oauth: this.oauth, network: this.network };
      
      // Initialize AS notifications
      new com.ibm.social.ee.util.ASNotifications({network:this.network,rollupUrl:this.context.rollupUrl,isGadget:this.isGadget});
      
      // Perform gadget-specific initialization
      this.loaderSetup();
      
      // Setup content manipulation class
      var cm = com.ibm.social.ee.util.ContentManipulation;
      cm.routes = this.routes;
      cm.network = this.network;
      
      // Make network request
      this.makeRequest();
   },
   
   showLoading: function () {
   	if (this.loading) {
   		dojo.destroy(this.loading);
   		delete this.loading;
   	}
      this.loading = dojo.create("div", {}, this.domNode);
      com.ibm.social.incontext.util.html.showLoading(this.loading, true);      
   },
   
   hideLoading: function () {
      if (this.loading)
         this.loading.style.display = "none";            
   },
     
   makeRequest: function (opts) {
      if (!opts || !opts.dontClear) {
         dojo.empty(this.domNode);
         this.showLoading();
      }
      var reqOpts = {
         handleAs: this.getHandleAs(),
         url: this.getLoadUrl(),
         preventCache: !(opts && opts.allowCache),
         load: dojo.hitch(this, this.onDataLoaded),
         error: dojo.hitch(this, this.onDataError)
      };
      if (opts)
         dojo.mixin(reqOpts, opts);      
      this.network.get(reqOpts);
   },
   
   onDataError: function (error, ioArgs) {
      var nls = this.nls;
      com.ibm.social.ee.util.ErrorHandling.onDataErrorCommon(error, this.loading, this.getErrorStrings(nls), dojo.hitch(this, this.makeRequest), this, nls.common.ERROR_ALT, this.blankGif);
      if (this.onErrorListener) 
         this.onErrorListener();
   },
      
   
   // Private functions
   _notImplemented: function (funcName) {
      throw new Error("Function " + funcName + " must be implemented by EE loader subclass");
   },
   
   displayNotification: function () {
      var actor = this.context["actor"], d = dojo.doc, 
         div1, div2, div3, div4,intro, span; 
      
   	if (this.notification) {
   		dojo.destroy(this.notification);
   		delete this.notification;
   	}
	
	var isNotificationEvent = this.context.eventType in com.ibm.social.ee.config.notificationEvents;
      if (isNotificationEvent && this.context["notification.content"]) {
         this.notification = dojo.create("div", {className: "lotusFlyoutInner"}, this.domNode, "first");
            div1 = dojo.create("div");
               span = dojo.create("span", {className: "vcard"}, div1);
               span.appendChild(d.createTextNode(actor.displayName));
               com.ibm.social.ee.gadget._EEGadget.prototype.formatUserName({
                     userid: com.ibm.social.ee.util.misc.getItemId(actor.id),
                     state: (actor && actor.connections) ? actor.connections.state: "",
                     name: actor.displayName
                  }, span, true, this.nls.common.PERSON_TITLE);
            intro = dojo.string.substitute(this.nls.file.notifications.USER_SHARED, {user: div1.innerHTML});
            div2 = dojo.create("div", {}, this.notification);
         div2.innerHTML = intro;
         
         div3 = dojo.create("div", {className: "lotusStatus"}, 
               this.notification);
         div3.innerHTML = this.context["notification.content"];
         com.ibm.social.incontext.util.text.breakStringHTML(div3, 9);
         div4 = dojo.create("div", {className: "lotusChunk"}, this.notification);
         div4.appendChild(d.createTextNode(" "));
      }
   }
   
});