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

(function() {
   /**
    * Helper object that manages the Connections theme
    * 
    * @namespace lconn.core.theme
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   dojo.provide("lconn.core.theme");
   dojo.require("lconn.core.url");
   dojo.require("lconn.core.config.properties");
   dojo.require("lconn.core.config.features");
   dojo.require("com.ibm.oneui.util.Url");

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
      return lconn.core.config.features("hikari-default-theme") ? HIKARI_THEME_ID
            : (lconn.core.config.properties[DEFAULT_THEME_PROPERTY_NAME] || GEN4_THEME_ID);
   }

   function initThemeInfo() {
      var baseLink = dojo.byId(LCONN_BASE_STYLESHEET), themeLink = dojo.byId(LCONN_THEME_STYLESHEET), spritesLink = dojo.byId(LCONN_SPRITES_STYLESHEET), appLink = dojo
            .byId(LCONN_APP_STYLESHEET);

      // use information on the base link
      if (!themeUrl && baseLink) {
         resourceUrl = dojo.attr(baseLink, "base") || dojo.attr(baseLink, "href").substr(0, dojo.attr(baseLink, "href").indexOf("_style"));

         themeUrl = new com.ibm.oneui.util.Url(resourceUrl);
         themeUrl.query = dojo.attr(baseLink, "query") || (themeLink ? dojo.attr(themeLink, "href").substr(dojo.attr(themeLink, "href").indexOf("?")) : "");
         originalPath = themeUrl.path;

         currentThemeId = originalThemeId = dojo.attr(baseLink, "theme") || getDefaultThemeId();
         defaultThemeId = dojo.attr(baseLink, "defaultTheme") || originalThemeId;
         currentAppName = dojo.attr(baseLink, "appName") || dojo.getObject("ibmConfig.serviceName");

         // Use values from the baseLink to maintain consistency
         resourceUrl += "com.ibm.lconn.core.styles.oneui" + (dojo.attr(baseLink, "oneui") || 3) + "/";
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
            if (parent_)
               parent_.removeChild(themeLink);
         }, 1);
      }
      return themeLink;
   }

   function isRTL() {
      return !dojo._isBodyLtr();
   }

   function getStyleBase() {
      return lconn.core.url.getServiceUrl(lconn.core.config.services.webresources);
   }

   function decorateUrl(theUrl) {
      if (theUrl) {
         var params = {};
         if (dojo.config.isDebug)
            params.debug = true;
         else
            params.etag = encodeURIComponent(dojo.getObject("ibmConfig.versionStamp"));
         theUrl = new com.ibm.oneui.util.Url(lconn.core.url.rewrite(theUrl, params));
      }
      return window[URL_REWRITER](theUrl);
   }

   var _seq = 0;
   function seq() {
      return _seq++;
   }

   function createStyleSheet(link, theUrl) {
      if (dojo.isIE >= 9 && dojo.isIE < 11)
         return document.createStyleSheet(theUrl.toString()).owningElement;
      else if(dojo.isIE >= 11){
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

   dojo.mixin(lconn.core.theme, /** @lends lconn.core.theme */
   {
      /**
       * Callers may invoke this method to add the base Connections stylesheet.
       */
      addBaseStylesheet : function() {
         initThemeInfo();
         if (!dojo.byId(LCONN_BASE_STYLESHEET)) {
            var baseUrl = decorateUrl(getStyleBase() + "/web/_style?include=com.ibm.lconn.core.styles.oneui3/base/package3.css");
            if (!dojo.config.isDebug)
               baseUrl.query += "&etag=" + encodeURIComponent(dojo.getObject("ibmConfig.versionStamp"));
            var baseLink = dojo.create("link", {
               id : LCONN_BASE_STYLESHEET,
               rel : STYLESHEET,
               path : baseUrl.path,
               query : baseUrl.query,
               href : baseUrl.toString()
            }, dojo.query("head")[0]);
         }
         return this;
      },
      /**
       * Callers may invoke this method to add the Connections stylesheet for
       * the current theme.
       * 
       * @param {string}
       *           [themeId] Name of the theme e.g. 'red'. If not provided, the
       *           current default theme will be used.
       */
      addThemeStylesheet : function(themeId) {
         initThemeInfo();
         themeId = themeId || currentThemeId;
         if (!dojo.byId(LCONN_THEME_STYLESHEET)) {
            var themeUrl = decorateUrl(getStyleBase() + "/web/_lconntheme/" + encodeURIComponent(themeId) + ".css?version=oneui3&rtl=" + isRTL());
            var themeLink = dojo.create("link", {
               id : LCONN_THEME_STYLESHEET,
               rel : STYLESHEET,
               path : themeUrl.path,
               query : themeUrl.query,
               href : themeUrl.toString()
            }, dojo.query("head")[0]);
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
       *           [themeId] Name of the theme e.g. 'red'. If not provided, the
       *           current default theme will be used.
       */
      addAppStylesheet : function(appName, themeId) {
         initThemeInfo();
         appName = appName || currentAppName;
         themeId = themeId || currentThemeId;
         if (!dojo.byId(LCONN_APP_STYLESHEET)) {
            var appUrl = decorateUrl(getStyleBase() + "/web/_lconnappstyles/" + encodeURIComponent(themeId) + "/" + encodeURIComponent(appName)
                  + ".css?version=oneui3&rtl=" + isRTL());
            var appLink = dojo.create("link", {
               id : LCONN_APP_STYLESHEET,
               rel : STYLESHEET,
               path : appUrl.path,
               query : appUrl.query,
               href : appUrl.toString()
            }, dojo.query("head")[0]);
         }
         else {
            console.warn("Application stylesheet '%s' with theme '%s' already included in this page", currentAppName, currentThemeId);
         }
         return this;
      },
      /**
       * Callers may invoke this method to add a Connections stylesheet for an
       * arbitrary resource by knowing its path relative to the applications/
       * directory, e.g. 'activityStream'.
       * 
       * @param {string}
       *           styleSheet Name of the stylesheet e.g. 'activityStream'.
       * @param {string}
       *           [themeId] Name of the theme e.g. 'red'. If not provided, the
       *           current default theme will be used.
       */
      addStylesheet : function(styleSheet, themeId) {
         if (!styleSheet)
            return;
         initThemeInfo();
         themeId = themeId || currentThemeId;
         if (1) { // Never fail
            var styleUrl = decorateUrl(getStyleBase() + "/web/_lconnappstyles/" + encodeURIComponent(themeId) + "/" + encodeURIComponent(styleSheet)
                  + ".css?version=oneui3&rtl=" + isRTL());
            var styleLink = dojo.create("link", {
               id : "lotusStylesheet_" + seq(),
               rel : STYLESHEET,
               path : styleUrl.path,
               query : styleUrl.query,
               href : styleUrl.toString()
            }, dojo.query("head")[0]);
         }
         return this;
      },
      /**
       * Callers may invoke this method to add all Connections stylesheets: one
       * for the base stylesheet, one for the current theme, and then one for
       * the current application relative to the current theme.
       * 
       * @param {string}
       *           [appName] Name of the application e.g. 'files'. If not
       *           provided, the current application will be used.
       * @param {string}
       *           [themeId] Name of the theme e.g. 'red'. If not provided, the
       *           current default theme will be used.
       */
      addAllStylesheets : function(appName, themeId) {
         this.addBaseStylesheet().addThemeStylesheet(themeId).addAppStylesheet(appName, themeId);
      },
      /**
       * Return a URL to a standard OneUI resource with the appropriate caching
       * url.
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
       * Callers may invoke this method to switch the current Connections theme.
       * <p>
       * Connections serves three links, one for the base stylesheet, one for
       * the current theme, and then one for the current application relative to
       * the current theme. This method will remember the original theme as well
       * as the default, and allow users to revert if necessary.
       * <p>
       * Callers of this method may omit the <code>themeId</code> argument,
       * and the method will take care of switching to the correct theme based
       * on current configuration settings.
       * <p>
       * To cope with legacy use of the standard OneUI theme "default", this
       * method will override the argument "default" to use the "gen4" theme, or
       * any other theme set as default through the extended configuration
       * property <code>com.ibm.lconn.core.web.styles.theme.default</code>,
       * unless the caller sets the optional <code>force</code> argument to
       * true.
       * 
       * @param {string}
       *           [themeId] Name of the theme e.g. 'red'. If not provided, the
       *           current theme will be used.
       * @param {boolean}
       *           [force] Forces the theme to be set, bypassing internal logic
       *           to use configured default themes where possible.
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
            removeThemeLink(dojo.byId(LCONN_THEME_STYLESHEET));

            themeUrl.path = originalPath + "_lconntheme/" + encodedThemeId + ".css";
            themeLink = createStyleSheet(baseLink, themeUrl);
            themeLink.id = LCONN_THEME_STYLESHEET;
            dojo.place(themeLink, spritesLink, "after");

            if (currentAppName) {
               // Remove link before creating a new stylesheet to avoid IE limit
               // See:
               // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx#Remarks
               removeThemeLink(dojo.byId(LCONN_APP_STYLESHEET));

               themeUrl.path = originalPath + "_lconnappstyles/" + encodedThemeId + "/" + encodeURIComponent(currentAppName) + ".css";
               appLink = createStyleSheet(baseLink, themeUrl);
               appLink.id = LCONN_APP_STYLESHEET;
               dojo.place(appLink, themeLink, "after");
            }
         }
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
    	  return this.getCurrentThemeId() === 'hikari' || lconn.core.config.properties['com.ibm.lconn.communities.support.custom.themes.for.hikari'];
      }
   });

})();
