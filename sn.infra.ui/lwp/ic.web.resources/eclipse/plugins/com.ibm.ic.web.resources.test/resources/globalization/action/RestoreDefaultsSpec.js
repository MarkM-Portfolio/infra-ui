/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/topic",
      "ic-core/globalization/action/RestoreDefaults",
      "ic-test/mocks/SyncXMLHttpRequest",
      "ic-test/utils/inject"
], function(topic, RestoreDefaults, MockXMLHttpRequest, inject) {
   describe("the RestoreDefaults action", function() {
      var action, _create, response;
      function mockRequest(fn) {
         var request = inject("dojo/request/xhr");
         _create = request._create;
         request._create = function() {
            return new MockXMLHttpRequest(fn);
         };
      }
      function demockRequest() {
         var request = inject("dojo/request/xhr");
         request._create = _create;
      }
      beforeEach(function() {
         action = new RestoreDefaults();
      });
      it("implements the expected methods", function() {
         expect(action.execute).toEqual(jasmine.any(Function));
      });
      describe("the constructor", function() {
         it('sets the nls from the app argument if available', function() {
            var NLS = {
               'foo' : 'bar'
            };
            expect(new RestoreDefaults().nls).toEqual({});
            expect(new RestoreDefaults({}).nls).toEqual({});
            expect(new RestoreDefaults({
               nls : NLS
            }).nls).toEqual({});
            expect(new RestoreDefaults({
               nls : {
                  restore_defaults : NLS
               }
            }).nls).toBe(NLS);
         });
      });
      describe("the getTooltip() method", function() {
         it('replaces the name of the item in the tooltip NLS string', function() {
            var TOOLTIP_STR = 'the item argument is ignored';
            var NLS = {
               'action_tooltip' : TOOLTIP_STR
            };
            var act = new RestoreDefaults({
               nls : {
                  restore_defaults : NLS
               }
            });
            expect(act.getTooltip()).toBe(TOOLTIP_STR);
            expect(act.getTooltip({})).toBe(TOOLTIP_STR);

            act = new RestoreDefaults({});
            expect(act.getTooltip()).toBe('');
            expect(act.getTooltip({})).toBe('');
         });
      });
      describe("the execute method", function() {
         var sub, issued, base_sub, base_issued;
         beforeEach(function() {
            mockRequest(function() {
               return response;
            });
            base_issued = false;
            issued = false;
         });
         afterEach(function() {
            demockRequest();
            if (sub) {
               sub.remove();
            }
            if (base_sub) {
               base_sub.remove();
            }
         });
         it('publishes the ic-core/action/completed and ic-core/globalization/restored topics', function(done) {
            base_sub = topic.subscribe("ic-core/action/completed", function() {
               base_issued = true;
               expect(base_issued).toBeTruthy();
               if (base_issued && issued) {
                  done();
               }
            });
            sub = topic.subscribe("ic-core/globalization/restored", function() {
               issued = true;
               expect(issued).toBeTruthy();
               if (base_issued && issued) {
                  done();
               }
            });
            expect(issued).toBeFalsy();
            expect(base_issued).toBeFalsy();
            action.execute();
         });
         it('publishes the ic-oauth/action/completed topic alone when the service returns an error', function(done) {
            base_sub = topic.subscribe("ic-core/action/completed", function() {
               base_issued = true;
               expect(base_issued).toBeTruthy();
               done();
            });
            sub = topic.subscribe("ic-core/globalization/restored", function() {
               issued = true;
               expect(issued).toBeFalsy();
               done();
            });
            expect(issued).toBeFalsy();
            expect(base_issued).toBeFalsy();
            response = new Error();
            action.execute();
         });
         it('stops the event', function() {
            var evt = jasmine.createSpyObj('event', [
                  'preventDefault',
                  'stopPropagation'
            ]);
            action.execute(null, null, evt);
            expect(evt.preventDefault).toHaveBeenCalled();
            expect(evt.stopPropagation).toHaveBeenCalled();
         });
      });
   });
});
