/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-core/DialogUtil"
], function (DialogUtil) {

   /**
    * Jasmine spec for DialogUtil widget
    * 
    * @module ic-test.core.DialogUtil
    */
   describe("the interface of ic-core/DialogUtil", function() {
      it("implements the expected methods", function() {
         expect(DialogUtil.alert).toEqual(jasmine.any(Function));
         expect(DialogUtil.prompt).toEqual(jasmine.any(Function));
         expect(DialogUtil.popupForm).toEqual(jasmine.any(Function));
      });
   });
});
