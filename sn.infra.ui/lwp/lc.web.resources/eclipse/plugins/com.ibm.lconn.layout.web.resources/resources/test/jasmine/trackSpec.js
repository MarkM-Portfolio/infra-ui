/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("com.ibm.lconn.layout.test.jasmine.trackSpec");

dojo.require("com.ibm.lconn.layout.track");

(function(tracker, array) {
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

}(com.ibm.lconn.layout.track, dojo));
