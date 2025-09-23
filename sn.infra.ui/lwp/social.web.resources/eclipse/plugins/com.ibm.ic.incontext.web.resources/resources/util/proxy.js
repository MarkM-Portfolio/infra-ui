/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/config",
	"dojo/_base/url",
], function (dojo, declare, lang, config, URL) {

	
		var defaultPort = function(scheme) {
			return scheme == "https" ? 443 : 80;
		};
	
	    var xhrHandler = lang.getObject("ic-as/util/xhr/XhrHandler");
	
	    var useProxy = xhrHandler === undefined || !xhrHandler.useOauth;
	    	
		var proxy = config.proxy;
		var proxyFunc;
		if (useProxy && proxy) {
			var location = window.location;
			var host = location.hostname;
			var scheme = (location.protocol || "http").replace(':','');
			var port = location.port || defaultPort(scheme); 
			
			proxyFunc = function(url) {
				var uri = new URL(url);
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
			proxyFunc = function(url) {return url;};

		return proxyFunc;
	});
	
