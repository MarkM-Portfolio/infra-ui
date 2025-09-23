/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.providerApp");

dojo.require("lconn.core.bundle_common");

dojo.require("lconn.oauth.scenes");
dojo.require("lconn.oauth.AbstractApp");
dojo.require("lconn.oauth.scenes.ApplicationList");

dojo.requireLocalization("lconn.oauth", "ui");

(function(window, document) {

   var _last = function(o) {
      return (o && dojo.isArrayLike(o)) ? o[o.length-1] : o;
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
    * @name lconn.oauth.providerApp
    * @class
    * @extends lconn.oauth.AbstractApp
    */
   dojo.declare("lconn.oauth.providerApp", lconn.oauth.AbstractApp, /** @lends lconn.oauth.providerApp.prototype */ {
      nls: dojo.i18n.getLocalization("lconn.oauth", "ui"),
      /**
       * Resolves the scene
       */
      resolveScene: function() {
         var sceneClass = _i._decode(window.location.href);
         var sceneCtor = dojo.getObject(sceneClass);
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
         dojo.stopEvent(e);
         if (this.scene && this.scene.onlogin && this.scene.onlogin()) {
            return;
         }

         // TODO: unavailable for now
         var f = dojo.getObject("lconn.oauth.config.services.login");
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
            dojo.stopEvent(e);
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

   if (dojo.config.ibmStartupApp !== false) {
      dojo.addOnLoad(function() {
         // TODO: read lconn.oauth.config.providerAppClass
         var appClass = dojo.getObject("lconn.oauth.providerApp");
         if (appClass) {
            var app = new appClass();
            app.start();
         }
      });
   }
// Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
