/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.core.headerSpec");
dojo.require("lconn.core.header");
dojo.require("lconn.core.theme");

/**
 * Jasmine spec for lconn.core.header
 * 
 * @module lconn.test.jasmine.core.headerSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

(function(lang, array, domConstruct, header, theme) {

   describe("the interface of ic-core/header", function() {
      it("implements the expected methods", function() {
         var METHODS = [
               'initMenu',
               'menuFocus',
               'menuClick',
               'menuMouseover',
               'enableLanguageSelector',
               'decorateUser',
               'switchTheme'
         ];
         array.forEach(METHODS, function(method) {
            expect(header[method]).toEqual(jasmine.any(Function));
         });
      });
   });

   describe("the method switchTheme()", function() {
      it("is an alias to ic-core/theme::switchTheme()", function() {
         expect(header.switchTheme).toBe(theme.switchTheme);
      });
   });
   var INIT_MENU_TRIGGERS = [
         'menuClick',
         'menuFocus',
         'menuMouseover'
   ], INIT_MENU_TARGETS = {
      'menuClick' : 'onClick',
      'menuFocus' : 'onFocus',
      'menuMouseover' : 'onMouseEnter'
   };
   describe("the methods " + INIT_MENU_TRIGGERS.join('(), ') + "()", function() {
      var originalMethods = {};
      beforeEach(function() {
         // FIXME: this is unsafe and will break with Dojo2
         array.forEach(INIT_MENU_TRIGGERS, function(method) {
            originalMethods[method] = lconn.core.header.MenuLauncher.prototype[method];
         });
      });
      afterEach(function() {
         // FIXME: this is unsafe and will break with Dojo2
         array.forEach(INIT_MENU_TRIGGERS, function(method) {
            lconn.core.header.MenuLauncher.prototype[method] = originalMethods[method];
         });
      });
      it("call a related method on MenuLauncher after it's instantiated", function() {
         array.forEach(INIT_MENU_TRIGGERS, function(method) {
            var spy = lconn.core.header.MenuLauncher.prototype[INIT_MENU_TARGETS[method]] = jasmine.createSpy(method);
            // FIXME: if you call initMenu() again on another node that shares
            // the same parent node, an error is thrown
            header[method](domConstruct.create('a', {}, domConstruct.create('div')));
            expect(spy).toHaveBeenCalled();
         });
      });
   });
}(dojo, dojo, dojo, lconn.core.header, lconn.core.theme));
