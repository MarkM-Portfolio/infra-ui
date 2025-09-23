/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/topic",
      "dojo/io-query",
      "ic-core/app/scenes",
      "ic-core/help"
], function(dojo, declare, topic, ioQuery, scenes, help) {

   /**
    * Application toolkit
    * 
    * @namespace ic-core.app
    */

   var _s = scenes;

   function load() {
      var scene = this.resolveScene();
      if (this.scene) {
         this.scene.end(scene);
      }
      this.scene = scene;
      scene.begin();
   }

   function r(e) {
      e = e || {};
      return e.reason || e.message || e;
   }

   var AbstractApp = declare("lconn.core.app.AbstractApp", null, /** @lends ic-core.app.AbstractApp.prototype */
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
         this.params = ioQuery.queryToObject(location.search.substring(location.search.indexOf('?') + 1));
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
            e.preventDefault();
            e.stopPropagation();
         }
         openHelpWindow();
      },

      getUrl : function() {
         return window.location.href;
      },

      onApplicationStart : function() {
         return;
      }
   });

   window.openHelpWindow = function() {
      help.launchHelp();
   }

   return AbstractApp;
});
