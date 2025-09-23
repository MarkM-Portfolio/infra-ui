/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/i18n!./nls/ui",
   "dojo/i18n!ic-core/nls/strings",
   "dojo/_base/config",
   "dojo/ready",
   "net/jazz/ajax/xdloader",
   "./AbstractApp",
   "./scenes/AuthorizationScreen",
   "./bean/ClientInfo"
], function (dojo, declare, lang, i18nui, i18nstrings, config, ready, xdloader, AbstractApp, AuthorizationScreen, ClientInfo) {

   // This is our internal private interface
   var _i = {
      _decode: function(url) {
         // Just a stub for now
         return "lconn.oauth.scenes.AuthorizationScreen";
      }
   };

   /**
    * Authorization screen application
    * @name ic-oauth.authScreenApp
    * @class
    * @extends ic-oauth.AbstractApp
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var authScreenApp = declare("lconn.oauth.authScreenApp", AbstractApp, /** @lends ic-oauth.authScreenApp.prototype */ {
      nls: i18nui,
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
       * Initializes the OAuth client information
       */
      _initClientInfo: function() {
         var clientInfo = null, clientData = lang.getObject("oauthFormData");
         if (clientData !== undefined) {
            clientInfo = new ClientInfo(clientData);
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

   if (config.ibmStartupApp !== false) {
      ready(function() {
         // TODO: read oauth.config.authScreenAppClass
         var appClass = lang.getObject("lconn.oauth.authScreenApp");
         if (appClass) {
            var app = new appClass();
            app.start();
         }
      });
   }

   return authScreenApp;
});
