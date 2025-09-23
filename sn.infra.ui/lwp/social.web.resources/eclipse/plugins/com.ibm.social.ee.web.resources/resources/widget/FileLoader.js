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

dojo.provide("com.ibm.social.ee.widget.FileLoader");

dojo.require("com.ibm.social.ee.widget.HtmlJsonEELoader");
dojo.require("com.ibm.social.ee.gadget.File");
dojo.require("com.ibm.social.ee.data.FilesRoutes");


dojo.declare("com.ibm.social.ee.widget.FileLoader", [com.ibm.social.ee.widget.HtmlJsonEELoader], {
   decodeJsonData: true,
   loaderSetup: function () {
      this.routes = new com.ibm.social.ee.data.FilesRoutes(this.routesParams);
   },   
   getLoadUrl: function () {
      return this.routes.getEEUrl(this.context.id, com.ibm.social.ee.config.common.commentCount); 
   },   
   getErrorStrings: function (nls) { return nls.file; },   
   
   setupGadgetUI: function (fileData, prefix) {
      var fileEE = new com.ibm.social.ee.gadget.File({ 
         network: this.network, 
         context: this.context, 
         data: fileData, 
         prefix: prefix,
     	   onSizeChange: dojo.hitch(this, this.onSizeChange),
     	   nls: this.nls,
     	   routes: this.routes,
     	   authUser: fileData.authUser     	   
      });
      fileEE.initializeUI();
      this.setupPrefixFunctions(fileEE);
      dojo.publish("social/ee/file/load", [fileData, this.network, this.routes.oauth]);
   },
   setupPrefixFunctions: function(fileEE) {
      window[fileEE.prefix + "_switchTab"] = function(tabName) { fileEE.switchTab(tabName); };
   }   
});