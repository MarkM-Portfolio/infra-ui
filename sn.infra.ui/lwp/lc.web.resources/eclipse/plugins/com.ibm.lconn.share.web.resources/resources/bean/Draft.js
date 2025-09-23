/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Draft");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.bean.File");
dojo.require("lconn.share.bean.User");

dojo.declare("lconn.share.bean.Draft", lconn.share.bean.File, {	
   getCategory: function() {return "draft";},
   getContent : function () {      
      return this.content || lconn.share.util.dom.getChildElementTextContent(this.e, "content");
   },
   
   /*getExpiration: function() {
      if (typeof this.expires == "undefined")
         this.expires = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "expires", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
      return this.expires;
   },*/
   
   // getDocument* methods return information about the draft's parent document if one exists, some information is not automatically
   // included with the draft entry
   getDocumentAuthor: function() {
      if (typeof this.documentAuthor == "undefined") {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "documentOwner", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         this.documentAuthor = (e) ? new lconn.share.bean.User(e) : null;
      }
      return this.documentAuthor;   
   },
   getDocumentId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getDocumentUpdated: function() {
      if (!this.documentUpdated)
         this.documentUpdated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentModified", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getSystemLastModified();
      return this.documentUpdated;
   },
   getDocumentPublished: function() {
      if (!this.documentPublished)
         this.documentPublished = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentCreated", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getSystemLastModified();
      return this.documentPublished;
   },
   getDocumentSystemLastModified: function() {
      if (!this.documentLastModified)
         this.documentLastModified = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentUpdated", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getSystemLastModified();
      return this.documentLastModified;
   },
   getDocumentSystemCreated: function() {
      if (!this.documentCreated)
         this.documentCreated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentPublished", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getSystemLastModified();
      return this.documentCreated;
   },

   getDocumentModifier: function() {
      if (typeof this.modifier == "undefined") {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "documentModifier", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         this.modifier = (e) ? new lconn.share.bean.User(e) : null;
      }
      return this.modifier;
   }
});
