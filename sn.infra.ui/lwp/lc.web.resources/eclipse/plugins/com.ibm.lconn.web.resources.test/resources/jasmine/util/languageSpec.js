/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.util.languageSpec");

dojo.require("lconn.core.util.language");
dojo.require("lconn.core.config.language");
dojo.require("dojo.cookie");

(function(getLanguage, config) {

   var SCN_IT = "scn-it";
   var _languageConfig, _cookie;
   beforeEach(function(){
      _languageConfig = config.language;
      _cookie = dojo.cookie(config.language.cookieName);
   });
   afterEach(function(){
      config.language = _languageConfig;
      dojo.cookie(config.language.cookieName, _cookie);
   });
   describe("lconn.core.util.getLanguage", function() {
      it("is a function", function() {
         expect(getLanguage).toEqual(jasmine.any(Function));
      });
   });

   describe("the function lconn.core.util.getLanguage()", function() {
      it("returns the dojo.locale if the language settings are not enabled", function() {
         config.language.enabled = false;
         expect(getLanguage()).toBe(dojo.locale);
      });
      it("returns the value of the cookie if the language settings are enabled", function() {
         config.language.enabled = true;
         dojo.cookie(config.language.cookieName, SCN_IT);
         expect(getLanguage()).toBe(SCN_IT);
      });
   });

}(lconn.core.util.getLanguage, lconn.core.config));
