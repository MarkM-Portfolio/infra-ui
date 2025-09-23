/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Jasmine spec for Connections Application toolkit scenes helper.
 * 
 * @module ic-test.app.scenesSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([
      'ic-core/app/scenes',
      'dojo/_base/array',
      'dojo/dom-construct',
      'dojo/query'
], function(scenes, array, domConstruct, query) {
   describe("the lconn.core.app.scenes object", function() {
      var APP = {
         scene : {
            messages : domConstruct.create('div')
         },
         nls : {}
      };

      var MESSAGES = [
            {
               info : true,
               message : 'Info'
            },
            {
               error : true,
               message : 'Error'
            },
            {
               warning : true,
               message : 'Warning'
            },
            {
               success : true,
               message : 'Success'
            }
      ];

      beforeEach(function() {
         scenes.clearMessages(APP);
      });

      it("implements the expected methods", function() {
         expect(scenes.applyConnectionsTemplate).toEqual(jasmine.any(Function));
         expect(scenes.applyLoginTemplate).toEqual(jasmine.any(Function));
         expect(scenes.applyTitleBar).toEqual(jasmine.any(Function));
         expect(scenes.applyTitleBarTabs).toEqual(jasmine.any(Function));
         expect(scenes.applyHeader).toEqual(jasmine.any(Function));
         expect(scenes.renderMessage).toEqual(jasmine.any(Function));
         expect(scenes.clearMessages).toEqual(jasmine.any(Function));
         expect(scenes.applyGenericWarning).toEqual(jasmine.any(Function));
         expect(scenes.applyGenericError).toEqual(jasmine.any(Function));
         expect(scenes.show).toEqual(jasmine.any(Function));
         expect(scenes.hide).toEqual(jasmine.any(Function));
      });

      function hasMessage(has, node, type) {
         expect(node.children).not.toBeNull();
         if (has) {
            expect(node.children.length).toBe(1);
            if (type) {
               var cls = '', imgCls = '.lotusIconMsgError';
               switch (type) {
                  case 'warning':
                     cls = '.lotusWarning';
                     imgCls = '.lotusIconMsgWarning';
                     break;
                  case 'success':
                     cls = '.lotusSuccess';
                     imgCls = '.lotusIconMsgSuccess';
                     break;
                  case 'info':
                     cls = '.lotusInfo';
                     imgCls = '.lotusIconMsgInfo';
                     break;
               }
               if (cls) {
                  expect(query(cls, node).length).not.toBe(0);
               }
               expect(query(imgCls, node).length).not.toBe(0);
            }
         }
         else {
            expect(node.children.length).toBe(0);
         }
      }

      array.forEach(MESSAGES, function(m) {
         it("the renderMessage method adds a message of type " + m.message, function() {
            scenes.renderMessage(APP, m);
            hasMessage(true, APP.scene.messages, m.message.toLowerCase());
         });
      });

      it("the clearMessages method removes all messages", function() {
         domConstruct.create('div', {}, APP.scene.messages);
         hasMessage(true, APP.scene.messages);
         scenes.clearMessages(APP);
         hasMessage(false, APP.scene.messages);
      });

      it("the applyGenericWarning method applies a generic warning - default app warning", function() {
         hasMessage(false, APP.scene.messages);
         scenes.applyGenericWarning(APP);
         hasMessage(true, APP.scene.messages, 'warning');
      });

      it("the applyGenericWarning method applies a generic warning - fallback warning", function() {
         expect(APP.scene.messages.children.length).toBe(0);
         APP.nls.warning = 'Achtung';
         scenes.applyGenericWarning(APP);
         hasMessage(true, APP.scene.messages, 'warning');
         delete APP.nls.warning;
      });

      it("the applyGenericWarning method applies a generic warning - special warning", function() {
         hasMessage(false, APP.scene.messages);
         scenes.applyGenericWarning(APP, 'Achtung');
         hasMessage(true, APP.scene.messages, 'warning');
      });

      it("the applyGenericError method applies a generic warning - default app warning", function() {
         expect(APP.scene.messages.children.length).toBe(0);
         scenes.applyGenericError(APP);
         hasMessage(true, APP.scene.messages, 'error');
      });

      it("the applyGenericError method applies a generic warning - fallback warning", function() {
         expect(APP.scene.messages.children.length).toBe(0);
         APP.nls.error = 'Fehler';
         scenes.applyGenericError(APP);
         hasMessage(true, APP.scene.messages, 'error');
         delete APP.nls.error;
      });

      it("the applyGenericError method applies a generic warning - special warning", function() {
         expect(APP.scene.messages.children.length).toBe(0);
         scenes.applyGenericError(APP, 'Fehler');
         hasMessage(true, APP.scene.messages, 'error');
      });
   });
});
