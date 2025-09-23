/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2017                                    */
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
 * @function proxy
 * @memberof com.ibm.oneui.util
 * @param {String}
 *           url The URL to proxy
 * @param {String}
 *           [proxyUrl] The URL of the proxy to use, if it should proxy through
 *           a URL other than the AJAX proxy
 * @return {String} The proxied URL
 */
(function() {
   dojo.provide('com.ibm.oneui.util.proxy');
   var com_ibm_oneui_util = com.ibm.oneui.util;

   var defaultPort = function(scheme) {
      return scheme == "https" ? 443 : 80;
   }

   var ajaxProxy = dojo.config.proxy;

   var location = window.location;
   var host = location.hostname || "localhost";
   var scheme = (location.protocol || "http").replace(':', '');
   var port = location.port || defaultPort(scheme);

   com_ibm_oneui_util.proxy = function(url, proxyUrl) {
      var proxy = proxyUrl || ajaxProxy;

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
   }
})();
