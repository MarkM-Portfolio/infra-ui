/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * ARIA mixin for mention handlers
 * 
 * @namespace ic-ui.ckeditor.plugins.mentions._ARIAMixin
 */
define([
        "dojo/_base/config",
        "dojo/dom-construct"
], function(config, domConstruct) {

   /*
    * Label used for ARIA.
    * 
    * We can safely use a private variale because, although many handlers use
    * this mixin, it is only ever used by one handler at a time. Otherwise, we'd
    * need to store the reference in a member.
    */
   var label = null;

   return (/** @lends ic-ui.ckeditor.plugins.mentions._ARIAMixin */
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
               label = domConstruct.create('span', {
                  'aria-live' : "polite",
                  'aria-atomic' : true,
                  style : "position: absolute; top:-9999px",
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
         if (!label) {
            return;
         }

         var t = document.createTextNode(text);
         if (label.firstChild) {
            label.removeChild(label.firstChild);
         }
         label.setAttribute("aria-label", text);
         label.appendChild(t);
      },

      /**
       * Removes the label from the editor
       */
      removeLabel : function() {
         if (!label) {
            return;
         }
         domConstruct.destroy(label);
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
         if (config.isDebug) {
            this.removeLabel();
            label = null;
         }
         else {
            console.warn('_ARIAMixin.deleteLabel should only be used in tests');
         }
      }
   });

});
