/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Attachment");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.bean.User");

dojo.declare("lconn.share.bean.Attachment", null, {
   constructor: function(entry) {
      this.e = entry;
   },
   getEntry: function() {return this.e;},
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "id");},
   getId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getDocumentId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getDescription: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "summary");},
   getLabel: function() {
      var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "label", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      if (!s || s.length == 0)
         s = lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "title");
      if (!s || s.length == 0)
         s = lconn.share.util.dom.getChildElementTextContent(this.e, "title");
      return s;
   },
   getName: function() {
      return this.getLabel();
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
      if (!this.updated)
         this.updated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "modified", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getSystemLastModified();
      return this.updated;
   },
   getPublished: function() {
      if (!this.published)
         this.published = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "created", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getSystemCreated();
      return this.published;
   },
   getSystemLastModified: function() {
      if (!this.systemLastModified)
         this.systemLastModified = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e, "updated"));
      return this.systemLastModified;
   },
   getSystemCreated: function() {
      if (!this.systemCreated)
         this.systemCreated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e, "published"));
      return this.systemCreated;
   },
   getPermissions: function() {
      if (!this.permissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "permissions", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {View:true};
         if(s)
            dojo.forEach(s.split(", "), function(a) {if (a && a.length > 0) p[a] = true;});
         this.permissions = p;
      }
      return this.permissions;
   },
   getSize: function() {return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "length"));},
   getUrlEntry: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href"));},
   getUrlDownload: function() {
      if(!this.urlDownload) {
         this.urlDownload = lconn.share.util.uri.rewriteUri(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "href"), {errorPage:true});
         // Workaround for d229624 - filename must go on the end of the URL
         if(dojo.isIE)
            this.urlDownload += ("&f=" + encodeURIComponent(this.getName()));
      }
      return this.urlDownload;
   }
});

