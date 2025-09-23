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

dojo.provide("com.ibm.social.ee.data.AbstractRoutes");

dojo.declare("com.ibm.social.ee.data.AbstractRoutes", null, {
   constructor: function (opts) {
      dojo.mixin(this, opts);
      this.svcUrls = { };
   },
	isSecure: function () {
      if ("isSecure" in dojo.config) { 
         return dojo.config.isSecure;
      }
      else {
         var scheme = (window.location.protocol || "http").replace(':','');
         return (scheme === "https");		
      }
	},
	getServiceUrl: function () {
	   if (!this.svcUrls[this.service]) {
	      var servicesCfg = dojo.getObject("lconn.core.config.services");
	      if (servicesCfg) {
	         this.svcUrls[this.service] = servicesCfg[this.service] ? servicesCfg[this.service][this.isSecure() ? "secureUrl" : "url"] : null;
	      }
	      else {
	         this.svcUrls[this.service] = "/" + this.service;
	      }
	   }
	   return this.svcUrls[this.service];
	},
	isServiceEnabled: function () {
	   var servicesCfg = dojo.getObject("lconn.core.config.services");
	   if (servicesCfg) {
	      if (servicesCfg[this.service])
	         return true;
	   }
	   return false;
	}
});