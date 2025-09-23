/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/lang"
], function(lang) {

   /**
    * Base OAuth package
    * @namespace ic-oauth
    */
   /**
    * OAuth Application package
    * @namespace ic-oauth.App
    */
   var App = /** @lends ic-oauth.App */
   {
      /**
       * Returns the one and only instance of the running application
       * @returns the one and only instance of the running application
       */
      getInstance: function() {
         return lang.getObject("pa");
      }
   };
   
   /**
    * Opens the help window
    * @global
    * @function openHelpWindow
    */

   return App;

});
