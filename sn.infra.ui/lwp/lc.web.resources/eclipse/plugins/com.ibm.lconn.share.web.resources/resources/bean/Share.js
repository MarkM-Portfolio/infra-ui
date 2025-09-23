/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Share");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.bean.User");

dojo.declare("lconn.share.bean.Share", null, {
   constructor: function(entry) {
      this.e = entry;
   },
   getEntry: function() {return this.e;},
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "id");},
   getCategory: function() {return "share";},

   getId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getGroupId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "shareGroupId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getDescription: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "summary");},

   getCreator: function() {
      if (!this.author)
         this.author = new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
      return this.author;
   },
   getShareTarget: function() {
      return this.getShareTargets()[0];
   },
   getShareTargets: function() {
      if (!this.shareTargets) {
         this.shareTargets = [];
         var sharedWith = lconn.share.util.dom.getElementsByTagNameNS(this.e, "sharedWith", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (sharedWith) {
            var users = lconn.share.util.dom.getElementsByTagNameNS(this.e, "user", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
            for (var i=0; i<users.length; i++)
               this.shareTargets.push(new lconn.share.bean.User(users[i]));
         }
      }
      return this.shareTargets;
   },
   getShareTargetCount: function() {
      var count = -1;
      var sharedWith = lconn.share.util.dom.getElementsByTagNameNS(this.e, "sharedWith", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
      if (sharedWith)
         count = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementTextContentNS(sharedWith, "sharedWithCount", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE), -1);
      return count;
   },
   getSharedResourceId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "sharedWhat", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getSharedResourceVisibility: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "visibility", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getSharedResourceName: function() {return lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "title");},
   getSharedResourceSize: function() {return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "length"));},
   getSharedResourceUrlEntry: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "related", "href"));},
   getSharedResourceOwner: function() {
      if (!this.owner)
         this.owner = new lconn.share.bean.User(lconn.share.util.dom.getElementsByTagNameNS(this.e, "documentOwner", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0]);
      return this.owner;
   },
   getSharedResourceType: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "sharedResourceType", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getSharedResourceTimesDownloaded: function() {return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/hit"));},
   getPermissions: function() {
      if (!this.permissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "sharePermission", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {View:true};
         if(s)
            dojo.forEach(s.split(", "), function(a) {if (a && a.length > 0) p[a] = true;});
         this.permissions = p;
      }
      return this.permissions;
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

   getAllSharesCount: function() {return this.getShareCount() + this.getCollectionCount();},
   getShareCount: function() {
      if (typeof this.shareCount == "undefined")
         this.shareCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/share"),0);
      return this.shareCount;
   },
   getCollectionCount: function() {
      if (typeof this.collectionCount == "undefined")
         this.collectionCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/collection"),0);
      return this.collectionCount;
   },

   getUrlDownload: function() {return lconn.share.util.uri.rewriteUri(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "href"), {errorPage:true});},
   getUrlEntry: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href"));}
});

