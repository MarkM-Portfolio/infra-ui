/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link lconn.core.lcTextArea.mixins.ITextBoxSupport}
 *
 * @module lconn.test.jasmine.lcTextArea.ITextBoxSupportSpec
 */
dojo.provide("lconn.test.jasmine.lcTextArea.ITextBoxSupportSpec");

dojo.require("lconn.core.lcTextArea.mixins.ITextBoxSupport");

/**
 * Dummy test class that mixes in lconn.core.lcTextArea.mixins.ITextBoxSupport
 * 
 * @class lconn.test.jasmine.lcTextArea._DummyTextBox
 * @extends lconn.core.lcTextArea.mixins.ITextBoxSupport
 * @private
 */
dojo.declare("lconn.test.jasmine.lcTextArea._DummyTextBox", lconn.core.lcTextArea.mixins.ITextBoxSupport,
      /** @lends lconn.test.jasmine.lcTextArea._DummyTextBox.prototype */ {
   textAreaNode: dojo.create('input')
});

/**
 * Dummy test class that mixes in lconn.core.lcTextArea.mixins.ITextBoxSupport.
 * This class doesn't expose a textAreaNode property; we use this to test
 * resilience of the mixin to absence of expected properties.
 * 
 * @class lconn.test.jasmine.lcTextArea._NoTextAreaTextBox
 * @extends lconn.core.lcTextArea.mixins.ITextBoxSupport
 * @private
 */
dojo.declare("lconn.test.jasmine.lcTextArea._NoTextAreaTextBox", lconn.core.lcTextArea.mixins.ITextBoxSupport,
      /** @lends lconn.test.jasmine.lcTextArea._NoTextAreaTextBox.prototype */ {
});

(function(TextBox, NoTextAreaTextBox) {

   var textbox, textbox_without_textarea;
   beforeEach(function() {
      textbox = new TextBox();
      textbox_without_textarea = new NoTextAreaTextBox();
   });

   describe("the lconn.core.lcTextArea.mixins.ITextBoxSupport mixin", function() {
      it("adds the expected methods", function() {
         expect(textbox.getText).toEqual(jasmine.any(Function));
         expect(textbox.setText).toEqual(jasmine.any(Function));
      });
   });

   describe("the lconn.core.lcTextArea.mixins.ITextBoxSupport.getText", function() {
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
         expect(function(){textbox_without_textarea.getText()}).not.toThrow();
         expect(textbox_without_textarea.getText()).toBeNull();
      });
   });

   describe("the lconn.core.lcTextArea.mixins.ITextBoxSupport.setText", function() {
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
         expect(function(){textbox_without_textarea.setText('foo')}).not.toThrow();
         expect(function(){textbox_without_textarea.setText('')}).not.toThrow();
         expect(function(){textbox_without_textarea.setText('      foo')}).not.toThrow();
         expect(function(){textbox_without_textarea.setText('foo      ')}).not.toThrow();
      });
   });
}(lconn.test.jasmine.lcTextArea._DummyTextBox, lconn.test.jasmine.lcTextArea._NoTextAreaTextBox));
