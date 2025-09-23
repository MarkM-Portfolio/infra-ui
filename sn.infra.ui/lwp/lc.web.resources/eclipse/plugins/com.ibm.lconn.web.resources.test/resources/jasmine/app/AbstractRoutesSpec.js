/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec suite for AbstractRoutes.
 * <p>
 * This test suite covers the AbstractRoutes class.
 * 
 * @module lconn.test.jasmine.app.AbstractRoutesSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide("lconn.test.jasmine.app.AbstractRoutesSpec");

dojo.require("lconn.core.app.AbstractRoutes");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");

(function (array, AbstractRoutes, servicesConfig, urlHelper) {
   describe('the base AbstractRoutes class', function() {
      var METHODS = ['getHomeUrl', 'getLoginUrl', 'getLogoutUrl', 'getHelpBookUrl'],
         BASE_URL = urlHelper.getServiceUrl(servicesConfig.deploymentConfig).toString(),
         HELP_URL = urlHelper.getServiceUrl(servicesConfig.help).toString();
      var routes, _helpServicesConfig;
      beforeEach(function() {
         _helpServicesConfig = servicesConfig.help;
         routes = new AbstractRoutes();
      });
      afterEach(function() {
         servicesConfig.help = _helpServicesConfig;
      });
      it('implements the expected methods', function() {
         array.forEach(METHODS, function(method) {
            expect(routes[method]).toEqual(jasmine.any(Function));
         });
      });
      it('the getHomeUrl method returns the base URL', function() {
         expect(routes.getHomeUrl()).toEqual(BASE_URL);
      });
      it('the getLoginUrl method returns the login URL with optional redirect param', function() {
         var LOGIN_URI_PART = "/login_redirect";
         expect(routes.getLoginUrl()).toEqual(BASE_URL + LOGIN_URI_PART);
         expect(routes.getLoginUrl("foo")).toEqual(BASE_URL + LOGIN_URI_PART + "?redirect=foo");
      });
      it('the getLogoutUrl method returns the logout URL', function() {
         var LOGOUT_URI_PART = "/ibm_security_logout";
         expect(routes.getLogoutUrl()).toEqual(BASE_URL + LOGOUT_URI_PART);
      });
      it('the getHelpBookUrl method returns the help topic URL', function() {
         var DEFAULT_HELP_TOPIC = "/topic/com.ibm.lotus.connections.common.help/euframe.html";
         expect(routes.getHelpBookUrl()).toEqual(HELP_URL + DEFAULT_HELP_TOPIC);
         expect(routes.getHelpBookUrl("foo")).toEqual(HELP_URL + "/topic/foo");

         delete servicesConfig.help;
         expect(routes.getHelpBookUrl()).toBeNull();
      });
   });

}(dojo, lconn.core.app.AbstractRoutes, lconn.core.config.services, lconn.core.url));
