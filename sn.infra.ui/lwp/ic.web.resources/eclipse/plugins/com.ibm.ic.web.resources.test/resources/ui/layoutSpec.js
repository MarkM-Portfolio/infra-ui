/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "ic-ui/layout",
      "dojo/_base/lang",
      "dojo/dom-construct",
      "dojox/lang/functional/object"
], function(layout, lang, domConstruct, df) {

   /**
    * Jasmine spec for ic-ui.layout util
    * 
    * @module ic-test.layoutSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the ic-ui/layout util", function() {
      it("implements the expected methods", function() {
         expect(layout.applyBasicTemplate).toEqual(jasmine.any(Function));
         expect(layout.applyLoginTemplate).toEqual(jasmine.any(Function));
         expect(layout.applyTitleBarTabs).toEqual(jasmine.any(Function));
         expect(layout.applyTitle).toEqual(jasmine.any(Function));
         expect(layout.applyTitleBar).toEqual(jasmine.any(Function));
         expect(layout.applyHeader).toEqual(jasmine.any(Function));
         expect(layout.applySection).toEqual(jasmine.any(Function));
      });
   });
   describe("the layout.applyBasicTemplate method", function() {
      it("creates a basic Connections template", function() {
         var el = domConstruct.create('div');
         var nodes = {};
         layout.applyBasicTemplate(el, nodes);

         var NODES = {
            banner : {
               className : 'lotusBanner',
               role : 'banner'
            },
            titlebar : {
               className : 'lotusTitleBar'
            },
            main : {
               className : 'lotusMain'
            },
            content : {
               className : 'lotusContent',
               parent : 'main'
            },
            colLeft : {
               className : 'lotusColLeft',
               parent : 'main'
            },
            colRight : {
               className : 'lotusColRight',
               parent : 'main'
            },
            messages : {
               parent : 'content'
            },
            footer : {
               className : 'lotusFooter',
               role : 'footer'
            }
         };
         df.forIn(NODES, function(node, name) {
            expect(nodes[name]).toBeDefined();
            expect(nodes[name]).not.toBeNull();
            if (node.className) {
               expect(nodes[name].className).toBe(node.className);
            }
            if (node.role) {
               expect(nodes[name].getAttribute('role')).toBe(node.role);
            }
            expect(nodes[name].parentNode).toBe(node.parent ? nodes[node.parent] : el);
         });
      });
   });
   describe("the layout.applyLoginTemplate method", function() {
      var NODES = {
         banner : {
            id : 'lotusBanner',
            role : 'banner'
         },
         form : {
            className : 'lotusForm2 lotusLoginForm'
         }
      }, NODES_WIDE = lang.mixin(lang.clone(NODES), {
         description : {
            className : 'lotusLoginDescription',
            role : 'main'
         }
      });
      it("creates a compact Connections login template", function() {
         var el = domConstruct.create('div');
         var nodes = {};
         layout.applyLoginTemplate(el, nodes);

         df.forIn(NODES, function(node, name) {
            expect(nodes[name]).toBeDefined();
            expect(nodes[name]).not.toBeNull();
            if (node.id) {
               expect(nodes[name].id).toBe(node.id);
            }
            if (node.className) {
               expect(nodes[name].className).toBe(node.className);
            }
            if (node.role) {
               expect(nodes[name].getAttribute('role')).toBe(node.role);
            }
         });
      });
      it("creates a wide Connections login template", function() {
         var el = domConstruct.create('div');
         var nodes = {};
         layout.applyLoginTemplate(el, nodes, {
            wide : true
         });

         df.forIn(NODES_WIDE, function(node, name) {
            expect(nodes[name]).toBeDefined();
            expect(nodes[name]).not.toBeNull();
            if (node.id) {
               expect(nodes[name].id).toBe(node.id);
            }
            if (node.className) {
               expect(nodes[name].className).toBe(node.className);
            }
            if (node.role) {
               expect(nodes[name].getAttribute('role')).toBe(node.role);
            }
         });
      });
   });
});
