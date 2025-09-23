/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/_base/window",
      "dojo/dom-attr",
      "dojo/dom-class",
      "dojo/dom-construct",
      "dojo/dom-geometry",
      "dojo/has",
      "dojo/query",
      "dojo/topic",
      "dijit/dijit",
      "dijit/Dialog",
      "dojox/uuid",
      "dojox/uuid/generateRandomUuid",
      "./_NavigationHandler",
      "ic-core/auth",
      "ic-core/config/services",
      "ic-core/globalization/api",
      "ic-core/header",
      "ic-core/url",
      "ic-gadget/container/Topics",
      "ic-gadget/container/iContainer2"
],
   function(dojo, declare, lang, windowModule, domAttr, domClass, domConstruct, domGeometry, has, query, topic, dijitModule, Dialog, uuid, generateRandomUuid, _NavigationHandler, auth, services, api, header, url, Topics, iContainer2Module) {

      var NavigationHandler;

      function extend(destination, source) {
         for ( var k in source) {
            if (source.hasOwnProperty(k)) {
               destination[k] = source[k];
            }
         }
         return destination;
      }

      declare("com.ibm.lconn.socialmail.gadget.NavigationHandler", null, {

         constructor : function() {
            if (!NavigationHandler) {
               // Initialized only once

               function Custom() {}
               ;
               Custom.prototype = new _NavigationHandler();

               var customData = {
                  // fields required by the superclass
                  idMailListItem : 'lotusBannerMail',
                  // id mail list item of the header
                  idCalendarListItem : 'lotusBannerCalendar',
                  // id calendar list item of the header
                  idMailLoadingSpinner : 'os-site-mail-hover-loading',
                  // id mail dropdown of the container (with the loading
                  // spinner)
                  idCalendarLoadingSpinner : 'os-site-calendar-hover-loading',
                  // id mail dropdown of the container (with the loading
                  // spinner)
                  classBadge : 'os-site-mail-notify',
                  // class of the badge, required as the id is generated
                  // dynamically (the badge is already on the page)
                  classMailDropdown : 'os-site-mail-hover',
                  // class of the mail dropdown, required as it's set during the
                  // creation of the gadget site (dropdown div)
                  classCalendarDropdown : 'os-site-calendar-hover',
                  // class of the calendar dropdown, required as it's set during
                  // the creation of the gadget site (dropdown div)
                  classDisplayNone : 'dijitDisplayNone',
                  // class to set display none

                  // fields NOT required by the superclass (used internally)
                  topics : [],
                  classHidden : 'dijitHidden',
                  // class to set hidden the title node of the lightbox
                  classLightboxContainer : 'cm-preview-site-container',
                  // class of the container div, which include the 2 divs:
                  // standard message and embedded experience
                  classLightboxMessage : 'os-site os-site-mail-hover-preview-messages',
                  // class of the standard message div
                  classLightboxMessageEE : 'os-site os-site-mail-hover-preview-messages-ee',
                  // class of the embedded experience div
                  classLightboxDialog : 'mailMessageDialog',
                  // class of the dijit.Dialog of the lightbox
                  classCloseIconLightboxRtl : 'dijitDialogRtl',
                  // class of the close icon right-to-left (BiDi)

                  // methods required by the superclass
                  generateSuffixToSiteIdsOnHeader : function() {
                     // method which generate dynamically the suffix used for
                     // the gadget sites
                     // Security identifier
                     this.dynamicSiteIdSuffix = generateRandomUuid();

                     // Object which maps all the gadget site IDs
                     this.gadgetIDs = {
                        badge : "os-site-mail-notify" + this.dynamicSiteIdSuffix,
                        inbox : "os-site-mail-hover" + this.dynamicSiteIdSuffix,
                        calendar : "os-site-calendar-hover" + this.dynamicSiteIdSuffix,
                        message : "os-site-mail-hover-preview-messages" + this.dynamicSiteIdSuffix,
                        messageEE : "os-site-mail-hover-preview-messages-ee" + this.dynamicSiteIdSuffix
                     };
                  },

                  loadContainerDropdown : function(menuItem, event) {
                     // menuItem is the anchor element placed in the related
                     // list item (mail or calendar)
                     if (event.type === 'mouseover')
                        header.menuMouseover(menuItem);
                     else if (event.type === 'click')
                        header.menuClick(menuItem);
                     else if (event.type === 'focus')
                        header.menuFocus(menuItem);
                  },

                  getDropdownContainerId : function(menuItem) {
                     // menuItem is the anchor element placed in the related
                     // list item (mail or calendar)
                     return domAttr.get(menuItem, "_lconn_menuid");
                     // returns 'lconnheadermenu-mail' or
                     // 'lconnheadermenu-calendar'
                  },

                  getServiceUrl : function() {
                     var serviceUrl = null;
                     var mailSvc = services.connectionsmail;
                     if (mailSvc) {
                        serviceUrl = url.getServiceUrl(mailSvc);
                     }
                     return serviceUrl;
                  },

                  getUrlParameter : function(locationHref, urlParameter) {
                     // "parse" method returns an object with queryParameters
                     return url.parse(locationHref).queryParameters[urlParameter];
                  },

                  initContainer : function() {
                     var iContainer2 = lang.getObject('com.ibm.lconn.gadget.container.iContainer2');
                     if (iContainer2)
                        iContainer2.init();
                     return iContainer2;
                  },

                  addLoginLogoutHandlers : function() {
                     // Login handler is needed when session is expired and we
                     // are presented with Login window
                     auth.addLoginHandler(cre$.util.hitch(this, this.clearCache));
                     // Logout handler to be called when some Logout link is
                     // pressed
                     auth.addLogoutHandler(cre$.util.hitch(this, this.clearCache));
                  },

                  addAttribute : function(node, attribute, value) {
                     // set/update an attribute of a DOM element, required as we
                     // add the dynamically generated id to the badge gadget
                     // site
                     return domAttr.set(node, attribute, value);
                  },
                  removeAttribute : function(node, attribute) {
                     return dojo.removeAttr(node, attribute);
                  },

                  hasClass : function(node, className) {
                     return domClass.contains(node, className);
                  },

                  addClass : function(node, className) {
                     domClass.add(node, className);
                  },

                  getUserPrefs : function() {
                     return {
                        calendar : api.getCalendar(),
                        textDirection : api.getTextDirection(),
                        bidiEnabled : api.isBidiEnabled()
                     };
                  },

                  generateMessageSite : function() {
                     this.messageSite = new dijit.layout.ContentPane({
                        content : '<div class="' + this.classLightboxContainer + '">' + '<div id="' + this.gadgetIDs.message + '" class="'
                              + this.classLightboxMessage + '"></div>' + '<div id="' + this.gadgetIDs.messageEE + '" class="' + this.classLightboxMessageEE
                              + '"></div>' + '</div>'
                     });
                  },

                  generateMessageDialog : function() {
                     this.messageDialog = new Dialog({
                        content : this.messageSite,
                        draggable : false
                     });
                     this.addClass(this.messageDialog.domNode, this.classLightboxDialog);

                     // add role to close button
                     this.messageDialog.closeButtonNode && this.messageDialog.closeButtonNode.setAttribute("role", "button");

                     var self = this;
                     // override the dialog hide method
                     var oldHide = this.messageDialog.hide;
                     this.messageDialog.hide = function() {
                        if (!this.closeConfirmed) {
                           // call to the gadget to handle close
                           self.handleCloseDocument();
                           return;
                        }
                        oldHide.apply(this, arguments);
                     };

                     // override the dialog _size method
                     var minHeight = 520, minWidth = 740;
                     this.messageDialog._singleChild = true;

                     this.messageDialog._size = function() {
                        if (this._singleChild) {
                           if (this._singleChildOriginalStyle) {
                              this._singleChild.domNode.style.cssText = this._singleChildOriginalStyle;
                           }
                           delete this._singleChildOriginalStyle;
                        }
                        else {
                           this.containerNode.style.width = 'auto';
                           this.containerNode.style.height = 'auto';
                        }

                        var bb = domGeometry.position(this.containerNode);
                        var viewport = dijit.getViewport();
                        if (bb.w >= viewport.w || bb.h >= viewport.h) {
                           var w = Math.min(bb.w, Math.floor(viewport.w * 0.75)), h = Math.min(bb.h, Math.floor(viewport.h * 0.75));

                           // Minimum size of dialog pane
                           w = w < minWidth ? minWidth : w;
                           h = h < minHeight ? minHeight : h;

                           if (this._singleChild && this._singleChild.resize) {
                              this._singleChildOriginalStyle = this._singleChild.domNode.style.cssText;
                              this._singleChild.resize({
                                 w : w,
                                 h : h
                              });
                           }
                           else {
                              this.containerNode.style.width = w + 'px';
                              this.containerNode.style.height = h + 'px';
                              this.containerNode.style.overflow = 'auto';
                              this.containerNode.style.position = 'relative';
                              // workaround IE bug moving scrollbar or dragging
                              // dialog
                           }
                        }
                        else {
                           if (this._singleChild && this._singleChild.resize) {
                              this._singleChild.resize();
                           }
                        }
                     };

                     // override the dialog _position method
                     this.messageDialog._position = function() {
                        if (!domClass.contains(windowModule.body(), 'dojoMove')) {
                           // don't do anything if called during auto-scroll
                           var node = this.domNode;
                           var viewport = dijit.getViewport();
                           p = this._relativePosition, bb = p ? null : domGeometry.position(node), l = Math.floor(viewport.l
                                 + (p ? p.x : (viewport.w - bb.w) / 2)), t = Math.floor(viewport.t + (p ? p.y : (viewport.h - bb.h) / 2));
                           l = l > 0 ? l : 5;
                           t = t > 0 ? t : 5;

                           // If the viewport height is smaller than the
                           // lightbox height, then don't reposition height.
                           if (t > viewport.t) {
                              node.style.top = t + 'px';
                           }
                           // If the viewport width is smaller than the lightbox
                           // width, then don't reposition width.
                           if (l > viewport.l) {
                              node.style.left = l + 'px';
                           }
                           // added code for IE in RTL direction start
                           if (!!has("ie") && !dojo._isBodyLtr() && !!dijit._underlay && !!dijit._underlay.domNode) {
                              node.style.left = Math.floor((viewport.w - bb.w) / 2) + 'px';
                              // dialog absolute position
                              dijit._underlay.domNode.style.left = '0px';
                              // be sure shaded area starts from the beginning
                              // (from right)
                           }
                           // added code for IE in RTL direction end
                        }
                     };

                  },

                  calculateBorderWidth : function(node) {
                     return (dojo.marginBox(node).h - dojo.contentBox(node).h) / 2;
                  },

                  getBadgeSpan : function() {
                     var domElements = query('.' + this.classBadge);
                     if (domElements.length > 0) {
                        return domElements[0];
                     }
                     return;
                  },

                  navigateGadgetHandlerCustomProperties : function() {
                     // TODO: could be an issue in Portal and other OneUI
                     // containers
                     this.addClass(document.getElementsByTagName('body')[0], 'lotusui30dojo');
                  },

                  clearCache : function() {
                     // summary:
                     // Adds a callback function which should be invoked either
                     // when session has expired or during logout
                     // to cleanup any specific information presented in cache.
                     // Each gadget instance could react to such call
                     // accordingly.

                     // first handle async issues from commonContainer.then
                     var deferred = new dojo.Deferred();
                     var resolve = cre$.util.hitch(deferred, "callback");
                     var resolveTimeout = 5000;
                     this.commonContainer.then(cre$.util.hitch(this, function(cc) {
                        // // handle multiple rpc async issues
                        var promiseArray = [];
                        var cleanupService = "com.ibm.socpim.rpc.cleanup";
                        var areas = [
                              "badge",
                              "inbox",
                              "calendar",
                              "message"
                        ];

                        cre$.util.forEach(areas, cre$.util.hitch(this, function(area, index) {
                           if (index == 0 && this.notifySite || index == 1 && this.inboxSite || index == 2 && this.calendarSite || index == 3
                                 && this.messageSite) {
                              var promise = new lconn.core.util.LCDeferred();
                              promiseArray.push(promise);
                              var site = this.getSiteFromArea(cc, area);
                              this.debugRpc && console.log("calling " + cleanupService + ": " + area);
                              site.rpcCall(cleanupService, cre$.util.hitch(promise, "resolve"), site);
                           }
                        }));
                        // only resolve once all rpc calls return
                        new lconn.core.util.LCDeferredList(promiseArray).then(resolve, resolve);
                     }), resolve);
                     setTimeout(resolve, resolveTimeout);
                     // resolve after 5sec in case of problem, so logout
                     // navigation completes
                     return deferred;
                  },

                  startupSettings : function() {
                     // used once the CommonContainer (cc) is loaded
                     // In Connections container we use Topics to set the
                     // related callbacks
                     // https://w3-connections.ibm.com/wikis/home?lang=en#/wiki/Lotus%20Connections%202.5/page/gadget%20Lifecycle%20Events

                     // setting callback function when "gadgets.window.setTitle"
                     // is called in the lightbox. See
                     // "socmail/bootstrap/document.js"
                     var setTitleDocumentTopic = Topics.getSiteTopic(this.gadgetIDs.message, Topics.GadgetWindow.SITE_TOPIC_SET_TITLE);
                     this.topics.push(topic.subscribe(setTitleDocumentTopic, cre$.util.hitch(this, function() {
                        this.updateDialogTitle(arguments[0] ? arguments[0] : arguments);
                     })));
                     // setting callback function when
                     // "gadgets.window.adjustHeight" is called in the mail
                     // dropdown. See "socmail/bootstrap/MailViewStandalone.js".
                     var adjustHeightInboxTopic = Topics.getSiteTopic(this.gadgetIDs.inbox, Topics.GadgetWindow.AFTER_ADJUST_HEIGHT);
                     this.topics.push(topic.subscribe(adjustHeightInboxTopic, cre$.util.hitch(this, function() {
                        this.setDropDownHeight(this.getPane('inbox'), arguments, "inbox");
                     })));
                     // setting callback function when
                     // "gadgets.window.adjustHeight" is called in the calendar
                     // dropdown. See
                     // "socmail/bootstrap/CalendarViewStandalone.js".
                     var adjustHeightCalendarTopic = Topics.getSiteTopic(this.gadgetIDs.calendar, Topics.GadgetWindow.AFTER_ADJUST_HEIGHT);
                     this.topics.push(topic.subscribe(adjustHeightCalendarTopic, cre$.util.hitch(this, function() {
                        this.setDropDownHeight(this.getPane("calendar"), arguments, "calendar");
                     })));
                  },

                  onMessageOpen : function(id, selections) {
                     this.closeCurrentSite();
                     // close the dropdown
                     // SM Defect 28065: Set "closeConfirmed" to false so that
                     // we can always clean-up the conainer when closing the
                     // light box.
                     this.messageDialog.closeConfirmed = false;
                     this.messageDialog.domNode.style.visibility = "";
                     this.messageDialog.show();
                  },

                  onMessageClose : function(id, selections) {
                     this.messageDialog.closeConfirmed = true;
                     this.messageDialog.hide();
                  },

                  onMessageCompose : function(id, selections) {
                     this.inboxSite.onClose();
                     this.messageDialog.closeConfirmed = false;
                     this.messageDialog.domNode.style.visibility = "";
                     this.messageDialog.show();
                  },

                  generateGadgetSite : function(options) {
                     // create the gadget site for the dropdown (mail or
                     // calendar)
                     return new dijit.layout.ContentPane(options);
                  },

                  showSiteContent : function(siteId) {
                     // Show the <iframe> for the specified site
                     var node = document.getElementById(siteId);
                     if (node) {
                        var iframe = node.getElementsByTagName("iframe")[0];
                        if (iframe) {
                           iframe.style.visibility = "";
                        }
                     }
                  },

                  hideInboxWhileLoading : function() {
                     // Hide <iframe> for gadget until bootstrap code in gadget
                     // finishes
                     var iframe = this.inboxSite && this.inboxSite.containerNode.getElementsByTagName("iframe")[0];
                     if (iframe)
                        iframe.style.visibility = "hidden";
                  },

                  hideCalendarWhileLoading : function() {
                     // Hide <iframe> for gadget until bootstrap code in gadget
                     // finishes
                     var iframe = this.calendarSite && this.calendarSite.containerNode.getElementsByTagName("iframe")[0];
                     if (iframe) {
                        iframe.style.visibility = "hidden";
                        // SM Defect 29053: [IE] Display extra white area in
                        // calendar dropdown
                        iframe.allowTransparency = "true";
                     }
                  },
                  hideLightboxWhileLoading : function() {
                     // Hide <iframe> for gadget until bootstrap code in gadget
                     // finishes
                     var iframe = this.messageSite && this.messageSite.containerNode.getElementsByTagName("iframe")[0];
                     if (iframe) {
                        iframe.style.visibility = "hidden";
                        domConstruct.place('<table id="' + (this.messageSite.progressId = 'messageSiteProgress')
                              + '" border="0" cellspacing="0" cellpadding="0"><tr><td>&nbsp;</td></tr></table>', iframe, "before");
                     }
                  },

                  setBadgeAccessibilityAttributes : function() {
                     // Add accessibility attributes to the iframe of the badge
                     // gadget site
                     var iframe = this.notifySite && this.notifySite.el_.firstChild;
                     if (iframe) {
                        iframe.setAttribute("title", "Unread messages");
                        iframe.setAttribute("tabindex", "-1");
                        iframe.setAttribute("role", "presentation");
                     }
                  },

                  showDialog : function() {
                     // show the message dialog and set accessibility attributes

                     // Remove aria-labelledby and update role for A11y
                     this.removeAttribute(this.messageDialog.domNode, "aria-labelledby");
                     this.addAttribute(this.messageSite.domNode, "role", "dialog");
                     // Defect 39277: CSS change for fixing blank page issue in
                     // IE
                     if (this.isIE()) {
                        this.messageDialog.containerNode.style.overflowY = 'auto';
                     }
                     this.messageDialog.domNode.style.visibility = "";
                     this.messageDialog.show();
                     if (dijit._underlay && dijit._underlay.bgIframe && dijit._underlay.bgIframe.iframe) {
                        var iframe = dijit._underlay.bgIframe.iframe;
                        iframe.setAttribute("role", "presentation");
                        iframe.setAttribute("title", "Background");
                        iframe.contentWindow.document.write("<html><head><title>Background</title></head><body></body></html>");
                     }
                     // workaround to hide the title Node
                     if (this.messageDialog.titleNode) {
                        this.addClass(this.messageDialog.titleNode, this.classHidden);
                     }
                  },

                  updateDialogTitle : function(/* String */pageTitle) {
                     // updates the dialog (message/event) title and its
                     // accessibility attributes (lightbox)

                     // pageTitle: String
                     // The text which will appear as title

                     // Modify dialog attributes for A11y
                     if (!!this.messageDialog && !!this.messageSite && !!pageTitle) {
                        // Set title and aria-label for corresponding nodes

                        // The message dialog domNode (i.e. div with
                        // id="dijit_Dialog_{id})
                        this.addAttribute(this.messageDialog.domNode, "title", pageTitle);
                        this.addAttribute(this.messageDialog.domNode, "aria-label", pageTitle);

                        // handle the close icon location in ICM dialogs
                        if (document.documentElement.dir === 'rtl')
                           this.addClass(this.messageDialog.domNode, this.classCloseIconLightboxRtl);

                        // The message site domNode (i.e. div with
                        // id="dijit_layout_ContentPane_{id}").
                        this.addAttribute(this.messageSite.domNode, "title", pageTitle);
                        this.addAttribute(this.messageSite.domNode, "aria-label", pageTitle);

                        // The message dialog iframe
                        var iframe = this.messageDialog.containerNode.getElementsByTagName("iframe")[0];
                        if (iframe)
                           this.addAttribute(iframe, "title", pageTitle);
                     }
                  },

                  updateWarning : function(site) {
                     // a11y - warning dropdown - JAWS require a
                     // removal+addition of the DOM element to inform the user
                     // of the alert
                     var iFrameWarning = site.domNode.getElementsByTagName("iframe")[0];
                     var divWarning = iFrameWarning.contentWindow.document.getElementById('warningMsgDropdown');
                     if (divWarning) {
                        this.removeAttribute(divWarning, "role");
                        var divWarningContent = divWarning.innerHTML;
                        domConstruct.empty(divWarning);
                        dojo.html.set(divWarning, divWarningContent);
                        this.addAttribute(divWarning, "role", "alert");
                     }
                  },

                  // extra RPC calls callbacks which may include
                  // container-specific js/DOM references (ie.
                  // gadgetSiteObject.onClose)
                  extraRpcCalls : function(rpcData) {

                     if (rpcData.type == "com.ibm.socpim.MailDropDown") {
                        if (rpcData.dataObject == "hidden" && this.hoverLoaded.inbox) {
                           this.inboxSite.onClose(true);
                           // close and set the focus back on header's Mail when
                           // ESC is pressed
                        }
                     }
                     else if (rpcData.type == "com.ibm.socpim.CalendarDropDown") {
                        if (rpcData.dataObject == "hidden" && this.hoverLoaded.calendar) {
                           this.calendarSite.onClose(true);
                           // close and set the focus back on header's Calendar
                           // when ESC is pressed
                        }
                     }

                     // NO MORE USED RPC CALLS
                     // /* compatibility ICM 1.0 FP1 (10-oct-12) - START *
                     if (rpcData.type == "com.ibm.socpim.calendarview.height") {
                        this.setDropDownHeight(this.getPane("calendar"), rpcData.dataObject, "calendar");
                     }
                     else if (rpcData.type == "com.ibm.socpim.messagelist.height") {
                        this.setDropDownHeight(this.getPane('inbox'), rpcData.dataObject, "inbox");
                     }
                     else if (rpcData.type == "com.ibm.socpim.a11y.dialog") {
                        if (!!rpcData.dataObject && rpcData.dataObject["name"] == "pageTitle") {
                           this.updateDialogTitle(rpcData.dataObject["value"]);
                        }
                     }
                     // /* compatibility ICM 1.0 FP1 (10-oct-12) - END *
                  },

                  verifyVisibility : function(rpcDataObject) {

                     var pane = this.getPane(rpcDataObject);

                     var progress = document.getElementById(pane.progressId);
                     if (progress)
                        this.addClass(progress, 'dijitDisplayNone');

                     var iframe = pane && pane.containerNode && pane.containerNode.getElementsByTagName("iframe")[0];

                     if (iframe)
                        iframe.style.visibility = '';
                  },

                  // close the current gadget site
                  closeCurrentSite : function() {
                     if (this.currentSite == 'mail') {
                        this.inboxSite.onClose();
                     }
                     else {
                        // calendar
                        this.calendarSite.onClose();
                     }
                  },

                  isIE : function() {
                     return this.hasClass(document.getElementsByTagName('body')[0].parentNode, 'dj_ie');
                  },

                  getUserId : function() {
                     return (auth.getUser() || {}).id;
                  }
               };

               extend(Custom.prototype, customData);

               NavigationHandler = new Custom();
               if (dojo.config.isDebug) {
                  NavigationHandler.isDebug = true;
               }
               NavigationHandler.initialization();

               /*
                * Dojo now (1.9+) adds scroll bars to the popup container if it
                * thinks that the popup height is greater than the viewport. We
                * don't want this behavior in ICM because we manage the scroll
                * bars ourselves within the popup. This behavior can be disabled
                * by adding maxHeight = Infinity in the popup.open args object,
                * but unfortunately, MenuLauncher provides no mechanism that we
                * can use do this so we need to resort to the hackery below.
                * 
                * Would prefer to use dojo/aspect for this, but it's not
                * available when using old style, non-AMD, dojo.require.
                */
               var oldOpen = dijit.popup.open;
               dijit.popup.open = function(args) {
                  if (args && args.popup && (args.popup.id === "lconnheadermenu-mail" || args.popup.id === "lconnheadermenu-calendar")) {
                     args.maxHeight = Infinity;
                  }
                  oldOpen.apply(this, arguments);
               };

            }
         },

         // methods used in the header.jsp
         navigateInbox : function(menuItem, event) {
            var block = (event.type === 'focus' && !lconn.core.widget.MenuLauncher.prototype.activateOnFocus);
            if (!block) {
               NavigationHandler.navigateInbox(menuItem, event);
            }
         },

         navigateCalendar : function(menuItem, event) {
            var block = (event.type === 'focus' && !lconn.core.widget.MenuLauncher.prototype.activateOnFocus);
            if (!block) {
               NavigationHandler.navigateCalendar(menuItem, event);
            }
         },

         // methods NOT required by the superclass
         destroy : function(menuItem, event) {
            for (var topic = null; topic = (NavigationHandler.topics || []).pop();) {
               topic.remove();
            }
         }
      });
      return NavigationHandler;
   });
