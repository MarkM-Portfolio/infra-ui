/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.ServiceRoutes");

dojo.require("lconn.core.app.AbstractRoutes");
dojo.require("com.ibm.oneui.util.proxy");

dojo.declare("lconn.oauth.ServiceRoutes", lconn.core.app.AbstractRoutes, /** @lends lconn.oauth.ServiceRoutes.prototype */ {
   serviceName: "oauth",
   _providerBaseUri: null,
   /**
    * OAuth Service routes
    * @author Claudio Procida <procidac@ie.ibm.com>
    * @constructs
    * @extends lconn.core.app.AbstractRoutes
    */
   constructor: function() {
      var providerSvcUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.oauthprovider, true);
      if (providerSvcUrl) {
         this._providerBaseUri = providerSvcUrl.toString();
      }
   },
   /**
    * Returns the URL to the home page. Alias to {@link lconn.oauth.ServiceRoutes#getApplicationAccessUrl}
    * @returns the URL to the home page
    */
   getHomeUrl: function() {
      return this.getApplicationAccessUrl();
   },
   /**
    * Returns the URL to the Application Access page
    * @param {Object} [opt] Options
    * @returns the URL to the Application Access page
    */
   getApplicationAccessUrl: function(/* unused */opt) {
      return this._baseUri + "/apps";
   },
   /**
    * Returns the URL to the Authorization feed service
    * @returns the URL to the Authorization feed service
    */
   getAuthzFeedServiceUrl: function() {
      var url = this._providerBaseUri + "/authzMgmt/connectionsProvider";
      return com.ibm.oneui.util.proxy(url);
   },
   /**
    * Returns the URL to the Authorization entry service
    * @param {String} clientid The client id
    * @returns the URL to the Authorization entry service
    */
   getAuthzEntryServiceUrl: function(clientid) {
      var url = this._providerBaseUri + "/authzMgmt/connectionsProvider/client/{clientid}".replace("{clientid}", clientid);
      return com.ibm.oneui.util.proxy(url);
   }
});
