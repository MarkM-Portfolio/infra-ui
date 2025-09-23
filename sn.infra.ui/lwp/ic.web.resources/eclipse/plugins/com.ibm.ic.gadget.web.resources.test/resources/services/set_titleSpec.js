/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      'dojo/_base/lang',
      'ic-gadget/services/set_title'
], function(lang, st) {
   describe('the module ic-gadget/services/set_title', function() {
      it('implements the expected methods', function() {
         expect(st.registerService).toEqual(jasmine.any(Function));
      });
      it('is available under the legacy namespace', function() {
         expect(st).toEqual(lang.getObject("com.ibm.lconn.gadget.services.set_title"));
      });
   });
});
