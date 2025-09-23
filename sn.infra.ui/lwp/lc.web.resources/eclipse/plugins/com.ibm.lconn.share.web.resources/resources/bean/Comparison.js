/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Comparison");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.bean.User");

dojo.declare("lconn.share.bean.Comparison", null, {	
   constructor: function(diff) {
      this.diff = diff;
      this.resourceTo = lconn.share.util.dom.getElementsByTagNameNS(diff, "resourceTo",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
      this.resourceFrom = lconn.share.util.dom.getElementsByTagNameNS(diff, "resourceFrom",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
      this.comparison = lconn.share.util.dom.getElementsByTagNameNS(diff, "comparison",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
   },
   getComparison : function () {      
      return lconn.share.util.dom.getChildElementTextContent(this.comparison, "content");
   },
   getToId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.resourceTo, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);   
   },
   getFromId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.resourceFrom, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);   
   },
   getToVersionId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.resourceTo, "versionUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getFromVersionId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.resourceFrom, "versionUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getToVersionLabel: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.resourceTo, "versionLabel", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);   
   },
   getFromVersionLabel: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.resourceFrom, "versionLabel", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);   
   },
   getToUpdated: function() {
      if (!this.toUpdated)
         this.toUpdated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.resourceTo, "modified", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getSystemLastModified();
      return this.toUpdated;   
   },
   getFromUpdated: function() {
      if (!this.fromUpdated)
         this.fromUpdated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.resourceFrom, "modified", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getSystemLastModified();
      return this.fromUpdated;     
   },
   getToAuthor: function() {
      if (!this.toAuthor)
         this.toAuthor = new lconn.share.bean.User(this.resourceTo.getElementsByTagName("author")[0]);
      return this.toAuthor;
   },
   getAuthor: function() {
      return this.getFromAuthor(); //author should be the same on both really;
   },
   getFromAuthor: function() {
      if (!this.fromAuthor)
         this.fromAuthor = new lconn.share.bean.User(this.resourceFrom.getElementsByTagName("author")[0]);
      return this.fromAuthor;
   }, 
   getPermissions: function() {
      if (!this.permissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.resourceFrom, "permissions", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {View:true};
         if(s)
	         dojo.forEach(s.split(", "), function(a) {if (a && a.length > 0) p[a] = true;});
         this.permissions = p;
      }
      return this.permissions;
   },     
   getToModifier: function() {
      if (!this.toModifier) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.resourceTo, "modifier", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.toModifier = new lconn.share.bean.User(e);
      }
      return this.toModifier;
   },
   getFromModifier: function() {
      if (!this.fromModifier) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.resourceFrom, "modifier", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.fromModifier = new lconn.share.bean.User(e);
      }
      return this.fromModifier;
   },
   getToPermissions: function() {
      if (!this.toPermissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.resourceTo, "permissions", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {View:true};
         if(s)
	         dojo.forEach(s.split(", "), function(a) {if (a && a.length > 0) p[a] = true;});
         this.toPermissions = p;
      }
      return this.toPermissions;
   }, 
   getFromPermissions: function() {
      if (!this.fromPermissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.resourceFrom, "permissions", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {View:true};
         if(s)
	         dojo.forEach(s.split(", "), function(a) {if (a && a.length > 0) p[a] = true;});
         this.fromPermissions = p;
      }
      return this.fromPermissions;
   },
   getToMostRecentVersion: function() {
	  return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.resourceTo, "totalResults", lconn.share.util.dom.OPENSEARCH_NAMESPACE), -1);   
   },
   getFromMostRecentVersion: function() {
	  return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.resourceFrom, "totalResults", lconn.share.util.dom.OPENSEARCH_NAMESPACE), -1);      
   }     
});
