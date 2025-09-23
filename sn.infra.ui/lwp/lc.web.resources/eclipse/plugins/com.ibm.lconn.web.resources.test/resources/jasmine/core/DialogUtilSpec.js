/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.DialogUtilSpec");

dojo.require("lconn.core.DialogUtil");

(function(DialogUtil) {
   describe("the interface of lconn.core.DialogUtil", function() {
      it("implements the expected methods", function() {
         expect(DialogUtil.alert).toEqual(jasmine.any(Function));
         expect(DialogUtil.prompt).toEqual(jasmine.any(Function));
         expect(DialogUtil.popupForm).toEqual(jasmine.any(Function));
      });
   });
}(lconn.core.DialogUtil));
