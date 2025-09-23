/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/DeferredList",
   "dojo/_base/declare",
   "dojo/i18n",
   "dojo/i18n!./nls/strings",
   "dojo/_base/lang",
   "dojo/_base/config",
   "dojo/string",
   "dojo/topic",
   "../header/apps",
   "../LanguageSelector",
   "../a11y",
   "../app/AbstractApp",
   "../app/scenes",
   "../auth",
   "../config/services",
   "./scenes/Preferences",
   "./Routes"
], function (dojo, DeferredList, declare, i18n, i18nglobalization, lang, config, string, topic, apps, LanguageSelector, a11y, AbstractApp, scenes, auth, services, Preferences, Routes) {

   var _s = scenes;
   var _last = function(o) {
      return (o && lang.isArrayLike(o)) ? o[o.length-1] : o;
   };
   var _isEvent = function(e) {
      return (e && (typeof e.target != "undefined" || typeof e.bubbles != "undefined"));
   };

   // This is our internal private interface
   var _i = {
      _decode: function(url) {
         // Just a stub for now
         return "lconn.core.globalization.scenes.Preferences";
      }
   };

   /**
    * Globalization preferences application
    * @extends ic-core.app.AbstractApp
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var preferencesApp = declare("lconn.core.globalization.preferencesApp", AbstractApp, /** @lends ic-core.globalization.preferencesApp.prototype */ {
      nls: i18nglobalization,
      constructor: function() {
         // Preference pages are protected by authentication, return true
         auth.setAuthCheck(function() { return true; });
      },
      resolveScene: function() {
         var sceneClass = _i._decode(window.location.href);
         var sceneCtor = lang.getObject(sceneClass);
         if (!sceneCtor)
            throw "Can't find scene class " + sceneClass;
         return new sceneCtor(this);
      },
      initializeRoutes: function() {
         return new Routes();
      },
      login: function(e) {
         e.preventDefault(), e.stopPropagation();
         if (this.scene && this.scene.onlogin && this.scene.onlogin())
            return;

         // TODO: unavailable for now
         var f = lang.getObject("lconn.core.config.services.login");
         if (typeof f == "function")
            f.apply(this, args);
         else {
            var url = this.routes.getLoginUrl(this.getUrl());
            window.location.href = url;
         }
      },

      logout: function(url) {
         var e = _last(arguments);
         if (_isEvent(e))
            e.preventDefault(), e.stopPropagation();

         var url = (typeof url == "string") ? url : "/";
         var d = this.d;
         var form = d.createElement("form");
            form.style.position = "absolute";
            form.style.left = form.style.top = "0px";
            form.style.visibility = "hidden";
            form.method = "POST";
            form.action = this.routes.getLogoutUrl();
            var input = d.createElement("input");
               input.type = "hidden";
               input.name = "logoutExitPage";
               input.value = url;
            form.appendChild(input);
            var input = d.createElement("input");
               input.type = "submit";
               input.name = "logout";
               input.value = "Log out";
            form.appendChild(input);
         d.body.appendChild(form);
         form.submit();
      }
   });

   if (config.ibmStartupApp !== false) {
      require(["dojo/domReady!"
               ], function() {
         if (preferencesApp) {
            var app = new preferencesApp();
            app.start();
         }
      });
   }

   return preferencesApp;
});
