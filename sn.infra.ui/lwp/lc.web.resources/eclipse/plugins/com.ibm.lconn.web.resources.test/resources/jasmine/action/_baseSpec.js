/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec suite for the base action class.
 * <p>
 * This test suite covers the lconn.core.action._base class.
 * 
 * @module lconn.test.jasmine.action._baseSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide("lconn.test.jasmine.action._baseSpec");

dojo.require("lconn.core.action._base");

(function(_base) {
   describe('the base action class', function() {
      var action, sub, nls = {
         action_tooltip : 'TOOLTIP',
         action : 'ACTION'
      };
      beforeEach(function() {
         action = new _base();
         action.nls = nls;
      });
      afterEach(function() {
         dojo.unsubscribe(sub);
      });
      it('implements the expected methods', function() {
         expect(action.isValid).toEqual(jasmine.any(Function));
         expect(action.getName).toEqual(jasmine.any(Function));
         expect(action.getTooltip).toEqual(jasmine.any(Function));
         expect(action.execute).toEqual(jasmine.any(Function));
      });
      it('emits a topic when the execute() method is invoked', function() {
         var emitted = false;
         sub = dojo.subscribe("lconn/core/action/completed", function() {
            emitted = true;
         });
         action.execute();
         expect(emitted).toBeTruthy();
      });
      it('stops the event when the execute() method is invoked', function() {
         var evt = jasmine.createSpyObj('event', [
               'stopPropagation',
               'preventDefault'
         ]);
         action.execute(undefined, undefined, evt);
         expect(evt.stopPropagation).toHaveBeenCalled();
         expect(evt.preventDefault).toHaveBeenCalled();
      });
      it('correctly returns its tooltip', function() {
         expect(action.getTooltip()).toBe(nls.action_tooltip);
      });
      it('correctly returns its name', function() {
         expect(action.getName()).toBe(nls.action);
      });
      it('correctly returns its validity', function() {
         expect(action.isValid()).toBeTruthy();
      });
   });

}(lconn.core.action._base));
