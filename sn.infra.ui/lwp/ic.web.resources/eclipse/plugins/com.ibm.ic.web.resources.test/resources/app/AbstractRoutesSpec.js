/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2020                         */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */
define([
   "dojo/_base/array",
   "ic-core/app/AbstractRoutes",
   "ic-core/config/services",
   "ic-core/url"
], function (array, AbstractRoutes, servicesConfig, urlHelper) {

   /**
    * Jasmine spec suite for AbstractRoutes.
    * <p>
    * This test suite covers the AbstractRoutes class.
    *
    * @module ic-test.app.AbstractRoutesSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
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
         var DEFAULT_HELP_TOPIC = "/user/common/euframe.html";
         expect(routes.getHelpBookUrl()).toEqual(HELP_URL + DEFAULT_HELP_TOPIC);
         expect(routes.getHelpBookUrl("foo")).toEqual(HELP_URL + "/user/foo");

         delete servicesConfig.help;
         expect(routes.getHelpBookUrl()).toBeNull();
      });
   });
});
