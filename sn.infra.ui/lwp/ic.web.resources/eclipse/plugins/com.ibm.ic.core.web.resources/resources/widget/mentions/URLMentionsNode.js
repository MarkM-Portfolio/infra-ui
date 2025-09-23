/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/dom-attr",
   "dojo/has",
   "dojo/text!ic-core/widget/mentions/templates/URLMentionsNode.html",
   "dijit/_Templated",
   "dijit/_Widget",
   "ic-core/widget/mentions/MentionsNode"
], function (dojo, declare, domAttr, has, template, _Templated, _Widget, MentionsNode) {

   var TYPE = "URLMentions";

   /**
    * Widget representing a URL mention node
    *
    * @class ic-core.widget.mentions.URLMentionsNode
    * @extends ic-core.widget.mentions.MentionsNode
    * @author Piyush K Agarwal <pagarwal@us.ibm.com>
    */
   var URLMentionsNode = declare("lconn.core.widget.mentions.URLMentionsNode", MentionsNode, /** @lends ic-core.widget.mentions.URLMentionsNode.prototype */ {

      templateString: template,
      _hasSymbol : false,
      symbol : "",
      type : TYPE,
      hasPreview: false,

      constructor : function(args) {
         this.className = "URLMentionsNode";
      },

      setValue : function(value) {
         this.value = value;
         if (has("ie")) {
            this.linkNode.innerText = this.value;
         } else {
            this.linkNode.innerHTML = this.value;
         }

         var link = this.value;
         if(this.value.indexOf("://") == -1) {
            link = "http:" + "//" + link;
         }

         this.href = link;

         domAttr.set(this.linkNode, "class", "");
         domAttr.set(this.linkNode, "target", "_blank");
         domAttr.set(this.linkNode, "href", link);
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
    * @memberof ic-core.widget.mentions.URLMentionsNode
    * @type {String}
    */
   URLMentionsNode.TYPE = TYPE;

   return URLMentionsNode;
});
