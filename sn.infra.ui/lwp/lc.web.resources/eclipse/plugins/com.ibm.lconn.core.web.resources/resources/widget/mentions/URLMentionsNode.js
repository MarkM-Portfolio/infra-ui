/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.mentions.URLMentionsNode");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.widget.mentions.MentionsNode");

(function() {

   var TYPE = "URLMentions";

/**
 * Widget representing a URL mention node
 *
 * @class lconn.core.widget.mentions.URLMentionsNode
 * @extends lconn.core.widget.mentions.MentionsNode
 * @author Piyush K Agarwal <pagarwal@us.ibm.com>
 */
dojo.declare("lconn.core.widget.mentions.URLMentionsNode", [ lconn.core.widget.mentions.MentionsNode ], /** @lends lconn.core.widget.mentions.URLMentionsNode.prototype */ {

   templatePath : dojo.moduleUrl("lconn.core", "widget/mentions/templates/URLMentionsNode.html"),
   _hasSymbol : false,
   symbol : "",
   type : TYPE,
   hasPreview: false,

   constructor : function(args) {
      this.className = "URLMentionsNode";
   },

   setValue : function(value) {
      this.value = value;
      if (dojo.isIE) {
         this.linkNode.innerText = this.value;
      } else {
         this.linkNode.innerHTML = this.value;
      }

      var link = this.value;
      if(this.value.indexOf("://") == -1) {
         link = "http:" + "//" + link;
      }

      this.href = link;

      dojo.attr(this.linkNode, "class", "");
      dojo.attr(this.linkNode, "target", "_blank");
      dojo.attr(this.linkNode, "href", link);
   },

   toJsonString : function() {
      return {
         type : this.type,
         value : this.value,
         hasSymbol : this._hasSymbol,
         hasPreview: this.hasPreview,
         previewData: (this.previewNode && this.previewNode.data) ? this.previewNode.data : "",
         href : this.href
      };
   }
});

/**
 * Type of this mention
 *
 * @memberof lconn.core.widget.mentions.URLMentionsNode
 * @type {String}
 */
lconn.core.widget.mentions.URLMentionsNode.TYPE = TYPE;

})();
