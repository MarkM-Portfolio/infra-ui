/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("com.ibm.lconn.layout.test.jasmine.track.metricsSpec");

dojo.require("com.ibm.lconn.layout.track.metrics");

(function(tracker, array) {
   describe("the metrics tracker", function() {
      var METHODS = [ 'read'
      ];
      it("implements the expected methods", function() {
         array.forEach(METHODS, function(method) {
            expect(tracker[method]).toEqual(jasmine.any(Function));
         });
      });
   });

}(com.ibm.lconn.layout.track.metrics, dojo));
