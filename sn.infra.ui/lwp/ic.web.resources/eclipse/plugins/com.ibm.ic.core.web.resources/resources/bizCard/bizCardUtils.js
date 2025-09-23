/* Copyright IBM Corp. 2001, 2016  All Rights Reserved.              */

define([
      "dojo",
      "dojo/dom-class",
      "dojo/_base/array",
      "dojo/cookie",
      // "dojo/i18n!lconn/profiles/bizCard/nls/ui",
      "dojo/has",
      "dojo/dom-style",
      "dojo/dom-attr",
      "dojo/dom",
      "dojo/_base/window",
      "dojo/dom-construct",
      "dojo/_base/lang",
      "dojo/dom-geometry",
      "dojo/json",
      "dojo/on",
      "dojo/query",
      "dojo/request",
      "ic-mm/livetext/serviceImpl",
      "ic-core/config",
      "ic-core/config/services",
      "ic-core/url"
],
   function(dojo, domClass, array, cookie, /* i18nui, */has, domStyle, domAttr, dom, windowModule, domConstruct, lang, domGeometry, JSON, on, query, request, 
                serviceImpl, configModule, services, urlModule) {

      /**
       * @deprecated Will be removed when person card and community card are
       *             removed
       */
      // Our encapsulated reference to dojo.
      // If someone loads a scope version of dojo, they can set this using
      // lconn.core.bizCard.bizCardUtils.setDojoObject
      var _d = dojo;

      var messages = null;

      var initMessages = function() {
         if (!messages) {
            try {
               messages = _d.i18n.getLocalization("lconn.profiles.bizCard", "ui");
            }
            catch (e) {
            }
         }
      };

      var BIZCARDATTR = "_ICBizCardLink";

      lang.mixin(lang.getObject("lconn.core.bizCard.bizCardUtils", true), {
         isDebug : false,
         scriptResourceName : "semanticTagService.js",
         version : "4.0",
         scripts : new Array(),
         css : new Array(),
         initiated : false,
         _haveProxy : false,
         _proxyHelper : null,
         baseUrl : null,
         resourcesUrl : null,
         appChksum : null, // This should be append to all urls like so:
         // "acs="
         // +lconn.core.bizCard.bizCardUtils.appChksum
         liveElemPrefix : "semtag_live_", // : This value need to be same as
         // we are declaring the same value
         // for our variable
         // SemTagSvc.liveElemPrefix.
         hoverIdx : 0,
         hoverIdAttr : "icBizCard_idx", // bizcard element counter (index)
         refcntAttr : "icBizCard_ref", // num of bizcard integrations into
         // the element

         // set the reference to dojo to something other than "window.dojo".
         // Useful for scoped dojo implementations
         setDojoObject : function(d) {
            if (typeof d == "object")
               _d = d;
         },

         getDojoObject : function() {
            return _d || dojo;
         },

         init : function(event) {
            if (this.initiated)
               return;

            _d.requireLocalization("lconn.profiles.bizCard", "ui");

            // Code added here just so the js aggregator can pick this up.
            if (false)
               initMessages();

            var stsc = window.SemTagSvcConfig || {};
            this.baseUrl = lconn.core.bizCard.bizCardUtils.initBaseUrl();
            this.resourcesUrl = stsc.resourcesSvc || null;

            // init proxy related code
            this._initProxyHelper();

            // init checksum
            this._initAppCksum();

            if (stsc.loadCssFiles && !window.SemTagPersonConfig_noCss) {
               var isBidi = (window.SemTagSvcConfig && SemTagSvcConfig.isBidiRTL);

               // portal has their own styles loaded
               if (!SemTagSvcConfig.isPortal) {

                  this.loadCss(this.resourcesUrl + "/web/_style" + "?include=com.ibm.lconn.core.styles.oneui3/base/package3" + (isBidi ? "RTL" : "")
                        + ".css&exclude=org.dojotoolkit.dojo/resources/dojo.css", {
                     id : "ibmConnect_CSS_package3"
                  });
                  this.loadCss(this.resourcesUrl + "/web/_style" + "?include=com.ibm.lconn.core.styles.oneui3/sprites" + (isBidi ? "RTL" : "")
                        + ".css&exclude=org.dojotoolkit.dojo/resources/dojo.css", {
                     id : "ibmConnect_CSS_sprites"
                  });
                  this.loadCss(this.resourcesUrl + "/web/_lconntheme/default.css?version=oneui3" + (isBidi ? "&rtl=true" : "")
                        + "&exclude=org.dojotoolkit.dojo/resources/dojo.css", {
                     id : "ibmConnect_CSS_default"
                  });

                  // RTC#90013 - START - TODO: need to fix in OneUI
                  try {

                     var styleHtml = "\
							.lotusui30 .lotusVCard .lotusPersonInfo {\
								overflow: hidden;\
							}\
							.lotusui30 .lotusInlineVCard .lotusAppLinks a {\
								border-width: 0;\
							}\
							.lotusui30 .lotusInlineVCard .lotusPersonInfo h2 {\
								width: 105px;\
							}\
							.lotusui30 .lotusInlineVCard .lotusInfo .lconnSprite-iconAttention16 {\
								display: none;\
							}\
							.lotusui30 .lotusInlineVCard .lotusInfo {\
								border: 0;\
								background-color: transparent;\
								font-size: 1em;\
								padding: 5px 10px 0;\
							}\
							.lotusui30 .lotusInlineVCard .lotusInfo span {\
								margin: 0;\
							}\
						";
                     if (isBidi) {
                        styleHtml += "\
								.lotusui30 .lotusInlineVCard .lotusPhoto img {\
									height: 35px;\
									width: 35px;\
								}\
								.lotusui30 .lotusInlineVCard, .lotusui30 .lotusInlineVCard .lotusContainer {\
									width: 175px;\
								}\
								.lotusui30 .lotusInlineVCard h2 {\
									color: #444444;\
									font-size: 1.2em;\
									font-weight: bold;\
									line-height: 1.3;\
									margin-right: 55px!important;\
									padding: 0;\
								}\
								.lotusui30 .lotusInlineVCard .lotusPhoto {\
									border-width: 0;\
									margin-top: 5px;\
									padding: 0;\
								}\
							";
                     }
                     var style = domConstruct.create("style", {
                        type : "text/css"
                     });
                     if (style.styleSheet) { // IE sets styles this way
                        style.styleSheet.cssText = styleHtml;
                     }
                     else {
                        domConstruct.place(windowModule.doc.createTextNode(styleHtml), style);
                     }
                     domConstruct.place(style, windowModule.body(), "first");

                  }
                  catch (ee) {
                     if (this.isDebug && window.console)
                        console.log(ee);
                  }
                  // RTC#90013 - END

                  this.standaloneCSSloaded = true;
               }
            }

            this.isDebug = (window.location.search.indexOf("debug=bizcard") != -1);

            // a11y: pre-create the bizcard holding element because a11y
            // needs to have something to be described by
            setTimeout(function() {
               if (window.LCSemTagMenu && !dom.byId(LCSemTagMenu.id)) {
                  LCSemTagMenu.createMenuTag();
               }
            }, 100);

            this.initiated = true;
         },

         printDebug : function(msg) {
            if (this.isDebug && window.console) {
               var d = new Date();
               if (dojo.config.isDebug) {
                  console.debug("[" + d.toLocaleTimeString() + "." + d.getMilliseconds() + "] lconn.core.bizCard.bizCardUtils: " + msg);
               }
            }
         },

         _sametimeModulesLoaded : false,
         loadSametimeModules : function() {
            if (lconn.core.bizCard.bizCardUtils._sametimeModulesLoaded)
               return; // make sure we only load this once.

            // Standalone person card must require these files explicitly
            try {
               var stModules = [];
               if (_d.exists("lconn.core.config.services")) {
                  if (services.sametimeProxy && !_d.exists("lconn.profiles.sametime.sametimeProxyAwareness")) {
                     stModules.push("lconn.profiles.sametime.sametimeProxyAwareness");
                  }
                  else if (services.profiles && !_d.exists("lconn.profiles.sametime.sametimeAwareness")) {
                     stModules.push("lconn.profiles.sametime.sametimeAwareness");
                  }
               }
               if (stModules.length) {
                  if (_d.exists("net.jazz.ajax.xdloader.load_async")) {
                     net.jazz.ajax.xdloader.batch_load_async(stModules, function() {});
                  }
                  else {
                     array.forEach(stModules, _d.require);
                  }
                  lconn.core.bizCard.bizCardUtils._sametimeModulesLoaded = true;
               }
            }
            catch (e) {
               if (window.console) {
                  console.error("Unable to load Sametime modules");
                  console.error(e);
               }
            }
         },

         initBaseUrl : function() {
            var baseUrl = "";

            // figure out the base URL to use
            if (window.SemTagSvc_baseUrl != null)
               baseUrl = SemTagSvc_baseUrl;
            else if (window.SemTagSvcConfig != null && SemTagSvcConfig.baseUrl != null)
               baseUrl = SemTagSvcConfig.baseUrl;
            else
               baseUrl = this.getURL(this.scriptResourceName, "script", SemTagSvc.baseUrl, "src").baseUrl;

            return baseUrl;
         },

         _initProxyHelper : function() {
            if (window.SemTagSvcConfig != null && typeof (window.SemTagSvcConfig.proxyURL) != "undefined" && window.SemTagSvcConfig.proxyURL.length > 0) {
               this._haveProxy = true;
               this._proxyHelper = new urlModule.ProxyUrlHelper(window.SemTagSvcConfig.proxyURL);
            }
         },

         _initAppCksum : function() {
            this.appChksum = this._getConfigValue("appChksum", "UNDEFINED");
         },

         _getConfigValue : function(propName, defaultVal) {
            if (window.SemTagSvcConfig != null && typeof (window.SemTagSvcConfig[propName]) != "undefined") {
               return window.SemTagSvcConfig[propName];
            }
            return defaultVal;
         },

         appendAppChkSum : function(url) {
            // already appended - or null
            if (url == null || url.indexOf('etag=') >= 0)
               return url;

            var c = null;
            if (url.indexOf('?') < 0) {
               c = '?';
            }
            else {
               c = '&'
            }

            return url + c + 'etag=' + this.appChksum;
         },

         getService : function(svcId) {
            for (i = 0; window.livetextCfg != null && i < window.livetextCfg.length; i++) {
               var service = window.livetextCfg[i];
               if (service.id == svcId)
                  return service;
            }
            return null;
         },

         // RONNY: deprecated. use
         // lconn.core.utilities.processUntilAvailable(callback, test,
         // passedInParam)
         processUntilAvailable : function(callback, test, passedInParam) {
            var intervalId = "";
            intervalId = window.setInterval(function() {
               if (eval(test)) {
                  if (passedInParam != null)
                     callback(passedInParam);
                  else
                     callback();

                  window.clearInterval(intervalId);
               }
            }, 300);
         },

         getBaseURL : function(serviceId) {
            var service = lconn.core.bizCard.bizCardUtils.getService(serviceId);
            if (service != null && service.baseURL != null)
               return service.baseURL;
            else {
               if (this.initiated)
                  return this.baseUrl;
               else
                  return lconn.core.bizCard.bizCardUtils.initBaseUrl();
            }
         },

         buildBaseURL : function(urlString) {

            var index = urlString.indexOf("//") + 2;
            var serverProtocol = urlString.substring(0, index);
            var restString = urlString.substring(index, urlString.length);
            index = restString.indexOf("/") + 1;
            var hostName = restString.substring(0, index);
            restString = restString.substring(index, restString.length);
            index = restString.indexOf("/");
            var contextPath = restString.substring(0, index);
            restString = restString.substring(index, restString.length);

            var newUrlString = serverProtocol + hostName + contextPath;
            return newUrlString;

         },

         // build a URL off the this script's base URL
         getURL : function(resourceName, htmlTagType, initURL, urlAttribute) {
            var temp = {};

            // get this document's base URL
            var docAbsoluteBaseUrl = location.protocol + "//" + location.host;

            // get this script's absolute base URL
            var s = document.getElementsByTagName(htmlTagType);
            var absoluteBaseUrl = "";
            var tempSrc = null;
            for (var i = 0; i < s.length; i++) {
               var src = s[i].getAttribute(urlAttribute);
               if (src && src.indexOf(resourceName) != -1) {
                  tempSrc = src;
                  absoluteBaseUrl = src.substring(0, src.indexOf(initURL));
                  if (initURL == null) {
                     absoluteBaseUrl = this.buildBaseURL(src);
                     temp.baseUrl = absoluteBaseUrl;
                  }
                  temp.resourceFound = true;
                  break;
               }
            }

            // if the base location of the document is different from the
            // base location of this script
            // then set the baseUrl absolute by using the base location of
            // this script,
            // otherwise use leave the baseUrl as relative

            if (temp.baseUrl == "undefined")
               temp.baseUrl = (absoluteBaseUrl == docAbsoluteBaseUrl) ? initURL : absoluteBaseUrl + initURL;

            // if(temp.baseUrl == "undefined")
            // {
            // var tempIndexxx = tempSrc.indexOf("/", 1);
            // temp.baseUrl = docAbsoluteBaseUrl +
            // tempSrc.substring(0,tempIndexxx);
            // }

            return temp;
         },

         getUrlParam : function(paramName) {
            var uri = urlModule.parse(window.location.href);
            var value = uri.queryParameters[paramName];
            if (lang.isArray(value) && value != null && value.length > 0) {
               return value[0];
            }
            else if (typeof value === "string") {
               return value;
            }
            return null;
         },

         getProxifiedURL : function(url, subst, cbFuncName) {
            for ( var key in subst) {
               if (key == "LANG" && subst[key] == "")
                  var pattern = new RegExp("&lang=@@@" + key + "@@@"); // get
               // rid
               // of
               // entire
               // &lang=@@@LANG@@@
               // URL
               // parameter
               // if
               // value
               // not
               // supplied
               else
                  var pattern = new RegExp("@@@" + key + "@@@");

               var val = subst[key];
               url = url.replace(pattern, val);
            }

            // add checksum
            url = this.appendAppChkSum(url);

            // If there is a json request to a resource that returns
            // an http status 401, the client javascript cannot intercept it
            // before prompting the
            // user with an ugly basic authentication box.
            //
            // So for these requests, we will set suppress401 the parameter
            // so we'll just get
            // get a blank page instead of a 401 error if not authorized.
            url += "&suppress401=true";

            if (this._haveProxy) {
               return this._proxyHelper.getProxifiedURL(url);
            }

            return url + "&callback=" + cbFuncName;
         },

         _timeout : 10000,

         /*
          * @param url The request url without &callback=.. @param subst A set
          * of tokens of the form @@@TOKEN@@@ to be subsituted in the URL @param
          * cbFuncName The callback funection to be called by a JSONP request
          * for cross site scripting @param requestor An object for cross-domain
          * requsts @param requestReturn main CB function for actually
          * displaying the data @param event The event to which this JS call is
          * responding @param An ID element to use for identifying the
          */
         getBizCardData : function(url, subst, cbFuncName, requestor, requestReturn, event, connectionId) {
            var url = this.getProxifiedURL(url, subst, cbFuncName);

            if (this._haveProxy) {
               var xhrLoadCB = function(rawData) {
                  var data = JSON.parse(rawData.replace(/^\s*while\(1\);/, ''));
                  requestReturn(true, data, event);
               };

               var xhrErrorCB = function(rawData) {
                  requestReturn(false, rawData, event);
               };

               request(url, {
                  method : "GET",
                  timeout : this._timeout,
                  contentType : "application/json",
                  headers : {
                     "X-Requested-With" : ""
                  }
               }).then(xhrLoadCB, xhrErrorCB);
            }
            else {
               requestor.request(url, this._timeout, requestReturn, event, connectionId);
            }
         },

         out : function() {
            this.buffer = "";
            this.write = function(str) {
               this.buffer += str;
            }
         },

         getSinglePropertyValue : function(prop) {
            if (!prop)
               return false;
            var returnVal = prop.innerHTML.replace(/<[a-zA-Z\/][^>]*>/gi, "");
            return returnVal;
         },

         sortByOrder : function(a, b) {
            if (a.order > b.order)
               return 1;
            else if (a.order < b.order)
               return -1;
            else
               return 0;
         },

         // public
         // className: class name to look for matches
         // element: element to start traversing down
         // limit: max matches to find
         // tagScope: limit searches in the specified tag types
         getElementsByClassName : function(className, element, limitCnt, tagScope) {
            if (!element)
               element = document.body; // entire 'body' if not passed in
            if (!limitCnt)
               limit = 0; // no limit if not passed in
            if (!tagScope)
               tagScope = [ '*'
               ]; // no scoping if not passed in

            var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
            if (element && element.className && element.className.match(regexp))
               return new Array(element);

            var elements = new Array();
            for (var t = 0; t < tagScope.length; t++) {
               var children = element.getElementsByTagName(tagScope[t]);
               for (var i = 0; i < children.length; i++) {
                  var child = children[i];
                  // RTC#77735: be sure match is valid as some elements may
                  // not have className or
                  // className might be an object without a match method
                  // altogehter (such as the case with SVG elements)
                  if (child.className && child.className.match && child.className.match(regexp))
                     elements.push(child);
                  if (0 < limitCnt && limitCnt == elements.length)
                     break;
               }
            }
            return elements;
         },

         // public
         // cName: class name to look for matches
         // element: element to start traversing down
         getParentByClassName : function(cName, element) {
            if (!element)
               return null;
            var regexp = new RegExp("(^|\\s)" + cName + "(\\s|$)");
            if (element.className && element.className.match(regexp))
               return element;
            while (element.parentNode) {
               element = element.parentNode;
               if (element.className && element.className.match(regexp))
                  return element;
            }

         },

         // get the connected bizcard vcard element from this element
         // cName: class name to look for matches
         // element: element to start traversing down
         getConnectedElement : function(cName, element) {
            var el = this.getParentByClassName(cName, element);
            if (el)
               return el;

            el = element;
            while (el) {
               var arr = query("[" + BIZCARDATTR + "=\"" + el.id + "\"]");
               if (arr && arr.length > 0)
                  return arr[0];
               el = el.parentNode;
            }

            return el;
         },

         _getAltMessage : function(elem) {
            initMessages();

            var altText = messages["label.semtag.hover"];

            try {
               // check the element for the data we need
               var checkElem_ = function(el) {
                  var alt = "";
                  if (el) {
                     if (el.textContent || el.innerText) {
                        // try to find any hidden nodes and remove them
                        // before getting the inner content
                        var fnElemCopy = lang.clone(el);
                        try {
                           query("*", fnElemCopy).forEach(function(subNode) {
                              if (subNode && (domClass.contains(subNode, "lotusHidden") || subNode.style.display == "none")) {
                                 subNode.parentNode.removeChild(subNode);
                              }
                           });
                        }
                        catch (e) {
                        }
                        alt = lang.trim((has("ie") ? fnElemCopy.innerText : fnElemCopy.textContent));

                     }
                     else if (el.tagName && el.tagName.toUpperCase() === "IMG") {
                        if (dojo.hasAttr(el, "title")) {
                           alt = lang.trim(domAttr.get(el, "title"));
                        }
                        else if (dojo.hasAttr(el, "alt")) {
                           alt = lang.trim(domAttr.get(el, "alt"));
                        }
                     }
                  }
                  return alt;
               };

               // try to find the displayname for this person
               var altName = checkElem_(elem);
               if (altName.length == 0) {
                  for (var ii = 0; ii < elem.childNodes.length; ii++) {
                     altName = checkElem_(elem.childNodes[ii]);

                     // if we find a name, use it in the alt text
                     if (altName.length > 0)
                        break;
                  }
               }
               // if we find a name, use it in the alt text
               if (altName.length > 0) {
                  altText = (messages["label.semtag.hover.alt"]).replace("{0}", altName);
               }

            }
            catch (e) {
            }
            ;

            return altText;
         },

         addOverride : function(elem, overrideHandler) {

            var str = elem.innerHTML;
            if (str.charAt(0) === '@') {
            str = dojox.string.BidiComplex.stripSpecialCharacters(str);
                if (str.charAt(1) === '@')
                    str = str.substring(1);
                if (!dojo.isBodyLtr() || window.getComputedStyle(elem, null).direction === "rtl")
                    str = bidiUtil.LRE + "@" + str.substring(1) + bidiUtil.PDF;
                while (elem.firstChild)
                    elem.removeChild(elem.firstChild);
                elem.appendChild(document.createTextNode(str));

                var e = elem;
                while(e.nodeName != "DIV") {
                if (e.nodeName === "P")
                       break;
                    else
                        e = e.parentNode; 
                }
                if(e.dir != "" && e.style.textAlign === "")
                    e.style.textAlign = (e.dir === "rtl") ? "right" : "left";
            }
                                                                                                                                
            if (dojo.hasAttr(elem, "_bizcardprocessed_"))
               return;

            domAttr.set(elem, "_bizcardprocessed_", "true");

            domAttr.set(elem, {
               "role" : "button",
               "aria-haspopup" : "true",
               "href" : "javascript:;",
               "aria-controls" : LCSemTagMenu.id
            });

            dojo.removeAttr(elem, "target");
            on(elem, "click", overrideHandler);

         },

         addPostLink : function(elem, postLinkHandler) {
            if (dojo.hasAttr(elem, "_bizcardprocessed_"))
               return;
            domAttr.set(elem, "_bizcardprocessed_", "true");

            var newId = (new String(Math.random())).substring(2);
            domAttr.set(elem, BIZCARDATTR, newId);

            var altText = this._getAltMessage(elem);

            var link = domConstruct.create("a", {
               "role" : "button",
               "aria-haspopup" : "true",
               "href" : "javascript:;",
               "aria-controls" : LCSemTagMenu.id,
               "id" : newId
            });
            on(link, "click", postLinkHandler);

            domConstruct.create("img", {
               "src" : (dojo.config.blankGif || require.toUrl("dojo/resources/blank.gif")),
               "className" : "lconnSprite lconnSprite-iconContext",
               "alt" : altText,
               "title" : altText,
               "style" : {
                  "display" : "inline",
                  "margin" : "0 3px",
                  "padding" : "0 1px"
               }
            }, link);

            // for high contrast
            domConstruct.create("span", {
               "className" : "lotusAltText",
               innerHTML : "&#9660;"
            }, link);

            domConstruct.place(link, elem, "after");

         },

         // public
         // adds mouseover (hover), focus (keyboard), and keydown (keystroke)
         // watch events to the "live" element
         // elem: DOM element to make 'live'
         // hoverHandler: JS event handler for 'mouseover' event to show the
         // hover
         // clickHandler: JS event handler for 'click' event to supply the
         // menu items
         addHover : function(elem, hoverHandler, clickHandler, keystrokeHandler) {

            var refcnt = elem.getAttribute(this.refcntAttr);
            if (refcnt) { // this element has already got the basic setup
               elem.setAttribute(this.refcntAttr, parseInt(Number(refcnt) + 1)); // increment
               // the
               // ref
               // count

               if (LCSemTagMenu.staticHover) {
                  var img = LCSemTagMenu.findHoverFromLiveElement(elem);
                  if (img) {
                     on(img, "click", clickHandler);
                     img.setAttribute("href", "javascript:;");
                  }
                  else
                     this.printDebug("couldn't find the hover for this element!"); // HMdebug
               }
               else {
                  var classAttrs = has("ff") ? elem.getAttribute("class") : elem.className;
                  if (classAttrs.indexOf("hasHover") == -1) { // add hover
                     // ONLY if we
                     // did not do
                     // so already
                     on(elem, "mouseover", hoverHandler);
                     on(elem, "focus", hoverHandler);
                     on(elem, "mouseout", function(evt) {
                        LCSemTagMenu.unfocus(evt)
                     });
                     if (!has("ie"))
                        on(elem, "blur", function(evt) {
                           LCSemTagMenu.unfocus(evt);
                        });
                  }
                  else {
                     this.printDebug("attempting to connect repeated events to element: " + elem);
                  }
               }
            }
            else { // this element needs a new setup
               elem.setAttribute(this.refcntAttr, "1");
               // specific to portal
               this.hoverIdx++;
               elem.setAttribute(this.hoverIdAttr, parseInt(this.hoverIdx));

               if (LCSemTagMenu.staticHover) {
                  var img = this.createHoverImage();
                  on(img, "click", clickHandler);
                  img.setAttribute("href", "javascript:;"); // NEEDSWORK
                  // better target?

                  var sibling = elem.nextSibling;
                  if (sibling)
                     sibling.parentNode.insertBefore(img, sibling);
                  else
                     elem.parentNode.appendChild(img);

                  elem.setAttribute(this.hoverIdAttr, parseInt(this.hoverIdx));
                  elem.id = this.liveElemPrefix + this.hoverIdx; // NEEDSWORK
                  // what if
                  // the
                  // element
                  // already
                  // had an
                  // id...
               }
               else { // dynamic hover == visual indicator as to where to
                  // hover
                  // elem.innerHTML = "<span class='hasHover'>" +
                  // SemTagSvc.getTextValue(elem) + "</span>"; // this is bad
                  // because it's completely overriding the content of this
                  // element...
                  var classAttrs = has("ff") ? elem.getAttribute("class") : elem.className;

                  if (classAttrs && 0 < classAttrs.length)
                     classAttrs += " hasHover"; // NEEDSATTN decoration
                  else
                     classAttrs = "hasHover";
                  if (has("ff"))
                     elem.setAttribute("class", classAttrs);
                  else
                     elem.className = classAttrs;

                  on(elem, "mouseover", hoverHandler);
                  on(elem, "focus", hoverHandler);
                  on(elem, "mouseout", function(evt) {
                     LCSemTagMenu.unfocus(evt);
                  });
                  if (!has("ie"))
                     on(elem, "blur", function(evt) {
                        LCSemTagMenu.unfocus(evt);
                     });
               }
               if (keystrokeHandler != null)
                  on(elem, "keydown", keystrokeHandler); // A11Y
            }

            // addhover to all child html elements
            try {
               query("> *:not(.hasHover)", elem).forEach(lang.hitch(this, function(childElem) {
                  if (!domClass.contains(childElem, "lotusHidden") && childElem.style.display != "none") {
                     this.addHover(childElem, hoverHandler, clickHandler, keystrokeHandler);
                  }
               }));
            }
            catch (e) {
            }
         },

         createHoverImage : function() {
            var img = document.createElement("img");
            this.hoverIdx++;
            img.id = this.hoverIdAttr + this.hoverIdx;
            img.className = LCSemTagMenu.iconName;
            img.setAttribute("src", this.baseUrl + "/images/menu_selected_hover.gif");
            img.setAttribute("border", "0");

            var link = document.createElement("a");
            on(link, "focus", LCSemTagMenu.activateHover);
            on(link, "mouseover", LCSemTagMenu.activateHover);
            on(link, "mouseout", LCSemTagMenu.deactivateHover);
            link.appendChild(img); // A11Y - caller should add 'href' for
            // appropriate event handler

            return link;
         },

         // public
         // event: JS 'mouseover' event object
         // clickHandler: JS function to be called upon click
         showHover : function(event, handler) {
            this.printDebug("in showHover");
            try {
               if (LCSemTagMenu.showing) {// if we are already showing
                  // something, skip the timer and
                  // show right away...
                  LCSemTagMenu.clearTimeouts();
                  LCSemTagMenu.showHover(event, handler);
               }
               else {
                  LCSemTagMenu.startShowTimer(event, handler);
               }
            }
            catch (e) {
               console.error("Error in lconn.core.bizCard.bizCardUtils.showHover");
               console.error(e);
            }
         },

         // public
         // event: JS 'click' event object
         // items: array of 'menu item JSON'
         // cssClass: CSS selector for the items
         // header: 'header JSON'
         // footer: 'footer JSON'
         setMenuData : function(event, items, cssClass, header, footer) {
            LCSemTagMenu.setMenuData(event, items, cssClass, header, footer);
         },

         // public
         getMenuItemJson : function(label, href, order, icon) {
            var o = order ? order : 0;
            var i = icon ? icon : "";
            return {
               "label" : label,
               "href" : href,
               "order" : o,
               "icon" : i
            };
         },

         // public
         getMenuHeaderJson : function(markup, order) {
            return {
               "markup" : markup,
               "order" : order
            };
         },

         // public
         getMenuFooterJson : function(markup, order) {
            return {
               "markup" : markup,
               "order" : order
            };
         },

         getElementFromEvent : function(event) {
            return event.target ? event.target : event.srcElement;
         },

         // public
         getLiveElementFromEvent : function(event) {
            return LCSemTagMenu.findLiveElementFromEventSource(this.getElementFromEvent(event));
         },

         getEventAbsoluteX : function(e) {
            // find out X
            var x = 0;
            if (e.pageX)
               x = e.pageX;
            else if (e.clientX)
               x = e.clientX + document.body.scrollLeft;

            return x;
         },

         getEventAbsoluteY : function(e) {
            // find out Y
            var y = 0;
            if (e.pageY)
               y = e.pageY;
            else if (e.clientY)
               y = e.clientY + document.body.scrollTop;

            return y;
         },

         getStyle : function(node, styleName) {
            var styleValue;
            if (window.getComputedStyle) // Mozilla
               styleValue = document.defaultView.getComputedStyle(node, null).getPropertyValue(styleName);
            else if (node.currentStyle) // IE
               styleValue = node.currentStyle[styleName];

            return styleValue;
         },

         createGroupJson : function(ctx, exts) { // top-level objects in
            // 'actionRegistry' array
            return {
               "context" : ctx,
               "extenders" : exts
            };
         },

         createActionJson : function(id, ctx, label, desc, url, order) { // elements
            // in
            // actionRegistry[x].extenders
            // array
            // var o = this.parseOrder(order);
            var o = parseInt(order);
            return {
               "id" : id,
               "context" : ctx,
               "label" : label,
               "description" : desc,
               "url" : url,
               "order" : o
            };
         },
         parseOrder : function(order) {
            if (order == null || order.length == 0)
               return 0;
            if (order.charAt(0) == '-')
               return parseInt(order.substr(1)) * -1;
            else
               return parseInt(order);
         },

         _langParamValue : "",
         getLangParam : function() {
            var langValue = null;
            var cookieName = lang.getObject("lconn.core.LanguageSelector.COOKIE_NAME");

            // try cookie first
            if ((cookieName != "undefined") && (cookieName != null)) {
               langValue = cookie(cookieName);
            }

            // if cookie failed, try lang= param
            if (langValue == null || langValue == "") {
               langValue = this.getUrlParam("lang");
            }

            // if cookie and lang= failed, use dojo value.
            // note we will always get here when the LS is disabled.
            if (langValue == null || langValue == "") {
               if (window.djConfig != null && djConfig.locale != null) {
                  langValue = djConfig.locale;
                  if (langValue == "pt-pt") { // temp hack
                     langValue = "pt";
                  }
               }
            }

            // final paranoia - fallback to default lang
            if (langValue == null || langValue == "") {
               langValue = "en";
            }

            // normalize string
            langValue = langValue.replace(/\-/g, "_");
            langValue = langValue.toLowerCase();

            this._langParamValue = langValue;

            return this._langParamValue;
         },

         // public
         getTextValue : function(elem) {
            if (!elem)
               return "";
            return elem.innerHTML.replace(/<[a-zA-Z\/][^>]*>/gi, "");
         },

         // public
         getTypedValue : function(elem, defProp) {
            if (!defProp)
               defProp = "def"; // NEEDSATTN "def" is not a standard
            // sub-property
            var returnElem = new Array();
            var types = this.getElementsByClassName("type", elem);
            var values = this.getElementsByClassName("value", elem);
            var value = "";
            if (values.length < 1)
               value = this.getTextValue(elem);
            for (i = 0; i < values.length; i++) {
               value += this.getTextValue(values[i]);
            }
            if (types.length < 1)
               returnElem[defProp] = value;
            else {
               for (j = 0; j < types.length; j++) {
                  var typeElem = types[j];
                  var type = typeElem.tagName.match(/^abbr$/i) ? typeElem.getAttribute("title") : this.getTextValue(typeElem);
                  returnElem[type.toLowerCase()] = value;
               }
            }
            return returnElem;
         },

         // public
         findNameElementInHcard : function(elem) {
            if (elem.className != "vcard")
               elem = this.getParentByClassName('vcard', elem);
            var nameElem = this.getElementsByClassName("fn", elem)[0];
            if (!nameElem) {
               nameElem = this.getElementsByClassName("n", elem)[0];
            }
            return nameElem;
         },

         // public
         findElementByNameInHcard : function(elem, name) {
            if (elem.className != "vcard")
               elem = this.getParentByClassName('vcard', elem);
            return this.getElementsByClassName(name, elem)[0];
         },

         loadScript : function(script) {

            var cookieName = this.getLangParam();

            if (script.indexOf("lang=") != -1 && cookieName != null) {
               script = script.substring(0, script.indexOf("lang")) + "lang=" + cookieName;
            }
            else {
               if (script.indexOf("resourcebundle") != -1 && cookieName != null) {
                  script = script + "&lang=" + cookieName;
               }

               if (script.indexOf("resourceStrings") != -1 && cookieName != null) {
                  script = script + "&lang=" + cookieName;
               }

               // In 2.5, we are using 'js-resources.js' to load resource
               // strings for bizCard
               if (script.indexOf("js-resources.js") != -1 && cookieName != null) {
                  script = script + ((script.indexOf("?") != -1) ? "&" : "?") + "lang=" + cookieName;
               }
            }

            // append checksum
            script = this.appendAppChkSum(script);

            if (!this.scripts[script]) {
               this.scripts[script] = true;
               var scriptElem = document.createElement("script");
               scriptElem.src = script;
               document.body.insertBefore(scriptElem, document.body.firstChild);
            }
         },

         // returns,
         // object: on success, the object of the link element created
         // false: on failure
         loadCss : function(css, addAttrMixin) {
            addAttrMixin = addAttrMixin || {};
            css = this.appendAppChkSum(css); // append checksum
            if (!this.css[css]) {
               var head = windowModule.doc.getElementsByTagName('head');
               if (head[0]) {
                  this.css[css] = true; // maintain list of css added
                  var el = document.createElement('link');
                  if (el) {
                     el.rel = "stylesheet";
                     el.href = css;
                     el.type = "text/css";
                     el.media = "screen";
                     lang.mixin(el, addAttrMixin); // add additional
                     // attributes supplied
                     return head[0].appendChild(el);
                  }
               }
            }
            return false;
         },

         toggleInlineCard : function(pDiv) {
            var vCard = windowModule.doc.getElementById(pDiv + "_Pivot");
            var vCardInfo = windowModule.doc.getElementById(pDiv + "_Details");
            if (vCard != null && vCardInfo != null)
            // if(vCardInfo != null )
            {
               if (vCard.className.indexOf('lotusPivotNavOpen') != -1) {
                  vCard.className = "lotusPivotNav";
                  vCardInfo.style.display = "none";
               }
               else {
                  vCard.className = "lotusPivotNav lotusPivotNavOpen";
                  vCardInfo.style.display = "block";
               }
            }
         }
      });

      // Unless specifically noted, everything in this object is private to
      // the semantic tagging / menu generation service core
      window.LCSemTagMenu = {
         isDebug : false,
         staticHover : false,
         focusRestored : false, // flag to indicate that element focus was
         // fired from the hide timer. See showHover
         // for deeper explanation.
         preventFocus : true,
         id : "semtagmenu",
         hideDelay : 500, // '0' requires an explicit event to dismiss the
         // popup
         showDelay : 300,
         timeouts : new Array(),
         iconName : "menu_drop_icon",
         showing : false,
         currentElem : null,
         refCount : -1,

         tabOrderByDomNodeOrder : 0, // 1=tab order controlled by inserting
         // element in-line with watched
         // element
         tabOrderByTabIndex : 0, // 1=tab order controlled by setting watched
         // element tabindex
         elemOrigTabIdx : null,
         elemTempTabIdx : 1000,
         elemNext : null,
         originalActiveEl : null, // the element that was active before
         // showing the hover

         svcHandlers : new Array(),
         items : new Array(),
         headers : new Array(),
         footers : new Array(),

         hoverIdRE : null,
         iconNameRE : new RegExp("(^|\\s)menu_drop_icon(\\s|$)"), // NEEDSWORK
         // why
         // can't
         // you use
         // LCSemTagMenu.iconName?

         hoverOffset : {
            x : 15,
            y : 15,
            w : 315
         }, // the offset of the hover (blue box)
         menuOffset : {
            x : 10,
            y : 0,
            w : 425
         }, // the offset of the bizcard

         initited : false,

         init : function() {
            if (this.initited == false) {
               LCSemTagMenu.hoverIdRE = new RegExp(lconn.core.bizCard.bizCardUtils.hoverIdPrefix);
               // if(LCSemTagMenu.defaultLoaded == null)
               // lconn.core.bizCard.bizCardUtils.loadScript(lconn.core.bizCard.bizCardUtils.baseUrl
               // + '/javascript/default.js');
               on(document, "click", LCSemTagMenu.click);
               on(document, "keydown", LCSemTagMenu.keydown); // A11Y
               this.isDebug = (window.location.search.indexOf("debug=bizcard") != -1);
               this.initited = true;
            }
         },

         printDebug : function(msg) {
            if (this.isDebug) {
               var d = new Date();
               if (dojo.config.isDebug) {
                  console.debug("[" + d.toLocaleTimeString() + "." + d.getMilliseconds() + "] LCSemTagMenu: " + msg);
               }
            }
         },

         activateFocus : function(event) {
            lconn.core.bizCard.bizCardUtils.activateHover(event);
         },

         activateHover : function(event) {
            var imgElem = lconn.core.bizCard.bizCardUtils.getElementFromEvent(event);
            if (imgElem)
               imgElem.src = lconn.core.bizCard.bizCardUtils.baseUrl + "/images/menu_selected_hover.gif";
            LCSemTagMenu.currentEvent = event;
            LCSemTagMenu.setCurrentElement(LCSemTagMenu.findLiveElementFromEventSource(imgElem));
         },

         deactivateHover : function(event) {
            var imgElem = lconn.core.bizCard.bizCardUtils.getElementFromEvent(event);
            if (imgElem)
               imgElem.src = lconn.core.bizCard.bizCardUtils.baseUrl + "/images/menu_selected_hover.gif";
            LCSemTagMenu.setCurrentElement(null);
         },

         showHover : function(event, clickHandler) {
            this.printDebug("in showHover");
            try {
               if (LCSemTagMenu.staticHover)
                  return;

               try {
                  // if focus was set from restoreFocus function and
                  // triggered a show event, skip showing and reset the
                  // focusRestored flag
                  if (LCSemTagMenu.focusRestored && event.type == "focus") {
                     LCSemTagMenu.printDebug("skipping showHover because focus was restored from hide timer...  event [" + event.type + "]. ");
                     LCSemTagMenu.focusRestored = false;
                     return;
                  }
               }
               catch (e) {
                  console.log("showHover: eat exception, IE has issues with certain events not having an event.type, so reset flag regardless");
                  LCSemTagMenu.focusRestored = false;
                  return;
               }

               LCSemTagMenu.originalActiveEl = document.activeElement;

               var elem = lconn.core.bizCard.bizCardUtils.getElementFromEvent(event);
               // in case of <img> enclosed in <a>, the image is the one that
               // gets the mouseover, but the <a> element is the one we want
               if (elem && elem.tagName.toLowerCase() == "img" && elem.parentNode.tagName.toLowerCase() == "a")
                  elem = elem.parentNode;

               // save the current hovered element's tabIndex and next
               // sibling for later restoration
               LCSemTagMenu.elemOrigTabIdx = elem.getAttribute("tabIndex");
               if (LCSemTagMenu.tabOrderByTabIndex && !LCSemTagMenu.elemOrigTabIdx) {
                  LCSemTagMenu.elemNext = elem.nextSibling;
                  elem.setAttribute("tabIndex", parseInt(Number(LCSemTagMenu.elemTempTabIdx))); // set
                  // temp
                  // tabIndex
                  // if
                  // element
                  // does
                  // not
                  // have
                  // a
                  // tabIndex
               }

               var tag = LCSemTagMenu.getMenuTag(elem);
               var origRefCnt = 0;
               if (elem && elem != LCSemTagMenu.currentElem) { // new hover
                  // request
                  LCSemTagMenu.clearAllSvcHandlers(tag);

                  origRefCnt = elem.getAttribute(lconn.core.bizCard.bizCardUtils.refcntAttr);
                  if (origRefCnt) {
                     LCSemTagMenu.currentEvent = event;
                     LCSemTagMenu.setCurrentElement(elem);
                  }
                  else {
                     LCSemTagMenu.printDebug("showHover called for a DOM element with no refcnt attribute!");
                     LCSemTagMenu.setCurrentElement(null);
                     return;
                  }
               }

               LCSemTagMenu.addSvcHandler(tag, clickHandler);

               // everybody called in = time to actually show hover
               LCSemTagMenu.setRefCount(origRefCnt);

               // RTC #82748
               // Issue occurs when we render the mini bizcard through the
               // renderMiniBizCard from another event.
               // This means that the bc_document_node could possibly be
               // created on a node other than the
               // one that it is normally created on (semtagmenu node). Once
               // this happens the normal bizcard
               // uses the mini bizcard node which could possibly be hidden
               // off the screen or doesnt have the
               // correct parent. This causes the page to jump to the
               // location of that bizcard node.

               // PMR #56213,122,000
               // Modified this logic to exclude the inline card for
               // communities, which was disappearing when the
               // page contained an inline community AND a popup profile
               // card.

               var bcDocNode = this._getCardNode();
               if (bcDocNode) {
                  var removeNode = true;
                  var bcDocParent = bcDocNode.parentNode;

                  while (bcDocParent) {
                     if (bcDocParent.className && (bcDocParent.className.indexOf('popupPersonCard') > -1 || bcDocParent.className.indexOf('vcomm') > -1)) {
                        removeNode = false;
                        break;
                     }
                     bcDocParent = bcDocParent.parentNode;
                  }

                  if (removeNode) {
                     bcDocNode.parentNode.removeChild(bcDocNode);
                  }
               }

               var out = new lconn.core.bizCard.bizCardUtils.out();
               LCSemTagMenu.writeHover(out, "ltr");
               tag.innerHTML = out.buffer;

               LCSemTagMenu.showing = true;

               var pos = LCSemTagMenu.currentElemPosition;
               LCSemTagMenu.show(LCSemTagMenu.id, event, Math.round(pos.x), LCSemTagMenu.hoverOffset.x, Math.round(pos.y), LCSemTagMenu.hoverOffset.y, Math
                     .round(pos.w), Math.round(pos.h), LCSemTagMenu.hoverOffset.w);
            }
            catch (e) {
               console.error("Error in LCSemTagMenu.showHover");
               console.error(e);
            }
         },

         addSvcHandler : function(tag, handler) {
            LCSemTagMenu.svcHandlers.push(on(tag, "click", handler));
         },

         clearAllSvcHandlers : function(tag) {
            while (0 < LCSemTagMenu.svcHandlers.length) {
               var handler = LCSemTagMenu.svcHandlers.pop();
               if (handler)
                  handler.remove();
            }
         },

         getPosition : function(node, includeScroll) {
            var ret = {
               x : 0,
               y : 0,
               w : 0,
               h : 0
            };

            if (_d.exists("dojo.position")) {
               ret = domGeometry.position(node, includeScroll);

            }
            else if (node["getBoundingClientRect"]) { // got from
               // dojo.position

               var db = _d.body()
               ret = node.getBoundingClientRect();
               ret = {
                  x : ret.left,
                  y : ret.top,
                  w : ret.right - ret.left,
                  h : ret.bottom - ret.top
               };
               if (_d.isIE) {
                  // On IE there's a 2px offset that we need to adjust for,
                  // see _getIeDocumentElementOffset()
                  var offset = _d._getIeDocumentElementOffset();

                  // fixes the position in IE, quirks mode
                  ret.x -= offset.x + (_d.isQuirks ? db.clientLeft + db.offsetLeft : 0);
                  ret.y -= offset.y + (_d.isQuirks ? db.clientTop + db.offsetTop : 0);
               }
               if (includeScroll) {
                  var scroll = _d._docScroll();
                  ret.x += scroll.x;
                  ret.y += scroll.y;
               }
            }

            // RTC #117457 - We need to detect if we are in an iframe, append
            // those coords into this
            try {
               var bodyElem = node.parentNode;
               while (bodyElem) { // Try to find the body element
                  if (bodyElem.tagName.toLowerCase() == "body")
                     break;
                  bodyElem = bodyElem.parentNode;
               }
               if (bodyElem) {
                  var hoverElem = _d.query('[id="' + LCSemTagMenu.id + '"]', bodyElem)[0]; // Look
                  // for
                  // the
                  // semtagmenu
                  // id.
                  if (!hoverElem) {
                     var htmlNode = bodyElem.parentNode;
                     var docNode = htmlNode.parentNode;
                     if (docNode.defaultView && docNode.defaultView.frameElement) {
                        // It's not found and we are in an iframe. Let's get
                        // a reference to the containing iframe and get those
                        // coords
                        var framepos = this.getPosition(docNode.defaultView.frameElement, false);
                        ret.x += framepos.x;
                        ret.y += framepos.y;
                     }
                  }
               }
            }
            catch (e) {
               console.error("getPosition for iFrame failed");
               console.error(e);
            }

            return ret;
         },
         setCurrentElement : function(elem) {
            LCSemTagMenu.currentElem = elem;
            if (elem != null) {
               LCSemTagMenu.currentElemPosition = this.getPosition(elem, true /*
                                                                               * offset
                                                                               * scroll
                                                                               */);
               LCSemTagMenu.setRefCount(elem ? Number(elem.getAttribute(lconn.core.bizCard.bizCardUtils.refcntAttr)) : 0);

               while (0 < LCSemTagMenu.headers.length)
                  LCSemTagMenu.headers.pop();
               while (0 < LCSemTagMenu.items.length)
                  LCSemTagMenu.items.pop();
               while (0 < LCSemTagMenu.footers.length)
                  LCSemTagMenu.footers.pop();
            }
         },

         setRefCount : function(cnt) {
            LCSemTagMenu.refCount = cnt;
         },

         setMenuData : function(event, items, cssClass, header, footer) {
            LCSemTagMenu.printDebug("Menu.setMenuData: items.length=" + items.length);

            if (!LCSemTagMenu.staticHover && LCSemTagMenu.refCount < 0) {
               LCSemTagMenu.printDebug("setMenuData called when refCount=" + LCSemTagMenu.refCount);
               return;
            }

            var elem = LCSemTagMenu.findLiveElementFromEventSource(lconn.core.bizCard.bizCardUtils.getElementFromEvent(event));
            if (!elem) {
               LCSemTagMenu.printDebug("setMenuData called on a null live element");
               return;
            }
            if (LCSemTagMenu.staticHover && // need to figure out the
            // current live element and its
            // ref count
            (elem != LCSemTagMenu.currentElem || LCSemTagMenu.showing)) {
               LCSemTagMenu.currentEvent = event;
               LCSemTagMenu.setCurrentElement(elem);
            }

            // LCSemTagMenu.waitCursor(); // need to do this only once,
            // but...

            for (var i = 0; i < items.length; i++)
               LCSemTagMenu.items.push(items[i]);
            if (cssClass)
               LCSemTagMenu.currentMenuCss = cssClass;
            if (header)
               LCSemTagMenu.headers.push(header);
            if (footer)
               LCSemTagMenu.footers.push(footer);

            // LCSemTagMenu.refCount--; // decrement for this current call

            // if (0 < LCSemTagMenu.refCount) return; // need to wait more
            // services to call in

            // everybody called in = time to actually show popup
            LCSemTagMenu.stopEvent(event); // eat it always - this method
            // is called upon ENTER as well
            LCSemTagMenu.showMenu();

            // Clear autohide timeouts if opened using an accessible keyboard
            // shortcut
            try {
               if (LCSemTagMenu.isAccessibleOpen)
                  LCSemTagMenu.clearTimeouts();
            }
            catch (e) {
               LCSemTagMenu.printDebug("ERROR checking isAccessibleOpen event flag: " + e);
            }
         },

         // public
         getCurrentElement : function() {
            return LCSemTagMenu.currentElem;
         },

         showMenu : function() {
            if (LCSemTagMenu.showing)
               LCSemTagMenu.hide(); // if we are showing something, hide it

            LCSemTagMenu.items.sort(lconn.core.bizCard.bizCardUtils.sortByOrder);
            if (1 < LCSemTagMenu.headers.length)
               LCSemTagMenu.headers.sort(lconn.core.bizCard.bizCardUtils.sortByOrder);
            if (1 < LCSemTagMenu.footers.length)
               LCSemTagMenu.footers.sort(lconn.core.bizCard.bizCardUtils.sortByOrder);

            var out = new lconn.core.bizCard.bizCardUtils.out();
            var bidiStyle = (SemTagSvcConfig.isBidiRTL ? "direction:rtl;" : "");
            var buffer = "";
            var nodeId = LCSemTagMenu.id + "Card";
            buffer += "<div id='" + nodeId + "' role='dialog' class='popupPersonCard' style='z-index:" + (LCSemTagMenu.getTopZIndex(nodeId) + 1)
                  + "; position:absolute;" + bidiStyle + "'>";
            if (0 < LCSemTagMenu.headers.length)
               buffer += LCSemTagMenu.headers[0].markup;
            // buffer += "<a href='javascript:a11y()'><a>"; //A11Y

            // TODO: this section renders code that is not usable in the
            // bizcard; cleanup
            /*
             * buffer += "<div class='" + (LCSemTagMenu.currentMenuCss?
             * LCSemTagMenu.currentMenuCss : "personMenuActions") + "'>"; buffer += "<ul>";
             * for (var i=0; i<LCSemTagMenu.items.length; i++) { item =
             * LCSemTagMenu.items[i]; buffer += "<li><a href='" + item.href +
             * "'>" + item.label + "</a></li>"; } buffer += "</ul>"; buffer += "</div>";
             */
            // TODO: end of section cleanup
            if (0 < LCSemTagMenu.footers.length)
               buffer += LCSemTagMenu.footers[0].markup;
            buffer += "</div>";
            out.write(buffer);

            var tag = LCSemTagMenu.getMenuTag();
            LCSemTagMenu.clearAllSvcHandlers(tag);
            LCSemTagMenu.offScreen(tag);
            tag.innerHTML = out.buffer;

            LCSemTagMenu.defaultCursor();
            if (LCSemTagMenu.staticHover && has("ff")) {
               var links = tag.getElementsByTagName("a"); // A11Y
               if (0 < links.length)
                  links[0].focus(); // NEEDSWORK this 'focus' remains if you
               // start using mouse to change the menu
               // selection...
            }

            var event = {
               "target" : LCSemTagMenu.currentElem
            }; // make a fake event
            var pos = LCSemTagMenu.currentElemPosition;
            LCSemTagMenu.show(LCSemTagMenu.id, event, Math.round(pos.x), LCSemTagMenu.menuOffset.x, Math.round(pos.y), LCSemTagMenu.menuOffset.y, Math
                  .round(pos.w), Math.round(pos.h), LCSemTagMenu.menuOffset.w);
         },

         createMenuTag : function(elem) {
            LCSemTagMenu.printDebug("in createMenuTag");

            var tag = windowModule.doc.createElement((LCSemTagMenu.tabOrderByDomNodeOrder ? "div" : "span"));
            tag.setAttribute("id", LCSemTagMenu.id);
            tag.setAttribute("role", "tooltip");
            tag.style.position = (LCSemTagMenu.tabOrderByDomNodeOrder ? "fixed" : "absolute");
            tag.style.display = "none";

            on(tag, "mouseout", LCSemTagMenu.mouseout);
            on(tag, "mouseover", LCSemTagMenu.mouseover);
            on(tag, "focus", LCSemTagMenu.focus);

            if (LCSemTagMenu.tabOrderByTabIndex)
               on(tag, "keydown", LCSemTagMenu.keydown);

            // add lotusui classes to semtag node if no lotusui on the body
            // already (such as integrated bizcard)
            if (!domClass.contains(windowModule.body(), "lotusui30_fonts")) {
               domClass.add(tag, "lotusui lotusui30 lotusui30dojo lotusui30_fonts lotusSpritesOn");
            }

            if (LCSemTagMenu.tabOrderByDomNodeOrder) {
               if (elem)
                  elem.parentNode.appendChild(tag);
               else
                  windowModule.body().insertBefore(tag, windowModule.body().firstChild);
            }
            else {
               windowModule.body().insertBefore(tag, windowModule.body().firstChild);
            }

            return tag;
         },

         getMenuTag : function(elem) {
            var tag = dom.byId(LCSemTagMenu.id);
            if (!tag)
               tag = this.createMenuTag(elem);

            // reset the tag's tabIndex to 1+ the hovered element's tabIndex
            if (LCSemTagMenu.tabOrderByTabIndex && typeof (elem) != "undefined" && elem != null) {
               var elemTabIdx = elem.getAttribute("tabIndex");
               if (elemTabIdx) {
                  tag.setAttribute("tabIndex", parseInt(Number(elemTabIdx) + 1));
               }
            }
            else if (LCSemTagMenu.tabOrderByDomNodeOrder) {
               if (elem)
                  elem.parentNode.appendChild(tag);
            }

            return tag;
         },

         windowWidth : function() {
            var winWidth = -1;
            var d = document;
            if (typeof window.innerWidth != 'undefined') {
               winWidth = window.innerWidth;
            }
            else {
               if (d.documentElement && typeof d.documentElement.clientWidth != 'undefined' && d.documentElement.clientWidth != 0) {
                  winWidth = d.documentElement.clientWidth;
               }
               else {
                  if (d.body && typeof d.body.clientWidth != 'undefined') {
                     winWidth = d.body.clientWidth;
                  }
               }
            }
            return winWidth;
         },

         windowHeight : function() {
            var winHeight = -1;
            var d = document;
            if (typeof window.innerHeight != 'undefined') {
               winHeight = window.innerHeight;
            }
            else {
               if (d.documentElement && typeof d.documentElement.clientHeight != 'undefined' && d.documentElement.clientHeight != 0) {
                  winHeight = d.documentElement.clientHeight;
               }
               else {
                  if (d.body && typeof d.body.clientHeight != 'undefined') {
                     winHeight = d.body.clientHeight;
                  }
               }
            }
            return winHeight;
         },

         show : function(pMenu, /* the popup element to show */
         e, /* the event that triggered us here */
         xpos, /* x position where to show the popup */
         xOffset, /* offset for x position */
         ypos, /* y position where to show the popup */
         yOffset, /* offset for y position */
         width, /* width of the element that the popup belongs to */
         height,/* height of the element that the popup belongs to */
         popupWidth /* width of popup itself */) {
            try {
               var ptagMenu = dom.byId(pMenu);

               if (width == null)
                  width = 0;
               if (height == null)
                  height = 0;
               if (popupWidth == null)
                  popupWidth = 0;
               var isBidi = SemTagSvcConfig.isBidiRTL;

               LCSemTagMenu.printDebug("in show..." + " Y,X:[" + ypos + "," + xpos + "]" + " offsets:[" + xOffset + "," + yOffset + "] " + "parent W,H:["
                     + width + "," + height + "] " + "popup width: " + popupWidth);
               xpos = xpos + xOffset;
               ypos = ypos + yOffset;

               var targetEl = (e.target) ? e.target : e.srcElement; /*
                                                                      * gets
                                                                      * event
                                                                      * target,
                                                                      * depending
                                                                      * on
                                                                      * browser
                                                                      */
               var top = (ypos != null ? ypos : lconn.core.bizCard.bizCardUtils.getEventAbsoluteY(e)); // get
               // Y
               // position
               // from
               // event
               // if Y
               // was
               // not
               // passed
               // in
               var left = (xpos != null ? xpos : lconn.core.bizCard.bizCardUtils.getEventAbsoluteX(e)); // get
               // X
               // position
               // from
               // event
               // if X
               // was
               // not
               // passed
               // in

               // browser window width and height
               var winWidth = this.windowWidth();
               var winHeight = this.windowHeight();

               // SCROLL CHECK
               var scrollX = document.body.scrollLeft;
               var scrollY = document.body.scrollTop;

               LCSemTagMenu.printDebug("in show...(init values)" + " top,left:[" + top + "," + left + "] " + "win height,width:[" + winHeight + "," + winWidth
                     + "] " + "scroll Y,X:[" + scrollY + "," + scrollX + "]");

               // RIGHT OFFSET POPUP ON BIDI
               // if we are in RTL, show popup off the right side of element
               // adjust the show placement to the right side of the target
               // element minus the offset
               if (isBidi) {
                  right = left - xOffset + width; // the right edge of the
                  // owner element
                  left = right - xOffset;
                  LCSemTagMenu.printDebug("in show...(bidi shift)" + " top,left:[" + top + "," + left + "]");
               }

               // EDGE CHECK
               // check if the popup will be off the window, nudge it to show
               // on the visible window area
               if (isBidi) {
                  if (left - popupWidth < 0) { // too close to left edge and
                     // we are popping offset to
                     // the left (rtl bidi)
                     left = popupWidth - xOffset + scrollX;
                     LCSemTagMenu.printDebug("in show...(nudge right)" + " top,left:[" + top + "," + left + "]");
                  }
               }
               else {
                  if (left + popupWidth > winWidth) {
                     left = winWidth - popupWidth - xOffset + scrollX;
                     LCSemTagMenu.printDebug("in show...(nudge left)" + " top,left:[" + top + "," + left + "]");
                  }
               }

               // FOR PORTAL ONLY
               if (SemTagSvcConfig.isPortal) {
                  LCSemTagMenu.printDebug("in show...(in PORTAL start)" + " top,left:[" + top + "," + left + "]");

                  // NEEDSWORK ugly, ugly, ugly
                  // SemTagUtil.log("before IFRAME adjust (" + left + "," +
                  // top + ")"); //HMdebug
                  // SemTagUtil.log( "ownerDoc=" + targetEl.ownerDocument );
                  // //HMdebug
                  // SemTagUtil.log( "location=" +
                  // targetEl.ownerDocument.location ); //HMdebug
                  var od = SemTagUtil.getOwnerDocument(targetEl);
                  if (od && od.location != document.location) { // okay,
                     // I'm in a
                     // child
                     // page
                     // (IFRAME)...
                     var f = SemTagUtil.getFrameElement(targetEl);
                     if (f) {
                        // fix for defect 201052,now displaying hover wrt
                        // live object
                        var el = f.offsetParent;
                        var x = 0, y = 0;

                        while (el) {
                           x += el.offsetLeft;
                           y += el.offsetTop;
                           el = el.offsetParent;
                        }
                        var lof = targetEl.offsetParent;
                        var xx = 0, yy = 0;
                        while (lof) {
                           xx += lof.offsetLeft;
                           yy += lof.offsetTop;
                           lof = lof.offsetParent;
                        }
                        if (f.id == 'wpsFLY_flyoutIFrame') { // ugly, but
                           // works
                           // top += f.parentNode.offsetTop;
                           // left += f.parentNode.offsetLeft;
                           top = y + yy + targetEl.offsetHeight;
                           left = x + xx + targetEl.offsetWidth;
                        }
                        else {
                           top += f.offsetTop;
                           left += f.offsetLeft;
                        }
                        // Code fix for scrolling defect 193500--Start
                        if (SemTagUtil.isGecko && f.id == 'wpsFLY_flyoutIFrame') {
                           iframeScrollLeft = f.contentWindow.pageXOffset;
                           iframeScrollTop = f.contentWindow.pageYOffset;
                           // alert("FF-- iframeScrollLeft :
                           // "+iframeScrollLeft + "iframeScrollTop: "
                           // +iframeScrollTop);
                        }
                        if (!SemTagUtil.isGecko && f.id == 'wpsFLY_flyoutIFrame') {
                           iframeScrollLeft = f.contentWindow.document.body.parentNode.scrollLeft;
                           iframeScrollTop = f.contentWindow.document.body.parentNode.scrollTop;
                           // alert("IE-- iframeScrollLeft :
                           // "+iframeScrollLeft + "iframeScrollTop: "
                           // +iframeScrollTop);
                        }

                        top -= iframeScrollTop;
                        left -= iframeScrollLeft;
                        // Code fix for scrolling defect 193500--End
                     }
                  }
                  LCSemTagMenu.printDebug("in show...(in PORTAL end)" + " top,left:[" + top + "," + left + "]");
               } // end of isPortal custom position code

               LCSemTagMenu.printDebug("in show...(final)" + " top,left:[" + top + "," + left + "]");
               ptagMenu.style.top = top + "px";
               ptagMenu.style.left = left + "px";
               ptagMenu.style.display = "block";
               LCSemTagMenu.showing = true;

               if (SemTagSvcConfig.isPortal)
                  ptagMenu.style.zIndex = "900";

               // Containing the iframe to IE only. Having this iframe
               // confuses JAWS with Firefox and breaks A11Y
               // for the ctrl-enter keyboard access of the bizcard.
               if (has("ie")) {

                  // TODO: explain why we need an iframe
                  var iframe = dom.byId("tempIframe");
                  if (iframe == null) {
                     iframe = document.createElement("iframe");
                     iframe.setAttribute('id', "tempIframe");
                     iframe.setAttribute('frameBorder', 'no');
                     iframe.setAttribute('scrolling', 'no');
                     iframe.setAttribute('src', lconn.core.bizCard.bizCardUtils.baseUrl + '/nav/blankIE.html'); // SPR#MESA7LYMLT
                     // IE6
                     // warns
                     // of
                     // non
                     // SSL
                     // over
                     // SSL
                     // if
                     // iframe
                     // src
                     // is
                     // blank
                     // and we need to make the iframe "layer" right under
                     // the popup container, whose z-index is 900
                     // iframe.setAttribute( 'style', 'position: absolute;
                     // left: 0; top: 0; z-index:899;' );
                     iframe.style.position = "absolute";
                     iframe.style.left = left + "px";
                     iframe.style.top = top + "px";
                     iframe.width = (ptagMenu.offsetWidth).toString() + 'px';
                     iframe.height = (ptagMenu.offsetHeight).toString() + 'px';
                     // iframe.width=width;
                     // iframe.height=height;
                     iframe.style.display = "block";
                     iframe.style.zIndex = "899";
                     document.body.appendChild(iframe);

                  }
                  else {
                     iframe.style.left = left + "px";
                     iframe.style.top = top + "px";
                     iframe.width = (ptagMenu.offsetWidth).toString() + 'px';
                     iframe.height = (ptagMenu.offsetHeight).toString() + 'px';
                     iframe.style.display = "block";

                  }
               }

               LCSemTagMenu.showing = true;
               LCSemTagMenu.focusA11Y(pMenu);
            }
            catch (e) {
               console.error("LCSemTagMenu.show: Exception Caught: ");
               console.log(e);
            }
         },

         _getCardNode : function(mainNode) {
            var cardNode = null;
            try {
               // find the first node whode ID starts with bc_document_node
               query("*[id^='bc_document_node']", mainNode || document).some(function(node) {
                  cardNode = node;
                  return node;
               });
            }
            catch (e) {
            }

            return cardNode;
         },

         focusA11Y : function(focusNode) {
            try {
               var docNode = this._getCardNode(focusNode);

               if (LCSemTagMenu.showing && docNode) {

                  // this builds an array of tabbable nodes within the
                  // business card
                  // so we can set the focus to te first/last depending on
                  // whether the user
                  // is tabbing forward or backward.
                  var validnodes = [];
                  query("a,*:not([id^=\"A11Y\"],[tabindex=\"0\"]", docNode).forEach(function(node) {
                     var ok = true;
                     var pNode = node;
                     while (pNode && pNode != docNode) {
                        if (domStyle.get(pNode, "display") == "none") {
                           ok = false;
                           break;
                        }
                        pNode = pNode.parentNode;
                     }
                     if (ok) {
                        validnodes.push(node);
                     }
                  });

                  if (this.lastEventKeycode_ && this.lastEventKeycode_.keyCode == 9 && this.lastEventKeycode_.shiftKey) {

                     // get the last element and skip to it.
                     if (validnodes.length > 0) {
                        validnodes[validnodes.length - 1].focus();
                     }
                     else {
                        LCSemTagMenu.printDebug("focusA11Y:  could not find an element to focus.");
                     }

                  }
                  else {

                     // get the first element and skip to it.
                     if (validnodes.length > 0) {
                        validnodes[0].focus();
                     }
                     else {
                        LCSemTagMenu.printDebug("focusA11Y:  could not find an element to focus.");
                     }
                  }
                  this.lastEventKeycode_ = null;

                  // show the section for the screen reader to pick up.
                  els = query("#A11YReader", docNode).forEach(function(node) {
                     domStyle.set(node, "display", "inline");
                  });
               }
            }
            catch (e) {
               LCSemTagMenu.printDebug("focusA11Y:  could not focus element. Exception: " + e);
            }
            ;
         },

         hide : function(pMenu, e) {
            LCSemTagMenu.printDebug("in hide");
            LCSemTagMenu.clearTimeouts(); // first clear all timers since we
            // are hiding

            var tag = LCSemTagMenu.getMenuTag();
            if (!tag)
               return false;

            tag.style.display = "none";
            LCSemTagMenu.clearAllSvcHandlers(tag);
            LCSemTagMenu.defaultCursor();
            LCSemTagMenu.setCurrentElement(null);

            var iframe = dom.byId("tempIframe");
            if (iframe)
               iframe.style.display = "none";

            LCSemTagMenu.showing = false;
            return true;
         },

         restoreFocus : function() {
            // restore the keyboard focus to whoever had it last...
            LCSemTagMenu.printDebug("in restoreFocus");
            try {
               // reset tabIndex of element to its original tabIndex
               var elem = LCSemTagMenu.originalActiveEl; // LCSemTagMenu.getCurrentElement(
               // );
               if (elem) {
                  if (LCSemTagMenu.tabOrderByTabIndex && elem && elem.getAttribute("tabIndex")) {
                     tag.setAttribute("tabIndex", null);
                     elem.setAttribute("tabIndex", LCSemTagMenu.elemOrigTabIdx);
                  }

                  // focus if we don't have a download window or we have one
                  // but it is not open. See RTC#66931
                  if (!lconn.profiles.bizCard.bizCardUI.wndh_vCard
                        || (lconn.profiles.bizCard.bizCardUI.wndh_vCard && lconn.profiles.bizCard.bizCardUI.wndh_vCard.closed)) {
                     LCSemTagMenu.focusRestored = true; // see showHover
                     // function for
                     // explanation of
                     // focusRestored
                     LCSemTagMenu.originalActiveEl.focus();
                     window.setTimeout('LCSemTagMenu.focusRestored = false;', 500); // safety
                     // net:
                     // if
                     // the
                     // refocus
                     // did
                     // not
                     // trigger
                     // a
                     // showHover
                     // where
                     // focusRestored
                     // would
                     // be
                     // reset,
                     // then
                     // reset
                     // it
                     // on
                     // this
                     // timer
                  }
               }
            }
            catch (e) {
               console.error("LCSemTagMenu.restoreFocus: could not restore focus.  Exception: " + e)
            }
         },

         offScreen : function(pMenu) {
            pMenu.style.top = "-1000px";
            pMenu.style.left = "-1000px";
            pMenu.style.display = "block";
         },

         findLiveElementFromEventSource : function(eventSrc) {
            if (LCSemTagMenu.staticHover) {
               var id = eventSrc.id;
               if (!id.match(LCSemTagMenu.hoverIdRE)) {
                  var children = eventSrc.getElementsByTagName("img"); // NEEDSATTN
                  for (var i = 0; i < children.length; i++) {
                     if (children[i].id && children[i].id.match(LCSemTagMenu.hoverIdRE)) {
                        id = children[i].id;
                        break;
                     }
                  }
               }
               var idx = id.substr(lconn.core.bizCard.bizCardUtils.hoverIdPrefix.length);
               return document.getElementById(lconn.core.bizCard.bizCardUtils.liveElemPrefix + idx);
            }
            else {
               var liveElem = LCSemTagMenu.getCurrentElement();
               return liveElem ? liveElem : eventSrc;
            }
         },

         findHoverFromLiveElement : function(liveElem) {
            var idx = liveElem.getAttribute(lconn.core.bizCard.bizCardUtils.hoverIdPrefix + "idx");
            return document.getElementById(lconn.core.bizCard.bizCardUtils.hoverIdPrefix + idx);
         },

         // check to see if the event occured in the menu
         inMenu : function(menuElem, event) {
            if (!menuElem || !event)
               return false;
            if (!LCSemTagMenu.showing)
               return false; // if we are not showing, we can't be over the
            // menu

            try {
               var el = lconn.core.bizCard.bizCardUtils.getElementFromEvent(event);

               // if event was mouse in/out, set the element to the mouse'd
               // toElement recorded in the event, or to the body if no
               // toElement in the event
               if ((event.type == "mouseout" || event.type == "mouseover")) {
                  el = (event.toElement ? event.toElement : windowModule.body());
                  LCSemTagMenu.printDebug("moused to: id:[" + el.id + "] tag:[" + el.tagName + "]");
               }

               while (el && el.parentNode && (el = el.parentNode)) { // traverse
                  // up
                  // the
                  // parent
                  // node
                  // family
                  // until
                  // no
                  // more
                  // parents
                  if (el === menuElem) {// if a node is the semtagmenu,
                     // event occured in the menu...
                     // return true
                     return true;
                  }
               }
               return false;
            }
            catch (e) {
               // eat exception
               console.log("inMenu: eat exception, IE has issues with certain events not having an event.type");
               return false;
            }
         },

         mouseout : function(event) {
            LCSemTagMenu.printDebug("in mouseout..." + event);

            var menuId = LCSemTagMenu.id;
            menuElem = dom.byId(menuId);
            if (LCSemTagMenu.inMenu(menuElem, event)) {
               LCSemTagMenu.printDebug("mouseout: moused-out off element but we are on menu");
            }
            else {
               if (LCSemTagMenu.showing) {
                  LCSemTagMenu.startHideTimer(menuId);
               }
               else { // not showing anything, clear any timers
                  LCSemTagMenu.clearTimeouts();
               }
            }
         },

         mouseover : function(event) {
            // if we're over the menu, clear timeouts so it doesn't hide
            LCSemTagMenu.printDebug("in mouseover..." + event);
            LCSemTagMenu.clearTimeouts();
         },

         focus : function(event) {
            LCSemTagMenu.printDebug("in focus..." + event);
            LCSemTagMenu.mouseover(event);
         },

         unfocus : function(event) {
            LCSemTagMenu.printDebug("in unfocus..." + event);
            LCSemTagMenu.mouseout(event);
         },

         click : function(event) {
            LCSemTagMenu.printDebug("in click..." + event);
            if (!event)
               return;

            if (LCSemTagMenu.showing) {
               // hide if we clicked anywhere outside the popup element
               var el = lconn.core.bizCard.bizCardUtils.getElementFromEvent(event);
               if (el && el.className != "lotusVCardHover") {
                  menuElem = dom.byId(LCSemTagMenu.id);
                  if (!LCSemTagMenu.inMenu(menuElem, event))
                     LCSemTagMenu.hide(LCSemTagMenu.id);
               }
            }
         },

         lastEventKeycode_ : null,
         keydown : function(event) {
            LCSemTagMenu.printDebug("in keydown..." + event);
            LCSemTagMenu.catchEscape(event);
            LCSemTagMenu.catchTab(event);
            LCSemTagMenu.catchCtrlEnter(event);

            LCSemTagMenu.lastEventKeycode_ = {
               "keyCode" : event.keyCode,
               "shiftKey" : event.shiftKey,
               "altKey" : event.altKey,
               "ctrlKey" : event.ctrlKey
            };

         },

         catchEscape : function(event) {
            if (event.keyCode == 27) {
               if (LCSemTagMenu.showing) {
                  LCSemTagMenu.hide(LCSemTagMenu.id);
                  LCSemTagMenu.isAccessibleOpen = false;
                  LCSemTagMenu.restoreFocus();
               }
            }
         },

         catchTab : function(event) {
            if (event.keyCode == 9) {
               try {
                  // if focus is atlast element of card, reset focus to first
                  // element of card
                  if (LCSemTagMenu.showing && document.activeElement.id == "A11YLast")
                     LCSemTagMenu.focusA11Y();

                  // if showing hover, tabbing next will
                  if (LCSemTagMenu.showing && query(".lotusVCardHover", dom.byId(LCSemTagMenu.id)).length) // we
                     // pressed
                     // tab
                     // while
                     // showing
                     // the
                     // hoverbox
                     LCSemTagMenu.hide();
               }
               catch (e) {
                  // eat exception
                  LCSemTagMenu.printDebug("catchTab:  could not check if current element is A11YLast id. Exception: " + e)
               }

            }
         },

         catchCtrlEnter : function(event) {
            if (event.ctrlKey && (event.keyCode == 13)) { // Ctrl + Enter
               if (event.preventDefault)
                  event.preventDefault(); // cancel browser chrome events for
               // this keystroke
               try {
                  event.isAccessibleOpen = true;
               }
               catch (e) {
                  if (this.isDebug)
                     console.log("ERROR setting isAccessibleOpen event flag: " + e);
               }
               lconn.profiles.bizCard.bizCard.showMenu(event);
               if (!this.getCurrentElement()) {
                  var elem = lconn.core.bizCard.bizCardUtils.getLiveElementFromEvent(event);
                  this.setCurrentElement(elem);
               }
            }
         },

         stopEvent : function(event) {
            if (!event)
               return;

            if (has("ff")) {
               if (event.preventDefault == null)
                  event = event.original;
               event.preventDefault();
               event.stopPropagation();
            }
            else {
               try {
                  if (event.returnValue == null)
                     event = event.original;
                  event.returnValue = false;
                  event.cancelBubble = true;
               }
               catch (e) {
                  // In IE, when Person menu sends a server request out
                  // (passing browser
                  // cache), IE will somehow manage to corrupt this click
                  // event it had sent
                  // out earlier, and it causes silent error (abort) while
                  // doing the above.
               }
            }
         },

         startShowTimer : function(event, handler, millisecsArg) {
            LCSemTagMenu.printDebug("in startShowTimer");
            var millisecs = (typeof (millisecsArg) == "number" ? millisecsArg : LCSemTagMenu.showDelay); // use
            // arg
            // if
            // supplied,
            // otherwise
            // object
            // default
            if (0 < millisecs) {
               var t = window.setTimeout(function() {
                  LCSemTagMenu.showHover(event, handler);
               }, millisecs);
               LCSemTagMenu.timeouts.push(t);
               LCSemTagMenu.printDebug("...timer to show (" + t + ") started, " + millisecs + "ms");
            }
         },

         startHideTimer : function(menuId, millisecsArg) {
            LCSemTagMenu.printDebug("in startHideTimer");
            var millisecs = (typeof (millisecsArg) == "number" ? millisecsArg : LCSemTagMenu.hideDelay); // use
            // arg
            // if
            // supplied,
            // otherwise
            // object
            // default
            if (0 < millisecs) {
               var t = window.setTimeout(function() {
                  LCSemTagMenu.endHideTimer(menuId);
               }, millisecs);
               LCSemTagMenu.printDebug("...timer to hide (" + t + ") started, " + millisecs + "ms for " + menuId);
               LCSemTagMenu.timeouts.push(t);
            }
         },

         endHideTimer : function(menuId) {
            LCSemTagMenu.printDebug("HIDE TIMER expired for " + menuId + ".  Firing hide method.");
            menuElem = dom.byId(menuId);
            LCSemTagMenu.hide(menuId);
            LCSemTagMenu.restoreFocus();
         },

         clearTimeouts : function() {
            LCSemTagMenu.printDebug("in clearTimeouts:  (" + LCSemTagMenu.timeouts + ")");
            while ((t = LCSemTagMenu.timeouts.pop()))
               window.clearTimeout(t);
         },

         defaultCursor : function() {
            document.body.style.cursor = "default";
         },

         waitCursor : function() {
            document.body.style.cursor = "wait";
         },

         clickCursor : function() {
            document.body.style.cursor = "pointer";
         }
      };

      LCSemTagMenu.defaultLoaded = true;

      LCSemTagMenu.getTopZIndex = function(skipNodeId) {
         var highest_zIndex = 0;
         query("[style*='z-index']").forEach(function(node, index, arr) {
            if (!skipNodeId || node.id != skipNodeId)
               highest_zIndex = ((zIdx = parseInt(domStyle.get(node, "zIndex"), 10)) > highest_zIndex ? zIdx : highest_zIndex);
         });
         return highest_zIndex;
      }

      LCSemTagMenu.writeHover = function(out, bidi) {

         // RTC #47433 - Needed to add top: 0 style for backwards
         // compatibility since
         // some client css for onev2 (Quickr Domino uses this) set the top
         // to -9999px.
         // With the new bizcard work, this is no longer necessary since the
         // containing
         // div is off the page so we need to override this top style so the
         // hover will
         // display on the page.
         var nodeId = LCSemTagMenu.id + "Box";
         var style = "z-index:" + (LCSemTagMenu.getTopZIndex(nodeId) + 1) + "; opacity: 1; top: 0;";

         initMessages();

         out.write("<a id='" + nodeId + "' class='lotusVCardHover' " + " onmouseover='javascript:LCSemTagMenu.clickCursor();'"
               + " onmouseout='javascript:LCSemTagMenu.defaultCursor();'" + " style='" + style + "' " + ">" + messages["label.semtag.hover.altA11Y"] + "</a>");
      };

      // TODO replace this utility with dojo.io.script
      window.LCSemTagUtil = {

         /**
          * Object to issue cross-domain AJAX calls. This object uses a dynamic
          * script generation/removal process. This is required due to the
          * security restrictions placed on XMLHttpRequest
          */
         crossDomainRequest : function() {
            var openConnectionMapping = new Array();
            var requestSrcElements = new Array();
            var openConnectionTimer = new Array();
            var self = this;
            // var nextConnectionId = 0;

            createTimeoutFunction = function(connectionId) {
               return function() {
                  self.cancelRequest(connectionId);
               }
            };

            this.getScriptId = function(id) {
               return "_JVLN_" + id;
            };

            this.getScriptObject = function(id) {
               return document.getElementById(this.getScriptId(id));
            };

            // this.getNextConnectionId = function() {
            // return ++nextConnectionId;
            // };

            this.cloneObject = function(obj) {
               var newObj = new Object();
               for (i in obj) {
                  newObj[i] = obj[i];
               }

               return newObj;
            };

            this.request = function(url, timeLimit, callback, srcElement, connectionId) {
               LCSemTagMenu.printDebug("LCSemTagUtil.request: started");
               LCSemTagMenu.printDebug("LCSemTagUtil.request: connectionId " + connectionId);

               connectionId = connectionId.toLowerCase();
               var objId = this.getScriptId(connectionId);

               LCSemTagMenu.printDebug("LCSemTagUtil.request: objId " + objId);

               if (callback != null) {
                  openConnectionMapping[connectionId] = callback;
               }

               if (srcElement != null) {
                  if (!has("ff"))
                     requestSrcElements[connectionId] = this.cloneObject(srcElement);
                  else
                     requestSrcElements[connectionId] = srcElement;
               }

               var script = document.createElement("script");
               script.id = objId;
               script.type = "text/javascript";
               script.defer = true;

               try {
                  script.src = url;
                  LCSemTagMenu.printDebug("LCSemTagUtil.request: url: " + url);
               }
               catch (e) {
                  LCSemTagMenu.printDebug("LCSemTagUtil.request: error:", e);
                  return false;
               }

               // NOTE: IE6 behaves inconsistently when loading scripts
               // within the HEAD element, regardless of defer attribute,
               // At times, IE6 will load and execute the script before the
               // body is loaded (which will crash IE - SPR#LSOO7J6LKZ)
               // and at other times it will exec the script after body is
               // loaded, which will work as expected
               try {
                  var body = document.getElementsByTagName('body');
                  if (body[0])
                     body[0].appendChild(script);
                  else {
                     LCSemTagMenu.printDebug("LCSemTagUtil.request: error getting body element to insert script:" + script.id);
                     return false;
                  }
               }
               catch (e) {
                  LCSemTagMenu.printDebug("LCSemTagUtil.request: error:", e);
                  return false;
               }

               LCSemTagMenu.printDebug("LCSemTagUtil.request: added script: " + script.id);
               if (timeLimit) {
                  var self = this;
                  openConnectionTimer[connectionId] = window.setTimeout(createTimeoutFunction(connectionId), timeLimit);
               }
            };

            this.cancelRequest = function(id) {
               LCSemTagMenu.printDebug("LCSemTagUtil.cancelRequest:  Request [" + id + "] took too long.  Cancelling request for id: "
                     + openConnectionTimer[id]);

               // If the connection is still open, gracefully clean it up and
               // report this to the user
               var callback = openConnectionMapping[id];
               openConnectionMapping[id] = null;

               var srcElem = requestSrcElements[id];
               requestSrcElements[id] = null;

               if (callback != null) {
                  try {
                     if (callback)
                        callback(false, null, srcElem);
                     this.removeScript(id);
                  }
                  catch (e) {
                     LCSemTagMenu.printDebug("LCSemTagUtil.cancelRequest: Exception Caught: " + e);
                  }
               }
               else
                  LCSemTagMenu.printDebug("LCSemTagUtil.cancelRequest: no callback for : " + id);
            };

            this.removeScript = function(id) {
               LCSemTagMenu.printDebug("LCSemTagUtil.removeScript: removing script element for: " + id);
               if (id) {
                  var script = this.getScriptObject(id);
                  if (script != null) {
                     var body = document.getElementsByTagName('body');
                     body[0].removeChild(script);
                     LCSemTagMenu.printDebug("LCSemTagUtil.removeScript: removed script for id: " + id);
                  }
                  else
                     LCSemTagMenu.printDebug("LCSemTagUtil.removeScript: script is null for id: " + id);
               }
               else {
                  LCSemTagMenu.printDebug("LCSemTagUtil.removeScript: id is null");
               }
            };

            this.dispatch = function(id, data) {
               LCSemTagMenu.printDebug("LCSemTagUtil.dispatch: id: " + id);
               if (id != null) {
                  id = id.toLowerCase();
               }
               try {
                  // request dispatched, so first thing is to clear the timer
                  // set by the request
                  if (id != null && typeof (openConnectionTimer[id]) != "undefined" && openConnectionTimer[id] != null) {
                     LCSemTagMenu.printDebug("request dispatched. removing timeout for id [" + id + "]  timeout id: " + openConnectionTimer[id]);
                     window.clearTimeout(openConnectionTimer[id]);
                  }

                  // Clean up the entry
                  var callback = openConnectionMapping[id];
                  var srcElem = requestSrcElements[id];
                  requestSrcElements[id] = null;

                  if (callback != null) {
                     openConnectionMapping[id] = null;

                     // Call the specified callback function
                     callback(true, data, srcElem);

                     // remove script after we have given a chance to the
                     // calling request to evacuate the script we are about
                     // to remove
                     // otherwise IE6 will crash intermittently, given it is
                     // a timing issue: SPR#LSOO7J6LKZ
                     window.setTimeout(function() {
                        self.removeScript(id);
                     }, 1000);
                  }
                  else
                     LCSemTagMenu.printDebug("LCSemTagUtil.dispatch: callback is null for id: " + id);
               }
               catch (e) {
                  console.error("LCSemTagUtil.dispatch: Exception Caught: ");
                  console.log(e);
               }
            };

         } // end of object: crossDomainRequest
      };

      /**
       * Initializes the semantic tag service - modules that dojo.require these
       * utils should contribute to livetextCfg and set config.baseUrl prior the
       * page load (or before the script that loads bizCardUtils finishes
       * executing).
       */
      var existingService = window.SemTagSvc;
      var service = window.SemTagSvc = (existingService || new serviceImpl());
      var livetextCfg = window.livetextCfg = (window.livetextCfg || []);

      var config = window.SemTagSvcConfig = (window.SemTagSvcConfig || {});

      // Ensure the proxy settings are availble for the proxyURL and dojo
      // config proxy
      if (!config.proxyURL && dojo.config.proxy) {
         config.proxyURL = dojo.config.proxy;
      }
      else if (config.proxyURL && !dojo.config.proxy) {
         dojo.config.proxy = config.proxyURL;
      }

      config.appChksum = configModule.versionStamp;
      window.doUIExtensionConfigOnload = function() {};

      dojo.addOnLoad(function() {
         // Ensure the current script finishes executing prior to calling
         // init
         setTimeout(function() {
            if (dojo.config.isDebug) {
               console.debug("Initialize semantic tag service");
            }
            config.isBidiRTL = !dojo._isBodyLtr();
            if (!existingService)
               service.init();
            lconn.core.bizCard.bizCardUtils.init();
         }, 1);
      });

      return lconn.core.bizCard.bizCardUtils;
   });
