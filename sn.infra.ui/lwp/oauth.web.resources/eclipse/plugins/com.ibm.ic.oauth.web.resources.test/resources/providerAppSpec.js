/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-oauth/providerApp"
], function (AppClass) {

   /**
    * Jasmine spec for OAuth provider application controller
    * @module ic-oauth-test.providerAppSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */

   describe("the interface of providerApp", function() {
      var app;
      beforeEach(function(){
         app = new AppClass();
      });
      afterEach(function(){
         delete window.pa;
      });
      it('implements the expected methods', function() {
         expect(app.resolveScene).toEqual(jasmine.any(Function));
         expect(app.login).toEqual(jasmine.any(Function));
         expect(app.logout).toEqual(jasmine.any(Function));
      });
      it('implements the expected properties', function() {
         expect(app.nls).toBeDefined();
      });
   });
});
