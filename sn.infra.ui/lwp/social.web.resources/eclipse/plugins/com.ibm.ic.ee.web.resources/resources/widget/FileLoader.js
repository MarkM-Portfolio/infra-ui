/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/topic",
	"ic-ee/config",
	"ic-ee/data/FilesRoutes",
	"ic-ee/gadget/File",
	"ic-ee/widget/HtmlJsonEELoader"
], function (declare, lang, topic, config, FilesRoutes, File, HtmlJsonEELoader) {

	var FileLoader = declare("com.ibm.social.ee.widget.FileLoader", HtmlJsonEELoader, {
	   decodeJsonData: true,
	   loaderSetup: function () {
	      this.routes = new FilesRoutes(this.routesParams);
	   },   
	   getLoadUrl: function () {
	      return this.routes.getEEUrl(this.context.id, config.common.commentCount); 
	   },   
	   getErrorStrings: function (nls) { return nls.file; },   
	   
	   setupGadgetUI: function (fileData, prefix) {
	      var fileEE = new File({ 
	         network: this.network, 
	         context: this.context, 
	         data: fileData, 
	         prefix: prefix,
	     	   onSizeChange: lang.hitch(this, this.onSizeChange),
	     	   nls: this.nls,
	     	   routes: this.routes,
	     	   authUser: fileData.authUser     	   
	      });
	      fileEE.initializeUI();
	      this.setupPrefixFunctions(fileEE);
	      topic.publish("social/ee/file/load", fileData, this.network, this.routes.oauth);
	   },
	   setupPrefixFunctions: function(fileEE) {
	      window[fileEE.prefix + "_switchTab"] = function(tabName) { fileEE.switchTab(tabName); };
	   }   
	});
	return FileLoader;
});
