/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_Templated",
   "dijit/_Widget",
   "ic-core/widget/mentions/MentionsNode"
], function (declare, _Templated, _Widget, MentionsNode) {

   var TYPE = "TagMentions";

   /**
    * Widget representing a hashtag node
    *
    * @class ic-core.widget.mentions.TagMentionsNode
    * @extends ic-core.widget.mentions.MentionsNode
    * @author Piyush K Agarwal <pagarwal@us.ibm.com>
    */
   var TagMentionsNode = declare("lconn.core.widget.mentions.TagMentionsNode", MentionsNode, /** @lends ic-core.widget.mentions.TagMentionsNode */ {

      _hasSymbol : true,
      symbol : "#",
      type : TYPE,

      constructor : function(args) {
         this.className = "TagMentionsNode";
      },

      toJsonString : function() {
         return {
            type : this.type,
            value : this.value
         };
      }
   });

   /**
    * Type of this mention
    *
    * @memberof ic-core.widget.mentions.TagMentionsNode
    * @type {String}
    */
   TagMentionsNode.TYPE = TYPE;

   return TagMentionsNode;
});
