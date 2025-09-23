/* Copyright IBM Corp. 2009, 2018  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Collection");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.bean.AbstractCMISBean");
dojo.require("lconn.share.bean.User");
dojo.require("lconn.share.bean.Policy");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.share.bean.Collection", null, {
   constructor: function(entry) {
      this.e = entry;
   },
   isFolder: function(){return true},
   getEntry: function() {return this.e;},
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "id", lconn.share.util.dom.ATOM_NAMESPACE);},
   getId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getName: function() {
      if (!this.title)
         this.title = lconn.share.util.dom.getChildElementTextContent(this.e, "title");
      if (!this.title)
         this.title = lconn.share.util.dom.getChildElementTextContentNS(this.e, "title",lconn.share.util.dom.ATOM_NAMESPACE);
      if (!this.title)
         this.title = lconn.share.util.dom.getChildElementTextContentNS(this.e, "title",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.title;
   },
   getNameNls: function() {
      if (this.isFolder()) {
         return lconn.core.globalization.bidiUtil.enforceTextDirectionEx(this.getName());
      } else {
    	  return lconn.core.globalization.bidiUtil.createSttDisplayString(this.getName(), "URL");
      }
   },
   
   getAuthor: function() {
      if (!this.author)
         this.author = new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
      return this.author;
   },
   getPolicy: function() {
      if (this.policy === undefined && this.e) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "policy", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         this.policy = e? new lconn.share.bean.Policy(e): null;
      }
      return this.policy;
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
   getOrgId: function() {
      if (this._orgId == undefined)
         this._orgId = lconn.share.util.dom.getChildElementTextContentNS(this.e, "orgId", lconn.share.util.dom.SNX_NAMESPACE);
      return this._orgId;
   },
   getOrgName: function() {
      if (this._orgName == undefined)
         this._orgName = lconn.share.util.dom.getChildElementTextContentNS(this.e, "orgName", lconn.share.util.dom.SNX_NAMESPACE);
      return this._orgName;
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
   },
   hasFullPermissions: function() {
      return this.getPermissions().View;
   },
   getVisibility: function() {
      if (!this.visibility)
         this.visibility = lconn.share.util.dom.getChildElementTextContentNS(this.e, "visibility", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.visibility;
   },
   isExternal: function() {
      if (this._isExternal == undefined)
         this._isExternal = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "isExternal", lconn.share.util.dom.SNX_NAMESPACE) == "true");
      return this._isExternal;
   },
   isSyncable: function() {
      if (this._isSyncable == undefined)
         this._isSyncable = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "isSyncable", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this._isSyncable;
   },
   setSyncable: function(flag) {
      this._isSyncable = flag;
   },
   isIndirectSyncable: function() {
      if (this._isIndirectSyncable == undefined)
         this._isIndirectSyncable = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "isIndirectSyncable", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this._isIndirectSyncable;
   },
   setIndirectSyncable: function(flag) {
      this._isIndirectSyncable = flag;
   },
   isPublic: function() {return this.getVisibility() == "public";},
   isPrivate: function() {return this.getVisibility() == "private";},
   isShared: function() {return this.getVisibility() == "shared";},
   getDescription: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "summary");},
   getModifier: function() {
      if (!this.modifier) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "modifier", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.modifier = new lconn.share.bean.User(e);
      }
      return this.modifier;
   },
   getNotifications: function() {
      if (typeof this.notifications == "undefined" && this.e) {
         var n = this.notifications = {};
         var e = lconn.share.util.dom.getChildElementNS(this.e, "notifications", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         if (e) {
            var c;
            for (var i=0; c=e.childNodes[i]; i++)
               if (c.nodeType == 1)
                  n[c.localName || c.baseName] = lconn.share.util.dom.xmlText(c) == "on";
         }
      }
      return this.notifications;
   },
   hasNotifications: function() {
      if (this.notifications)
         return true;
      return (this.e && lconn.share.util.dom.getChildElementNS(this.e, "notifications", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
   },   
   getUrlEntry: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href"));},
   getUrlEdit: function() {
      var qud = lconn.share.util.dom;
      return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "edit", "href", null);
   },
   getUrlAlternate: function() {return lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "alternate", "href");},
   getUrlFeed: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttribute(this.e, "content", "src"));},
   getShareCount: function() {
      if (typeof this.shareCount == "undefined")
         this.shareCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/user"));
      return this.shareCount;
   },
   getGroupCount: function() {
      if (typeof this.groupCount == "undefined")
         this.groupCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/group"));
      return this.groupCount;
   },
   getCollectionCount: function() {
      if (typeof this.collectionCount == "undefined") {
         var count = lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/collections");
         this.collectionCount = typeof count == "undefined" ? 0 : lconn.share.util.text.parseInt(count);
      }
      return this.collectionCount;
   },
   getAllSharesCount: function() {return this.getShareCount() + this.getGroupCount();},
   getMediaCount: function() {
      if (typeof this.mediaCount == "undefined")
         this.mediaCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/documents"));
      return this.mediaCount;
   },
   isSearchable: function() {
      // TODO: enable once QCS supports searching collections
      return false;
   },
   getType: function() {
      if (typeof this.type == "undefined")
         this.type = lconn.share.util.dom.getChildElementTextContentNS(this.e, "type", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.type;
   },
   getParent: function() {
      if (typeof this.parent == "undefined")
         this.parent = lconn.share.util.dom.getElementsByTagNameNS(this.e, "parent", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
      return this.parent;
   },
   getParentId: function() {
      if (typeof this.parentId == "undefined" && !!this.getParent())
         this.parentId = lconn.share.util.dom.getChildElementTextContentNS(this.getParent(), "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.parentId;
   },
   getParentName: function() {
      if (typeof this.parentName == "undefined" && !!this.getParent())
         this.parentName = lconn.share.util.dom.getChildElementTextContentNS(this.getParent(), "title", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.parentName;
   },
   getParentUrlAlternate: function() {
      if (typeof this.parentUrlAlternate == "undefined" && !!this.getParent())
         this.parentUrlAlternate = lconn.share.util.dom.getChildElementAttributeMatching(this.getParent(), "link", "rel", "alternate", "href");
      return this.parentUrlAlternate;
   },
   canFollowing: function() {
      if (typeof this.allowFollowing == "undefined")
         this.allowFollowing = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "allowFollowing", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this.allowFollowing;
   },
   canSetFavorite: function() {
      if (typeof this.allowSetFavorite == "undefined")
         this.allowSetFavorite = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "allowSetFavorite", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this.allowSetFavorite;
   },
   getBreadcrumb: function() {
      if (typeof this.ancestors == "undefined")
         this.ancestors = lconn.share.util.dom.getElementsByTagNameNS(this.e, "ancestors", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
      if (this.ancestors && typeof this.breadcrumbEntries == "undefined") {
         this.breadcrumbEntries = lconn.share.util.dom.getElementsByTagNameNS(this.ancestors, "item", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      }
      if (this.breadcrumbEntries && typeof this.entries == "undefined") {
         this.entries = [];
         for (var i=0; i<this.breadcrumbEntries.length; i++) {
            this.entries.push(new lconn.share.bean.Collection(this.breadcrumbEntries[i]));
         }
      }
      return this.entries;
   }
});

dojo.declare("lconn.share.bean.CollectionFromFeed", null, {
   constructor: function(entry) {
      this.e = entry;
   },
   isFolder: function(){return true},
   getEntry: function() {return this.e;},
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "id");},
   getId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getName: function() {
      if (!this.title)
         this.title = lconn.share.util.dom.getChildElementTextContent(this.e, "title");
      if (!this.title)
         this.title = lconn.share.util.dom.getChildElementTextContentNS(this.e, "title",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.title;
   },
   getNameNls: function() {
      if (this.isFolder()) {
          return lconn.core.globalization.bidiUtil.enforceTextDirectionEx(this.getName());
       } else {
    	   return lconn.core.globalization.bidiUtil.createSttDisplayString(this.getName(), "URL");
       }
   },
   getDescription: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "subtitle");},
   getUrlAlternate: function() {return lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "alternate", "href");},
   getAuthor: function() {
      if (!this.author)
         this.author = new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
      return this.author;
   },
   getPolicy: function() {
      if (this.policy === undefined && this.e) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "policy", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         this.policy = e? lconn.share.bean.Policy.createPolicy(e): null;
      }
      return this.policy;
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
   getOrgId: function() {
      if (this._orgId == undefined)
         this._orgId = lconn.share.util.dom.getChildElementTextContentNS(this.e, "orgId", lconn.share.util.dom.SNX_NAMESPACE);
      return this._orgId;
   },
   getOrgName: function() {
      if (this._orgName == undefined)
         this._orgName = lconn.share.util.dom.getChildElementTextContentNS(this.e, "orgName", lconn.share.util.dom.SNX_NAMESPACE);
      return this._orgName;
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
   },
   hasFullPermissions: function() {
      return this.getPermissions().View;
   },
   getModifier: function() {
      if (!this.modifier) {
         var e = dojo.filter(lconn.share.util.dom.getElementsByTagNameNS(this.e, "modifier", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE), function(el) {return el.parentNode == this;}, this.e);
         if (e[0])
            this.modifier = new lconn.share.bean.User(e[0]);
      }
      return this.modifier;
   },
   getNotifications: function() {
      if (typeof this.notifications == "undefined" && this.e) {
         var n = this.notifications = {};
         var e = lconn.share.util.dom.getChildElementNS(this.e, "notifications", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         if (e) {
            var c;
            for (var i=0; c=e.childNodes[i]; i++)
               if (c.nodeType == 1)
                  n[c.localName || c.baseName] = lconn.share.util.dom.xmlText(c) == "on";
         }
      }
      return this.notifications;
   },
   hasNotifications: function() {
      if (this.notifications)
         return true;
      return (this.e && lconn.share.util.dom.getChildElementNS(this.e, "notifications", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
   }, 
   getVisibility: function() {
      if (!this.visibility)
         this.visibility = lconn.share.util.dom.getChildElementTextContentNS(this.e, "visibility", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.visibility;
   },
   isPublic: function() {return this.getVisibility() == "public";},
   isPrivate: function() {return this.getVisibility() == "private";},
   isShared: function() {return this.getVisibility() == "shared";},
   isExternal: function() {
      if (this._isExternal == undefined)
         this._isExternal = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "isExternal", lconn.share.util.dom.SNX_NAMESPACE) == "true");
      return this._isExternal;
   },
   isSyncable: function() {
      if (this._isSyncable == undefined)
         this._isSyncable = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "isSyncable", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this._isSyncable;
   },
   setSyncable: function(flag) {
      this._isSyncable = flag;
   },
   isIndirectSyncable: function() {
      if (this._isIndirectSyncable == undefined)
         this._isIndirectSyncable = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "isIndirectSyncable", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this._isIndirectSyncable;
   },
   setIndirectSyncable: function(flag) {
      this._isIndirectSyncable = flag;
   },
   getUrlEntry: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "edit", "href"));},
   getUrlFeed: function() {return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href"));},
   getShareCount: function() {
      if (typeof this.shareCount == "undefined")
         this.shareCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/user"));
      return this.shareCount;
   },
   getGroupCount: function() {
      if (typeof this.groupCount == "undefined")
         this.groupCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/group"));
      return this.groupCount;
   },
   getCollectionCount: function() {
      if (typeof this.collectionCount == "undefined") {
         var count = lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/collections");
         this.collectionCount = typeof count == "undefined" ? 0 : lconn.share.util.text.parseInt(count);
      }
      return this.collectionCount;
   },
   getAllSharesCount: function() {return this.getShareCount() + this.getGroupCount();},
   getMediaCount: function() {
      if (typeof this.mediaCount == "undefined")
         this.mediaCount = lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/documents");
      return this.mediaCount;
   },
   getItemCount: function() {
      if (typeof this.itemCount == "undefined") {
         var count = lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/item");
         this.itemCount = typeof count == "undefined" ? 0 : lconn.share.util.text.parseInt(count);
      }
      return this.itemCount;
   },
   getType: function() {
      if (typeof this.type == "undefined")
         this.type = lconn.share.util.dom.getChildElementTextContentNS(this.e, "type", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.type;
   },
   getParent: function() {
      if (typeof this.parent == "undefined")
         this.parent = lconn.share.util.dom.getChildElementNS(this.e, "parent", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.parent;
   },
   getParentId: function() {
      if (typeof this.parentId == "undefined" && !!this.getParent())
         this.parentId = lconn.share.util.dom.getChildElementTextContentNS(this.getParent(), "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.parentId;
   },
   getParentName: function() {
      if (typeof this.parentName == "undefined" && !!this.getParent())
         this.parentName = lconn.share.util.dom.getChildElementTextContentNS(this.getParent(), "title", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.parentName;
   },
   getParentUrlAlternate: function() {
      if (typeof this.parentUrlAlternate == "undefined" && !!this.getParent())
         this.parentUrlAlternate = lconn.share.util.dom.getChildElementAttributeMatching(this.getParent(), "link", "rel", "alternate", "href");
      return this.parentUrlAlternate;
   },
   canFollowing: function() {
      if (typeof this.allowFollowing == "undefined")
         this.allowFollowing = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "allowFollowing", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this.allowFollowing;
   },
   canSetFavorite: function() {
      if (typeof this.allowSetFavorite == "undefined")
         this.allowSetFavorite = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "allowSetFavorite", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this.allowSetFavorite;
   },
   getBreadcrumb: function() {
      if (typeof this.ancestors == "undefined")
         this.ancestors = lconn.share.util.dom.getElementsByTagNameNS(this.e, "ancestors", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
      if (this.ancestors && typeof this.breadcrumbEntries == "undefined") {
         this.breadcrumbEntries = lconn.share.util.dom.getElementsByTagNameNS(this.ancestors, "item", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      }
      if (this.breadcrumbEntries && typeof this.entries == "undefined") {
         this.entries = [];
         for (var i=0; i<this.breadcrumbEntries.length; i++) {
            this.entries.push(new lconn.share.bean.Collection(this.breadcrumbEntries[i]));
         }
      }
      return this.entries;
   }
});

dojo.declare("lconn.share.bean.CollectionFromJson", null, {
   constructor: function(doc) {
      this.d = doc || {};
      if (this.d.lastUpdated)
         this.d.lastUpdated = lconn.share.util.misc.date.convertAtomDate(this.d.lastUpdated);
   },
   isFolder: function(){return true},
   getId: function() {return this.d.id;},
   getOrgId: function() {return this.d.orgId;},
   getName: function() {return this.d.title;},
   getNameNls: function() {
      if (this.isFolder()) {
          return lconn.core.globalization.bidiUtil.enforceTextDirectionEx(this.getName());
       } else {
    	   return lconn.core.globalization.bidiUtil.createSttDisplayString(this.getName(), "URL");
       }
   },
   getVisibility: function() {return this.d.visibility;},
   getMediaCount: function() {return this.d.mediaCount;},
   getItemCount: function() {return this.d.itemCount;},
   getCollectionCount: function() {return this.d.collectionCount;},
   getShareCount: function() {return this.d.userCount;},
   getGroupCount: function() {return this.d.groupCount;},
   getAllSharesCount: function() {return this.getShareCount() + this.getGroupCount();},
   getUpdated: function() {return this.d.lastUpdated;},
   
   isPublic: function() {return this.getVisibility() == "public";},
   isPrivate: function() {return this.getVisibility() == "private";},
   isShared: function() {return this.getVisibility() == "shared";},
   isExternal: function() {return this.d.isExternal;},
   //lconn.files.widget.FolderInfo uses ["td:addedBy"] directly
   getAddedBy: function() {
      if (!this.addedBy)
         this.addedBy = new lconn.share.bean.UserFromJson(this.d["td:addedBy"]);
      return this.addedBy;
   },
   getUrlFeed: function() {return this.d.url;},
   getUrlAlternate: function() {return this.d.url;},
   getSortType: function() {return this.d.sortType;}
});

dojo.declare("lconn.share.bean.PartialCollection", null, {constructor: function(opts) {if (opts) dojo.mixin(this, opts);}});

dojo.declare("lconn.share.bean.CollectionCMIS", [lconn.share.bean.Collection, lconn.share.bean.AbstractCMISBean], {
   // TODO: finish implementing CMIS-specific getters
   getName: function() {
      if(!this.name)
         this.name = this.getPropertyString("cmis:name");
      return this.name;
   },
   getNameNls: function() {
      if (this.isFolder()) {
          return lconn.core.globalization.bidiUtil.enforceTextDirectionEx(this.getName());
       } else {
    	   return lconn.core.globalization.bidiUtil.createSttDisplayString(this.getName(), "URL");
       }
   },
   isFolder: function(){
      return true
   },
   getId: function() {
      if (this.objectId)
         return this.objectId;
      var qud = lconn.share.util.dom;
      this.objectId = this.getPropertyId("cmis:objectId");
      if (!this.objectId)
         this.objectId = qud.xpathString(this.e, "atom:link[@rel='self']/@cmisra:id");
      if (!this.objectId)
         this.objectId = qud.xpathString(this.e, "atom:link[@rel='via']/@cmisra:id");

      return this.objectId;
   },
   isExternal: function() {
      if (typeof this._isExternal == "undefined")
         this._isExternal = this.getPropertyBoolean("snx:isExternal", null);
      return this._isExternal;
   },
   getVisibility: function() {
      if (!this.visibility)
         this.visibility = this.getPropertyString('snx:visibilityComputed');
      return this.visibility;
   },

   getAuthor: function() {
      if (!this.addedBy && this.e)
         this.addedBy = new lconn.share.bean.UserFromCMIS(lconn.share.util.dom.xpathNode(this.e, "cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:createdBy']"));
      return this.addedBy;
   },   
   getPublished: function() {
      if (!this.added)
         this.added = lconn.share.util.misc.date.convertAtomDate(this.getPropertyDateTime('cmis:creationDate'));
      return this.added;
   },
   getModifier: function() {
      if (!this.modifier && this.e)
         this.modifier = new lconn.share.bean.UserFromCMIS(lconn.share.util.dom.xpathNode(this.e, "cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:lastModifiedBy']"));
      return this.modifier;
   },
   getUpdated: function() {
      if (!this.updated)
         this.updated = lconn.share.util.misc.date.convertAtomDate(this.getPropertyDateTime('cmis:lastModificationDate'));
      return this.updated;
   },
   getSystemLastModified: function() {
      console.log("CollectionCMIS.getSystemLastModified()");
      return this.getUpdated();
   },
   getSystemCreated: function() {
      console.log("CollectionCMIS.getSystemCreated()");
      return this.getPublished();
   },
   getFavorite: function() {
      if (!this.favorite)
         this.favorite = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "favorite", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this.favorite;
   },

   
   // AddChild, Delete, Purge, EditProperties, EditContent, Edit, ViewProperties, ViewContent, View, GrantAccess
   
   _CMIS_PERMISSIONS: {
      "cmis:canGetProperties":          ["ViewProperties"],
      "cmis:canGetChildren":            ["ViewContent","View"],
      "cmis:canUpdateProperties":       ["EditProperties", "Edit"],
      "cmis:canDeleteObject":           ["Delete", "Purge", "EditContent", "Edit"],
      "cmis:canDeleteTree":             ["Delete", "Purge", "EditContent", "Edit"],
      "cmis:canCreateDocument":         ["AddChild"],
      "cmis:canAddObjectToFolder":      ["AddChild"],
      "cmis:canRemoveObjectFromFolder": ["EditContent"],
      "cmis:canApplyACL":               ["GrantAccess", "GrantAccessView", "GrantAccessEdit"]
   },   
   getPermissions: function() {
      if (!this.permissions) {
         var qud = lconn.share.util.dom;

         this.permissions = {};
         var nodes = lconn.share.util.dom.xpathNodes(this._getCMISObjectNode(), "cmis:allowableActions/*[text()='true']");
         for (var n=null, i=0; n = nodes[i++];) {
            var cmisPermissions = this._CMIS_PERMISSIONS[n.nodeName] || [];
            for (var p=null,j=0; p = cmisPermissions[j++];)
               this.permissions[p] = true;
         }
      }
      return this.permissions;
   },
   getUrlAcl: function() {
      if(!this.urlAcl)
         this.urlAcl = lconn.share.util.dom.xpathString(this.e, "atom:link[@rel='http://docs.oasis-open.org/ns/cmis/link/200908/acl' and @type='application/cmisacl+xml']/@href");
      return this.urlAcl;
   },
   getUrlAclRemover: function() {
      if(!this.urlAclRemover)
         this.urlAclRemover = lconn.share.util.dom.xpathString(this.e, "atom:link[@rel='http://www.ibm.com/xmlns/prod/sn/cmis/acl-remover' and @type='application/cmisacl+xml']/@href");
      return this.urlAclRemover;
   },
   getUrlMultipartPost: function() {
      if(!this.urlMultipart)
         this.urlMultipart = lconn.share.util.dom.xpathString(this.e, "atom:link[@rel='http://www.ibm.com/xmlns/prod/sn/cmis/multipart-form/folderChildrenCollection' and @type='text/html']/@href");
      return this.urlMultipart;
   },
   getUrlFeed: function() {
      if(!this.urlFeed)
         this.urlFeed = lconn.share.util.dom.xpathString(this.e, "atom:link[@rel='down' and @type='application/atom+xml;type=feed']/@href");
      if(!this.urlFeed)
         this.urlFeed = lconn.share.util.dom.xpathString(this.e, "atom:link[@rel='self' and @type='application/atom+xml;type=feed']/@href");
      return this.urlFeed;
   },
   getUrlAlternate: function() {
      var url = lconn.share.util.dom.xpathString(this.e, "atom:link[@rel='alternate' and @type='text/html']/@href");
      return url;
   },
   getUrlService: function() {
      var url = lconn.share.util.dom.xpathString(this.e, "atom:link[@rel='service' and @type='application/atomsvc+xml']/@href");
      return url;
   },
   getMediaCount: function() {
      if (typeof this.mediaCount == "undefined")
         this.mediaCount = this.getPropertyInteger("snx:numFiles");
      return this.mediaCount;
   },
   getCollectionCount: function() {
      if (typeof this.collectionCount == "undefined")
         this.collectionCount = this.getPropertyInteger("snx:numFolders");
      return this.collectionCount;
   },
   getItemCount: function() {
      if (typeof this.itemCount == "undefined")
         this.itemCount = this.getPropertyInteger("snx:numItems");
      return this.itemCount;
   },
   isSearchable: function() {
      if (typeof this.isValidInFolderId == "undefined")
         this.isValidInFolderId = this.getPropertyBoolean("snx:isValidInFolderId", null);

      // Return true unless explicitly told we're not
      return this.isValidInFolderId != "false";
   }
});

lconn.share.bean.Collection.createBean = function(e, opt) {
   if (opt && opt.apiType == "cmis")
      return new lconn.share.bean.CollectionCMIS(e);
   else
      return new lconn.share.bean.Collection(e);
};
