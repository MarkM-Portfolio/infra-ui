/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/array",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-attr",
   "dojo/has",
   "dojo/on",
   "dojo/dom-geometry",
   "dojo/text!ic-core/widget/mentions/templates/MentionsNode.html",
   "dijit/_Templated",
   "dijit/_Widget",
   "../../globalization/bidiUtil",
], function (dojo, array, declare, lang, domAttr, has, on, domGeom, template, _Templated, _Widget, bidiUtil) {

   var TYPE = "mentions";

   /**
    * Widget representing an abstract mention node
    * 
    * FIXME: move to ic-ui/mentions
    * 
    * @class ic-core.widget.mentions.MentionsNode
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @author Piyush K Agarwal <pagarwal@us.ibm.com>
    */
   var MentionsNode = declare("lconn.core.widget.mentions.MentionsNode", [ _Widget, _Templated ], /** @lends ic-core.widget.mentions.MentionsNode.prototype */ {

      // Templated Args
      templateString: template,
      widgetsInTemplate : false,

      // MentionNode Args
      idx : 0,
      // Id of the mention
      symbol : "@",
      // Symbol used to activate this mention
      bidiSymbol : function() {
         var isRTLMention = bidiUtil.isRTLValue(this.value);
         // Connections is in an RTL language (ie: Arabic) && the mention is in LTR language (ie: English) = enforceTextDirection
         return !domGeom.isBodyLtr() && !isRTLMention ? bidiUtil.enforceTextDirection(this.symbol, 'ltr') : this.symbol;
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

         if (this.textAreaNode) {
            // Prevent drag and drop on @mentions for now due to differences in how each browser handles it
            on(this.textAreaNode, "drop", lang.hitch(this, this.cancelEvent)); // For FF
            on(this.textAreaNode, "dragover", lang.hitch(this, this.cancelEvent)); // Needs to be cancelled for WebKit
         }
         // Event to work around the bizcard focus issue when selecting text in @mentions
         // dojo.connect(this.domNode, "onmouseenter", this, this.disableBizCardFocus);
         on(this.domNode, "resizestart", lang.hitch(this, this.preventResize));
      },

      preventResize : function(e) {
         return false;
      },

      disableBizCardFocus : function(e) {
         // hack around LCSemTagMenu.focusA11Y method to avoid losing focus from mentions
         var disableFocus = domAttr.get(this.domNode.parentNode, 'disableBizCardFocus');
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
         if (has("ie")) {
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
         domAttr.set(this.domNode, "contentEditable", !isComplete);
         array.forEach(this.domNode.childNodes, function(node, i) {
            if (node && node.nodeType == "1") {
               domAttr.set(node, "contentEditable", !isComplete);
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
    * @memberof ic-core.widget.mentions.MentionsNode
    * @type {String}
    */
   MentionsNode.TYPE = TYPE;

   return MentionsNode;
});
