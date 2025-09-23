/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
   dojo.provide("lconn.core.proxyHelper");
   dojo.require("com.ibm.oneui.util.proxy");
   dojo.require("lconn.core.config.services");
   dojo.require("lconn.core.url");

   var commonProxy;
   if (lconn.core.config.services.deploymentConfig) {
      commonProxy = lconn.core.url.getServiceUrl(lconn.core.config.services.deploymentConfig).path + "/proxy/commonProxy";
   }

   /**
    * Helper for com.ibm.oneui.util.proxy which makes it easy to proxy requests
    * through the common proxy
    * <p>
    * 
    * @function proxy
    * @memberof lconn.core
    * @param {String}
    *           url The URL to proxy
    * @param {Boolean}
    *           useCommonProxy Set to true to proxy through the common proxy
    * @return {String} The proxied URL
    */
   lconn.core.proxyHelper.proxy = function(url, useCommonProxy) {
      if (useCommonProxy) {
         if (!commonProxy) {
            return url;
         }

         return com.ibm.oneui.util.proxy(url, commonProxy);
      }
      else {
         return com.ibm.oneui.util.proxy(url);
      }
   };
})();
