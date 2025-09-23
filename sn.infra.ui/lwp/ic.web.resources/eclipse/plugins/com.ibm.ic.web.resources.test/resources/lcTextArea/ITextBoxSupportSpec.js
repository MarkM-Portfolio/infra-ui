/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/dom-construct",
   "ic-core/lcTextArea/mixins/ITextBoxSupport"
], function (declare, domConstruct, ITextBoxSupport) {


   /**
    * Jasmine spec for {@link ic-core.lcTextArea.mixins.ITextBoxSupport}
    *
    * @module ic-test.lcTextArea.ITextBoxSupportSpec
    */
   /**
    * Dummy test class that mixes in core.lcTextArea.mixins.ITextBoxSupport
    * 
    * @class ic-test.lcTextArea._DummyTextBox
    * @extends ic-core.lcTextArea.mixins.ITextBoxSupport
    * @private
    */
   var TextBox = declare(ITextBoxSupport,
         /** @lends ic-test.lcTextArea._DummyTextBox.prototype */ {
      textAreaNode: domConstruct.create('input')
   });

   /**
    * Dummy test class that mixes in core.lcTextArea.mixins.ITextBoxSupport.
    * This class doesn't expose a textAreaNode property; we use this to test
    * resilience of the mixin to absence of expected properties.
    * 
    * @class ic-test.lcTextArea._NoTextAreaTextBox
    * @extends ic-core.lcTextArea.mixins.ITextBoxSupport
    * @private
    */
   var NoTextAreaTextBox = declare(ITextBoxSupport,
         /** @lends ic-test.lcTextArea._NoTextAreaTextBox.prototype */ {
   });

   describe("the ic-core/lcTextArea/mixins/ITextBoxSupport mixin", function() {
      var textbox, textbox_without_textarea;
      beforeEach(function() {
         textbox = new TextBox();
         textbox_without_textarea = new NoTextAreaTextBox();
      });

      describe("interface", function() {
         it("adds the expected methods", function() {
            expect(textbox.getText).toEqual(jasmine.any(Function));
            expect(textbox.setText).toEqual(jasmine.any(Function));
         });
      });

      describe("the getText method", function() {
         it("returns the correct value", function() {
            textbox.textAreaNode.value = 'foo';
            expect(textbox.getText()).toBe('foo');

            textbox.textAreaNode.value = '';
            expect(textbox.getText()).toBe('');

            textbox.textAreaNode.value = '       foo';
            expect(textbox.getText()).toBe('foo');

            textbox.textAreaNode.value = 'foo       ';
            expect(textbox.getText()).toBe('foo       ');
         });

         it("returns null if the mixed in class doesn't have a textarea node", function() {
            expect(function(){textbox_without_textarea.getText();}).not.toThrow();
            expect(textbox_without_textarea.getText()).toBeNull();
         });
      });

      describe("the setText method", function() {
         it("correctly sets the value", function() {
            textbox.setText('foo');
            expect(textbox.textAreaNode.value).toBe('foo');
            expect(textbox.getText()).toBe('foo');

            textbox.setText('');
            expect(textbox.textAreaNode.value).toBe('');
            expect(textbox.getText()).toBe('');

            textbox.setText('      foo');
            expect(textbox.textAreaNode.value).toBe('      foo');
            expect(textbox.getText()).toBe('foo');

            textbox.setText('foo      ');
            expect(textbox.textAreaNode.value).toBe('foo      ');
            expect(textbox.getText()).toBe('foo      ');
         });

         it("does nothing if the mixed in class doesn't have a textarea node", function() {
            expect(function(){textbox_without_textarea.setText('foo');}).not.toThrow();
            expect(function(){textbox_without_textarea.setText('');}).not.toThrow();
            expect(function(){textbox_without_textarea.setText('      foo');}).not.toThrow();
            expect(function(){textbox_without_textarea.setText('foo      ');}).not.toThrow();
         });
      });
   });
});
