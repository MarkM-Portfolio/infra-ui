/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo/_base/array",
      "dojo/_base/config",
      "dojo/_base/lang",
      "dojo/_base/window",
      "dojo/dom",
      "dojo/dom-attr",
      "dojo/dom-construct",
      "dojo/dom-geometry",
      "dojo/has",
      "dojo/query",
      "ic-core/util/Url",
      "ic-core/config",
      "ic-core/config/features",
      "ic-core/config/properties",
      "ic-core/config/services",
      "ic-core/url"
],
   function(array, dojoConfig, lang, win, dom, domAttr, domConstruct, domGeometry, has, queryModule, Url, config, has, properties, services, urlModule) {

      /**
       * Helper object that manages the Connections theme
       * 
       * @namespace ic-core.theme
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      var originalThemeId, defaultThemeId, currentAppName, originalPath, themeUrl, currentThemeId, resourceUrl, resourceQuery;

      // Proxy support for Portal
      var URL_REWRITER = '_css_url_rewriter';
      window[URL_REWRITER] = typeof window[URL_REWRITER] === 'function' ? window[URL_REWRITER] : function(url) {
         return url;
      };

      // FIXME: rename to lconn*
      var LCONN_BASE_STYLESHEET = "lotusBaseStylesheet", LCONN_APP_STYLESHEET = "lotusAppStylesheet", LCONN_THEME_STYLESHEET = "lotusThemeStylesheet", LCONN_SPRITES_STYLESHEET = "lotusSpritesStylesheet", STYLESHEET = "stylesheet";

      var DEFAULT_THEME_PROPERTY_NAME = "com.ibm.lconn.core.web.styles.theme.default", DEFAULT_ONEUI_THEME_ID = "default", HIKARI_THEME_ID = "hikari", GEN4_THEME_ID = "gen4";
      function getDefaultThemeId() {
         return has("hikari-default-theme") ? HIKARI_THEME_ID : (properties[DEFAULT_THEME_PROPERTY_NAME] || GEN4_THEME_ID);
      }

      function initThemeInfo() {
         var baseLink = dom.byId(LCONN_BASE_STYLESHEET), themeLink = dom.byId(LCONN_THEME_STYLESHEET), spritesLink = dom.byId(LCONN_SPRITES_STYLESHEET), appLink = dom
               .byId(LCONN_APP_STYLESHEET);

         // use information on the base link
         if (!themeUrl && baseLink) {
            resourceUrl = domAttr.get(baseLink, "base") || domAttr.get(baseLink, "href").substr(0, domAttr.get(baseLink, "href").indexOf("_style"));

            themeUrl = new Url(resourceUrl);
            themeUrl.query = domAttr.get(baseLink, "query") || (themeLink ? domAttr.get(themeLink, "href").substr(domAttr.get(themeLink, "href").indexOf("?")) : "");
            originalPath = themeUrl.path;

            currentThemeId = originalThemeId = domAttr.get(baseLink, "theme") || getDefaultThemeId();
            defaultThemeId = domAttr.get(baseLink, "defaultTheme") || originalThemeId;
            currentAppName = domAttr.get(baseLink, "appName") || lang.getObject("ibmConfig.serviceName");

            // Use values from the baseLink to maintain consistency
            resourceUrl += "com.ibm.lconn.core.styles.oneui" + (domAttr.get(baseLink, "oneui") || 3) + "/";
            // TODO: debug mode
            // TODO: bidi
            resourceQuery = "?etag=" + encodeURIComponent(themeUrl.getQuery().etag);
         }
         return {
            baseLink : baseLink,
            themeLink : themeLink,
            spritesLink : spritesLink,
            appLink : appLink
         };
      }

      function removeThemeLink(themeLink) {
         if (themeLink) {
            themeLink.id = "";
            setTimeout(function() {
               var parent_ = themeLink.parentNode;
               if (parent_) {
                  parent_.removeChild(themeLink);
               }
            }, 1);
         }
         return themeLink;
      }

      function isRTL() {
         return !domGeometry.isBodyLtr();
      }

      function getStyleBase() {
         return urlModule.getServiceUrl(services.webresources);
      }

      function decorateUrl(theUrl, params) {
         if (theUrl) {
            params = params || {};
            if (dojoConfig.isDebug)
               params.debug = true;
            else
               params.etag = encodeURIComponent(lang.getObject("ibmConfig.versionStamp"));
            theUrl = new Url(urlModule.rewrite(theUrl, params));
         }
         return window[URL_REWRITER](theUrl);
      }

      var _seq = 0;
      function seq() {
         return _seq++;
      }

      function createStyleSheet(link, theUrl) {
         if (has("ie") >= 9 && has("ie") < 11)
            return document.createStyleSheet(theUrl.toString()).owningElement;
         else if(has("ie") >= 11){
        	 var linkTag = document.createElement("link");
       	  	 linkTag.href = theUrl.toString();
       	  	 linkTag.type = "text/css";
       	  	 linkTag.rel = "stylesheet";
       	  	 return linkTag;
         }
         else {
            s = link.cloneNode(true);
            s.href = theUrl.toString();
            return s;
         }
      }

      var theme = {};

      lang.mixin(theme, /** @lends ic-core.theme */
      {
         /**
          * Callers may invoke this method to add the base Connections
          * stylesheet.
          */
         addBaseStylesheet : function() {
            initThemeInfo();
            if (!dom.byId(LCONN_BASE_STYLESHEET)) {
               var baseUrl = decorateUrl(getStyleBase() + "/web/_style", {
                  "include" : isRTL() ? "com.ibm.lconn.core.styles.oneui3/base/package3RTL.css" : "com.ibm.lconn.core.styles.oneui3/base/package3.css"
               });
               if (!dojoConfig.isDebug)
                  baseUrl.query += "&etag=" + encodeURIComponent(lang.getObject("ibmConfig.versionStamp"));
               var baseLink = domConstruct.create("link", {
                  id : LCONN_BASE_STYLESHEET,
                  rel : STYLESHEET,
                  path : baseUrl.path,
                  query : baseUrl.query,
                  href : baseUrl.toString()
               }, queryModule("head")[0]);
            }
            return this;
         },
         /**
          * Callers may invoke this method to add the Connections sprites
          * stylesheet.
          */
         addSpritesStylesheet : function() {
            initThemeInfo();
            if (!dom.byId(LCONN_SPRITES_STYLESHEET)) {
               var baseUrl = decorateUrl(getStyleBase() + "/web/_style", {
                  "include" : isRTL() ? "com.ibm.lconn.core.styles.oneui3/spritesRTL.css" : "com.ibm.lconn.core.styles.oneui3/sprites.css"
               });
               if (!dojoConfig.isDebug)
                  baseUrl.query += "&etag=" + encodeURIComponent(lang.getObject("ibmConfig.versionStamp"));
               var baseLink = domConstruct.create("link", {
                  id : LCONN_SPRITES_STYLESHEET,
                  rel : STYLESHEET,
                  path : baseUrl.path,
                  query : baseUrl.query,
                  href : baseUrl.toString()
               }, queryModule("head")[0]);
            }
            return this;
         },
         /**
          * Callers may invoke this method to add the Connections stylesheet for
          * the current theme.
          * 
          * @param {string}
          *           [themeId] Name of the theme e.g. 'red'. If not provided,
          *           the current default theme will be used.
          */
         addThemeStylesheet : function(themeId) {
            initThemeInfo();
            themeId = themeId || currentThemeId;
            if (!dom.byId(LCONN_THEME_STYLESHEET)) {
               var themeUrl = decorateUrl(getStyleBase() + "/web/_lconntheme/" + encodeURIComponent(themeId) + ".css", {
                  "version" : "oneui3",
                  "rtl" : isRTL()
               });
               var themeLink = domConstruct.create("link", {
                  id : LCONN_THEME_STYLESHEET,
                  rel : STYLESHEET,
                  path : themeUrl.path,
                  query : themeUrl.query,
                  href : themeUrl.toString()
               }, queryModule("head")[0]);
            }
            else {
               console.warn("Theme stylesheet '%s' already included in this page", currentThemeId);
            }
            return this;
         },
         /**
          * Callers may invoke this method to add the Connections stylesheet for
          * the current application relative to the current theme.
          * 
          * @param {string}
          *           [appName] Name of the application e.g. 'files'. If not
          *           provided, the current application will be used.
          * @param {string}
          *           [themeId] Name of the theme e.g. 'red'. If not provided,
          *           the current default theme will be used.
          */
         addAppStylesheet : function(appName, themeId) {
            initThemeInfo();
            appName = appName || currentAppName;
            themeId = themeId || currentThemeId;
            if (!dom.byId(LCONN_APP_STYLESHEET)) {
               var appUrl = decorateUrl(getStyleBase() + "/web/_lconnappstyles/" + encodeURIComponent(themeId) + "/" + encodeURIComponent(appName) + ".css", {
                  "version" : "oneui3",
                  "rtl" : isRTL()
               });
               var appLink = domConstruct.create("link", {
                  id : LCONN_APP_STYLESHEET,
                  rel : STYLESHEET,
                  path : appUrl.path,
                  query : appUrl.query,
                  href : appUrl.toString()
               }, queryModule("head")[0]);
            }
            else {
               console.warn("Application stylesheet '%s' with theme '%s' already included in this page", currentAppName, currentThemeId);
            }
            return this;
         },
         /**
          * Callers may invoke this method to add a Connections stylesheet for
          * an arbitrary resource by knowing its path relative to the
          * applications/ directory, e.g. 'activityStream'.
          * 
          * @param {string}
          *           styleSheet Name of the stylesheet e.g. 'activityStream'.
          * @param {string}
          *           [themeId] Name of the theme e.g. 'red'. If not provided,
          *           the current default theme will be used.
          */
         addStylesheet : function(styleSheet, themeId) {
            if (!styleSheet)
               return;
            initThemeInfo();
            themeId = themeId || currentThemeId;
            if (1) { // Never fail
               var styleUrl = decorateUrl(getStyleBase() + "/web/_lconnappstyles/" + encodeURIComponent(themeId) + "/" + encodeURIComponent(styleSheet)
                     + ".css", {
                  "version" : "oneui3",
                  "rtl" : isRTL()
               });
               var styleLink = domConstruct.create("link", {
                  id : "lotusStylesheet_" + seq(),
                  rel : STYLESHEET,
                  path : styleUrl.path,
                  query : styleUrl.query,
                  href : styleUrl.toString()
               }, queryModule("head")[0]);
            }
            return this;
         },
         /**
          * Callers may invoke this method to add all Connections stylesheets:
          * one for the base stylesheet, one for the current theme, and then one
          * for the current application relative to the current theme.
          * 
          * @param {string}
          *           [appName] Name of the application e.g. 'files'. If not
          *           provided, the current application will be used.
          * @param {string}
          *           [themeId] Name of the theme e.g. 'red'. If not provided,
          *           the current default theme will be used.
          */
         addAllStylesheets : function(appName, themeId) {
            this.addBaseStylesheet().addSpritesStylesheet().addThemeStylesheet(themeId).addAppStylesheet(appName, themeId);
         },
         /**
          * Return a URL to a standard OneUI resource with the appropriate
          * caching url.
          * 
          * @param {string}
          *           resource Name of the resource e.g. 'sprites.css'.
          * @returns a URL to a standard OneUI resource with the appropriate
          *          caching url.
          */
         getUrl : function(resource) {
            initThemeInfo();
            return decorateUrl(resourceUrl + resource); // + resourceQuery;
         },
         /**
          * Callers may invoke this method to switch the current Connections
          * theme.
          * <p>
          * Connections serves three links, one for the base stylesheet, one for
          * the current theme, and then one for the current application relative
          * to the current theme. This method will remember the original theme
          * as well as the default, and allow users to revert if necessary.
          * <p>
          * Callers of this method may omit the <code>themeId</code> argument,
          * and the method will take care of switching to the correct theme
          * based on current configuration settings.
          * <p>
          * To cope with legacy use of the standard OneUI theme "default", this
          * method will override the argument "default" to use the "gen4" theme,
          * or any other theme set as default through the extended configuration
          * property <code>com.ibm.lconn.core.web.styles.theme.default</code>,
          * unless the caller sets the optional <code>force</code> argument to
          * true.
          * 
          * @param {string}
          *           [themeId] Name of the theme e.g. 'red'. If not provided,
          *           the current theme will be used.
          * @param {boolean}
          *           [force] Forces the theme to be set, bypassing internal
          *           logic to use configured default themes where possible.
          */
         switchTheme : function(themeId, force) {
            var links = initThemeInfo(), baseLink = links.baseLink, spritesLink = links.spritesLink;

            if (!themeId)
               themeId = originalThemeId;
            if (themeId === DEFAULT_ONEUI_THEME_ID && !force)
               themeId = getDefaultThemeId();
            if (themeId == currentThemeId || !baseLink)
               return;

            currentThemeId = themeId;

            var encodedThemeId = encodeURIComponent(themeId);
            if (themeId) {
               // Remove link before creating a new stylesheet to avoid IE limit
               // See:
               // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx#Remarks
               removeThemeLink(dom.byId(LCONN_THEME_STYLESHEET));

               themeUrl.path = originalPath + "_lconntheme/" + encodedThemeId + ".css";
               themeLink = createStyleSheet(baseLink, themeUrl);
               themeLink.id = LCONN_THEME_STYLESHEET;
               domConstruct.place(themeLink, spritesLink, "after");

               if (currentAppName) {
                  // Remove link before creating a new stylesheet to avoid IE
                  // limit
                  // See:
                  // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx#Remarks
                  removeThemeLink(dom.byId(LCONN_APP_STYLESHEET));

                  themeUrl.path = originalPath + "_lconnappstyles/" + encodedThemeId + "/" + encodeURIComponent(currentAppName) + ".css";
                  appLink = createStyleSheet(baseLink, themeUrl);
                  appLink.id = LCONN_APP_STYLESHEET;
                  domConstruct.place(appLink, themeLink, "after");
               }
            }
         },

         /**
          * Callers may invoke this method to flip the directionality of the
          * Connections theme.
          * <p>
          * This method will first flip the direction of the document and all
          * other elements that have a <code>dir</code> attribute set, and
          * then remove and add again all stylesheets. This will cause the
          * stylesheets for the newly set directionality to be requested and
          * loaded in the page.
          * 
          * @param {string}
          *           [dir] Desired direction, either 'ltr' or 'rtl'. If not
          *           provided, the current direction will be read and inverted.
          */
         flip : function(dir) {
            initThemeInfo();
            // Note: when calling flip('rtl') we want to switch to 'rtl'
            if (dir === undefined)
               dir = isRTL() ? 'ltr' : 'rtl';
            array.forEach(document.querySelectorAll('[dir]'), function(el) {
               el.setAttribute('dir', dir)
            });
            win.doc.documentElement.dir = dir;
            // Remove all stylesheets
            removeThemeLink(dom.byId(LCONN_BASE_STYLESHEET));
            removeThemeLink(dom.byId(LCONN_SPRITES_STYLESHEET));
            removeThemeLink(dom.byId(LCONN_APP_STYLESHEET));
            removeThemeLink(dom.byId(LCONN_THEME_STYLESHEET));
            // Redd all styles, flipped
            this.addAllStylesheets();
         },

         /**
          * Returns the current theme id
          * 
          * @returns {string} the current theme id
          */
         getCurrentThemeId : function() {
            initThemeInfo();
            return currentThemeId;
         },
      
		 isHikariTheme: function() {
			  return this.getCurrentThemeId() === 'hikari' || properties['com.ibm.lconn.communities.support.custom.themes.for.hikari'];
		 }
      });

      return theme;
   });
