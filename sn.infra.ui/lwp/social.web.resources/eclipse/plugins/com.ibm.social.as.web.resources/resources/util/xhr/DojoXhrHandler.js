/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.xhr.DojoXhrHandler");

dojo.require("com.ibm.social.incontext.util.url");

/**
 * Simple XHR handler object for Dojo. Mixin to your class if you want to make
 * Dojo requests
 * 
 * @author Robert Campion
 */

com.ibm.social.as.util.xhr.DojoXhrHandler = {
		
	proxyUrlHelper: null,
	
	canSessionTimeout: true,
		
	/**
	 * Main XHR function.
	 * @param method
	 * @param args
	 */
	xhr: function(method, args){
		// Proxy the URL if needs be
		args.url = this.getProxyUrlHelper().getProxifiedURL(args.url);
		
		// Small problem with the com.ibm.ajax.auth class we are using to 
		// catch session timeouts.... The ajax.auth stuff kicks in *after* the
		// error callback from the XHR request is called.
		// This results in us displaying an error briefly before the user is
		// redirected to the login page.
		// Check the error response for a 401 (unauthenticated) response and
		// store that in the error so we can check if we need to display error
		var origError = args.error;
		args.error = function(error, ioArgs) {
			if ( ioArgs && ioArgs.xhr && ioArgs.xhr.status === 401 ) {
				error.unauthenticated = true;
			}
			
			if ( origError ) {
				origError(error, ioArgs);
			}
		};
		
		// Just make a dojo XHR
		return dojo.xhr(method, args);
	},
	
	/**
	 * Get the proxyUrlHelper. Create if it doesn't exist.
	 * @returns {Object} proxyUrlHelper
	 */
	getProxyUrlHelper: function(){
		if(!this.proxyUrlHelper){
			this.proxyUrlHelper = new com.ibm.social.incontext.util.url.ProxyUrlHelper();
		}
		
		return this.proxyUrlHelper;
	}
};
