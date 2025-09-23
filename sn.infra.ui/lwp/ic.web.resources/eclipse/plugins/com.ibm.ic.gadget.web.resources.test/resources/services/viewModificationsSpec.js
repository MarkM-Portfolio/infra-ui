/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      'dojo/_base/lang',
      'ic-gadget/services/viewModifications'
], function(lang, vm) {
   describe('the module ic-gadget/services/viewModifications', function() {
      it('implements the expected methods', function() {
         expect(vm.registerService).toEqual(jasmine.any(Function));
      });
      it('is available under the legacy namespace', function() {
         expect(vm).toEqual(lang.getObject("com.ibm.lconn.gadget.services.viewModifications"));
      });
   });
});
