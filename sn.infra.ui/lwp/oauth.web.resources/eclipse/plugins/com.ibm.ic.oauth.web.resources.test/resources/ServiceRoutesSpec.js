/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "ic-core/proxy",
   "ic-core/config",
   "ic-core/config/services",
   "ic-core/url",
   "ic-oauth/ServiceRoutes"
], function (proxy, config, services, url, ServiceRoutes) {

   /**
    * Jasmine spec for OAuth service routes
    * @module ic-oauth-test.ServiceRoutesSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */

   describe("ServiceRoutes", function() {
      var CLIENT_ID = '4bf41689-05c0-4b01-8d65-6c6ef431d57a';
      var routes;
      beforeEach(function(){
         routes = new ServiceRoutes();
      });
      describe("prototype", function() {
         it('implements the expected methods', function() {
            expect(routes.getHomeUrl).toEqual(jasmine.any(Function));
            expect(routes.getApplicationAccessUrl).toEqual(jasmine.any(Function));
            expect(routes.getAuthzFeedServiceUrl).toEqual(jasmine.any(Function));
            expect(routes.getAuthzEntryServiceUrl).toEqual(jasmine.any(Function));
         });
         it('has the expected properties', function() {
            expect(routes.serviceName).toBeDefined();
         });
      });
      describe("the serviceName", function() {
         it('is oauth', function() {
            expect(routes.serviceName).toEqual("oauth");
         });
      });
      describe("the _providerBaseUri", function() {
         it('is not null when the oauthprovider service is defined', function() {
            expect(routes._providerBaseUri).toEqual(url.getServiceUrl(services.oauthprovider, true).toString());
         });
      });
      describe("the method getHomeUrl()", function() {
         it('returns the same value of ServiceRoutes.this.getApplicationAccessUrl()', function() {
            expect(routes.getHomeUrl()).toEqual(routes.getApplicationAccessUrl());
         });
      });
      describe("the method getApplicationAccessUrl()", function() {
         it('returns the expected URI', function() {
            expect(routes.getApplicationAccessUrl()).toEqual(routes._baseUri + '/apps');
         });
      });
      describe("the method getAuthzFeedServiceUrl()", function() {
         it('returns the expected authorization feed service URL', function() {
            expect(routes.getAuthzFeedServiceUrl()).toEqual(proxy(routes._providerBaseUri + "/authzMgmt/connectionsProvider"));
         });
      });
      describe("the method getAuthzEntryServiceUrl()", function() {
         it('returns the expected authorization entry service URL', function() {
            expect(routes.getAuthzEntryServiceUrl(CLIENT_ID)).toEqual(proxy(routes._providerBaseUri + "/authzMgmt/connectionsProvider/client/{clientid}".replace("{clientid}", CLIENT_ID)));
         });
      });
   });
});
