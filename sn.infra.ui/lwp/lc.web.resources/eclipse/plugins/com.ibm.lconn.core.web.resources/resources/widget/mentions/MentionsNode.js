/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.mentions.MentionsNode");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require('lconn.core.globalization.bidiUtil');

(function() {

   var TYPE = "mentions";

/**
 * Widget representing an abstract mention node
 * 
 * @class lconn.core.widget.mentions.MentionsNode
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @author Piyush K Agarwal <pagarwal@us.ibm.com>
 */
dojo.declare("lconn.core.widget.mentions.MentionsNode", [ dijit._Widget, dijit._Templated ], /** @lends lconn.core.widget.mentions.MentionsNode.prototype */ {

   // Templated Args
   templatePath : dojo.moduleUrl("lconn.core", "widget/mentions/templates/MentionsNode.html"),
   widgetsInTemplate : false,

   // MentionNode Args
   idx : 0,
   // Id of the mention
   symbol : "@",
   // Symbol used to activate this mention
   bidiSymbol : function() {
      var isRTLMention = lconn.core.globalization.bidiUtil.isRTLValue(this.value);
      // Connections is in an RTL language (ie: Arabic) && the mention is in LTR language (ie: English) = enforceTextDirection
      return !dojo.isBodyLtr() && !isRTLMention ? lconn.core.globalization.bidiUtil.enforceTextDirection(this.symbol, 'ltr') : this.symbol;
   },
   // Symbol used to complete this mention
   type : TYPE,
   // Type of mention (used in JSON output)
   value : "",
   // Display value of mention
   data : "",
   // Data of mention
   isComplete : false,
   // Is the mention complete
   textRange : null,
   // The location of the mention
   constructor : function(args) {
      if (args) {
         dojo.safeMixin(this, args);
      }

      this.className = "MentionsNode";
   },

   postCreate : function() {
      this.inherited(arguments);
      this.setValue(this.value);

      // Prevent drag and drop on @mentions for now due to differences in how each browser handles it
      dojo.connect(this.textAreaNode, "ondrop", this, this.cancelEvent); // For FF
      dojo.connect(this.textAreaNode, "ondragover", this, this.cancelEvent); // Needs to be cancelled for WebKit
      // Event to work around the bizcard focus issue when selecting text in @mentions
      // dojo.connect(this.domNode, "onmouseenter", this, this.disableBizCardFocus);
      dojo.connect(this.domNode, "onresizestart", this, this.preventResize);
   },

   preventResize : function(e) {
      return false;
   },

   disableBizCardFocus : function(e) {
      // hack around LCSemTagMenu.focusA11Y method to avoid losing focus from mentions
      var disableFocus = dojo.attr(this.domNode.parentNode, 'disableBizCardFocus');
      if (disableFocus) {
         e.preventDefault();
         this.domNode.parentNode.focus();
      }
   },

   /*
    * FIXME: really?
    */
   cancelEvent : function(e) {
      e.preventDefault();
      return false;
   },

   setValue : function(value) {
      this.value = value;
      if (dojo.isIE) {
         this.linkNode.innerText = this.value;
      } else {
         this.linkNode.innerHTML = this.value;
      }
   },

   setData : function(data) {
      this.data = data;
   },

   setTextRange : function(range) {
      this.textRange = range;
   },

   setComplete : function(isComplete) {
      this.isComplete = isComplete;
      // need to set !isComplete because we want the content to be not editable..
      dojo.attr(this.domNode, "contentEditable", !isComplete);
      dojo.forEach(this.domNode.childNodes, function(node, i) {
         if (node && node.nodeType == "1") {
            dojo.attr(node, "contentEditable", !isComplete);
         }
      });
   },

   toString : function() {
      return this.value;
   },

   toJsonString : function() {
      return {
         type : this.type,
         value : this.value,
         data : this.data
      };
   },

   getTextNode : function() {
      if (this.linkNode) {
         return this.linkNode.firstChild;
      } else {
         return null;
      }
   },

   getLinkValueNode : function() {
      var valueNode = null;

      for (i = 0; i < this.linkNode.childNodes.length; i++) {
         var curNode = this.linkNode.childNodes[i];
         if (curNode.nodeType == 3) {
            valueNode = curNode;
         }
      }

      return valueNode;
   }
});

/**
 * Type of this mention
 * 
 * @memberof lconn.core.widget.mentions.MentionsNode
 * @type {String}
 */
lconn.core.widget.mentions.MentionsNode.TYPE = TYPE;

})();
