/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/lang",
   "ic-core/config",
   "ic-core/config/services",
   "ic-core/globalization/Routes",
   "ic-core/url"
], function (lang, config, services, routes, url) {

   function bu() {
      return url.getServiceUrl(services.deploymentConfig).toString();
   }
   describe("the interface of ic-core/globalization/Routes", function() {
      var r;
      beforeEach(function() {
         r = new routes();
      });
      it("implements the expected methods", function() {
         expect(lang.isFunction(r.getHomeUrl)).toBeTruthy();
         expect(lang.isFunction(r.getPreferencesUrl)).toBeTruthy();
         expect(lang.isFunction(r.getPreferencesSettingsServiceUrl)).toBeTruthy();
         // expect(dojo.isFunction(r.getPreferencesFeedServiceUrl)).toBeTruthy();
         // expect(dojo.isFunction(r.getPreferencesServiceUrl)).toBeTruthy();
      });
   });
   describe("the methods of ic-core/globalization/Routes", function() {
      var r;
      beforeEach(function() {
         r = new routes();
      });
      it("return the expected values", function() {
         expect(r.getHomeUrl()).toBe(bu() + '/settings/globalization');
         expect(r.getPreferencesUrl()).toBe(bu() + '/settings/globalization');
         expect(r.getPreferencesUrl()).toBe(r.getHomeUrl());
         expect(r.getPreferencesSettingsServiceUrl()).toBe(bu() + '/settings/globalization/service');
      });
   });

});
