/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "dojo/topic",
      "ic-oauth/action/_base",
      "ic-oauth/action/RevokeToken",
      "ic-ui/DialogUtil",
      "ic-test/mocks/DialogUtil",
      "ic-test/mocks/SyncXMLHttpRequest",
      "ic-test/utils/inject"
], function(lang, topic, BaseAction, RevokeTokenAction, DialogUtil, MockDialogUtil, MockXMLHttpRequest, inject) {

   /**
    * Jasmine spec for RevokeToken action
    * 
    * @module ic-oauth-test.action.RevokeTokenSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the RevokeToken action", function() {
      var action, _prompt, _create, response;
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
         action = new RevokeTokenAction();
      });
      describe("prototype", function() {
         it('implements the expected methods', function() {
            expect(action.execute).toEqual(jasmine.any(Function));
            expect(action.getTooltip).toEqual(jasmine.any(Function));
         });
      });
      describe("the constructor", function() {
         it('sets the nls from the app argument if available', function() {
            var NLS = {
               'foo' : 'bar'
            };
            expect(new RevokeTokenAction().nls).toEqual({});
            expect(new RevokeTokenAction({}).nls).toEqual({});
            expect(new RevokeTokenAction({
               nls : NLS
            }).nls).toEqual({});
            expect(new RevokeTokenAction({
               nls : {
                  revoke_token : NLS
               }
            }).nls).toBe(NLS);
         });
      });
      describe("the getTooltip() method", function() {
         it('replaces the name of the item in the tooltip NLS string', function() {
            var NLS = {
               'action_tooltip' : 'this is item ${0}'
            };
            var act = new RevokeTokenAction({
               nls : {
                  revoke_token : NLS
               }
            });
            expect(act.getTooltip({
               clientDisplayName : 'foo'
            })).toBe('this is item foo');
            expect(act.getTooltip({})).toBe('this is item ');
            expect(act.getTooltip()).toBe('this is item ');

            act = new RevokeTokenAction({});
            expect(act.getTooltip({
               clientDisplayName : 'foo'
            })).toBe('');
            expect(act.getTooltip({})).toBe('');
            expect(act.getTooltip()).toBe('');
         });
      });
      describe("execute method", function() {
         var sub, issued, base_sub, base_issued;
         beforeEach(function() {
            _prompt = DialogUtil.prompt;
            DialogUtil.prompt = lang.hitch(MockDialogUtil, MockDialogUtil.prompt);
            mockRequest(function() {
               return response;
            });
            base_issued = false;
            issued = false;
         });
         afterEach(function() {
            demockRequest();
            DialogUtil.prompt = _prompt;
            if (sub) {
               sub.remove();
            }
            if (base_sub) {
               base_sub.remove();
            }
         });

         it('prompts the user to confirm the action', function() {
            spyOn(DialogUtil, "prompt").and.callThrough();
            action.execute();
            expect(DialogUtil.prompt).toHaveBeenCalled();
         });
         it('publishes the ic-oauth/action/completed and ic-oauth/authorization/revoked topics when the user confirms', function(done) {
            base_sub = topic.subscribe(BaseAction.TOPIC, function() {
               base_issued = true;
               expect(base_issued).toBeTruthy();
               if (base_issued && issued) {
                  done();
               }
            });
            sub = topic.subscribe(RevokeTokenAction.TOPIC, function() {
               issued = true;
               expect(issued).toBeTruthy();
               if (base_issued && issued) {
                  done();
               }
            });
            expect(issued).toBeFalsy();
            expect(base_issued).toBeFalsy();
            action.execute();
            MockDialogUtil.submit();
         });
         it('publishes the ic-oauth/action/completed topic alone when the service returns an error', function(done) {
            base_sub = topic.subscribe(BaseAction.TOPIC, function() {
               base_issued = true;
               expect(base_issued).toBeTruthy();
               done();
            });
            sub = topic.subscribe(RevokeTokenAction.TOPIC, function() {
               issued = true;
               expect(issued).toBeFalsy();
               done();
            });
            expect(issued).toBeFalsy();
            expect(base_issued).toBeFalsy();
            action.execute();
            response = new Error();
            MockDialogUtil.submit();
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
