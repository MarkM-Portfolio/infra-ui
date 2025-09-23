/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.sharebox.controls.ShareboxDialog");
dojo.require("com.ibm.oneui.controls.TabbedDialog");
dojo.require("com.ibm.social.sharebox.controls.GadgetContentPane");
dojo.require("com.ibm.social.incontext.ConnectionManager");
dojo.require("dojo.i18n");
dojo.requireLocalization("com.ibm.social.sharebox", "socialShareboxStrings");
dojo.require("dojo.NodeList-manipulate");
dojo.require("com.ibm.lconn.gadget.container.iContainer2");
dojo.require("com.ibm.social.sharebox.data.ConfigDataStore");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.social.incontext.widget.MessageContainer");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.sharebox.controls.TabContainer");
dojo.require("dojo.hash");
dojo.require("com.ibm.social.incontext.util.proxy");
dojo.require("com.ibm.social.sharebox._dialog_utils");
dojo.require("lconn.core.DialogUtil");
dojo.require("net.jazz.ajax.xdloader");
dojo.require("lconn.core.auth");
dojo.require("dojo.NodeList-traverse");
dojo.require("dijit._WidgetsInTemplateMixin");

(function() {
   var sb = com.ibm.social.sharebox.controls,
      util = com.ibm.social.incontext.util;
   sb.PATH = "container/sharebox";
   sb.COMM_PATH = "container/communitySharebox";
   sb.GLOBAL = "global";
   sb.COMMUNITY = "community";
   sb.SELECTION_CONTEXT = "com.ibm.social.sharebox.context";
   sb._instance = null;
   sb._ctxInstance = null;
   sb._actionsPreloaded = false;
   sb._dataMap = {};
   sb.getShareboxInstance = function(ctx) {
      if (ctx.type == sb.GLOBAL) {
         if (!sb._instance) sb._instance = new com.ibm.social.sharebox.controls._ShareboxDialog({
            context: ctx
         });
         return sb._instance;
      } else if (ctx.type == sb.COMMUNITY) {
         if (!sb._ctxInstance) sb._ctxInstance = new com.ibm.social.sharebox.controls._ShareboxDialog({
            context: ctx
         });
         return sb._ctxInstance;
      }
      return null;
   };
   sb.clearShareboxInstance = function(type) {
      if (type == sb.GLOBAL) sb._instance = null;
      else if (type == sb.COMMUNITY) sb._ctxInstance = null;
   };
   sb._connManager = null;
   sb.getConnectionManager = function() {
      if (!sb._connManager) sb._connManager = new com.ibm.social.incontext.ConnectionManager();
      return sb._connManager;
   };

   dojo.declare("com.ibm.social.sharebox.controls.ShareboxDialog", null, {
      _connManager: null,
      _dialog: null,
      _isOpen: false,
      _ctx: null,
      constructor: function(ctx) {
         var cm = this._connManager = com.ibm.social.sharebox.controls.getConnectionManager();
         this._ctx = ctx || {};
         this._ctx.type = this._ctx.type || sb.GLOBAL;
         this._dialog = sb.getShareboxInstance(this._ctx);
         cm.cmconnect(this._ctx.type, this._dialog, "show", dojo.hitch(this, function() {
            this._isOpen = true;
         }));
         cm.cmconnect(this._ctx.type, this._dialog, "hide", dojo.hitch(this, function() {
            this._isOpen = false;
         }));
      },
      open: function() {
         if (!this._isOpen) this._dialog.openDialog();
      },
      close: function() {
         if (this._isOpen) this._dialog.closeDialog();
      },
      isOpen: function() {
         return this._isOpen;
      },
      destroy: function() {
         this._dialog.closeDialog();
         sb.clearShareboxInstance(this._ctx.type);
         this._connManager.clearConnScope(this._ctx.type);
         this._dialog.destroyRecursive();
      }
   });

   dojo.declare("com.ibm.social.sharebox.controls._ShareboxDialog", [com.ibm.oneui.controls.TabbedDialog, dijit._WidgetsInTemplateMixin], {
      templatePath: dojo.moduleUrl("com.ibm.social.sharebox", "controls/templates/ShareboxDialog.html"),
      widgetsInTemplate: true,
      autofocus: true,
      progress: null,
      _connManager: null,
      context: null,
      container: com.ibm.lconn.gadget.container.iContainer2,
      currentTab: null,
      validActionPath: null,
      actionTabs: null,
      submitInProgress: false,
      _dialogUtils: null,
      blankIcon: dijit._Widget.prototype._blankGif,
      _initialOpen: true,
      reloadActionsRequired: false,
      closeAttemptInProgress: false,
      postMixInProperties: function() {
         this.nls = dojo.i18n.getLocalization("com.ibm.social.sharebox", "socialShareboxStrings");
         this.inherited(arguments);
         if (this.context.type == sb.GLOBAL) this.validActionPath = sb.PATH;
         else if (this.context.type == sb.COMMUNITY) this.validActionPath = sb.COMM_PATH;
         this._dialogUtils = com.ibm.social.sharebox._dialog_utils.getInstance();
         this.actionTabs = {};
      },

      buildRendering: function() {
         this.inherited(arguments);
         var scheme = (window.location.protocol || "http").replace(':', '');
         var isSecure = (scheme === "https");
         var newsCfg = lconn.core.config.services.news;
         var newsSvcUrl = (isSecure) ? newsCfg.secureUrl : newsCfg.url;
         var url = newsSvcUrl + "/sharebox/config.action";
         url = com.ibm.social.incontext.util.proxy(util.url.rewrite(url, {
            type: this.context.type
         })); //(for reference ConfigDataStore may use type "global", "community", or "local")        
         this.configDs = new com.ibm.social.sharebox.data.ConfigDataStore({
            url: url
         });

         var osCfg = lconn.core.config.services.opensocial;
         var osSvcUrl = (isSecure) ? osCfg.secureUrl : osCfg.url;
         this.authenticatedUrl = com.ibm.social.incontext.util.proxy(osSvcUrl + "/ic/rest/isAuthenticated");

         var resCfg = lconn.core.config.services.webresources;
         var resSvcUrl = (isSecure) ? resCfg.secureUrl : resCfg.url;
         var etagVal = dojo.queryToObject(net.jazz.ajax.config.params).etag;
         this.loadingGifUrl = com.ibm.social.incontext.util.proxy(util.url.rewrite(resSvcUrl + "/web/com.ibm.lconn.core.styles.oneui3/images/loading.gif", {
            etag: etagVal
         }));
         this.blankIcon = com.ibm.social.incontext.util.proxy(util.url.rewrite(this.blankIcon, {
            etag: etagVal
         }));

         var title = (this.context.type == sb.COMMUNITY) ? this.nls.title.community : this.nls.title.global;
         this.titleNode.appendChild(dojo.doc.createTextNode(title));
      },

      postCreate: function() {
         this.inherited(arguments);
         if (!dojo._isBodyLtr()) dojo.addClass(this.domNode, "dijitDialogRtl");
         if (!this.container._initialized) {
            this.container.init();
            this.container._initialized = true;
         }
         var cm = this._connManager = com.ibm.social.sharebox.controls.getConnectionManager();
         this.connect = dojo.hitch(cm, cm.cmconnect, "sd" + this.id);
         this.connect(this, "_position", this, "setPosition");
         this.hashSubscription = dojo.subscribe("/dojo/hashchange", dojo.hitch(this, this.clearPageMessages));

         //Setup gadget communication
         this.connect(this._dialogUtils, "close", this, this.closeDialog);
         this.connect(this._dialogUtils, "shareAddActivityEntry", this, this.shareAddActvitiyEntry);
         this.connect(this._dialogUtils, "displayMessage", this, this.displayMessage);
         this.connect(this._dialogUtils, "displayMessageHtml", this, this.displayMessageHtml);
         this.connect(this._dialogUtils, "setDirty", this, this.setDirty);
         this.connect(this._dialogUtils, "setSubmitState", this, this.setSubmitState);
         this.connect(this, "onCloseShareDialog", this._dialogUtils, this._dialogUtils.onClose);
         this.connect(this, "_openDialog", this._dialogUtils, dojo.hitch(this, function() {
            if (this.currentTab && this.currentTab.gadgetNode) this._dialogUtils.onForceResize(this.currentTab.gadgetNode.id);
         }));
         this.loadActionsConfig();
      },
      loadActionsConfig: function() {
         //Load config       
         this.configDs.fetch({
            scope: this,
            onComplete: function(items, request) {
               var self = this;
               this.reloadActionsRequired = false;
               this.container.getCommonContainer().then(function(cc) {
                  self._registerHandlers(cc);
                  //Preload gadgets
                  dojo.forEach(items, dojo.hitch(self, function(item) {
                     sb._dataMap[item.url] = {
                        inline: item.inline,
                        parameters: item.parameters
                     };
                  }));
                  var gadgetUrls = dojo.map(items, function(item) {
                     return item.url;
                  });

                  cc.preloadGadgets(gadgetUrls, dojo.hitch(self, self._loadTabs, gadgetUrls));

               });
            },
            onError: function(errorData, request) {
               var item = {
                  message: this.nls.STATUS.ACTIONS_LOAD_ERROR,
                  error: true,
                  canClose: false
               };
               if (this.messageContainer) this._updateMessageContainer(this.messageContainer, item, this.messageBar);
               else this.messageContainer = this._createMessageContainer(item, this.messageBar);
               this.reloadActionsRequired = true;
            }
         });
      },
      _confirmLogin: function(callback) {
         dojo.xhrGet({
            url: this.authenticatedUrl,
            handleAs: "json",
            preventCache: true,
            load: callback,
            error: function(response, ioArgs) {
               if (ioArgs && ioArgs.xhr && ioArgs.xhr.status == "401") {
                  lconn.core.auth.login();
               }
            }
         });
      },

      _registerHandlers: function(commonContainer) {
         //Register show action
         commonContainer.actions.registerShowActionsHandler(dojo.hitch(this, this.handleShowAction));
         //Register Hide action - Optional
         commonContainer.actions.registerHideActionsHandler(dojo.hitch(this, this.handleHideAction));
         //Register Gadget Navigate
         if (this.container && this.container.ICactions) {
            this.container.ICactions.registerNavigateGadgetHandler(dojo.hitch(this, this.handleGadgetSelection));
         } else {
            // note, this is unsafe for a gadget todo
            commonContainer.actions.registerNavigateGadgetHandler(dojo.hitch(this, this.handleGadgetSelection));
         }
      },

      _loadTabs: function(gadgetUrls, metadatas) {
         var urlToActions = {},
            i = 0,
            actionsDoc = null,
            actions = null;
         for (var url in metadatas) { // object is keyed by gadget URLs
            if (metadatas.hasOwnProperty(url) && metadatas[url].modulePrefs.features.actions) {
               actionsDoc = com.ibm.social.incontext.util.dom.xmlDocumentFromString(metadatas[url].modulePrefs.features.actions.params["action-contributions"]);
               actions = actionsDoc.getElementsByTagName("action");
               if (actions.length > 0) {
                  urlToActions[url] = [];
                  for (i = 0; i < actions.length; i++) {
                     if (actions[i].getAttribute("path") == sb.PATH) urlToActions[url].push(actions[i].getAttribute("id"));
                  }
               }
            }
         }

         dojo.forEach(gadgetUrls, dojo.hitch(this, function(urlToActions, gadgetUrl) {
            var actionArr = urlToActions[gadgetUrl];
            if (actionArr) {
               dojo.forEach(actionArr, function(id) {
                  this._addTab(this.actionTabs[id], !this.tabs.hasChildren());
               }, this);
            }
         }, urlToActions));

         if (!this.tabs.hasChildren()) {
            var item = {
               message: this.nls.STATUS.ACTIONS_UNAVAILABLE,
               error: false,
               canClose: false
            };
            if (this.messageContainer) this._updateMessageContainer(this.messageContainer, item, this.messageBar);
            else this.messageContainer = this._createMessageContainer(item, this.messageBar);
         }

      },

      _createMessageContainer: function(item, div) {
         var container = new com.ibm.social.incontext.widget.MessageContainer({
            items: [item],
            nls: this.nls.MESSAGE
         }, div.appendChild(dojo.doc.createElement("div")));
         dojo.style(div, "display", "");
         return container;
      },
      _updateMessageContainer: function(container, item, div) {
         if (container) {
            container.clear();
            container.add(item, true);
            dojo.style(div, "display", "");
         }
      },
      clearPageMessages: function() {
         if (this.statusContainer) {
            this.statusContainer.clear();
         }
         this._hideMessageDiv();
      },
      _hideMessageDiv: function(div) {
         var nodes;
         if (div) {
            dojo.style(div, "display", "none");
         } else {
            if (dojo.query("div.lotusMain > div.lotusContent > div.shareStatus").style("display", "none").length == 0) {
               nodes = dojo.filter(dojo.query("div.lotusMain > *"), function(node) {
                  if (dojo.style(node, "display") != "none") return true;
               });
               dojo.forEach(nodes, function(node) {
                  dojo.query("div.lotusContent", node).forEach("dojo.query('div.shareStatus',item).style('display','none');");
               });
            }
         }
      },
      _addTab: function(tab, firstTab) {
         this.tabs.addChild(tab);
         if (firstTab) {
            this.currentTab = tab;
            this.tabs.startup();
         }
         this.tabs.updateOrientation(tab);
         this.tabs.resize();
      },

      handleShowAction: function(actionObj) {
         //Add tab  
         if (dojo.isArray(actionObj)) actionObj = actionObj[0];
         if (actionObj && this.validActionPath && (actionObj.path == this.validActionPath)) {
            var firstTab = !this.tabs.hasChildren(),
               cp = new com.ibm.social.sharebox.controls.GadgetContentPane({
                  title: actionObj.label,
                  actionId: actionObj.id,
                  loadingGifUrl: this.loadingGifUrl,
                  blankGifUrl: this.blankIcon
               }, dojo.create("div"));

            this.connect(cp, "onShow", dojo.hitch(this, this.showGadget, cp));
            this.actionTabs[actionObj.id] = cp;
         }
      },

      handleHideAction: function(actionObj) {
         //Remove tab
         if (actionObj && actionObj.id) {
            var removalTabs = dojo.filter(this.tabs.getChildren(), dojo.hitch(this, function(actionId, tab) {
               return tab.actionId == actionId;
            }, actionObj.id));
            dojo.forEach(removalTabs, dojo.hitch(this, function(tab) {
               this.tabs.removeChild(tab);
            }));
            this.tabs.resize();
         }
      },
      handleGadgetSelection: function(gadgetUrl, opt_params) {
         if (sb._dataMap[gadgetUrl]) {
            var cp = this.currentTab,
               itemContext;
            if (!cp.gadgetXmlUrl) {
               cp.gadgetXmlUrl = gadgetUrl;
               itemContext = dojo.mixin({}, this.context);
               dojo.mixin(itemContext, sb._dataMap[gadgetUrl].parameters);
               cp.createGadget(this.container, itemContext, sb._dataMap[gadgetUrl].inline);
               this._position();
               this.setFocusController();
            }
         }
      },
      setFocusController : function() {
         var activeElem = document.activeElement.id;
         if (activeElem) {
            var node = dijit.byId(activeElem);
            var handle = dojo.connect(node, "_onBlur", function(e){
               if (document.activeElement.tagName == "IFRAME") {
                  dijit.focus(this.focusNode);
                  dojo.disconnect(handle);
               }
            });
         }
      },
      showGadget: function(tabPane) {
         this.currentTab = tabPane;
         var self = this;
         this.container.getCommonContainer().then(function(cc) {
            cc.actions.runAction(self.currentTab.actionId, {
               type: "com.ibm.social.sharebox.context",
               dataObject: self.context
            });
         });
      },
      setPosition: function() {
         this.domNode.style.top = "100px";
      },

      openDialog: function() {
         if (this._initialOpen) {
            this._openDialog();
            this._initialOpen = false;
         } else {
            if (this.reloadActionsRequired) {
               dojo.style(this.messageBar, "display", "none");
               if (this.messageContainer) {
                  this.messageContainer.clear();
               }
            }
            this._confirmLogin(dojo.hitch(this, function() {
               this._openDialog();
               if (this.reloadActionsRequired) {
                  this.loadActionsConfig();
               }
            }));
         }
      },
      _openDialog: function() {
         dojo.addClass(dojo.body(), "lotusui30dojo_sharebox");
         this.clearPageMessages();
         if (this.currentTab) //Added to ensure the current gadget knows that it is being displayed
         this.showGadget(this.currentTab);
         this.show();
         this.setPosition();

         //Update height when window is too short
         var contentMarginBoxHeight = dojo.marginBox(this.tabs.domNode).h + dojo.marginBox(this.messageBar).h,
            contentMarginBoxWidth = dojo.marginBox(this.tabs.domNode).w,
            containerMarginBoxHeight = dojo.marginBox(this.containerNode).h;
         if (containerMarginBoxHeight < contentMarginBoxHeight) {
            dojo.marginBox(this.containerNode, {
               h: contentMarginBoxHeight,
               w: contentMarginBoxWidth
            });
            dojo.style(this.containerNode, "height", "auto");
         }

         dojo.style(this.domNode, "display", ""); //Added with update to closeDialog() to improve open and close experience
      },

      closeDialog: function() {
         this._closeDialog();
      },
      _closeDialog: function() {
         if (this.closeAttemptInProgress) return;

         this.closeAttemptInProgress = true;
         var closeFunc = dojo.hitch(this, function(continueClose) {
            var self = this;
            window.setTimeout(function() {
               self.closeAttemptInProgress = false
            }, 0);
            if (continueClose) {
               this.cancelDialog();
            }
         }),
            promptString;

         if (this.isDirty()) {
            promptString = this.currentTab.isDirty ? dojo.string.substitute(this.nls.UNSAVEDCHANGES.CONFIRM_CURRENT_TAB, [this.currentTab.title]) : this.nls.UNSAVEDCHANGES.CONFIRM_OTHER_TAB;
            lconn.core.DialogUtil.prompt(this.nls.UNSAVEDCHANGES.DIALOG_TITLE, promptString, this.nls.UNSAVEDCHANGES.OK, this.nls.UNSAVEDCHANGES.CANCEL, closeFunc, "lcShareboxConfirmDialog");
         } else {
            closeFunc(true);
         }
      },
      cancelDialog: function() {
         this._cancelDialog(arguments);
      },
      _cancelDialog: function() {
         this.onCancel();
         this.onCloseShareDialog();
         setTimeout(dojo.hitch(this, function() {
            dojo.style(this.domNode, "display", "none"); //Added with update to openDialog() to improve open and close experience
            dojo.removeClass(dojo.body(), "lotusui30dojo_sharebox");
         }), 0);

      },
      onCloseShareDialog: function() {},

      destroy: function() {
         this._connManager.clearConnScope("sd" + this.id);
         if (this.hashSubscription) dojo.unsubscribe(this.hashSubscription);
         this.inherited(arguments);
      },

      _onKey: function(event) {
         if (!event) event = window.event;
         if ((event.keyCode == dojo.keys.ESCAPE) && event.target) {
            var nodeList = new dojo.NodeList(event.target);
            if (dojo.indexOf(nodeList.parents(), this.domNode) != -1) {
               dojo.stopEvent(event);
               this.closeDialog();
            }
         } else this.inherited(arguments);
      },
      shareAddActvitiyEntry: function(itemId) {
         if (itemId) {
            dojo.publish("com/ibm/social/as/event/addactivityentry", [itemId]);
         }
      },
      displayMessage: function(type, messageString) {
         if (messageString) {
            this._displayMessage(type, messageString);
         }
      },
      displayMessageHtml: function(type, messageHtml) {
         if (messageHtml) {
            var msg = dojo.create("span");
            msg.innerHTML = messageHtml;
            this._displayMessage(type, msg);
         }
      },
      _displayMessage: function(type, msg) {
         var contentDiv, statusDiv, item, nonStdLayout = false;
         if (msg) {
            contentDiv = dojo.query("div.lotusMain > div.lotusContent");
            if (contentDiv.length == 0) {
               contentDiv = dojo.map(dojo.filter(dojo.query("div.lotusMain > *"), function(node) {
                  if (dojo.style(node, "display") != "none") return true;
               }), function(node) {
                  return dojo.query("div.lotusContent", node)[0];
               });
               nonStdLayout = true;
            }
            if (contentDiv.length > 0) {
               contentDiv = contentDiv[0];
               statusDiv = dojo.query("div.shareStatus", contentDiv);
               if (statusDiv.length > 0) {
                  statusDiv = statusDiv[0];
               } else {
                  statusDiv = dojo.create("div", {
                     className: "shareStatus lotusRightCorner",
                     role: "alert"
                  });
                  dojo.place(statusDiv, contentDiv, "first");
               }
               item = {
                  message: msg,
                  canClose: true
               };
               switch (type) {
               case 'error':
                  item.error = true;
                  break;
               case 'warning':
                  item.warning = true;
                  break;
               case 'success':
                  item.success = true;
               }
               if (this.statusContainer && this.statusContainer.domNode && !nonStdLayout) this._updateMessageContainer(this.statusContainer, item, statusDiv);
               else {
                  if (this.statusContainer) this.statusContainer.destroy();
                  this.statusContainer = this._createMessageContainer(item, statusDiv);
                  this.connect(this.statusContainer, "remove", dojo.hitch(this, this._hideMessageDiv, statusDiv));
               }
            }
         } else if (this.statusContainer) {
            this.clearPageMessages();
         }
      },
      isDirty: function() {
         return dojo.some(this.tabs.getChildren(), function(tab) {
            return tab.isDirty === true;
         });
      },
      setDirty: function(actionId, isDirty) {
         dojo.forEach(this.tabs.getChildren(), dojo.hitch(this, function(actionId, isDirty, tab) {
            if (tab.actionId == actionId) tab.isDirty = isDirty;
         }, actionId, isDirty));
      },
      setSubmitState: function(inProgress) {
         this.submitInProgress = inProgress === true;
         if (this.submitInProgress) this.tabs.preventTabSwitching();
         else this.tabs.allowTabSwitching();
      },

   });

})();
