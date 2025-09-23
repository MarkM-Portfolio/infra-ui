/* Copyright IBM Corp. 2014, 2016  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/window",
  "./FileViewerImpl",
  "dojo/_base/lang",
  "dojo/dom-class",
  "dijit/focus",
  "./data/FilesAPI",
  "dojo/Evented",
  "dojo/topic",
  "dojo/_base/array",
  "dojo/hash",
  "dojo/i18n!./nls/FileViewerStrings",
  "./util/network",
  "./util/history",
  "ic-core/util/connectionsUrlUtil",
  "dojo/has",
  "./config/globals",
  "./util/url",
  "dojo/on",
  "dojo/aspect",
  "dojo/promise/all",
  "./network/request",
  "./preview/util",
  "./data/util/routes",
  "dojo/Deferred",
  "ic-ui/DialogUtil",
  "dojo/when",
  "dojo/string",
  "./dialog/ConfirmationDialog",
  "dojo/dom-style"
], function (declare, win, FileViewerImpl, lang, domClass, focus, FilesAPI, Evented, topic, array, hash, i18n, networkUtil,
    historyUtil, connectionsUrlUtil, has, globals, urlUtil, on, aspect, all, request, util, routes, Deferred, DialogUtil,
    when, string, ConfirmationDialog, domStyle) {
  "use strict";

  var factory, Viewer, currentViewerInstance, currentViewerState = {
    isOpening: false,
    isOpen: false,
    justClosed: false
  };
  
  lang.setObject("ic-share.fileviewer.FileViewer.shouldIgnoreUrlChange", function () {
    if (!has("fileviewer-detailspage")) {
      return false;
    }
    
    var href = window.location.href;
    
    return (currentViewerState.isOpen && urlUtil.areUrlsEqual(href, historyUtil.currentFileUrl)) ||
      ((currentViewerState.isOpen || currentViewerState.justClosed) && urlUtil.areUrlsEqual(href, historyUtil.backgroundPageUrl)) ||
      connectionsUrlUtil.shouldOpenConnectionsPreview(href);
  });
  
  lang.setObject("ic-share.fileviewer.FileViewer.isOpen", function () {
    return currentViewerState.isOpen;
  });

  factory = {
    /**
     * Creates an instance of the File Viewer.
     */
    create: function (args) {
      return new Viewer(args);
    },

    createConnectionsFileFromId: function (id, isAuthenticated) {
      var root = lang.getObject("notesiniParameters.bssUrl") || "",
        anonymousPath = isAuthenticated ? "" : "/anonymous";

      var filesContext = lconn.core.url.getServiceUrl(lconn.core.config.services.files).path;

      return factory.createConnectionsFileFromUrl(root + filesContext + "/basic" + anonymousPath + "/api/document/" + id + "/entry", id);
    },

    createConnectionsFileFromUrl: function (url, id) {
      return {
        type: "connections",
        paging: {},
        args: url,
        fileId: id
      };
    },

    /**
     * Creates an object representing a Connections file.  The resulting object can be passed into
     * the viewer's addFile() function.
     * 
     * @param file An instance of lconn.share.bean.File
     * 
     * @return An object representing a Connections file
     */
    createConnectionsFile: function (file) {
      return {
        type: "connections",
        paging: {},
        args: {
          name: file.getName(),
          type: file.getExtension(),
          id: file.getId(),
          size: file.getSize(),
          totalSize: file.getTotalSize(),
          created: file.getPublished(),
          updated: file.getUpdated(),
          modifier: file.getModifier(),
          author: file.getAuthor(),
          isEncrypted: file.isEncrypted(),
          objectTypeId: file.getObjectTypeId(),
          permissions: file.getPermissions(),
          libraryType: file.getLibraryType(),
          libraryId: file.getLibraryId(),
          libraryAuthor: file.getLibraryAuthor(),
          visibility: file.getVisibility(),
          canOthersShare: file.isViralShareAllowed(),
          recommendationUrl: file.getUrlRecommendation(),
          isExternal: file.isExternal(),
          links: {
            download: file.getUrlDownload(),
            details: file._urlDetails || file.getUrlVia(),
            thumbnail: file.getUrlThumbnail(),
            entry: file.getUrlEntry(),
            alternate: file.getUrlAlternate()
          },
          versionCount: file.getVersionCount(),
          version: file.getCurrentVersionLabel(),
          recommendations: parseInt(file.getRatingCount()),
          comments: file.getCommentCount(),
          downloads: file.getTimesDownloaded(),
          downloadsAnonymous: file.getTimesDownloadedAnonymously(),
          summary: file.getDescription(),
          tags: file.getTags(),
          mimeType: file.getMimeType(),
          showDetailsExternalAction: file.showDetailsExternalAction,
          ccmBean: file.ccmBean,
          repositoryName: file.getRepositoryName(),
          cmisVersionSeriesId: file.getCMISVersionSeriesId(),
          draftStatus:  file.getDraftStatus(),
          cmisDocumentId: file.getCMISDocumentId(),
          cmisVersionId: file.getCMISVersionId(),
          malwareScanState: file.getMalwareScanState(),
          shareLink: file.getShareLink()
        }
      };
    },

    /**
     * Creates an object representing an IBM Verse file.  The resulting object can be passed into
     * the viewer's addFile() function.
     * 
     * @param file is an args object containing information about the Verse file.
     * 
     * @return An object representing a Connections file
     */
    createVerseAttachment: function (file) {
      return {
        type: "verse",
        paging: {},
        args: {
          name: file.name,
          type: file.extension,
          id: "",
          size: file.size,
          created: new Date(),
          updated: new Date(),
          modifier: "",
          isEncrypted: false,
          objectTypeId: "",
          links: {
            download: file.url,
            details: "",
            thumbnail: ""
          },
          preview: file.preview
        }
      };
    }
  };

  Viewer = declare([Evented], {
    constructor: function (args) {
      this._files = [];
      this._args = args || {};
      this._subscriptions = [];
      this._eventHandles = [];
      this._messages = [];
      
      globals.isAuthenticated = !lang.isFunction(this._args.isAuthenticated) || this._args.isAuthenticated();
      globals.isIframePage = this._args.isIframePage;
      globals.coreServices = this._args.coreServices;
      globals.shareLink = this._args.shareLink;
    },

    /**
     * Adds a file object to the list of files available to view.
     * 
     * @param file An object representing a file returned by one of the create...() functions below
     * 
     * @return An identifier for the newly added file that can be used in calls to open()
     */
    addFile: function (file) {
      var last;

      if (typeof file === "string") {
        file = factory.createConnectionsFileFromId(file, this._args.isAuthenticated());
      } else if (!file.args) {
        file = factory.createConnectionsFile(file);
      }

      this._files.push(file);

      last = this._files.length - 1;
      file.id = last;

      if (last > 0) {
        this._files[last].paging.previous = this._files[last - 1];
        this._files[last - 1].paging.next = this._files[last];

        this._files[0].paging.next = this._files[1];
        this._files[1].paging.previous = this._files[0];
      }

      return last;
    },

    /**
     * Opens the file viewer (if it is not already open) and displays the indicated file.
     * 
     * @param id An identifier returned by addFile() to indicate which file should be displayed
     */
    open: function (id, source) {
      if (!id || id < 0) {
        id = 0;
      }
      
      currentViewerState.isOpening = true;
      
      this.close();
      this.closed = false;
      
      if (currentViewerInstance) {
        currentViewerInstance.close();
      }
      
      this._subscriptions.push(topic.subscribe("/dojo/hashchange", lang.hitch(this, this._handleUrlChange)));
      
      this._subscriptions.push(topic.subscribe("ic-fileviewer/dirty", lang.hitch(this, function () {
        this.isDirty = true;
      })));
      
      this._subscriptions.push(topic.subscribe("ic-fileviewer/action/completed", lang.hitch(this, function (topicArgs) {
        this.close(topicArgs);
      })));
      
      this._subscriptions.push(topic.subscribe("ic-fileviewer/close", lang.hitch(this, function (topicArgs) {
        this.close(topicArgs);
      })));
      
      this._subscriptions.push(topic.subscribe("ic-fileviewer/push/message", lang.hitch(this, function (message) {
        this._messages.push(message);
      })));

      if (typeof this._files[id].args !== "string") {
        this._loadAuthInfo();
        this._open(id, source);
      } else {
        var currentFile = this._files[id];
        var filePromise = this._args.shareLink ? FilesAPI.fromEntryURLByShareLink(currentFile.args, {"x-ibm-icfiles-context": this._args.shareLink.context}).promise : FilesAPI.fromEntryURL(currentFile.args).promise;
        var authInfoPromise = this._loadAuthInfo().promise;
        var isFilesFilePromise = this._args.openedFromFileViewerEverywhere ?
                                 urlUtil.isValidFilesUrl(this._args.linkTarget) :
                                 when(true);
        
        var prereqs = {
          file: filePromise,
          isFilesFile: isFilesFilePromise
        };
        if (this._args.loadCurrentUser) {
          prereqs.authInfo = authInfoPromise;
        }
        
        isFilesFilePromise.then(lang.hitch(this, function (isFilesWidget) {
          if (!isFilesWidget) {
            window.location = this._args.linkTarget;
          }
        })).otherwise(lang.hitch(this, function (error) {
          error = networkUtil.parseError(error);
          
          if (error.code !== "Unauthenticated") {
            var strings = i18n.ERROR_VALIDATING_FILES_FILE;
            var prompt = string.substitute(strings.PROMPT, {lineBreaks: "<br/><br/>"});
            DialogUtil.prompt(strings.DIALOG_TITLE, prompt, strings.OK, strings.CANCEL, lang.hitch(this, function (okSelected) {
              if (okSelected) {
                window.location.href = this._args.linkTarget;
              }
            }));
          }
          
          this._handleOpenByIdError(error);
        }));
        
        var prereqsPromise = all(prereqs);        
        isFilesFilePromise.then(lang.hitch(this, function (isFilesWidget) {
          if (!isFilesWidget) {
            return;
          }
          
          prereqsPromise.always(lang.hitch(this, function (results) {
            if (currentViewerInstance) {
              return;
            }
            
            var fileArgs, file, error;
            if (prereqsPromise.isResolved()) {
              file = results.file;
              // TODO This needs to be merged with createConnectionsFile() below
              fileArgs = {
                name: file.getName(),
                type: file.getExtension(),
                id: file.getId(),
                size: file.getSize(),
                totalSize: file.getTotalSize(),
                created: file.getDateCreated(),
                updated: file.getDateModified(),
                modifier: file.getModifier(),
                author: file.getAuthor(),
                isEncrypted: file.isEncrypted(),
                objectTypeId: file.getTypeId(),
                permissions: file.getPermissions(),
                libraryType: file.getLibraryType(),
                libraryId: file.getLibraryId(),
                visibility: file.getVisibility(),
                canOthersShare: file.getPropagation(),
                recommendationUrl: file.getRecommendationUrl(),
                isExternal: file.isExternal(),
                links: {
                  download: this._args.shareLink ? file.getDownloadUrlByShareLink({icfilesContext: this._args.shareLink.context}) : file.getDownloadUrl(),
                  details: file.getWebUrl(),
                  thumbnail: this._args.shareLink ? file.getThumbnailUrlByShareLink({icfilesContext: this._args.shareLink.context}) : file.getThumbnailUrl(),
                  entry: file.getUrlEntry(),
                  alternate: file.getAlternateUrl()
                },
                versionCount: file.getVersionCount(),
                version: file.getVersion(),
                recommendations: parseInt(file.getRatingCount()),
                comments: file.getCommentCount(),
                downloads: file.getTimesDownloaded(),
                downloadsAnonymous: file.getTimesDownloadedAnonymously(),
                summary: file.getDescription(),
                tags: file.getTags(),
                mimeType: file.getMimeType(),
                malwareScanState: file.getMalwareScanState()
              };
              if (file.showDetailsExternalAction) {
                 fileArgs.showDetailsExternalAction = file.showDetailsExternalAction;
              }
            } else {
              error = results;
              this._handleOpenByIdError(error);
              if (this._args.showErrorInOverlay === false || (this._args.isAuthenticated() && error.code === "Unauthenticated" && !this._args.isIframePage)) {
                return;
              }
              
              fileArgs = this._getLoadErrorFileArgs(currentFile.fileId);
              fileArgs.loadError = error;
            }
            
            fileArgs.links.linkTarget = this._args.linkTarget;
            currentFile.args = fileArgs;

            this.closed = false;
            try {
              this._open(id, source);
              if (!this._args.openedFromFileViewerEverywhere) {
                 this._sendMetricsEvent(currentFile);
              }
            } catch (error) {
              this._publishDefaultError(error);
            }
          }));
        }));
      }
    },
    
    _getExtraValue: function(document) {
        var isExternal = document.get("isExternal");
        var scope = "private";
        var isCommunityFile = false;
        var type = document.get("libraryType");
        if (type === "communityFiles") {
           scope ="community";
           isCommunityFile = true;
        } else {
           if (document.get("visibility") === "public") {
              if (window._lconn_files_config && window._lconn_files_config.isCloudMode) {
                 scope = "organization";
              } else {
                 scope = "public";
              }
           }
        }
        var obj = {
           contentScope: scope,
           contentIsExternal: isExternal,
           isCommunityFile: isCommunityFile
        };
        return obj;
     },
    
    _sendMetricsEvent: function(currentFile) {
       var tracker = com.ibm.lconn.layout.track;
       var args = {
             source: "FILES",
             userId: this._args.currentUser.id,
             community: currentFile.bean.get("communityId") || "",
             extra: {
               contentContainerId: currentFile.bean.get("libraryId"),
               contentCreateTs: currentFile.bean.get("created"),
               contentCreatorId: currentFile.bean.get("author").id,
               contentLink: routes.getRelativeUri(currentFile.bean.get("links").details),
               contentTitle: currentFile.bean.get("name")
             }
           };
       lang.mixin(args.extra, this._getExtraValue(currentFile.bean));
       tracker.read(currentFile.bean.get("id"), "FILESUMMARY", args);
    },
    
    _getLoadErrorFileArgs: function (id) {
      return {
        name: "",
        type: "",
        id: id,
        size: 0,
        totalSize: 0,
        created: new Date(),
        updated: new Date(),
        modifier: {},
        author: {},
        isEncrypted: false,
        objectTypeId: "",
        permissions: {},
        libraryType: "",
        visibility: "",
        canOthersShare: false,
        recommendationUrl: "",
        isExternal: false,
        links: {
          download: "",
          details: "",
          thumbnail: "",
          entry: "",
          alternate: ""
        },
        versionCount: 0,
        version: 0,
        recommendations: 0,
        comments: 0,
        downloads: 0,
        downloadsAnonymous: 0,
        summary: "",
        tags: [],
        mimeType: ""
      };
    },
    
    _publishDefaultError: function (error) {
      error = error || new Error();
      this.openError = true;
      error.userMessage = i18n.OPEN_BY_ID_ERROR.DEFAULT;
      this.emit("error", error);
    },
    
    _loadAuthInfo: function () {
      if (!this._authInfoPromise && globals.isAuthenticated && this._args.policy && this._args.policy.organizationPublic === undefined && !util.isCCM(this._files[0])) {
        this._authInfoPromise = request(routes.getUserInfoServiceUrl(), {
          auth: {secured: false},
          handleAs: "json",
          noStatus: true
        }).then(lang.hitch(this, function (response) {
          return response.totalSize ? response.items[0] : {};
        }));
        
        this._args.policy = this._authInfoPromise.then(lang.hitch(this, function (authInfo) {
          this._args.policy = globals.policy = authInfo.policy;
          return globals.policy;
        }));
        
        this._authInfoPromise.then(lang.hitch(this, function (authInfo) {
          if (this._args.loadCurrentUser) {
            this._args.currentUser = globals.currentUser = {
              displayName: authInfo.name,
              id: authInfo.id,
              email: authInfo.email,
              isExternal: authInfo.isExternal
            };
          }
        }), lang.hitch(this, function () {
          if (this._args.loadCurrentUser) {
            this._publishDefaultError();
          }
        }));
      } else {
        this._authInfoPromise = new Deferred();
        this._authInfoPromise.resolve();
      }
      return this._authInfoPromise;
    },
    
    _handleOpenByIdError: function (error) {
      currentViewerState.isOpening = false;
      
      var userMessage, errorStrings = i18n.OPEN_BY_ID_ERROR;
      if (error.code === "AccessDenied" && !this._args.isAuthenticated()) {
        userMessage = errorStrings.ACCESS_DENIED_ANON;
      }
      
      error.userMessage = userMessage || networkUtil.getErrorMessage(error, errorStrings);
      
      this.emit("error", error);
    },

    _open: function (id, source) {
      if (this.closed) {
        return;
      }
      
      this.focused = focus.curNode;
      
      historyUtil.onOpen(this._files[id], currentViewerState);
      
      if (historyUtil.historySupported) {
        this._eventHandles.push(on(window, "popstate", lang.hitch(this, this._handleUrlChange)));
        this._eventHandles.push(aspect.after(window.history, "pushState", lang.hitch(this, this._handleUrlChange)));
      }

      this.impl = new FileViewerImpl(lang.mixin({
        file: this._files[id],
        text: this._args.text,
        source: source,
        open: lang.hitch(this, "open"),
        close: lang.hitch(this, "close")
      }, this._args));

      if (this.focused) {
        try {
          this.focused.blur();
        }
        catch (err) {
          /**
           * in extreme edge cases, in IE11, when clicking the back of a preview card in grid view
           * and using 'ESC' key to close, an error may be thrown but has no functional repercussions
          */
        }
      }
      
      currentViewerInstance = this;
      
      domClass.add(win.body(), "ics-viewer-open");
      this.impl.placeAt(win.body());
      var actionButtonContainer = this.impl.actionContainer;
      var closeButton = actionButtonContainer.querySelector("li.ics-viewer-action-close a");
      if(closeButton) {
         closeButton.focus();
      }
      this.impl.startup();
      currentViewerState.isOpening = false;
      currentViewerState.isOpen = true;
      
      this.emit("success");
    },

    close: function (topicArgs) {
      var args;

      if (globals.isUploading) {
        this.closeWarningDialog();
        return;
      }

      this.closed = true;
      domClass.remove(win.body(), "ics-viewer-open");

      if (this.impl) {
        if (globals.tornOff) {
          topic.publish("ic-fileviewer/windowClose");
        }
        this.impl.destroy();
      }
      
      if (currentViewerInstance === this) {
        currentViewerInstance = null;
        
        if (!currentViewerState.isOpening) {
          currentViewerState.isOpen = false;
        }
        
        historyUtil.onClose(currentViewerState, this.impl.file);
        
        currentViewerState.justClosed = true;
        setTimeout(lang.hitch(this, function () {
          currentViewerState.justClosed = false;
        }), 550);
        
        topic.publish("ic-fileviewer/closed");
      }

      if (this.focused) {
         setTimeout(lang.hitch(this, function () {
            focus.focus(this.focused);

            // Some components (e.g., the activity stream), need to be focused twice
            // The first call focuses the container.  The second call focuses the link.
            setTimeout(lang.hitch(focus, "focus", this.focused), 1);
            this.focused = undefined;
         }), 1);
      }
      
      if (this.isDirty) {
        this.isDirty = false;

        if (topicArgs)
          topicArgs.messages = topicArgs.messages ? this._messages.concat(topicArgs.messages) : this._messages;

        args = topicArgs || {fileChange:true, messages: this._messages};
        
        args.isFromFileViewer = true;
        
        topic.publish("lconn/share/action/completed", args, null);
        topic.publish("ic/fileviewer/file/changed", args);
      } else if (topicArgs && topicArgs.postMsgs) {

        args = {fileChange:false, messages: this._messages};
        topic.publish("lconn/share/action/completed", args, null);
        topic.publish("ic/fileviewer/file/changed", args);
      }
      
      array.forEach(this._subscriptions, function (subscription) {
        subscription.remove();
      }, this);
      
      array.forEach(this._eventHandles, function (eventHandle) {
        eventHandle.remove();
      }, this);
    },

    closeWarningDialog : function() {
      var dialogStrings = i18n.ACTION.CLOSE.WARNING_DIALOG ||
        {DIALOG_TITLE: "Wait for Upload", PROMPT: "Your file is still uploading. If you close before it completes, the upload will be canceled.", 
          CANCEL: "Wait for Upload", OK: "Close Anyway"};

      /*Reuse Cancel button strings for Dialog Title*/
      dialogStrings.DIALOG_TITLE = dialogStrings.CANCEL;

      this.dialog = new ConfirmationDialog({strings: dialogStrings, showOkRight: true});

      this.dialog.on("clicked", lang.hitch(this, function () {
        topic.publish("ic-fileviewer/stopUpload");
        this.dialog.destroy();
        globals.isUploading = false;
        this.close();
      }));

      this.dialog.placeAt(document.body);
      this.dialog.startup();
      this.dialog.show();
    },

    _handleUrlChange: function () {
      if (!has("fileviewer-detailspage")) {
        this.close();
        return;
      }
      
      if (window.location.href === historyUtil.currentFileUrl) {
        return;
      }
      
      if (connectionsUrlUtil.isConnectionsFileUrl(window.location.href)) {
        currentViewerState.isOpening = true;
      } else {
        this.close();
      }
    }
  });

  return factory;
});
