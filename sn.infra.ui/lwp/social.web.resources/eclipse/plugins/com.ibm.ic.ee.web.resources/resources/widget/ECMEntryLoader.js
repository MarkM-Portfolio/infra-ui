/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/data/ECMRoutes",
	"ic-ee/widget/AuthUserEELoader"
], function (declare, lang, ECMRoutes, AuthUserEELoader) {

	var ECMEntryLoader = declare("com.ibm.social.ee.widget.ECMEntryLoader", AuthUserEELoader, {
	   gadgetClass: "com.ibm.social.ee.gadget.ECMGadgetLoader",
	   createRoutes: function () {
		  this.routesParams.context = this.context;
	      return new ECMRoutes(this.routesParams);
	   },
	   getGadgetErrorStrings: function () {
	      // Use the event type to determine if we should show an error about a draft or public document
	      var strings = this.nls.file;
	      lang.mixin(strings, this.nls.ecm_file);
	      if (this.isDraftEvent())
	         lang.mixin(strings, this.nls.ecm_draft);
	      return strings; 
	   },
	   isDraftEvent: function() {
		  //All events containing the review chars should load the Draft Review EE except for ecm.review.document.approved
	      return ((this.context.eventType.indexOf("review")!= -1) && (this.context.eventType.indexOf("document.approved") == -1));  
	   },
	   getLoadUrl: function () {
	      return this.routes.getAuthUserUrl();
	   },
	   onDataLoaded: function (data, ioRequest) { 
	      var user = data.items[0];
	      this.network.getAuthenticatedUser = function() {
	         return user;
	      };
	      this.authUser = { id: user.id, name: user.name, email: user.email };
	      this.initializeGadget();
	   },
	   onDataError: function (error, ioArgs) {
	      this.inherited(arguments);
	      this.onSizeChange();
	   }
	});
	return ECMEntryLoader;
});
