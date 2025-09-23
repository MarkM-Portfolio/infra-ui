define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/string",
	"dijit/_Widget",
	"ic-ee/config",
	"ic-ee/gadget/_EEGadget",
	"ic-ee/util/ASNotifications",
	"ic-ee/util/ContentManipulation",
	"ic-ee/util/ErrorHandling",
	"ic-ee/util/misc",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/html",
	"ic-incontext/util/text"
], function (dojo, declare, lang, windowModule, domConstruct, i18nsocialEEStrings, string, _Widget, config, _EEGadget, ASNotifications, ContentManipulation, ErrorHandling, misc, DateFormat, html, text) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2013                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	/**
	 * Common class for all EE gadget loader classes
	 */
	var EELoader = declare("com.ibm.social.ee.widget.EELoader", _Widget, {
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
	      this.nls = i18nsocialEEStrings;
	      
	      // Initialize utility strings
	      DateFormat.prototype._nls = this.nls;
	      text._SIZE = this.nls.size;         
	   },
	   postCreate: function() {
	      // Initialize network if not passed in
	      if (!this.network) {
	         var networkClass = this.isGadget ? "com.ibm.social.incontext.NetworkOS" : "com.ibm.social.incontext.NetworkDojo";
	         var clz = lang.getObject(networkClass);
	         this.network = new clz();
	      }
	      ErrorHandling.setNetwork(this.network);
	      ErrorHandling.setSizeChangeFunction(this.onSizeChange);
	      
	      // Initialize routes parameters
	      this.routesParams = { anonymous: this.anonymous, oauth: this.oauth, network: this.network };
	      
	      // Initialize AS notifications
	      new ASNotifications({network:this.network,rollupUrl:this.context.rollupUrl,isGadget:this.isGadget});
	      
	      // Perform gadget-specific initialization
	      this.loaderSetup();
	      
	      // Setup content manipulation class
	      var cm = ContentManipulation;
	      cm.routes = this.routes;
	      cm.network = this.network;
	      
	      // Make network request
	      this.makeRequest();
	   },
	   
	   showLoading: function () {
	   	if (this.loading) {
	   		domConstruct.destroy(this.loading);
	   		delete this.loading;
	   	}
	      this.loading = domConstruct.create("div", {}, this.domNode);
	      html.showLoading(this.loading, true);      
	   },
	   
	   hideLoading: function () {
	      if (this.loading)
	         this.loading.style.display = "none";            
	   },
	     
	   makeRequest: function (opts) {
	      if (!opts || !opts.dontClear) {
	         domConstruct.empty(this.domNode);
	         this.showLoading();
	      }
	      var reqOpts = {
	         handleAs: this.getHandleAs(),
	         url: this.getLoadUrl(),
	         preventCache: !(opts && opts.allowCache),
	         load: lang.hitch(this, this.onDataLoaded),
	         error: lang.hitch(this, this.onDataError)
	      };
	      if (opts)
	         lang.mixin(reqOpts, opts);      
	      this.network.get(reqOpts);
	   },
	   
	   onDataError: function (error, ioArgs) {
	      var nls = this.nls;
	      ErrorHandling.onDataErrorCommon(error, this.loading, this.getErrorStrings(nls), lang.hitch(this, this.makeRequest), this, nls.common.ERROR_ALT, this.blankGif);
	      if (this.onErrorListener) 
	         this.onErrorListener();
	   },
	      
	   
	   // Private functions
	   _notImplemented: function (funcName) {
	      throw new Error("Function " + funcName + " must be implemented by EE loader subclass");
	   },
	   
	   displayNotification: function () {
	      var actor = this.context["actor"], d = windowModule.doc, 
	         div1, div2, div3, div4,intro, span; 
	      
	   	if (this.notification) {
	   		domConstruct.destroy(this.notification);
	   		delete this.notification;
	   	}
		
		var isNotificationEvent = this.context.eventType in config.notificationEvents;
	      if (isNotificationEvent && this.context["notification.content"]) {
	         this.notification = domConstruct.create("div", {className: "lotusFlyoutInner"}, this.domNode, "first");
	            div1 = domConstruct.create("div");
	               span = domConstruct.create("span", {className: "vcard"}, div1);
	               span.appendChild(d.createTextNode(actor.displayName));
	               _EEGadget.prototype.formatUserName({
	                     userid: misc.getItemId(actor.id),
	                     state: (actor && actor.connections) ? actor.connections.state: "",
	                     name: actor.displayName
	                  }, span, true, this.nls.common.PERSON_TITLE);
	            intro = string.substitute(this.nls.file.notifications.USER_SHARED, {user: div1.innerHTML});
	            div2 = domConstruct.create("div", {}, this.notification);
	         div2.innerHTML = intro;
	         
	         div3 = domConstruct.create("div", {className: "lotusStatus"}, 
	               this.notification);
	         div3.innerHTML = this.context["notification.content"];
	         text.breakStringHTML(div3, 9);
	         div4 = domConstruct.create("div", {className: "lotusChunk"}, this.notification);
	         div4.appendChild(d.createTextNode(" "));
	      }
	   }
	   
	});
	return EELoader;
});