/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/declare",
   "dojo/cookie",
   "dojo/_base/lang",
   "dojo/_base/window",
   "dojo/dom",
   "dojo/on",
   "dojo/topic",
   "dijit/Menu",
   "dijit/MenuItem",
   "dijit/_Widget",
   "ic-core/MenuUtility",
   "ic-core/Res",
   "ic-core/url"
], function (declare, cookie, lang, windowModule, dom, on, topic, Menu, MenuItem, _Widget, MenuUtility, Res, urlModule) {

   var BROWSER_DETERMINED = "BD";

   /**
    * Validates the JSON string for languages. If the string includes BD and another language only,
    * the language selector should not appear. This is in fact the argument passed when a single language
    * is forced through LotusConnections-config.xml
    * @returns {boolean} true if the JSON allows a valid selection
    */

   function validateJSON(jsonString) {
      var total = 0;
      for (var prop in jsonString) {
         if (jsonString.hasOwnProperty(prop)) {
            switch (prop) {
            case BROWSER_DETERMINED:
               break;
            default:
               total++;
            }
         }
      }
      return total > 1;
   }

   /**
    * @class ic-core.LanguageSelector
    */
   var LanguageSelector = declare("lconn.core.LanguageSelector", null, /** @lends ic-core.LanguageSelector.prototype */ {
      _jsonString: null,
      _selectorNode: null,
      _menu: null,
      _cookieProperties: null,

      COOKIE_NAME: null,

      constructor: function(selectorNode, jsonString, cookieName, cookieProperties) {
         this._selectorNode = selectorNode;
         this._jsonString = jsonString;
         this._cookieProperties = cookieProperties;
         this.id = this._selectorNode.id;
         this.COOKIE_NAME = LanguageSelector.COOKIE_NAME = cookieName;
         if (validateJSON(jsonString)) {
            this._setSelectorLabel();
            on(this._selectorNode, "click", lang.hitch(this, "_openMenu"));
         }
      },

      _openMenu: function(evt) {
         try {
            this._buildLanguageMenu();
            this._attachLanguageMenu(this.id);

            // FIXME: still needed?
            // Clear existing style attributes on dijitPopup div
            // Causing conflict with placement of languageSelector
   //         var dd = dojo.query(".dijitPopup");
   //         for (var i = 0; i < dd.length; i++) {
   //            if (dd[i].id.indexOf("_dropdown") != -1) {
   //               dojo.removeAttr(dd[i], "style");
   //            }
   //         }

            menuUtility.openMenu(null, this._menu.id, this._selectorNode);
            evt.preventDefault(), evt.stopPropagation();
         } catch (e) {
            console.log(e);
         }
      },

      _setSelectorLabel: function() {
         var languageKey = cookie(this.COOKIE_NAME);

         var res = new Res();
         res.loadDefaultBundle();
         this.strBundle = res.resBundle;

         var img = ' <img alt="" role="presentation" src="' + _Widget.prototype._blankGif + '"  class="lotusArrow lotusDropDownSprite"><span class="lotusAltText">&#9660;</span>';
         // TODO: nls
         var span = '<span class="lotusAccess">Language Selector</span>';

         if (languageKey) {
            // Default to "Custom language"
            var bestMatchLength = 0;
            var label = this.strBundle.rs_customLangaugeLinkLabel + span + img;
            for (var key in this._jsonString) {
               if (this._isCodeEqual(key, languageKey)) {
                  // If this matches exactly, update the label and stop
                  label = this._jsonString[key] + span + img;
                  break;
               } else if (this._isCodeEqualOrMoreSpecific(key, languageKey) && key.length > bestMatchLength) {
                  // If this matches generally, update the label
                  label = this._jsonString[key] + span + img;
                  bestMatchLength = key.length;
               }
            }
            this._selectorNode.innerHTML = label;
         } else {
            // TODO: should never get here if server side logic sets the cookie correctly
            this._selectorNode.innerHTML = this.strBundle.rs_customLangaugeLinkLabel + span + img;
         }
      },

      _attachLanguageMenu: function(id) {
         var parentNode = dom.byId(id);
         dijit.setWaiState(parentNode, "owns", id + "_popup");
      },

      _buildLanguageMenu: function() {
         if (this._menu == null) {
            var showBrowserSetting = true;

            this._menu = new Menu({
               "class": "lotusNavMenu",
               id: this.id + "_popup"
            });

            for (var key in this._jsonString) {
               if (key != BROWSER_DETERMINED) this._menu.addChild(this._buildMenuItem(this._jsonString[key], key));
               else showBrowserSetting = false;
            }

            var res = new Res();
            res.loadDefaultBundle();
            this.strBundle = res.resBundle;

            if (showBrowserSetting) this._menu.addChild(this._buildMenuItem(this.strBundle.rs_browser_setting, BROWSER_DETERMINED));

            this._menu.domNode.style.display = "none";
            windowModule.body().appendChild(this._menu.domNode);

            var that = this;

            on(this._menu, "ItemClick", function(item) {
               if ((item != null) && (typeof item.language != "undefined")) {

                  cookie(that.COOKIE_NAME, item.language, that._cookieProperties);

                  // override any lang param in the URL before we reload
                  var currentUrl = null;
                  var forwardElement = document.getElementById('REFRESH_URL');
                  if (forwardElement) {
                     currentUrl = forwardElement.getAttribute('href');
                  }
                  if (!currentUrl) {
                     currentUrl = window.location.href;
                  }

                  // If they've chosen BD (browser-determined), we actually remove the locale from the URL
                  var newLang = item.language;
                  if (newLang == BROWSER_DETERMINED || !newLang) {
                     newLang = null;
                  }

                  var url = urlModule.parse(currentUrl);
                  if (newLang == null && url.queryParameters.lang == null) {
                     /*
                     The current url doesn't have a lang parameter, and we're switching to browser-determined locale, so we won't be adding a lang parameter
                     The only way to reload the page and use the updated cookie is to force a refresh
                     NOTE: This could cause browser warnings if the current page was generated by a POST request
                     */
                     window.location.reload(true);
                  } else {
                     window.location = urlModule.rewrite(currentUrl, {
                        lang: newLang
                     });
                  }
               }
            });
         }
      },

      _buildMenuItem: function(label, language) {
         var item = new MenuItem({
            label: label,
            iconClass: "lotusHidden" // Hide icon space in drop down
         });
         item.set('lang', language);
         item.language = language;
         return item;
      },

      _isCodeEqualOrMoreSpecific: function(lang01, lang02) {
         var str1 = lang01.toLowerCase().replace(/-/, "_");
         var str2 = lang02.toLowerCase().replace(/-/, "_");

         if (str1 == str2) return true;

         var fuzzyMatch = str1.length > 0 && str2.indexOf(str1 + "_") == 0;
         if (fuzzyMatch) {
            var disallow = {
               zh: "zh_tw",
               // zh and zh_tw should be considered different languages
               pt: "pt_br" // pt and pt_br should be considered different languages
            };

            if (disallow[str1] == str2) return false;
            else return true;
         }

         return false;
      },

      _isCodeEqual: function(lang01, lang02) {
         var str1 = lang01.toLowerCase().replace(/-/, "_");
         var str2 = lang02.toLowerCase().replace(/-/, "_");
         return str1 === str2;
      }
   });

   return LanguageSelector;
});
