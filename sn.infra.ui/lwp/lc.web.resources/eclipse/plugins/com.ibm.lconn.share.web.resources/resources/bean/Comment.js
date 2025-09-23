/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Comment");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.bean.AbstractModerateBean");
dojo.require("lconn.share.bean.User");

dojo.declare("lconn.share.bean.Comment", lconn.share.bean.AbstractModerateBean, {
   constructor: function(entry) {
      this.e = entry;
   },
   getEntry: function() {return this.e;},
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "id");},
   getId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getDocumentId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getTitle: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "title");},
   getAuthor: function() {
      if (!this.author)
         this.author = new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
      return this.author;
   },
   isDeleted: function() {return (lconn.share.util.dom.getChildElementTextContentNS(this.e, "deleteWithRecord", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");},
   getUpdated: function() {
      if (!this.updated) {
         this.updated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "modified", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
         this.updated = this.updated || lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e, "updated"));
      }
      return this.updated;
   },
   getPublished: function() {
      if (!this.published) {
         this.published = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "created", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
         this.published = this.published || lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e, "published"));
      }
      return this.published;
   },
   getVersionLabel: function() {return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e, "versionLabel", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));},
   getPermissions: function() {
      if (!this.permissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "permissions", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {View:true};
         if (s)
            dojo.forEach(s.split(", "), function(a) {if (a && a.length > 0) p[a] = true;});
         this.permissions = p;
      }
      return this.permissions;
   },
   getDescription: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "summary");},
   getContents: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "content");},
   getContentType: function() {return lconn.share.util.dom.getChildElementAttribute(this.e, "content", "type");},
   getModifier: function() {
      if (!this.modifier) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "modifier", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.modifier = new lconn.share.bean.User(e);
      }
      return this.modifier;
   },
   getUrlEntry: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href"));},
   getUrlDownload: function() {return lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "href");}
});

