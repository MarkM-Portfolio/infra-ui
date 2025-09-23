/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.mentions.PersonMentionsNode");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.lconn.layout.people");
dojo.require("lconn.core.widget.mentions.MentionsNode");

(function() {

   var TYPE = "PersonMentions";

/**
 * Widget representing a person mention node
 * 
 * @class lconn.core.widget.mentions.PersonMentionsNode
 * @extends lconn.core.widget.mentions.MentionsNode
 * @author Piyush K Agarwal <pagarwal@us.ibm.com>
 */
dojo.declare("lconn.core.widget.mentions.PersonMentionsNode", [ lconn.core.widget.mentions.MentionsNode ], /** @lends lconn.core.widget.mentions.PersonMentionsNode.prototype */ {

   type : TYPE,
   _hasSymbol : true,
   _userData : null,

   //isExternal property
   EXTERNAL_PROP: "EXTERNAL",

   constructor : function(args) {
      this.className = "PersonMentionsNode";
   },

   setUserId : function(userId) {
      this.setData(userId);
   },

   getUserId : function() {
      return this.data;
   },

   getUserData : function() {
      return this._userData;
   },

   setUserData : function(data) {
      this._userData = data;
      this.setValue(this._userData.name);
      this.setUserId(this._userData.userid);
   },

   getUserExternalMode : function() {
       return dojo.getObject("ext.mode", false, this.getUserData());
   },

   getUserOrgId : function() {
       return dojo.getObject("ext.orgId", false, this.getUserData());
   },

   isUserExternal : function() {
       return this.getUserExternalMode() === this.EXTERNAL_PROP;
   },

   setComplete : function(isComplete, completeData, disableBizCard) {
      this.setUserData(completeData);

      if (dojo.exists("com.ibm.lconn.layout.people")) {
         var personLink = com.ibm.lconn.layout.people.createLink({
            name : this.bidiSymbol() + this.value,
            userid : this.data
         });
      }

      if (!personLink) {
         personLink = dojo.create("span", {
            "aria-describedby" : "semtagmenu",
            className : "fn lotusBold",
            innerHTML : this.bidiSymbol() + this.value + "<span style='display: none;' class='x-lconn-userid'>" + this.data + "</span>"
         });
      }

      this.linkNode = dojo.place(personLink, this.linkNode, "replace");
      if (!disableBizCard && window.SemTagSvc && SemTagSvc.parseDom) {
         SemTagSvc.parseDom(0, this.domNode);
      }
      dojo.attr(this.linkNode, "target", "_blank");

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
      var ret = {
         type : this.type,
         displayName : this.value,
         hasSymbol : this._hasSymbol,
         userId : this.data
      };
      if (this._userData)
         ret.userData = this._userData;
      return ret;
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
      } else {
         return null;
      }
   },

   stringSplice : function(curString, idx, numCharsToRemove, insertString) {
      return (curString.slice(0, idx) + (insertString || "") + curString.slice(idx + Math.abs(numCharsToRemove)));
   }
});

/**
 * Type of this mention
 * 
 * @memberof lconn.core.widget.mentions.PersonMentionsNode
 * @type {String}
 */
lconn.core.widget.mentions.PersonMentionsNode.TYPE = TYPE;

})();
