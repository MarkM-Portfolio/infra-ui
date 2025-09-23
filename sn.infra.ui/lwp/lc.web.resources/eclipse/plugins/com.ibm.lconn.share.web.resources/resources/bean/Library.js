/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Library");
dojo.require("lconn.share.bean.User");

dojo.declare("lconn.share.bean.Library", null, {
   constructor: function(e) {
      this.e = e;
   },
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "id");},
   getId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getUrlEntry: function() {return this.getUrlFeed();},
   getUrlFeed: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href"));},
   getOwner: function() {
      if (!this.author)
         this.author = new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
      return this.author;
   },
   
   getSize: function() {return parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e, "librarySize", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));},
   getTrashSize: function() {return parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e, "totalRemovedSize", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));},
   getQuota: function() {return parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e, "libraryQuota", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));},
   hasQuota: function() {return (this.getQuota() > 0);},
   
   getDefaultDocumentUuid: function() {
      var d = this.getDefaultDocument();
      if (d)
         return d.getId();
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "defaultDocumentUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getDefaultDocument : function () {
      var d = this.defaultDocument;
      if (!d) {
         var el = lconn.share.util.dom.getElementsByTagNameNS(this.e, "defaultDocument", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (el) {
            el = el.getElementsByTagName("entry")[0];
            if (el)
               d = this.defaultDocument = new lconn.share.bean.Page(el);
         }
      }
      return d;
   }, 
   getPermissions: function() {
      if (!this.permissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "permissions", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {};
         if (s)
            dojo.forEach(s.split(", "), function(a) {if (a && a.length > 0) p[a] = true;});
         this.permissions = p;
      }
      return this.permissions;
   }
});

dojo.declare("lconn.share.bean.LibraryFromFeed", [lconn.share.bean.Library], {
   constructor: function(e) {},
   
   //FIXME: needs to get a different URL
   getUrlEntry: function() {
      var url = this.urlEntry;
      if (!url) {
         url = lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href"));
         url = lconn.share.util.dom.parseUri(url);
         url.path = url.path.replace(/\/feed$/,"/entry");
         url = this.urlEntry = lconn.share.util.dom.writeUri(url);
      }
      return url;
   }
});
lconn.share.bean.Library.createBean = function(e, opt) {
   if (opt && opt.apiType == "cmis")
      throw new Error("Unsupported owned library in CMIS community");
   else
      return new lconn.share.bean.Library(e);
};
