/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
        "dojo/_base/declare",
        "dojo/string",
        "ic-core/util/html"
        ], function(declare, string, htmlUtil) {

   /**
    * Mixin for formatters used by TypeAhead widgets and subclasses
    * 
    * @mixin ic-core.TypeAheadFormatMixin
    */
   return declare("lconn.core.TypeAheadFormatMixin", null, /** @lends ic-core.TypeAheadFormatMixin.prototype */ {
      /**
       * Performs some basic html encoding
       * 
       * @param {String}
       *           item the item
       * @param {Boolean}
       *           html true if the string must be html safe
       * @returns a string suitable for the context where it's used
       */
      formatItem: function(item, html) {
         return html ? htmlUtil.encodeHtml(item) : item;
      },

      /**
       * Shorthand form for html formatting. Equivalent to calling
       * <code>formatItemHtml(item, true)</code>.
       * 
       * @param {String}
       *           item the item
       * @returns a string suitable for html
       */
      formatItemHtml: function(item) {
         return this.formatItem(item, true);
      },

      /**
       * Returns a label that represents the item
       * 
       * @param item
       *           The item
       * @private
       */
      _getLabelFromItem: function(item) {
         return item;
      },

      /**
       * Returns a label that represents the item
       * 
       * @param {Object}
       *           item The item
       * @param {String}
       *           label The label
       * @returns {String} The label that represents the item
       * @private
       */
      _setLabelForItem: function(item, label) {
         return label;
      },

      /**
       * Returns a menu label for the item. Can highlight matches FIXME: pass key
       * as argument, do not
       * 
       * @param item
       *           The item
       * @returns a menu label for the item. Can highlight matches
       */
      _getMenuLabelFromItem: function( /* Item */ item) {
         // lconn.core: we don't use labelFunc
         var label = this._getLabelFromItem(item);
         var key = this.multipleValues ? string.trim(this.keyArr[this.keyIdx])
               : string.trim(this.focusNode.value);

         if (item.type !== '-1') { // if no results found (item.type === -1), we don't need to add the <b> (bold tag)
            // we add the bold
            label = htmlUtil.highlight(label, key, true);
         }
         item = this._setLabelForItem(item, label);

         return {
            html: true,
            label: item
         };
      }
   });

});
