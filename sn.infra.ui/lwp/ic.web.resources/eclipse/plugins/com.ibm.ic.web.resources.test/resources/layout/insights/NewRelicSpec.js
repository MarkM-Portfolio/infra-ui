/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "ic-ui/layout/insights/tracker",
      "ic-ui/layout/insights/NewRelic",
      "dojo/has",
      "dojo/_base/lang",
      "dojo/_base/array"
], function(tracker, NewRelic, has, lang, array) {

   describe("the NewRelic insights plugin", function() {
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
         it("throws if registered twice", function() {
            NewRelic.register();
            expect(function() {
               NewRelic.register();
            }).toThrow();
         });
      });
      describe("the track method", function() {
         var EVT = "<event>", DATA = {
            foo : 'bar',
            baz : 1
         }, _newrelic;
         beforeEach(function() {
            this.gk = has('insights-new-relic');
            has.add('insights-new-relic', true, true, true);
            _newrelic = lang.getObject("window.newrelic");
            lang.setObject("window.newrelic", jasmine.createSpyObj('newrelic', [ 'addPageAction'
            ]));
         });
         afterEach(function() {
            lang.setObject("window.newrelic", _newrelic);
            has.add('insights-new-relic', this.gk, true, true);
         });
         it("calls the newrelic.addPageAction() API", function() {
            NewRelic.track(EVT, DATA);
            expect(window.newrelic.addPageAction).toHaveBeenCalledWith(EVT, DATA);
         });
      });
   });

});
