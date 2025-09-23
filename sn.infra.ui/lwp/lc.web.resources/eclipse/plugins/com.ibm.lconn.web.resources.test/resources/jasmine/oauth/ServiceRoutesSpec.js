/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.oauth.ServiceRoutesSpec");

dojo.require("lconn.oauth.ServiceRoutes");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.oneui.util.proxy");

/**
 * Jasmine spec for OAuth service routes
 * @module lconn.test.jasmine.oauth.ServiceRoutesSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(ServiceRoutes) {
   var CLIENT_ID = '4bf41689-05c0-4b01-8d65-6c6ef431d57a';
   var routes;
   beforeEach(function(){
      routes = new ServiceRoutes();
   });
   describe("the serviceName of ServiceRoutes", function() {
      it('is oauth', function() {
         expect(routes.serviceName).toEqual("oauth");
      });
   });
   describe("the _providerBaseUri of ServiceRoutes", function() {
      it('is not null when the oauthprovider service is defined', function() {
         expect(routes._providerBaseUri).toEqual(lconn.core.url.getServiceUrl(lconn.core.config.services.oauthprovider, true).toString());
      });
   });
   describe("the method ServiceRoutes.getHomeUrl()", function() {
      it('returns the same value of ServiceRoutes.this.getApplicationAccessUrl()', function() {
         expect(routes.getHomeUrl()).toEqual(routes.getApplicationAccessUrl());
      });
   });
   describe("the method ServiceRoutes.getApplicationAccessUrl()", function() {
      it('returns the expected URI', function() {
         expect(routes.getApplicationAccessUrl()).toEqual(routes._baseUri + '/apps');
      });
   });
   describe("the method ServiceRoutes.getAuthzFeedServiceUrl()", function() {
      it('returns the expected authorization feed service URL', function() {
         expect(routes.getAuthzFeedServiceUrl()).toEqual(com.ibm.oneui.util.proxy(routes._providerBaseUri + "/authzMgmt/connectionsProvider"));
      });
   });
   describe("the method ServiceRoutes.getAuthzEntryServiceUrl()", function() {
      it('returns the expected authorization entry service URL', function() {
         expect(routes.getAuthzEntryServiceUrl(CLIENT_ID)).toEqual(com.ibm.oneui.util.proxy(routes._providerBaseUri + "/authzMgmt/connectionsProvider/client/{clientid}".replace("{clientid}", CLIENT_ID)));
      });
   });
}(lconn.oauth.ServiceRoutes));
