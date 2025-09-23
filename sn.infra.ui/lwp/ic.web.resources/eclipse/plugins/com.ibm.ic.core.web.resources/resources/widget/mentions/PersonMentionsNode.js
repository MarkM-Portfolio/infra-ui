/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/dom-attr",
   "dojo/dom-construct",
   "dijit/_Templated",
   "dijit/_Widget",
   "ic-ui/layout/people",
   "ic-core/widget/mentions/MentionsNode"
], function (dojo, declare, domAttr, domConstruct, _Templated, _Widget, people, MentionsNode) {

   var TYPE = "PersonMentions";

   /**
    * Widget representing a person mention node
    *
    * @class ic-core.widget.mentions.PersonMentionsNode
    * @extends ic-core.widget.mentions.MentionsNode
    * @author Piyush K Agarwal <pagarwal@us.ibm.com>
    */
   var PersonMentionsNode = declare("lconn.core.widget.mentions.PersonMentionsNode", MentionsNode, /** @lends ic-core.widget.mentions.PersonMentionsNode.prototype */ {

      type : TYPE,
      _hasSymbol : true,

      constructor : function(args) {
         this.className = "PersonMentionsNode";
      },

      setUserId : function(userId) {
         this.setData(userId);
      },

      getUserId : function() {
         return this.data;
      },

      setComplete : function(isComplete, completeData, disableBizCard) {
         this.setValue(completeData.name);
         this.setUserId(completeData.userid);
         var personLink;
         if (people.createLink) {
            personLink = people.createLink({
               name : this.bidiSymbol() + this.value,
               userid : this.data
            });
         }

         if (!personLink) {
            personLink = domConstruct.create("span", {
               "aria-describedby" : "semtagmenu",
               className : "fn lotusBold",
               innerHTML : this.bidiSymbol() + this.value + "<span style='display: none;' class='x-lconn-userid'>" + this.data + "</span>"
            });
         }

         this.linkNode = domConstruct.place(personLink, this.linkNode, "replace");
         if (!disableBizCard && window.SemTagSvc && SemTagSvc.parseDom) {
            SemTagSvc.parseDom(0, this.domNode);
         }
         domAttr.set(this.linkNode, "target", "_blank");

         this.inherited(arguments);
      },

      removeSymbol : function() {
         var valueNode = this.getLinkValueNode();
         var text = valueNode.data;
         if (text.search(this.bidiSymbol()) == 0) {
            text = this.stringSplice(text, 0, this.bidiSymbol().length);
            valueNode.data = text;
            this._hasSymbol = false;
         }
      },

      addSymbol : function() {
         var valueNode = this.getLinkValueNode();
         var text = valueNode.data;
         if (text.search(this.bidiSymbol()) != 0) {
            text = this.stringSplice(text, 0, 0, this.bidiSymbol());
            valueNode.data = text;
            this._hasSymbol = true;
         }
      },

      toString : function() {
         return this.value;
      },

      toJsonString : function() {
         return {
            type : this.type,
            displayName : this.value,
            hasSymbol : this._hasSymbol,
            userId : this.data
         };
      },

      parseNode : function(node) {
         if (node) {
            this.setUserId(node.firstChild.href.split("uid=")[1]);
            this.setValue(node.textContent || node.innerText);
         }
      },

      getTextNode : function() {
         if (this.linkNode) {
            return this.linkNode.firstChild;
         }
         return null;
      },

      stringSplice : function(curString, idx, numCharsToRemove, insertString) {
         return (curString.slice(0, idx) + (insertString || "") + curString.slice(idx + Math.abs(numCharsToRemove)));
      }
   });

   /**
    * Type of this mention
    *
    * @memberof ic-core.widget.mentions.PersonMentionsNode
    * @type {String}
    */
   PersonMentionsNode.TYPE = TYPE;

   return PersonMentionsNode;
});
