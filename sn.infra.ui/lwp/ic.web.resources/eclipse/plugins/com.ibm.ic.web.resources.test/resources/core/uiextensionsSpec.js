/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for ic-core/uiextensions
 * @module ic-test.core.uiextensionsSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

define([
        "dojo/_base/lang",
        "dojo/Deferred",
        "ic-core/uiextensions"
        ], function(lang, Deferred, uiextensions) {

   describe("the interface of ic-core/uiextensions", function() {
      it("implements the expected methods", function() {
         expect(lang.isFunction(uiextensions.add)).toBeTruthy();
         expect(lang.isFunction(uiextensions.get)).toBeTruthy();
         expect(lang.isFunction(uiextensions.when)).toBeTruthy();
      });
   });

   describe("the method ic-core/uiextensions::when()", function() {
      var EVENT = "ic-test/core/uiextensions", TARGET = {foo: 'bar'};

      it("returns a deferred when called with one argument", function() {
         expect(uiextensions.when(EVENT) instanceof Deferred).toBeTruthy();
         expect(lang.isFunction(uiextensions.when(EVENT).then)).toBeTruthy();
      });

      it("invokes callbacks added by subscribers when called with two arguments", function(done) {
         uiextensions.when(EVENT).then(function(obj) {
            expect(obj).toBe(TARGET);
            done();
         });
         uiextensions.when(EVENT, TARGET);
      });

      it("invokes callbacks added by subscribers before the promise is fulfilled", function(done) {
         uiextensions.when(EVENT, TARGET);
         uiextensions.when(EVENT).then(function(obj) {
            expect(obj).toBe(TARGET);
            done();
         });
      });
   });
});
