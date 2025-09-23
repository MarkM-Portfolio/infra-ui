/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/topic",
      "ic-core/lcTextArea/mixins/ITextBoxControl"
], function(declare, topic, ITextBoxControl) {

   /**
    * Jasmine spec for {@link ic-core.lcTextArea.mixins.ITextBoxControl}
    * 
    * @module ic-test.lcTextArea.ITextBoxControlSpec
    */
   /**
    * Dummy test class that mixes in core.lcTextArea.mixins.ITextBoxUtils
    * 
    * @class ic-test.lcTextArea._DummyTextBox
    * @extends ic-core.lcTextArea.mixins.ITextBoxControl
    * @private
    */
   var _DummyTextBox = declare(ITextBoxControl,
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

   describe("the ic-core/lcTextArea/mixins/ITextBoxControl", function() {
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

   describe("the _onResize() menthod", function() {
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
         topic.subscribe('lconn/core/basictextbox/resized', callbackFunction);
         textbox._onResize(editor);
         expect(topicEmitted).toBeTruthy();
         expect(clientHeight).toBe(15);
      });
   });

});
