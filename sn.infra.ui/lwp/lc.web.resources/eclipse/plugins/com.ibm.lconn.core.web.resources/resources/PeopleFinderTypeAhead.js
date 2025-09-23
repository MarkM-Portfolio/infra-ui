/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.PeopleFinderTypeAhead");

dojo.require("lconn.core.PeopleTypeAhead");

dojo.declare("lconn.core.PeopleFinderTypeAhead", [ lconn.core.PeopleTypeAhead
], {

   previousKey : null,

   formatItemHtml : function(item) {
      return this.formatItem(item, true);
   },

   formatItem : function(item, html) {
      var str = "";
      if (item.name) {
         str += item.name;
      }
      if (item.member) {
         // str += " " + item.member;
         str += ' <' + item.member + '>\u200E';
      }
      str = str.replace(/<b>/gi, "").replace(/<\/b>/gi, "");

      return str;
   },

   _getMenuLabelFromItem : function(/* Item */item) {
      // lconn.core: we don't use labelFunc
      var label = this.formatItemHtml(item);
      var key = '';

      if (this.multipleValues)
         key = dojo.string.trim(this.keyArr[this.keyIdx]);
      else
         key = dojo.string.trim(this.focusNode.value);

      // The result is in html format, so no further formatting and highlighting
      // is needed

      return {
         html : true,
         label : label
      };
   },

   _startSearch : function( /* String */key) {
      // don't send requests when there is no input
      if (!key || !key.trim().length) {
         return;
      }
      // don't send requests when the input is the same
      if (this.previousKey && this.previousKey.trim() === key.trim()) {
         return;
      }

      this.previousKey = key;
      this.inherited(arguments);

   }
});
