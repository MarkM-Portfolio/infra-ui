/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.util.checkLoginMixin");

dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

/*object to be mixed in with elements that wish to check their login state
 * and/or keep their login alive. Uses com.ibm.social.as.util.xhr.XhrHandler
 * provides private funcs _keepAlive and _checkLogin	*/

dojo.declare("com.ibm.social.incontext.util.checkLoginMixin", [], {   
	/* function _keepAlive(bool)
	 * param : bool accepts true/false to run once or stop running
	 * 			or a number to run bool times (at 10 min intervals) */
	_keepAlive: function(bool) {
		if(dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler.canSessionTimeout")) {
			if(typeof bool != 'undefined') {
				this._bKeepAlive = bool;
				if(bool && typeof this._bKeepAliveRunning == 'undefined' || !this._bKeepAliveRunning) {
					this._keepAlive();
				}
			} else {
				this._bKeepAliveRunning = false;
		    	if(typeof this._bKeepAlive != 'undefined' && this._bKeepAlive--) {
		    		// just keep alive, do not cause login redirect
		    		var authCheckUri = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial).uri + "/ic/rest/isAuthenticated";
		    		(dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler") || dojo).xhrGet({url:authCheckUri, failOk:true});
		
		        	// running every 10 minutes
			    	setTimeout(dojo.hitch(this, this._keepAlive), 10 * 60 * 1000);
			    	this._bKeepAliveRunning = true;
		    	}
			}
		}
	},
	
	_checkLogin: function() {
		if(dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler.canSessionTimeout")) {
			if(typeof this._bCheckingLogin != 'undefined' && this._bCheckingLogin || this._bKeepAliveRunning) {
				return;
			}
			this._bCheckingLogin = true;
			
			var endXHr = dojo.hitch(this, function(){this._bCheckingLogin = false;});
			
			var authCheckUri = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial).uri + "/ic/rest/isAuthenticated";
			(dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler") || dojo).xhrGet(
				{
					url:authCheckUri, 
					failOk:true,
					load: endXHr, 
					error: endXHr
				});
		}
	}
});
