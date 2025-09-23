/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

/**
 * Jasmine spec for ic-core.theme
 * 
 * @module ic-test.core.themeSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-construct",
      "ic-core/theme",
      "ic-core/themeSmartCloud",
      "ic-core/config/features"
], function(array, dom, domConstruct, theme, themeSmartCloud, has) {

   var LOTUS_BASE_STYLESHEET = "lotusBaseStylesheet", LOTUS_THEME_STYLESHEET = "lotusThemeStylesheet", LOTUS_SPRITES_STYLESHEET = "lotusSpritesStylesheet";
   function ensure() {
      array.forEach([
            LOTUS_BASE_STYLESHEET,
            LOTUS_THEME_STYLESHEET,
            LOTUS_SPRITES_STYLESHEET
      ], function(id) {
         if (!dom.byId(id)) {
            domConstruct.create("link", {
               "id" : id,
               "href" : ""
            }, document.body);
         }
      });
   }

   var FLAG = 'hikari-default-theme';
   var _has;
   function mockHas() {
      _has = has(FLAG);
      has.add(FLAG, true, null, true);
   }
   function demockHas() {
      has.add(FLAG, _has, null, true);
   }

   describe("the interface of ic-core/theme", function() {
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

   describe("the ic-core/theme::switchTheme() method", function() {
      var currentThemeId;
      beforeEach(function() {
         ensure();
         currentThemeId = theme.getCurrentThemeId();
      });
      afterEach(function() {
         theme.switchTheme(currentThemeId);
         demockHas();
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
         mockHas();
         theme.switchTheme('default');
         expect(theme.getCurrentThemeId()).toBe('hikari');
      });
   });
   
   describe("the interface of ic-core/themeSmartCloud", function() {
      it("implements the expected methods", function() {
         expect(themeSmartCloud.getThemeIdForOrg).toEqual(jasmine.any(Function));
      });
   });

});
