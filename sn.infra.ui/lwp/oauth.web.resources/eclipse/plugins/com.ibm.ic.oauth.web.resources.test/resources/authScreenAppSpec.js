/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-oauth/authScreenApp"
], function (AppClass) {

   /**
    * Jasmine spec for OAuth authorization screen application controller
    * @module ic-oauth-test.authScreenSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */

   describe("the interface of authScreenApp", function() {
      var app;
      beforeEach(function(){
         app = new AppClass();
      });
      afterEach(function(){
         delete window.pa;
      });
      it('implements the expected methods', function() {
         expect(app.resolveScene).toEqual(jasmine.any(Function));
         expect(app.getClientInfo).toEqual(jasmine.any(Function));
      });
      it('implements the expected properties', function() {
         expect(app.nls).toBeDefined();
      });
   });
});
