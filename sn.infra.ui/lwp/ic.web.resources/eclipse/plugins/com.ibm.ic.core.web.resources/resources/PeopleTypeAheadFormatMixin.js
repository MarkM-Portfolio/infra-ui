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
      "dojo/dom-geometry",
      "ic-core/util/html",
      "ic-core/globalization/bidiUtil",
      "./TypeAheadFormatMixin"
], function(declare, domGeom, htmlUtil, bidiUtil, TypeAheadFormatMixin) {

   /**
    * Mixin for formatters used by PeopleTypeAhead widgets and subclasses
    * 
    * @mixin ic-core.PeopleTypeAheadFormatMixin
    * @extends ic-core.TypeAheadFormatMixin
    */
   return declare("lconn.core.PeopleTypeAheadFormatMixin", TypeAheadFormatMixin, /** @lends ic-core.PeopleTypeAheadFormatMixin.prototype */
   {
      formatItem : function(item, html) {
         var label = this._getLabelFromItem(item);
         return html ? this._htmlify(label) : label;
      },

      /**
       * Returns a label that represents the item
       * 
       * @param item
       *           The item
       * @private
       */
      _getLabelFromItem : function(item) {
         var buf = [];
         if (item) {
            if (typeof item == "string")
               return item;

            if (item.name) {
               buf.push((bidiUtil.isRTLValue(item.name) && !domGeom.isBodyLtr()) ?  "\u202A" + item.name + "\u202C" : item.name);
               // SPR DJOS8FGSTL Added business owner to append to name if
               // necessary
               if (item.businessOwner) {
                  buf.push(":");
                  var isLatinOwner = !bidiUtil.isRTLValue(item.businessOwner.charAt(0));
                  buf.push(!domGeom.isBodyLtr() && isLatinOwner ? bidiUtil.enforceTextDirection(item.businessOwner, 'rtl') : item.businessOwner);
               }
            }

            var email = item.member || item.email;
            // FIXME: why is the email field called 'member'?
            if (email) {
               buf.push(domGeom.isBodyLtr() ? '<' + email + '>\u200E' : '\u200E<' + email + '>\u200E');
            }
         }

         return domGeom.isBodyLtr() ? buf.join(' ') : bidiUtil.enforceTextDirection(buf.join(' '), 'rtl');
      },

      _htmlify : function(str) {
         return htmlUtil.encodeHtml(str).replace(/"/g, "&quot;").replace(/\u200e/g, '&lrm;');
      }
   });

});
