/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2012, 2021                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.controls.EEPreviewDialog");
dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");
dojo.require("com.ibm.oneui.controls.FlyoutDialog");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("net.jazz.ajax.xdloader");
dojo.require("com.ibm.social.ee.config");
dojo.require("com.ibm.social.incontext.NetworkDojo");
dojo.require("com.ibm.social.ee.gadget.GenericEE");
dojo.require("com.ibm.lconn.gadget.container.iContainer2");
dojo.require("com.ibm.social.ee.data.ProfilesRoutes");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("com.ibm.social.incontext.widget.MessageContainer");
dojo.require("com.ibm.social.ee.util.misc");
dojo.require("com.ibm.social.eeconfig.config");
dojo.require("com.ibm.lconn.layout.people");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("dojox.html.entities");
dojo.require("lconn.core.auth");

dojo.require("com.ibm.lconn.gadget.util.specHelper");
dojo.require('com.ibm.social.incontext.widget.Tooltip');

/*globals com, lconn, netJazzAjaxConfig*/

(function () {
    var cookieName = "_eePopupResizingEnabled";
    var resizingEnabledValue = dojo.cookie(cookieName);
    var resizingEnabled = com.ibm.social.eeconfig.config.popupResizing;
    if (resizingEnabledValue) {
        resizingEnabled = (resizingEnabledValue === "true");
    }

    dojo.declare("com.ibm.social.ee.controls.EEPreviewDialog", com.ibm.oneui.controls.FlyoutDialog, {
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
        _strings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").EE_DIALOG,
        _stringsMsg: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").MESSAGE,
        container: com.ibm.lconn.gadget.container.iContainer2,
        currentNode: null,
        network: null,
        inClosePrompt: false,
        _firstResize: true,
        onCloseDeferred: null,

        postCreate: function () {
            this.inherited(arguments);
            this.network = com.ibm.social.incontext.NetworkDojo.getInstance({});

            var parentElement = window;
            if ( (typeof window.ICS_UI_ISCNX8UXENABLED !== 'undefined') && window.ICS_UI_ISCNX8UXENABLED ) {
                // use lotusFrame in cnx8 case as this contains the scrollbar
                parentElement = document.querySelector('#lotusFrame');
            }

            this.connect(parentElement, "resize", dojo.hitch(this, function () {
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
            dojo.subscribe("com/ibm/social/EEPreviewDialog_resize", dojo.hitch(this, function () {
                if (!this.positioned) {
                    return;
                }
                this._updateHeight();
                this._setDialogTopPosition();
            }));

            this.connect(parentElement, "onscroll", dojo.hitch(this, this._updateNodePositions));
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
                if (dojo.getObject("entry.connections.shortTitle", false, item)) {
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
                        var verb = dojo.getObject("entry.verb", false, item);
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
                var dfd = previewDialog.createContentsDfd = new dojo.Deferred();
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

            dojo.addClass(this._getDomNode(), "lotusui30");
            if (item.gadgetXmlUrl) {
                if (!dojo.attr(node, "id")) {
                    dojo.attr(node, "id", com.ibm.lconn.gadget.util.specHelper.nextDomId());
                }
                if (!this.siteId || this.siteId !== dojo.attr(node, "id")) {
                    this.siteId = dojo.attr(node, "id");
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
                if (dojo.config.isDebug) {
                    dojo.mixin(renderParams, { userPrefs: { "debug": "true" } });
                }

                var forceSSO = !com.ibm.social.eeconfig.config.ecmOAuth; //Enable oauth in ecm events if configured so
                var isECMEvent = false;
                if (context && context.eventType) {
                    isECMEvent = (context.eventType.indexOf("ecm.") === -1) ? false : true;
                }
                var oauthEnabled = (com.ibm.social.eeconfig.config.useSSO || (isECMEvent && forceSSO)) ? "false" : "true";
                if (dojo.cookie("_oauthEnabled")) {
                    oauthEnabled = (isECMEvent && forceSSO) ? "false" : dojo.cookie("_oauthEnabled");
                }

                var lang = dojo.attr(dojo.doc.documentElement, "lang");
                var dir = dojo.attr(dojo.doc.documentElement, "dir");
                var country = "";
                var anonymous = !(authUser && authUser.id);
                if (netJazzAjaxConfig) {
                    var p = dojo.queryToObject(netJazzAjaxConfig.params);
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
                            locale: dojo.locale,
                            anonymous: anonymous,
                            hideBodyOverflow: true
                        },
                        errback: dojo.hitch(this, this.displayErrorMsg, node, this._strings.ERROR_MSG_GENERIC),
                        callback: dojo.hitch(this, function () {
                            window.setTimeout(dojo.hitch(this, function () {
                                if (item.gadgetUrl) {
                                    var iframe = dojo.query("iframe", node)[0];
                                    if (iframe) {
                                        iframe.style.height = (Math.floor(dojo.position(this._presentation.scrollNode).h) - 20) + "px";
                                        iframe.style.width = (com.ibm.social.ee.config.gadgetParams.width - 60) + "px";
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
                dojo.empty(node);
                gdiv = dojo.create("div", {}, node);
                //if gadget url is null, show generic. For now, always show generic if hit else
                context.network = com.ibm.social.incontext.NetworkDojo.getInstance({});
                context.profileUrl = com.ibm.social.ee.config.getProfileUrl();
                new com.ibm.social.ee.gadget.GenericEE(context, gdiv);
            }
        },
        _registerResizeListener: function () {
            if (resizingEnabled) {
                var adjustHeightTopic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(this.siteId, com.ibm.lconn.gadget.container.Topics.GadgetWindow.AFTER_ADJUST_HEIGHT);
                dojo.subscribe(adjustHeightTopic, dojo.hitch(this, function (height) {
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

            dojo.style(popup.wrapper, "width", this.popupWidth + "px");
            if (dojo.isIE) {
                dojo.style(popup.content, "width", (com.ibm.social.ee.config.gadgetParams.width) + "px");
            }

            this.maxY = dojo.position(this.lotusMain, true).y + 25;
            if (resizingEnabled) {
                this._updateHeight();
                this._setDialogTopPosition(true);
            }
            else {
                this._setDialogTopPosition(true);
                this._updateHeight();
            }

            dojo.style(popupNode, "right", "");
            dojo.style(popupNode, "left", this._getPopupHorizontalPosition(popupNode) + "px");
        },
        _getWindowHeight: function () {
            return ((dojo.isIE < 9) ? document.documentElement.offsetHeight : window.innerHeight);
        },
        _updateHeight: function () {
            if (!this.content) {
                return;
            }

            if ((typeof window.ICS_UI_ISCNX8UXENABLED !== 'undefined') && window.ICS_UI_ISCNX8UXENABLED) {
                // use different topMargin in cnx8 ui https://jira.cwp.pnp-hcl.com/browse/CNXSERV-11495
                if (!ui._UI_NAV_HEIGHT)  {
                    // calculate and add navigation height to use here
                    var _tertiaryLevelNav = document.querySelector('#tertiary_level_nav');
                    if (_tertiaryLevelNav) {
                        ui._UI_NAV_HEIGHT = _tertiaryLevelNav.getBoundingClientRect().bottom;
                    } else {
                        // assume its 110px like as of 2021-09-03
                        ui._UI_NAV_HEIGHT = 110;
                    }
                }
                this.topMargin = ui._UI_NAV_HEIGHT + 20;
            }
            var paddingNode = this.content.parentNode;
            var popup = this._getMasterPopup();
            var offset = (dojo.style(popup.domNode, "position") === "absolute") ? (this.maxY + dojo.position(dojo.body()).y - this.topMargin) : 0;
            var height = (this._getWindowHeight() - this.verticalMargin -
                dojo.style(paddingNode, "paddingTop") -
                dojo.style(paddingNode, "paddingBottom") -
                dojo.style(popup.wrapper, "borderTopWidth") -
                dojo.style(popup.wrapper, "borderBottomWidth")) -
                offset;
            if (height < 0) {
                height = 0;
            }
            var headerHeight = dojo.style(this._presentation.flyoutHeader, "height");
            if (!dojo.isIE || dojo.isIE >= 9) {
                headerHeight += dojo.style(this._presentation.flyoutHeader, "paddingTop") +
                    dojo.style(this._presentation.flyoutHeader, "paddingBottom");
            }
            var scrollHeight = height - headerHeight - this.scrollMargin;
            if (scrollHeight < 0) {
                scrollHeight = 0;
            }

            if (!resizingEnabled) {
                dojo.style(this.content, "height", height + "px");
                dojo.style(this._presentation.wrapper, "height", height + "px");
                dojo.style(this._presentation.scrollNode, "height", scrollHeight + "px");
            }
            else {
                var contentNode = this._presentation.contentNode,
                    contentHeight = Math.floor(dojo.position(contentNode).h);

                if (contentHeight > scrollHeight) {
                    dojo.style(this.content, "height", height + "px");
                    dojo.style(this._presentation.wrapper, "height", height + "px");
                    dojo.style(this._presentation.scrollNode, "height", scrollHeight + "px");
                    this.maxHeightReached = true;
                }
                else {
                    dojo.style(this.content, "height", "");
                    dojo.style(this._presentation.wrapper, "height", "");
                    dojo.style(this._presentation.scrollNode, "height", "");
                    this.maxHeightReached = false;
                }
            }
        },

        _encloseArrow: function (arrowNode) {
            this.previousArrowParent = arrowNode.parentNode;
            this.arrowPopupNode = dojo.create("div", {className: this._getEncloseArrowCSSClasses(), visibility: "hidden"}, dojo.body());
            dojo.place(arrowNode, this.arrowPopupNode);
        },
        _getEncloseArrowCSSClasses: function () {
            return "lotusFlyout";
        },

        _getPopupHorizontalPosition: function (popupNode) {
            var pos,
                offset = (popupNode.style.position === "fixed") ? dojo.position(dojo.body()).x : 0,
                arrowPos = dojo.position(this.arrowPopupNode, true);
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
            var lotusMainPos = dojo.position(this.lotusMain, true);

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
            var entryNodePos = dojo.position(this.currentNode, true);

            // The vertical position is the top of the activity stream item + 1/2 of the height of the item - 1/2 of the height of the arrow
            var pos = entryNodePos.y + (entryNodePos.h / 2 - this.arrowHeight / 2);

            return pos;
        },

        _setArrowPosition: function () {

            this.validateCurrentNode();

            dojo.style(this.arrowPopupNode, {
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

            dojo.style(this.arrowPopupNode, "left", this._getArrowHorizontalPosition() + "px");
            dojo.style(popupNode, "right", "");
            dojo.style(popupNode, "left", this._getPopupHorizontalPosition(popupNode) + "px");
        },
        _updateArrowDisplay: function () {
            if (!this.allowArrowDisplay) {
                return;
            }

            var arrowTop = dojo.position(this.arrowPopupNode, true).y;
            var arrowBottom = arrowTop + this.arrowHeight;

            var popupNode = this._getMasterPopup().domNode;
            var popupTop = dojo.position(popupNode, true).y;

            var contentHeight = dojo.style(this.content, "height");
            var roundedCornerMargin = 0;
            if (!dojo.isIE) {
                roundedCornerMargin = 7;
            }

            if ((arrowTop >= (popupTop + roundedCornerMargin)) && (arrowBottom <= (popupTop + contentHeight - roundedCornerMargin))) {
                dojo.style(this.arrowPopupNode, "visibility", "visible");
            }
            else {
                dojo.style(this.arrowPopupNode, "visibility", "hidden");
            }
        },
        _setDialogTopPosition: function (isInitial) {
            var popupNode = this._getMasterPopup().domNode;
            var bodyY = Math.abs(dojo.position(dojo.body()).y);
            var maxY = this.maxY;

            if (!resizingEnabled) {
                if (bodyY > maxY) {
                    if ((dojo.style(popupNode, "position") !== "fixed") || isInitial) {
                        dojo.style(popupNode, {
                            "top": this.topMargin + "px",
                            "position": "fixed"
                        });
                    }
                }
                else {
                    if ((bodyY + this.topMargin) >= maxY) {
                        //slowly transition from one scenario to another
                        dojo.style(popupNode, {
                            "top": this.topMargin + "px",
                            "position": "fixed"
                        });
                    }
                    else {
                        if ((dojo.style(popupNode, "position") !== "absolute") || isInitial) {
                            dojo.style(popupNode, {
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
                        if ((dojo.style(popupNode, "position") !== "fixed") || (dojo.style(popupNode, "top") !== (this.topMargin + "px")) || isInitial) {
                            dojo.style(popupNode, {
                                "top": this.topMargin + "px",
                                "position": "fixed"
                            });
                        }
                    }
                    // Case II - Window is positioned near the top
                    else {
                        if ((dojo.style(popupNode, "position") !== "absolute") || (dojo.style(popupNode, "top") !== (maxY + "px")) || isInitial) {
                            dojo.style(popupNode, {
                                "top": maxY + "px",
                                "position": "absolute"
                            });
                        }
                    }
                }
                else {
                    var popupHeight = Math.floor(dojo.position(popupNode).h);
                    // The vertical midpoint as calculated by _getArrowVerticalPosition is only accurate if the
                    // currentNode hasn't been replaced by its backup which is the entire activity stream or it's no longer part of the dom
                    // If that's the case, it's more accurate to simply look at the arrow node itself.
                    var verticalMidpoint = (dojo.hasClass(this.currentNode, "lotusStream") || !dojo.isDescendant(this.currentNode, dojo.body()) ?
                        Math.floor(dojo.position(this.arrowPopupNode, true).y) :
                        this._getArrowVerticalPosition()) +
                        (this.arrowHeight / 2);
                    var topPosition = verticalMidpoint - (popupHeight / 2);
                    var positionType = "absolute";
                    var maxVerticalPos = this._getWindowHeight() - (this.verticalMargin / 2);


                    // Now determine if topPosition is outside its range
                    // Case I - Window is scrolled past top starting point
                    if ((bodyY + this.topMargin) >= maxY) {
                        var windowY = topPosition - bodyY;
                        var _topMarginOfViewport = this.topMargin;
                        if ((typeof window.ICS_UI_ISCNX8UXENABLED !== 'undefined') && window.ICS_UI_ISCNX8UXENABLED) {
                            // the topMargin for cnx8 is larger as the navigation doesn't scroll out, but viewport remains small as this is the lotusFrame container
                            _topMarginOfViewport = 20;
                        }
                        // Case A - top of dialog is positioned before the top margin of the viewport
                        if (windowY <= _topMarginOfViewport) {
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

                    if ((typeof window.ICS_UI_ISCNX8UXENABLED !== 'undefined') && window.ICS_UI_ISCNX8UXENABLED) {
                        // arrow remains in position as it assumes scroll behavior is synchronized with entry node
                        // this is not the case with new scroll, so need to update this to ensure it remains centered
                        this._setArrowPosition();
                    }

                    dojo.style(popupNode, {
                        "top": topPosition + "px",
                        "position": positionType
                    });

                }
            }
        },

        displayErrorMsg: function (node, msg) {
            var div, d = dojo.doc;
            dojo.empty(node);
            div = dojo.create("div", {className: "lconnEmpty", role: "alert"}, node);
            div.appendChild(d.createTextNode(msg));
        },

        destroy: function () {
            if (this.arrowPopupNode) {
                // Restore the arrow to the location it was before enclosing it
                if (this.arrowPopupNode.firstChild) {
                    dojo.place(this.arrowPopupNode.firstChild, this.previousArrowParent);
                }
                dojo.destroy(this.arrowPopupNode);
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

                com.ibm.social.incontext.util.html.promptContentChangedDialog(confirmCloseCallback);
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
            this.orientation = dojo._isBodyLtr() ? 'R' : 'L';
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
            this.arrowWidth = dojo.style(arrowNode, "width");
            this.arrowHeight = dojo.style(arrowNode, "height");

            // Remove any positioning on the internal arrow node
            dojo.style(arrowNode, { top: 0, bottom: "auto" });


            // Get the width of popup
            var paddingNode = this.content ? this.content.parentNode : null,
                horizontalPadding = paddingNode ? dojo.style(paddingNode, "paddingRight") + dojo.style(paddingNode, "paddingLeft") : 0;
            this.popupWidth = com.ibm.social.ee.config.gadgetParams.width + horizontalPadding;

            // Get lotusMain
            if (!this.lotusMain) {
                this.lotusMain = this.getMainNodeForPage();
            }

            // Set rtl flag
            this.isRTL = !dojo._isBodyLtr();
        },
        getMainNodeForPage: function () {
            var lotusMainNode = dojo.query("div.lotusMain")[0];
            if (!lotusMainNode) {
                lotusMainNode = dojo.byId("lotusMain");
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
            dojo.style(this._presentation.msgNode, "display", "none");
            if (this.arrowPopupNode) {
                dojo.style(this.arrowPopupNode, "visibility", "hidden");
            }
            this.allowArrowDisplay = false;
        },
        onOpen: function () {
            this.inherited(arguments);
            this.allowArrowDisplay = true;

            //Adding a deferred here that will resolve when the onClose method is fired
            this.onCloseDeferred = new dojo.Deferred();
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

            com.ibm.social.ee.util.misc.addMessageToNewWindowLinks();

            this._firstResize = true;
            
            if(this._presentation){
            	   focus = this._presentation.metaCloseInput;
                   dijit.focus(focus); 
            }
         
        },
        next: function () {
            this.inherited(arguments);
            if (dojo.style(this._presentation.nextNode, "display") !== "none") {
                this._presentation.nextNode.focus();
            }
            else {
                this._presentation.prevNode.focus();
            }
        },
        previous: function () {
            this.inherited(arguments);
            if (dojo.style(this._presentation.prevNode, "display") !== "none") {
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
            if (this._target && !dojo.isDescendant(this._target, dojo.body()) && this._backupTarget) {
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
                dojo.query("iframe", this._presentation.contentNode).style("height", isNaN(height) ? height : height + "px");
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

    dojo.declare("com.ibm.oneui.controls.EEPreviewDialogPresentation", com.ibm.oneui.controls.FlyoutDialogPresentation, {
        eeStrings: null,
        templatePath: dojo.moduleUrl("com.ibm.social.ee", "controls/templates/EEPreviewDialog.html"),
        commonStrings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").common,
        title: "", /* We need to override dijit's behavior of setting the widget title to " " or a blank tooltip shows up in IE */
        adhocEventTitles: {},
        MAX_LINK_LENGTH: 25,
        postCreate: function () {
            this.inherited(arguments);
            /*
             if (!dojo.isIE)
             this.scrollNode.style.margin = "1px";
             */
            var top = dojo.create("a", {role: "button", className: "backTopHidden", href: "javascript:;",
                "aria-hidden": "true", tabindex: 0}, this.wrapper);
            dojo.style(top, { top: "-9999px", position: "absolute" });
            top.appendChild(dojo.doc.createTextNode(this.messages.goBack));
            dojo.connect(top, "onfocus", this, "backToTop");
            
            var bottom = dojo.create("a", {role: "button", className: "backBottomHidden", href: "javascript:;",
                "aria-hidden": "true", tabindex: 0}, this.wrapper, "first");
            dojo.style(bottom, { top: "-9999px", position: "absolute" });
            dojo.connect(bottom, "onfocus", this, "backToBottom");
               
            this.createAdhocTitleMapping();

            if(lconn.core.config.features(com.ibm.social.ee.util.misc.CONNECTIONS_TOOLTIP_GK)){
            	// setup aria tooltips
        		this._setupTooltips();	
            }
        },

    	/**
    	 * Sets up aria tooltips for acessibility.
    	 */
    	_setupTooltips: function(){
    		
    		//EE close button
    		var closeBtn = dojo.query(".lotusBtnImg.lotusClose", this.domNode)[0];
    		this._setupTooltip(closeBtn, this.messages.close);
    	},
    	
    	/**
    	 * Sets up an aria tooltip for accessibility.
    	 * @param {DOM element} - the element to attach the tooltip
    	 * @param {string} - the string to show in the tooltip
    	 * 
    	 * @returns {djit.Tooltip} the tooltip
    	 */
    	_setupTooltip: function(element, label){
    		if(element){
    			return new com.ibm.social.incontext.widget.Tooltip({
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
            dojo.attr(this.titleNode, "title", plainTitle);
            dojo.attr(this.titleNode, "aria-label", plainTitle);
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
            var isUserExternal = lconn.core.auth.getUser() && lconn.core.auth.getUser().isExternal;

            if (isUserExternal){
                popupTitle = com.ibm.social.incontext.util.html.removeProfileLinks(popupTitle);
            }

            if (eventType && this.adhocEventTitles[eventType] && verb !== "bump") {
                dojo.empty(this.titleNode);
                var user = this._formatUserName(actor);
                var suTitle = dojo.string.substitute(this.adhocEventTitles[eventType], {author: user});
                this.titleNode.innerHTML = suTitle;
                /*
                 on standalone status updates the news item plainTitle isn't the same of the EE one, so let's build the
                 plainTitle here too
                 */
                var userName = actor.displayName;
                if (userName) {
                    plainTitle = dojo.string.substitute(this.adhocEventTitles[eventType], {author: userName});
                    this._setAriaStringsOnTitleNode(plainTitle);
                }
            }
            else {
                if (url) {
                    dojo.empty(this.titleNode);
                    var a = dojo.create("a", {href: url, title: popupTitle || "", target: "_blank", className: "bidiAware"}, this.titleNode);
                    a.appendChild(dojo.doc.createTextNode(popupTitle || ""));
                }
                else {
                    dojo.empty(this.titleNode);
                    var util = com.ibm.social.incontext.util;
                    this.titleNode.innerHTML = popupTitle;
                    util.text.breakStringHTML(this.titleNode);
                    //Force ee links in popupTitle to have a target of _blank.
                    var self = this;
                    dojo.query("a", this.titleNode).forEach(function (node) {
                        node.target = "_blank";
                        dojo.removeClass(node, "entry");
                        if (!dojo.hasClass(node.parentNode, "vcard")) {
                            var nodeTitle = util.html.htmlText(node);
                            var txt = dojox.html.entities.encode(nodeTitle);
                            if (txt) {
                                node.title = self.eeStrings.OPEN_LINK ? dojo.string.substitute(self.eeStrings.OPEN_LINK, {title: nodeTitle}) : nodeTitle;
                                txt = util.text.trimToLength(txt, self.MAX_LINK_LENGTH);
                                node.innerHTML = txt;
                            }
                        }
                    });

                    dojo.query("span", this.titleNode).forEach(function (node) {
                        dojo.removeClass(node, "profiles entry");
                    });
                }
            }
            // Bidi support
            lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.wrapper);
        },
        _formatUserName: function (user) {
            var div = dojo.create("div"), a, span;
            span = dojo.create("span", {className: "vcard"}, div);
            span.appendChild(dojo.doc.createTextNode(user.displayName));
            if (com.ibm.lconn.layout.people.createLink) {
                a = com.ibm.lconn.layout.people.createLink({userid: com.ibm.social.ee.util.misc.getItemId(user.id),
                    state: user.state, name: user.displayName, email: user.email});
                if (a) {
                    dojo.removeAttr(a, "aria-describedby");
                    dojo.addClass(a, "eeActionLinks");
                    dojo.attr(a, "target", "_blank");
                    dojo.attr(a, "title", dojo.string.substitute(this.commonStrings.PERSON_TITLE, {user: user.displayName}));
                    dojo.empty(span);
                    span.appendChild(a);
                }
            }
            return div.innerHTML;
        },
        setTime: function (time, isUpdated) {
            dojo.empty(this.timeNode);
            var strings = (isUpdated === "false") ? this.messages.timestamp.created : this.messages.timestamp.updated;
            var date = com.ibm.social.incontext.util.misc.date.convertAtomDate(time);
            var timeStr = new com.ibm.social.incontext.util.DateFormat(date).formatByAge(strings);
            var span = dojo.create("span", {}, this.timeNode);
            span.appendChild(dojo.doc.createTextNode(timeStr));
            dojo.style(this.timeNode, "display", "");
            dojo.style(this.timeNode, "borderLeftStyle", "");
        },
        hideTime: function () {
            dojo.html.set(this.timeNode, "&nbsp;");
            dojo.style(this.timeNode, "borderLeftStyle", "none");
        },
        setItem: function (item) {
            this.item = item;
        },
        backToTop: function (e) {
            this.focusFirstLink();
            return;
            //move to first element if user presses tab, enter, or space.  Don't active code if it's a shift + tab (moving backward)
            //if(((e.keyCode == dojo.keys.ENTER) || (e.keyCode == dojo.keys.TAB) || (e.keyCode == dojo.keys.SPACE)) && !((e.keyCode == dojo.keys.TAB) && e.shiftKey))
            //this.focusFirstLink();
        },
        backToBottom: function (e) {
            document.querySelector("iframe[onload*=ConnectionsEE]").contentWindow.document.querySelector("a[dojoattachevent*=\"onclick:cancelCreate\"]").focus();            
        },
        loading: function (setTitle) {
            if (setTitle) {
                this.setTitle(this.eeStrings.LOADING);
            }
            dojo.empty(this.contentNode);
            dojo.addClass(this.contentNode, "lotusFlyoutInner");
            com.ibm.social.incontext.util.html.showLoading(this.contentNode);
        },
        focusFirstLink: function (el) {
            var origLinks = dojo.query("a", el ? el : this.domNode);
            var visibleLinks = [];
            dojo.forEach(origLinks, function (link, i) {
                // visible title links should only be profile links
                if (dojo.style(link, "display") !== "none" && !dojo.hasClass(link, "lotusAltText") && !dojo.hasClass(link, "backTopHidden") && dojo.hasClass(link, "fn")) {
                    visibleLinks.push(link);
                }
            });
            var focus = null;
            if (visibleLinks.length > 0) {
                focus = visibleLinks[0];
                dijit.focus(focus);
            }
            else {
                focus = this.metaCloseInput;
                dijit.focus(focus);  //if there are no links in the title, then focus on the close button
            }
            this._firstFocusItem = focus;
        }
    });

// Determine the current auth user for metrics purposes
    com.ibm.social.ee.controls.EEPreviewDialog.findCurrentAuthUser = function () {
        var user = null;
        if (dojo.getObject("lconn.homepage.global")) {
            if (dojo.isFunction(dojo.getObject("lconn.homepage.global.getUserId"))) {
                user = { id: lconn.homepage.global.getUserId(), name: dojo.getObject("lconn.homepage.userName") };
            }
        }
        else if (dojo.getObject("widgetUserInfo")) {
            user = { id: dojo.getObject("widgetUserInfo.userId"), name: dojo.getObject("widgetUserInfo.displayName") };
        }
        else if (dojo.getObject("profilesData.loggedInUser")) {
            user = { id: dojo.getObject("currentUserGuid"), name: dojo.getObject("profilesData.loggedInUser.displayName") };
        }
        return user;
    };

    com.ibm.social.ee.controls.EEPreviewDialog.setupActivityStreamNotification = function (container, dialog) {
        if (!com.ibm.social.ee.controls.EEPreviewDialog._notificationInitialized) {
            container.getCommonContainer().then(function (cc) {
                dojo.subscribe("com/ibm/social/ee/event/updateActivityEntry", function (objectId, timestamp) {
                    if (dojo.isDescendant(dialog._target, document.body)) {
                        dialog._backupTarget = dialog._target.parentNode;
                    }
                    dialog._suspendValidation = true;
                    var args = [ objectId ];
                    if (timestamp) {
                        args.push(timestamp);
                    }
                    dojo.publish("com/ibm/social/as/event/addactivityentry", args);
                });
                dojo.subscribe("com/ibm/social/ee/event/closePopup", function () {
                    if (dojo.isDescendant(dialog._target, document.body)) {
                        dialog.close();
                    }
                });
                dojo.subscribe("com/ibm/social/ee/event/setDirty", function (modified) {
                    dialog.modified = modified;
                });
                dojo.subscribe("com/ibm/social/ee/event/scrollTop", function () {
                    window.setTimeout(function () {
                        dialog.scrollTop();
                    }, 0);
                });
                dojo.subscribe("com/ibm/social/ee/event/scrollBottom", function () {
                    window.setTimeout(function () {
                        dialog.scrollBottom();
                    }, 0);
                });
                com.ibm.social.ee.controls.EEPreviewDialog._notificationInitialized = true;
            });

        }
    };

})();
