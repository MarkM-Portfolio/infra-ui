/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2020                         */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define([
      "dojo/_base/declare",
      "ic-core/config",
      "ic-core/config/services",
      "ic-core/url"
], function(declare, config, services, urlModule) {

   var AbstractRoutes = declare("lconn.core.app.AbstractRoutes", null, /** @lends ic-core.app.AbstractRoutes.prototype */
   {
      _baseUri : null,
      serviceName : "deploymentConfig",
      /**
       * Base abstract routes for single-page applications
       *
       * @constructs
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor : function() {
         var svcUrl = urlModule.getServiceUrl(services[this.serviceName]);
         if (svcUrl)
            this._baseUri = svcUrl.toString();
      },
      // Subclassers should override this method to return the URL of the main
      // scene
      getHomeUrl : function() {
         return this._baseUri;
      },
      getLoginUrl : function(s) {
         var url = this._baseUri + "/login_redirect";
         if (typeof s === "string")
            url = urlModule.rewrite(url, {
               redirect : s
            });
         return url;
      },
      getLogoutUrl : function() {
         return this._baseUri + "/ibm_security_logout";
      },
      // TODO: obsolete, should not reference directly
      getHelpBookUrl : function(topic) {
alert(" AbstractRoutes: getHelpBookUrl: topic: " + topic);
         var url = null, svcUrl = urlModule.getServiceUrl(services.help);
         if (svcUrl) {
            url = svcUrl.toString() + "/user/" + (topic || "common/euframe.html");
         }
         return url;
      }
   });

   return AbstractRoutes;
});
