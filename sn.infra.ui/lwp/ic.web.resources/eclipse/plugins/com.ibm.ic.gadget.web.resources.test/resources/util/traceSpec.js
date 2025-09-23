/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      'ic-gadget/util/trace'
], function(trace) {

   describe('the method ic-gadget/util/trace', function() {
      it('implements the expected methods', function() {
         expect(trace.entering).toEqual(jasmine.any(Function));
         expect(trace.exiting).toEqual(jasmine.any(Function));
         expect(trace.throwing).toEqual(jasmine.any(Function));
      });
   });

});
