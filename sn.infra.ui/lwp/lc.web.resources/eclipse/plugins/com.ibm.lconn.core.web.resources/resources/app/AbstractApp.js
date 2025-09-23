/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.app.AbstractApp");
dojo.require("lconn.core.help");
dojo.require("lconn.core.app.scenes");

/**
 * Application toolkit
 * 
 * @namespace lconn.core.app
 */

(function(window, document) {

   var _s = lconn.core.app.scenes;

   function load() {
      var scene = this.resolveScene();
      if (this.scene)
         this.scene.end(scene);
      this.scene = scene;
      scene.begin();
   }

   function r(e) {
      return (e || {}).reason || e;
   }

   dojo.declare("lconn.core.app.AbstractApp", null, /** @lends lconn.core.app.AbstractApp.prototype */
   {
      /**
       * Base abstract application class
       * 
       * @author Claudio Procida <procidac@ie.ibm.com>
       * @constructs
       */
      constructor : function() {
         this.d = this.document = document;
         this.scene = null;
         this.routes = this.initializeRoutes();
         this.params = dojo.queryToObject(location.search.substring(location.search.indexOf('?') + 1));
      },
      /**
       * Subclassers must implement this method
       * 
       * @abstract
       */
      initializeRoutes : function() {},
      start : function() {
         try {
            load.apply(this);
            this.onApplicationStart();
         }
         catch (e) {
            _s.applyGenericError(this, r(e));
         }
      },
      reload : function() {
         try {
            load.apply(this);
         }
         catch (e) {
            _s.applyGenericError(this, r(e));
         }
      },
      /**
       * Subclassers must implement this method
       * 
       * @abstract
       */
      resolveScene : function() {},

      activateHelp : function(e) {
         if (e) {
            dojo.stopEvent(e);
         }
         openHelpWindow();
      },

      getUrl : function() {
         return window.location.href;
      },

      onApplicationStart : function() {}
   });

   window.openHelpWindow = function() {
      lconn.core.help.launchHelp();
   }
   // Create a closure on window and document so we're safe in case custom code
   // tampers with them
}(window, document));
