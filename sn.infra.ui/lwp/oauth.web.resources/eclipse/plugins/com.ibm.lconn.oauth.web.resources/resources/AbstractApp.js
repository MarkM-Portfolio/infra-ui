/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.AbstractApp");
dojo.require("lconn.core.app.AbstractApp");
dojo.require("lconn.oauth.ServiceRoutes");

(function(window, document) {
   
   dojo.declare("lconn.oauth.AbstractApp", lconn.core.app.AbstractApp, /** @lends lconn.oauth.AbstractApp.prototype */ {
      /**
       * Base abstract OAuth application class
       * @constructs
       * @extends lconn.core.app.AbstractApp
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor: function() {
         var _oa = dojo.getObject("pa");
         if (_oa !== undefined) {
            throw "Only one instance can exist";
         }
         dojo.setObject("pa", this);
      },
      /**
       * Returns the routes for this application
       * @returns the routes for this application
       */
      initializeRoutes: function() {
         return new lconn.oauth.ServiceRoutes();
      }
   });
   
   dojo.provide("lconn.oauth.App");
   
   /**
    * Base Connections package
    * @namespace lconn
    */
   /**
    * Base OAuth package
    * @namespace lconn.oauth
    */
   /**
    * OAuth Application package
    * @namespace lconn.oauth.App
    */
   lconn.oauth.App = /** @lends lconn.oauth.App */ {
      /**
       * Returns the one and only instance of the running application
       * @returns the one and only instance of the running application
       */
      getInstance: function() { return dojo.getObject("pa"); }
   };
   /**
    * Opens the help window
    * @global
    * @function openHelpWindow
    */
// Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
