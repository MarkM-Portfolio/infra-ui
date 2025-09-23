/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.app.scenes.AbstractScene");

dojo.require("lconn.core.app.scenes");
dojo.require("lconn.core.url");

(function(window, document) {

   var _ = lconn.core.app.scenes;

   // This is our internal private interface
   var _i = {};

   dojo.declare("lconn.core.app.scenes.AbstractScene", null, /** @lends lconn.core.app.scenes.AbstractScene.prototype */ {
      /**
       * Base abstract scene class
       * @constructs
       * @param {App} app Application instance
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor: function(app) {
         if (app) {
            this.app = app;
            this.params = lconn.core.url.parse(app.getUrl()).queryParameters;
         }
      },
      /** @abstract */
      begin: function() {},
      /** @abstract */
      show: function() {},
      /** @abstract */
      end: function() {},
      /**
       * Renders a message
       * @private
       * @param {Object} m Message
       */
      _renderMessage: function(m) {
         _.renderMessage(this.app, m);
      },
      /**
       * Clears messages
       * @private
       */
      _clearMessages: function() {
         _.clearMessages(this.app);
      }
   });
// Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
