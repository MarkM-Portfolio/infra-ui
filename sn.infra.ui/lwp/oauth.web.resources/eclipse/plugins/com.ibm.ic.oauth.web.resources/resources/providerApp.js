/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/i18n!./nls/ui",
   "dojo/topic",
   "dojo/_base/config",
   "ic-core/bundle_common",
   "./scenes/ApplicationList",
   "./AbstractApp"
], function (dojo, declare, lang, i18nui, topic, config, bundle_common, ApplicationList, AbstractApp) {

   var _last = function(o) {
      return (o && lang.isArrayLike(o)) ? o[o.length-1] : o;
   };
   var _isEvent = function(e) {
      return (e && (e.target !== undefined || e.bubbles !== undefined));
   };

   // This is our internal private interface
   var _i = {
      _decode: function(url) {
         // Just a stub for now
         return "lconn.oauth.scenes.ApplicationList";
      }
   };

   /**
    * Application Access application
    * @author Claudio Procida <procidac@ie.ibm.com>
    * @name ic-oauth.providerApp
    * @class
    * @extends ic-oauth.AbstractApp
    */
   var providerApp = declare("lconn.oauth.providerApp", AbstractApp, /** @lends ic-oauth.providerApp.prototype */ {
      nls: i18nui,
      constructor: function() {
         return;
      },
      /**
       * Resolves the scene
       */
      resolveScene: function() {
         var sceneClass = _i._decode(window.location.href);
         var sceneCtor = lang.getObject(sceneClass);
         if (!sceneCtor) {
            throw "Can't find scene class " + sceneClass;
         }
         return new sceneCtor(this);
      },

      /**
       * Redirects to the login page
       * @param {Event} e The event
       */
      login: function(e) {
         e.preventDefault();
         e.stopPropagation();
         if (this.scene && this.scene.onlogin && this.scene.onlogin()) {
            return;
         }

         // TODO: unavailable for now
         var f = lang.getObject("lconn.oauth.config.services.login");
         if (typeof f == "function") {
            f.apply(this, arguments);
         }
         else {
            var url = this.routes.getLoginUrl(this.getUrl());
            window.location.href = url;
         }
      },

      /**
       * Logs the user off
       * @param {String} [url] The URL to redirect after successful logout
       */
      logout: function(url) {
         var e = _last(arguments);
         if (_isEvent(e)) {
            e.preventDefault();
            e.stopPropagation();
         }

         url = (typeof url == "string") ? url : "/";
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
            input = d.createElement("input");
               input.type = "submit";
               input.name = "logout";
               input.value = "Log out";
            form.appendChild(input);
         d.body.appendChild(form);
         form.submit();
      }
   });

   if (config.ibmStartupApp !== false) {
      require(['dojo/domReady!'], function() {
         // TODO: read oauth.config.providerAppClass
         var appClass = lang.getObject("lconn.oauth.providerApp");
         if (appClass) {
            var app = new appClass();
            app.start();
         }
      });
   }

   return providerApp;
});
