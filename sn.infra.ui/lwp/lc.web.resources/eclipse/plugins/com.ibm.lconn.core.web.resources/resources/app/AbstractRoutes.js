/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.app.AbstractRoutes");

dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

dojo.declare("lconn.core.app.AbstractRoutes", null, /** @lends lconn.core.app.AbstractRoutes.prototype */ {
   _baseUri: null,
   serviceName: "deploymentConfig",
   /**
    * Base abstract routes for single-page applications
    * @constructs
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   constructor: function() {
      var svcUrl = lconn.core.url.getServiceUrl(lconn.core.config.services[this.serviceName]);
      if (svcUrl)
         this._baseUri = svcUrl.toString();
   },
   // Subclassers should override this method to return the URL of the main scene
   getHomeUrl: function() {
      return this._baseUri;
   },
   getLoginUrl: function(s) {
      var url = this._baseUri + "/login_redirect";
      if (typeof s === "string")
         url = lconn.core.url.rewrite(url, {redirect: s});
      return url;
   },
   getLogoutUrl: function() {
      return this._baseUri + "/ibm_security_logout";
   },
   // TODO: obsolete, should not reference directly
   getHelpBookUrl: function(topic) {
      var url = null, svcUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.help);
      if (svcUrl) {
        url = svcUrl.toString() + "/topic/" + (topic || "com.ibm.lotus.connections.common.help/euframe.html");
      }
      return url; 
   }
});
