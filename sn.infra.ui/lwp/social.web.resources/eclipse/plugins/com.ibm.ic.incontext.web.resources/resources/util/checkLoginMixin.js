/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-core/config/services",
	"ic-core/url"
], function (declare, lang, services, url) {

	/*object to be mixed in with elements that wish to check their login state
	 * and/or keep their login alive. Uses com.ibm.social.as.util.xhr.XhrHandler
	 * provides private funcs _keepAlive and _checkLogin	*/
	
	var checkLoginMixin = declare("com.ibm.social.incontext.util.checkLoginMixin", [], {   
		/* function _keepAlive(bool)
		 * param : bool accepts true/false to run once or stop running
		 * 			or a number to run bool times (at 10 min intervals) */
		_keepAlive: function(bool) {
			if(lang.getObject("com.ibm.social.as.util.xhr.XhrHandler.canSessionTimeout")) {
				if(typeof bool != 'undefined') {
					this._bKeepAlive = bool;
					if(bool && typeof this._bKeepAliveRunning == 'undefined' || !this._bKeepAliveRunning) {
						this._keepAlive();
					}
				} else {
					this._bKeepAliveRunning = false;
			    	if(typeof this._bKeepAlive != 'undefined' && this._bKeepAlive--) {
			    		// just keep alive, do not cause login redirect
			    		var authCheckUri = url.getServiceUrl(services.opensocial).uri + "/ic/rest/isAuthenticated";
			    		(lang.getObject("com.ibm.social.as.util.xhr.XhrHandler") || dojo).xhrGet({url:authCheckUri, failOk:true});
			
			        	// running every 10 minutes
				    	setTimeout(lang.hitch(this, this._keepAlive), 10 * 60 * 1000);
				    	this._bKeepAliveRunning = true;
			    	}
				}
			}
		},
		
		_checkLogin: function() {
			if(lang.getObject("com.ibm.social.as.util.xhr.XhrHandler.canSessionTimeout")) {
				if(typeof this._bCheckingLogin != 'undefined' && this._bCheckingLogin || this._bKeepAliveRunning) {
					return;
				}
				this._bCheckingLogin = true;
				
				var endXHr = lang.hitch(this, function(){this._bCheckingLogin = false;});
				
				var authCheckUri = url.getServiceUrl(services.opensocial).uri + "/ic/rest/isAuthenticated";
				(lang.getObject("com.ibm.social.as.util.xhr.XhrHandler") || dojo).xhrGet(
					{
						url:authCheckUri, 
						failOk:true,
						load: endXHr, 
						error: endXHr
					});
			}
		}
	});
	
	return checkLoginMixin;
});
