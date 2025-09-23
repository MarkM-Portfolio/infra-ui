/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Jasmine spec for ic-core.config.htmlClass.
 * 
 * @namespace ic-test.core.htmlClassSpec
 */
define([
      "dojo/_base/lang",
      "ic-core/config/htmlClass"
], function(lang, htmlClass) {

   describe("the interface of ic-core/config/htmlClass", function() {
      it("implements the expected methods", function() {
         expect(htmlClass.get).toEqual(jasmine.any(Function));
      });
   });
   describe("the method ic-core/config/htmlClass::get()", function() {
      var _gatekeeperConfig;
      beforeEach(function() {
         _gatekeeperConfig = window.gatekeeperConfig;
         window.gatekeeperConfig = {};
      });
      afterEach(function() {
         window.gatekeeperConfig = _gatekeeperConfig;
      });
      it("returns an empty string when there are no enabled feature flags", function() {
         lang.setObject('gatekeeperConfig', {});
         expect(htmlClass.get()).toEqual("");
      });
      it("returns a string with enabled feature flag names", function() {
         lang.setObject('gatekeeperConfig', {
            "foo-bar" : true,
            "bar-baz" : false,
            "baz-zip" : true,
            "zip-foo" : true
         });
         expect(htmlClass.get()).not.toEqual("");
         expect(htmlClass.get().split(" ").sort().join(" ")).toEqual("baz-zip foo-bar zip-foo");
      });
   });
   // Pass the object(s) under test as arguments, AMD callback style
});
