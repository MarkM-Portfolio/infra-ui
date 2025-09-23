/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/dom-construct",
      "ic-oauth/widget/ApplicationListGridRenderer"
], function(domConstruct, Renderer) {

   /**
    * Jasmine spec for ApplicationListGridRenderer widget
    * 
    * @module ic-oauth-test.widget.ApplicationListGridRendererSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the ApplicationListGridRenderer", function() {
      var renderer, ITEM = {
         createdAt : new Date().getTime(),
         expiresAt : new Date().getTime(),
         clientDisplayName : 'Test Client'
      };
      beforeEach(function() {
         renderer = new Renderer();
      });
      describe("prototype", function() {
         it('implements the expected methods', function() {
            expect(renderer.renderItem).toEqual(jasmine.any(Function));
         });
         it('has the expected properties', function() {
            expect(renderer.revokeAction).toBeDefined();
            expect(renderer.emptyClass).toBeDefined();
            expect(renderer.errorClass).toBeDefined();
            expect(renderer.loadingClass).toBeDefined();
            expect(renderer.loadingImgClass).toBeDefined();
         });
      });
      describe("renderItem() method", function() {
         it('doesn\'t throw when called without arguments', function() {
            expect(function() {
               renderer.renderItem();
            }).not.toThrow();
         });
         it('renders an item when called with arguments', function() {
            var el = domConstruct.create('div');
            renderer.renderItem(null, el, null, ITEM, 0, [ ITEM
            ]);
            expect(el.firstChild).not.toBeNull();
            expect(el.firstChild.tagName).toBe('TR');
            expect(el.firstChild.firstChild).not.toBeNull();
            expect(el.firstChild.firstChild.tagName).toBe('TD');
            expect(el.firstChild.firstChild.innerHTML).toBe(ITEM.clientDisplayName);
            expect(el.firstChild.lastChild.textContent).toBe('');
         });
         it('creates a link when revokeAction is not null', function() {
            var NAME = "<name>", TOOLTIP = "<tooltip>";
            renderer.revokeAction = {
               getName : function() {
                  return NAME;
               },
               getTooltip : function() {
                  return TOOLTIP;
               },
               execute : function() {
                  return;
               }
            };
            var el = domConstruct.create('div');
            renderer.renderItem(null, el, null, ITEM, 0, [ ITEM
            ]);
            expect(el.firstChild).not.toBeNull();
            expect(el.firstChild.tagName).toBe('TR');
            expect(el.firstChild.firstChild).not.toBeNull();
            expect(el.firstChild.firstChild.tagName).toBe('TD');
            expect(el.firstChild.firstChild.textContent).toBe(ITEM.clientDisplayName);
            expect(el.firstChild.lastChild.textContent).toBe(NAME);
         });
      });
   });
});
