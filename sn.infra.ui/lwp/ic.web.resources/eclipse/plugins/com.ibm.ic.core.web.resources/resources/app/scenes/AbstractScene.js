/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "ic-core/app/scenes",
      "ic-core/url"
], function(declare, scenes, url) {

   var _ = scenes;

   // This is our internal private interface
   var _i = {};

   var AbstractScene = declare("lconn.core.app.scenes.AbstractScene", null, /** @lends ic-core.app.scenes.AbstractScene.prototype */
   {
      /**
       * Base abstract scene class
       * 
       * @constructs
       * @param {App}
       *           app Application instance
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor : function(app) {
         if (app) {
            this.app = app;
            this.params = app && app.getUrl() ? url.parse(app.getUrl()).queryParameters : {};
         }
      },
      /** @abstract */
      begin : function() {},
      /** @abstract */
      show : function() {},
      /** @abstract */
      end : function() {},
      /**
       * Renders a message
       * 
       * @private
       * @param {Object}
       *           m Message
       */
      _renderMessage : function(m) {
         _.renderMessage(this.app, m);
      },
      /**
       * Clears messages
       * 
       * @private
       */
      _clearMessages : function() {
         _.clearMessages(this.app);
      }
   });

   return AbstractScene;
});
