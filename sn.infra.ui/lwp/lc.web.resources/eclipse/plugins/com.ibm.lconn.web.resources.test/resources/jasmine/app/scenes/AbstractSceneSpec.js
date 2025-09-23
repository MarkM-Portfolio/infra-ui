/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Jasmine spec for AbstractScene.
 * <p>
 * This test suite covers the AbstractScene class.
 * 
 * @module lconn.test.jasmine.app.scenes.AbstractSceneSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide("lconn.test.jasmine.app.scenes.AbstractSceneSpec");

dojo.require("lconn.core.app.scenes.AbstractScene");
dojo.require("lconn.core.app.scenes");

(function(array, AbstractScene, declare, scenes) {

   var DummyScene = declare("lconn.test.jasmine.app.scenes.DummyScene", [ AbstractScene
   ], {
      renderMessage : function(m) {
         this._renderMessage(m);
      },
      clearMessages : function() {
         this._clearMessages();
      }
   });

   describe('the base AbstractScene class', function() {
      var METHODS = [
            'begin',
            'show',
            'end'
      ];
      var URL = 'https://www.example.com?a=1&b=c';
      var APP = {
         getUrl : function() {
            return URL;
         }
      };
      var MESSAGE = {
         info : true,
         message : 'This is an informational message'
      };
      var scene;
      beforeEach(function() {
         scene = new AbstractScene();
      });
      it('implements the expected methods', function() {
         array.forEach(METHODS, function(method) {
            expect(scene[method]).toEqual(jasmine.any(Function));
         });
      });
      it('the constructor reads the url params from the URL returned by app.getUrl()', function() {
         var scene_with_app = new AbstractScene(APP);
         expect(scene_with_app.app).toBe(APP);
         expect(scene_with_app.params).toEqual({
            a : '1',
            b : 'c'
         });
      });
      it('the begin method does absolutely nothing', function() {
         expect(function() {
            scene.begin();
         }).not.toThrow();
      });
      it('the show method does absolutely nothing', function() {
         expect(function() {
            scene.show();
         }).not.toThrow();
      });
      it('the end method does absolutely nothing', function() {
         expect(function() {
            scene.end();
         }).not.toThrow();
      });
      it('the renderMessage method renders a message', function() {
         var dummy_scene = new DummyScene(APP);
         spyOn(scenes, 'renderMessage');
         dummy_scene.renderMessage(MESSAGE);
         expect(scenes.renderMessage).toHaveBeenCalledWith(APP, MESSAGE);
      });
      it('the clearMessages method clears messages', function() {
         var dummy_scene = new DummyScene(APP);
         spyOn(scenes, 'clearMessages');
         dummy_scene.clearMessages();
         expect(scenes.clearMessages).toHaveBeenCalledWith(APP);
      });
   });

}(dojo, lconn.core.app.scenes.AbstractScene, dojo.declare, lconn.core.app.scenes));
