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

define([
	"dojo/_base/lang",
	"dojo/cookie",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/on",
	"dojo/topic",
	"ic-core/config",
	"ic-core/config/services",
	"ic-core/url"
], function (lang, cookie, dom, domClass, on, topic, config, services, urlModule) {

	(function(window, document) {
	   
	   function _u(el) { domClass.remove(el, "lotusHidden"); }
	   
	   /**
	    * Internal private interface
	    */
	   var _i = /** @lends ic-core.mobile */ {
		  /** @private */
	      getMobileRedirectUrl: function(url) {
	         /* hardcoded for now */
	         var url = urlModule.getServiceUrl(
	               services.deploymentConfig).toString()
	               + "/ic-core/mobile_redirect";
	         return urlModule.rewrite(url, {
	            url: urlModule.canonicalize(window.location.href)
	         });
	      },
		  /** @private */
	      isMobileClient: function() {
	         return window.navigator.userAgent.match(/BlackBerry[789]|Android\s[12]|GoBrowser|SymbianOS|IEMobile|iPhone|Opera\s(Mini|Mobile)/);
	      },
		  /** @private */
	      useDesktopUI: function(cookieName) {
	         // If the cookie is set, the mobile client still wants to set the cookie
	         return cookie(cookieName);
	      },
		  /** @private */
	      decorate: function(cookieName) {
	         var _li = dom.byId("lconnFooterMobile"), _a = dom.byId("lconnMobileRedirectLink");
	         if (_li)
	            _u(_li);
	         if (_a)
	            on(_a, "click", lang.hitch(this, lang.partial(this.redirect, cookieName)));
	      },
		  /** @private */
	      redirect: function(cookieName, e) {
	         // Unset cookie
	         // TODO: read domain and path from config
	         if (cookieName)
	            cookie(cookieName, null, {path: "/", expires: -1});
	         // Perform redirect
	         lconn.core.mobile.redirect(e);
	      }
	   };
	   
	   /**
	    * Mobile redirect utility
	    * @namespace ic-core.mobile
	    * @author Claudio Procida <procidac@ie.ibm.com>
	    */
	   lconn.core.mobile = /** @lends ic-core.mobile */ {
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
	            e.preventDefault(), e.stopPropagation();
	         // Do nothing if invoked from the Mobile UI (just in case)
	         if (ibmConfig.serviceName === "mobile")
	            return;
	         window.location.href = _i.getMobileRedirectUrl(window.location.href);
	      }
	   };
	// Create a closure on window and document so we're safe in case custom code tampers with them
	})(window, document);
	
	return lconn.core.mobile;
});
