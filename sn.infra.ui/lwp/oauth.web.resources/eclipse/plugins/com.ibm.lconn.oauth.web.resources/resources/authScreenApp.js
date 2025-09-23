/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.authScreenApp");

dojo.require("lconn.core.bundle_common");

dojo.require("lconn.oauth.AbstractApp");
dojo.require("lconn.oauth.bean.ClientInfo");
dojo.require("lconn.oauth.scenes.AuthorizationScreen");

dojo.requireLocalization("lconn.oauth", "ui");

(function(window, document) {
   
   // This is our internal private interface
   var _i = {
      _decode: function(url) {
         // Just a stub for now
         return "lconn.oauth.scenes.AuthorizationScreen";
      }
   };
   
   /**
    * Authorization screen application
    * @name lconn.oauth.authScreenApp
    * @class
    * @extends lconn.oauth.AbstractApp
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   dojo.declare("lconn.oauth.authScreenApp", lconn.oauth.AbstractApp, /** @lends lconn.oauth.authScreenApp.prototype */ {
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
       * Initializes the OAuth client information
       */
      _initClientInfo: function() {
         var clientInfo = null, clientData = dojo.getObject("oauthFormData");
         if (clientData !== undefined) {
            clientInfo = new lconn.oauth.bean.ClientInfo(clientData);
         }
         return clientInfo;
      },
      /**
       * Returns information on the OAuth client pending authorization
       * @returns the OAuth client information
       */
      getClientInfo: function() {
         if (this._clientInfo === undefined) {
            this._clientInfo = this._initClientInfo();
         }
         return this._clientInfo;
      }
   });
   
   dojo.addOnLoad(function() {
      // TODO: read lconn.oauth.config.authScreenAppClass
      var appClass = dojo.getObject("lconn.oauth.authScreenApp");
      if (appClass) {
         var app = new appClass();
         app.start();
      }
   });
// Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
