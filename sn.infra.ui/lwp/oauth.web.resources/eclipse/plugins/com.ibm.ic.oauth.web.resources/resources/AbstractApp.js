/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "ic-core/app/AbstractApp",
   "./ServiceRoutes"
], function(declare, lang, AbstractApp, ServiceRoutes) {

   return declare("lconn.oauth.AbstractApp", AbstractApp, /** @lends ic-oauth.AbstractApp.prototype */ {
      /**
       * Base abstract OAuth application class
       * @constructs
       * @extends ic-core.app.AbstractApp
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor: function() {
         var _oa = lang.getObject("pa");
         if (_oa !== undefined) {
            throw "Only one instance can exist";
         }
         lang.setObject("pa", this);
      },
      /**
       * Returns the routes for this application
       * @returns the routes for this application
       */
      initializeRoutes: function() {
         return new ServiceRoutes();
      }
   });
});
