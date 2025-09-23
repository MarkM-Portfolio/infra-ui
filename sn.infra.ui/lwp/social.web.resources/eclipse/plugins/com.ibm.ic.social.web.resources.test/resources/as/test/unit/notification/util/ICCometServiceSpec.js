/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "ic-as/notification/util/ICCometService",
      "ic-as/notification/util/_ICCometService"
], function(ICCometService, _ICCometService) {

   describe("the ic-as/notification/util/ICCometService util", function() {
      it("returns an instance of _ICCometService", function() {
         expect(ICCometService instanceof _ICCometService).toBeTruthy();
      });
   });

});
