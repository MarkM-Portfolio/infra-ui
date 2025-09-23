/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/_base/kernel",
      "dojo/cookie",
      "ic-core/util/language",
      "ic-core/config/language"
], function(kernel, cookie, getLanguage, config) {

   var SCN_IT = "scn-it";
   var _config, _cookie;
   describe("the ic-core/util/language module", function() {

      beforeEach(function() {
         _config = config;
         _cookie = cookie(config.cookieName);
      });
      afterEach(function() {
         config = _config;
         cookie(config.cookieName, _cookie);
      });
      describe("the return value", function() {
         it("is a function", function() {
            expect(getLanguage).toEqual(jasmine.any(Function));
         });
      });

      describe("the function getLanguage()", function() {
         it("returns the dojo locale if the language settings are not enabled", function() {
            config.enabled = false;
            expect(getLanguage()).toBe(kernel.locale);
         });
         it("returns the value of the cookie if the language settings are enabled", function() {
            config.enabled = true;
            cookie(config.cookieName, SCN_IT);
            expect(getLanguage()).toBe(SCN_IT);
         });
      });
   });
});
