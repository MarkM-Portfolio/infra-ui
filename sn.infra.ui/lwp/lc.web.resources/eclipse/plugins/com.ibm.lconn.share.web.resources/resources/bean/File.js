/* Copyright IBM Corp. 2009, 2018  All Rights Reserved.              */

(function() {

// build a /files/app/file/<id> url given a /files/basic/api or /files/form/api url from a feed (in case we have a docs url)
var _getUrlSummary = function(templateUrl, docId) {
  if (!templateUrl)
     return null;
  
  var idx = templateUrl.indexOf('/basic');
  if (idx == -1) {
     idx = templateUrl.indexOf('/form');
  }
  
  var url = null;
  if (idx > 0) {
     var baseUrl = templateUrl.substring(0, idx);
     url = [baseUrl, '/app/file/', docId].join('');
  }
  
  return url;
};
   
dojo.provide("lconn.share.bean.File");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.IBMDocs.ThumbnailConstants");
dojo.require("lconn.share.util.IBMDocs.ViewerRoutes");
dojo.require("lconn.share.bean.AbstractCMISBean");
dojo.require("lconn.share.bean.AbstractModerateBean");
dojo.require("lconn.share.bean.Lock");
dojo.require("lconn.share.bean.User");
dojo.require("lconn.share.bean.Policy");
dojo.require("lconn.share.bean.ConfigurableBean");
dojo.require("lconn.core.globalization.bidiUtil");

var ViewerRoutes = lconn.share.util.IBMDocs.ViewerRoutes;
var ThumbnailConstants = lconn.share.util.IBMDocs.ThumbnailConstants;

dojo.declare("lconn.share.bean.File", [lconn.share.bean.AbstractModerateBean, lconn.share.bean.ConfigurableFile], {
   constructor: function(entry) {
      this.e = entry;
      this._thumbnailData = {};
   },
   isFolder: function(){return "folder" == this.getCategory() || "collection" == this.getCategory();},
   getEntry: function() {return this.e;},
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "id");},
   getId: function() {
      var ret = lconn.share.util.dom.getChildElementTextContentNS(this.e, "uuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      if (!ret) {
         if (this.ccmBean) {
            ret = this.ccmBean.getId();
         }
      }
      return ret;
   },
   getName: function() {
      return this.getLabel();
   },
   getNameNls: function() {
      if (this.isFolder()) {
         return lconn.core.globalization.bidiUtil.enforceTextDirectionEx(this.getName());
      } else {
    	  return lconn.core.globalization.bidiUtil.createSttDisplayString(this.getName(), "URL");
      }
   },
   getPublishedTitle: function() {
      var publishedTitle = lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "title");
      if(publishedTitle)
         return publishedTitle;
      else
         return this.getName();
   },
   getTitle: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "title", lconn.share.util.dom.ATOM_NAMESPACE);
   },
   getDraftStatus: function() {
      if (lconn.share.util.dom.getChildElementAttribute(this.e, "category", "term") == "draft") {
         var approvalState = lconn.share.util.dom.getChildElementTextContentNS(this.e, "approvalState", lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM);
         if (approvalState == "pending") {
            return "draftReview";
         }
         
         if(approvalState == "rejected") {
            return "draftRejected";
         }
         
         return "draft";
      }
      return null; 
   },
   getLabel: function() {
      var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "label", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      var qud = lconn.share.util.dom;
      if (!s || s.length == 0)
         s = qud.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "enclosure", "title", null);
      if (!s || s.length == 0)
         s = this.getTitle();
      return s;
   },
   getContent : function () {
      return this.content || lconn.share.util.dom.getChildElementTextContent(this.e, "content");
   },   
   getExtension: function() {
      return lconn.share.util.text.getExtension(this.getLabel()); 
   },
   getDescription: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "summary");},
   getChangeSummary: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "changeSummary");},
   getCategory: function() {return lconn.share.util.dom.getChildElementAttributeMatching(this.e, "category", "scheme", "tag:ibm.com,2006:td/type", "term");},
   isPage: function() {return this.getCategory() == "page";},
   getAuthor: function() {
      if (!this.author && this.e)
         this.author = new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
      return this.author;
   },
   getObjectTypeId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "objectTypeId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },   
   getLibraryId: function() {
      if (!this.e || this._libraryType == "library")
         return null;
      var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "libraryId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      if (!s)
         throw "Library id not returned in element";
      return s;
   },
   isFilesContext: function() {
      return (dojo.indexOf(lconn.share.bean.File.CONTEXTS.FILES, this.getLibraryType()) > -1);
   },
   isLibraryContext: function() {
      return (dojo.indexOf(lconn.share.bean.File.CONTEXTS.ECM, this.getLibraryType()) > -1);
   },
   getLibraryType: function() {
      if (this._libraryType)
         return this._libraryType; 

      if (!this.e)
         return null;
      this._libraryType = lconn.share.util.dom.getChildElementTextContentNS(this.e, "libraryType", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this._libraryType;
   },
   isSyncable: function(){
      if (!this.e)
         return null;
      if (this.syncable == null || typeof(this.syncable) == "undefined" ){
         var sync = lconn.share.util.dom.getChildElementTextContentNS(this.e, "isSyncable", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         this.syncable = sync == "true";
      } 
      return this.syncable;
   },
   
   isIndirectSyncable: function(){
      if (!this.e)
         return null;
      if (this.indirectSyncable == null || typeof(this.indirectSyncable) == "undefined" ){
         var indirectSyn = lconn.share.util.dom.getChildElementTextContentNS(this.e, "isIndirectSyncable", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         this.indirectSyncable = (indirectSyn == "true");
      } 
      return this.indirectSyncable;
   },
   
   getLibraryAuthor: function() {
      if (!this.libraryAuthor && this.e) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "libraryAuthor", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.libraryAuthor = new lconn.share.bean.User(e);
      }
      return this.libraryAuthor;
   },
   getPolicy: function() {
      if (this.policy === undefined && this.e) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "policy", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         this.policy = e? lconn.share.bean.Policy.createPolicy(e): null;
      }
      return this.policy;
   },
   getAddedBy: function() {
      if (!this.addedBy && this.e) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "addedBy", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.addedBy = new lconn.share.bean.User(e);
      }
      return this.addedBy;
   },   
   getAdded: function() {
      if (!this.added)
         this.added = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "added", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
      return this.added;
   },
   getSharedBy: function() {
      if (!this.sharedBy && this.e) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "sharedBy", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.sharedBy = new lconn.share.bean.User(e);
      }
      return this.sharedBy;
   },   
   getShared: function() {
      if (!this.shared)
         this.shared = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "shared", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
      return this.shared;
   },

   getShareLink: function() {
      if(!this.shareLink || !this.shareLink.url) {
         var qud = lconn.share.util.dom;
         var url = qud.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "shareLink", "href", null);
         this.shareLink = {};
         if(url) {
            var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "shareLink", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
            this.shareLink = {
               url: url,
               type: lconn.share.util.dom.getChildElementTextContentNS(e, "type", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE),
               scope: lconn.share.util.dom.getChildElementTextContentNS(e, "scope", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE),
               createdDate: lconn.share.util.dom.getChildElementTextContentNS(e, "created", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)
            }
         }
      }
      return this.shareLink;
   },
   getDeletedBy: function() {
      if (!this.deletedBy && this.e) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "deletedBy", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
         if (e)
            this.deletedBy = new lconn.share.bean.User(e);
      }
      return this.deletedBy;
   },   
   getDeleted: function() {
      if (!this.deleted)
         this.deleted = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "deletedWhen", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
      return this.deleted;
   },
   getModifier: function() {
      if (!this.modifier && this.e) {
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
   getRating: function() {return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e, "rating", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));},
   getAverageRating: function() {return lconn.share.util.text.parseFloat(lconn.share.util.dom.getChildElementTextContentNS(this.e, "averageRating", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));},
   getRatingCount: function() {
      if(this.ratingCount != null)
         return this.ratingCount;
      return this.ratingCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/recommendations"));
   },
   getUrlRecommendation: function() {
      if (!this.urlRecommendation) {
         var qud = lconn.share.util.dom;
         this.urlRecommendation = qud.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "recommendation", "href", null);
         this.urlRecommendation = this.urlRecommendation ? this.urlRecommendation : null;
      }
      return this.urlRecommendation;
   },
   isUserRecommended: function() {
      return this.getUrlRecommendation() ? true : false;
   },
   isEncrypted: function() {
      if(this.encrypted === undefined) 
         this.encrypted = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "encrypt", lconn.share.util.dom.SNX_NAMESPACE) == "true");
      return this.encrypted;
   },
   getPermissions: function() {
      if (!this.permissions) {
         var s = lconn.share.util.dom.getChildElementTextContentNS(this.e, "permissions", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         var p = {};
         if (s)
            dojo.forEach(s.split(","), function(a) {if (a && a.length > 0) p[dojo.trim(a)] = true;});
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
   isRestrictedVisibility: function() {
      return (lconn.share.util.dom.getChildElementTextContentNS(this.e, "restrictedVisibility", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
   },
   getAllSharesCount: function() {return this.getShareCount() + this.getCollectionCount();},
   isExternal: function() {
      if (this._isExternal == undefined)
         this._isExternal = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "isExternal", lconn.share.util.dom.SNX_NAMESPACE) == "true");
      return this._isExternal;
   },
   isPublic: function() {return this.getVisibility() == "public";},
   isPrivate: function() {return this.getVisibility() == "private"},
   isShared: function() {return this.getVisibility() == "shared"},
   isViralShareAllowed: function() {
      return (lconn.share.util.dom.getChildElementTextContentNS(this.e, "propagation", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
   },
   isFiledInFolder: function() {
      return (lconn.share.util.dom.getChildElementTextContentNS(this.e, "isFiledInFolder", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
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
   getTimesDownloaded: function() {
      if (typeof this.downloadCount == "undefined")
         this.downloadCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/hit"));
      return this.downloadCount;
   },
   getTimesDownloadedAnonymously: function() {return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/anonymous_hit"));},
   getUrlDownload: function() {
      if (!this.urlDownload) {
         var qud = lconn.share.util.dom;
         this.urlDownload = qud.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "enclosure", "href", null);
      }
      return this.urlDownload;
   },
   setRepositoryName: function(repositoryName){
      this.repositoryName = repositoryName;
   },
   getRepositoryName: function(){
      return this.repositoryName;
   },
   getUrlThumbnail: function() {
      if (!this.urlThumbnail) {
         var qud = lconn.share.util.dom;
         this.urlThumbnail = qud.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "thumbnail", "href", null);
      }
      return this.urlThumbnail;
   },
   setThumbnailData: function(size, thumbnailData) {
      ThumbnailConstants.validateSize(size);
      this._thumbnailData[size] = thumbnailData;
   },
   getThumbnailData: function(size) {
      ThumbnailConstants.validateSize(size);
      return this._thumbnailData[size];
   },
   hasDownloadInfo: function() {
      return typeof this.getDownloadInfo().downloaded != "undefined";
   },
   hasDownloaded: function() {
      return this.getDownloadInfo().downloaded;
   },
   hasDownloadedLatest: function() {
      var d = this.getDownloadInfo();
      return d.downloaded && d.version == this.getLatestVersionLabel();
   },
   getDownloadInfo: function() {
      if (typeof this.downloadInfo == "undefined" && this.e) {
         var n = this.downloadInfo = {};
         var qud = lconn.share.util.dom;
         var DOCUMENTS_ATOM = qud.DOCUMENTS_ATOM_NAMESPACE;
         var e = qud.getChildElementNS(this.e, "downloadInfo", DOCUMENTS_ATOM);
         if (e) {
            n.date = lconn.share.util.misc.date.convertAtomDate(qud.getChildElementTextContentNS(e, "downloadedDate", DOCUMENTS_ATOM));
            n.id = qud.getChildElementTextContentNS(e, "versionUuid", DOCUMENTS_ATOM);
            n.version = parseInt(qud.getChildElementTextContentNS(e, "versionNumber", DOCUMENTS_ATOM));
            n.downloaded = !!n.id;
         }
      }
      return this.downloadInfo;
   },
   isLocked: function() {
      var lock = this.getLock();
      if (lock && lock.getType() != "NONE")
         return true;
      return false;
   },
   getLock: function() {
      if (typeof this.lock == "undefined" && this.e) {
         var qud = lconn.share.util.dom;
         var lockElement = qud.getChildElementNS(this.e, "lock", qud.DOCUMENTS_ATOM_NAMESPACE);
         this.lock = lockElement ? new lconn.share.bean.Lock(lockElement) : null;
      }
      return this.lock;
   },
   getLockOwner: function() {
      if (!this.ccmFileLocked && this.e) {
         if (lconn.share.util.dom.getChildElementTextContentNS(this.e, "locked", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)) {
            var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "lockOwner", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
               if (e) {
                  this.ccmFileLocked = new lconn.share.bean.User(e);
               return this.ccmFileLocked;
               }
            }
         return null;
      }
   },
   
   getUrlEntry: function() {
      var qud = lconn.share.util.dom;
      return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "self", "href", null);
   },
   getUrlEdit: function() {
      var qud = lconn.share.util.dom;
      return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "edit", "href", null);
   },
   getUrlFeed: function() {
      var qud = lconn.share.util.dom;
      return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "replies", "href", null);
   },
   getUrlAlternate: function() {
      var qud = lconn.share.util.dom;
      return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "alternate", "href", null);
   },
   getUrlSummary: function() {
      if (!this._urlSummary) {
         this._urlSummary = this.getUrlAlternate();
      }
      
      return this._urlSummary;
   }, 
   getUrlThumbnail: function() {
      var qud = lconn.share.util.dom;
      return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "thumbnail", "href", null);
   },
   getThumbnailUrl: function(size) {
      if(!size) {
         return this.getUrlThumbnail();
      } else {
         return this.getThumbnailData(size) || this.getUrlThumbnail() || this.buildThumbnailUrl(size);
      }
   },
   buildThumbnailUrl: function(sizeFormat) {
      if(this.isFilesContext()) {
         return;
      } 
      if(this.isLibraryContext()) {
         repositoryName = this.getRepositoryName();
         cmisVersionSeriesId = this.getCMISVersionSeriesId();
         if(!repositoryName) {
            throw {name: "InvalidArgumentException", message: "One of the following arguments was invalid: repositoryName=("+repositoryName+")"}; 
         }
         if(!cmisVersionSeriesId) {
            return;
         }
         ThumbnailConstants.validateSize(sizeFormat);
         return ViewerRoutes.getThumbnailSingleURL(ViewerRoutes.getServiceName(this), cmisVersionSeriesId, repositoryName, sizeFormat);
      }
      
      return;
   },
   getUrlVia: function() {
      var qud = lconn.share.util.dom;
      return this.viaUrl = lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "via", "href", null) || this.getUrlAlternate();
   },
   getUrlVia: function() {
      var qud = lconn.share.util.dom;
      return this.viaUrl = lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "via", "href", null) || this.getUrlAlternate();
   },
   isIBMDocsFile: function() {
      if(!this.isLibraryContext()) {
         // Current implementation only supports library files
         return false;
      }
      
      var ibmDocsState = lconn.share.util.dom.getChildElementTextContentNS(this.e, "IBMDocsState", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return !!ibmDocsState && ibmDocsState !== "none";
   },
   getTags: function() {
      if (!this.tags) {
         var tags = [];
         if (this.e)
            for (var i=0; i < this.e.childNodes.length; i++) {
               var child = this.e.childNodes[i];
               if (child.nodeName == "category" && child.getAttribute("scheme") == null)
                  tags.push(child.getAttribute("term"));
            }
         this.tags = tags;
      }
      return this.tags;
   },
   getSize: function() {
      if (typeof this.size == "undefined") {
         var qud = lconn.share.util.dom;
         this.size = parseInt(lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "enclosure", "length", null));
      }
      return this.size;
   },
   getTotalSize: function() {
      if (typeof this.totalSize == "undefined")
         this.totalSize = parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e, "totalMediaSize", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
      return this.totalSize;
   },
   getMimeType: function() {
      var qud = lconn.share.util.dom;
      return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "enclosure", "type", null);
   },
   getDocumentId: function() {lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getVersionId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "versionUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getBatchThumbnailId: function() {
      return this.getVersionId() || this.getCMISVersionId() || this.getCMISDocumentId() || this.getVersionIdFromNexusId();
   },
   getSingleThumbnailId: function() {
      return this.getCMISVersionSeriesId();
   },
   getCMISVersionId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "cmisVersionID", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getCMISVersionSeriesId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "cmisVersionSeriesID", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getMalwareScanState: function() {
     return lconn.share.util.dom.getChildElementTextContentNS(this.e, "malwareScanState", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
     },
   getCMISDocumentId: function() {
     var cmisDocumentId = lconn.share.util.dom.getChildElementTextContentNS(this.e, "cmisDocumentID", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
     
     // FNCS does not currently send the ID in the document entry, but we can obtain the ID
     // if a draft exists by converting the draftUuid.
     if (!cmisDocumentId) {
        var draftUuid = this.getDraftId();
        if (draftUuid && draftUuid !== "") {
           draftUuid = draftUuid.replace("{", "");
           draftUuid = draftUuid.replace("}", "");
           cmisDocumentId = "idd_" + draftUuid;
        }
     }
     
     return cmisDocumentId;
   },
   getDraftId: function() {
     return lconn.share.util.dom.getChildElementTextContentNS(this.e, "draftUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getVersionIdFromNexusId: function() {
      var versionIdPrefix = "idd_";
      var nexusId = this.getNexusId();
      if(nexusId) {
         var versionId = nexusId.substring(nexusId.lastIndexOf(";") + 1);
         var trimmedVersionId = versionId.slice(1,-1);
         var prefixedVersionId = versionIdPrefix + trimmedVersionId;
         return prefixedVersionId;
      }
   },
   getNexusId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "nexusId", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getVersionLabel: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "versionLabel", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getDocumentVersionId: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentVersionUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},
   getDocumentVersionLabel: function() {return lconn.share.util.dom.getChildElementTextContentNS(this.e, "documentVersionLabel", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);},   

   getCurrentVersionId: function() {return this.getVersionId() || this.getDocumentVersionId();},
   getCurrentVersionLabel: function() {return this.getVersionLabel() || this.getDocumentVersionLabel();},
   getLatestVersionId: function() {return this.getDocumentVersionId() || this.getVersionId();},
   getLatestVersionLabel: function() {return this.getDocumentVersionLabel() || this.getVersionLabel();},
   
   getCommentCount: function() {
      if (typeof this.commentCount == "undefined") {
         var qud = lconn.share.util.dom;
         this.commentCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "replies", "count", lconn.share.util.dom.THREAD_ATOM_NAMESPACE));
      }
      return this.commentCount;
   },
   getShareCount: function() {
      if (typeof this.shareCount == "undefined")
         this.shareCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/share"),0);
      return this.shareCount;
   },
   getCollectionCount: function() {
      if (typeof this.collectionCount == "undefined")
         this.collectionCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/collections"),0);
      return this.collectionCount;
   },
   getReferenceCount: function() {
      if (typeof this.referenceCount == "undefined")
         this.referenceCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/references"),0);
      return this.referenceCount;
   },
   getAttachmentCount: function() {
      if (typeof this.attachmentCount == "undefined")
         this.attachmentCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/attachments"));
      return this.attachmentCount;
   },
   getVersionCount: function() {
      if (typeof this.versionCount == "undefined")
         this.versionCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/versions"));
      return this.versionCount;
   },
   getMicroblogCount: function() {
      if (typeof this.microblogsCount == "undefined")
         this.microblogsCount = lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/microblogs"));
      return this.microblogsCount;
   },
   getVisibleCollectionCount:function() {
      if (typeof this.visibleCollectionCount == "undefined")
         this.visibleCollectionCount = lconn.share.util.dom.getChildElementTextContentNS(this.e, "visibleCollectionCount", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      return this.visibleCollectionCount;
   }
});

