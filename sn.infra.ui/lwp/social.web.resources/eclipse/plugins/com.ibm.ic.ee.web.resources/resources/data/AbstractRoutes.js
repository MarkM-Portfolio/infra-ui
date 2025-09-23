/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/config",
	"ic-core/config/services"
], function (dojo, declare, lang, config, servicesCfg) {

	var AbstractRoutes = declare("com.ibm.social.ee.data.AbstractRoutes", null, {
	   constructor: function (opts) {
	      lang.mixin(this, opts);
	      this.svcUrls = { };
	   },
		isSecure: function () {
	      if ("isSecure" in config) { 
	         return config.isSecure;
	      }
	      else {
	         var scheme = (window.location.protocol || "http").replace(':','');
	         return (scheme === "https");		
	      }
		},
		getServiceUrl: function (serviceOverride) {
		   var serviceVal = (serviceOverride) ? serviceOverride : this.service;
		   if (!this.svcUrls[serviceVal]) {		      
		      if (servicesCfg) {
		         this.svcUrls[serviceVal] = servicesCfg[serviceVal] ? servicesCfg[serviceVal][this.isSecure() ? "secureUrl" : "url"] : null;
		      }
		      else {
		         this.svcUrls[serviceVal] = "/" + serviceVal;
		      }
		   }
		   return this.svcUrls[serviceVal];
		},
		isServiceEnabled: function () {
		   if (servicesCfg) {
		      if (servicesCfg[this.service])
		         return true;
		   }
		   return false;
		}
	});
	return AbstractRoutes;
});
