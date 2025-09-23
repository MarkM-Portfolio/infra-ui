/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/lang",
   // Require the module(s) that this test module will cover. Ideally there should
   // be a 1:1 ratio between modules and test modules, but this can vary according
   // to complexity.
   "lconn/foo/bar"
], function (lang, bar) {

   /**
    * Template for Jasmine specs. Use as a starting point when writing new specs.
    * Do not require, or use as-is.
    * 
    * @namespace ic-test.templateSpec
    */

   // A global before callback. This will be executed before every describe() in
   // the test runner, even outside this spec. Use with caution.
   beforeEach(function() {
      return;
   });
   // A global after callback. This will be executed after every describe() in
   // the test runner, even outside this spec. Use with caution.
   afterEach(function() {
      return;
   });
   // A describe() used to test the compliance with an interface
   describe("the interface of lconn.foo.bar", function() {
      it("implements the expected methods", function() {
         // using dojo.isFunction
         expect(lang.isFunction(bar.baz)).toBeTruthy();
         // using jasmine.any
         expect(bar.baz).toEqual(jasmine.any(Function));
      });
   });
   // A describe() used to test a method
   describe("the method lconn.foo.bar.baz()", function() {
      // A local before callback. This will be executed before every it() spec
      // inside this describe()
      beforeEach(function() {
         return;
      });
      // A local after callback. This will be executed after every it() spec
      // inside this describe()
      afterEach(function() {
         return;
      });
      it("returns true", function() {
         expect(bar.baz()).toBeTruthy();
      });
   });
});
