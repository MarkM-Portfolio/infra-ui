/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for ic-core.TextBox
 * 
 * @module ic-test.core.TextBoxSpec
 * @author Chris Stephenson <cstephe@us.ibm.com>
 */

define([ "ic-core/TextBox"
], function(TextBox) {
   describe("the ic-core/TextBox widget", function() {
      var textBox;
      beforeEach(function() {
         textBox = new TextBox();
      });

      describe("the interface", function() {
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

      describe("the method textBoxBlur()", function() {
         it("blur's the textBox", function() {
            textBox.shadowText = "Enter text";
            textBox.textBoxBlur();

            expect(textBox.shadowTextOn).toBe(true);
            expect(textBox.getValue()).toBe('');

            textBox.setValue('Text');
            expect(textBox.shadowTextOn).toBe(false);
         });
      });// describe

      describe("the method textBoxFocus()", function() {
         it("sets the focus correctly", function() {
            textBox.textBoxFocus();

            expect(textBox.shadowTextOn).toBe(false);
            expect(textBox.getValue()).toBe('');
         });
      });

      describe("the method setHiddenValue()", function() {
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

      describe("the method getValue()", function() {
         it("get's the value in the textbox", function() {
            textBox.setValue('test');
            expect(textBox.getValue()).toBe('test');
         });
      });

      describe("the method setValue()", function() {
         it("sets the value of the textbox", function() {
            textBox.setValue("Test");
            expect(textBox.getValue()).toBe("Test");
            expect(textBox.shadowTextOn).toBe(false);
         });
      });

      describe("the method clearValue()", function() {
         it("clears the value of the textBox", function() {
            textBox.clearValue();
            expect(textBox.getValue()).toBe('');
            expect(textBox.shadowTextOn).toBe(true);
         });
      });
   });
});
