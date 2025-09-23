/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for core/uiextensions
 * @module lconn.test.jasmine.core.uiextensionsSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide("lconn.test.jasmine.core.uiextensionsSpec");

dojo.require("dojo.Deferred");
dojo.require("lconn.core.uiextensions");

(function(Deferred, uiextensions) {

   describe("the interface of lconn.core.uiextensions", function() {
      it("implements the expected methods", function() {
         expect(dojo.isFunction(uiextensions.add)).toBeTruthy();
         expect(dojo.isFunction(uiextensions.get)).toBeTruthy();
         expect(dojo.isFunction(uiextensions.when)).toBeTruthy();
      });
   });

   describe("the method lconn.core.uiextensions.when()", function() {
      var EVENT = "lconn/test/jasmine/core/uiextensions", TARGET = {foo: 'bar'};

      it("returns a deferred when called with one argument", function() {
         expect(uiextensions.when(EVENT) instanceof Deferred).toBeTruthy();
         expect(dojo.isFunction(uiextensions.when(EVENT).then)).toBeTruthy();
      });

      it("invokes callbacks added by subscribers when called with two arguments (then)", function(done) {
         uiextensions.when(EVENT).then(function(obj) {
            expect(obj).toBe(TARGET);
            done();
         });
         uiextensions.when(EVENT, TARGET);
      });

      it("invokes callbacks added by subscribers before the promise is fulfilled (then)", function(done) {
         uiextensions.when(EVENT, TARGET);
         uiextensions.when(EVENT).then(function(obj) {
            expect(obj).toBe(TARGET);
            done();
         });
      });

      it("invokes callbacks added by subscribers when called with two arguments (addCallback)", function(done) {
         uiextensions.when(EVENT).addCallback(function(obj) {
            expect(obj).toBe(TARGET);
            done();
         });
         uiextensions.when(EVENT, TARGET);
      });

      it("invokes callbacks added by subscribers before the promise is fulfilled (addCallback)", function(done) {
         uiextensions.when(EVENT, TARGET);
         uiextensions.when(EVENT).addCallback(function(obj) {
            expect(obj).toBe(TARGET);
            done();
         });
      });
   });

}(dojo.Deferred, lconn.core.uiextensions));
