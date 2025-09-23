/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("com.ibm.lconn.layout.test.jasmine.track.wikisSpec");

dojo.require("com.ibm.lconn.layout.track.wikis");

(function(tracker, array) {
   describe("the wikis tracker", function() {
      var METHODS = [];
      it("implements the expected methods", function() {
         array.forEach(METHODS, function(method) {
            expect(tracker[method]).toEqual(jasmine.any(Function));
         });
      });
   });

}(com.ibm.lconn.layout.track.wikis, dojo));
