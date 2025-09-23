/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "ic-core/lcTextArea/mixins/ITextBoxUtils"
], function(declare, ITextBoxUtils) {

   /**
    * Jasmine spec for {@link ic-core.lcTextArea.mixins.ITextBoxUtils}
    * 
    * @module ic-test.lcTextArea.ITextBoxUtilsSpec
    */
   /**
    * Dummy test class that mixes in core.lcTextArea.mixins.ITextBoxUtils
    * 
    * @class ic-test.lcTextArea._DummyTextBox
    * @extends ic-core.lcTextArea.mixins.ITextBoxUtils
    * @private
    */
   var _DummyTextBox = declare(ITextBoxUtils,
   /** @lends ic-test.lcTextArea._DummyTextBox.prototype */
   {
      text : '',
      getText : function() {
         return this.text;
      },
      setText : function(s) {
         this.text = s;
      }
   });

   var textbox;
   beforeEach(function() {
      textbox = new _DummyTextBox({
         maxLength : 3,
         maxByteLength : 6
      });
   });

   describe("the ic-core/lcTextArea/mixins/ITextBoxUtils mixin", function() {
      it("adds the expected methods", function() {
         expect(textbox.isSpace).toEqual(jasmine.any(Function));
         expect(textbox.getTextLength).toEqual(jasmine.any(Function));
         expect(textbox.getUtfLength).toEqual(jasmine.any(Function));
         expect(textbox.isTextTooLong).toEqual(jasmine.any(Function));
         expect(textbox.getTextOutput).toEqual(jasmine.any(Function));
      });

      it("adds the expected properties", function() {
         expect(textbox.isIE11).not.toBeUndefined();
         expect(textbox.maxLength).not.toBeUndefined();
         expect(textbox.maxByteLength).not.toBeUndefined();
      });
   });

   describe("the ic-core/lcTextArea/mixins/ITextBoxUtils.isTextTooLong() method", function() {
      it("sets the maxByteLength to 4000 by default if none is set", function() {
         textbox.maxLength = 5000;
         textbox.maxByteLength = 0;
         var t = '', i;
         for (i = 0; i < 4002; t += 'A', i++) {
            textbox.setText(t);
            if (i <= 4000) {
               expect(textbox.isTextTooLong()).toBeFalsy();
            }
            else {
               expect(textbox.isTextTooLong()).toBeTruthy();
            }
         }
      });

      it("returns true if the text length, or byte size, has exceeded their limit; but returns false if they have not.", function() {
         textbox.maxLength = 3;
         textbox.maxByteLength = 0;
         var t = '', i;
         for (i = 0; i < 5; t += 'A', i++) {
            textbox.setText(t);
            if (i <= 3) {
               expect(textbox.isTextTooLong()).toBeFalsy();
            }
            else {
               expect(textbox.isTextTooLong()).toBeTruthy();
            }
         }
         textbox.maxLength = 10;
         textbox.maxByteLength = 5;
         t = '';
         for (i = 0; i < 10; t += 'A', i++) {
            textbox.setText(t);
            if (textbox.getUtfLength() <= 5) {
               expect(textbox.isTextTooLong()).toBeFalsy();
            }
            else {
               expect(textbox.isTextTooLong()).toBeTruthy();
            }
         }
      });
   });

   describe("the ic-core/lcTextArea/mixins/ITextBoxUtils.isTextTooLong method", function() {
      it("returns the correct length in characters", function() {
         var s = '', i;
         for (i = 0; i < 100; s += 's', i++) {
            textbox.setText(s);
            expect(textbox.getTextLength()).toBe(i);
         }
         var t = '';
         for (i = 0; i < 100; t += '\u0626', i++) {
            textbox.setText(t);
            expect(textbox.getTextLength()).toBe(i);
         }
         var u = '';
         for (i = 0; i < 100; u += '\u7b08', i++) {
            textbox.setText(u);
            expect(textbox.getTextLength()).toBe(i);
         }
      });

      it("returns zero if showing shadow text", function() {
         textbox._showingShadowText = true;
         expect(textbox.getTextLength()).toBe(0);
      });
   });

   describe("the ic-core/lcTextArea/mixins/ITextBoxUtilsgetUtfLength method", function() {
      it("returns the correct length in bytes for single byte characters", function() {
         var s = '', i;
         for (i = 0; i < 100; s += 's', i++) {
            textbox.setText(s);
            expect(textbox.getUtfLength()).toBe(i);
         }
         var t = '';
         for (i = 0; i < 100; t += '\u0626', i++) {
            textbox.setText(t);
            expect(textbox.getUtfLength()).toBe(2 * i);
         }
         var u = '';
         for (i = 0; i < 100; u += '\u7b08', i++) {
            textbox.setText(u);
            expect(textbox.getUtfLength()).toBe(3 * i);
         }
      });

      it("returns zero if showing shadow text", function() {
         var testText = "good morning, good afternoon, and good night";
         textbox.setText(testText);
         textbox._showingShadowText = true;
         expect(textbox.getUtfLength()).toBe(0);
      });
   });

   describe("the ic-core/lcTextArea/mixins/ITextBoxUtils.getTextOutput method", function() {
      it("returns the text as-is, if the truncate flag is false", function() {
         var testText = "good morning, good afternoon, and good night";
         textbox.setText(testText);
         expect(textbox.getTextOutput(false)).toBe(testText);
      });

      it("returns truncated text, if the truncate flag is true", function() {
         textbox.maxLength = 28;
         textbox.maxByteLength = 0;
         var testText = "good morning, good afternoon, and good night";
         var truncText = "good morning, good afternoon";
         textbox.setText(testText);
         expect(textbox.getTextOutput(true)).toBe(truncText);
         textbox.maxLength = 50;
         textbox.maxByteLength = 28;
         expect(textbox.getTextOutput(true)).toBe(truncText);
      });
   });

   describe("the ic-core/lcTextArea/mixins/ITextBoxUtils.isEmptyExceptSpaces() method", function() {
      it("returns true when shadow text is displayed", function() {
         var previousState = textbox._showingShadowText;
         textbox._showingShadowText = true;
         textbox.setText('  bla bla  ');
         expect(textbox.isEmptyExceptSpaces()).toBeTruthy();
         textbox._showingShadowText = previousState;
      });

      it("returns false when there is content", function() {
         textbox.setText('  bla bla  ');
         expect(textbox.isEmptyExceptSpaces()).toBeFalsy();
      });

      it("returns true when no content", function() {
         textbox.setText('');
         expect(textbox.isEmptyExceptSpaces()).toBeTruthy();
      });

      it("returns true when only empty spaces", function() {
         textbox.setText('      ');
         expect(textbox.isEmptyExceptSpaces()).toBeTruthy();
      });
   });
});
