/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.mobile");

dojo.require("dojo.cookie");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

(function(window, document) {
   
   function _u(el) { dojo.removeClass(el, "lotusHidden"); }
   
   /**
    * Internal private interface
    */
   var _i = /** @lends lconn.core.mobile */ {
	  /** @private */
      getMobileRedirectUrl: function(url) {
         /* hardcoded for now */
         var url = lconn.core.url.getServiceUrl(
               lconn.core.config.services.deploymentConfig).toString()
               + "/core/mobile_redirect";
         return lconn.core.url.rewrite(url, {
            url: lconn.core.url.canonicalize(window.location.href)
         });
      },
	  /** @private */
      isMobileClient: function() {
         return window.navigator.userAgent.match(/BlackBerry[789]|Android\s[12]|GoBrowser|SymbianOS|IEMobile|iPhone|Opera\s(Mini|Mobile)/);
      },
	  /** @private */
      useDesktopUI: function(cookieName) {
         // If the cookie is set, the mobile client still wants to set the cookie
         return dojo.cookie(cookieName);
      },
	  /** @private */
      decorate: function(cookieName) {
         var _li = dojo.byId("lconnFooterMobile"), _a = dojo.byId("lconnMobileRedirectLink");
         if (_li)
            _u(_li);
         if (_a)
            dojo.connect(_a, "onclick", this, dojo.partial(this.redirect, cookieName));
      },
	  /** @private */
      redirect: function(cookieName, e) {
         // Unset cookie
         // TODO: read domain and path from config
         if (cookieName)
            dojo.cookie(cookieName, null, {path: "/", expires: -1});
         // Perform redirect
         lconn.core.mobile.redirect(e);
      }
   };
   
   /**
    * Mobile redirect utility
    * @namespace lconn.core.mobile
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   lconn.core.mobile = /** @lends lconn.core.mobile */ {
      /**
       * Detects if the request is coming from a mobile client. Also performs
       * side effects like revealing the Mobile link in the footer.
       * @param {String} cookieName Name of the cookie
       */
      detect: function(cookieName) {
         // TODO: sniff feature vs. user agent
         if (_i.isMobileClient())
            if (_i.useDesktopUI(cookieName))
               _i.decorate(cookieName);
            else
               this.redirect();
      },
      /**
       * Redirects to the equivalent mobile URL of the current window location
       * @param {Event} [e] Event passed by event handler
       */
      redirect: function(e) {
         if (e)
            dojo.stopEvent(e);
         // Do nothing if invoked from the Mobile UI (just in case)
         if (ibmConfig.serviceName === "mobile")
            return;
         window.location.href = _i.getMobileRedirectUrl(window.location.href);
      }
   };
// Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
