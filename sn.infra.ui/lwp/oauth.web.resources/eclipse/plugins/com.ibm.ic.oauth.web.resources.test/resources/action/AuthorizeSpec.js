/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/topic",
      "ic-oauth/action/_base",
      "ic-oauth/action/Authorize"
], function(topic, BaseAction, AuthorizeAction) {

   /**
    * Jasmine spec for Authorize action
    * 
    * @module ic-oauth-test.action.AuthorizeSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the Authorize action", function() {
      var action;
      beforeEach(function() {
         action = new AuthorizeAction();
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
            expect(new AuthorizeAction().nls).toEqual({});
            expect(new AuthorizeAction({}).nls).toEqual({});
            expect(new AuthorizeAction({
               nls : NLS
            }).nls).toEqual({});
            expect(new AuthorizeAction({
               nls : {
                  authorize : NLS
               }
            }).nls).toBe(NLS);
         });
      });
      describe("the getTooltip() method", function() {
         it('replaces the name of the item in the tooltip NLS string', function() {
            var NLS = {
               'action_tooltip' : 'this is item ${0}'
            };
            var act = new AuthorizeAction({
               nls : {
                  authorize : NLS
               }
            });
            expect(act.getTooltip({
               getName : function() {
                  return 'foo';
               }
            })).toBe('this is item foo');
            expect(act.getTooltip({})).toBe('this is item ');
            expect(act.getTooltip()).toBe('this is item ');

            act = new AuthorizeAction({});
            expect(act.getTooltip({
               getName : function() {
                  return 'foo';
               }
            })).toBe('');
            expect(act.getTooltip({})).toBe('');
            expect(act.getTooltip()).toBe('');
         });
      });
      describe("execute method", function() {
         var sub, issued, base_sub, base_issued;
         beforeEach(function() {
            base_issued = false;
            base_sub = topic.subscribe(BaseAction.TOPIC, function() {
               base_issued = true;
            });
            issued = false;
            sub = topic.subscribe(AuthorizeAction.TOPIC, function() {
               issued = true;
            });
         });
         afterEach(function() {
            sub.remove();
            base_sub.remove();
         });
         it('publishes the ic-oauth/action/completed and ic-oauth/application/authorized topics', function() {
            expect(issued).toBeFalsy();
            expect(base_issued).toBeFalsy();
            action.execute();
            expect(issued).toBeTruthy();
            expect(base_issued).toBeTruthy();
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
