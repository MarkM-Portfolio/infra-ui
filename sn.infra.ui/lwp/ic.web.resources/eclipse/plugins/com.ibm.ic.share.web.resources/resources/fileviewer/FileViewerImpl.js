/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./sbw/StatefulBackedTemplatedWidget",
  "dijit/registry",
  "dojo/text!./templates/FileViewerImpl.html",
  "./preview/previews",
  "./action/actions",
  "./action/actionsInShareLink",
  "dojo/_base/array",
  "dojo/_base/config",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/html",
  "dojo/_base/lang",
  "dojo/i18n!./nls/FileViewerStrings",
  "dojo/string",
  "dojo/on",
  "dojo/keys",
  "dijit/focus",
  "dijit/a11y",
  "dojo/dom-attr",
  "dojo/query",
  "dojo/_base/window",
  "./preview/util",
  "./preview/EntitlementChecker",
  "./util/html",
  "./util/DateFormat",
  "./config/Services",
  "dojo/has",
  "./panels/PanelNav",
  "./bean/File",
  "dojo/cookie",
  "./config/globals",
  "./config/Services",
  "dojo/topic",
  "./widget/DropDownMenuButton",
  "./widget/SplitDropDownMenuButton",
  "./action/EditFilenameAction",
  "dojo/when",
  "./data/util/routes",
  "./network/request",
  "dojo/promise/all",
  "./widget/MessageBox",
  "dojo/aspect",
  "dojo/date",
  "./widget/docsStatusMessage",
  "./uiState",
  "./Dragbar",
  "./widget/FileTypeIcon",
  "dojo/Deferred",
  "./ExtensionsRequest",
  "./AppregExtensionsRequest",
  "./action/ExtensionAction",
  "./util/network",
  "./util/url",
  "./util/history",
  "./action/ToggleFollowAction",
  "./welcomeMessage",
  "./editTracker",
  "./util/feature",
  "dojo/dom",
  "ic-core/globalization/bidiUtil",
  "./util/fidoNewRelic"
], function (declare, StatefulBackedTemplatedWidget, registry, template, previews, actions, actionsInShareLink, array, config, domClass,
  domConstruct, html, lang, i18n, string, on, keys, focusUtil, dijitA11y, domAttr, query, win, util, EntitlementChecker, utilHtml,
  DateFormat, Services, has, PanelNav, File, cookie, globals, ConfigServices, topic, DropDownMenuButton, SplitDropDownMenuButton, EditFilenameAction,
  when, routes, request, all, MessageBox, aspect, date, docsStatusMessage, uiState, Dragbar, FileTypeIcon, Deferred,
  ExtensionsRequest, AppregExtensionsRequest, ExtensionAction, networkUtil, urlUtil, historyUtil, ToggleFollowAction, welcomeMessage, editTracker, feature, dom, bidiUtil, fidoNewRelic) {

    var SHRINK_CLASS_DIRECTION_STRING = "ics-viewer-narrow";
    var TOOLBAR_ACTIONS_RESIZE_WIDTH_THRESHOLD = 1200;

    return declare([ StatefulBackedTemplatedWidget ], {
    templateString: template,
    _subscriptions: [],
    _messages: [],

    postMixInProperties: function () {
      this._promises = [];
      this._watches = [];
      this.formatFileSize = this.formatSize || util.formatFileSize;

      this.nls = i18n;

      //TODO @localization@
      this.NLS_SPLIT_ACTION_FALLBACK = {
        MENU: {
          TITLE: "More options",
          A11Y: "This button opens a menu for more options."
        },
        BUTTON: {
          EDIT: {
            TITLE: "Edit"
          },
          UPLOAD: {
            TITLE: "Upload"
          },
          CREATE: {
            TITLE: "Create"
          }
        }
      };
      this.nls.SPLIT_ACTION = this.nls.SPLIT_ACTION || this.NLS_SPLIT_ACTION_FALLBACK;

      editTracker.init();
      this.blank = config.blankGif || this._blankGif;
      this.ariaLabelId = registry.getUniqueId("fileviewer") + "_title";
      this.fileSize = this.formatFileSize(this.file.args.size) || 0;
      this.entitlements = new EntitlementChecker({isAuthenticated: this.isAuthenticated, isCCM: util.isCCM(this.file)});
      this.services = new Services({isAuthenticated: this.isAuthenticated});
      this.fileTypeMalicious = this.nls.FILE_MALICIOUS;
      this.fileTypeExternal = this.nls.SHARED_EXTERNALLY;
      this.myFileSync = this.nls.FILE_SYNCED;

      this.textDirection = domClass.contains(query("html")[0], "dijitRtl") ? "rtl" : "ltr";
      this.rtl = "rtl" === this.textDirection;
      this.ltr = !this.rtl;

      this._setUser();
      this._setGlobals();

      this.panelLocation = this.rtl ? "left" : "right";
      this.model = uiState;

      this._setupDebug();
    },

    _setupDebug: function() {
      if(dojoConfig.isDebug) {
        window.fileviewer = this;
      }
    },

    _setGlobals: function () {
      globals.login = this.login;
      globals.TextBoxWidget = this.TextBoxWidget;
      globals.MentionsDataFormatter = this.MentionsDataFormatter;
      globals.PeopleTypeAhead = this.PeopleTypeAhead;
      globals.HybridPeopleDataStoreOpenSocial = this.HybridPeopleDataStoreOpenSocial;
      globals.TagTypeAhead = this.TagTypeAhead;
      globals.currentUser = this.currentUser || {};
      globals.attachBizCard = this.attachBizCard;
      globals.TypeAheadDataStore = this.TypeAheadDataStore;
      globals.isVerse = !lang.isFunction(this.isAuthenticated);
      globals.blankGif = this.blank;
      globals.pickerAuth = this.pickerAuth;
      globals.pickerRoutes = this.pickerRoutes;
      globals.commRoutes = this.commRoutes;
      globals.coreUrl = this.coreUrl;
      globals.network = this.network;
      globals.addToCollection = this.addToCollection;
      globals.moveToCollection = this.moveToCollection;
      globals.services = new ConfigServices();
      globals.formatFileSize = this.formatFileSize;
      globals.policy = this.policy;
      globals.validationUtil = this.validationUtil;
      globals.textUtil = this.textUtil;
      globals.entitlements = this.entitlements;
      globals.layer2 = this.layer2;
      globals.configUtil = this.configUtil;
      globals.baseFilesConfig = this.baseFilesConfig;
      globals.disableAnonymous = false;
      globals.isPanels = this.isPanels;
      globals.isCCM = util.isCCM;
      globals.tornOff = this.tornOff;
      globals.createPersonPhotoLink = this.createPersonPhotoLink;

      if (this.createPersonLink) {
        globals.createPersonLink = lang.hitch(this, function (user) {
           var a = this.createPersonLink(user);
           if (a) {
              a.setAttribute("target", "_blank");
           } else {
              this.createPersonLink = false;
              globals.createPersonLink = undefined;
              return;
           }
           return a;
        });
      }

      if (lang.isFunction(globals.layer2)) {
        globals.layer2().then(function (layer2) {
           lang.mixin(globals, layer2);
           globals.restrictUserInComm = !!dojo.getObject("lconn.files.config.communityFiles.restrictUserInComm");
        });
      }
    },

    _setUser: function () {
      if (!lang.getObject("currentUser.id", false, this)) {
        var ids = cookie("ids");
        if (ids) {
          lang.setObject("currentUser.id", ids.split(":")[0], this);
        }
      }
    },

    postCreate: function () {
      this.inherited(arguments);

      domClass.add(this.viewerContent, "ics-viewer-type-" + this.file.type);
      this.file.bean = new File(this.file.args);
      this.file.args.updateFromBean = lang.hitch(this, this._writeFileBeanToFile);
      fidoNewRelic.setFile(this.file);

      domClass.add(this.viewerContent, this.textDirection);

      this._setupSubscriptions();

      if (this.file.bean.get("loadError")) {
        domClass.add(this.viewerContent, "loadError");

        topic.publish("ic-fileviewer/push/messages", {
          type: "warning",
          cancelable: false,
          message: networkUtil.getErrorMessage(this.file.bean.get("loadError"), this.nls.LOAD_ERROR)
        });
      }

      if (!this.formatDateByAge && DateFormat) {
        this.formatDateByAge = function (date, strings) {
          var formatter = new DateFormat(date);
          return formatter.formatByAge(strings);
        };
      }

      if (!this.htmlSubstitute && utilHtml) {
        this.htmlSubstitute = utilHtml.substitute;
      }

      this.fileTypeIcon = new FileTypeIcon({
         file: this.file.bean,
         fileArgs: this.file.args
      });
      this.fileTypeIcon.placeAt(this.fileTypeIconNode);

      this._watches.push(uiState.watch("panelSize", lang.hitch(this, function (name, oldValue, value) {
        this._showDetailsPanel(value !== VIEWER_PANELS_CLOSED_SIZE);
      })));

      this._watches.push(this.file.bean.watch("name", lang.hitch(this, function (name, oldValue, value) {
        if (value && oldValue !== value) {
          topic.publish("ic-fileviewer/filenamechanged", {newFileName: value});
          this._setTitleText();
        }
      })));

      this._checkUrlParameters();
      this._setPreviewWidget();
      this._configNav();
      this._addActions();
      if(this.shareLink) {
         uiState.set("panelSize", window.VIEWER_PANELS_CLOSED_SIZE);
         domClass.add(this.shelfContainer, "lotusHidden");
      } else {
         this._renderLastUpdated();
         this._fixTabOrder();
         this._listenForKeys();
         this._setupPropertyWatch();
         this._updateExternalIcon();
         this._updateMaliciousIcon();

         this._updateLinkTarget(this.titleLinked);
         this._updateLinkTarget(this.fileDetails);
         this._updateLinkTarget(this.fileDetailsCCM);

         if (this.file.args.showDetailsExternalAction) {
            domAttr.set(this.fileDetails, "style", "display: none;");
         } else {
            domAttr.set(this.fileDetailsCCM, "style", "display: none;");
         }

         if (has("files-folder-syncable") && this.isPanels(this.file)) {
            this._getMyDriveFolders();
            this._updateMyDriveList(this.file.bean.get("isSyncable"), this.file.bean.get("isIndirectSyncable"));
         } else {
            this._updateMyFileSyncIcon(this.file.bean.get("isSyncable"));
         }

         if (this.isPanels(this.file)) {
            domConstruct.empty(this.panelNavContainer);

            domClass.add(this.panelNavContainer, "active-panels");
            this.file.bean.unmarkDirty();
            this.panelNav = new PanelNav({
            file: this.file.bean,
            container: this.panelContainer,
               panelUrlParameterId: this._initialPanelId
            });
            this.panelNav.placeAt(this.panelNavContainer);

            var bean = this.file.bean;
            docsStatusMessage.render(bean);

            this._subscriptions.push(topic.subscribe("lconn/share/action/completed", function (args) {
               if (args.hasOwnProperty("autoPublish") && !args.autoPublish) {
                  docsStatusMessage.render(bean);
               }
            }));
         }
         if (feature.isResizeEnabled() && dojo.isIE != 8) {
            this.dragbar = new Dragbar({
               model: uiState,
               panelLocation: this.panelLocation
            });

            this.dragbar.placeAt(this.viewerContent);
         }
      }
      this._setupTitle();

      if (this.file.bean.get("loadError")) {
        this._originalPanelSize = uiState.get("panelSize");
        uiState.set("panelSize", window.VIEWER_PANELS_CLOSED_SIZE);
      }

      if(!has("fileviewer-panels-textnav")) {
        on(window, "resize", lang.hitch(this, "_updateHeaderActionIconHorizontalMargins", this.viewerContent));
      }

      welcomeMessage.execute(this.welcomeContainer, this.file);
      
      this._sendMetricsEvents();
      
      fidoNewRelic.setPreview(this.preview.previewId);
      fidoNewRelic.track("open", {"defaultType": "Event", "openAction": (this.source ? this.source : ""), "context": (this.shareLink ? "sharelink" : "default")});

      window.addEventListener("message", lang.hitch(this, function(event) {
        if (event.data) {
          var data = event.data;

          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch(e) {/*This is sometimes expected*/}
          } else {
            data = lang.clone(data);
          }

          if (data.event === "ic-fileviewer/previewFailed") {
            if (data.errorMessage) {
              this._onError();
              topic.publish("ic-fileviewer/push/messages", {
                type: "warning",
                cancelable: false,
                message: data.errorMessage,
                errorCode: data.errorCode
              });
            }
          }
        }
      }));
    },
    
    _sendMetricsEvents: function() {
       //Metrics
       if (this.tracker && !this.file.bean.get("loadError") && this.openedFromFileViewerEverywhere) {
         if (util.isCCM(this.file)) {
           // Copy logic from
           // sn.widgets.clib/lwp/librarywidget.web.resources/eclipse/plugins/com.ibm.lconn.librarywidget.web.resources/resources/track.js
           // 
           // Note : this is never executed, code is here for reference if it ever is. 
           var ccmBean = this.file.bean.get("ccmBean");
           if (ccmBean) {
             var dateCreated = ccmBean.published;
             var links = this.file.bean.get("links");
             var entryLink;
             if (links) {
                entryLink = links.entry;
             }
             var container;
             if (entryLink) {
                var path = globals.coreUrl.parse(entryLink).path;
                container = path.substring(path.indexOf("/library/") + 9, path.indexOf("/document/"));
                if (container) {
                  // Here we're getting the libraryId from the entry link.  I would have expected 
                  // this.file.bean.get("libraryId") to return the id but it doesn't.
                  // ?? should we be modifying the bean to return the correct libraryId for CCM files?
                 container = decodeURIComponent(container);
                }
             }
             var args = {
               source: "ECM",
               userId: this.currentUser.id,
               community:  window.communityUuid || "",
               extra: {
                 contentTitle: ccmBean.title,
                 contentContainerId: container ? container : "",
                 contentCreatorId :  ccmBean.author.id,
                 contentCreateTs : dateCreated ? dojo.date.stamp.toISOString(dateCreated) : "",
                 contentLink : this.shareLink ? this.shareLink.url : ccmBean.urlAlternate // ?? what should the contentLink really be
               }
             };
             this.tracker.read(ccmBean.id, (this.shareLink ? "FILESUMMARY_SHARELINK" : "FILESUMMARY"), args); // ??? should this be a PREVIEW or FILESUMMARY event
           }
         } else {
           var args = {
             source: "FILES",
             userId: this.currentUser.id,
             community: this.file.bean.get("communityId") || "",
             extra: {
               contentContainerId: this.file.bean.get("libraryId"),
               contentCreateTs: this.file.bean.get("created"),
               contentCreatorId: this.file.bean.get("author").id,
               contentLink: this.shareLink ? this.shareLink.url : routes.getRelativeUri(this.file.bean.get("links").details),
               contentTitle: this.file.bean.get("name")
             }
           };
           this.tracker.read(this.file.bean.get("id"), (this.shareLink ? "FILESUMMARY_SHARELINK" : "FILESUMMARY"), args);
         }
       }
    },

    startup: function () {
       this.inherited(arguments);
       if(feature.isTextNavEnabled() && !util.isCCM(this.file)){
         this.panelNav.startup();
       }
       if(feature.isResizeEnabled() && dojo.isIE != 8) {
         this.dragbar._listenForKeyboard(this.panelNavContainer);
       }
     },

    _updateHeaderActionIconHorizontalMargins: function(domNode) {
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (windowWidth <= TOOLBAR_ACTIONS_RESIZE_WIDTH_THRESHOLD) {
        domClass.add(domNode, SHRINK_CLASS_DIRECTION_STRING);
      } else {
        domClass.remove(domNode, SHRINK_CLASS_DIRECTION_STRING);
      }
    },

    _setupSubscriptions: function () {
      this._subscriptions.push(topic.subscribe("ic-fileviewer/push/messages", lang.hitch(this, function (args) {
        if (args instanceof Object) {
          this._createMessage(args);
        }
        fidoNewRelic.track("message", {'defaultType': 'Event', 'messageType': (args.type ? args.type : ""), 'errorCode': (args.errorCode ? args.errorCode : "")});
      })));
      this._subscriptions.push(topic.subscribe("ic-fileviewer/push/clearMessages", lang.hitch(this, function (args) {
        this._removeAllMessages(args);
      })));

      this._subscriptions.push(topic.subscribe("ic-fileviewer/refresh", lang.hitch(this, function () {
        this._refresh();
      })));

      this._subscriptions.push(topic.subscribe("ic-fileviewer/changedExtension", lang.hitch(this, function () {
        this._refresh();
      })));

      this._subscriptions.push(topic.subscribe("lconn/share/action/completed", lang.hitch(this, function (args) {
        if (args && args.autoPublish && i18n.DOCS_STATUS_MESSAGE.AUTOPUBLISH && (args.fileID == this.file.bean.get("id") || !args.fileID)) {
          if (!has("fileviewer-ir-autopublish")) {
            topic.publish("ic-fileviewer/push/messages", {
              type: "info",
              cancelable: true,
              message: this._createAutopublishMessage()
            });
          }
        } else if (args && args.fileChange && !args.isFromFileViewer) {
          topic.publish("ic-fileviewer/refresh");
        }
      })));

      this._subscriptions.push(this.file.bean.watch("dateModified", function (name, oldValue, value) {
        if (oldValue && date.compare(value, oldValue) > 0) {
          topic.publish("ic-fileviewer/refreshPreview");
        }
      }));

      this._subscriptions.push(topic.subscribe("ic-fileviewer/refreshPreview", lang.hitch(this, "_setPreviewWidget")));

      this._subscriptions.push(topic.subscribe("ic-fileviewer/push/removeMessage", lang.hitch(this, function (args) {
         this._removeMessage(args);
      })));

      this._subscriptions.push(topic.subscribe("ic-fileviewer/content/toggleClass", lang.hitch(this, function (args) {
         domClass.toggle(this.previewContainer, args.className);
      })));

      this._subscriptions.push(topic.subscribe("ic-fileviewer/resetFocus", lang.hitch(this, function (args) {
         focusUtil.focus(this.firstFocusable);
      })));
    },

    _createAutopublishMessage: function () {
       var text, span;

       text = i18n.DOCS_STATUS_MESSAGE.AUTOPUBLISH.IN_PROGRESS;
       text = text.replace("${startLink}", '<a href="javascript:;">').replace("${endLink}", '</a>');

       span = domConstruct.create("span", { innerHTML: text });

       query("a", span).forEach(function (el) {
          on(el, "click", function () {
             topic.publish("ic-fileviewer/refresh");
          });
       });

       return span;
    },

    _removeSubscriptions: function () {
      array.forEach(this._subscriptions, function (subscription) {
        subscription.remove();
      });
    },

    _refresh: function () {
      this._removeAllMessages({forceRemove: true});
      this._refreshActions();
      this._setTitleText();
      this._setPreviewWidget();
      this._refreshMyDriveDropdown();
      docsStatusMessage.render(this.file.bean);
    },

    _refreshMyDriveDropdown: function() {
      if (has("files-folder-syncable") && this.isPanels(this.file)) {
        delete this._mydrivedropDownMenuButton;
        this._getMyDriveFolders();
        this._updateMyDriveList(this.file.bean.get("isSyncable"), this.file.bean.get("isIndirectSyncable"));
      }
    },

    _refreshActions: function() {
      this._addActions(true);
    },

    _checkUrlParameters: function () {
      var parameters = urlUtil.getFileParameters(),
        removeParameters = false;

      ToggleFollowAction.setInitialFollowState(undefined);
      if (parameters.subscribe || parameters.unsubscribe) {
        if (!globals.isAuthenticated) {
          globals.login();
        }

        var newFollowState;
        if (parameters.subscribe) {
          newFollowState = true;
        } else if (parameters.unsubscribe) {
          newFollowState = false;
        }
        ToggleFollowAction.setInitialFollowState(newFollowState);

        removeParameters = true;
      } else if (parameters.section) {
        this._initialPanelId = parameters.section;
        removeParameters = true;
      }

      if (removeParameters) {
        historyUtil.removeFileParameters(this.file);
      }
    },

    _setPreviewWidget: function () {
      this._writeFileBeanToFile();
      if (this.preview) {
         this.preview.destroy();
      }

      array.some(previews, function (preview) {
        if (preview.isValid(this.file)) {
          this.preview = preview.create({
            file: this.file,
            entitlements: this.entitlements,
            errorHandler: lang.hitch(this, this._onError),
            services: this.services,
            previewOptions: this.previewOptions,
            shareLink: this.shareLink
          });

          this.preview.placeAt(this.previewContainer);

          return true;
        }
      }, this);
    },

    _addActions: function (refreshFileViewer) {
      var li, widget, action, toolbarActionTotal = 0,
      args = {
          file: this.file,
          entitlements: this.entitlements,
          services: this.services,
          properties: this.properties,
          currentUser: this.currentUser || {},
          viewerActions: {
            close: lang.hitch(this, "_close"),
            showDetailsPanel: lang.hitch(this, "_showDetailsPanel")
          }
      },
      moreActionsDropDownItems = [],
      moreActionsDropDownPromises = [],
      splitDropDownItems = [],
      splitDropDownPromises = [];

      domConstruct.empty(this.actionContainer);

      if (refreshFileViewer) {
        refreshFileViewer = false;
        delete this._moreActionsDropDownMenuButton;
        delete this._splitDropDownMenuButton;
      }

      array.forEach((this.shareLink ? actionsInShareLink : actions), function (action) {
        if (this.file.bean.get("loadError") && !action.isOverlayAction) {
          return;
        }

        if (action.isSplitButtonItem) {
          splitDropDownItems.push(action);
          splitDropDownPromises.push(when(action.isValid(this.file, args)));
        } else if ((action.isSubItem || toolbarActionTotal >=2) && !action.isSticky) {
           if (this.isPanels(this.file)) {
              if (!this._moreActionsDropDownMenuButton) {
                 this._moreActionsDropDownMenuButton = new DropDownMenuButton({
                   nls: this.nls.MORE_ACTIONS,
                   subMenu: { className: "ics-viewer-more-actions" },
                   subMenuMarginTop: '17px'
                 });
               li = domConstruct.create("li", {
                 className: "ics-viewer-action " + this._moreActionsDropDownMenuButton.getClassName() + " ics-viewer-more-actions"
               }, this.actionContainer);
               this._moreActionsDropDownMenuButton.placeAt(li);
               li.childNodes[0].title = this.nls.MORE_ACTIONS.TITLE;
             }
             moreActionsDropDownItems.push(action);
             moreActionsDropDownPromises.push(when(action.isValid(this.file, args)));
           }

        } else if (action.isValid(this.file, args)) {

          args.parentNode = li = domConstruct.create("li", {
            className: "ics-viewer-action " + action.getClassName()
          }, this.actionContainer);

          widget = this._createActionWidget(action, args);
          widget.placeAt(li);

          this.lastAction = widget;
          if (action.realAction === undefined || action.realAction) {
            toolbarActionTotal++;
          }
        }
      }, this);

      all(splitDropDownPromises).then(lang.hitch(this, function (results) {

        var validSplitActionIdxs = [];
        array.forEach(results, function(isValid, index) {
          if(isValid) {
            validSplitActionIdxs.push(index);
          }
        });

        if(validSplitActionIdxs.length > 1) {
          if (has("file-viewer-panels") || has("fileviewer-panels")) {
            // Add split menu
            if (!this._splitDropDownMenuButton) {
              if (feature.isOffice365Enabled() && !feature.isOffice365EnabledWithoutDocsEditor()) {
                this._splitDropDownMenuButton = new SplitDropDownMenuButton({
                  nls: this.nls.ACTION.EDIT_OFFICE,
                  subMenu: { className: "ics-viewer-action-splitmenu" }
                });
              } else {
                this._splitDropDownMenuButton = new SplitDropDownMenuButton({
                  nls: this.nls.SPLIT_ACTION.MENU,
                  subMenu: { className: "ics-viewer-action-splitmenu" }
                });
              }
              li = domConstruct.create("li", {
                className: "ics-viewer-action " + this._splitDropDownMenuButton.getClassName() + " ics-viewer-action-splitmenu"
              }, this.actionContainer, "first");
              this._splitDropDownMenuButton.setClickEvent();
              this._splitDropDownMenuButton.placeAt(li);
              li.childNodes[0].title = this.nls.SPLIT_ACTION.MENU.TITLE;
              
              if (feature.isOffice365Enabled() && !feature.isOffice365EnabledWithoutDocsEditor()) {
                this._subscriptions.push(topic.subscribe("ic-fileviewer/toggleActionDropdown", lang.hitch(this, function () {
                  this._splitDropDownMenuButton.togglePopupMenu();
                    if (this._splitDropDownMenuButton._menuItems[0]) {
                      this._splitDropDownMenuButton._menuItems[0].focus();
                    }
                })));
              }
            }

            // Populate split menu
            array.forEach(results, function(result, i) {
              action = splitDropDownItems[i];
              if (result) {
                widget = this._createActionWidget(action, args);
                this._splitDropDownMenuButton.addMenuItem(widget, lang.hitch(widget, widget.onLinkClicked));
              }
              i++;
            }, this);
          }
        }
        if (validSplitActionIdxs.length >= 1) {

          var splitButtonAction = this._getPrimaryButton(this.file.bean, splitDropDownItems, validSplitActionIdxs) || splitDropDownItems[validSplitActionIdxs[0]];
          var splitButtonActionCategory = splitButtonAction.getActionCategory().toUpperCase();
          //TODO @localization@
          var splitButtonNLS = this.nls.SPLIT_ACTION.BUTTON[splitButtonActionCategory] || this.NLS_SPLIT_ACTION_FALLBACK.BUTTON[splitButtonActionCategory];
          args.splitButtonName = splitButtonNLS.TITLE;
          args.parentNode = li = domConstruct.create("li", {
            className: ("ics-viewer-action " + splitButtonAction.getClassName() + ((validSplitActionIdxs.length > 1) ? " ics-viewer-splitbutton" : ""))
          }, this.actionContainer, "first");

          if (this._splitDropDownMenuButton) {
            this._splitDropDownMenuButton.setSubmenuAroundNode(li);
          }

          widget = this._createActionWidget(splitButtonAction, args);

          widget.placeAt(li);
        }
      }));

      all(moreActionsDropDownPromises).then(lang.hitch(this, function (results) {
        array.forEach(results, function (result, i) {
          action = moreActionsDropDownItems[i];
          if (result) {
            widget = this._createActionWidget(action, args);
            this._moreActionsDropDownMenuButton.addMenuItem(widget, lang.hitch(widget, widget.onLinkClicked), { className: action.getClassName() });
          }
          i++;
        }, this);
        this._addExtensionActions();
      }));
    },

    _getPrimaryButton: function(filebean, actions, validActionIdxs) {
      // If first available action is "edit in docs", and the file is not ibm docs:
      // Set default primary button to upload (assuming upload button is always available for any file types)

      if(actions[validActionIdxs[0]].getClassName() === "ics-viewer-action-edit" && !filebean.isDocsFile) {
        var filteredArray = array.filter(validActionIdxs, function(idx){
          return actions[idx].getClassName() === "ics-viewer-action-upload";
        });

        if(filteredArray.length > 0) {
          return actions[filteredArray[0]];
        }
      }

      return null;
    },

    _addExtensionActions: function () {
      when(ExtensionsRequest.getExtensions(), lang.hitch(this, function (extensionsActions) {
        var actions = ExtensionAction.createActions(extensionsActions, this.file.bean);

        array.forEach(actions, function (action) {
          this._moreActionsDropDownMenuButton.addMenuItem(action, lang.hitch(action, action.execute, this.file.bean));
        }, this);
      }));
      
      if (window.gatekeeperConfig && !window.gatekeeperConfig['file-menu-appreg-disable']) {
        when(AppregExtensionsRequest.getExtensions(), lang.hitch(this, function (extensionsActions) {
          
          // create array of entitlements from the entitlements cookie.
          // entitlements cookie is of the form x-y-z, where:
          // y = base64 encoded comma separate list of entitlements (e.g. bh_filer,bh_chat...)
          // z = base64 encoded orgid
          var entitlements = [];
          try{
            var entitlementsCookie = document.cookie.replace(/(?:(?:^|.*;\s*)entitlements\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var entitlementsEncoded = entitlementsCookie.split("-")[1];
            var cookiesString = window.atob(entitlementsEncoded);
            entitlements = cookiesString.split(',');
          } catch (error) {
            entitlements = null;
            console.error("cannot determine entitlements: " +error);
          }
          
          var mappedExtensions = [];
          for (var i=0; i<extensionsActions.applications.length; i++) {
            var application = extensionsActions.applications[i];
            
            if (application.extensions) {
              
              // If entitlement is defined for this application, make sure that the user's entitlements includes that value.
              if (!application.entitlement || (entitlements != null && entitlements.indexOf(application.entitlement)>-1)) {
                for (var j=0; j<application.extensions.length; j++) {
                  // Map each extension into the same format that V1 (BSS) extensions use,
                  // so that we can use the same code to handle the V2 (Appregistry) extensions.
                  if (application.extensions[j] && application.extensions[j].type === "file_menu_classic") {
                    var v2extension = application.extensions[j];
                    var v1extension = v2extension.payload?v2extension.payload:{};
                    v1extension.menu_text = v2extension.title;
                    v1extension.tooltip = v2extension.description;
                    mappedExtensions.push(v1extension);
                  }
                }
              }
              
            }
          }
          
          var actions = ExtensionAction.createActions(mappedExtensions, this.file.bean);

          array.forEach(actions, function (action) {
            this._moreActionsDropDownMenuButton.addMenuItem(action, lang.hitch(action, action.execute, this.file.bean));
          }, this);
        }));
      }
      
    },
    
    _createActionWidget: function (action, args) {
      var widget = action.create(args);
      return widget;
    },

    _configNav: function () {
      var directions = ["previous", "next"];

      array.forEach(directions, function (direction) {
        var dom = direction;

        if (this.rtl) {
          dom = directions[1 - array.indexOf(directions, direction)];
        }

        if (this.file.paging[direction]) {
          html.set(this[dom + "Name"], this.file.paging[direction].args.name);
          domClass.add(this[dom + "Icon"], util.getIconClass(this.file.paging[direction].args, 16));
          domAttr.set(this[dom + "Arrow"], "tabindex", 0);

          if (this.source === direction) {
            setTimeout(lang.hitch(focus, "focus", this[dom + "Arrow"], 1));
          }
        } else {
          domClass.add(this[dom], "ics-viewer-nav-disabled");
        }
      }, this);
    },

    _renderLastUpdated: function () {
      var date = this.file.args.created,
        updated = this.file.args.updated,
        strings = this.nls.DATE.CREATED || this.nls.DATE.LAST_UPDATED,
        formatted;

      if (date.getTime() < updated.getTime()) {
        date = updated;
        strings = this.nls.DATE.LAST_UPDATED;
      }

      formatted = this.formatDateByAge(date, strings);

      var personLink;
      if (lang.isFunction(globals.createPersonLink)) {
         personLink = globals.createPersonLink;
      } else {
         personLink = this._createUserLink;
      }

      this.htmlSubstitute(win.doc, this.lastUpdated, formatted, {
        user: lang.hitch(this, personLink, this.file.args.modifier)
      });
    },

    _createUserLink: function (user) {
      var userLink = domConstruct.create("span");
      domConstruct.create("span", {
        className: "x-lconn-userid",
        style: "display: none;",
        innerHTML: user.id
      }, userLink);

      if (!lang.isFunction(this.createPersonLink)) {
        userLink.appendChild(domConstruct.toDom(user.name));
      } else {
        userLink.appendChild(this.createPersonLink(user));

        if (lang.isFunction(this.attachBizCard)) {
          this.attachBizCard(userLink);
        }
      }

      return userLink;
    },

    _fixTabOrder: function () {
      on(this.firstFocusable, "keydown", lang.hitch(this, "_onKeyPressFirstFocusable"));

      query("body > *").forEach(function (el) {
        if (!this._isBizcard(el)) {
           on(el, "focusin", lang.hitch(this, function (evt) {
             evt.preventDefault();
             focusUtil.focus(this.firstFocusable);
           }));
        }
      }, this);
    },

    _onKeyPressFirstFocusable: function (evt) {
      if (evt.keyCode === keys.TAB && evt.shiftKey) {
        evt.preventDefault();
        focusUtil.focus(dijitA11y.getLastInTabbingOrder(this.domNode));
      }
    },

    _listenForKeys: function () {
      this.keyListener = on(win.body(), "keydown", lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ESCAPE && !this._isBizcard()) {
          this._close(evt);
        }

        var tag = evt.target.tagName.toLowerCase();
        if (tag === "select" || tag === "input" || tag === "textarea" || domClass.contains(evt.target, "lotusMentionsDiv")) {
          return;
        }

        if(evt.fidoIgnoreEvent) {
           return;
        }

        switch (evt.keyCode) {
        case keys.LEFT_ARROW:
          this._previous(evt);
          break;

        case keys.RIGHT_ARROW:
          this._next(evt);
          break;

        case keys.UP_ARROW:
        case keys.DOWN_ARROW:
        case keys.PAGE_UP:
        case keys.PAGE_DOWN:
          evt.stopPropagation();
          evt.preventDefault();
          break;
        }
      }));
    },

    _previous: function (evt) {
      evt.stopPropagation();
      fidoNewRelic.track("previous");
      this._page(this.ltr ? "previous" : "next");
    },

    _next: function (evt) {
      evt.stopPropagation();
      fidoNewRelic.track("next");
      this._page(this.ltr ? "next" : "previous");
    },

    _page: function (direction) {
      if (this.file.paging[direction]) {
        this.keyListener.remove();
        this._writeFileBeanToFile();
        this.open(this.file.paging[direction].id, direction);
      }
    },

    _writeFileBeanToFile: function () {
      // TODO: Look into just mixin in file.bean into file.args
      this.file.args.name = this.file.bean.get("name");
      this.file.args.name = bidiUtil.createSttDisplayString(this.file.args.name, "FILE_PATH");
      this.file.args.type = this.file.bean.get("type");
      this.file.args.objectTypeId = this.file.bean.get("objectTypeId");
    },

    _close: function (evt) {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }

      this.keyListener.remove();
      array.forEach(this._subscriptions, function (subscription) {
        subscription.remove();
      });
      fidoNewRelic.track("close");
      topic.publish("ic-fileviewer/close");
    },

    _showDetailsPanel: function (show) {
      var func = show ? "add" : "remove";
      domClass[func](this.viewerContent, "ics-viewer-details-expanded");
    },
    _onError: function (error) {
      var oldPreview = this.preview;
      this.preview.destroy();
      this.preview = previews[previews.length - 1].create({file: this.file, userMessage: error});
      if(this.previewContainer) {
        this.preview.placeAt(this.previewContainer);
      }

      fidoNewRelic.track("previewError", {"defaultType": "Event", "newPreview": this.preview.previewId});
      fidoNewRelic.setPreview(this.preview.previewId);
    },

    _updateLinkTarget: function (el) {
      if (globals.isVerse) {
        domAttr.set(el, "target", "_blank");
      }
    },

    _setupPropertyWatch: function () {
      var watchedProperties = ["visibility", "recommendations", "version", "name", "isExternal", "isLocked", "malwareScanState", "shareLink"];
      array.forEach(watchedProperties, lang.hitch(this, function (property) {
        this.file.bean.watch(property, lang.hitch(this, function (name, oldValue, value) {
          if (value !== undefined && oldValue !== undefined && value !== oldValue) {
            topic.publish("ic-fileviewer/dirty", name, value);

            this._updateExternalIcon();
            this._updateMaliciousIcon();
          }
        }));
      }));
      if (has("files-folder-syncable") && this.isPanels(this.file)) {
        this.file.bean.watch("isSyncable", lang.hitch(this, function(name, oldValue, value) {
          if (value !== undefined && value !== oldValue) {
            this._updateMyDriveList(this.file.bean.get("isSyncable"), this.file.bean.get("isIndirectSyncable"));
          }
        }));
        this.file.bean.watch("isIndirectSyncable", lang.hitch(this, function(name, oldValue, value) {
          if (value !== undefined && value !== oldValue) {
            this._updateMyDriveList(this.file.bean.get("isSyncable"), this.file.bean.get("isIndirectSyncable"));
          }
        }));
      } else {
        this.file.bean.watch("isSyncable", lang.hitch(this, function(name, oldValue, value) {
          var isSyncing = this.file.bean.get("isSyncable");
          this._updateMyFileSyncIcon(isSyncing);
        }));
      }
    },

    _updateExternalIcon: function () {
       domClass.remove(this.externalIconDiv, "lotusHidden");
       if (!this.file.bean.get("isExternal")) {
          domClass.add(this.externalIconDiv, "lotusHidden");
       }
    },

    _updateMaliciousIcon: function () {
        domClass.remove(this.maliciousIconDiv, "lotusHidden");
        if (!util.isMalicious(this.file)) {
           domClass.add(this.maliciousIconDiv, "lotusHidden");
        }
     },

    _updateMyFileSyncIcon: function (isSyncing) {
      domClass.remove(this.myFileSyncIconDiv, "lotusHidden");
      if(!isSyncing) {
        domClass.add(this.myFileSyncIconDiv, "lotusHidden");
      }
    },

    _updateMyDriveList: function (isMyDriveRoot, isMyDriveFolder) {
      domClass.remove(this.myDriveSyncDiv, "lotusHidden");
      if(!isMyDriveRoot && !isMyDriveFolder) {
        domClass.add(this.myDriveSyncDiv, "lotusHidden");
      }
    },

    _setupMyDriveDropDown: function (subFolders) {
      var hasRootSync = this.file.bean.get("isSyncable");
      var hasFolderSync = this.file.bean.get("isIndirectSyncable");
      var folders = [];

      domConstruct.empty(this.myDriveSyncDiv);

      if (!this._mydrivedropDownMenuButton) {
        if (hasRootSync) {
          var myDriveRoot = routes.getFilesMyDriveUrl('/filesync');
          folders.push({
            label: this.nls.MY_DRIVE.ROOT_FOLDER,
            title: this.nls.MY_DRIVE.ROOT_FOLDER,
            onClick: function(){ window.open(myDriveRoot,'_self'); }
          });
        }
        if (hasFolderSync) {
          for(var i=0;i<subFolders.length;i++) {
            subFolders[i].collectionType = "personal";
            var myDriveFolder = routes.getMyDriveFolderLink(subFolders[i].id);
            folders.push({
              label: string.substitute(this.nls.MY_DRIVE.FOLDER, {0: ' ' + subFolders[i].label}),
              title: string.substitute(this.nls.MY_DRIVE.FOLDER, {0: ' ' + subFolders[i].title}),
              onClick: function(){ window.open(myDriveFolder, '_self'); }
            });
          }
        }

        this._mydrivedropDownMenuButton = new DropDownMenuButton({
          nls: this.nls.MY_DRIVE,
          showLabel: true,
          subMenuMarginTop: '16px'
        });
        this._mydrivedropDownMenuButton.placeAt(this.myDriveSyncDiv);

        array.forEach(folders, function (folder) {
          this._mydrivedropDownMenuButton.addMenuItem(folder, folder.onClick);
        }, this);
      }
    },

    _getMyDriveFolders: function () {
      var deferred = new Deferred();

      this.file.bean.get("myDriveCollectionSharingFeed").fetch().then(lang.hitch(this, function (response) {
        this._setupMyDriveDropDown(response);
        deferred.resolve(response);

      }), function (error) {
        deferred.reject(error);
      });

      return deferred;
    },

    _setupTitle: function () {
      this._setTitleText();

      if (!this.file.bean.get("loadError")) {
        when(EditFilenameAction.isValid(this.file.bean), lang.hitch(this, function (isValid) {
          if (!isValid) {
            this._setTitlePreviewClass();
            this._setTitlePreviewMessage();
            return;
          }

          this._setTitleTooltip();
          var titleNode = this.titleLinked;
          on(titleNode, "click", lang.hitch(this, function () {
            var action = new EditFilenameAction.create({file: this.file.bean, filenameNode: this.titleLinked, myDriveNode: this.myDriveSyncDiv});
            action.onLinkClicked();
          }));
        }));
      }
    },

    _setTitleText: function () {
       domAttr.set(this.titleLinked, "innerHTML", this.file.bean.get("name"));
    },

    _setTitleTooltip: function() {
      domAttr.set(this.titleLinked, "title", this.nls.FILENAME_TOOLTIP);
    },

    _setTitlePreviewClass: function() {
      domClass.add(this.titleLinked, "preview");
    },

    _setTitlePreviewMessage: function() {
      var previewTitle = domConstruct.create("div", {className: "lotusOffScreen", innerHTML: this.nls.FILE_VIEWER_TITLE});
      this.titleLinked.appendChild(previewTitle);
    },

    _createMessage: function (args) {
      this._removeAllMessages();

      if (args.cancelable === undefined) {
        args.cancelable = true;
      }

      if (args.focus === undefined) {
        args.focus = true;
      }

      if (args.focusPostClose === undefined) {
        args.focusPostClose = document.activeElement;
      }

      var message = MessageBox.create(args);
      this._messages.push(message);
      message.placeAt(this.messageContainer);
      message.startup();

      this._subscriptions.push(aspect.before(message, "_close", lang.hitch(this, function () {
        this._messages.splice(message.pos, 1);
      })));
    },

    _removeMessage: function (args) {
      array.forEach(this._messages, function (message) {
        if (message.messageOptions === args) {
          message.destroy();
        }
      }, this);
    },

    _removeAllMessages: function (args) {
       var forceRemove = (args && args.forceRemove !== undefined) ? args.forceRemove : false;
       array.forEach(this._messages, function (message) {
         if (!message.isSticky || forceRemove) {
           message.destroy();
         }
       }, this);
    },

    destroy: function () {
      this._removeSubscriptions();
      this._removeWatches();
      editTracker.reset();

      if (this.file.bean.get("loadError")) {
        uiState.set("panelSize", this._originalPanelSize);
      }

      this.inherited(arguments);
    },

    _removeWatches: function () {
      array.forEach(this._watches, function (watch) {
        watch.remove();
      });
    },

    _getBannerMarginRight: function (value) {
       if (!value || feature.isTextNavEnabled()) {
          return 0;
       }

       return value + "px";
    },

    isPanels: function(file) {
       var ret = false;
       if (file) {
          if (!util.isCCM(file)) {
             if (has("file-viewer-panels") || has("fileviewer-panels")) {
                ret = true;
             }
          }
       }
       return ret;
    },

    onLinkClicked: function (evt) {
       if (this.file.args.showDetailsExternalAction) {
          this.file.args.showDetailsExternalAction(this, this.file.args.ccmBean, evt);
          evt.stopPropagation();
          evt.preventDefault();
       }
    },

    _isBizcard: function(el) {
       var bizcard = dom.byId("semtagmenu");
       if (!el) {
          el = focusUtil.curNode;
       }
       if (dom.isDescendant(el, bizcard)) {
          return true;
       }
       return false;
    }
  });
});
