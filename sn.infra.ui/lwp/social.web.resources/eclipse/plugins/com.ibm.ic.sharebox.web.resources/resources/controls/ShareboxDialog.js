/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/dom-class",
	"dojo/io-query",
	"dojo/_base/window",
	"dojo/i18n!ic-sharebox/nls/socialShareboxStrings",
	"dojo/dom-style",
	"dojo/dom-construct",
	"dojo/dom-geometry",
	"dojo/aspect",
	"dojo/_base/array",
	"dojo/on",
	"dojo/query",
	"dojo/NodeList-traverse",
	"dojo/request",
	"dojo/text!ic-sharebox/controls/templates/ShareboxDialog.html",
	"dojo/topic",
	"dojo/strings",
	"dojo/keys",
	"dijit/_Widget",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/registry",
	"dijit/focus",
	"ic-incontext/widget/MessageContainer",
	"ic-incontext/util/dom",
	"ic-sharebox/_dialog_utils",
	"ic-core/DialogUtil",
	"ic-incontext/ConnectionManager",
	"ic-core/config/services",
	"ic-incontext/util/proxy",
	"com/ibm/lconn/gadget/container/iContainer2",
	"ic-core/auth",
	"ic-sharebox/controls/GadgetContentPane",
	"ic-sharebox/controls/TabContainer",
	"ic-sharebox/data/ConfigDataStore",
	"ic-ui/controls/TabbedDialog",
	"net/jazz/ajax/xdloader"
], function (dojo, lang, declare, i18n, ioQuery, domClass, windowModule, i18nsocialShareboxStrings, domStyle, domConstruct, domGeometry, aspect, array, on, query, request, template, topic, stringUtils, keys, _Widget, _WidgetsInTemplateMixin, registry, focusUtils, MessageContainer, dom, _dialog_utils, DialogUtil, ConnectionManager, services, proxy, iContainer2, auth, GadgetContentPane, TabContainer, ConfigDataStore, TabbedDialog, xdloader) {

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
	      if (!sb._connManager) sb._connManager = new ConnectionManager();
	      return sb._connManager;
	   };
	
	   var ShareboxDialog = declare("com.ibm.social.sharebox.controls.ShareboxDialog", null, {
	      _connManager: null,
	      _dialog: null,
	      _isOpen: false,
	      _ctx: null,
	      constructor: function(ctx) {
	         var cm = this._connManager = com.ibm.social.sharebox.controls.getConnectionManager();
	         this._ctx = ctx || {};
	         this._ctx.type = this._ctx.type || sb.GLOBAL;
	         this._dialog = sb.getShareboxInstance(this._ctx);
	         cm.cmconnect(this._ctx.type, this._dialog, "show", lang.hitch(this, function() {
	            this._isOpen = true;
	         }));
	         cm.cmconnect(this._ctx.type, this._dialog, "hide", lang.hitch(this, function() {
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
	
	   declare("com.ibm.social.sharebox.controls._ShareboxDialog", [TabbedDialog, _WidgetsInTemplateMixin], {
	      templateString: template,
	      widgetsInTemplate: true,
	      autofocus: true,
	      progress: null,
	      _connManager: null,
	      context: null,
	      container: iContainer2,
	      currentTab: null,
	      validActionPath: null,
	      actionTabs: null,
	      submitInProgress: false,
	      _dialogUtils: null,
	      blankIcon: _Widget.prototype._blankGif,
	      _initialOpen: true,
	      reloadActionsRequired: false,
	      closeAttemptInProgress: false,
	      postMixInProperties: function() {
	         this.nls = i18nsocialShareboxStrings;
	         this.inherited(arguments);
	         if (this.context.type == sb.GLOBAL) this.validActionPath = sb.PATH;
	         else if (this.context.type == sb.COMMUNITY) this.validActionPath = sb.COMM_PATH;
	         this._dialogUtils = _dialog_utils.getInstance();
	         this.actionTabs = {};
	      },
	
	      buildRendering: function() {
	         this.inherited(arguments);
	         var scheme = (window.location.protocol || "http").replace(':', '');
	         var isSecure = (scheme === "https");
	         var newsCfg = services.news;
	         var newsSvcUrl = (isSecure) ? newsCfg.secureUrl : newsCfg.url;
	         var url = newsSvcUrl + "/sharebox/config.action";
	         url = proxy(util.url.rewrite(url, {
	            type: this.context.type
	         })); //(for reference ConfigDataStore may use type "global", "community", or "local")        
	         this.configDs = new ConfigDataStore({
	            url: url
	         });
	
	         var osCfg = services.opensocial;
	         var osSvcUrl = (isSecure) ? osCfg.secureUrl : osCfg.url;
	         this.authenticatedUrl = proxy(osSvcUrl + "/ic/rest/isAuthenticated");
	
	         var resCfg = services.webresources;
	         var resSvcUrl = (isSecure) ? resCfg.secureUrl : resCfg.url;
	         var etagVal = ioQuery.queryToObject(net.jazz.ajax.config.params).etag;
	         this.loadingGifUrl = proxy(util.url.rewrite(resSvcUrl + "/web/com.ibm.lconn.core.styles.oneui3/images/loading.gif", {
	            etag: etagVal
	         }));
	         this.blankIcon = proxy(util.url.rewrite(this.blankIcon, {
	            etag: etagVal
	         }));
	
	         var title = (this.context.type == sb.COMMUNITY) ? this.nls.title.community : this.nls.title.global;
	         this.titleNode.appendChild(windowModule.doc.createTextNode(title));
	      },
	
	      postCreate: function() {
	         this.inherited(arguments);
	         if (!domGeometry._isBodyLtr()) domClass.add(this.domNode, "dijitDialogRtl");
	         if (!this.container._initialized) {
	            this.container.init();
	            this.container._initialized = true;
	         }
	         var cm = this._connManager = com.ibm.social.sharebox.controls.getConnectionManager();
	         this.connect = lang.hitch(cm, cm.cmconnect, "sd" + this.id);
	         this.own(aspect.after(this, "_position", lang.hitch(this, "setPosition"), true));
	         this.hashSubscription = topic.subscribe("/dojo/hashchange", lang.hitch(this, this.clearPageMessages));
	
	         //Setup gadget communication
	         this.own(aspect.after(this._dialogUtils, "close", lang.hitch(this, this.closeDialog), true));
	         this.own(aspect.after(this._dialogUtils, "shareAddActivityEntry", lang.hitch(this, this.shareAddActvitiyEntry), true));
	         this.own(aspect.after(this._dialogUtils, "displayMessage", lang.hitch(this, this.displayMessage), true));
	         this.own(aspect.after(this._dialogUtils, "displayMessageHtml", lang.hitch(this, this.displayMessageHtml), true));
	         this.own(aspect.after(this._dialogUtils, "setDirty", lang.hitch(this, this.setDirty), true));
	         this.own(aspect.after(this._dialogUtils, "setSubmitState", lang.hitch(this, this.setSubmitState), true));
	         this.own(on(this, "CloseShareDialog", lang.hitch(this._dialogUtils, this._dialogUtils.onClose)));
	         this.connect(this, "_openDialog", this._dialogUtils, lang.hitch(this, function() {
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
	                  array.forEach(items, lang.hitch(self, function(item) {
	                     sb._dataMap[item.url] = {
	                        inline: item.inline,
	                        parameters: item.parameters
	                     };
	                  }));
	                  var gadgetUrls = array.map(items, function(item) {
	                     return item.url;
	                  });
	
	                  cc.preloadGadgets(gadgetUrls, lang.hitch(self, self._loadTabs, gadgetUrls));
	
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
	         request(this.authenticatedUrl, {method: "GET", handleAs: "json", preventCache: true}).then(callback, function(response, ioArgs) {
	               if (ioArgs && ioArgs.xhr && ioArgs.xhr.status == "401") {
	                  auth.login();
	               }
	            });
	      },
	
	      _registerHandlers: function(commonContainer) {
	         //Register show action
	         commonContainer.actions.registerShowActionsHandler(lang.hitch(this, this.handleShowAction));
	         //Register Hide action - Optional
	         commonContainer.actions.registerHideActionsHandler(lang.hitch(this, this.handleHideAction));
	         //Register Gadget Navigate
	         if (this.container && this.container.ICactions) {
	            this.container.ICactions.registerNavigateGadgetHandler(lang.hitch(this, this.handleGadgetSelection));
	         } else {
	            // note, this is unsafe for a gadget todo
	            commonContainer.actions.registerNavigateGadgetHandler(lang.hitch(this, this.handleGadgetSelection));
	         }
	      },
	
	      _loadTabs: function(gadgetUrls, metadatas) {
	         var urlToActions = {},
	            i = 0,
	            actionsDoc = null,
	            actions = null;
	         for (var url in metadatas) { // object is keyed by gadget URLs
	            if (metadatas.hasOwnProperty(url) && metadatas[url].modulePrefs.features.actions) {
	               actionsDoc = dom.xmlDocumentFromString(metadatas[url].modulePrefs.features.actions.params["action-contributions"]);
	               actions = actionsDoc.getElementsByTagName("action");
	               if (actions.length > 0) {
	                  urlToActions[url] = [];
	                  for (i = 0; i < actions.length; i++) {
	                     if (actions[i].getAttribute("path") == sb.PATH) urlToActions[url].push(actions[i].getAttribute("id"));
	                  }
	               }
	            }
	         }
	
	         array.forEach(gadgetUrls, lang.hitch(this, function(urlToActions, gadgetUrl) {
	            var actionArr = urlToActions[gadgetUrl];
	            if (actionArr) {
	               array.forEach(actionArr, function(id) {
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
	         var container = new MessageContainer({
	            items: [item],
	            nls: this.nls.MESSAGE
	         }, div.appendChild(windowModule.doc.createElement("div")));
	         domStyle.set(div, "display", "");
	         return container;
	      },
	      _updateMessageContainer: function(container, item, div) {
	         if (container) {
	            container.clear();
	            container.add(item, true);
	            domStyle.set(div, "display", "");
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
	            domStyle.set(div, "display", "none");
	         } else {
	            if (query("div.lotusMain > div.lotusContent > div.shareStatus").style("display", "none").length == 0) {
	               nodes = array.filter(query("div.lotusMain > *"), function(node) {
	                  if (domStyle.get(node, "display") != "none") return true;
	               });
	               array.forEach(nodes, function(node) {
	                  query("div.lotusContent", node).forEach("query('div.shareStatus',item).style('display','none');");
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
	         if (lang.isArray(actionObj)) actionObj = actionObj[0];
	         if (actionObj && this.validActionPath && (actionObj.path == this.validActionPath)) {
	            var firstTab = !this.tabs.hasChildren(),
	               cp = new GadgetContentPane({
	                  title: actionObj.label,
	                  actionId: actionObj.id,
	                  loadingGifUrl: this.loadingGifUrl,
	                  blankGifUrl: this.blankIcon
	               }, domConstruct.create("div"));
	
	            this.own(on(cp, "Show", lang.hitch(this, this.showGadget, cp)));
	            this.actionTabs[actionObj.id] = cp;
	         }
	      },
	
	      handleHideAction: function(actionObj) {
	         //Remove tab
	         if (actionObj && actionObj.id) {
	            var removalTabs = array.filter(this.tabs.getChildren(), lang.hitch(this, function(actionId, tab) {
	               return tab.actionId == actionId;
	            }, actionObj.id));
	            array.forEach(removalTabs, lang.hitch(this, function(tab) {
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
	               itemContext = lang.mixin({}, this.context);
	               lang.mixin(itemContext, sb._dataMap[gadgetUrl].parameters);
	               cp.createGadget(this.container, itemContext, sb._dataMap[gadgetUrl].inline);
	               this._position();
	               this.setFocusController();
	            }
	         }
	      },
	      setFocusController : function() {
	         var activeElem = document.activeElement.id;
	         if (activeElem) {
	            var node = registry.byId(activeElem);
	            var handle = aspect.after(node, "_onBlur", function(e){
	               if (document.activeElement.tagName == "IFRAME") {
	                  focusUtils.focus(this.focusNode);
	                  handle.remove();
	               }
	            }, true);
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
	               domStyle.set(this.messageBar, "display", "none");
	               if (this.messageContainer) {
	                  this.messageContainer.clear();
	               }
	            }
	            this._confirmLogin(lang.hitch(this, function() {
	               this._openDialog();
	               if (this.reloadActionsRequired) {
	                  this.loadActionsConfig();
	               }
	            }));
	         }
	      },
	      _openDialog: function() {
	         domClass.add(windowModule.body(), "lotusui30dojo_sharebox");
	         this.clearPageMessages();
	         if (this.currentTab) //Added to ensure the current gadget knows that it is being displayed
	         this.showGadget(this.currentTab);
	         this.show();
	         this.setPosition();
	
	         //Update height when window is too short
	         var contentMarginBoxHeight = domGeometry.marginBox(this.tabs.domNode).h + dojo.marginBox(this.messageBar).h,
	            contentMarginBoxWidth = domGeometry.marginBox(this.tabs.domNode).w,
	            containerMarginBoxHeight = domGeometry.marginBox(this.containerNode).h;
	         if (containerMarginBoxHeight < contentMarginBoxHeight) {
	            domGeometry.marginBox(this.containerNode, {
	               h: contentMarginBoxHeight,
	               w: contentMarginBoxWidth
	            });
	            domStyle.set(this.containerNode, "height", "auto");
	         }
	
	         domStyle.set(this.domNode, "display", ""); //Added with update to closeDialog() to improve open and close experience
	      },
	
	      closeDialog: function() {
	         this._closeDialog();
	      },
	      _closeDialog: function() {
	         if (this.closeAttemptInProgress) return;
	
	         this.closeAttemptInProgress = true;
	         var closeFunc = lang.hitch(this, function(continueClose) {
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
	            promptString = this.currentTab.isDirty ? stringUtils.substitute(this.nls.UNSAVEDCHANGES.CONFIRM_CURRENT_TAB, [this.currentTab.title]) : this.nls.UNSAVEDCHANGES.CONFIRM_OTHER_TAB;
	            DialogUtil.prompt(this.nls.UNSAVEDCHANGES.DIALOG_TITLE, promptString, this.nls.UNSAVEDCHANGES.OK, this.nls.UNSAVEDCHANGES.CANCEL, closeFunc, "lcShareboxConfirmDialog");
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
	         setTimeout(lang.hitch(this, function() {
	            domStyle.set(this.domNode, "display", "none"); //Added with update to openDialog() to improve open and close experience
	            domClass.remove(windowModule.body(), "lotusui30dojo_sharebox");
	         }), 0);
	
	      },
	      onCloseShareDialog: function() {},
	
	      destroy: function() {
	         this._connManager.clearConnScope("sd" + this.id);
	         if (this.hashSubscription) this.hashSubscription.remove();
	         this.inherited(arguments);
	      },
	
	      _onKey: function(event) {
	         if (!event) event = window.event;
	         if ((event.keyCode == keys.ESCAPE) && event.target) {
	            var nodeList = query.NodeList();
	            nodeList.push(event.target);
	            if (array.indexOf(nodeList.parents(), this.domNode) != -1) {
	               event.preventDefault(), event.stopPropagation();
	               this.closeDialog();
	            }
	         } else this.inherited(arguments);
	      },
	      shareAddActvitiyEntry: function(itemId) {
	         if (itemId) {
	            topic.publish("com/ibm/social/as/event/addactivityentry", itemId);
	         }
	      },
	      displayMessage: function(type, messageString) {
	         if (messageString) {
	            this._displayMessage(type, messageString);
	         }
	      },
	      displayMessageHtml: function(type, messageHtml) {
	         if (messageHtml) {
	            var msg = domConstruct.create("span");
	            msg.innerHTML = messageHtml;
	            this._displayMessage(type, msg);
	         }
	      },
	      _displayMessage: function(type, msg) {
	         var contentDiv, statusDiv, item, nonStdLayout = false;
	         if (msg) {
	            contentDiv = query("div.lotusMain > div.lotusContent");
	            if (contentDiv.length == 0) {
	               contentDiv = array.map(array.filter(query("div.lotusMain > *"), function(node) {
	                  if (domStyle.get(node, "display") != "none") return true;
	               }), function(node) {
	                  return query("div.lotusContent", node)[0];
	               });
	               nonStdLayout = true;
	            }
	            if (contentDiv.length > 0) {
	               contentDiv = contentDiv[0];
	               statusDiv = query("div.shareStatus", contentDiv);
	               if (statusDiv.length > 0) {
	                  statusDiv = statusDiv[0];
	               } else {
	                  statusDiv = domConstruct.create("div", {
	                     className: "shareStatus lotusRightCorner",
	                     role: "alert"
	                  });
	                  domConstruct.place(statusDiv, contentDiv, "first");
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
	                  this.own(aspect.after(this.statusContainer, "remove", lang.hitch(this, this._hideMessageDiv, statusDiv), true));
	               }
	            }
	         } else if (this.statusContainer) {
	            this.clearPageMessages();
	         }
	      },
	      isDirty: function() {
	         return array.some(this.tabs.getChildren(), function(tab) {
	            return tab.isDirty === true;
	         });
	      },
	      setDirty: function(actionId, isDirty) {
	         array.forEach(this.tabs.getChildren(), lang.hitch(this, function(actionId, isDirty, tab) {
	            if (tab.actionId == actionId) tab.isDirty = isDirty;
	         }, actionId, isDirty));
	      },
	      setSubmitState: function(inProgress) {
	         this.submitInProgress = inProgress === true;
	         if (this.submitInProgress) this.tabs.preventTabSwitching();
	         else this.tabs.allowTabSwitching();
	      }
	
	   });
	
	})();
	
	return ShareboxDialog;
});
