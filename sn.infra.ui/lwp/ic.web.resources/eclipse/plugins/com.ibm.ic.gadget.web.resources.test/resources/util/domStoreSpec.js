/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      'dojo/_base/lang',
      'ic-gadget/util/domStore'
], function(lang, ds) {
   describe('the module ic-gadget/util/domStore', function() {
      it('is a function', function() {
         expect(ds).toEqual(jasmine.any(Function));
      });
      it('is available under the legacy namespace', function() {
         expect(ds).toEqual(lang.getObject("com.ibm.lconn.gadget.util.domStore"));
      });
   });
});
