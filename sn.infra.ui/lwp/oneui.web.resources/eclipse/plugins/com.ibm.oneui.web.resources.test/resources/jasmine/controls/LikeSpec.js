/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.jasmine.controls.LikeSpec");

dojo.require("com.ibm.oneui.controls.Like");

(function(Like) {
   /**
    * Like widget Jasmine spec
    * 
    * @module com.ibm.oneui.test.jasmine.controls.LikeSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the com.ibm.oneui.controls.Like widget", function() {
      var like;
      beforeEach(function() {
         like = new Like();
      });
      afterEach(function() {
         if (like) {
            like.destroy();
         }
      });
      it("can be instantiated without errors", function() {
         var widget;
         expect(function() {
            widget = new Like();
         }).not.toThrow();
         expect(widget).not.toBeNull();
      });
      it("implements the expected methods", function() {
         expect(like.getPopup).toEqual(jasmine.any(Function));
         expect(like.getUserProfileUrl).toEqual(jasmine.any(Function));
         expect(like.getUserPhotoUrl).toEqual(jasmine.any(Function));
      });
   });
}(com.ibm.oneui.controls.Like));
