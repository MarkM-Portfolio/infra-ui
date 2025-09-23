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

dojo.provide("com.ibm.social.ee.widget.AuthUserEELoader");

dojo.require("com.ibm.social.ee.widget.EELoader");
dojo.require("com.ibm.social.ee.data.OpenSocialRoutes");

dojo.declare("com.ibm.social.ee.widget.AuthUserEELoader", [com.ibm.social.ee.widget.EELoader], {
   // Must be implemented by subclasses
   createRoutes: function () { this._notImplemented("createRoutes"); },
   gadgetClass: null,
   errorStrings: null,
   
   // Setup the loader
   loaderSetup: function () {
      this.routes = this.createRoutes();
   },
      
   // The first url to load will be the authenticated user url
   getLoadUrl: function () {
      if (!this.openSocialRoutes) {
         this.openSocialRoutes = new com.ibm.social.ee.data.OpenSocialRoutes(this.routesParams);
      }
      return this.openSocialRoutes.getAuthUserUrl();
   },
   getHandleAs: function () { return "json"; },
   onDataLoaded: function (data, ioRequest) { 
      if (dojo.getObject("entry.id", false, data))
         this.authUser = { id: data.entry.id, name: data.entry.displayName };
      this.initializeGadget();
   },  
   getErrorStrings: function (nls) { return this.errorStrings || nls.authUser },
   
   makeRequest: function (opts) {
	  opts = opts || {};
	  opts.allowCache = true;
      if (this.anonymous || this.authUser) {
         // Do not attempt to retrieve current user if we know the gadget is anonymous
         this.authUser = this.authUser || { };
         this.showLoading();
         this.initializeGadget();
      }
      else {
         this.inherited(arguments, [opts]);
      }
   },  
   getGadgetOpts: function (div) {
      var opts = {
         context: this.context,
         routes: this.routes,
         network: this.network,
         nls: this.nls,
         authUser: this.authUser,
         onSizeChange: this.onSizeChange,
         onDataError: dojo.hitch(this, this.onDataError),
         onLoaded: dojo.hitch(this, this._onLoaded, div)         
      }
      return opts;
   },
   initializeGadget: function () {
      var div = dojo.create("div", { style: { display: "none"} }, this.domNode);
      var gadgetDiv = dojo.create("div", { }, div);
      var clz = dojo.getObject(this.gadgetClass);      
      this.errorStrings = this.getGadgetErrorStrings();
      var gadget = new clz(this.getGadgetOpts(div), gadgetDiv);
   },
   _onLoaded: function (div) {
      this.loading.style.display = "none";
      this.displayNotification();
      div.style.display = "";
      this.onLoaded();
   }
});