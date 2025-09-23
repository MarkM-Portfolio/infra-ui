/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * ARIA mixin for mention handlers
 * 
 * @namespace lconn.core.ckplugins.mentions._ARIAMixin
 */
dojo.provide("lconn.core.ckplugins.mentions._ARIAMixin");

(function() {

   /*
    * Label used for ARIA.
    * 
    * We can safely use a private variale because, although many handlers use
    * this mixin, it is only ever used by one handler at a time. Otherwise, we'd
    * need to store the reference in a member.
    */
   var label = null;

   lconn.core.ckplugins.mentions._ARIAMixin = /** @lends lconn.core.ckplugins.mentions._ARIAMixin */
   {
      /**
       * Sets the label for the mention, and creates the label if it doesn't
       * exist yet
       * 
       * @param {CKEDITOR.editor}
       *           editor The editor instance
       * @param {CKEDITOR.dom.element}
       *           el The CKEditor element for the mention
       * @param {String}
       *           text The label
       */
      addLabel : function(editor, el, text) {
         if (el) {
            if (!label) {
               // These are once-off creation steps
               label = dojo.create('span', {
                  'aria-live': "polite",
                  'aria-atomic': true,
                  style: "position: absolute; top:-9999px",
                  id: "mentionsAria_" + this.idx
               }, editor.container.$);
            }
   
            this.setLabel(text);
            el.setAttribute("aria-labelledBy", label.id);
         }
      },
      /**
       * Sets the label for the mention
       * 
       * @param {String}
       *           text The label
       */
      setLabel : function(text) {
         if (!label)
            return;
         
         var t = document.createTextNode(text);
         if (label.firstChild) {
            label.removeChild(label.firstChild)
         }
         label.appendChild(t);
         label.setAttribute("aria-label", text);
      },

      /**
       * Removes the label from the editor
       */
      removeLabel : function() {
         if (!label)
            return;
         dojo.destroy(label);
      },

      /**
       * Returns the label
       * 
       * @returns {String} the label
       */
      getLabel : function() {
         return label;
      },

      /**
       * Deletes the label. Note this method is only used for tests.
       */
      deleteLabel : function() {
         if (dojo.config.isDebug) {
            this.removeLabel();
            label = null;
         }
         else
            console.warn('_ARIAMixin.deleteLabel should only be used in tests');
      }
   };

})();
