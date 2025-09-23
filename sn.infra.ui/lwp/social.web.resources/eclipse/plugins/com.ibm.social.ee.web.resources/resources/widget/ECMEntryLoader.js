/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.ECMEntryLoader");

dojo.require("com.ibm.social.ee.gadget.ECMGadgetLoader");
dojo.require("com.ibm.social.ee.data.ECMRoutes");
dojo.require("com.ibm.social.ee.widget.AuthUserEELoader");


dojo.declare("com.ibm.social.ee.widget.ECMEntryLoader", [com.ibm.social.ee.widget.AuthUserEELoader], {
   gadgetClass: "com.ibm.social.ee.gadget.ECMGadgetLoader",
   createRoutes: function () {
	  this.routesParams.context = this.context;
      return new com.ibm.social.ee.data.ECMRoutes(this.routesParams);
   },
   getGadgetErrorStrings: function () {
      // Use the event type to determine if we should show an error about a draft or public document
      var strings = this.nls.file;
      dojo.mixin(strings, this.nls.ecm_file);
      if (this.isDraftEvent())
         dojo.mixin(strings, this.nls.ecm_draft);
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