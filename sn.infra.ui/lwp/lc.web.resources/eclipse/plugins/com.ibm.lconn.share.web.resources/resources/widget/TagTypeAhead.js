/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.TagTypeAhead");
dojo.require("lconn.share.widget.TypeAhead");
dojo.declare("lconn.share.widget.TagTypeAhead", [lconn.share.widget.TypeAhead], {
   
   autoReplace: /[\s\u3000,]+/g,
   autoSelectChars: [" ", "\u3000", ","],
   
   libraryId: null,
   userLibrary: null,
   
   minChars: 1,
   
   decorateItem: function(el, item) {
      if (item.weight >= 1) {
         // Right-align text
         dojo.addClass(el, "lotusAlignRight");
         
         // Inline hiding bullet for communities
         el.style.listStyle = "none";

         // Move existing nodes into a left-floated span
         var span = document.createElement("span");
            span.className = "lotusLeft";
            while(el.firstChild) span.appendChild(el.firstChild);
         el.appendChild(span);

         // Add the weight
         var span = document.createElement("span");
            span.className = "lotusMeta";
            span.appendChild(document.createTextNode("\u00a0"));
            span.appendChild(document.createTextNode(item.weight));
         el.appendChild(span);
      }
   },
   
   _startSearch: function(/*String*/ key, opt) {
      opt = opt || {};
      opt.userLibrary = opt.userLibrary || this.userLibrary;
      opt.libraryId = opt.libraryId || this.libraryId;
      arguments[1] = opt;
      this.inherited(arguments);
   }
});
