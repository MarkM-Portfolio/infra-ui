/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec suite for _DeclarativeLayoutMixin.
 * <p>
 * This test suite covers the _DeclarativeLayoutMixin class.
 * 
 * @module lconn.test.jasmine.app._DeclarativeLayoutMixinSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide("lconn.test.jasmine.app._DeclarativeLayoutMixinSpec");

dojo.require("lconn.core.app._DeclarativeLayoutMixin");

(function(declare, array, lang, domConstruct, DeclarativeLayoutMixin) {

   var PROPS = [
         'left',
         'right',
         'center'
   ], MAP = {
      'left' : 'colLeft',
      'right' : 'colRight',
      'center' : 'content'
   };
   function el(parent, prop) {
      switch (prop) {
         case 'left':
         case 'right':
            return parent.columns[prop];
         case 'center':
            return parent.content;
      }
   }

   var DeclarativeLayout = declare("lconn.test.jasmine.app.DeclarativeLayout", DeclarativeLayoutMixin, {
      scene : {
         colLeft : domConstruct.create('div'),
         colRight : domConstruct.create('div'),
         content : domConstruct.create('div')
      },
      constructor : function() {
         this.decorate(this.scene);
      },
      get : function(prop) {
         return this.scene[MAP[prop]].childNodes;
      },
      clear : function() {
         array.forEach(PROPS, lang.hitch(this, function(prop) {
            while (this.scene[MAP[prop]].childNodes[0]) {
               this.scene[MAP[prop]].removeChild(this.scene[MAP[prop]].childNodes[0]);
            }
         }));
      }
   });

   describe('the _DeclarativeLayoutMixin mixin', function() {

      var layout;
      beforeEach(function() {
         layout = new DeclarativeLayout();
      });
      afterEach(function() {
         layout.clear();
      });

      describe('the interface', function() {
         it('implements the expected methods', function() {
            expect(layout.decorate).toEqual(jasmine.any(Function));
            expect(layout.scene.page.columns.left.add).toEqual(jasmine.any(Function));
            expect(layout.scene.page.columns.right.add).toEqual(jasmine.any(Function));
            expect(layout.scene.page.content.add).toEqual(jasmine.any(Function));
         });
         it('implements the expected properties', function() {
            expect(layout.scene.page).not.toBeUndefined();
            expect(layout.scene.page.columns).not.toBeUndefined();
            expect(layout.scene.page.columns.left).not.toBeUndefined();
            expect(layout.scene.page.columns.right).not.toBeUndefined();
            expect(layout.scene.page.content).not.toBeUndefined();
         });
      });

      describe('the _DeclarativeLayoutMixin.add() methods', function() {
         array.forEach(PROPS, function(prop) {
            it('correctly adds a node to the ' + prop + ' column', function() {
               var node = domConstruct.create('span');
               el(layout.scene.page, prop).add(node);
               expect(layout.get(prop)[0]).toBe(node);
               layout.clear();
            });

            it('correctly adds an array of nodes to the ' + prop + ' column', function() {
               var nodes = [
                     domConstruct.create('span'),
                     domConstruct.create('span')
               ];
               el(layout.scene.page, prop).add(nodes);
               array.forEach(layout.get(prop), function(node, i) {
                  expect(node).toBe(nodes[i]);
               });
               layout.clear();
            });
         });
      });
   });

}(dojo.declare, dojo, dojo, dojo, lconn.core.app._DeclarativeLayoutMixin));
