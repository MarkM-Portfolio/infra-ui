/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare"
], function (declare) {

   /**
    * Interface that supports the a normal HTML textbox in the BasicTextBox.
    * <p>
    * The interface provides a version of the getText method that will obtain the
    * currently entered text.
    * <p>
    * If the BasicTextBox is supporting a normal HTML textarea then this mixin
    * should be used.
    *
    * @mixin ic-core.lcTextArea.mixins.ITextBoxSupport
    */

   function check() {
      if (this.textAreaNode && typeof this.textAreaNode.value !== 'undefined')
         return true;
      else {
         console.warn('ITextBoxSupport requires that the mixed-in class has a textAreaNode member with a value');
         return false;
      }
   }

   var ITextBoxSupport = declare("lconn.core.lcTextArea.mixins.ITextBoxSupport", null, /** @lends ic-core.lcTextArea.mixins.ITextBoxSupport.prototype */ {

      /**
       * Gets the text in the textarea used by the BasicTextBox.
       *
       * @returns {String} text with leading spaces removed.
       */
      getText: function() {
         return check.apply(this) ?
               this.textAreaNode.value.replace(/^\s*/, "") : null;
      },

      /**
       * Sets the text in the textbox area used by the BasicTextBox.
       *
       * @param {String}
       *           text Text to put in the entry area.
       */
      setText: function(text) {
         if (check.apply(this))
            this.textAreaNode.value = text;
      }
   });
   return ITextBoxSupport;
});
