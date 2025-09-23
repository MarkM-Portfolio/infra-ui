/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.globalization.routesTests");

dojo.require("doh.runner");
dojo.require("lconn.core.globalization.Routes");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

(function(routes) {
   function bu() {
      return lconn.core.url.getServiceUrl(lconn.core.config.services.deploymentConfig).toString();
   }
   doh.register("lconn.test.globalization.routesTests", [ {
      name : 'test interface',
      setUp : function() {
         this.r = new routes();
      },
      runTest : function() {
         doh.t(dojo.isFunction(this.r.getHomeUrl));
         doh.t(dojo.isFunction(this.r.getPreferencesUrl));
         doh.t(dojo.isFunction(this.r.getPreferencesSettingsServiceUrl));
         //doh.t(dojo.isFunction(this.r.getPreferencesFeedServiceUrl));
         //doh.t(dojo.isFunction(this.r.getPreferencesServiceUrl));
      }
   }, {
      name : 'test methods',
      setUp : function() {
         this.r = new routes();
      },
      runTest : function() {
         doh.is(bu() + '/settings/globalization', this.r.getHomeUrl());
         doh.is(bu() + '/settings/globalization', this.r.getPreferencesUrl());
         doh.is(this.r.getHomeUrl(), this.r.getPreferencesUrl());
         doh.is(bu() + '/settings/globalization/service', this.r.getPreferencesSettingsServiceUrl());
      }
   }]);
}(lconn.core.globalization.Routes));
