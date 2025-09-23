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

dojo.provide("lconn.core.PeopleTypeAheadFormatMixin");
dojo.require("lconn.core.TypeAheadFormatMixin");
dojo.require("lconn.core.util.html");
dojo.require("lconn.core.globalization.bidiUtil");

(function(htmlUtil, bidiUtil) {
   /**
    * Mixin for formatters used by PeopleTypeAhead widgets and subclasses
    * 
    * @mixin lconn.core.PeopleTypeAheadFormatMixin
    * @extends lconn.core.TypeAheadFormatMixin
    */
   dojo.declare("lconn.core.PeopleTypeAheadFormatMixin", lconn.core.TypeAheadFormatMixin, /** @lends lconn.core.PeopleTypeAheadFormatMixin.prototype */
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
               buf.push((bidiUtil.isRTLValue(item.name) && !dojo._isBodyLtr()) ?  "\u202A" + item.name + "\u202C" : item.name);
               // SPR DJOS8FGSTL Added business owner to append to name if
               // necessary
               if (item.businessOwner) {
                  buf.push(":");
                  var isLatinOwner = !bidiUtil.isRTLValue(item.businessOwner.charAt(0));
                  buf.push(!dojo._isBodyLtr() && isLatinOwner ? bidiUtil.enforceTextDirection(item.businessOwner, 'rtl') : item.businessOwner);
               }
            }

            var email = item.member || item.email;
            // FIXME: why is the email field called 'member'?
            // show email only for old ui and not for cnx8ui
            if (email && !item.src) {
               buf.push(dojo._isBodyLtr() ? '<' + email + '>\u200E' : '\u200E<' + email + '>\u200E');
            }
         }

         return dojo._isBodyLtr() ? buf.join(' ') : bidiUtil.enforceTextDirection(buf.join(' '), 'rtl');
      },

      /**
       * To preserve legacy behavior, this method replaces double quotes as
       * well.
       */
      _htmlify : function(str) {
         return htmlUtil.encodeHtml(str).replace(/"/g, "&quot;").replace(/\u200e/g, '&lrm;');
      }
   });

}(lconn.core.util.html, lconn.core.globalization.bidiUtil));
