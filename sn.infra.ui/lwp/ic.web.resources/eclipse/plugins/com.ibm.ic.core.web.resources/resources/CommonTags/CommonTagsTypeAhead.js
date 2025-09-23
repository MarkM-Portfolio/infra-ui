/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/i18n",
   "dojo/i18n!ic-core/nls/strings",
   "dojo/text!ic-core/CommonTags/templates/typeAhead.html",
   "dijit/_Templated",
   "dijit/_Widget",
   "../TypeAhead",
   "../util/html"
], function (dojo, declare, i18n, i18nstrings, template, _Templated, _Widget, TypeAhead, htmlUtil) {

    //FIXME: scope smaller or replace with new typeahead

   var CommonTagsTypeAhead = declare("lconn.core.CommonTags.CommonTagsTypeAhead", TypeAhead, {
      hideEmptyResults : true,
      templateString : null,
      templateString : template,
      submitFormOnNonSelectingEnter : true,

      postMixInProperties : function() {
         this.inherited(arguments);
         var b = i18nstrings;
         this.hintText = this.hintText || b.rs_searchInputDefault;
      },

      formatItem : function(item, html) {
         var label = this._getLabelFromItem(item);
         return html ? htmlUtil.encodeHtml(label) : label;
      },

      _getLabelFromItem : function(item) {
         var buf = [];
         if (item) {
            if (typeof item == "string")
               return item;
            var name = item.name || item.displayName;
            if (name) {
               buf.push(name);
            }
         }
         return buf.join(' ');
      }
   });

   return CommonTagsTypeAhead;
});
