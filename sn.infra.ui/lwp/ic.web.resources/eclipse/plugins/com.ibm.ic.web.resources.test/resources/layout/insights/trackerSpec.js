/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "ic-ui/layout/insights/tracker",
      "dojo/_base/array"
], function(tracker, array) {
   describe("the insights tracker", function() {
      var METHODS = [
            'track',
            'register'
      ];
      it("implements the expected methods", function() {
         array.forEach(METHODS, function(method) {
            expect(tracker[method]).toEqual(jasmine.any(Function));
         });
      });
      describe("the register method", function() {
         beforeEach(function() {
            tracker._reset();
         });
         it("throws if registering the same plugin twice", function() {
            var NOOP = function() {
               return;
            };
            tracker.register("foo", NOOP);
            expect(function() {
               tracker.register("foo", NOOP);
            }).toThrow();
         });
      });
      describe("the track method", function() {
         var EVT = "<event>", DATA = {
            foo : 'bar',
            baz : 1
         };
         beforeEach(function() {
            tracker._reset();
         });
         it("calls the plugin's callback if only one registered", function() {
            var cb = jasmine.createSpy('callback');
            tracker.register("foo", cb);
            tracker.track(EVT, DATA);
            expect(cb).toHaveBeenCalledWith(EVT, DATA);
         });
         it("calls each plugin's callback if more than one registered", function() {
            var cb1 = jasmine.createSpy('callback1'), cb2 = jasmine.createSpy('callback2');
            tracker.register("foo", cb1);
            tracker.register("bar", cb2);
            tracker.track(EVT, DATA);
            expect(cb1).toHaveBeenCalledWith(EVT, DATA);
            expect(cb2).toHaveBeenCalledWith(EVT, DATA);
         });
      });
   });

});
