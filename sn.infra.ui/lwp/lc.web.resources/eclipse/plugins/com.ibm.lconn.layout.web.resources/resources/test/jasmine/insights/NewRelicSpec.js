/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("com.ibm.lconn.layout.test.jasmine.insights.NewRelicSpec");

dojo.require("com.ibm.lconn.layout.insights.tracker");
dojo.require("com.ibm.lconn.layout.insights.NewRelic");
dojo.require("ic-core/config/features");

(function(tracker, NewRelic, lang, array) {
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
         }, _newrelic, tempHas;
         beforeEach(function() {
            tempHas = define._modules["ic-core/config/features"];
            this.gk = tempHas('insights-new-relic');
            tempHas.add('insights-new-relic', true, true, true);
            _newrelic = lang.getObject("window.newrelic");
            lang.setObject("window.newrelic", jasmine.createSpyObj('newrelic', [ 'addPageAction'
            ]));
            
         });
         afterEach(function() {
            lang.setObject("window.newrelic", _newrelic);
            tempHas = define._modules["ic-core/config/features"];
            tempHas.add('insights-new-relic', this.gk, true, true);
         });
         it("calls the newrelic.addPageAction() API", function() {
            NewRelic.track(EVT, DATA);
            expect(window.newrelic.addPageAction).toHaveBeenCalledWith(EVT, DATA);
         });
      });
   });

}(com.ibm.lconn.layout.insights.tracker, com.ibm.lconn.layout.insights.NewRelic, dojo, dojo));
