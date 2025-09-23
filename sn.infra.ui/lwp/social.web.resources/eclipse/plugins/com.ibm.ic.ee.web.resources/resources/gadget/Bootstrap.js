define([
	"dojo",
	"dojo/dom-construct",
	"dojo/cookie",
	"dojo/_base/array",
	"dojo/_base/window",
	"dojo/_base/dojoConfig",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-geometry",
	"dojo/has",
	"dojo/query",
	"dojo/topic",
	"ic-core/config/services",
	"ic-core/config/properties",
	"ic-core/auth",
	"ic-ee/EventRegistry",
	"ic-ee/util/OAuthHelper",
	"ic-ee/util/misc",
	"ic-eeconfig/config",
	"ic-incontext/NetworkDojo",
	"ic-incontext/NetworkOS",
	"ic-incontext/gadget/Bootstrap",
	"ic-incontext/util/auth"
], function (dojo, domConstruct, cookie, array, windowModule, dojoConfig, lang, dom, domGeometry, has, query, topic, services, properties, authCore, EventRegistry, OAuthHelper, misc, config, NetworkDojo, NetworkOS, Bootstrap, auth) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	/* globals com, console, cre$, gadgets, ibm, lconn, shindig */
	
	(function () {
	    var _bootstrap = com.ibm.social.ee.gadget.Bootstrap;
	
	    var DEFAULT = "default",
	        OAUTH_WINDOW_WIDTH = 800,
	        OAUTH_WINDOW_HEIGHT = 600,
	        OAUTH_SERVICE = "connections_service",
	        ID_WAITING_DIV = "waiting",
	        ID_NEEDAUTH_DIV = "needAuth",
	        ID_OAUTHQUEST_DIV = "oAuthQuestion",
	        ID_OAUTHQUEST_WAITING_DIV = "oAuthQuestionWait",
	        ID_GADGETBODY_DIV = "gadgetBody",
	        GADGET_DIV_IDS = [ID_WAITING_DIV, ID_NEEDAUTH_DIV, ID_GADGETBODY_DIV];
	
	    var onLoadFunc = null;
	    lang.mixin(_bootstrap, Bootstrap);
	    lang.mixin(_bootstrap, {
	        DEFAULT_TRACE: "com.ibm.social.incontext.NetworkOS~com.ibm.social.ee.widget.EELoader~com.ibm.social.ee.widget.HtmlJsonEELoader~com.ibm.social.ee.widget.AuthUserEELoader",
	        adjustHeight: function (height) {
	            gadgets.window.adjustHeight(height);
	        },
	        initializeNetwork: function (context) {
	            // Initialize network
	            var st = shindig.auth.getSecurityToken();
	            var isSmartCloud = gadgets.util.hasFeature("smartcloud3");
	
	            var isMultiTenant = properties.DeploymentModel === "MultiTenant";
	
	            //read property from open social config
	            var isAnonymousAllowedConfig = lang.getObject("com/ibm/social/eeconfig/config/isAnonymousAllowed");
	
	            var anonymousNotAllowed = isSmartCloud || isMultiTenant || !isAnonymousAllowedConfig;
	
	            // anonymous off by default
	            // anonymous may change later if we don't have a user later on this method
	            this.isAnonymous = false;
	
	            var event = context.eventType;
	            //look away now - workaround for NetworkInvite EE in SmartCloud. AS feed shows this event as being from profiles
	            //however profiles is disabled and in SmartCloud, contacts is where network invites are actioned. until SmartCloud
	            //Profiles action network invites this hack is required    
	            if(isSmartCloud && event && (event === "profiles.colleague.created" || event === "profiles.notification.notify" )){
	            	event = "generic";//enter unknown which makes registry fall back to generic EE
	            }
	            var clzStr = EventRegistry.getClass(event);
	            this.clz = lang.getObject(clzStr);
	
	            // by default useOauth will not depend on anonymous
	            // useOauth may change later if we don't have a user later on this method
	            this.useOAuth = isSmartCloud ? false : gadgets.views.getParams().useOAuth !== "false";
	            var oAuthDefaults = { };
	
	            function getHeader(header, map) {
	                if (header in map) {
	                    return map[header];
	                }
	                else if (header.toLowerCase() in map) {
	                    return map[header.toLowerCase()];
	                }
	                else {
	                    return null;
	                }
	            }
	
	            function ssoReauthDetector(text, rc, headers) {
	                console.log("rc = ", rc, ", headers = ", headers);
	                if (rc === 401 || rc === 302) {
	                    return true;
	                }
	                if (has("ie") && rc === 0) {
	                    return true;
	                }
	                // Look at the content type being returned. If text/html check the X-LConn-Auth header
	                var contentType = getHeader("Content-Type", headers);
	                var textRe = /^text\/html/;
	                if (textRe.exec(contentType) && rc >= 200 && rc < 300 && rc !== 204) {
	                    var lconnAuth = getHeader("X-LConn-Auth", headers);
	                    if (lconnAuth === "false") {
	                        return true;
	                    }
	                }
	                return false;
	            }
	
	            if (this.useOAuth) {
	                oAuthDefaults[gadgets.io.RequestParameters.OAUTH_SERVICE_NAME] = OAUTH_SERVICE;
	                oAuthDefaults[gadgets.io.RequestParameters.AUTHORIZATION] = gadgets.io.AuthorizationType.OAUTH2;
	            }
	            else {
	                //this is where to disable auth and sso
	                oAuthDefaults[gadgets.io.RequestParameters.AUTHORIZATION] = gadgets.io.AuthorizationType.SSO;
	                oAuthDefaults[gadgets.io.RequestParameters.SSO_REAUTH_DETECTOR] = ssoReauthDetector;
	            }
	
	            var networkClazz = isSmartCloud ? NetworkDojo : NetworkOS;
	
	            this.network = new networkClazz({
	                oauth: this.useOAuth,
	                anonymous: this.isAnonymous,
	                oAuthDefaults: oAuthDefaults,
	                onAuthApproval: function (oauthApprovalUrl, retryFunction, retryOpts) {
	                    var onOpen = function () {
	                        _bootstrap.showOne(GADGET_DIV_IDS, ID_WAITING_DIV);
	                    };
	                    var onClose = function () {
	                        _bootstrap.showOne(GADGET_DIV_IDS, ID_GADGETBODY_DIV);
	                        if (retryFunction) {
	                            retryFunction(retryOpts);
	                        }
	                    };
	                    var helper = OAuthHelper;
	                    array.forEach(query(".eeOAuthImg"), function (imgEl) {
	                        helper.addImgSrc(imgEl);
	                    });
	                    var authLink = helper.createAuthLink(dom.byId(ID_OAUTHQUEST_DIV));
	                    var confirmLink = helper.createAuthDoneLink(dom.byId(ID_OAUTHQUEST_WAITING_DIV));
	                    var popup = new gadgets.oauth.Popup(oauthApprovalUrl, "height=" + OAUTH_WINDOW_HEIGHT + ",width=" + OAUTH_WINDOW_WIDTH, onOpen, onClose);
	                    authLink.onclick = popup.createOpenerOnClick();
	                    confirmLink.onclick = popup.createApprovedOnClick();
	                    _bootstrap.showOne(GADGET_DIV_IDS, ID_NEEDAUTH_DIV);
	
	                    // Check + call render complete
	                    if (popup.renderComplete) {
	                        popup.renderComplete();
	                    }
	                },
	                onSSOReauth: function () {
	                    var handler = new cre$.sso.ReauthHandler().createHandlerOnClick()();
	                }
	            });
	            if (isSmartCloud) {
	                if (this.shouldUseXMethodOverride(context)) {
	                    this.network.xmethodoverride = true;
	                }
	            }
	
	            if (anonymousNotAllowed) {
	                this.network.anonymousNotAllowed = true;
	            }
	
	
	            var self = this;
	
	            /*
	             * if we dont have a user by now (eg is not in the window.currentViewer, this may not be running
	             * in a CRE environment, so lets try to fetch the user from opensocial.
	             *
	             * if at the end we dont have a user we will update the anonymous and useOauth network properties
	             */
	            var hasCurrentViewer = auth.hasCurrentViewer();
	
	            if(!hasCurrentViewer){
	                var osSvc = lconn.core.url.getServiceUrl(services["opensocial"]).uri;
	                var url = osSvc + (this.useOAuth ? "/oauth" : "" ) + "/rest/people/@me/@self";
	
	                this.network.getJson({
	                    url: url,
	                    handle: function (response) {
	                        var user = auth.parseUserFromOpensocialResponse(response);
	
	                        if(user){
	                            auth.setCurrentViewer(user);
	                        }
	
	                        self._updateAccessProperties(anonymousNotAllowed, isSmartCloud);
	                    },
	                    error:function(error) {
	                        self._updateAccessProperties(anonymousNotAllowed, isSmartCloud);
	                    }
	                });
	            }
	
	            authCore.setAuthCheck(function () {
	                return !self.isAnonymous;
	            });
	
	        },
	
	        _updateAccessProperties: function(anonymousNotAllowed, isSmartCloud){
	
	            var hasCurrentViewer = auth.hasCurrentViewer();
	
	            this.isAnonymous = anonymousNotAllowed ? false : !hasCurrentViewer;
	            this.useOAuth = isSmartCloud ? false : !this.isAnonymous && gadgets.views.getParams().useOAuth !== "false";
	
	            this.network.oauth = this.useOAuth;
	            this.network.anonymous = this.isAnonymous;
	
	            if(this.isAnonymous && this.network.oAuthDefaults) {
	                this.network.oAuthDefaults[gadgets.io.RequestParameters.OAUTH_SERVICE_NAME] = null;
	                this.network.oAuthDefaults[gadgets.io.RequestParameters.AUTHORIZATION] = null;
	                this.network.oAuthDefaults[gadgets.io.RequestParameters.AUTHORIZATION] = null;
	                this.network.oAuthDefaults[gadgets.io.RequestParameters.SSO_REAUTH_DETECTOR] = null;
	            }
	        },
	
	        shouldUseXMethodOverride: function (context) {
	            if (context && context.eventType) {
	                var evtType = context.eventType;
	                return evtType.indexOf("files.") === 0;
	            }
	            return false;
	        },
	
	        initializeKeyHandlers: function () {
	            if (gadgets.util.hasFeature("com.ibm.connections.ee")) {
	                topic.subscribe("lconn/core/mentions/startTrack", function () {
	                    com.ibm.connections.ee.preventCloseOnEscape();
	                });
	                topic.subscribe("lconn/core/mentions/stopTrack", function (e) {
	                    var escapePressed = e && e.type === "keypress" && e.charCode === 0 && e.keyCode === dojo.keys.ESCAPE;
	                    com.ibm.connections.ee.allowCloseOnEscape(escapePressed);
	                });
	                topic.subscribe("lconn/core/mentions/focus", function (tracking) {
	                    if (tracking) {
	                        com.ibm.connections.ee.preventCloseOnEscape();
	                    }
	                });
	                topic.subscribe("lconn/core/mentions/blur", function () {
	                    com.ibm.connections.ee.allowCloseOnEscape();
	                });
	            }
	        },
	        onGadgetLoaded: function (onLoadFunc) {
	            this.onSizeChange();
	            if (onLoadFunc) {
	                onLoadFunc();
	            }
	            if (dojoConfig.isDebug) {
	                console.log((new Date()).getTime() + " -- Gadget finished loading");
	            }
	        },
	        isResizingEnabled: function () {
	            if (!("resizingEnabled" in this)) {
	                var cookieName = "_eePopupResizingEnabled";
	                var resizingEnabledValue = cookie(cookieName);
	                var resizingEnabled = config.popupResizing;
	                if (resizingEnabledValue) {
	                    resizingEnabled = (resizingEnabledValue === "true");
	                }
	                this.resizingEnabled = resizingEnabled;
	            }
	            return this.resizingEnabled;
	        },
	
	        calculateHeight: function () {
	            var height = 0;
	            array.forEach(windowModule.body().childNodes, function (n) {
	
	                if (n.getBoundingClientRect) {
	                    var pos = domGeometry.position(n, true);
	                    height = Math.max(height, Math.floor(pos.y + pos.h));
	                }
	            });
	            return height;
	        },
	
	        onSizeChange: function (height) {
	
	            var maxHeight = null;
	
	            if (height && !isNaN(height)) {
	                maxHeight = this.calculateHeight();
	                this.adjustHeight(height > maxHeight ? height : maxHeight);
	            }
	            else if (has("ie") && this.isResizingEnabled()) {
	                // Get the max height of all children of body
	                maxHeight = this.calculateHeight();
	
	                var margin = has("ie") <= 8 ? 20 : 5;
	                this.adjustHeight(maxHeight + margin);
	            }
	            else {
	                this.adjustHeight();
	            }
	        },
	        onLoadGadgetComplete: function (context) {
	            // Initialize onload function -- DEBUG/PERF
	
	            onLoadFunc = function () {
	                if (context.onLoadedBody) {
	                    eval(context.onLoadedBody);
	                }
	                if (context.portletUrlSettings) {
	                    var pocUtil = new com.ibm.social.as.portlet.PortletUrlUtil(context.portletUrlSettings);
	                    pocUtil.updateEEUrls(dom.byId(ID_GADGETBODY_DIV), context);
	                    topic.subscribe("com/ibm/social/ee/data/loaded", lang.hitch(pocUtil, pocUtil.updateEEUrls, ID_GADGETBODY_DIV, context));
	                    topic.subscribe("com/ibm/social/ee/comment/afterCreated", lang.hitch(pocUtil, pocUtil.updateEEUrls, ID_GADGETBODY_DIV, context));
	                    topic.subscribe("com/ibm/social/ee/comment/afterUpdated", lang.hitch(pocUtil, pocUtil.updateEEUrls, ID_GADGETBODY_DIV, context));
	                }
	
	                misc.addMessageToNewWindowLinks();
	
	            };
	
	            var rollupUrl = null;
	            if (context.openSocial && context.openSocial.connections && context.openSocial.connections.rollupUrl) {
	                rollupUrl = context.openSocial.connections.rollupUrl;
	            }  //Change needed to get rollupUrl from 3rd party gadgets which can only be added in this attribute
	            if (rollupUrl) {
	                context.rollupUrl = rollupUrl;
	            }
	            var gadgetOpts = {
	                isGadget: true,
	                blankGif: window.djConfig.blankGif,
	                context: context,
	                onLoaded: lang.hitch(this, this.onGadgetLoaded, onLoadFunc),
	                onSizeChange: lang.hitch(this, this.onSizeChange),
	                network: this.network,
	                oauth: this.useOAuth,
	                anonymous: this.isAnonymous
	            }, clz = this.clz;
	
	            // Instantiate EE UI
	            new clz(gadgetOpts, ID_GADGETBODY_DIV);
	        },
	        setTitle: function (context) {
	            if (gadgets.util.hasFeature("settitle")) {
	                var extractText = function (el) {
	                    if (!el) {
	                        return "";
	                    }
	                    var a = [];
	                    for (var j = 0, c; c = el.childNodes[j]; j++) {
	                        if (c.nodeType === 3) {
	                            a.push(c.nodeValue);
	                        }
	                        else if (c.nodeType === 1 && c.style.display !== "none") {
	                            a.push(extractText(c));
	                        }
	                    }
	                    return a.length > 0 ? a.join("") : "";
	                };
	                if (context.eventTitle) {
	                    var node = domConstruct.create("span", { innerHTML: context.eventTitle });
	                    var titleText = extractText(node);
	                    gadgets.window.setTitle(titleText);
	                }
	            }
	        },
	        getClassesToTrace: function () {
	            var classesToTrace = config.jsTrace;
	            if (!classesToTrace) {
	                classesToTrace = this.DEFAULT_TRACE;
	            }
	            return classesToTrace;
	        },
	        getBodyClasses: function () {
	            var classes = "lotusui30 lotusui30_fonts lotusui30_layout lotusui30_body lotusui30dojo";
	            if (gadgets.views.getParams().hideBodyOverflow) {
	                classes += " eeHideBodyOverflow";
	            }
	            return classes;
	        }
	    }); // end of bootstrap object
	
	//Registering dojo listeners
	    (function () {
	        if (gadgets.util.hasFeature("ibm.connections.ee")) {
	            var ee = ibm.connections.ee;
	            topic.subscribe("com/ibm/social/ee/event/scrollTop", function () {
	                ee.scrollToTop();
	            });
	            topic.subscribe("com/ibm/social/ee/event/scrollBottom", function () {
	                ee.scrollToBottom();
	            });
	            topic.subscribe("com/ibm/social/ee/event/modified", function (entry) {
	                ee.setDirty(entry.modified);
	            });
	            topic.subscribe("com/ibm/social/ee/event/addentry", function (id, timestamp) {
	                ee.onActivityEntryUpdate(id, timestamp);
	            });
	        }
	    })();
	
	
	})(); // end of anonymous function
	
	return com.ibm.social.ee.gadget.Bootstrap;
});
