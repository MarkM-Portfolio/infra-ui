/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/array",
      "ic-ui/layout/track",
      "ic-ui/layout/track/metrics"
], function(array, coreTracker, tracker) {

   describe("the metrics tracker", function() {
      var METHODS = [ 'read'
      ];
      it("implements the expected methods", function() {
         array.forEach(METHODS, function(method) {
            expect(tracker[method]).toEqual(jasmine.any(Function));
         });
      });
   });
});
