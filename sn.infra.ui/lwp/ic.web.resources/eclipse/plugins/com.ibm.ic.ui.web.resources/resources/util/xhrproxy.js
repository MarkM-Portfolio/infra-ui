define([
	"dojo",
	"com/ibm/oneui/util/xhr"
], function (dojo, xhr) {
   // FIXME: refactor to AMD

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	(function() {
		/**
		 * Automatically proxies requests made to dojo xhr using the default configured proxy.
		 */
					var proxy = dojo.config.proxy;
		if (proxy)
		{
			var com_ibm_oneui_util = com.ibm.oneui.util;
			com_ibm_oneui_util.xhr.addRequestInterceptor(function(request) {
				var args = request.args;
				var url = request._originalUrl = args.url; 
				args.url = com_ibm_oneui_util.proxy(url);
			});
			com_ibm_oneui_util.xhr.addResponseInterceptor(function(request) {
				request.args.url = request._originalUrl;
			});
		}
	}());
	
	
	
	return com.ibm.oneui.util.xhrproxy;
});
