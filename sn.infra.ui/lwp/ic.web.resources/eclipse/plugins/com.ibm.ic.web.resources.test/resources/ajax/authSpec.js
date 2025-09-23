/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-core/ajax/auth"
], function(ajaxAuth) {

   /**
    * Jasmine spec suite for the AJAX authentication handler.
    * <p>
    * This test suite covers the ic-core/ajax/auth module.
    * 
    * @module ic-test.ajax.authSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */

   describe('the AJAX auth handler', function() {
      it('implements the expected methods', function() {
         expect(ajaxAuth.interceptDojoXhr).toEqual(jasmine.any(Function));
         expect(ajaxAuth.prepareSecure).toEqual(jasmine.any(Function));
         expect(ajaxAuth.setAuthenticationHandler).toEqual(jasmine.any(Function));
         expect(ajaxAuth.setDefaultAuthenticationTests).toEqual(jasmine.any(Function));
         expect(ajaxAuth.addAuthenticationCheck).toEqual(jasmine.any(Function));
         expect(ajaxAuth.setAuthenticationTest).toEqual(jasmine.any(Function));
         expect(ajaxAuth.isAuthenticationRequired).toEqual(jasmine.any(Function));
         expect(ajaxAuth.isPossibleLoginRedirect).toEqual(jasmine.any(Function));
         expect(ajaxAuth.testAuthenticationHandler).toEqual(jasmine.any(Function));
         expect(ajaxAuth.authenticationHandler).toEqual(jasmine.any(Function));
         expect(ajaxAuth.xhrIntercept).toEqual(jasmine.any(Function));
         expect(ajaxAuth.ioIntercept).toEqual(jasmine.any(Function));
         expect(ajaxAuth.isUrlSecure).toEqual(jasmine.any(Function));
      });
      it('has the expected properties', function() {
         expect(ajaxAuth.contentTypeRegex).toBeDefined();
         expect(ajaxAuth.ignoredDojoErrors).toBeDefined();
         expect(ajaxAuth.nonHtmlTypes).toBeDefined();
         expect(ajaxAuth.checkFromCaller).toBeDefined();
         expect(ajaxAuth.checkByContentType).toBeDefined();
         expect(ajaxAuth.checkByStatusCode).toBeDefined();
         expect(ajaxAuth.checkAllStatusCodes).toBeDefined();
         expect(ajaxAuth.checkByXLConnAuth).toBeDefined();
         expect(ajaxAuth.authenticationChecks).toBeDefined();
      });
      describe('the setAuthenticationHandler() method', function() {
         it('sets the authenticationHandler property', function() {
            var AUTH_HANDLER = function(){ console.log('Authentication handler.'); };
            ajaxAuth.setAuthenticationHandler(AUTH_HANDLER);
            expect(ajaxAuth.authenticationHandler).toBe(AUTH_HANDLER);
         });
      });
   });
});
