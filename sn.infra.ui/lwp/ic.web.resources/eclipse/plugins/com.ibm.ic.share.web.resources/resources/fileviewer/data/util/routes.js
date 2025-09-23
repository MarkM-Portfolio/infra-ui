/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/string",
  "dojo/io-query",
  "../../config/globals",
  "../../util/url",
  "../../util/dom",
  "dojo/_base/config",
  "dojo/_base/url",
  "dojo/_base/lang"
], function (string, ioQuery, globals, urlUtil, dom, config, dojoUrl, lang) {
  "use strict";

  var filesContextRoot = lconn.core.url.getServiceUrl(lconn.core.config.services.files).path;
  var communitiesInfo = lconn.core.url.getServiceUrl(lconn.core.config.services.communities);
  var communitiesContextRoot = (communitiesInfo && communitiesInfo.path) ? communitiesInfo.path : "/communities";
  var _basePath = filesContextRoot + "/";
  var _basic = _basePath + "basic/api/";
  var _basicAnon = _basePath + "basic/anonymous/api/";
  var _form = _basePath + "form/api/";
  var _formAnon = _basePath + "form/anonymous/api/";
  var originalPageUrl = window.location.href;

  function getServiceUrl(path) {
    var anonymousPath = globals.isAuthenticated ?  "" : "/anonymous";
    return filesContextRoot + "/basic" + anonymousPath + path;
  }
  
  function getCommunityUrl(path, file) {
    var url = string.substitute("/api/communitylibrary/${communityId}", {
      communityId: file.get("communityId")
    });
    return url + path;
  }
  
  function getUserLibraryUrl(path, file) {
    var authorId = file.get("author").id,
      url = authorId === globals.currentUser.id ? "/api/myuserlibrary" : "/api/userlibrary/${userId}";
    url = string.substitute(url, {userId: authorId});
    return url + path;
  }
  
  function getContextUrl(path, file) {
    if (file.get("libraryType") === "communityFiles") {
      path = getCommunityUrl(path, file);
    } else {
      path = getUserLibraryUrl(path, file);
    }
    
    return getServiceUrl(path);
  }
  
  // Only works from inside a community
  function getWidgetId() {
    var wpUtils = define._modules['ic-core/wp/utils']; // Use it if it is available, but do not cause it to be loaded

    if (wpUtils) {
      var widgets = wpUtils.getWidgetInstancesByDef("Files");
      return ((widgets && widgets.length) ? widgets[0].instanceId : "");
    }
    return "";
  }
  
  function getFilesAppUrl(path) {
    return filesContextRoot + "/app" + path;
  }
  
  function safeSubstitute(url, file) {
     if (file) {
        if (file.get("id")) {
           return string.substitute(url, {
              fileId: file.get("id"),
              collectionId: file.get("id")
           });
        }
     }
     
     return url;
  }

  if (window.notesiniParameters) {
    filesContextRoot = window.notesiniParameters.bssUrl + filesContextRoot;
  }
  
  return {
    getFileEntryUrl: function (file) {
      var url = getServiceUrl("/api/document/${fileId}/entry");
      return safeSubstitute(url, file);
    },
    
    getFileFeedUrl: function (file) {
      var url = getServiceUrl("/api/document/${fileId}/feed");
      return safeSubstitute(url, file);
    },
    
    getCollectionFeedUrl: function (collection) {
      var url = getServiceUrl("/api/collection/${collectionId}/feed");
      return safeSubstitute(url, collection);
    },
    
    getPermissionsFeedUrl: function (file) {
      var url = getContextUrl("/document/${fileId}/permissions/feed", file);
      return safeSubstitute(url, file);
    },
    
    getFileCollectionsFeedUrl: function (file) {
      var url = getContextUrl("/document/${fileId}/collections/feed", file);
      return safeSubstitute(url, file);
    },
    
    getShareLinksFeedUrl: function (file) {
      var url = getContextUrl("/document/${fileId}/sharelinks/feed", file);
      return safeSubstitute(url, file);
    },
    
    getSharesFeedUrl: function () {
      return getServiceUrl("/api/shares/feed");
    },
    
    getMySharesFeedUrl: function () {
      return getServiceUrl("/api/myshares/feed");
    },
    
    getRecommendationFeedUrl: function (file) {
      var url = getServiceUrl("/api/document/${fileId}/recommendedby/feed");
      return safeSubstitute(url, file);
    },
    
    getRecommendationUrl: function (file) {
      var url = getServiceUrl("/api/document/${fileId}/recommendation/${userId}/entry");
      return string.substitute(url, {
        fileId: file.get("id"),
        userId: globals.currentUser.id
      });
    },
    
    getDownloadInfoFeedUrl: function (file) {
      var url = getServiceUrl("/api/document/${fileId}/downloadedby/feed");
      return safeSubstitute(url, file);
    },
    
    getMyFileSyncUrl: function () {
      var url = getServiceUrl("/api/myfilesync/feed");
      return url;
    },
    
    getAclValidationUrl: function (file) {
      return this.getFileEntryUrl(file);
    },
    
    getFavoritesFeedUrl: function (file) {
       return getServiceUrl("/api/myfavorites/feed");
    },
    getFavoritesServiceUrl: function() {
       return getServiceUrl("/api/myfavorites/documents/feed");
    },
    getTagServiceUrl: function () {
      return getServiceUrl("/api/tags/feed");
    },
    
    getTagUrl: function (file, tag, backgroundPageUrl) {
      var url;
      if (urlUtil.isCommunityUrl(window.location.href)) {
        var match = window.location.pathname.match("(.*/service/html/)(.*)"),
          pathname, base, servlet;
        
        // Hack to ensure that if we are viewing the file from outside of a community, the tag link will
        // will have a different pathname than the pathname of the current URL so that clicking on it
        // will redirect to the tag page.
        if (!urlUtil.isCommunityUrl(originalPageUrl) && match && match.length === 3) {
          base = match[1];
          servlet = match[2];
          if (servlet !== "communityview") {
            servlet = "communityview";
          } else {
            servlet = "communityoverview";
          }
          pathname = base + servlet;
        } else {
          pathname = window.location.pathname;
        }
        
        url = pathname + window.location.search + "#" + ioQuery.objectToQuery({
          fullpageWidgetId: file.get("widgetId"),
          tag: tag,
          pivot: "all"
        });
      } else if (urlUtil.isInsideFolder(backgroundPageUrl)) {
         url = urlUtil.rewrite(backgroundPageUrl, {
            sort: "modified",
            tag: tag
          });
      } else {
        url = string.substitute(getFilesAppUrl("/person/${userId}"), {
          userId: file.get("author").id
        });
        
        url = urlUtil.rewrite(url, {
          tag: tag
        });
      }
      
      return url;
    },
    
    getRepositoryEntryUrl: function (file) {
      var url = getServiceUrl("/api/communitylibrary/${communityId}/entry?acls=true");
      return string.substitute(url, {
        communityId: file.get("communityId")
      });
    },

    getFileLockUrl: function (file, lock) {
      var url = getServiceUrl("/api/document/${fileId}/lock");

      if (lock) {
         url += "?type=" + lock;
      }

      return safeSubstitute(url, file);
    },

    getFilesBasePath: function () {
      return globals.services.getFilesUrl();
    },

    getFilesFormPath: function () {
      return globals.services.getFilesUrl() + "/form/api/";
    },
    
    getUserInfoServiceUrl: function () {
      return urlUtil.rewrite(getServiceUrl("/api/people/feed"), {
        self: true,
        format: "json"
      });
    },
    
    getFilesAppRoutes: function (file) {
      if(file.get("libraryType") === "communityFiles") {
        return this.getCommunityFilesRoutes(file);
      } else {
        return this.getPersonalFilesRoutes(config.locale, {});
      }
    },

    getCommunityFilesRoutes: function (file) {
      var args = {
          basePath: this.getFilesBasePath(),
          disableAnonymous: false,
          _form: this.getFilesFormPath(),
          _cId: file.get("communityId"),
          getAuthenticatedUser: function () {return globals.pickerAuth.getUser();}
      };
      return new globals.commRoutes(args);
    },

    getPersonalFilesRoutes: function () {
      var _routes = new globals.pickerRoutes(config.locale, {});
      _routes.getAuthenticatedUser = function () {return globals.pickerAuth.getUser();};
      return _routes;
    },

    getFilesNonceUrl: function () {
       return getServiceUrl("/api/nonce");
    },

    getCommunityLink: function (community) {
       return communitiesContextRoot + "/service/html/communityview?communityUuid=" + community.communityUuid; 
    },
    
    getFolderLink: function(folder) {
       var href = "";
       var d = new Date();
       if (folder.get('collectionType') === "personal") {
         href = getFilesAppUrl("/folder/" + folder.get('id') + "?preventCache=" + d.getTime());
       } else if (folder.get('collectionType') === "community") {
         href = this.getCommunityLink(folder) + "&preventCache=" + d.getTime() + "#fullpageWidgetId=" + folder.externalInstanceId + "&folder=" + folder.get("id") ;
       }       
       return href;
    },

    getNameCheckUrl: function (path, file) {
      return getContextUrl(path, file);
    },
    
    getExtensionsUrl: function () {
      var bssUrl = globals.coreUrl.getServiceUrl(globals.coreServices.bss);

      if (!bssUrl) {
         return;
      }

      return bssUrl + "/extensions/getExtensions/byService/files?";
    },

    getAppregExtensionsUrl: function () {
      // TODO will appreg url always be the same domain as the file preview page (so that we can use relative URL)?
      return "/appregistry/api/v2/services/Files?";
    },

    getCommentListServiceUrl: function(file, opt) {
       return this._getListServiceUrl(file, opt, "comment");
    },

    getVersionListServiceUrl: function(file, opt) {
       return this._getListServiceUrl(file, opt, "version");
    },

    _getListServiceUrl: function(file, opt, category) {
       return this._getListFilesUrl(file, opt, category);
    },

    _getListFilesUrl: function(file, opt, category) {
       var userId = file.author.id; 
       var fileId = file.id;

       var url = this._getUSB(userId, "document/{fileId}/feed", "document/{fileId}/feed", opt);
       url = url.replace("{fileId}", encodeURIComponent(fileId));

       var p = this._getListOptions(opt);
       if (opt) {
          if (opt.fetchAcl) {
             p.acls = true;
          }
          if (opt.fileType) {
             p.fileType = opt.fileType;
          }
          if (opt.deleteFrom) {
             p.deleteFrom = opt.deleteFrom;
          }
          if (opt.fetchAcl) {
             p.acls = true;
          }
       }
       if (!p.category) {
          p.category = category;
       }
       if(opt.contentFormat) {
          p.contentFormat = opt.contentFormat;
       }
       return url + globals.coreUrl.writeParameters(p);
    },

    _getListCommunitiesUrl: function(file, opt, category) {
       var url = this._getSB("communitylibrary/{communityId}/document/{fileId}/feed", opt);
       url = url.replace("{communityId}", encodeURIComponent(file.get("communityId")));
       url = url.replace("{fileId}", encodeURIComponent(file.get("id")));
       var p = {};
       if (opt) {
          if (opt.fetchAcl) {
             p.acls = true;
          }
          if (opt.pageSize) {
             p.pageSize = opt.pageSize;
          }
          if (opt.page) {
             p.page = opt.page;
          }
          else if (opt.start) {
             p.sI = opt.start;
          }
          if (opt.sortKey) {
             p.sK = opt.sortKey;
             p.sO = opt.sortDescending ? "dsc" : "asc";
          }
          if (opt.category) {
             p.category = opt.category;
          }
          if (opt.fileType) {
             p.fileType = opt.fileType;
          }
          if (typeof opt.format != "undefined") {
             p.format = opt.format;
          }
       }

       if (!p.category) {
          p.category = category;
       }

       if (dojo.isIE) {
          p.format = p.format || "xml";
       }

       if(opt.contentFormat) {
          p.contentFormat = opt.contentFormat;
       }

       return url + globals.coreUrl.writeParameters(p);
    },

    _getSB: function(path, opt, pathAuth) {
       // Force an anonymous URL, even when authenticated, for things like public feeds
       var anonymous = opt && opt.anonymous && !globals.disableAnonymous;
       var basicAuth = opt && opt.basicAuth;

       // Force a non-personal url, for things like feed subscriptions
       var nonPersonal = opt && opt.nonPersonal;
       if (nonPersonal) {
          pathAuth = null;
       }

       if (basicAuth) {
          if (!anonymous && this.isAuthenticatedUser()) {
             return _basic + (pathAuth || path);
          }
          return _basicAnon + path;
       }
       if (!anonymous && this.isAuthenticatedUser()) {
          return this._form + (pathAuth || path);
       }
       return _formAnon + path;
    },

    isAuthenticatedUser: function(userId) {
       var u = globals.pickerAuth.getUser();
       if (!userId) {
          return typeof u == "object" && u != null;
       }
       return u && u.id == userId;
    },

    _getUSB: function(userId, path, pathPersonal, opt) {
       // Force an anonymous URL, even when authenticated, for things like public feeds
       var anonymous = opt && opt.anonymous && !globals.disableAnonymous;
       var basicAuth = opt && opt.basicAuth;

       // Force a non-personal url, for things like feed subscriptions
       var nonPersonal = opt && opt.nonPersonal;
       if (nonPersonal) {
          pathPersonal = null;
       }

       var s;
       if (basicAuth) {
          if (!anonymous && this.isAuthenticatedUser()) {
             if (pathPersonal &&  globals.pickerAuth.getUser().id == userId) {
                s = _basic + pathPersonal;
             } else {
                s = _basic + path.replace("{userId}", encodeURIComponent(userId));
             }
          } else { 
             s = _basicAnon + path.replace("{userId}", encodeURIComponent(userId));
          }
       }
       else {
          if (!anonymous && this.isAuthenticatedUser()) {
             if (pathPersonal &&  globals.pickerAuth.getUser().id == userId) {
                s = _form + pathPersonal;
             } else {
                s = _form + path.replace("{userId}", encodeURIComponent(userId));
             }
          } else {
             s = _formAnon + path.replace("{userId}", encodeURIComponent(userId));
          }
       }
       return s;
    },

    _getListOptions: function(opt) {
       var apiParams = ((opt && opt.apiParams) ? opt.apiParams : this.apiParams) || {};
       var sortKeys = (opt && opt.apiSortKeys) ? opt.apiSortKeys : null;

       var p = {};
       if (opt) {
          if (opt.page && apiParams.page) {
             p[apiParams.page] = opt.page;
          } else if (opt.start && apiParams.sI) {
             p[apiParams.sI] = opt.start;
          } else if (opt.page && opt.page > 1 && opt.pageSize && apiParams.sI) {
             p[apiParams.sI] = (opt.page - 1) * opt.pageSize + apiParams.zeroItem;
          }

          if (opt.pageSize && apiParams.pageSize) {
             p[apiParams.pageSize] = opt.pageSize;
          }
          if (typeof opt.format != "undefined" && apiParams.format) {
             p[apiParams.format] = opt.format;
          }
          if (opt.sortKey && apiParams.sK) {
             // Optionally map the sort key to a different sort param for this API
             opt.sortKey = sortKeys ? sortKeys[opt.sortKey] : opt.sortKey;
             if(opt.sortKey) {
                if(apiParams.sO) {
                   p[apiParams.sK] = opt.sortKey;
                   p[apiParams.sO] = opt.sortDescending ? apiParams.dsc : apiParams.asc;
                } else {
                   // If we don't support a sort order param, append the sort direction
                   p[apiParams.sK] = opt.sortKey + " " + (opt.sortDescending ? apiParams.dsc : apiParams.asc);
                }
             
                if(apiParams.sC) {
                   p[apiParams.sC] = opt.sortCategory;
                }
             }
          }
          if (opt.includeCount === false) {
             p.includeCount = false;
          }
          if (opt.preventCache) {
             p.preventCache = new Date().valueOf();
          }
          if (opt.isExternal) {
             p.isExternal = opt.isExternal;
          }
       }

       if (dojo.isIE && apiParams.format) {
          p[apiParams.format] = p.format || "xml";
       }
       return p;
    }, 
    
    getProvisionExternalUserUrl: function () {
       var bssUrl = globals.coreUrl.getServiceUrl(globals.coreServices.bss);
       if (!bssUrl) {
          return;
       }
       var invitePath = "/subscribers/inviteGuests/input";
       return bssUrl + invitePath;
    },
    
    getProvisionExternalUserReturnUrl: function (file) {
       var fileFormUrl = this.getFilesFormPath();
       var provisionSharePath = "provision/share";
       var returnScene = "app/file/" + file.get("id");     
       var query = {
             rs: encodeURIComponent(returnScene)
       };
       return fileFormUrl + provisionSharePath + "?" + ioQuery.objectToQuery(query);
    },
    
    getProvisionExternalUserCancelUrl: function (file) {
       var filesAppInvitedShareUrl = this.getFilesBasePath() + "/app/invited/share";
       var returnScene = "app/file/" + file.get("id");      
       var query = {
             rs: encodeURIComponent(returnScene)
       };
       return filesAppInvitedShareUrl + "?" + ioQuery.objectToQuery(query);
    },
    
    getCommunityWidgetsFeedUrl: function (communityId, widgetDefId) {
      return urlUtil.rewrite(communitiesContextRoot + "/service/atom/community/widgets", {
        communityUuid: communityId,
        widgetDefId: widgetDefId
      });
    },
    
    getClosedFileUrlHashed: function (backgroundPageUrl) {
      if (backgroundPageUrl) {
        if (backgroundPageUrl.indexOf("#") === -1) {
          backgroundPageUrl += "#";
        }
        return backgroundPageUrl;
      }
      
      var url;
      if (!window.ic_comm_communityUuid) {
        url = urlUtil.getServiceUrl(globals.coreServices.files) + "/app#/" + (globals.isAuthenticated ? "" : "public");
      } else {
        url = urlUtil.ensureQualified("#" + ioQuery.objectToQuery({
          fullpageWidgetId: getWidgetId()
        }));
      }
      
      return url;
    },
    getRelativeUri: function(inputUrl) {
       var windowUrl = new dojoUrl(window.location.href);
       var url = inputUrl || windowUrl.uri;
       return urlUtil.removeHost(url);
    },
    
    doesPageSupportFileHash: function (opt) {
      if (!opt) {
        opt = {};
      }
      
      if (this._pageSupportsFileHash !== undefined) {
        return this._pageSupportsFileHash;
      }
      
      var url = new dojoUrl(this._pageUrl || window.location.href),
        path = url.path,
        services = opt.services || globals.coreServices,
        filesUrl = urlUtil.getServiceUrl(services.files),
        communitiesUrl = urlUtil.getServiceUrl(services.communities);
      
      this._pageSupportsFileHash = false;
      if (path === (filesUrl.path + "/app")) {
        this._pageSupportsFileHash =  true;
      } else if (path.indexOf(communitiesUrl.path + "/service/html/") === 0 && !!ioQuery.queryToObject(url.query || "").communityUuid) {
        this._pageSupportsFileHash = true; 
      }
      
      return this._pageSupportsFileHash;
    },
    
    getFilesMyDriveUrl: function (path) {
      return filesContextRoot + "/app" + path;
    },
    
    getMyDriveFolderLink: function(folderId) {
      return getFilesAppUrl("/folder/" + folderId);
    }
  };
});