dojo.declare("lconn.share.bean.FileFromJson", [lconn.share.bean.AbstractModerateBeanFromJson, lconn.share.bean.ConfigurableBean], {
   constructor: function(doc) {
      this.d = doc;
   },
   getTitle: function() {
      return this.d.title;
   },
   getUrlEntry: function() {
      if (!this.urlEntry) {
         var link = lconn.share.util.misc.indexById(this.d.links, "rel", "self");
         if (link)
            this.urlEntry = link.href;
      }
      return this.urlEntry;
   },
   getUrlEdit: function(){
      if (!this.urlEdit) {
         var link = lconn.share.util.misc.indexById(this.d.links, "rel", "edit");
         if (link)
            this.urlEdit = link.href;
      }
      return this.urlEdit;
   },
   getUrlFeed: function(){
      if (!this.urlFeed) {
         var link = lconn.share.util.misc.indexById(this.d.links, "rel", "replies");
         if (link)
            this.urlFeed = link.href;
      }
      return this.urlFeed;
   },
   getSystemLastModified: function() {
      return lconn.share.util.misc.date.convertAtomDate(this.d.updated);
   },
   getShareCount: function() {
      return lconn.share.util.text.parseInt(lconn.share.util.misc.indexById(this.d.extensions,"name","snx:rank").children[0], 0);
   },
   getPublished: function() {
      return lconn.share.util.misc.date.convertAtomDate(this.d.published);
   },
   getSystemCreated: function() {
      return this.getPublished();
   },
   getMimeType: function() {
      if (!this.mimeType) {
         var link = lconn.share.util.misc.indexById(this.d.links, "rel", "enclosure");
         if (link)
            this.mimeType = link.type;
      }
      return this.mimeType;
   },
   getExtension: function() {
      return lconn.share.util.text.getExtension(this.getLabel()); 
   },
   getLibraryId: function() {
      return lconn.share.util.misc.indexById(this.d.extensions,"name","td:libraryId").children[0];
   },
   getLibraryType: function() {
      return lconn.share.util.misc.indexById(this.d.extensions,"name","td:libraryType").children[0];
   },
   getName: function() {return this.getLabel();},
   getUrlDownload: function(){
      if (!this.urlDownload) {
         var link = lconn.share.util.misc.indexById(this.d.links, "rel", "enclosure");
         if (link)
            this.urlDownload = link.href;
      }
      return this.urlDownload;
   },
   getDescription: function(){
     return this.d.summary; 
   },
   getLabel: function() {
      if (!this.label)
         this.label = lconn.share.util.misc.indexById(this.d.links, "rel", "enclosure").title;
      return this.label;
   },
   getAtomId: function() {
      if (this.atomId) return this.atomId;
      return this.atomId = this.d.id;
   },
   getContent: function() {
     if (this.content) return this.content;
     return this.content = this.d.content;
   },
   getId: function() {
      if(this.id) return this.id;
      return this.id = lconn.share.util.misc.indexById(this.d.extensions,"name","td:uuid").children[0];
   },
   getCommentCount: function() {
      if (this.commentCount) return this.commentCount;
      return this.commentCount = lconn.share.util.text
            .parseInt(lconn.share.util.misc.indexById(this.d.links, "rel", "replies").attributes["td:commentCount"].value, 0);
   },
   getMicroblogCount: function() {
      if (typeof this.microblogsCount == "undefined") {
         this.microblogsCount = 0;
         var arr = this.d.extensions;
         for (var i=0; i<arr.length; i++) {
            var ext = arr[i];
            if (ext.name == "snx:rank" && ext.attributes.scheme == "http://www.ibm.com/xmlns/prod/sn/microblogs") {
               this.microblogsCount = lconn.share.util.text.parseInt(ext.children[0]);
               break;
            }
         }
      }
      return this.microblogsCount;
   },
   getOrgId: function() {
      if(this.orgId) return this.orgId;
      var orgIdElement = lconn.share.util.misc.indexById(this.d.extensions,"name","snx:orgId");
      if (orgIdElement)
         this.orgId = orgIdElement.children[0];
      return this.orgId;
   },
   getOrgName: function() {
      if(this.orgName) return this.orgName;
      var orgNameElement = lconn.share.util.misc.indexById(this.d.extensions,"name","snx:orgName");
      if (orgNameElement)
         this.orgName = orgNameElement.children[0];
      return this.orgName;
   },
   getUrlAlternate: function() {
      if (!this.alternate) {
         var link = lconn.share.util.misc.indexById(this.d.links, "rel", "alternate");
         if (link)
            this.alternate = link.href;
      }
      return this.alternate;
   },
   getUrlThumbnail: function(){
      if (!this.thumbnail) {
         var link = lconn.share.util.misc.indexById(this.d.links, "rel", "thumbnail");
         if (link)
            this.thumbnail = link.href;
      }
      return this.thumbnail;
   },
   getUrlVia: function() {
      if (!this.alternate) {
         var link = lconn.share.util.misc.indexById(this.d.links, "rel", "via");
         this.alternate = link.href || this.getUrlAlternate();
      }
      return this.alternate;
   },
   getSize: function() {
      if (!this.length)
         this.length = lconn.share.util.misc.indexById(this.d.links, "rel", "enclosure").length;
      return this.length;
   },
   getTotalSize: function() {
      if (!this.totalSize)
         this.totalSize = parseInt(lconn.share.util.misc.indexById(this.d.extensions,"name","td:totalMediaSize").children[0]);
      return this.totalSize;
   },
   getUpdated: function() {
      if (!this.updated)
         this.updated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.misc.indexById(this.d.extensions,"name","td:modified").children[0]);
      return this.updated;
   },
   getAuthor: function() {
      if (!this.author)
         this.author = new lconn.share.bean.UserFromJson(this.d.authors[0]);
      return this.author;
   },      
   getModifier: function() {
      if (!this.modifier)
         this.modifier = new lconn.share.bean.UserFromJson(lconn.share.util.misc.indexById(this.d.extensions,"name","td:modifier").children);
      return this.modifier;
   },   
   getFavorite: function() {
      if (!this.favorite)
         this.favorite = (lconn.share.util.dom.getChildElementTextContentNS(this.e, "favorite", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");
      return this.favorite;
   },
   getCategory: function() {
      if (!this.category)
         this.category = this.d.categories[0].term;
      return this.category;
   },
   getVersionNumber: function() {
      if (!this.version)
         this.version = lconn.share.util.text.parseInt(lconn.share.util.misc.indexById(this.d.extensions,"name","td:versionNumber").children[0], 1);
      return this.version;
   },
   getVersionId: function() {
      if (!this.versionId)
         this.versionId = lconn.share.util.misc.indexById(this.d.extensions,"name","td:versionUuid").children[0];
      return this.versionId;
   },
   getVersionLabel: function() {
      if (!this.versionLabel)
         this.versionLabel = lconn.share.util.misc.indexById(this.d.extensions,"name","td:versionLabel").children[0];
      return this.versionLabel;
   },
   getVisibility: function() {
      if (!this.vis)
         this.vis = lconn.share.util.misc.indexById(this.d.extensions,"name","td:visibility").children[0];
      return this.vis;
   },
   isPublic: function() {return this.getVisibility() == "public";},
   isShared: function() {return this.getVisibility() == "shared";},
   isPrivate: function() {return this.getVisibility() == "private";},
   isExternal: function() {
      if (this._isExternal == undefined){
         var isExternal = lconn.share.util.misc.indexById(this.d.extensions,"name","snx:isExternal");
         this._isExternal = isExternal? isExternal.children[0]: false;
      }
         
      return this._isExternal;
   },
   getAllSharesCount: function() {return this.getShareCount() + this.getCollectionCount();},
   getShareCount: function() {
      if (typeof this.shareCount == "undefined") {
         this.shareCount = 0;
         var arr = this.d.extensions;
         for (var i=0; i<arr.length; i++) {
            var ext = arr[i];
            if (ext.name == "snx:rank" && ext.attributes.scheme == "http://www.ibm.com/xmlns/prod/sn/share") {
               this.shareCount = lconn.share.util.text.parseInt(ext.children[0]);
               break;
            }
         }
      }
      return this.shareCount;
   },
   getReferenceCount: function() {
      if (typeof this.referenceCount == "undefined") {
         this.collectionCount = 0;
         var arr = this.d.extensions;
         for (var i=0; i<arr.length; i++) {
            var ext = arr[i];
            if (ext.name == "snx:rank" && ext.attributes.scheme == "http://www.ibm.com/xmlns/prod/sn/references") {
               this.referenceCount = lconn.share.util.text.parseInt(ext.children[0]);
               break;
            }
         }
      }
      return this.referenceCount;
   },
   getCollectionCount: function() {
      if (typeof this.collectionCount == "undefined") {
         this.collectionCount = 0;
         var arr = this.d.extensions;
         for (var i=0; i<arr.length; i++) {
            var ext = arr[i];
            if (ext.name == "snx:rank" && ext.attributes.scheme == "http://www.ibm.com/xmlns/prod/sn/collections") {
               this.collectionCount = lconn.share.util.text.parseInt(ext.children[0]);
               break;
            }
         }
      }
      return this.collectionCount;
   }
});

dojo.declare("lconn.share.bean.PartialFile", null, {constructor: function(opts) {if (opts) dojo.mixin(this, opts);}});

dojo.declare("lconn.share.bean.FileCopy", null, {
   hardcoded: ["isPublic","isPrivate","isUserRecommended","getName"],
   baseClass: lconn.share.bean.File,
   constructor: function(doc) {
      doc = doc || new this.baseClass(null);
      var m;
      for (var key in doc) {
         var f = doc[key];
         if (!this[key]) {
            if (typeof f == "function") {
               if (dojo.indexOf(this.hardcoded, key) != -1)
                  this[key] = f;
               else if (m = /^get([A-Z])(.*)/.exec(key)) {
                  var name = m[1].toLowerCase() + m[2];
                  var value = f.apply(doc);
                  if (value && value.nodeType)
                     this[name] = value
                  else if (typeof value != "undefined")
                     this[name] = dojo.clone(value);
                  this[key] = dojo.partial(this.get, name);
               }
               else if (m = /^is([A-Z])(.*)/.exec(key)) {
                  var name = m[1].toLowerCase() + m[2];
                  var value = f.apply(doc);
                  if (value && value.nodeType)
                     this[name] = value
                  else if (typeof value != "undefined")
                     this[name] = dojo.clone(value);
                  this[key] = dojo.partial(this.get, name);
               }
            }
         }
      }
   },
   get: function(s) {
      return this[s];
   }
});

lconn.share.bean.File.SPLIT_TAGS = /[,\s\u3000]+/;
lconn.share.bean.File.splitTags = function(tagsText) {
   tagsText = (tagsText.toLowerCase() || "").replace(/["']/g, "");
   var tags = tagsText.split(lconn.share.bean.File.SPLIT_TAGS);
   var tagNames = {};
   return dojo.filter(tags,
      function(s) { 
         if (s.length > 0 && !tagNames[s]) {
            tagNames[s] = 1;
            return true;
         } 
         return false;
      }
   );
}


dojo.declare("lconn.share.bean.FileCMIS", [lconn.share.bean.File, lconn.share.bean.AbstractCMISBean], {
   // TODO: finish implementing CMIS-specific getters
   getId: function() {
      if (!this.id)
         this.id = this.getPropertyId('cmis:objectId');
      return this.id;
   },
   isFolder: function(){
      return false;
   },
   getName: function() {
      return this.getTitle();
   },
   getNameNls: function() {
      if (this.isFolder()) {
         return lconn.core.globalization.bidiUtil.enforceTextDirectionEx(this.getName());
      } else {
    	  return lconn.core.globalization.bidiUtil.createSttDisplayString(this.getName(), "URL");
      }
   },
   getTitle: function() {
      if (!this.title)
         this.title = this.getPropertyString('cmis:name');
      if (!this.title)
         this.title = this.inherited(arguments);
      return this.title;
   },
   getLabel: function() {
      if (!this.label)
         this.label = this.getPropertyString('cmis:contentStreamFileName');
      if (!this.label)
         this.label = this.inherited(arguments);
      return this.label;
   },
      
   getDescription: function() {
      return this.getPropertyString('snx:summary');
   },
   getChangeSummary: function() {
      return this.getPropertyString('cmis:checkinComment');
   },
   getAuthor: function() {
      return this.getAddedBy();
   },
   getObjectTypeId: function() {
      return this.getPropertyId('cmis:objectTypeId');
   },
   getLibraryId: function() {
      console.log("CMISFile.getLibraryId()");
   },
   getLibraryType: function() {
      return this.getPropertyString('snx:repositoryType');
   },
   getLibraryAuthor: function() {
      console.log("CMISFile.getLibraryAuthor()");
   },
   getAddedBy: function() {
      // TODO: is this supposed to be creator?
      if (!this.addedBy && this.e)
         this.addedBy = new lconn.share.bean.UserFromCMIS(lconn.share.util.dom.xpathNode(this.e, "cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:createdBy']"));
      return this.addedBy;
   },   
   getAdded: function() {
      // TODO: is this supposed to be creation date?
      if (!this.added)
         this.added = lconn.share.util.misc.date.convertAtomDate(this.getPropertyDateTime('cmis:creationDate')) || this.getSystemLastModified();
      return this.added;
   },
   getSharedBy: function() {
      console.log("CMISFile.getSharedBy()");
      return this.getAddedBy();
   },   
   getShared: function() {
      console.log("CMISFile.getShared()");
      return this.getAdded();
   },
   getModifier: function() {
      if (!this.modifier && this.e)
         this.modifier = new lconn.share.bean.UserFromCMIS(lconn.share.util.dom.xpathNode(this.e, "cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:lastModifiedBy']"));
      return this.modifier;
   },
   getUpdated: function() {
      if (!this.updated)
         this.updated = lconn.share.util.misc.date.convertAtomDate(this.getPropertyDateTime('cmis:lastModificationDate')) || this.getSystemLastModified();
      return this.updated;
   },
   getPublished: function() {
      console.log("CMISFile.getPublished()");
      return this.getAdded();
   },
   getSystemLastModified: function() {
      console.log("CMISFile.getSystemLastModified()");
      return this.getUpdated();
   },
   getSystemCreated: function() {
      console.log("CMISFile.getSystemCreated()");
      return this.getAdded();
   },
   getRatingCount: function() {
      if (typeof this.ratingCount == "undefined")
         this.ratingCount = this.getPropertyInteger('snx:recommendationsCount');
      return this.ratingCount;
   },
   getUrlRecommendation: function() {
      console.log("CMISFile.getUrlRecommendation()");
      return null;
   },
   isUserRecommended: function() {
      console.log("CMISFile.isUserRecommended()");
      return false;
   },
   
   _CMIS_PERMISSIONS: {
      "cmis:canGetProperties":          ["ViewProperties"],
      "cmis:canGetContentStream":       ["ViewContent","View"],
      "cmis:canSetContentStream":       ["EditContent"],
      "cmis:canUpdateProperties":       ["Edit","EditProperties"],
      "cmis:canDeleteObject":           ["Delete", "DeleteFromCollection"],
      "cmis:canAddObjectToFolder":      ["GrantAccessView"],
      "cmis:canRemoveObjectFromFolder": ["DeleteFromCollection"],
      "cmis:canApplyACL":               ["GrantAccess", "GrantAccessView", "GrantAccessEdit", "LockOverride"]
   },   
   getPermissions: function() {
      if (!this.permissions) {
         var qud = lconn.share.util.dom;

         this.permissions = {};
         var nodes = lconn.share.util.dom.xpath(this.e, "cmisra:object/cmis:allowableActions/*[text()='true']");
         for(var n=null, i=0; n = nodes[i++];) {
            var cmisPermissions = this._CMIS_PERMISSIONS[n.nodeName] || [];
            for(var p=null,j=0; p = cmisPermissions[j++];)
               this.permissions[p] = true;
         }
      }
      return this.permissions;
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

   isViralShareAllowed: function() {
      if (typeof this.isSharedViral == "undefined") 
         this.isSharedViral = this.getPropertyBoolean('snx:isSharedViral', false); 
      return this.isSharedViral;
   },

   getNotifications: function() {
      console.log("CMISFile.getNotifications()");
      return {};
   },
   hasNotifications: function() {
      console.log("CMISFile.hasNotifications()");
      return false;
   },
   getTimesDownloaded: function() {
      if (typeof this.downloadCount == "undefined")
         this.downloadCount = this.getPropertyInteger('snx:downloadCount');
      return this.downloadCount;
   },
   getTimesDownloadedAnonymously: function() {
      if (typeof this.anonymousDownloadCount == "undefined")
         this.anonymousDownloadCount = this.getPropertyInteger('snx:downloadCountAnon');
      return this.anonymousDownloadCount;
   },
   getUrlFeed: function() {
      console.log("CMISFile.getUrlFeed()");
      return null;
   },
   getUrlAlternate: function() {
      var url = lconn.share.util.dom.xpathString(this.e, "atom:link[@rel='alternate' and @type='text/html']/@href");
      return url;
   },
   getTags: function() {
      console.log("CMISFile.getTags()");
      return [];
   },
   getSize: function() {
      if (typeof this.size == "undefined")
         this.size = this.getPropertyInteger('cmis:contentStreamLength');
      return this.size;
   },
   getTotalSize: function() {
      if (typeof this.totalSize == "undefined")
         this.totalSize = this.getPropertyInteger('snx:sizeAppliedToQuota');
      return this.totalSize;
   },
   getVersionLabel: function() {
      if (typeof this.versionLabel == "undefined")
         this.versionLabel = this.getPropertyString('cmis:versionLabel');
      return this.versionLabel;
   },
   getCommentCount: function() {
      if (typeof this.commentCount == "undefined")
         this.commentCount = this.getPropertyInteger('snx:commentCount');
      return this.commentCount;
   },

   getShareCount: function() {
      console.log("CMISFile.getShareCount()");
      return 0;
   },
   getCollectionCount: function() {
      console.log("CMISFile.getCollectionCount()");
      return 0;
   },
   getVersionCount: function() {
      console.log("CMISFile.getVersionCount()");
      return 1;
   }
});

dojo.declare("lconn.share.bean.FileFromCMISJson", lconn.share.bean.FileFromJson, {
   // TODO: finish implementing CMIS-specific getters
   constructor: function(doc) {
      this.d = doc;
      doc.links = doc.links || [];
      doc.extensions = doc.extensions || [];
      doc.categories = doc.categories || [];
      doc.properties = doc.properties || [];
   },
   isFolder: function(){
      return false;
   },
   getName: function() {
      return this.getTitle();
   },
   getTitle: function() {
      if (!this.title)
         this.title = this._getProperty("cmis:name");
      return this.title;
   },
   getLabel: function() {
      if (!this.label)
         this.label = this._getProperty("cmis:contentStreamFileName");
      return this.label;
   },
   getId: function() {
      return this._getProperty("cmis:objectId");
   },
   getSize: function() {
      if (!this.length)
         this.length = parseInt(this._getProperty("cmis:contentStreamLength"));
      return this.length;
   },
   getTotalSize: function() {
      if (!this.totalSize)
         this.totalSize = parseInt(this._getProperty("snx:sizeAppliedToQuota"));
      return this.totalSize;
   },
   getUpdated: function() {
      if (!this.updated)
         this.updated = lconn.share.util.misc.date.convertAtomDate(this._getProperty("cmis:lastModificationDate"));
      return this.updated;
   },
   getAuthor: function() {
      if (!this.author)
         this.author = this._getUser("cmis:createdBy");
      return this.author;
   },      
   getModifier: function() {
      if (!this.modifier)
         this.modifier = this._getUser("cmis:lastModifiedBy");
      return this.modifier;
   },   
   getCategory: function() {
      console.log("FromFromCMISJson.getCategory()");
      return null;
   },
   getVersionNumber: function() {
      if (!this.version)
         this.version = lconn.share.util.text.parseInt(this._getProperty("cmis:versionLabel"), 1);
      return this.version;
   },
   getVisibility: function() {
      if (!this.vis) {
         this.vis = this._getProperty("snx:visibilityComputed");
      }
      return this.vis;
   },
   isExternal: function() {
      if (this._isExternal == undefined) {
         this._isExternal = this._getProperty("snx:isExternal") == "true";
      }
      return this._isExternal;
   },
   getShareCount: function() {
      console.log("FromFromCMISJson.getCollectionCount()");
      return 0;
   },
   getCollectionCount: function() {
      console.log("FromFromCMISJson.getCollectionCount()");
      // TODO: UploadFile uses this to decide whether to set collectionChange on the success event
      return 0;
   },
   
   _getUser: function(id) {
      var user = {};
      try {
         var el = lconn.share.util.misc.indexById(this.d.properties,"propertyDefinitionId",id);
         if (el) {
            user.id = el.principalId;
            user.email = el.email;
            user.name = el.value[0].value;
         }
      } catch(e) {
         console.log(e);
      }
      return user;
   },
   _getProperty: function(id){
      var value;
      try {
         value = lconn.share.util.misc.indexById(this.d.properties,"propertyDefinitionId",id).value[0].value;
      } catch(e) {
         console.log(e);
      }
      return value;
   }
});

lconn.share.bean.File.CONTEXTS = {};
lconn.share.bean.File.CONTEXTS.FILES = ["communityFiles", "personalFiles"];
lconn.share.bean.File.CONTEXTS.ECM = ["communityECMFiles", "library"];

lconn.share.bean.File.createBean = function(e, opt) {
   var isCMIS = opt && opt.apiType == "cmis";
   var isJSON = opt && opt.format == "json";
   if (isCMIS)
      return isJSON ? new lconn.share.bean.FileFromCMISJson(e) : new lconn.share.bean.FileCMIS(e);
   else
      return isJSON ? new lconn.share.bean.FileFromJson(e) : new lconn.share.bean.File(e);
};

})();
