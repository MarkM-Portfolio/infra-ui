/* Copyright IBM Corp. 2005, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

define([
        "dojo",
        "dojo/_base/lang",
        "dojo/i18n!./nls/ResourceLink",
        "dojo/dom",
        "dojo/_base/declare",
        "dojo/has",
        "dojo/i18n",
        "dojo/_base/window",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojo/text!./templates/ResourceLink.html",
        "dojo/topic",
        "dijit/_Templated",
        "dijit/_Widget",
        "dojox/xml/DomParser",
        "./HoverDialog",
        "./util/html",
        "./util/ui"
],
   function(dojo, lang, i18nResourceLink, dom, declare, has, i18n, windowModule, domConstruct, domClass, template, topic, _Templated, _Widget, DomParser, HoverDialog, html, ui) {

      var CSS_RL = "lotusResourceLink";
      var CSS_ARROW = "lotusResourceLinkArrow";
      var CT_OSLC_COMPACT = "application/x-oslc-compact+xml";
      var OSLC_PREVIEW_RESIZE_PREFIX = "oslc-preview-height:";
      var VULCAN_PREVENT_CLOSE_PREFIX = "vulcan-card-can-close:";
      var XMLNS_DC_TERMS = "http://purl.org/dc/terms/";
      var XMLNS_RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
      var XMLNS_OSLC = "http://open-services.net/ns/core#";

      var _providers = [];
      var defaultLazyFetch = true;
      var resizablePreviews = true;
      var messages = i18nResourceLink;

      /*
       * For requests originating in the same domain, provide an imitation
       * postMessage behavior.
       */
      if (!window.postMessage) {
         window.onmessage = function() {}; // if we can't access the parent,
         // this will throw an exception
         window.postMessage = function(message, options, source) {
            dom.byId("output").innerHTML = "postMessage: " + message + " source.location=" + source.location;
            window.onmessage({
               data : message,
               source : source
            });
         }
      }

      /**
       * @class ic-ui.ResourceLink
       * @author Clayton Coleman <claycole@us.ibm.com>
       */
      var ResourceLink = declare("com.ibm.oneui.ResourceLink", _Widget, /** @lends ic-ui.ResourceLink.prototype */
      {

         // summary:
         // A hyperlink referencing a Jazz resource. We take the URL of the
         // link's HREF attribute to determine the resource (Work Item, Plan,
         // etc.) and then send back information to display a summary of the
         // resource when the user hovers over the link. The summaries presented
         // can have a small and large view depending on how much content the
         // user wishes to see.
         //
         // parameters:
         // uri: (String) The uri that will be used to find the available
         // presentations. The URI can be relative ("/testURI")
         // or absolute ("http://localhost/testURI"). REQUIRED if
         // the given linkNode does not have a uri attached to
         // the HREF attribute.
         // (optional) presentationUri: (String) A URL that will replace the
         // link's HREF attribute, used to send a user to a different
         // presentation of the given resource.
         // (optional) label: (String) A string or HTML snippet that will be
         // placed as the child node/inner text of the link/anchor node
         // the Resource Link will be attached to. If no srcNodeRef is
         // given, this argument is REQUIRED.
         // (optional) useAbbreviation: (boolean) If set to true, the text of
         // the
         // anchor node will be replaced with the compact rendering's
         // "jp:abbreviation" value. If none, exists then the widget will
         // look at the value of the retainLinkText. If it is false, the
         // widget will fall back to the full resource title and if it is
         // true, it will leave the link text unchanged. By default, this
         // false.
         // (optional) retainLinkText: (boolean) If set to false, the text in
         // the
         // srcNodeRef anchor node will change to the text of the compact
         // rendering's "dc:title" attribute. If set to true, the text of
         // the srcNodeRef anchor node will not change when the resource
         // link is created. By default, this parameter is set to false
         // and will change the text of the anchor node. Note, this
         // parameter is ignored if useAbbreviation is true and the compact
         // rendering document supplies a "jp:abbreviation".
         // (optional) iconNode: (DOM Node reference or id) The DOM node in the
         // page
         // to that should be used to render the icon. If an <img> node is
         // provided, the src attribute will be update on it directly. If any
         // other node is provided, an <img> tag will be created and appended
         // to it. This parameter can also be the string id of the desired
         // node.
         // (optional) lazyFetch: (boolean) If set to true, the Resource Link
         // will
         // will not fetch the compact rendering document until the user
         // hovers over the link. Also, if this option is set to true,
         // the "retainLinkText" parameter will automatically be set to true,
         // and the "iconNode" parameter will be ignored. By default,
         // this parameter is set to false, and the compact rendering document
         // will be aggressively fetched when the page loads.
         // (optional) srcNodeRef: (Anchor Node) The anchor node in the page
         // that the Resource Link will be attached to. NOTE: if the uri
         // parameter is not given, the href value of the given node
         // will be used in its place as the resource to reference.
         //
         // methods:
         //
         // refresh: if the resource that the Resource Link is viewing has
         // changed,
         // one can call this method to retrieve the new compact rendering
         // document and update the recource link hover with new data.
         //
         // usage:
         // var navLink = new com.ibm.oneui.controls.ResourceLink({}, linkNode);
         // -or-
         // var navLink = new com.ibm.oneui.controls.ResourceLink(
         // {
         // uri: "aResourceuri",
         // label: "Label for the Anchor Node"
         // });
         // -or-
         // var navLink = new com.ibm.oneui.controls.ResourceLink(
         // {
         // uri: "aResourceuri",
         // },
         // srcNodeRef);
         // -or-
         // var navLink = new com.ibm.oneui.controls.ResourceLink(
         // {
         // uri: "aResourceuri",
         // presentationUri: "anotherUrl"
         // },
         // srcNodeRef);
         // -or-
         // var navLink = new com.ibm.oneui.controls.ResourceLink(
         // {
         // uri: "aResourceuri",
         // presentationUri: "anotherUrl",
         // label: "New Label for the Anchor Node"
         // },
         // srcNodeRef);
         // -or-
         // var navLink = new com.ibm.oneui.controls.ResourceLink(
         // {
         // uri: "aResourceuri",
         // presentationUri: "anotherUrl",
         // label: "Label for the Anchor Node"
         // });
         // since:
         // 0.7

         presentationUri : null,
         useAbbreviation : false,
         retainLinkText : false,
         iconNode : null,
         lazyFetch : null,

         /**
          * Called when the compact rendering document has loaded. Will be
          * called once per successful load in the event of calls to refresh.
          */
         onLoad : function() {},

         /**
          * Returns the title of the resource from the compact rendering
          * document or null if no title is defined or the document has not been
          * loaded yet.
          */
         getTitle : function() {
            return this.popup && (this.popup.oslcCompact && this.popup.oslcCompact.title);
         },

         buildRendering : function() {
            if (!this.srcNodeRef && this.uri) {
               this.domNode = document.createElement("A");
               if (!this.label)
                  throw new Error("ResourceLink REQUIRES a label parameter if a uri is given rather than a reference to an Anchor Node.");
            }
            else if (this.srcNodeRef && this.srcNodeRef.tagName === "A") {
               this.domNode = this.srcNodeRef;
               if (!this.uri)
                  this.uri = this.domNode.href;
            }
            else
               // FIXME: disable for now
//               throw new Error("ResourceLink REQUIRES that either the uri parameter or a valid reference to an Anchor Node is given");
               return;

            if (!this.uri.match(/http(?:s)?\:\/\//)) {
               var baseUri = document.baseURI || document.URL; // document.URL
               // is used to
               // acquire the
               // base URI in IE
               this.uri = new dojo._Url(baseUri, this.uri).toString();
            }
            this.domNode.href = this.presentationUri || this.uri;
            if (this.label)
               this.domNode.innerHTML = html.removeScript(this.label);
            this._styleLink();
         },

         postCreate : function() {
            if (this.iconNode)
               this.iconNode = dom.byId(this.iconNode);
            if (this.lazyFetch || (defaultLazyFetch && this.lazyFetch !== false))
               this.lazyFetch = true;

            this.popup = new com.ibm.oneui.controls._RichHover({
               around : this.domNode,
               uri : this.uri,
               presentationUri : this.presentationUri,
               lazyFetch : this.lazyFetch,
               onDisable : lang.hitch(this, this._disable),
               onLoad : this.onLoad
            });
         },

         refresh : function() {
         // TODO: replace
         // this._registerWithAggregator(this._batchedPresentationHandler,
         // this._errorRefresh);
         },

         _styleLink : function() {
            var domNode = this.domNode;
            domClass.add(domNode, CSS_RL);
            var child = domNode.firstChild;
            if (child != domNode.lastChild || (child.nodeName != "IMG" && child.nodeName != "img")) {
               this.arrowNode = domConstruct.create("img", {
                  className : CSS_ARROW,
                  src : require.toUrl("com/ibm/oneui/controls/graphics/rh-twistie.gif")
               }, domNode);
               // domNode.appendChild(this.arrowNode);
            }
         },

         _disable : function() {
            if (!this.domNode)
               return;
            if (this.arrowNode && this.arrowNode.parentNode == this.domNode) {
               this.domNode.removeChild(this.arrowNode);
               delete this.arrowNode;
            }
            domClass.remove(this.domNode, CSS_RL);
            delete this.popup;
         },

         _applyTitle : function(title) {
            var arrowNode = this.arrowNode;
            var domNode = this.domNode;
            if (arrowNode && arrowNode.parentNode)
               arrowNode.parentNode.removeChild(arrowNode);
            domNode.innerHTML = title;
            if (arrowNode)
               domNode.appendChild(arrowNode);
         },

         destroy : function() {
            if (this.popup)
               this.popup.destroy();
            this.inherited(arguments);
         }

      });

      ResourceLink.setLazyFetch = function(bool) {
         defaultLazyFetch = bool;
      };

      ResourceLink.register = function(provider) {
         _providers.push(provider);
      };

      ResourceLink.getCompactRepresentation = function(uri, link) {
         for (var i = 0, l = _providers.length; i < l; i++) {
            var r = _providers[i](uri, link);
            if (r)
               return r;
         }
      };

      /**
       * @class ic-ui._RichHover
       * @private
       */
      declare("com.ibm.oneui.controls._RichHover",
         HoverDialog,
         /** @lends ic-ui._RichHover.prototype */
         {
            programmatic : false,
            customClass : "lotusResourceHover",

            maxHeight : 10000,

            _timesResized : 0,

            postCreate : function() {
               this.inherited(arguments);
               if (window.postMessage) {
                  this.managedConnect(window, "onmessage", this, "_onMessage");
               }
            },

            createContents : function() {
               var oslcCompact = this.oslcCompact;
               if (!oslcCompact)
                  oslcCompact = ResourceLink.getCompactRepresentation(this.uri, this.params.around);

               if (!oslcCompact) {
                  if (this.lazyFetch) {
                     this._fetchCompactRendering();
                  }
                  return domConstruct.create("div", {
                     innerHTML : messages.loading
                  });
               }
               else {
                  processOslcCompact(oslcCompact);
                  this.oslcCompact = oslcCompact;
                  return this._createPresentation(domConstruct.create("div"));
               }
            },

            onOpen : function() {
               // ADDED: if the control is repeatedly resized, open should
               // revert us back to the original size
               if (this._timesResized > 1)
                  this.dynamicSmallHeight = this.dynamicLargeHeight = 0;
               if (this._isFullDisplay === undefined)
                  this._renderResult();
            },

            onClose : function() {
               this.programmatic = false;
               this.updateToggleLink(true);
               /*
                * for (var i = 0; i < this.openListeners.length; i++)
                * this.disconnect(this._openListeners[i]);
                */
               if (this._disableOnClose)
                  this.disable();
            },

            toggleSize : function(e) {
               e.preventDefault(), e.stopPropagation();
               this.programmatic = "block";
               this.updateToggleLink(this._isFullDisplay);
               (this._isFullDisplay) ? this.displaySmallSummary() : this.displayLargeSummary();
               this.position();
            },

            updateToggleLink : function(showMore) {
               if (this._presentation) {
                  domClass.add(this._presentation.toggleLink, showMore ? "showMore" : "showLess");
                  domClass.remove(this._presentation.toggleLink, showMore ? "showLess" : "showMore");
                  this._presentation.toggleLink.innerHTML = showMore ? messages.showMore : messages.showLess;
               }
            },

            displaySmallSummary : function() {
               this._isFullDisplay = false;
               if (this.oslcCompact.smallPreview) {
                  // update the iframe dimensions early to give an accurate size
                  // for the HoverPopup.position function
                  this._updateIFrame();
                  this._presentation.hoverIframe.src = this.oslcCompact.smallPreview.document;
               }
            },

            displayLargeSummary : function() {
               this._isFullDisplay = true;
               if (this.oslcCompact.largePreview) {
                  // update the iframe dimensions early to give an accurate size
                  // for the HoverPopup.position function
                  this._updateIFrame();
                  this._presentation.hoverIframe.src = this.oslcCompact.largePreview.document;
               }
            },

            disable : function(message) {
               if (this._isOpen) {
                  this._renderError(message);
                  this._disableOnClose = true;
                  return;
               }
               if (this.onDisable)
                  this.onDisable();
               this.destroy();
            },

            _renderResult : function() {
               if (this.oauthRequired) {
                  if (this._presentation) {
                     this._presentation.destroy();
                     delete this._presentation;
                  }
                  this.content.innerHTML = "";
                  /*
                   * TODO: Replace with appropriate functionality var loginLink =
                   * com.ibm.oneui.util.internal.login.insertLoginLink(this.content,
                   * this.oauthToken); this.connect(loginLink, "onclick",
                   * dojo.hitch(this,this._fetchCompactRendering,true));
                   */
               }
               else if (this.oslcCompact) {
                  this._createPresentation();
                  if (this.oslcCompact.smallPreview)
                     this.displaySmallSummary();
                  else
                     this.displayLargeSummary();
               }
            },

            _renderError : function(message) {
               if (this._presentation) {
                  this._presentation.destroy();
                  delete this._presentation;
               }
               this.content.innerHTML = message;
            },

            setOauthRequired : function(token) {
               this.oauthRequired = true;
               this.oauthToken = token;
               this._redraw();
            },

            setOslcCompact : function(oslc) {
               this.oauthRequired = false;
               this.oslcCompact = oslc;
               if (!oslc.showHover) {
                  this.disable(messages.infoNotAvailable);
               }
               else {
                  if (window.postMessage) {
                     if (oslc.smallPreview && oslc.smallPreview.initialHeight && !this.dynamicSmallHeight)
                        this.dynamicSmallHeight = parseLength(oslc.smallPreview.initialHeight);
                     if (oslc.largePreview && oslc.largePreview.initialHeight && !this.dynamicLargeHeight && !this.dynamicSmallHeight)
                        this.dynamicLargeHeight = parseLength(oslc.largePreview.initialHeight);
                  }
                  this._updatePresentation();
                  this._redraw();
               }
            },

            _redraw : function() {
               if (this._isOpen) {
                  this._renderResult();
                  this.position();
               }
            },

            _updatePresentation : function() {
               // this function happens to work in both legacy mode (compact
               // rendering) and in oslc ui preview mode
               var cr = this.oslcCompact, pres = this._presentation;
               if (pres) {
                  if (cr.title) {
                     pres.titleLink.innerHTML = cr.title;
                  }

                  if (cr.icon) {
                     pres.iconNode.src = cr.icon;
                     domClass.remove(pres.iconLink, "lotusHidden");
                     domClass.add(pres.titleWrapper, "titleIndent");
                  }
                  else {
                     pres.iconNode.src = "";
                     domClass.add(pres.iconLink, "lotusHidden");
                     domClass.remove(pres.titleWrapper, "titleIndent");
                  }
                  if (cr.showExpand) {
                     domClass.remove(pres.bottomSection, "lotusHidden");
                  }
                  else {
                     domClass.add(pres.bottomSection, "lotusHidden");
                  }
               }
            },

            _createPresentation : function(node) {
               node = node || this.content;
               if (!this.oauthRequired && !this._presentation) {
                  var presentation = this._presentation = new com.ibm.oneui.controls._RichHoverPresentation({
                     toggleSize : lang.hitch(this, this.toggleSize)
                  });
                  this._updatePresentation();
                  presentation.titleLink.href = presentation.iconLink.href = this.presentationUri || this.uri;
                  node.innerHTML = "";
                  node.appendChild(presentation.domNode);
               }
               return node;
            },

            // this function is used to get the document in lazy fetch mode
            // and to authenticate when oauth is required in batched mode
            _fetchCompactRendering : function(allowOauthInterceptor, e) {
               if (e) {
                  e.preventDefault();
               }
               var args = {
                  url : this.uri,
                  headers : {
                     accept : CT_OSLC_COMPACT
                  }
               };
               if (!allowOauthInterceptor) {
                  args.skipInterceptors = [ "jazz.oauth"
                  ];
               }
               var dfd = dojo.xhrGet(args);
               dfd.addCallback(lang.hitch(this, function(dfd, response) {
                  var doc;
                  if (dfd.ioArgs.xhr.getResponseHeader("Content-Type").substring(0, CT_OSLC_COMPACT.length) === CT_OSLC_COMPACT) {
                     doc = {
                        oslcCompact : parseOslcCompactXML(DomParser.parse(response))
                     };
                  }
                  // if this is not an oauth request, it is a lazy fetch, handle
                  // as lazy
                  if (!allowOauthInterceptor && doc) {
                     this._handleLazyFetchJson(doc);
                  }
                  // if there is a valid document, return it
                  if (doc)
                     return doc;
                  // otherwise throw a bogus error to trigger Errback chain
                  throw {};
               }, dfd));
               dfd.addErrback(lang.hitch(this, function(err) {
                  // if the deferred was cancelled, the user cancelled login, no
                  // action to take
                  if (!err || err.dojoType !== "cancel") {
                     /*
                      * if (err && err.status === 401) { // this is only for
                      * lazy fetch mode // when we are in regular mode and are
                      * using this path for auth we will either have authed or
                      * will hit err.dojoType === "cancel" var token = new
                      * dojo._Url(this.uri).authority;
                      * this.setOauthRequired(token); this.aggregatorId =
                      * com.ibm.oneui.controls.ResourceLinkAggregator().registerOauth(token,
                      * this.uri, dojo.hitch(this,this._handleLazyFetchJson),
                      * dojo.hitch(this,this.disable,messages.infoNotAvailable)); }
                      * else
                      */{
                        this.disable(messages.infoNotAvailable);
                     }
                  }
                  return err;
               }));
               if (allowOauthInterceptor) {
                  // After we authenticate with OAuth, we poke the
                  // ResourceLinkAggregator to resend
                  // an xhr request for all ResourceLinks that access the same
                  // server.
                  dfd.addBoth(lang.hitch(this, function(response) {
                     // if the deferred was cancelled, the user did not login,
                     // do not poke the aggregator
                     if (response && response.dojoType === "cancel")
                        return response;
                     /*
                      * var aggregator =
                      * com.ibm.oneui.controls.ResourceLinkAggregator(); if
                      * (this.aggregatorId) { // exclude ourself from the
                      * aggregator call since we already have the result var obj =
                      * aggregator.unregisterOauth(this.oauthToken, this.uri,
                      * this.aggregatorId); // react to the result if (response &&
                      * (response.compactRendering || response.oslcCompact)) {
                      * obj.callback(response); } delete this.aggregatorId; }
                      * aggregator.resendOauth(this.oauthToken);
                      */
                     return response;
                  }));
               }
            },

            _handleLazyFetchJson : function(response) {
               if (response.oslcCompact) {
                  processOslcCompact(response.oslcCompact);
                  this.setOslcCompact(response.oslcCompact);
               }
               this.onLoad();
            },

            _updateIFrame : function() {
               var oslc = this.oslcCompact;
               if (!oslc || !this._presentation)
                  return;

               var v = dijit.getViewport();

               // update width first so we can measure height accurately

               // HoverPopup will treat a width greater than viewport - 60 as
               // viewport - 60
               // update the effective widths so the iframe is sized according
               // to the max
               // account for the 5 px horizontal padding around the iframe
               if (oslc.smallPreview) {
                  var smallWidthHint = parseLength(oslc.smallPreview.hintWidth);
                  this.effectiveSmallWidth = (v.w - 60 < smallWidthHint + 5) ? v.w - 65 : smallWidthHint;
                  if (has("ie") < 8 || this.effectiveSmallWidth + 5 > 500)
                     this.maxWidth = this.effectiveSmallWidth + 5;
               }
               if (oslc.largePreview) {
                  var largeWidthHint = parseLength(oslc.largePreview.hintWidth);
                  this.effectiveLargeWidth = (v.w - 60 < largeWidthHint + 5) ? v.w - 65 : largeWidthHint;
                  if (has("ie") < 8 || this.effectiveLargeWidth + 5 > 500 && (this.effectiveLargeWidth > this.effectiveSmallWidth || !this.effectiveSmallWidth))
                     this.maxWidth = this.effectiveLargeWidth + 5;
               }

               var w = this._isFullDisplay ? this.effectiveLargeWidth : this.effectiveSmallWidth;
               if (w) {
                  this._presentation.loadingImage.style.width = this._presentation.hoverIframe.style.width = w + "px";
                  if (has("ie")) {
                     // IE needs explicit width on the divider and width 100%
                     // breaks it out the side
                     // allow 4 px for margins on wrapper div
                     this._presentation.divider.style.width = (w - 4) + "px";
                     this._presentation.bottomDivider.style.width = (w - 4) + "px";
                  }
               }

               var heightOffset = this._presentation.titleBar.offsetHeight + 48;
               // HoverPopup will treat a height greater than viewport - 30 as
               // viewport - 30
               // update the effective widths so the iframe is sized according
               // to the max
               // account for the 45 px (+ titleBar height) vertical
               // padding/content around the iframe using heightOffset

               // Use dynamic heights if they're available
               if (oslc.smallPreview) {
                  var smallHeight = this.dynamicSmallHeight || parseLength(oslc.smallPreview.hintHeight);
                  this.effectiveSmallHeight = (v.h - 30 < smallHeight + heightOffset) ? v.h - (30 + heightOffset) : smallHeight;
               }
               if (oslc.largePreview) {
                  var largeHeight = this.dynamicLargeHeight || (oslc.largePreview.initialHeight && this.dynamicSmallHeight)
                        || parseLength(oslc.largePreview.hintHeight);
                  this.effectiveLargeHeight = (v.h - 30 < largeHeight + heightOffset) ? v.h - (30 + heightOffset) : largeHeight;
               }

               var h = this._isFullDisplay ? this.effectiveLargeHeight : this.effectiveSmallHeight;
               if (h) {
                  this._presentation.loadingImage.style.height = this._presentation.hoverIframe.style.height = h + "px";
               }
            },

            /*
             * _onKeyPress: function(e) { if(e.type == "keypress" && e.keyCode ==
             * dojo.keys.ESCAPE) this.close(); },
             * 
             * _onBodyClick: function(e) { var target = e && e.target; if
             * (target && !dojo.isDescendant(target,
             * this._getMasterPopup().domNode)) this.close(); },
             * 
             * _onStopEvent: function(e) { if (e.type == "click")
             * this._onBodyClick(e); },
             */

            _onMessage : function(e) {
               var data = e.data;
               // changed from !== on window to != window, IE6 recognizes the
               // two are equal
               if (!data
                     || !this.oslcCompact
                     || !this._presentation
                     || e.source != this._presentation.hoverIframe.contentWindow
                     || (!resizablePreviews && ((this._isFullDisplay && typeof (this.oslcCompact.largePreview.initialHeight) === "undefined") || (!this._isFullDisplay && (typeof (this.oslcCompact.smallPreview.initialHeight) === "undefined")))))
                  return;
               if (data.indexOf(OSLC_PREVIEW_RESIZE_PREFIX) === 0) {
                  this._timesResized++;
                  var newHeight = parseInt(data.substring(OSLC_PREVIEW_RESIZE_PREFIX.length), 10);
                  if (this._isFullDisplay) {
                     this.dynamicLargeHeight = newHeight;
                  }
                  else {
                     this.dynamicSmallHeight = newHeight;
                  }
                  if (this._isOpen) {
                     this._updateIFrame();
                     this.position();
                  }
               }
               else if (data.indexOf(VULCAN_PREVENT_CLOSE_PREFIX) === 0) {
                  var value = data.substring(VULCAN_PREVENT_CLOSE_PREFIX.length);
                  this.clickToClose = !(value === "true");
               }
            },

            destroy : function() {
               if (this._presentation) {
                  this._presentation.destroy();
                  delete this._presentation;
               }
               this.inherited(arguments);
            }
         });

      /**
       * @class ic-ui._RichHoverPresentation
       * @private
       */
      declare("com.ibm.oneui.controls._RichHoverPresentation", [
                                                                _Widget,
                                                                _Templated
      ], /** @lends ic-ui._RichHoverPresentation.prototype */
      {
         templateString : template,
         messages : messages,

         postCreate : function() {
            if (has("ie")) {
               domClass.add(this.loadingImage, "lotusHidden");
               domClass.remove(this.hoverIframe, "loadingIframe");
            }
         },

         _contentLoaded : function(e) {
            // Not checking for IE becaues there is a bug in IE where iframe
            // contents are not shown
            // when "visibility: hidden" is removed from the iframe's CSS
            // attribute
            if (e.type === "load") {
               domClass.add(this.loadingImage, "lotusHidden");
               domClass.remove(this.hoverIframe, "loadingIframe");
            }
         }
      });

      var processCompactRendering = function(results) {
         if (results.oauthRequired)
            return;

         if (results.title)
            results.title = html.removeScript(results.title);

         if (results.smallPreview || results.largePreview)
            results.showHover = true;

         if (results.smallPreview && results.largePreview)
            results.showExpand = true;

         initInt(results, "smallWidth", 300);
         initInt(results, "smallHeight", 200);
         initInt(results, "largeWidth", Math.max(300, results.smallWidth));
         initInt(results, "largeHeight", Math.max(300, results.smallHeight));
         initInt(results, "initialSmallHeight");
         initInt(results, "initialLargeHeight");
      };
      var initInt = function(obj, prop, def) {
         if (obj[prop] && (Math.ceil(obj[prop]) == Math.floor(obj[prop])))
            obj[prop] = parseInt(obj[prop], 10);
         else if (def)
            obj[prop] = def;
      };

      var processOslcCompact = function(results) {
         if (results.title)
            results.title = html.removeScript(results.title);

         if (results.smallPreview) {
            results.showHover = true;

            if (!results.smallPreview.hintWidth)
               results.smallPreview.hintWidth = "300px";
            if (!results.smallPreview.hintHeight)
               results.smallPreview.hintHeight = "200px";
         }

         if (results.largePreview) {
            if (results.showHover)
               results.showExpand = true;
            else
               results.showHover = true;

            if (!results.largePreview.hintWidth)
               results.largePreview.hintWidth = "300px";
            if (!results.largePreview.hintHeight)
               results.largePreview.hintHeight = "300px";
         }
      };

      var parseOslcCompactXML = function(oslcXml) {
         var oslcObj = {}, nodes, titleNodes = oslcXml.getElementsByTagNameNS("title", XMLNS_DC_TERMS), shortTitleNodes = oslcXml
               .getElementsByTagNameNS("shortTitle", XMLNS_OSLC), iconNodes = oslcXml.getElementsByTagNameNS("icon", XMLNS_OSLC), smallPreviewNodes = oslcXml
               .getElementsByTagNameNS("smallPreview", XMLNS_OSLC), largePreviewNodes = oslcXml.getElementsByTagNameNS("largePreview", XMLNS_OSLC);
         if (titleNodes.length > 0 && titleNodes[0].childNodes.length > 0) {
            oslcObj.title = titleNodes[0].childNodes[0].nodeValue;
         }
         if (shortTitleNodes.length > 0 && shortTitleNodes[0].childNodes.length > 0) {
            oslcObj.shortTitle = shortTitleNodes[0].childNodes[0].nodeValue;
         }
         if (iconNodes.length > 0) {
            oslcObj.icon = iconNodes[0].getAttributeNS("resource", XMLNS_RDF);
         }
         if (smallPreviewNodes.length > 0) {
            oslcObj.smallPreview = parseOslcPreviewXML(smallPreviewNodes[0]);
         }
         if (largePreviewNodes.length > 0) {
            oslcObj.largePreview = parseOslcPreviewXML(largePreviewNodes[0]);
         }
         return oslcObj;
      };
      var parseOslcPreviewXML = function(previewNode) {
         var result = {};
         result.document = previewNode.getElementsByTagNameNS("document", XMLNS_OSLC)[0].getAttributeNS("resource", XMLNS_RDF);
         parseOslcPreviewElement(previewNode, result, "hintWidth");
         parseOslcPreviewElement(previewNode, result, "hintHeight");
         parseOslcPreviewElement(previewNode, result, "initialHeight");
         return result;
      };
      var parseOslcPreviewElement = function(node, result, elementName) {
         var nodes = node.getElementsByTagNameNS(elementName, XMLNS_OSLC);
         if (nodes.length > 0 && nodes[0].childNodes.length > 0)
            result[elementName] = lang.trim(nodes[0].childNodes[0].nodeValue);
      };

      var parseLength = function(length) {
         length = length.toLowerCase();
         var px = length.indexOf("px");
         var em = length.indexOf("em");
         var ex = length.indexOf("ex");
         length = parseFloat(length);
         if (em > 0)
            return Math.ceil(length * getEmSize());
         if (ex > 0)
            return Math.ceil(length * getExSize());
         return Math.ceil(length);
      };

      var _emSize, _exSize;
      var getEmSize = function() {
         if (!_emSize) {
            _emSize = ui.measureEm(getTestNode());
            // clear the cache when finished rendering
            setTimeout(function() {
               _emSize = null;
            }, 0);
         }
         return _emSize;
      };
      var getExSize = function() {
         if (!_exSize) {
            _exSize = ui.measureEx(getTestNode());
            // clear the cache when finished rendering
            setTimeout(function() {
               _exSize = null;
            }, 0);
         }
         return _exSize;
      };
      var _testNode;
      var getTestNode = function() {
         if (!_testNode) {
            _testNode = domConstruct.create("div", {
               style : {
                  visibility : "hidden",
                  fontSize : "133.3333333%"
               }
            }, windowModule.body());
         }
         return _testNode;
      };

      return ResourceLink;
   });
