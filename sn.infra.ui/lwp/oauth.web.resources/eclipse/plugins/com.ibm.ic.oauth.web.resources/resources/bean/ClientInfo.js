/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare"
], function (declare) {

   /**
    * Model objects for the OAuth package
    * @namespace ic-oauth.bean
    */

   var ClientInfo = declare("lconn.oauth.bean.ClientInfo", null, /** @lends ic-oauth.bean.ClientInfo.prototype */ {
      /**
       * Represents an OAuth client
       * @author Claudio Procida <procidac@ie.ibm.com>
       * @constructs
       * @param {Object} data An object in the format provided by the WAS OAuth JS API
       */
      constructor: function(data) {
         this._data = data;
      },
      /**
       * Returns the client's display name
       * @returns the client's display name
       */
      getName: function() {
         return this._data.clientDisplayName;
      },
      /**
       * Returns the client's id
       * @returns the client's id
       */
      getId: function() {
         return this._data.client_id;
      },
      /**
       * Returns the client's redirection URI
       * @returns the client's redirection URI
       */
      getRedirectURI: function() {
         return this._data.redirect_uri;
      }
   });

   return ClientInfo;
});
