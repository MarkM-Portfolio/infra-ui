/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/array",
      "ic-ui/layout/track"
], function(array, tracker) {

   describe("the core tracker", function() {
      var METHODS = [
            'postToTracker',
            'read'
      ];
      it("implements the expected methods", function() {
         array.forEach(METHODS, function(method) {
            expect(tracker[method]).toEqual(jasmine.any(Function));
         });
      });
   });
});
