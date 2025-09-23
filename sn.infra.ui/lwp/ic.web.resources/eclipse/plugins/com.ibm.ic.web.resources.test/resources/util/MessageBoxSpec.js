/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "ic-core/util/MessageBox",
      "ic-ui/MessageBox"
], function(MessageBoxUtil, MessageBox) {

   /**
    * Jasmine spec for the MessageBox utility
    * 
    * @module ic-test.util.MessageBoxSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */

   describe("the interface of ic-core/util/MessageBox", function() {
      it('implements the expected methods', function() {
         expect(MessageBoxUtil.displayMessage).toEqual(jasmine.any(Function));
         expect(MessageBoxUtil.error).toEqual(jasmine.any(Function));
         expect(MessageBoxUtil.warning).toEqual(jasmine.any(Function));
         expect(MessageBoxUtil.info).toEqual(jasmine.any(Function));
         expect(MessageBoxUtil.success).toEqual(jasmine.any(Function));
      });
   });

   describe("the displayMessage() method", function() {
      it("doesn't throw without arguments", function() {
         expect(function() {
            MessageBoxUtil.displayMessage();
         }).not.toThrow();
      });

      it("returns undefined without arguments", function() {
         expect(MessageBoxUtil.displayMessage()).not.toBeDefined();
      });
      it("returns a MessageBox with required arguments", function() {
         expect(MessageBoxUtil.displayMessage({
            id : "foo",
            msg : "bar"
         }, "foo") instanceof MessageBox).toBeTruthy();
      });
   });

   describe("the convenience methods", function() {
      beforeEach(function() {
         spyOn(MessageBoxUtil, 'displayMessage');
      });
      it("info() is a shorthand for displayMessage() with type 'INFO'", function() {
         MessageBoxUtil.info();
         expect(MessageBoxUtil.displayMessage).toHaveBeenCalled();
      });
      it("warning() is a shorthand for displayMessage() with type 'WARNING'", function() {
         MessageBoxUtil.warning();
         expect(MessageBoxUtil.displayMessage).toHaveBeenCalled();
      });
      it("error() is a shorthand for displayMessage() with type 'ERROR'", function() {
         MessageBoxUtil.error();
         expect(MessageBoxUtil.displayMessage).toHaveBeenCalled();
      });
      it("success() is a shorthand for displayMessage() with type 'SUCCESS'", function() {
         MessageBoxUtil.success();
         expect(MessageBoxUtil.displayMessage).toHaveBeenCalled();
      });
   });
});
