/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-ui/Like"
], function(Like) {
   /**
    * Like widget Jasmine spec
    * 
    * @module ic-test.ui.LikeSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the ic-ui/Like widget", function() {
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
});
