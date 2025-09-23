/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "./_ICCometService",
      "dojo/_base/lang",
      "dojo/ready"
], function(_ICCometService, lang, ready) {

   /**
    * ICCometService is the singleton instance consumers should use to get the
    * cometd services. Returns _ICCometService singleton and kicks off the
    * initialization on dom ready
    */

   var _instance = new _ICCometService();

   ready(function() {
	   setTimeout(lang.hitch(this, function() {
		   _instance.initCometD();   
	   }), 8000);     
   });

   return _instance;
});
