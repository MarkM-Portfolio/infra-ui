/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
dojo.provide("lconn.core.widget.mentions.TagMentionsNode");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.widget.mentions.MentionsNode");

(function() {

   var TYPE = "TagMentions";

/**
 * Widget representing a hashtag node
 * 
 * @class lconn.core.widget.mentions.TagMentionsNode
 * @extends lconn.core.widget.mentions.MentionsNode
 * @author Piyush K Agarwal <pagarwal@us.ibm.com>
 */
dojo.declare("lconn.core.widget.mentions.TagMentionsNode", [ lconn.core.widget.mentions.MentionsNode ], /** @lends lconn.core.widget.mentions.TagMentionsNode */ {

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
 * @memberof lconn.core.widget.mentions.TagMentionsNode
 * @type {String}
 */
lconn.core.widget.mentions.TagMentionsNode.TYPE = TYPE;

})();
