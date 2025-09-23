/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
        'ic-gadget/util/userPrefHelper'
], function(userPrefHelper) {

   describe('the class ic-gadget/util/userPrefHelper', function() {
      var helper;
      beforeEach(function() {
         helper = new userPrefHelper();
      });
      it('implements the expected methods', function() {
         expect(helper.serializeToString).toEqual(jasmine.any(Function));
         expect(helper.deserializeFromString).toEqual(jasmine.any(Function));
         expect(helper.hasAllRequired).toEqual(jasmine.any(Function));
         expect(helper.getFromDefaults).toEqual(jasmine.any(Function));
         expect(helper.isEditable).toEqual(jasmine.any(Function));
         // FIXME: the next two methods should be made private
         expect(helper._getUserPrefName).toEqual(jasmine.any(Function));
         expect(helper._getUserPrefValue).toEqual(jasmine.any(Function));
      });
   });

});
