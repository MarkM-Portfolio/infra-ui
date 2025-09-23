/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/Stateful",
  "dojo/_base/lang",
  "dojo/Deferred",
  "dojo/when",
  "dojo/io-query",
  "../data/CommentFeedDataStore",
  "../data/VersionFeedDataStore",
  "../data/FileEntryDataStore",
  "../data/ShareWithLinkEntryDataStore",
  "../data/SharingFeedDataStore",
  "../data/ShareLinksFeedDataStore",
  "../data/ShareHistoryFeedDataStore",
  "../data/MyDriveFeedDataStore",
  "../data/RecommendationFeedDataStore",
  "../data/DownloadInfoFeedDataStore",
  "../data/FavoritesFeedDataStore",
  "../data/TagDataStore",
  "../data/util/routes",
  "./AtomBean",
  "../util/FilePermissions",
  "../data/RepositoryDataStore",
  "../data/docsApi",
  "../util/ibmDocs",
  "dojo/topic",
  "./ModeratedBean",
  "dojo/_base/url",
  "../util/url",
  "../config/globals"
], function (declare, Stateful, lang, Deferred, when, ioQuery, CommentFeedDataStore, VersionFeedDataStore,
    FileEntryDataStore, ShareWithLinkEntryDataStore, SharingFeedDataStore, ShareLinksFeedDataStore, ShareHistoryFeedDataStore, MyDriveFeedDataStore,
    RecommendationFeedDataStore, DownloadInfoFeedDataStore, FavoritesFeedDataStore, TagDataStore, routes, AtomBean,
    FilePermissions, RepositoryDataStore, docsApi, ibmDocs, topic, ModeratedBean, dojoUrl, urlUtil, globals) {

  return declare([AtomBean, ModeratedBean], {
    
    constructor: function () {
      this.permissions = new FilePermissions({file: this});
      this.refreshEntry = false;
      this.moderatedBeanType = "document";
      topic.subscribe("ic-fileviewer/refresh", lang.hitch(this, function () {
        this.refreshEntry = true;
        delete this._fullEntry;
        delete this.sharingFeed;
        delete this.collectionSharingFeed;
        delete this.myDriveCollectionSharingFeed;
      }));
    },
    
    postscript: function () {
      this.inherited(arguments);
      
      this.set("entryUrl", routes.getFileEntryUrl(this));
      
      this.hasEntry = !!this.get("title");
      this.get("fileEntryFeed");
      
      this._initilized = true;
    },
    
    _permissionsSetter: function (permissions) {
      this.permissions.setPermissionsObject(permissions);
    },
    
    _objectTypeIdSetter: function (objectTypeId) {
      this.objectTypeId = objectTypeId;
      this.set("isDocsFile", ibmDocs.isDocsFile(this));
    },
    
    _communityIdGetter: function () {
      if (lang.isString(this.communityId)) {
        return this.communityId;
      }
      
      if (this.get("libraryType") === "communityFiles") {
        var alternateLink, path;
        alternateLink = this.get("alternateUrl") || this.get("links").alternate;
        path = alternateLink.substring(alternateLink.indexOf("?") + 1, alternateLink.indexOf("#"));
        this.communityId = ioQuery.queryToObject(path).communityUuid;
      } else {
        this.communityId = "";
      }
      
      return this.communityId;
    },
    
    _locationGetter: function () {
      if (this._location !== undefined) {
        return this._location;
      }
      
      var links = this.get("links"),
        fileUrl = links.linkTarget || links.details;
      
      this._location = urlUtil.isFilesUrl(fileUrl) ? "personalFiles" : "communityFiles";
      
      return this._location;
    },
    
    _widgetIdGetter: function () {
      if (this._widgetId !== undefined) {
        return this._widgetId;
      }
      
      var links = this.get("links"), hash;
      
      if (this.get("location") !== "communityFiles") {
        this._widgetId = "";
      } else {
        hash = new dojoUrl(links.linkTarget || links.details).fragment;
        this._widgetId = ioQuery.queryToObject(hash).fullpageWidgetId;
      }
      
      return this._widgetId;
    },
    
    _entryGetter: function () {
      if (this.hasEntry && !this.refreshEntry) {
        return this;
      }

      this.refreshEntry = false;
      return this.get("fullEntry");
    },
    
    _fullEntryGetter: function () {
      if (this._fullEntry) {
        return this._fullEntry;
      }

      if (globals.isCCM(this)) {
         this.hasEntry = true;
         this._fullEntry = new Deferred();
         this._fullEntry.resolve(this);
         return this._fullEntry;
      }

      this._fullEntry = this.get("fileEntryFeed").loadItem(this).then(lang.hitch(this, function() {
        this.hasEntry = true;
        return this;
      }));
      
      return this._fullEntry;
    },
    
    _commentFeedGetter: function () {
      if (this.commentFeed) {
        return this.commentFeed;
      }

      this.commentFeed = new CommentFeedDataStore({url: routes.getFileFeedUrl(this), file: this});
      return this.commentFeed;
    },
    
    _versionFeedGetter: function () {
      if (this.versionFeed){
        return this.versionFeed;
      }
      
      this.versionFeed = new VersionFeedDataStore({url: routes.getFileFeedUrl(this), file: this});
      
      return this.versionFeed;
    },
    
    _fileEntryFeedGetter: function() {
      if (this.fileEntryFeed) {
        return this.fileEntryFeed;
      }
      
      this.fileEntryFeed = new FileEntryDataStore({url: this.get("entryUrl"), file: this});
      return this.fileEntryFeed;
    },
    
    _sharingFeedGetter: function () {
      if (this.sharingFeed){
        return this.sharingFeed;
      }
      
      this.sharingFeed = new SharingFeedDataStore({url: routes.getPermissionsFeedUrl(this), file: this, showEveryone: true});
      
      return this.sharingFeed;
    },
    
    _collectionSharingFeedGetter: function () {
      if (this.collectionSharingFeed){
        return this.collectionSharingFeed;
      }

      this.collectionSharingFeed = new SharingFeedDataStore({url: routes.getFileCollectionsFeedUrl(this), file: this});
      
      return this.collectionSharingFeed;
    },
    
    _myDriveCollectionSharingFeedGetter: function () {
      if (this.myDriveCollectionSharingFeed){
        return this.myDriveCollectionSharingFeed;
      }

      this.myDriveCollectionSharingFeed = new MyDriveFeedDataStore({url: routes.getFileCollectionsFeedUrl(this), file: this});

      return this.myDriveCollectionSharingFeed;
    },
    
    _shareLinksFeedGetter: function () {
      if (this.shareLinksFeed){
        return this.shareLinksFeed;
      }
      
      this.shareLinksFeed = new ShareLinksFeedDataStore({url: routes.getShareLinksFeedUrl(this), file: this});
      
      return this.shareLinksFeed;
    },
    
    _shareWithLinkEntryGetter: function () {
       if (this.shareWithLinkEntry){
          return this.shareWithLinkEntry;
       }
       this.shareWithLinkEntry = new ShareWithLinkEntryDataStore({url: this.get("entryUrl"), file: this});
       
       return this.shareWithLinkEntry;
    },
    
    _shareHistoryFeedGetter: function () {
      if (this.shareHistoryFeed){
        return this.shareHistoryFeed;
      }
      
      this.shareHistoryFeed = new ShareHistoryFeedDataStore({url: routes.getMySharesFeedUrl(), file: this});
      
      return this.shareHistoryFeed;
    },
    
    _recommendationFeedGetter: function () {
      if (this.recommendationFeed){
        return this.recommendationFeed;
      }
      
      this.recommendationFeed = new RecommendationFeedDataStore({url: routes.getRecommendationFeedUrl(this), file: this});
      
      return this.recommendationFeed;
    },
    
    _downloadInfoFeedGetter: function () {
      if (this.downloadInfoFeed){
        return this.downloadInfoFeed;
      }
      
      this.downloadInfoFeed = new DownloadInfoFeedDataStore({url: routes.getDownloadInfoFeedUrl(this), file: this});
      
      return this.downloadInfoFeed;
    },
    
    _tagFeedGetter: function () {
      if (this.tagFeed){
        return this.tagFeed;
      }
      
      this.tagFeed = new TagDataStore({url: routes.getTagServiceUrl(), file: this});
      
      return this.tagFeed;
    },
    _favoritesFeedGetter: function () {
      if (this.favoritesFeed) {
         return this.favoritesFeed;
      }
      
      this.favoritesFeed = new FavoritesFeedDataStore({url: routes.getFavoritesFeedUrl(), serviceUrl: routes.getFavoritesServiceUrl(), file: this});
      
      return this.favoritesFeed;
    },
    
    /**
     * @return the Docs draft info, or null if the file is not found on the Docs server
     * or if the user does not have entitlement
     */
    getDocsDraftInfo: function () {
      return ibmDocs.isDocsEnabled().then(lang.hitch(this, function (isDocsEnabled) {
        if (isDocsEnabled) {
          return docsApi.getDraftInformation(this).then(lang.hitch(this, function (docsDraftInfo) {
            this.set("docsDraftInfo", docsDraftInfo);
            return docsDraftInfo;
          }), function (error) {
            return null;
          });
        } else {
          return null;
        }
      }));
    },
    
    _repositoryFeedGetter: function () {
      if (this.repositoryFeed){
        return this.repositoryFeed;
      }
      
      this.repositoryFeed = new RepositoryDataStore({file: this});
      
      return this.repositoryFeed;
    },
    
    _repositoryGetter: function () {
      return this.get("repositoryFeed").getFileRepository();
    },
    
    like: function () {
      var feed = this.get("recommendationFeed");
      return feed.newItem().create();
    },
    
    unlike: function () {
      var recommendation = this.get("recommendationFeed").newItem();
      recommendation.set("entryUrl", routes.getRecommendationUrl(this));
      return recommendation.remove();
    },
    
    stopSharing: function () {
      var feed = this.get("sharingFeed");
      return feed.newItem().remove({stopSharing: true});
    },
    
    addTags: function (tags) {
      var newItem = this.get("tagFeed").newItem();
      newItem.set("value", tags);
      return newItem.create();
    },
    
    removeTag: function (tagString) {
      var newItem = this.get("tagFeed").newItem();
      newItem.set("value", tagString);
      return newItem.remove();
    },
    
    _visibilitySetter: function (value) {
      this.visibility = value;
      return this._dirtyPromise;
    },
    
    _nameSetter: function (name) {
       this.name = name;
       var extension = name.split('.').pop();
       this.set("type", extension.toLowerCase());
       return this._dirtyPromise;
    },
    
    _typeSetter: function(type) {
       this.type = type.toLowerCase();
       return this._dirtyPromise;
    },

    _isLockedSetter: function (isLocked) {
       this.isLocked = isLocked;
       return this._dirtyPromise;
    },
    hasDownloadInfo: function() {
       return typeof this.get("currentUserDownloadInfo").hasDownloaded != "undefined";
    },
    hasDownloaded: function() {
       return this.get("currentUserDownloadInfo").hasDownloaded;
    },
    hasDownloadedLatest: function() {
       var downloadInfo = this.get("currentUserDownloadInfo");
       return downloadInfo.hasDownloaded && downloadInfo.versionNumber === this.get("version");
    }
  });
});
