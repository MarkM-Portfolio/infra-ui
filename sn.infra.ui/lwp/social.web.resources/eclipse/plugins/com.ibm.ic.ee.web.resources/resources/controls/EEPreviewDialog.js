/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/dojoConfig",
	"dojo/dom-geometry",
	"dojo/dom",
	"dojo/_base/declare",
	"dojo/dom-attr",
	"dojo/_base/window",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/dom-construct",
	"dojo/_base/array",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/_base/kernel",
	"dojo/has",
	"dojo/cookie",
	"dojo/on",
	"dojo/query",
	"dojo/text!ic-ee/controls/templates/EEPreviewDialog.html",
	"dojo/topic",
	"dojo/string",
	"dojo/io-query",
	"dojo/html",
	"dojox/html/entities",
	"dijit/focus",
	"ic-incontext/util/DateFormat",
	"com/ibm/lconn/gadget/util/specHelper",
	"com/ibm/lconn/gadget/container/iContainer2",
	"ic-incontext/util/html",
	"ic-ee/util/misc",
	"com/ibm/lconn/layout/people",
	"ic-ee/config",
	"ic-ee/gadget/GenericEE",
	"ic-core/auth",
	"ic-eeconfig/config",
	"ic-incontext/NetworkDojo",
	"ic-incontext/util/misc",
	"ic-incontext/util/text",
	"ic-ui/controls/FlyoutDialog",
	"ic-incontext/widget/Tooltip"
], function (dojo, lang, dojoConfig, domGeometry, dom, declare, domAttr, windowModule, i18nsocialEEStrings, domConstruct, array, domStyle, domClass, kernel, has, on, query, template, topic, stringUtils, ioQuery, dojoHTML, entities, focusUtils, DateFormat, specHelper, iContainer2, html, miscEE, people, config, GenericEE, auth, ibmSocialEeconfigConfig, NetworkDojo, misc, text, FlyoutDialog, Tooltip) {

	/*globals com, lconn, netJazzAjaxConfig*/
	
	(function () {
	    var cookieName = "_eePopupResizingEnabled";
	    var resizingEnabledValue = cookie(cookieName);
	    var resizingEnabled = ibmSocialEeconfigConfig.popupResizing;
	    if (resizingEnabledValue) {
	        resizingEnabled = (resizingEnabledValue === "true");
	    }
	
	    var EEPreviewDialog = declare("com.ibm.social.ee.controls.EEPreviewDialog", FlyoutDialog, {
	        fullHeight: true, //Determines if dialog should take up full height - will be used for RTC work item 35957
	        sharkRemoval: true, //will be used for RTC work item 35957
	        previouslyLoaded: false,
	        minWidth: 450, //will be used by RTC task 36294
	        verticalMargin: 30,
	        scrollMargin: 0,
	        topMargin: 20,
	        socialObjId: "eePreviewGadget",
	        maxY: 0,
	        modified: false,
	        _hasF: true,
	        _strings: i18nsocialEEStrings.EE_DIALOG,
	        _stringsMsg: i18nsocialEEStrings.MESSAGE,
	        container: iContainer2,
	        currentNode: null,
	        network: null,
	        inClosePrompt: false,
	        _firstResize: true,
	        onCloseDeferred: null,
	
	        postCreate: function () {
	            this.inherited(arguments);
	            this.network = NetworkDojo.getInstance({});
	            this.connect(window, "resize", lang.hitch(this, function () {
	                if (!this.positioned) {
	                    return;
	                }
	                this._updateHeight();
	                if (resizingEnabled) {
	                    this._setDialogTopPosition();
	                }
	                this._updateDialogLeftPosition();
	                this._updateArrowDisplay();
	            }));
	            topic.subscribe("com/ibm/social/EEPreviewDialog_resize", lang.hitch(this, function () {
	                if (!this.positioned) {
	                    return;
	                }
	                this._updateHeight();
	                this._setDialogTopPosition();
	            }));
	
	            this.own(on(window, "scroll", lang.hitch(this, this._updateNodePositions)));
	        },
	
	        initPresentation: function () {
	            return new com.ibm.oneui.controls.EEPreviewDialogPresentation({
	                parent: this,
	                updateContents: this.updateDialogContents,
	                eeStrings: this._strings,
	                master: this._getMasterPopup()
	            });
	        },
	
	        updateDialogContents: function (item, previewDialog, node) {
	            delete previewDialog.createContentsDfd;
	            if (item) {
	                this.setItem(item);
	                var title = null;
	                var plainTitle = null;
	                var url = null;
	                if (lang.getObject("entry.connections.shortTitle", false, item)) {
	                    title = item.entry.connections.shortTitle;
	                    plainTitle = item.entry.connections.plainTitle;
	                } else if (item.eventHtml) {
	                    title = item.eventHtml;
	                    plainTitle = title;
	                } else if (item.context) {
	                    title = item.context.title;
	                    url = item.context.itemUrl;
	                    plainTitle = title;
	                }
	                if (title !== null) {
	                    if (item.context) {
	                        var verb = lang.getObject("entry.verb", false, item);
	                        this.setTitle(title, plainTitle, url, item.context.eventType, item.context.actor, verb, item.context, previewDialog);
	                    }
	                    else {
	                        this.setTitle(title, title, null, null, null, null);
	                    }
	                }
	
	                if (item.context && item.context.published && item.context.updated) {
	                    this.setTime(item.context.published, item.context.updated);
	                }
	                else {
	                    this.hideTime();
	                }
	            }
	
	            if (item.deferred && item.deferred.fired < 0) {
	                this.loading(true);
	                item.deferred.addCallback(previewDialog, "onItemLoaded", item, previewDialog, node);
	            }
	            else {
	                var dfd = previewDialog.createContentsDfd = new Deferred();
	                var self = this;
	                dfd.addCallback(function () {
	                    self.loading();
	                    previewDialog.createDialogContents(item, node);
	                });
	            }
	        },
	
	        onContentSet: function () {
	            if (this.createContentsDfd) {
	                this.createContentsDfd.callback();
	            }
	        },
	
	        onItemLoaded: function (item, previewDialog, node) {
	            if (!this.isOpen(item.around)) {
	                return;
	            }
	            this._presentation.updateContents(item, previewDialog, node);
	        },
	        //Setup the priority to allow the "are you sure on dirty modification dialog to appear on top"
	        getMasterPopupParams: function () {
	            var p = this.inherited(arguments);
	            p.zIndex = 900;
	            return p;
	        },
	        createDialogContents: function (item, node) {
	            if (!item) {
	                return;
	            }
	            this.currentNode = item.around;
	            if (!item.context && !item.gadgetUrl) {
	                this.displayErrorMsg(node, this._strings.ERROR_MSG_CONTENT_NOT_AVAILABLE);
	                return;
	            }
	
	            var context = item.context, gdiv;
	
	            context.onCloseDeferred = this.onCloseDeferred;
	
	            domClass.add(this._getDomNode(), "lotusui30");
	            if (item.gadgetXmlUrl) {
	                if (!domAttr.get(node, "id")) {
	                    domAttr.set(node, "id", specHelper.nextDomId());
	                }
	                if (!this.siteId || this.siteId !== domAttr.get(node, "id")) {
	                    this.siteId = domAttr.get(node, "id");
	                    this._registerResizeListener();
	                }
	                if (!this.container._initialized) {
	                    this.container.init();
	                    com.ibm.social.ee.controls.EEPreviewDialog.setupActivityStreamNotification(this.container, this);
	                    this.container._initialized = true;
	                }
	                var authUser = com.ibm.social.ee.controls.EEPreviewDialog.findCurrentAuthUser();
	                if (context && authUser) {
	                    context.authUser = authUser;
	                }
	                if (this.gadgetHandle) {
	                    this.gadgetHandle.unload();
	                    delete this.gadgetHandle;
	                }
	                var renderParams = { width: "100%" };
	                if (dojoConfig.isDebug) {
	                    lang.mixin(renderParams, { userPrefs: { "debug": "true" } });
	                }
	
	                var forceSSO = !ibmSocialEeconfigConfig.ecmOAuth; //Enable oauth in ecm events if configured so
	                var isECMEvent = false;
	                if (context && context.eventType) {
	                    isECMEvent = (context.eventType.indexOf("ecm.") === -1) ? false : true;
	                }
	                var oauthEnabled = (ibmSocialEeconfigConfig.useSSO || (isECMEvent && forceSSO)) ? "false" : "true";
	                if (cookie("_oauthEnabled")) {
	                    oauthEnabled = (isECMEvent && forceSSO) ? "false" : cookie("_oauthEnabled");
	                }
	
	                var lang = domAttr.get(windowModule.doc.documentElement, "lang");
	                var dir = domAttr.get(windowModule.doc.documentElement, "dir");
	                var country = "";
	                var anonymous = !(authUser && authUser.id);
	                if (netJazzAjaxConfig) {
	                    var p = ioQuery.queryToObject(netJazzAjaxConfig.params);
	                    if (p.country) {
	                        country = p.country;
	                    }
	                    if (p.lang) {
	                        lang = p.lang;
	                    }
	                }
	
	                var loadWidgetParams = {
	                    placement: node,
	                    componentType: "gadget",
	                    instanceData: {
	                        renderParams: renderParams,
	                        eeDataModel: {
	                            context: context
	                        },
	                        viewParams: {
	                            useOAuth: oauthEnabled,
	                            lang: lang,
	                            country: country,
	                            dir: dir,
	                            locale: kernel.locale,
	                            anonymous: anonymous,
	                            hideBodyOverflow: true
	                        },
	                        errback: lang.hitch(this, this.displayErrorMsg, node, this._strings.ERROR_MSG_GENERIC),
	                        callback: lang.hitch(this, function () {
	                            window.setTimeout(lang.hitch(this, function () {
	                                if (item.gadgetUrl) {
	                                    var iframe = query("iframe", node)[0];
	                                    if (iframe) {
	                                        iframe.style.height = (Math.floor(domGeometry.position(this._presentation.scrollNode).h) - 20) + "px";
	                                        iframe.style.width = (config.gadgetParams.width - 60) + "px";
	                                    }
	                                }
	                            }), 200);
	                        })
	                    }
	                };
	                loadWidgetParams.definitionUrl = item.gadgetXmlUrl;
	                this.gadgetHandle = this.container.loadWidget(loadWidgetParams);
	            }
	            else if (context) {
	                domConstruct.empty(node);
	                gdiv = domConstruct.create("div", {}, node);
	                //if gadget url is null, show generic. For now, always show generic if hit else
	                context.network = NetworkDojo.getInstance({});
	                context.profileUrl = config.getProfileUrl();
	                new GenericEE(context, gdiv);
	            }
	        },
	        _registerResizeListener: function () {
	            if (resizingEnabled) {
	                var adjustHeightTopic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(this.siteId, com.ibm.lconn.gadget.container.Topics.GadgetWindow.AFTER_ADJUST_HEIGHT);
	                topic.subscribe(adjustHeightTopic, lang.hitch(this, function (height) {
	                    this.contentResized(height);
	                }));
	            }
	        },
	        _updatePopupPosition: function () {
	            if (!this.content) {
	                return;
	            }
	            var popup = this._getMasterPopup(),
	                popupNode = popup.domNode;
	
	            domStyle.set(popup.wrapper, "width", this.popupWidth + "px");
	            if (has("ie")) {
	                domStyle.set(popup.content, "width", (config.gadgetParams.width) + "px");
	            }
	
	            this.maxY = domGeometry.position(this.lotusMain, true).y + 25;
	            if (resizingEnabled) {
	                this._updateHeight();
	                this._setDialogTopPosition(true);
	            }
	            else {
	                this._setDialogTopPosition(true);
	                this._updateHeight();
	            }
	
	            domStyle.set(popupNode, "right", "");
	            domStyle.set(popupNode, "left", this._getPopupHorizontalPosition(popupNode) + "px");
	        },
	        _getWindowHeight: function () {
	            return ((has("ie") < 9) ? document.documentElement.offsetHeight : window.innerHeight);
	        },
	        _updateHeight: function () {
	            if (!this.content) {
	                return;
	            }
	            var paddingNode = this.content.parentNode;
	            var popup = this._getMasterPopup();
	            var offset = (domStyle.get(popup.domNode, "position") === "absolute") ? (this.maxY + domGeometry.position(windowModule.body()).y - this.topMargin) : 0;
	            var height = (this._getWindowHeight() - this.verticalMargin -
	                domStyle.get(paddingNode, "paddingTop") -
	                domStyle.get(paddingNode, "paddingBottom") -
	                domStyle.get(popup.wrapper, "borderTopWidth") -
	                domStyle.get(popup.wrapper, "borderBottomWidth")) -
	                offset;
	            if (height < 0) {
	                height = 0;
	            }
	            var headerHeight = domStyle.get(this._presentation.flyoutHeader, "height");
	            if (!has("ie") || has("ie") >= 9) {
	                headerHeight += domStyle.get(this._presentation.flyoutHeader, "paddingTop") +
	                    domStyle.get(this._presentation.flyoutHeader, "paddingBottom");
	            }
	            var scrollHeight = height - headerHeight - this.scrollMargin;
	            if (scrollHeight < 0) {
	                scrollHeight = 0;
	            }
	
	            if (!resizingEnabled || this.isUrlGadget) {
	                domStyle.set(this.content, "height", height + "px");
	                domStyle.set(this._presentation.wrapper, "height", height + "px");
	                domStyle.set(this._presentation.scrollNode, "height", scrollHeight + "px");
	            }
	            else {
	                var contentNode = this._presentation.contentNode,
	                    contentHeight = Math.floor(domGeometry.position(contentNode).h);
	
	                if (contentHeight > scrollHeight) {
	                    domStyle.set(this.content, "height", height + "px");
	                    domStyle.set(this._presentation.wrapper, "height", height + "px");
	                    domStyle.set(this._presentation.scrollNode, "height", scrollHeight + "px");
	                    this.maxHeightReached = true;
	                }
	                else {
	                    domStyle.set(this.content, "height", "");
	                    domStyle.set(this._presentation.wrapper, "height", "");
	                    domStyle.set(this._presentation.scrollNode, "height", "");
	                    this.maxHeightReached = false;
	                }
	            }
	        },
	
	        _encloseArrow: function (arrowNode) {
	            this.previousArrowParent = arrowNode.parentNode;
	            this.arrowPopupNode = domConstruct.create("div", {className: this._getEncloseArrowCSSClasses(), visibility: "hidden"}, windowModule.body());
	            domConstruct.place(arrowNode, this.arrowPopupNode);
	        },
	        _getEncloseArrowCSSClasses: function () {
	            return "lotusFlyout";
	        },
	
	        _getPopupHorizontalPosition: function (popupNode) {
	            var pos,
	                offset = (popupNode.style.position === "fixed") ? domGeometry.position(windowModule.body()).x : 0,
	                arrowPos = domGeometry.position(this.arrowPopupNode, true);
	            if (!this.isRTL) {
	                pos = arrowPos.x + this.arrowWidth + offset;
	            }
	            else {
	                pos = arrowPos.x - this.popupWidth + offset - this.arrowWidth;
	            }
	            return pos;
	        },
	
	        _getArrowHorizontalPosition: function () {
	            // Set the margin space
	            var marginSpace = 2;
	
	            // Get the position of lotusMain
	            var lotusMainPos = domGeometry.position(this.lotusMain, true);
	
	            // Now get a horizontal position for the arrow
	            var pos;
	            if (!this.isRTL) {
	                pos = lotusMainPos.x + lotusMainPos.w - (this.popupWidth + this.arrowWidth + marginSpace);
	            }
	            else {
	                pos = lotusMainPos.x + this.popupWidth + this.arrowWidth + marginSpace;
	            }
	
	            return pos;
	        },
	
	        _getArrowVerticalPosition: function () {
	            // Get activity stream item node position
	            var entryNodePos = domGeometry.position(this.currentNode, true);
	
	            // The vertical position is the top of the activity stream item + 1/2 of the height of the item - 1/2 of the height of the arrow
	            var pos = entryNodePos.y + (entryNodePos.h / 2 - this.arrowHeight / 2);
	
	            return pos;
	        },
	
	        _setArrowPosition: function () {
	
	            this.validateCurrentNode();
	
	            domStyle.set(this.arrowPopupNode, {
	                "position": "absolute",
	                "borderWidth": "0px",
	                "top": this._getArrowVerticalPosition() + "px",
	                "left": this._getArrowHorizontalPosition() + "px"
	            });
	        },
	
	        _updateNodePositions: function () {
	            if (!this.positioned) {
	                return;
	            }
	            if (!resizingEnabled) {
	                this._setDialogTopPosition(false);
	            }
	            this._updateDialogLeftPosition();
	            this._updateHeight();
	            if (resizingEnabled) {
	                this._setDialogTopPosition(false);
	            }
	            this._updateArrowDisplay();
	        },
	
	        _updateDialogLeftPosition: function () {
	            if (!this.currentNode) {
	                return;
	            }
	            this.validateCurrentNode();
	            var popup = this._getMasterPopup();
	            var popupNode = popup.domNode;
	
	            domStyle.set(this.arrowPopupNode, "left", this._getArrowHorizontalPosition() + "px");
	            domStyle.set(popupNode, "right", "");
	            domStyle.set(popupNode, "left", this._getPopupHorizontalPosition(popupNode) + "px");
	        },
	        _updateArrowDisplay: function () {
	            if (!this.allowArrowDisplay) {
	                return;
	            }
	
	            var arrowTop = domGeometry.position(this.arrowPopupNode, true).y;
	            var arrowBottom = arrowTop + this.arrowHeight;
	
	            var popupNode = this._getMasterPopup().domNode;
	            var popupTop = domGeometry.position(popupNode, true).y;
	
	            var contentHeight = domStyle.get(this.content, "height");
	            var roundedCornerMargin = 0;
	            if (!has("ie")) {
	                roundedCornerMargin = 7;
	            }
	
	            if ((arrowTop >= (popupTop + roundedCornerMargin)) && (arrowBottom <= (popupTop + contentHeight - roundedCornerMargin))) {
	                domStyle.set(this.arrowPopupNode, "visibility", "visible");
	            }
	            else {
	                domStyle.set(this.arrowPopupNode, "visibility", "hidden");
	            }
	        },
	        _setDialogTopPosition: function (isInitial) {
	            var popupNode = this._getMasterPopup().domNode;
	            var bodyY = Math.abs(domGeometry.position(windowModule.body()).y);
	            var maxY = this.maxY;
	
	            if (!resizingEnabled) {
	                if (bodyY > maxY) {
	                    if ((domStyle.get(popupNode, "position") !== "fixed") || isInitial) {
	                        domStyle.set(popupNode, {
	                            "top": this.topMargin + "px",
	                            "position": "fixed"
	                        });
	                    }
	                }
	                else {
	                    if ((bodyY + this.topMargin) >= maxY) {
	                        //slowly transition from one scenario to another
	                        domStyle.set(popupNode, {
	                            "top": this.topMargin + "px",
	                            "position": "fixed"
	                        });
	                    }
	                    else {
	                        if ((domStyle.get(popupNode, "position") !== "absolute") || isInitial) {
	                            domStyle.set(popupNode, {
	                                "top": maxY + "px",
	                                "position": "absolute"
	                            });
	                        }
	                    }
	                }
	            }
	            else {
	                if (this.maxHeightReached) {
	                    // Case I - Window is scrolled past top starting point
	                    if ((bodyY + this.topMargin) >= maxY) {
	                        if ((domStyle.get(popupNode, "position") !== "fixed") || (domStyle.get(popupNode, "top") !== (this.topMargin + "px")) || isInitial) {
	                            domStyle.set(popupNode, {
	                                "top": this.topMargin + "px",
	                                "position": "fixed"
	                            });
	                        }
	                    }
	                    // Case II - Window is positioned near the top
	                    else {
	                        if ((domStyle.get(popupNode, "position") !== "absolute") || (domStyle.get(popupNode, "top") !== (maxY + "px")) || isInitial) {
	                            domStyle.set(popupNode, {
	                                "top": maxY + "px",
	                                "position": "absolute"
	                            });
	                        }
	                    }
	                }
	                else {
	                    var popupHeight = Math.floor(domGeometry.position(popupNode).h);
	                    // The vertical midpoint as calculated by _getArrowVerticalPosition is only accurate if the
	                    // currentNode hasn't been replaced by its backup which is the entire activity stream or it's no longer part of the dom
	                    // If that's the case, it's more accurate to simply look at the arrow node itself.
	                    var verticalMidpoint = (domClass.contains(this.currentNode, "lotusStream") || !has("descendant")(this.currentNode, windowModule.body()) ?
	                        Math.floor(domGeometry.position(this.arrowPopupNode, true).y) :
	                        this._getArrowVerticalPosition()) +
	                        (this.arrowHeight / 2);
	                    var topPosition = verticalMidpoint - (popupHeight / 2);
	                    var positionType = "absolute";
	                    var maxVerticalPos = this._getWindowHeight() - (this.verticalMargin / 2);
	
	
	                    // Now determine if topPosition is outside its range
	                    // Case I - Window is scrolled past top starting point
	                    if ((bodyY + this.topMargin) >= maxY) {
	                        var windowY = topPosition - bodyY;
	                        // Case A - top of dialog is positioned before the top margin of the viewport
	                        if (windowY <= this.topMargin) {
	                            topPosition = this.topMargin;
	                            positionType = "fixed";
	                        }
	                        // Case B - bottom of dialog is positioned beyond bottom margin of the viewport
	                        else if ((windowY + popupHeight) > maxVerticalPos) {
	                            topPosition = windowY - ((windowY + popupHeight) - maxVerticalPos);
	                            positionType = "fixed";
	                        }
	                        // Case C - popup fits within viewport
	                        // Leave absolutely positioned and at the current topPosition
	
	                    }
	
	                    // Case II - Window is positioned near the top
	                    else {
	                        // Case A - top position is higher than top margin
	                        if (topPosition < maxY) {
	                            topPosition = maxY;
	                            positionType = "absolute";
	                        }
	                        // Case B - bottom of dialog is positioned beyond bottom margin of viewport
	                        else if ((topPosition + popupHeight) > (bodyY + maxVerticalPos)) {
	                            var difference = (topPosition + popupHeight) - (bodyY + maxVerticalPos);
	                            topPosition = topPosition - difference;
	                            positionType = "absolute";
	                        }
	                        // Case C - popup fits within viewport
	                    }
	
	                    domStyle.set(popupNode, {
	                        "top": topPosition + "px",
	                        "position": positionType
	                    });
	
	                }
	            }
	        },
	
	        displayErrorMsg: function (node, msg) {
	            var div, d = windowModule.doc;
	            domConstruct.empty(node);
	            div = domConstruct.create("div", {className: "lconnEmpty", role: "alert"}, node);
	            div.appendChild(d.createTextNode(msg));
	        },
	
	        destroy: function () {
	            if (this.arrowPopupNode) {
	                // Restore the arrow to the location it was before enclosing it
	                if (this.arrowPopupNode.firstChild) {
	                    domConstruct.place(this.arrowPopupNode.firstChild, this.previousArrowParent);
	                }
	                domConstruct.destroy(this.arrowPopupNode);
	            }
	            this.inherited(arguments);
	        },
	        close: function () {
	            var afterClose;
	            if (this.afterClose) {
	                afterClose = this.afterClose;
	                delete this.afterClose;
	            }
	            if (this.modified) {
	                if (this.inClosePrompt) {
	                    return;
	                }
	                var self = this;
	                this.inClosePrompt = true;
	
	                var confirmCloseCallback = function (confirmClose) {
	                    if (confirmClose) {
	                        self.modified = false;
	                        self.close();
	                        if (afterClose) {
	                            afterClose();
	                        }
	                    }
	                    window.setTimeout(function () {
	                        self.inClosePrompt = false;
	                    }, 0);
	                    return;
	                };
	
	                html.promptContentChangedDialog(confirmCloseCallback);
	                return;
	            }
	            delete this.afterClose;
	            this.inherited(arguments);
	        },
	        _onBodyClick: function (e) {
	            if (!this.inClosePrompt) {
	                this.inherited(arguments);
	            }
	        },
	        _onKeyPress: function (/*Event*/ evt) {
	            if (!this.inClosePrompt) {
	                this.inherited(arguments);
	            }
	        },
	        position: function () {
	            //Force right orientation all the time
	            this.orientation = domGeometry._isBodyLtr() ? 'R' : 'L';
	            this.inherited(arguments);
	
	            this._initializePositioning();
	
	            this._setArrowPosition();
	            this._updatePopupPosition();
	            this._updateArrowDisplay();
	
	            this.positioned = true;
	        },
	        _initializePositioning: function () {
	            // Enclose arrow and get its dimensions
	            var arrowNode = this._getMasterPopup().arrow;
	            if (!this.arrowPopupNode) {
	                this._encloseArrow(arrowNode);
	            }
	            this.arrowWidth = domStyle.get(arrowNode, "width");
	            this.arrowHeight = domStyle.get(arrowNode, "height");
	
	            // Remove any positioning on the internal arrow node
	            domStyle.set(arrowNode, { top: 0, bottom: "auto" });
	
	
	            // Get the width of popup
	            var paddingNode = this.content ? this.content.parentNode : null,
	                horizontalPadding = paddingNode ? domStyle.get(paddingNode, "paddingRight") + domStyle.get(paddingNode, "paddingLeft") : 0;
	            this.popupWidth = config.gadgetParams.width + horizontalPadding;
	
	            // Get lotusMain
	            if (!this.lotusMain) {
	                this.lotusMain = this.getMainNodeForPage();
	            }
	
	            // Set rtl flag
	            this.isRTL = !domGeometry._isBodyLtr();
	        },
	        getMainNodeForPage: function () {
	            var lotusMainNode = query("div.lotusMain")[0];
	            if (!lotusMainNode) {
	                lotusMainNode = dom.byId("lotusMain");
	            }
	            return lotusMainNode;
	        },
	        onClose: function () {
	            this.inherited(arguments);
	
	
	            if(this.onCloseDeferred){
	                this.onCloseDeferred.callback();
	            }
	
	            if (this.gadgetHandle) {
	                this.gadgetHandle.unload();
	                delete this.gadgetHandle;
	            }
	            domStyle.set(this._presentation.msgNode, "display", "none");
	            if (this.arrowPopupNode) {
	                domStyle.set(this.arrowPopupNode, "visibility", "hidden");
	            }
	            this.allowArrowDisplay = false;
	        },
	        onOpen: function () {
	            this.inherited(arguments);
	            this.allowArrowDisplay = true;
	
	            //Adding a deferred here that will resolve when the onClose method is fired
	            this.onCloseDeferred = new Deferred();
	        },
	        open: function (target) {
	            var m = this._getMasterPopup();
	            if (m._showing === this) {
	                if (this._target !== target && this.modified) {
	                    var self = this;
	                    var args = arguments;
	                    this.afterClose = function () {
	                        self.open.apply(self, args);
	                    };
	                    this.close();
	                    return;
	                }
	            }
	            this.inherited(arguments);
	
	            miscEE.addMessageToNewWindowLinks();
	
	            this._firstResize = true;
	
	        },
	        next: function () {
	            this.inherited(arguments);
	            if (domStyle.get(this._presentation.nextNode, "display") !== "none") {
	                this._presentation.nextNode.focus();
	            }
	            else {
	                this._presentation.prevNode.focus();
	            }
	        },
	        previous: function () {
	            this.inherited(arguments);
	            if (domStyle.get(this._presentation.prevNode, "display") !== "none") {
	                this._presentation.prevNode.focus();
	            }
	            else {
	                this._presentation.nextNode.focus();
	            }
	        },
	        _validate: function () {
	            if (!this._suspendValidation) {
	                this.inherited(arguments);
	            }
	        },
	        updateTarget: function (target) {
	            delete this._backupTarget;
	            this._target = target;
	            this.currentNode = target;
	            this._suspendValidation = false;
	            this._validate();
	        },
	        validateCurrentNode: function () {
	            if (this._target && !has("descendant")(this._target, windowModule.body()) && this._backupTarget) {
	                this.updateTarget(this._backupTarget);
	            }
	        },
	        scrollTop: function () {
	            this._presentation.scrollNode.scrollTop = 0;
	        },
	        scrollBottom: function () {
	            this._presentation.scrollNode.scrollTop = 9999;
	        },
	
	        contentResized: function (height) {
	            if (this._presentation) {
	                query("iframe", this._presentation.contentNode).style("height", isNaN(height) ? height : height + "px");
	                this._updateHeight();
	                this._setDialogTopPosition();
	
	                if (this._firstResize) {
	                    this._presentation.focusFirstLink(this.content);
	                    //this._presentation.titleNode.focus();
	                    this._firstResize = false;
	                }
	            }
	        }
	
	    });
	
	    declare("com.ibm.oneui.controls.EEPreviewDialogPresentation", com.ibm.oneui.controls.FlyoutDialogPresentation, {
	        eeStrings: null,
	        templateString: template,
	        commonStrings: i18nsocialEEStrings.common,
	        title: "", /* We need to override dijit's behavior of setting the widget title to " " or a blank tooltip shows up in IE */
	        adhocEventTitles: {},
	        MAX_LINK_LENGTH: 25,
	        postCreate: function () {
	            this.inherited(arguments);
	            /*
	             if (!dojo.isIE)
	             this.scrollNode.style.margin = "1px";
	             */
	            var top = domConstruct.create("a", {role: "button", className: "backTopHidden", href: "javascript:;",
	                "aria-hidden": "true", tabindex: 0}, this.wrapper);
	            domStyle.set(top, { top: "-9999px", position: "absolute" });
	            top.appendChild(windowModule.doc.createTextNode(this.messages.goBack));	           
	            on(top, "focus", lang.hitch(this, "backToTop"));
	            
	            var bottom = domConstruct.create("a", {role: "button", className: "backBottomHidden", href: "javascript:;",
	                "aria-hidden": "true", tabindex: 0}, this.wrapper, "first");
	            domStyle.set(bottom, { top: "-9999px", position: "absolute" });
	            on(bottom, "focus", lang.hitch(this, "backToBottom"));
	            
	            this.createAdhocTitleMapping();

				// setup aria tooltips
				this._setupTooltips();
	        },

			/**
			 * Sets up aria tooltips for acessibility.
			 */
			_setupTooltips: function(){
				
				//EE close button
	    		var closeBtn = query(".lotusBtnImg.lotusClose", this.domNode)[0];
	    		this._setupTooltip(closeBtn, this.messages.close);
			},
			
			/**
			 * Sets up an aria tooltip for accessibility.
			 * @param {DOM element} - the element to attach the tooltip
			 * @param {string} - the string to show in the tooltip
			 * 
			 * @returns {djit/Tooltip} the tooltip
			 */
			_setupTooltip: function(element, label){
				if(element){
					return new Tooltip({
						connectId: [element],
						label: label,
	    				position: ['after', 'above', 'below', 'before']
					});
				}
			},
			
	        createAdhocTitleMapping: function () {
	            this.adhocEventTitles["profiles.status.updated"] = this.eeStrings.TITLE_SU;
	            this.adhocEventTitles["profiles.colleague.created"] = this.eeStrings.TITLE_NI;
	        },
	        /**
	         * sets Aria strings on this dialog title node
	         * @private
	         */
	        _setAriaStringsOnTitleNode: function (/*string */ plainTitle) {
                plainTitle = plainTitle ? this._escape_string(plainTitle) : "";
	            domAttr.set(this.titleNode, "title", plainTitle);
	            domAttr.set(this.titleNode, "aria-label", plainTitle);
	        },

            /**
             * Replace for entities
             */
            _escape_string: function(s)
            {
                return s.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
            },
	        /**
	         * Default implementation that updates the popupTitle node as a string.
	         * Subclasses should handle null, deferrable, or empty items.  Must
	         * support strings as the first argument (for an explicit text popupTitle).
	         */
	        setTitle: function (popupTitle, plainTitle, url, eventType, actor, verb) {
	
	            this._setAriaStringsOnTitleNode(plainTitle);
	
	            // if the user is external then we don't show links for user profiles
	            var isUserExternal = auth.getUser() && auth.getUser().isExternal;
	
	            if (isUserExternal){
	                popupTitle = html.removeProfileLinks(popupTitle);
	            }
	
	            if (eventType && this.adhocEventTitles[eventType] && verb !== "bump") {
	                domConstruct.empty(this.titleNode);
	                var user = this._formatUserName(actor);
	                var suTitle = stringUtils.substitute(this.adhocEventTitles[eventType], {author: user});
	                this.titleNode.innerHTML = suTitle;
	                /*
	                 on standalone status updates the news item plainTitle isn't the same of the EE one, so let's build the
	                 plainTitle here too
	                 */
	                var userName = actor.displayName;
	                if (userName) {
	                    plainTitle = stringUtils.substitute(this.adhocEventTitles[eventType], {author: userName});
	                    this._setAriaStringsOnTitleNode(plainTitle);
	                }
	            }
	            else {
	                if (url) {
	                    domConstruct.empty(this.titleNode);
	                    var a = domConstruct.create("a", {href: url, title: popupTitle || "", target: "_blank", className: "bidiAware"}, this.titleNode);
	                    a.appendChild(windowModule.doc.createTextNode(popupTitle || ""));
	                }
	                else {
	                    domConstruct.empty(this.titleNode);
	                    var util = com.ibm.social.incontext.util;
	                    this.titleNode.innerHTML = popupTitle;
	                    util.text.breakStringHTML(this.titleNode);
	                    //Force ee links in popupTitle to have a target of _blank.
	                    var self = this;
	                    query("a", this.titleNode).forEach(function (node) {
	                        node.target = "_blank";
	                        domClass.remove(node, "entry");
	                        if (!domClass.contains(node.parentNode, "vcard")) {
	                            var nodeTitle = util.html.htmlText(node);
	                            var txt = entities.encode(nodeTitle);
	                            if (txt) {
	                                node.title = self.eeStrings.OPEN_LINK ? stringUtils.substitute(self.eeStrings.OPEN_LINK, {title: nodeTitle}) : nodeTitle;
	                                txt = util.text.trimToLength(txt, self.MAX_LINK_LENGTH);
	                                node.innerHTML = txt;
	                            }
	                        }
	                    });
	
	                    query("span", this.titleNode).forEach(function (node) {
	                        domClass.remove(node, "profiles entry");
	                    });
	                }
	            }
	            // Bidi support
	            lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.wrapper);
	        },
	        _formatUserName: function (user) {
	            var div = domConstruct.create("div"), a, span;
	            span = domConstruct.create("span", {className: "vcard"}, div);
	            span.appendChild(windowModule.doc.createTextNode(user.displayName));
	            if (people.createLink) {
	                a = people.createLink({userid: miscEE.getItemId(user.id),
	                    state: user.state, name: user.displayName, email: user.email});
	                if (a) {
	                    domAttr.remove(a, "aria-describedby");
	                    domClass.add(a, "eeActionLinks");
	                    domAttr.set(a, "target", "_blank");
	                    domAttr.set(a, "title", stringUtils.substitute(this.commonStrings.PERSON_TITLE, {user: user.displayName}));
	                    domConstruct.empty(span);
	                    span.appendChild(a);
	                }
	            }
	            return div.innerHTML;
	        },
	        setTime: function (time, isUpdated) {
	            domConstruct.empty(this.timeNode);
	            var strings = (isUpdated === "false") ? this.messages.timestamp.created : this.messages.timestamp.updated;
	            var date = misc.date.convertAtomDate(time);
	            var timeStr = new DateFormat(date).formatByAge(strings);
	            var span = domConstruct.create("span", {}, this.timeNode);
	            span.appendChild(windowModule.doc.createTextNode(timeStr));
	            domStyle.set(this.timeNode, "display", "");
	            domStyle.set(this.timeNode, "borderLeftStyle", "");
	        },
	        hideTime: function () {
	            dojoHTML.set(this.timeNode, "&nbsp;");
	            domStyle.set(this.timeNode, "borderLeftStyle", "none");
	        },
	        setItem: function (item) {
	            this.item = item;
	        },
	        backToTop: function (e) {
	            this.focusFirstLink();
	            return;	            
	        },
	        backToBottom: function (e) {
	            document.querySelector("iframe[name*=__gadget_gadget_]").contentWindow.
	                    document.querySelector("a[dojoattachevent*=\"onclick:cancelCreate\"]").focus();
	        },
	        loading: function (setTitle) {
	            if (setTitle) {
	                this.setTitle(this.eeStrings.LOADING);
	            }
	            domConstruct.empty(this.contentNode);
	            domClass.add(this.contentNode, "lotusFlyoutInner");
	            html.showLoading(this.contentNode);
	        },
	        focusFirstLink: function (el) {
	            var origLinks = query("a", el ? el : this.domNode);
	            var visibleLinks = [];
	            array.forEach(origLinks, function (link, i) {
	                // visible title links should only be profile links
	                if (domStyle.get(link, "display") !== "none" && !domClass.contains(link, "lotusAltText") && !domClass.contains(link, "backTopHidden") && domClass.contains(link, "fn") && domClass.contains(link, "url")) {
	                    visibleLinks.push(link);
	                }
	            });
	            var focus = null;
	            if (visibleLinks.length > 0) {
	                focus = visibleLinks[0];
	                focusUtils.focus(focus);
	            }
	            else {
	                focus = this.metaCloseInput;
	                focusUtils.focus(focus);  //if there are no links in the title, then focus on the close button
	            }
	            this._firstFocusItem = focus;
	        }
	    });
	
	// Determine the current auth user for metrics purposes
	    com.ibm.social.ee.controls.EEPreviewDialog.findCurrentAuthUser = function () {
	        var user = null;
	        if (langModule.getObject("lconn.homepage.global")) {
	            if (langModule.isFunction(langModule.getObject("lconn.homepage.global.getUserId"))) {
	                user = { id: lconn.homepage.global.getUserId(), name: langModule.getObject("lconn.homepage.userName") };
	            }
	        }
	        else if (langModule.getObject("widgetUserInfo")) {
	            user = { id: langModule.getObject("widgetUserInfo.userId"), name: langModule.getObject("widgetUserInfo.displayName") };
	        }
	        else if (langModule.getObject("profilesData.loggedInUser")) {
	            user = { id: langModule.getObject("currentUserGuid"), name: langModule.getObject("profilesData.loggedInUser.displayName") };
	        }
	        return user;
	    };
	
	    com.ibm.social.ee.controls.EEPreviewDialog.setupActivityStreamNotification = function (container, dialog) {
	        if (!com.ibm.social.ee.controls.EEPreviewDialog._notificationInitialized) {
	            container.getCommonContainer().then(function (cc) {
	                topic.subscribe("com/ibm/social/ee/event/updateActivityEntry", function (objectId, timestamp) {
	                    if (has("descendant")(dialog._target, document.body)) {
	                        dialog._backupTarget = dialog._target.parentNode;
	                    }
	                    dialog._suspendValidation = true;
	                    var args = [ objectId ];
	                    if (timestamp) {
	                        args.push(timestamp);
	                    }
	                    topic.publish("com/ibm/social/as/event/addactivityentry", args);
	                });
	                topic.subscribe("com/ibm/social/ee/event/closePopup", function () {
	                    if (has("descendant")(dialog._target, document.body)) {
	                        dialog.close();
	                    }
	                });
	                topic.subscribe("com/ibm/social/ee/event/setDirty", function (modified) {
	                    dialog.modified = modified;
	                });
	                topic.subscribe("com/ibm/social/ee/event/scrollTop", function () {
	                    window.setTimeout(function () {
	                        dialog.scrollTop();
	                    }, 0);
	                });
	                topic.subscribe("com/ibm/social/ee/event/scrollBottom", function () {
	                    window.setTimeout(function () {
	                        dialog.scrollBottom();
	                    }, 0);
	                });
	                com.ibm.social.ee.controls.EEPreviewDialog._notificationInitialized = true;
	            });
	
	        }
	    };
	
	})();
	return EEPreviewDialog;
});
