/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.CommonTags.CommonTagsTypeAhead");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.TypeAhead");
dojo.require("lconn.core.util.html");

(function(htmlUtil) {

dojo.requireLocalization("lconn.core", "strings"); // FIXME: scope smaller or
                                                   // replace with new typeahead

dojo.declare("lconn.core.CommonTags.CommonTagsTypeAhead", lconn.core.TypeAhead, {
   hideEmptyResults : true,
   templateString : null,
   templatePath : dojo.moduleUrl("lconn.core", "CommonTags/templates/typeAhead.html"),
   submitFormOnNonSelectingEnter : true,

   postMixInProperties : function() {
      this.inherited(arguments);
      var b = dojo.i18n.getLocalization('lconn.core', 'strings');
      this.hintText = this.hintText || b.rs_searchInputDefault;
   },

   formatItem: function(item, html) {
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

}(lconn.core.util.html));
