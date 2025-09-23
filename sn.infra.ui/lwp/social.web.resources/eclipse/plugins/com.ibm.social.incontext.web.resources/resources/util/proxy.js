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

(function() {
	dojo.provide('com.ibm.social.incontext.util.proxy');
	var com_ibm_social_incontext_util =com.ibm.social.incontext.util;

	var defaultPort = function(scheme) {
		return scheme == "https" ? 443 : 80;
	};

    var xhrHandler = dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler");

    var useProxy = xhrHandler === undefined || !xhrHandler.useOauth;

	var proxy = dojo.config.proxy;
	if (useProxy && proxy) {
		var location = window.location;
		var host = location.hostname;
		var scheme = (location.protocol || "http").replace(':','');
		var port = location.port || defaultPort(scheme); 
		
		com_ibm_social_incontext_util.proxy = function(url) {
			var uri = new dojo._Url(url);
			var newHost = uri.host;
			if (newHost) {
				var newScheme = uri.scheme || scheme;
				var newPort = uri.port || defaultPort(newScheme);
				if (newScheme != scheme || newPort != port || newHost != host)
					return proxy + "/" + newScheme + "/" + encodeURIComponent(newHost+":"+newPort) + (uri.path || "") + (uri.query ? ("?"+uri.query) : "");
			}
			return url;
		};
	}
	else
		com_ibm_social_incontext_util.proxy = function(url) {return url;};
})();


