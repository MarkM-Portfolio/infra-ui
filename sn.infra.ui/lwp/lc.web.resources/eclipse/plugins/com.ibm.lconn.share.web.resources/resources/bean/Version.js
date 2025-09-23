/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Version");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.bean.User");
dojo.require("lconn.share.bean.ConfigurableBean");

dojo.declare("lconn.share.bean.Version", lconn.share.bean.ConfigurableFile, {
   constructor: function(entry) {
      this.e = entry;
   },
   getEntry: function() {return this.e;},
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "id");},
   getId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getLibraryId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "libraryId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getDocumentId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getVersionLabel: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "versionLabel", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getName: function() {
      return this.getLabel();
   },
   getTitle: function() {
      return lconn.share.util.dom.getChildElementTextContent(this.e, "title");
   },
   getLabel: function() {
      var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "label", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      if (!s || s.length == 0)
         s = this.getTitle();
      return s;
   },
   getChangeSummary: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "summary");},
   getObjectTypeId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "objectTypeId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getOwner: function() {
      if (!this.author)
         this.author = new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
      return this.author;
   },
   getModifier: function() {
      if (!this.modifier) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "modifier", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.modifier = new lconn.share.bean.User(e);
      }
      return this.modifier;
   },
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
   getUrlEntry: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href"));},
   getUrlDownload: function() {
      if (!this.urlDownload)
         this.urlDownload = lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "href");
      return this.urlDownload;
   },
   getSize: function() {return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "length"));},
   getPermissions: function() {
      if (!this.permissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "permissions", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {View:true};
         if(s)
	         dojo.forEach(s.split(", "), function(a) {if (a && a.length > 0) p[a] = true;});
         this.permissions = p;
      }
      return this.permissions;
   }
});

