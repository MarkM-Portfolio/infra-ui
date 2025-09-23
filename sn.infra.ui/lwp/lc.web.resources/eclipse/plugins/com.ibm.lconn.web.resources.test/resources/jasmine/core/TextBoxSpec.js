/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.TextBoxSpec");

dojo.require("lconn.core.TextBox");

(function(TextBox) {
   var textBox;
   beforeEach(function() {
      textBox = new TextBox();
   });

   describe("the interface of core/textBox", function() {
      it('implements the expected methods', function() {
         expect(textBox.textBoxBlur).toEqual(jasmine.any(Function));
         expect(textBox.textBoxFocus).toEqual(jasmine.any(Function));
         expect(textBox.textBoxClick).toEqual(jasmine.any(Function));
         expect(textBox.setHiddenValue).toEqual(jasmine.any(Function));
         expect(textBox.focus).toEqual(jasmine.any(Function));
         expect(textBox.getValue).toEqual(jasmine.any(Function));
         expect(textBox.setValue).toEqual(jasmine.any(Function));
         expect(textBox.clearValue).toEqual(jasmine.any(Function));
      });// it
   });// describe
   describe("the method core/textBox.textBoxBlur()", function() {
      it("blur's the textBox", function() {
         textBox.shadowText = "Enter text";
         textBox.textBoxBlur();

         expect(textBox.shadowTextOn).toBe(true);
         expect(textBox.getValue()).toBe('');

         textBox.setValue('Text');
         expect(textBox.shadowTextOn).toBe(false);
      });
   });// describe

   describe("the method core/textBox.textBoxFocus()", function() {
      it("sets the focus correctly", function() {
         textBox.textBoxFocus();

         expect(textBox.shadowTextOn).toBe(false);
         expect(textBox.getValue()).toBe('');
      });
   });

   describe("the method core/textBox.setHiddenValue()", function() {
      it("get's the value without bluring the textbox", function() {
         textBox.setValue("test");

         textBox.setHiddenValue();
         expect(textBox.shadowTextOn).toBe(false);
         expect(textBox.getValue()).toBe('test');

         textBox.shadowTextOn = true;
         textBox.setHiddenValue();
         expect(textBox.getValue()).toBe('');
      });
   });

   describe("the method core/textBox.getValue()", function() {
      it("get's the value in the textbox", function() {
         textBox.setValue('test');
         expect(textBox.getValue()).toBe('test');
      });
   });

   describe("the method core/textBox.setValue()", function() {
      it("sets the value of the textbox", function() {
         textBox.setValue("Test");
         expect(textBox.getValue()).toBe("Test");
         expect(textBox.shadowTextOn).toBe(false);
      });
   });

   describe("the method core/textBox.clearValue()", function() {
      it("clears the value of the textBox", function() {
         textBox.clearValue();
         expect(textBox.getValue()).toBe('');
         expect(textBox.shadowTextOn).toBe(true);
      });
   });
}(lconn.core.TextBox));
