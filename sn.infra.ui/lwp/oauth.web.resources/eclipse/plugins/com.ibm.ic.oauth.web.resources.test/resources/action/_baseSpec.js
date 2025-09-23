/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/topic",
      "ic-oauth/action/_base"
], function(topic, BaseAction) {

   /**
    * Jasmine spec for base action
    * 
    * @module ic-oauth-test.action._baseSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the base action", function() {
      var action;
      beforeEach(function() {
         action = new BaseAction();
      });
      describe("prototype", function() {
         it('implements the expected methods', function() {
            expect(action.execute).toEqual(jasmine.any(Function));
         });
      });
      describe("execute method", function() {
         var sub, issued;
         beforeEach(function() {
            issued = false;
            sub = topic.subscribe(BaseAction.TOPIC, function() {
               issued = true;
            });
         });
         afterEach(function() {
            sub.remove();
         });
         it('publishes the ic-oauth/action/completed topic', function() {
            expect(issued).toBeFalsy();
            action.execute();
            expect(issued).toBeTruthy();
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
