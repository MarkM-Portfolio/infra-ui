/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.User");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.misc");

dojo.declare("lconn.share.bean.User", null, {
   constructor: function(e) {
      this.id = lconn.share.util.dom.getChildElementTextContentNS(e, "userid", lconn.share.util.dom.NAMESPACES.SNX) || lconn.share.util.dom.getChildElementTextContentNS(e, "uid", lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM);
      this.uri = lconn.share.util.dom.getChildElementTextContentNS(e, "uri", lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM) || lconn.share.util.dom.getChildElementTextContent(e, "uri");
      this.name = lconn.share.util.dom.getChildElementTextContentNS(e, "name", lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM) || lconn.share.util.dom.getChildElementTextContent(e, "name");
      this.email = lconn.share.util.dom.getChildElementTextContentNS(e, "email", lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM) || lconn.share.util.dom.getChildElementTextContent(e, "email");
      this.hasEmail = (this.email != null && typeof(this.email) != "undefined") || (lconn.share.util.text.trim(this.email).length > 0);
      this.userState = lconn.share.util.dom.getChildElementTextContentNS(e, "userState", lconn.share.util.dom.NAMESPACES.SNX);
   }
});

dojo.declare("lconn.share.bean.UserFromCMIS", null, {
   constructor: function(e) {
      var qud = lconn.share.util.dom;
      this.id = qud.xpathString(e, "lcmis:principalId/text()");
      this.name = qud.xpathString(e, "cmis:value/text()");
      this.email = qud.xpathString(e, "lcmis:email/text()");
      this.hasEmail = (this.email != null && typeof(this.email) != "undefined") || (lconn.share.util.text.trim(this.email).length > 0);
   }
});

dojo.declare("lconn.share.bean.UserFromJson", null, {
   //lconn.files.widget.FolderInfo uses ["snx:userid"] directly
   constructor: function(d) {
      if (dojo.isArray(d)) {
         this.id = d[0]["snx:userid"] || lconn.share.util.misc.indexById(d,"name","snx:userid").children[0];
         this.name = lconn.share.util.misc.indexById(d,"name","name").children[0];
         this.email = lconn.share.util.misc.indexById(d,"name","email").children[0];
         this.userState = d[0]["snx:userState"] || lconn.share.util.misc.indexById(d,"name","snx:userState").children[0];
      }
      else {
         this.id = d["snx:userid"] || lconn.share.util.misc.indexById(d.extensions,"name","snx:userid").children[0];
         this.name = d.name;
         this.email = d.email;
         this.userState = d["snx:userState"] || d.userState;
      }
      this.hasEmail = (this.email != null && typeof(this.email) != "undefined") || (lconn.share.util.text.trim(this.email).length > 0);
   }
});

lconn.share.bean.User.decodeUserUri = function(s) {
   return decodeURIComponent(s.replace("+"," "));
}
