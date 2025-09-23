/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Utility that knows when and how to transform a URL into the proxied version.
 * <p>
 * Use whenever you must make sure a URL used in XHR is correctly proxied
 * through the AJAX proxy.
 * 
 * @module ic-core.proxy
 * @param {String}
 *           url The URL to proxy
 * @param {Boolean}
 *           useCommonProxy Set to true to specify if the common proxy should be
 *           used instead of the AJAX proxy
 * @return {String} The proxied URL
 */
define([
      "dojo/_base/config",
      "ic-core/config/services",
      "ic-core/url"
], function(dojoConfig, services, url) {

   var defaultPort = function(scheme) {
      return scheme == "https" ? 443 : 80;
   };

   var ajaxProxy = dojoConfig.proxy;

   var commonProxy;
   if (services.deploymentConfig) {
      commonProxy = url.getServiceUrl(services.deploymentConfig).path + "/proxy/commonProxy";
   }

   var location = window.location;
   var host = location.hostname || "localhost";
   var scheme = (location.protocol || "http").replace(':', '');
   var port = location.port || defaultPort(scheme);

   return function(url, useCommonProxy) {
      var proxy = useCommonProxy ? commonProxy : ajaxProxy;

      if (!proxy) {
         return url;
      }

      var uri = new dojo._Url(url);
      var newHost = uri.host;
      if (newHost) {
         var newScheme = uri.scheme || scheme;
         var newPort = uri.port || defaultPort(newScheme);
         if (newScheme != scheme || newPort != port || newHost != host)
            return proxy + "/" + newScheme + "/" + encodeURIComponent(newHost + ":" + newPort) + (uri.path || "") + (uri.query ? ("?" + uri.query) : "");
      }
      return url;
   };
});
