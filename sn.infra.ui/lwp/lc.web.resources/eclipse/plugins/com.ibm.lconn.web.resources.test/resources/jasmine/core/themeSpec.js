/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Jasmine spec for lconn.core.theme
 * 
 * @module lconn.test.jasmine.core.themeSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide("lconn.test.jasmine.core.themeSpec");
dojo.require("lconn.core.theme");
(function(theme) {

   var LOTUS_BASE_STYLESHEET = "lotusBaseStylesheet", LOTUS_THEME_STYLESHEET = "lotusThemeStylesheet", LOTUS_SPRITES_STYLESHEET = "lotusSpritesStylesheet";
   function ensure() {
      dojo.forEach([
            LOTUS_BASE_STYLESHEET,
            LOTUS_THEME_STYLESHEET,
            LOTUS_SPRITES_STYLESHEET
      ], function(id) {
         if (!dojo.byId(id)) {
            dojo.create("link", {
               "id" : id,
               "href" : ""
            }, document.body);
         }
      });
   }

   function mockFeatures() {
      lconn.core.config.features = function(arg) {
         if (arg === 'hikari-default-theme') {
            return true;
         }
         return _features(arg);
      };
   }

   describe("the interface of lconn.core.theme", function() {
      it("implements the expected methods", function() {
         expect(theme.addBaseStylesheet).toEqual(jasmine.any(Function));
         expect(theme.addThemeStylesheet).toEqual(jasmine.any(Function));
         expect(theme.addAppStylesheet).toEqual(jasmine.any(Function));
         expect(theme.addStylesheet).toEqual(jasmine.any(Function));
         expect(theme.addAllStylesheets).toEqual(jasmine.any(Function));
         expect(theme.getUrl).toEqual(jasmine.any(Function));
         expect(theme.switchTheme).toEqual(jasmine.any(Function));
      });
   });

   describe("the lconn.core.theme.switchTheme() method", function() {
      var currentThemeId, _features;
      beforeEach(function() {
         ensure();
         currentThemeId = theme.getCurrentThemeId();
         _features = lconn.core.config.features;
      });
      afterEach(function() {
         lconn.core.config.features = _features;
         theme.switchTheme(currentThemeId);
      });
      it("changes the theme stylesheet on the page", function() {
         theme.switchTheme('red');
         expect(theme.getCurrentThemeId()).toBe('red');
         theme.switchTheme('onyx');
         expect(theme.getCurrentThemeId()).toBe('onyx');
         theme.switchTheme('gen4');
         expect(theme.getCurrentThemeId()).toBe('gen4');
         theme.switchTheme('hikari');
         expect(theme.getCurrentThemeId()).toBe('hikari');
      });
      it("sets the gen4 theme as default", function() {
         theme.switchTheme('default');
         expect(theme.getCurrentThemeId()).toBe('gen4');
      });
      it("sets the hikari theme as default when gatekeeper flag hikari-default-theme is set", function() {
         mockFeatures();
         theme.switchTheme('default');
         expect(theme.getCurrentThemeId()).toBe('hikari');
      });
   });
}(lconn.core.theme));
