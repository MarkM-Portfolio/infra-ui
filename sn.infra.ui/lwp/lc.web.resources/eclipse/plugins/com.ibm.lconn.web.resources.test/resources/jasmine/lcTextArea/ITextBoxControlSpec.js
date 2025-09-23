/* Copyright IBM Corp. 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link lconn.core.lcTextArea.mixins.ITextBoxControl}
 * 
 * @module lconn.test.jasmine.lcTextArea.ITextBoxControlSpec
 */
dojo.provide("lconn.test.jasmine.lcTextArea.ITextBoxControlSpec");

dojo.require("lconn.core.lcTextArea.mixins.ITextBoxControl");

/**
 * Dummy test class that mixes in lconn.core.lcTextArea.mixins.ITextBoxControl
 * 
 * @class lconn.test.jasmine.lcTextArea._DummyTextBox
 * @extends lconn.core.lcTextArea.mixins.ITextBoxControl
 * @private
 */
dojo.declare("lconn.test.jasmine.lcTextArea._DummyTextBox", lconn.core.lcTextArea.mixins.ITextBoxControl,
/** @lends lconn.test.jasmine.lcTextArea._DummyTextBox.prototype */
{
   text : '',
   getText : function() {
      return this.text;
   },
   setText : function(s) {
      this.text = s;
   }
});

(function(_DummyTextBox) {
   
   var textbox;
   beforeEach(function() {
      textbox = new _DummyTextBox({
         maxLength : 3,
         maxByteLength : 6
      });
   });

   describe("the lconn.core.lcTextArea.mixins.ITextBoxControl", function() {
      it("implements the expected methods", function() {
         expect(textbox.resetBox).toEqual(jasmine.any(Function));
         expect(textbox._showShadowText).toEqual(jasmine.any(Function));
         expect(textbox._hideShadowText).toEqual(jasmine.any(Function));
         expect(textbox._setInitialState).toEqual(jasmine.any(Function));
         expect(textbox._showCharsRemaining).toEqual(jasmine.any(Function));
         expect(textbox._calculateRemainingChars).toEqual(jasmine.any(Function));
         expect(textbox._onFocus).toEqual(jasmine.any(Function));
         expect(textbox._onBlur).toEqual(jasmine.any(Function));
         expect(textbox._onKeyDown).toEqual(jasmine.any(Function));
         expect(textbox._onKeyPress).toEqual(jasmine.any(Function));
         expect(textbox._onResize).toEqual(jasmine.any(Function));
      });
   });

   describe("the lconn.core.lcTextArea.mixins.ITextBoxControl._onResize()", function() {
      it("sends the lconn/core/basictextbox/resized topic", function() {
         var editor = {
               container: {
                  $: {
                     clientHeight: 15
                  }
               }
         };
         var topicEmitted = false;
         var clientHeight = 0;
         var callbackFunction = function(item) {
            clientHeight = item.height;
            topicEmitted = true;
         };
         dojo.subscribe('lconn/core/basictextbox/resized', callbackFunction);
         textbox._onResize(editor);
         expect(topicEmitted).toBeTruthy();
         expect(clientHeight).toBe(15);
      });
   });
}(lconn.test.jasmine.lcTextArea._DummyTextBox));
