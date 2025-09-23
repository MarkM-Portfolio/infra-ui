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

dojo.provide("lconn.core.TypeAheadFormatMixin");
dojo.require("dojo.string");
dojo.require("lconn.core.util.html");

(function(htmlUtil, string) {

   /**
    * Mixin for formatters used by TypeAhead widgets and subclasses
    * 
    * @mixin lconn.core.TypeAheadFormatMixin
    */
   dojo.declare("lconn.core.TypeAheadFormatMixin", null, {
      /**
       * Performs some basic html encoding
       * 
       * @param {String}
       *           item the item
       * @param {Boolean}
       *           html true if the string must be html safe
       * @returns {String} a string suitable for the context where it's used
       */
      formatItem: function(item, html) {
         return html ? htmlUtil.encodeHtml(item) : item;
      },

      /**
       * Shorthand form for html formatting. Equivalent to calling
       * <code>formatItemHtml(item, true)></code>.
       * 
       * @deprecated
       * @param {String}
       *           item the item
       * @returns {String} a string suitable for html
       */
      formatItemHtml: function(item) {
         return this.formatItem(item, true);
      },

      /**
       * Returns a label that represents the item
       * 
       * @param {Object}
       *           item The item
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
       * Returns a menu label for the item. Can highlight matches.
       * 
       * FIXME: pass key as argument, do not read it here
       * 
       * @param {Object}
       *           item The item
       * @returns {String} a menu label for the item. Can highlight matches
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
         // Display user icon next to user name lable in the dropdown for cnx8ui
         if (window.ui && typeof window.ui._check_ui_enabled === 'function' && window.ui._check_ui_enabled()) {
            var userLabel = this._setLabelForItem(item, label);
            if (!item.src && !item.member && !item.fullName && item.userid) {
               item.src = window.location.origin + '/communities/service/html/image?communityUuid=' + item.userid;
            }
            if (item.src) {
               var userImage = "<img width='30px' src=" + item.src + "></img>";
               item = userImage + userLabel;
            } else {
               item = userLabel;
            }
         } else {
            item = this._setLabelForItem(item, label);
         }
         return {
            html: true,
            label: item
         };
      }
   });

}(lconn.core.util.html, dojo.string));
