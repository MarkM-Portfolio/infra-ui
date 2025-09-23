/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/hash",
  "dojo/string",
  "dojo/_base/lang",
  "../data/util/routes",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/has",
  "ic-core/util/connectionsUrlUtil",
  "dojo/on",
  "dojo/topic",
  "./url",
  "../config/globals"
  ], function (hash, string, lang, routes, i18n, has, connectionsUrlUtil, on, topic, urlUtil, globals) {
  "use strict";
  
  if (!window._historyUtilPopstateHandle) {
    window._historyUtilPopstateHandle = on(window, "popstate", function (e) {
      var fileId = lang.getObject("state.fileId", false, e);
      if (fileId) {
        openFromId(fileId);
      }
    });
  }
  
  if (!window._historyUtilHashchangeHandle && has("fileviewer-detailspage")) {
    window._historyUtilHashchangeHandle = topic.subscribe("/dojo/hashchange", lang.hitch(this, function () {
      if (window.location.href !== window._historyUtilCurrentFileUrl && connectionsUrlUtil.shouldOpenConnectionsPreview(window.location.href)) { 
        openFromId(connectionsUrlUtil.getFileId(window.location.href));
      }
    }));
  }
  
  function openFromId(fileId) {
    window["ic-share"].fileviewer.ConnectionsFileViewer.openFromId(fileId);
  }
    
  function pushState(state, urls, replace) {
    var url, fragment,
      pageSupportsFileHash = routes.doesPageSupportFileHash();
    if (historyUtil.historySupported && urls.full) {
      url = urlUtil.removeHost(urls.full);
      
      if (url === urlUtil.removeHost(window.location.href)) {
        return;
      }
      
      if (replace) {
        window.history.replaceState(state, null, url);
      } else {
        window.history.pushState(state, null, url);
      }
    } else if (routes.doesPageSupportFileHash() && urls.hashed) {
      url = urls.hashed;
      
      fragment = "#" + urlUtil.createUri(url).fragment;
      
      if (fragment === window.location.hash) {
        return;
      }
      
      if (replace) {
        window.location.replace(fragment);
      } else {
        window.location = fragment;
      }
    }
  }
  
  var pageUrl;
  updatePageUrl();
  function updatePageUrl() {
    if (window.location.href !== pageUrl && !connectionsUrlUtil.isConnectionsFileUrl(window.location.href)) {
      pageUrl = window.location.href;
    }
  }
  
  setInterval(updatePageUrl, 250);
  
  var historyUtil = {
    onOpen: function (file, currentViewerState) {
      if (!this._shouldUpdateHistory(file)) {
        return;
      }
      
      var shouldReplace = currentViewerState.isOpen,
        windowTitle,
        isCurrentUrlFileUrl = false;
      
      // Used to handle the case when rewriting the hashed file URL to the unhashed version
      if (connectionsUrlUtil.isConnectionsFileUrl(window.location.href) && connectionsUrlUtil.getFileId(window.location.href) === file.args.id) {
        shouldReplace = true;
        isCurrentUrlFileUrl = true;
      }
      
      updatePageUrl();
      this._setFileUrl(file, shouldReplace, isCurrentUrlFileUrl);
      
      windowTitle = !file.args.loadError ?
        string.substitute(i18n.WINDOW_TITLE.FILE, {fileName: file.args.name}) :
        i18n.WINDOW_TITLE.LOAD_ERROR;
      this._setTitle(windowTitle);
    },
    
    _setFileUrl: function (file, replace, isCurrentUrlFileUrl) {
      this.backgroundPageUrl = pageUrl;
      if (!this.backgroundPageUrl) {
        this.backgroundPageUrl = routes.getClosedFileUrlHashed();
      }
      
      var urls, newUrl;
      
      urls = this._getFileUrls(file, isCurrentUrlFileUrl);
      
      pushState({fileId: file.args.id}, urls, replace);
      
      newUrl = window.location.href;
      this.currentFileUrl = newUrl;
      
      // This file is currently being loaded on the page multiple times, and because of this,
      // the historyUtilHashchangeHandle code that is above cannot access the proper historyUtil
      // in order to access the currentFileUrl property. As a temporary workaround, I'm setting a
      // global variable that can be checked in our hashchangeHandle code
      window._historyUtilCurrentFileUrl = this.currentFileUrl;
    },
    
    onClose: function (currentViewerState, file) {
      if (!this._shouldUpdateHistory(file)) {
        return;
      }
      
      if (!currentViewerState.isOpening && this.currentFileUrl === window.location.href) {
        this._setClosedFileUrl();
      }
      
      this._unsetTitle(currentViewerState.isOpening);
      this.currentFileUrl = undefined;
      window._historyUtilCurrentFileUrl = this.currentFileUrl;
    },
    
    _getFileUrls: function (file, isCurrentUrlFileUrl) {
      var urls,
        initialFileUrl;
      
      initialFileUrl = isCurrentUrlFileUrl ? window.location.href : file.args.links.linkTarget;
      
      if (initialFileUrl) {
        urls = {
          full: urlUtil.fromFilesAnchorForm(initialFileUrl) + "",
          hashed: urlUtil.toFilesAnchorForm(initialFileUrl) + ""
        };
      } else {
        urls = this._getDefaultFileUrls(file);
      }
      return urls;
    },
    
    _getDefaultFileUrls: function (file) {
      return {
        full: file.args.links.details,
        hashed: urlUtil.toFilesAnchorForm(file.args.links.details) + ""
      };
    },
    
    removeFileParameters: function (file) {
      pushState({fileId: file.args.id}, this._getDefaultFileUrls(file), true);
      this.currentFileUrl = window.location.href;
    },
        
    _setClosedFileUrl: function () {
      var closedFileUrlHashed = routes.getClosedFileUrlHashed(this.backgroundPageUrl);
      var urls = {
        full: this.backgroundPageUrl || closedFileUrlHashed,
        hashed: closedFileUrlHashed
      };
      
      pushState({}, urls, false);
      
      if (!this.backgroundPageUrl) {
        this.backgroundPageUrl = window.location.href;
      }
    },
    
    _setTitle: function (title) {
      this._currentTitle = title;
      
      this._backgroundPageTitle = this._backgroundPageTitle || window.document.title;
      this._titleCheckId = setInterval(lang.hitch(this, function () {
        if (window.document.title !== this._currentTitle) {
          this._backgroundPageTitle = window.document.title;
          window.document.title = this._currentTitle;
        }
      }), 500);
      
      this._titleChangeListener = topic.subscribe("ic-fileviewer/filenamechanged", lang.hitch(this, function (args) {
        window.document.title = this._currentTitle = args.newFileName;
      }));
      
      window.document.title = this._currentTitle;
    },
    
    _unsetTitle: function (isOpening) {
      clearInterval(this._titleCheckId);
      this._titleChangeListener.remove();
      
      if (!isOpening) {
        window.document.title = this._backgroundPageTitle;
        delete this._backgroundPageTitle;
      }
    },
    
    _shouldUpdateHistory: function (file) {
      return !globals.isIframePage && has("fileviewer-detailspage") && 
         (routes.doesPageSupportFileHash() || historyUtil.historySupported) && (file.args.libraryType !== "library");
    }
  };
  
  historyUtil.historySupported = has("fileviewer-history") && !!window.history.pushState;
  historyUtil.doesPageSupportFileHash = routes.doesPageSupportFileHash;
  
  return historyUtil;
});
