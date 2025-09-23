/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec suite for AbstractApp.
 * <p>
 * This test suite covers the AbstractApp class.
 * 
 * @module lconn.test.jasmine.app.AbstractAppSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide("lconn.test.jasmine.app.AbstractAppSpec");

dojo.require("lconn.core.app.AbstractApp");
dojo.require("lconn.core.help");
dojo.require("dojo.string");

(function(AbstractApp, array, string) {
   describe('the base AbstractApp class', function() {
      var app;
      beforeEach(function() {
         app = new AbstractApp();
      });
      it('implements the expected methods', function() {
         expect(app.initializeRoutes).toEqual(jasmine.any(Function));
         expect(app.start).toEqual(jasmine.any(Function));
         expect(app.reload).toEqual(jasmine.any(Function));
         expect(app.resolveScene).toEqual(jasmine.any(Function));
         expect(app.activateHelp).toEqual(jasmine.any(Function));
         expect(app.getUrl).toEqual(jasmine.any(Function));
         expect(app.onApplicationStart).toEqual(jasmine.any(Function));
      });
      it('reads URL params correctly', function() {
         expect(app.params).not.toBeNull();
         expect(app.params).toEqual(dojo.queryToObject(location.search.substring(1)));
      });
      it('correctly initializes routes', function() {
         expect(app.routes).not.toBeNull();
      });
      it('the getUrl() method returns the current location', function() {
         expect(app.getUrl()).toBe(window.location.href);
      });
      it('the activateHelp() method launches the help', function() {
         spyOn(lconn.core.help, 'launchHelp');
         app.activateHelp();
         expect(lconn.core.help.launchHelp).toHaveBeenCalled();

         var EVENT = {};
         spyOn(dojo, 'stopEvent');
         app.activateHelp(EVENT);
         expect(dojo.stopEvent).toHaveBeenCalledWith(EVENT);
      });
      it('the start() method throws if resolveScene() does not return a scene', function() {
         expect(function() {
            app.start();
         }).toThrow();
      });
      it('the start() method does not throw if resolveScene() returns a scene', function() {
         var SCENE = jasmine.createSpyObj('scene', [ 'begin'
         ]);
         app.resolveScene = function() {
            return SCENE;
         };
         spyOn(app, 'onApplicationStart');
         expect(function() {
            app.start();
         }).not.toThrow();
         expect(SCENE.begin).toHaveBeenCalled();
         expect(app.onApplicationStart).toHaveBeenCalled();
      });
      it('the start() method ends current scene if set', function() {
         var OLD_SCENE = app.scene = jasmine.createSpyObj('scene', [ 'end'
         ]);
         app.resolveScene = function() {
            return jasmine.createSpyObj('previous_scene', [ 'begin'
            ]);
         };
         expect(function() {
            app.start();
         }).not.toThrow();
         expect(OLD_SCENE.end).toHaveBeenCalled();
      });
      array.forEach([
            'start',
            'reload'
      ], function(method) {
         it(string.substitute('the ${0}() method throws if resolveScene() does not return a scene', [ method
         ]), function() {
            expect(function() {
               app[method]();
            }).toThrow();
         });
         it(string.substitute('the ${0}() method does not throw if resolveScene() returns a scene', [ method
         ]), function() {
            var SCENE = jasmine.createSpyObj('scene', [ 'begin'
            ]);
            app.resolveScene = function() {
               return SCENE;
            };
            spyOn(app, 'onApplicationStart');
            expect(function() {
               app[method]();
            }).not.toThrow();
            expect(SCENE.begin).toHaveBeenCalled();
            if (method === 'start') {
               expect(app.onApplicationStart).toHaveBeenCalled();
            }
         });
      });
   });

}(lconn.core.app.AbstractApp, dojo, dojo.string));
