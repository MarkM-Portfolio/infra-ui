/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.services.urlSecurityService');

dojo.require('com.ibm.lconn.gadget.config.settings');
dojo.require('com.ibm.lconn.gadget.util.trace');

dojo.require('lconn.core.config');
dojo.require('lconn.core.config.services');

dojo.require('lconn.core.url');

com.ibm.lconn.gadget.services.urlSecurityService =
(function(
 dojo,
 lconn_core_url_,
 settings_,
 trace_,
 UrlAccessDeniedDialog_,
 lconn_core_config_services_)
{
	var api_ = {},
		checkEnabled_ = settings_.security.urlWhitelistEnabled,
		checkRegex_ = settings_.security.allowUrlCheckPattern;
		opensocialUrl_ = lconn_core_url_.getServiceUrl(lconn_core_config_services_.opensocial),
		errorPage_ = opensocialUrl_ + '/ic/errors/errorMini.jsp';
	
	if (checkRegex_) {
		checkRegex_ = new RegExp(settings_.security.allowUrlCheckPattern, 'i');
	} else {
		checkRegex_ = { 'test' : function() { return false; } }; 
	}
	
	/**
	 * Secure version of naviate URL function
	 */
	function secureNavigateUrl_(site, url, renderParams) {	
		if (checkUrlWhiteList_(url)) {
			return this.navigateUrlNoSecurity.apply(this, arguments);
   		} else {
   			trace_.warn('Blocking access to url: ' + url + '.  URL does not match whitelist.');
   			var args = Array.prototype.slice.call(arguments);
   			args[1] = errorPage_;
   			return this.navigateUrlNoSecurity.apply(this, args);
   		}
	}
	
	/**
	 * Check the URL against the whitelist
	 */
	function checkUrlWhiteList_(url) {		
		if (!checkEnabled_) {
			return true;
		}
		
		// blocks '..' for security.  
		// All URLs will be fully resolved at this stage of the call stack
		return url && url.indexOf('..') === -1 && checkRegex_.test(url);
	}	
	

	/**
	 * Register this service
	 * 
	 * @method
	 * @memberOf com.ibm.lconn.gadget.services.urlSecurityService
	 * @public
	 */
	api_.registerService = function(commonContainer) {
		// save off old version
		commonContainer.navigateUrlNoSecurity = commonContainer.navigateUrl;
		   
		// replace with secure version
		commonContainer.navigateUrl = secureNavigateUrl_;
	};
	
	return api_;
})
(dojo,
 lconn.core.url,
 com.ibm.lconn.gadget.config.settings,
 com.ibm.lconn.gadget.util.trace,
 com.ibm.lconn.gadget.services.dialog.UrlAccessDeniedDialog,
 lconn.core.config.services);
