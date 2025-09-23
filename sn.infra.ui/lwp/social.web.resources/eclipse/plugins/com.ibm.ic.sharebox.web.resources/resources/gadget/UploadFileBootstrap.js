/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"ic-core/config/services",
	"ic-incontext/gadget/Bootstrap",
	"ic-sharebox/TypeAheadUtil"
], function (lang, services, Bootstrap, TypeAheadUtil) {

	(function(){
	   var _bootstrap = com.ibm.social.sharebox.gadget.UploadFileBootstrap;
	   lang.mixin(_bootstrap, Bootstrap);
	   lang.mixin(_bootstrap, {   
	      getBodyClasses: function() {
	         return "lotusui30 lotusui30_fonts lotusui30_layout lotusui30_body";
		   },
		   initializeKeyHandlers: function() {
	   	   TypeAheadUtil.registerHandlers();
		   }
	   });
	})();
	return com.ibm.social.sharebox.gadget.UploadFileBootstrap;
});
