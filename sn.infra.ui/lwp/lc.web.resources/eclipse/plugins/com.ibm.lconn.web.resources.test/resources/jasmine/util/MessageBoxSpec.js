/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.util.MessageBoxSpec");
dojo.require("lconn.core.util.MessageBox");
dojo.require("com.ibm.oneui.controls.MessageBox");

/**
 * Jasmine spec for the MessageBox utility
 * 
 * @module lconn.test.jasmine.util.MessageBoxSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(MessageBoxUtil, MessageBox) {
   describe("the interface of lconn.core.util.MessageBox", function() {
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
            msg: "bar"
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
}(lconn.core.util.MessageBox, com.ibm.oneui.controls.MessageBox));
