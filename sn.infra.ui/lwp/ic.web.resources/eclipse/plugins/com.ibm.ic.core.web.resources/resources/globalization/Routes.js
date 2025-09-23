/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "ic-ui/util/proxy",
   "ic-core/app/AbstractRoutes",
   "ic-core/config",
   "ic-core/config/services",
   "ic-core/url"
], function (declare, proxy, AbstractRoutes, config, services, urlModule) {

   var Routes = declare("lconn.core.globalization.Routes", AbstractRoutes, /** @lends ic-core.globalization.Routes.prototype */ {
      _newsBaseUri: null,
      /**
       * Constructs the routes object
       * @class Globalization preferences routes
       * @extends ic-core.app.AbstractRoutes
       * @constructs
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor: function() {
         var newsSvcUrl = urlModule.getServiceUrl(services.news);
         if (newsSvcUrl) {
            this._newsBaseUri = newsSvcUrl.toString();
         }
      },
      getHomeUrl: function() {
         return this.getPreferencesUrl();
      },
      getPreferencesUrl: function(/* unused */opt) {
         return this._baseUri + "/settings/globalization";
      },
      getPreferencesSettingsServiceUrl: function(/* unused */opt) {
         return this._baseUri + "/settings/globalization/service";
      },
      getPreferencesFeedServiceUrl: function() {
         var url = this._newsBaseUri + "/to/be/determined"; // TODO:
         return proxy(url);
      },
      getPreferencesServiceUrl: function(userid) {
         var url = this._newsBaseUri + "/to/be/determined/{userid}".replace("{userid}", userid); // TODO:
         return proxy(url);
      }
   });

   return Routes;
});
